const express = require('express');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env.local (ignored by git) and fallback to .env
try {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
} catch {}
try {
  require('dotenv').config();
} catch {}
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// BytePlus ModelArk configuration
const BYTEPLUS_ARK_BASE_URL = 'https://ark.ap-southeast.bytepluses.com/api/v3';
const BYTEPLUS_IMAGE_MODEL = process.env.BYTEPLUS_IMAGE_MODEL || 'seedream-4-0-250828';
const BYTEPLUS_IMAGE_ENDPOINT_ID = process.env.BYTEPLUS_IMAGE_ENDPOINT_ID || process.env.BYTEPLUS_IMAGE_ENDPOINT;
const BYTEPLUS_IMAGE_ASPECT_RATIO = process.env.BYTEPLUS_IMAGE_ASPECT_RATIO || '1:1';
const BYTEPLUS_IMAGE_RESPONSE_FORMAT = process.env.BYTEPLUS_IMAGE_RESPONSE_FORMAT || 'url';
const BYTEPLUS_IMAGE_STYLE_PRESET = process.env.BYTEPLUS_IMAGE_STYLE_PRESET || 'cinematic';
const BYTEPLUS_IMAGE_NEGATIVE_PROMPT = process.env.BYTEPLUS_IMAGE_NEGATIVE_PROMPT || '';
const BYTEPLUS_IMAGE_CFG_SCALE = Number(process.env.BYTEPLUS_IMAGE_CFG_SCALE || 7);
const BYTEPLUS_IMAGE_STEP_COUNT = Number(process.env.BYTEPLUS_IMAGE_STEP_COUNT || 30);
const BYTEPLUS_IMAGE_POLL_INTERVAL_MS = Number(process.env.BYTEPLUS_IMAGE_POLL_INTERVAL_MS || 2000);
const BYTEPLUS_IMAGE_POLL_TIMEOUT_MS = Number(process.env.BYTEPLUS_IMAGE_POLL_TIMEOUT_MS || 30000);
const BYTEPLUS_IMAGE_SEED = process.env.BYTEPLUS_IMAGE_SEED
  ? Number(process.env.BYTEPLUS_IMAGE_SEED)
  : undefined;
const BYTEPLUS_IMAGE_SIZE = process.env.BYTEPLUS_IMAGE_SIZE || '';
const BYTEPLUS_IMAGE_SEQUENTIAL = process.env.BYTEPLUS_IMAGE_SEQUENTIAL || 'disabled';
const BYTEPLUS_IMAGE_STREAM = /^true$/i.test(process.env.BYTEPLUS_IMAGE_STREAM || '');
// API key env variable names supported
const BYTEPLUS_API_KEY = process.env.ARK_API_KEY || process.env.BYTEPLUS_SEED_API_KEY || process.env.BYTEPLUS_API_KEY;

// Inline SVG data URI fallback for image generation failures
const FALLBACK_IMAGE_DATA_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="24">
      Generated image unavailable
    </text>
  </svg>`
);

// Ensure fetch is available (Node < 18 fallback to node-fetch)
const fetchFn = typeof fetch === 'function'
  ? fetch
  : ((...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)));

async function arkFetch(path, payload, options = {}) {
  const {
    method = 'POST',
    headers = {},
    query,
    signal
  } = options;

  const url = new URL(`${BYTEPLUS_ARK_BASE_URL}${path}`);
  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const res = await fetchFn(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BYTEPLUS_API_KEY}`,
      ...headers,
    },
    signal,
    body: payload && method !== 'GET' ? JSON.stringify(payload) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ark API error ${res.status}: ${text}`);
  }
  if (res.status === 204) {
    return undefined;
  }
  return res.json();
}

const ASPECT_RATIO_MAP = {
  '1:1': '1024x1024',
  '4:3': '1024x768',
  '3:4': '768x1024',
  '16:9': '1280x720',
  '9:16': '720x1280'
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function toTitleCase(words) {
  return words
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function buildFallbackName(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return 'Untitled NFT';
  }
  const terms = prompt.trim().split(/\s+/).slice(0, 5);
  if (!terms.length) {
    return 'Untitled NFT';
  }
  return toTitleCase(terms.join(' '));
}

function parseContentResponse(rawContent, prompt) {
  const fallbackName = buildFallbackName(prompt);
  const fallbackDescription = prompt && typeof prompt === 'string' ? prompt.trim() : '';

  if (!rawContent || typeof rawContent !== 'string') {
    return { name: fallbackName, description: fallbackDescription };
  }

  let cleaned = rawContent.trim();
  cleaned = cleaned.replace(/```json/i, '```').trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
  }

  try {
    const parsed = JSON.parse(cleaned);
    const name = typeof parsed?.name === 'string' && parsed.name.trim()
      ? parsed.name.trim()
      : fallbackName;
    const description = typeof parsed?.description === 'string' && parsed.description.trim()
      ? parsed.description.trim()
      : fallbackDescription;
    return { name, description };
  } catch {
    return { name: fallbackName, description: cleaned || fallbackDescription };
  }
}

const SEEDREAM_TASK_ENDPOINTS = [
  (taskId) => `/images/generations/${taskId}`,
  (taskId) => `/images/seedream-4.0/tasks/${taskId}`,
  (taskId) => `/images/seedream-4-0/tasks/${taskId}`,
  (taskId) => `/image/tasks/${taskId}`,
  (taskId) => `/images/tasks/${taskId}`,
];

function resolveImageSize(aspectRatio) {
  return ASPECT_RATIO_MAP[aspectRatio] || ASPECT_RATIO_MAP['1:1'];
}

function normalizeStatus(status) {
  if (!status) {
    return '';
  }
  return String(status).trim().toUpperCase();
}

function extractImageFromSeedreamResponse(response) {
  if (!response) {
    return { imageUrl: '', metadata: undefined };
  }

  const candidate =
    response?.data?.result?.images?.[0] ||
    response?.data?.result?.[0] ||
    response?.data?.images?.[0] ||
    response?.data?.[0] ||
    response?.result?.images?.[0] ||
    response?.result?.[0] ||
    response?.images?.[0] ||
    response?.data;

  const metadata = {
    seed: candidate?.seed || response?.data?.result?.seed || response?.seed,
    taskId: response?.data?.task_id || response?.task_id,
    status: response?.data?.status || response?.status,
    safetyAttributes: response?.data?.result?.safety_attributes || candidate?.safety_attributes,
  };

  if (!candidate) {
    return { imageUrl: '', metadata };
  }

  if (candidate.url) {
    return { imageUrl: candidate.url, metadata };
  }

  if (candidate.image_url) {
    return { imageUrl: candidate.image_url, metadata };
  }

  const base64 = candidate.b64_json || candidate.base64 || candidate.image_base64;
  if (base64) {
    const mime = candidate.mime_type || 'image/png';
    return { imageUrl: `data:${mime};base64,${base64}`, metadata };
  }

  return { imageUrl: '', metadata };
}

async function pollSeedreamTask(taskId) {
  const deadline = Date.now() + BYTEPLUS_IMAGE_POLL_TIMEOUT_MS;
  let lastResponse;
  let taskEndpointBuilder = null;

  while (Date.now() < deadline) {
    await delay(BYTEPLUS_IMAGE_POLL_INTERVAL_MS);

    if (!taskEndpointBuilder) {
      for (const buildPath of SEEDREAM_TASK_ENDPOINTS) {
        try {
          const candidateResponse = await arkFetch(buildPath(taskId), null, { method: 'GET' });
          taskEndpointBuilder = buildPath;
          lastResponse = candidateResponse;
          break;
        } catch (error) {
          const message = error?.message || '';
          if (!/404/.test(message) && !/notfound/i.test(message)) {
            throw new Error(`Seedream task poll failed: ${message}`);
          }
        }
      }

      if (!taskEndpointBuilder) {
        throw new Error('Seedream task poll failed: Task query endpoint returned 404. Verify Seedream 4.0 API configuration and endpoint permissions.');
      }
    } else {
      lastResponse = await arkFetch(taskEndpointBuilder(taskId), null, { method: 'GET' }).catch((error) => {
        throw new Error(`Seedream task poll failed: ${error.message}`);
      });
    }

    const status = normalizeStatus(
      lastResponse?.data?.status ||
      lastResponse?.status ||
      lastResponse?.data?.task_status
    );

    if (['SUCCEEDED', 'COMPLETED', 'FINISHED'].includes(status)) {
      return lastResponse;
    }

    if (['FAILED', 'ERROR', 'CANCELLED', 'CANCELED'].includes(status)) {
      const errorMessage =
        lastResponse?.data?.error_message ||
        lastResponse?.data?.message ||
        lastResponse?.error_message ||
        `Seedream task failed with status: ${status}`;
      throw new Error(errorMessage);
    }
  }

  throw new Error('Seedream image generation timed out. Increase BYTEPLUS_IMAGE_POLL_TIMEOUT_MS to allow more time for completion.');
}

async function generateSeedreamImage(prompt) {
  const payload = {
    model: BYTEPLUS_IMAGE_MODEL,
    prompt,
    response_format: BYTEPLUS_IMAGE_RESPONSE_FORMAT,
    sequential_image_generation: BYTEPLUS_IMAGE_SEQUENTIAL || undefined,
    stream: BYTEPLUS_IMAGE_STREAM,
    watermark: true,
  };

  const sizeOverride = BYTEPLUS_IMAGE_SIZE.trim();
  if (sizeOverride) {
    payload.size = sizeOverride;
  } else {
    payload.size = resolveImageSize(BYTEPLUS_IMAGE_ASPECT_RATIO);
  }

  if (BYTEPLUS_IMAGE_STYLE_PRESET) {
    payload.style_preset = BYTEPLUS_IMAGE_STYLE_PRESET;
  }
  if (Number.isFinite(BYTEPLUS_IMAGE_CFG_SCALE)) {
    payload.cfg_scale = BYTEPLUS_IMAGE_CFG_SCALE;
  }
  if (Number.isFinite(BYTEPLUS_IMAGE_STEP_COUNT)) {
    payload.steps = BYTEPLUS_IMAGE_STEP_COUNT;
  }

  if (BYTEPLUS_IMAGE_ENDPOINT_ID) {
    payload.endpoint_id = BYTEPLUS_IMAGE_ENDPOINT_ID;
  }
  if (BYTEPLUS_IMAGE_NEGATIVE_PROMPT) {
    payload.negative_prompt = BYTEPLUS_IMAGE_NEGATIVE_PROMPT;
  }
  if (Number.isFinite(BYTEPLUS_IMAGE_SEED)) {
    payload.seed = BYTEPLUS_IMAGE_SEED;
  }

  const createResponse = await arkFetch('/images/generations', payload);
  const initialImage = extractImageFromSeedreamResponse(createResponse);
  if (initialImage.imageUrl) {
    return { imageUrl: initialImage.imageUrl, metadata: initialImage.metadata, note: null };
  }

  const taskId =
    createResponse?.data?.task_id ||
    createResponse?.task_id ||
    initialImage?.metadata?.taskId;

  if (!taskId) {
    throw new Error('Seedream 4.0 API returned no image or task identifier. Review your model/endpoint configuration.');
  }

  const completionResponse = await pollSeedreamTask(taskId);
  const completedImage = extractImageFromSeedreamResponse(completionResponse);
  if (!completedImage.imageUrl) {
    throw new Error('Seedream 4.0 API completed without returning an image result.');
  }

  return {
    imageUrl: completedImage.imageUrl,
    metadata: { ...initialImage.metadata, ...completedImage.metadata },
    note: null
  };
}



// Mock NFT data
let nfts = [
  {
    id: '1',
    name: 'Cosmic Voyager',
    description: 'A journey through the stars',
    uri: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=800&q=80',
    owner: '0x123456789abcdef'
  },
  {
    id: '2',
    name: 'Digital Phoenix',
    description: 'Rising from digital ashes',
    uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    owner: '0x123456789abcdef'
  },
  {
    id: '3',
    name: 'Quantum Realm',
    description: 'Beyond the fabric of reality',
    uri: 'https://images.unsplash.com/photo-1635776062127-a1fe0f331e5f?auto=format&fit=crop&w=800&q=80',
    owner: '0xabcdef123456789'
  },
];

// Get all NFTs
app.get('/api/nfts', (req, res) => {
  res.json(nfts);
});

// Get NFT by ID
app.get('/api/nfts/:id', (req, res) => {
  const nft = nfts.find(n => n.id === req.params.id);
  if (!nft) {
    return res.status(404).json({ error: 'NFT not found' });
  }
  res.json(nft);
});

// Get NFTs by owner
app.get('/api/nfts/owner/:address', (req, res) => {
  const ownerNfts = nfts.filter(n => n.owner === req.params.address);
  res.json(ownerNfts);
});

// Mint NFT
app.post('/api/nfts/mint', (req, res) => {
  const { name, description, uri, owner } = req.body;
  
  if (!name || !uri || !owner) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newId = (nfts.length + 1).toString();
  const newNft = {
    id: newId,
    name,
    description: description || '',
    uri,
    owner
  };
  
  nfts.push(newNft);
  res.status(201).json(newNft);
});

// Generate NFT description and image using BytePlus Seed 1.6 and Seedream 4.0
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!BYTEPLUS_API_KEY) {
      return res.status(500).json({ error: 'BytePlus ARK_API_KEY is not configured in environment.' });
    }
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Missing prompt string.' });
    }

    // 1) Name and description via Deepseek v3
    const contentSystem = 'You are an NFT content generator. Respond with STRICT JSON only using keys "name" and "description". The name must be evocative, 3-6 words, title case. The description must be 30-60 words, suitable for showcasing an NFT artwork. Do not include additional text.';
    const contentResp = await arkFetch('/chat/completions', {
      model: process.env.BYTEPLUS_TEXT_MODEL || 'deepseek-v3-250324',
      messages: [
        { role: 'system', content: contentSystem },
        { role: 'user', content: `Theme: ${prompt}\nReturn JSON with a unique name and description for an NFT image.` },
      ],
    });
    const rawContent = contentResp?.choices?.[0]?.message?.content ?? '';
    const { name, description } = parseContentResponse(rawContent, prompt);

    // 2) Image generation via BytePlus Seedream 4.0 (per Seedream 4.0 API docs)
    let imageUrl = '';
    let fallbackNote = '';
    let imageMetadata;
    const imagePrompt = `${prompt.trim()} | high detail, cinematic lighting, nft artwork`;
    try {
      const {
        imageUrl: generatedUrl,
        metadata
      } = await generateSeedreamImage(imagePrompt);
      imageUrl = generatedUrl;
      imageMetadata = {
        ...metadata,
        model: BYTEPLUS_IMAGE_MODEL,
        aspectRatio: BYTEPLUS_IMAGE_ASPECT_RATIO,
        stylePreset: BYTEPLUS_IMAGE_STYLE_PRESET,
        responseFormat: BYTEPLUS_IMAGE_RESPONSE_FORMAT,
      };
      if (!imageUrl) {
        fallbackNote = 'Seedream 4.0 returned no image payload. Using placeholder.';
        imageUrl = FALLBACK_IMAGE_DATA_URI;
      }
    } catch (err) {
      const message = err?.message || '';
      console.warn('Seedream 4.0 image generation error:', message);
      const lower = message.toLowerCase();
      if (lower.includes('invalidendpointormodel.notfound') || lower.includes('task query endpoint')) {
        fallbackNote = 'Seedream 4.0 endpoint not accessible. Verify BYTEPLUS_IMAGE_MODEL and BYTEPLUS_IMAGE_ENDPOINT_ID.';
      } else if (lower.includes('timed out')) {
        fallbackNote = 'Seedream 4.0 timed out. Try reducing resolution or extending BYTEPLUS_IMAGE_POLL_TIMEOUT_MS.';
      } else {
        fallbackNote = 'Seedream 4.0 image generation failed. Using fallback placeholder.';
      }
      imageUrl = FALLBACK_IMAGE_DATA_URI;
    }

    return res.json({ name, description, imageUrl, fallbackNote, imageMetadata });
  } catch (err) {
    console.error('Generate API error:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// Transfer NFT
app.post('/api/nfts/transfer', (req, res) => {
  const { id, sender, recipient } = req.body;
  
  if (!id || !sender || !recipient) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const nftIndex = nfts.findIndex(n => n.id === id);
  if (nftIndex === -1) {
    return res.status(404).json({ error: 'NFT not found' });
  }
  
  if (nfts[nftIndex].owner !== sender) {
    return res.status(403).json({ error: 'Not the owner of this NFT' });
  }
  
  nfts[nftIndex].owner = recipient;
  res.json(nfts[nftIndex]);
});

// Burn NFT
app.post('/api/nfts/burn', (req, res) => {
  const { id, owner } = req.body;
  
  if (!id || !owner) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const nftIndex = nfts.findIndex(n => n.id === id);
  if (nftIndex === -1) {
    return res.status(404).json({ error: 'NFT not found' });
  }
  
  if (nfts[nftIndex].owner !== owner) {
    return res.status(403).json({ error: 'Not the owner of this NFT' });
  }
  
  const burnedNft = nfts[nftIndex];
  nfts = nfts.filter(n => n.id !== id);
  res.json(burnedNft);
});

app.listen(port, () => {
  console.log(`Mock NFT server running at http://localhost:${port}`);
});