# NFT Workshop Demo (Lisk + BytePlus)

This webapp lets you mint mock NFTs on Lisk Sepolia and auto-generate artwork/metadata with BytePlus ModelArk (Deepseek v3 + Seedream 4.0). The repo contains:

- `nft-webapp/`: React UI + Express proxy for BytePlus.
- `nft-hardhat/`: Hardhat project for deploying the ERC-721 contract.
- `nft-app/`: Lisk SDK module for on-chain interactions.

## Prerequisites

- Node.js 18+
- npm (bundled with Node)
- BytePlus ModelArk account with Deepseek v3 chat and Seedream 4.0 image generation access
- A wallet (MetaMask) connected to Lisk Sepolia

## Environment Variables

Copy `.env.example` to `.env` and fill the values:

| Variable | Description |
| --- | --- |
| `REACT_APP_NFT_CONTRACT_ADDRESS` | Address of your deployed NFT contract on Lisk Sepolia |
| `REACT_APP_LISK_SEPOLIA_RPC` | RPC endpoint for Lisk Sepolia |
| `ARK_API_KEY` | BytePlus API key with access to ModelArk |
| `BYTEPLUS_TEXT_MODEL` | Deepseek chat model for descriptions (default `deepseek-v3-250324`) |
| `BYTEPLUS_IMAGE_MODEL` | Seedream 4.0 model ID (default `seedream-4-0-250828`) or your deployed endpoint ID |
| `BYTEPLUS_IMAGE_ENDPOINT_ID` | (Optional) Custom inference endpoint ID if required by your account |
| `BYTEPLUS_IMAGE_ASPECT_RATIO` | Aspect ratio for generated images when no explicit size is given (e.g. `1:1`, `16:9`) |
| `BYTEPLUS_IMAGE_SIZE` | Explicit Seedream size token (e.g. `2K`, `1024x1024`); overrides aspect ratio |
| `BYTEPLUS_IMAGE_STYLE_PRESET` | Seedream style preset (e.g. `cinematic`) |
| `BYTEPLUS_IMAGE_RESPONSE_FORMAT` | `url` or `b64_json` |
| `BYTEPLUS_IMAGE_SEQUENTIAL` | `disabled` (default) or other sequential mode supported by Seedream |
| `BYTEPLUS_IMAGE_STREAM` | `true`/`false` to toggle streaming responses (default `false`) |
| `BYTEPLUS_IMAGE_NEGATIVE_PROMPT` | (Optional) Negative prompt to suppress attributes |
| `BYTEPLUS_IMAGE_CFG_SCALE` | Guidance scale for Seedream 4.0 |
| `BYTEPLUS_IMAGE_STEP_COUNT` | Diffusion step count |
| `BYTEPLUS_IMAGE_POLL_INTERVAL_MS` | Poll cadence (ms) for async Seedream tasks |
| `BYTEPLUS_IMAGE_POLL_TIMEOUT_MS` | Max wait (ms) before timing out a Seedream task |

See the [Seedream 4.0 API docs](https://docs.byteplus.com/en/docs/ModelArk/1541523) for supported parameters.

## Running Locally

```bash
cd nft-webapp
npm install
npm run dev
```

The `dev` script runs both the Express proxy (`server.js` on port 4000) and the React app (port 3000) via `concurrently`.

To run the backend only:

```bash
node server.js
```

## Using the Generator

1. Connect MetaMask to Lisk Sepolia in the UI.
2. Enter a descriptive theme in the “Generate Description & Image” field.
3. The backend will:
   - Call Deepseek v3 to author a 30–60 word description.
   - Call Seedream 4.0 using the Image Generation API to produce NFT art.
4. Review the generated metadata and inline image preview, tweak if needed, and mint the NFT.

If Seedream fails or times out, the UI shows a warning message and falls back to an inline SVG placeholder.

## Troubleshooting

- **Placeholder image**: Confirm your `BYTEPLUS_IMAGE_MODEL` (or `BYTEPLUS_IMAGE_ENDPOINT_ID`) matches an enabled Seedream 4.0 endpoint and that the API key has permissions.
- **Timeouts**: Increase `BYTEPLUS_IMAGE_POLL_TIMEOUT_MS` or lower resolution (`BYTEPLUS_IMAGE_ASPECT_RATIO`).
- **Invalid key**: The Express server logs “Ark API error 401”; double-check `ARK_API_KEY`.

For more detail on request payloads and task polling, reference the [BytePlus ModelArk Image Generation API (Seedream 4.0)](https://docs.byteplus.com/en/docs/ModelArk/1541523).
