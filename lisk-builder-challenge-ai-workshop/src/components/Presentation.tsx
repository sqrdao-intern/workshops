'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Slide from './Slide';
import LiskMark from './icons/LiskMark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCommentDots, faGem, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import '../styles/presentation.css';

const Presentation: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const totalSlides = 11; // Total number of slides in the presentation

  const scrollToIndex = (index: number) => {
    const el = document.getElementById(`slide-${index + 1}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const nextSlide = () => {
    setActiveSlide((prev) => {
      const next = prev < totalSlides - 1 ? prev + 1 : prev;
      if (next !== prev) scrollToIndex(next);
      return next;
    });
  };

  const prevSlide = () => {
    setActiveSlide((prev) => {
      const next = prev > 0 ? prev - 1 : prev;
      if (next !== prev) scrollToIndex(next);
      return next;
    });
  };
  
  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowDown') nextSlide();
      if (e.key === 'ArrowUp') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Observe slides to sync active index while the user scrolls
  useEffect(() => {
    const root = containerRef.current || undefined;
    const slides = Array.from(document.querySelectorAll('.slides-container .slide')) as HTMLElement[];
    if (!slides.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id; // e.g., slide-1
          const idx = Math.max(0, Math.min(totalSlides - 1, parseInt(id.split('-')[1], 10) - 1));
          setActiveSlide(idx);
        }
      },
      { root, threshold: [0.5, 0.75] }
    );
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="presentation-container">
      <div className="slides-container" ref={containerRef}>
        {/* Slide 1: Title Slide */}
        <Slide id="slide-1" isActive={activeSlide === 0}>
          <div className="title-slide">
            <h1>Applying the Magic Fertilizer</h1>
            <h2>AI-Powered Workflow Session 6</h2>
            <h3>Supercharge Your Web3 Development Process</h3>
            <div className="presenter-info">
              <span className="presenter-icon" aria-hidden="true"><LiskMark size={20} /></span>
              <span className="presenter-label">By</span>
              <span className="presenter-name">Long "Leo" Pham</span>
              <span className="presenter-sep">·</span>
              <span className="presenter-org">sqrDAO</span>
              <span className="presenter-sep">·</span>
              <span className="presenter-date">12 November 2025</span>
            </div>
            {/* Title slide logos removed per request */}
          </div>
        </Slide>

        {/* Slide 2: The "Garden" We're Tending */}
        <Slide id="slide-2" isActive={activeSlide === 1}>
          <h2>❓ The "Garden" We're Tending</h2>
          <h3>Why is Web3 Development So Hard?</h3>
          <div className="content-box">
            <div className="challenge-list">
              <div className="challenge-item">
                <h4>High Stakes:</h4>
                <p>Smart contract bugs are irreversible and can lead to catastrophic financial loss.</p>
              </div>
              <div className="challenge-item">
                <h4>Complexity:</h4>
                <p>Protocols are intricate, and "money legos" create complex dependencies.</p>
              </div>
              <div className="challenge-item">
                <h4>Slow "Growth":</h4>
                <p>Audits are a major bottleneck, acting as a "drought" that slows down shipping.</p>
              </div>
              <div className="challenge-item">
                <h4>Repetitive Toil:</h4>
                <p>Writing boilerplate, unit tests, and deployment scripts is "weeding" we all hate to do.</p>
              </div>
            </div>
            <div className="goal-statement">
              <p>Our goal: Use AI to tend to our garden more efficiently, safely, and quickly.</p>
            </div>
          </div>
        </Slide>

        {/* Slide 3: What is the "Magic Fertilizer"? */}
        <Slide id="slide-3" isActive={activeSlide === 2}>
          <h2>💡 What is the "Magic Fertilizer"?</h2>
          <div className="content-box">
            <h3>It's not magic—it's your AI Pair Programmer.</h3>
            <p>We're talking about Generative AI and Large Language Models (LLMs) like GPT-4o, Claude 3, and specialized code models.</p>
            <p>These tools are trained on a massive corpus of data, including documentation, forums, and billions of lines of code (including Solidity, Rust, Go, etc.).</p>
            
            <h4>They excel at:</h4>
            <div className="ai-capabilities">
              <div className="capability">Pattern recognition</div>
              <div className="capability">Contextual understanding</div>
              <div className="capability">Code generation</div>
              <div className="capability">Translation and explanation</div>
            </div>
          </div>
        </Slide>

        {/* Slide 4: Application 1: Seeding the Rows */}
        <Slide id="slide-4" isActive={activeSlide === 3}>
          <h2>🌱 Application 1: Seeding the Rows (Code Generation)</h2>
          <h3>From Prompt to Prototype in Minutes</h3>
          <div className="two-column">
            <div className="column">
              <div className="application-item">
                <h4>Module & Command Scaffolding:</h4>
                <p className="prompt-example">"Create a Lisk module for NFT transfers with custom commands for minting and burning, using the Lisk SDK."</p>
              </div>
              <div className="application-item">
                <h4>Unit Test Generation:</h4>
                <p className="prompt-example">"Generate 5 unit tests for this transferAsset command using Jest, including edge cases for insufficient balance."</p>
              </div>
            </div>
            <div className="column">
              <div className="application-item">
                <h4>CLI & Scripts:</h4>
                <p className="prompt-example">"Write a Lisk Commander script to bootstrap a new blockchain application with custom modules and assets."</p>
              </div>
              <div className="application-item">
                <h4>Frontend Integration:</h4>
                <p className="prompt-example">"Create a React hook using lisk-client to query account balance and send transactions."</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* Slide 5: Application 2: Weeding the Garden */}
        <Slide id="slide-5" isActive={activeSlide === 4}>
          <h2>🐛 Application 2: Weeding the Garden (Bug Detection)</h2>
          <h3>Finding Vulnerabilities Before They Find You</h3>
          <div className="content-box">
            <div className="application-item">
              <h4>AI-Powered "Rubber Ducking":</h4>
              <p>Paste your function and ask: "What did I miss? Are there any security vulnerabilities here?"</p>
            </div>
            
            <div className="application-item">
              <h4>Spotting Common Pests:</h4>
              <p>AI is excellent at identifying common vulnerability patterns:</p>
              <div className="vulnerability-list">
                <div className="vulnerability">Re-entrancy</div>
                <div className="vulnerability">Integer overflow/underflow</div>
                <div className="vulnerability">Unchecked external calls</div>
                <div className="vulnerability">Access control issues (e.g., missing onlyOwner)</div>
              </div>
            </div>
            
            <div className="application-item">
              <h4>Intelligent Static Analysis:</h4>
              <p>Unlike traditional linters, AI can understand the intent and context of your code to find more subtle bugs.</p>
            </div>
          </div>
        </Slide>

        {/* Slide 6: Application 3: Pruning the Branches */}
        <Slide id="slide-6" isActive={activeSlide === 5}>
          <h2>✂️ Application 3: Pruning the Branches (Optimization)</h2>
          <h3>Making Your Code Cheaper, Faster, and Cleaner</h3>
          <div className="two-column">
            <div className="column">
              <div className="application-item">
                <h4>Gas Optimization:</h4>
                <p className="prompt-example">"How can I refactor this function to be more gas-efficient?"</p>
                <p>AI can suggest: variable packing, using calldata, or refactoring loops.</p>
              </div>
              <div className="application-item">
                <h4>Code Refactoring:</h4>
                <p className="prompt-example">"This function is hard to read. Can you refactor it for clarity while keeping the same logic?"</p>
              </div>
            </div>
            <div className="column">
              <div className="application-item">
                <h4>Automated Documentation:</h4>
                <p className="prompt-example">"Generate NatSpec comments for this entire smart contract."</p>
                <p>(A massive time-saver!)</p>
              </div>
              <div className="application-item">
                <h4>Translation & Explanation:</h4>
                <p className="prompt-example">"Explain this complex function in simple terms" or "Translate this from Solidity to Vyper."</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* Slide 7: The Gardener's Toolkit (The Interfaces) */}
        <Slide id="slide-7" isActive={activeSlide === 6}>
          <h2>🧰 The Gardener's Toolkit (The Interfaces)</h2>
          <h3>How you interact with the AI.</h3>
          <div className="toolkit-grid">
            <div className="toolkit-item">
              <div className="card-logo">
                <Image src="/cursor.png" alt="Cursor" width={200} height={64} />
              </div>
              <h4>1. AI-Native IDEs:</h4>
              <p><strong>Cursor:</strong> An "AI-first" editor (forked from VS Code). It's built around AI.</p>
              <p>Lets you "chat with your repo," generate code from prompts, and auto-fix errors in a deeply integrated way.</p>
              <p>This is like having the "Magic Fertilizer" mixed directly into your soil.</p>
            </div>
            <div className="toolkit-item">
              <div className="card-logo">
                <Image src="/copilot.png" alt="GitHub Copilot" width={220} height={64} />
              </div>
              <h4>2. IDE Plugins:</h4>
              <p><strong>GitHub Copilot:</strong> The most common tool. Integrates directly into your existing IDE (VS Code, JetBrains, etc.).</p>
              <p>Provides real-time, in-line code suggestions (the "autocomplete on steroids").</p>
            </div>
            <div className="toolkit-item">
              <div className="card-logo">
                <Image src="/gemini.png" alt="Gemini" width={180} height={64} />
              </div>
              <h4>3. Chat Interfaces:</h4>
              <p><strong>Gemini, ChatGPT, etc.:</strong> Your "command central" for analysis, bug hunting, and optimization.</p>
              <p>Best for long-form explanation, refactoring large blocks, and "rubber-ducking" complex logic.</p>
            </div>
          </div>
        </Slide>

        {/* Slide 8: Cautions: Don't Over-Fertilize! */}
        <Slide id="slide-8" isActive={activeSlide === 7}>
          <h2>⚠️ Cautions: Don't Over-Fertilize!</h2>
          <h3>AI is a Tool, Not an Oracle. You are the Gardener.</h3>
          <div className="caution-grid">
            <div className="caution-item">
              <h4>NEVER Trust, ALWAYS Verify.</h4>
              <p>AI confidently hallucinates. It can invent functions, misunderstand context, and introduce subtle bugs.</p>
            </div>
            <div className="caution-item">
              <h4>Security is YOUR Responsibility.</h4>
              <p>NEVER copy-paste AI-generated code directly into a production smart contract without a rigorous, line-by-line review.</p>
            </div>
            <div className="caution-item">
              <h4>Data Privacy:</h4>
              <p>Be cautious pasting proprietary or sensitive code into public web UIs. Use enterprise accounts or IDE integrations that have better data-handling policies.</p>
            </div>
            <div className="caution-item">
              <h4>Garbage In = Garbage Out:</h4>
              <p>The quality of your prompt determines the quality of the output. Prompt engineering is the new essential skill.</p>
            </div>
          </div>
        </Slide>

        {/* Slide 9: Conclusion */}
        <Slide id="slide-9" isActive={activeSlide === 8}>
          <h2>🌳 Conclusion: Grow Faster, Grow Smarter</h2>
          <h3>AI augments your craft across generation, safety, and optimization.</h3>
          <div className="conclusion-content">
            <div className="key-takeaways">
              <h4>Key Takeaways</h4>
              <ul>
                <li><strong>Code Faster</strong>: Bootstrap contracts, tests, and scripts from clear prompts.</li>
                <li><strong>Ship Safer</strong>: Use AI for reviews, threat modeling, and static checks.</li>
                <li><strong>Optimize Smarter</strong>: Refactor for clarity, gas, and maintainability.</li>
              </ul>
            </div>
            <div className="next-steps">
              <h4>Next Steps</h4>
              <p>Adopt an AI-first workflow in your IDE and chat tools.</p>
              <p>Keep a human-in-the-loop review for every critical change.</p>
              <p>Build a repeatable prompt library for your team.</p>
              <div className="contact-info">Questions later? Reach out via sqrDAO.</div>
            </div>
          </div>
        </Slide>

        {/* Slide 10: Resources */}
        <Slide id="slide-10" isActive={activeSlide === 9}>
          <h2>📚 Resources</h2>
          <h3>Workshop references and community links</h3>
          <div className="toolkit-grid">
            <div className="toolkit-item">
              <h4>Workshop Reference Notebook (NotebookLM)</h4>
              <p>Access curated workshop notes, resources, and supplementary materials in this interactive NotebookLM notebook. Ideal for reviewing concepts, following up on workshop content, and exploring additional references.</p>
              <p><a href="https://notebooklm.google.com/notebook/51d24744-6112-4c26-9f44-75935d16cdd2?_gl=1*szxbtk*_ga*NDY5ODUwMjc3LjE3NTE2MTAwNjM.*_ga_W0LDH41ZCB*czE3NTE2ODU5NTEkbzMkZzEkdDE3NTE2ODYxOTYkajYwJGwwJGgw" target="_blank" rel="noreferrer noopener">Open NotebookLM</a></p>
            </div>
            <div className="toolkit-item">
              <h4>Castelian's BUIDL Logs (Telegram Channel)</h4>
              <p>Join the Telegram channel for ongoing discussions, updates, and curated content about AI prototyping, data storytelling, and workshop-related topics. Connect with the community and stay informed.</p>
              <p><a href="https://t.me/castelianthoughts" target="_blank" rel="noreferrer noopener">Join Telegram Channel</a></p>
            </div>
            <div className="toolkit-item">
              <h4>sqrAgent Telegram Bot</h4>
              <p>An intelligent Telegram bot that helps users interact with sqrDAO's ecosystem. sqrAgent answers questions, provides updates, and supports participation in governance and community activities—all within Telegram.</p>
              <p><a href="https://t.me/sqrAgent_bot" target="_blank" rel="noreferrer noopener">Try sqrAgent on Telegram</a></p>
            </div>
          </div>
        </Slide>

        {/* Slide 11: Appendix — The Brains & Platforms */}
        <Slide id="slide-11" isActive={activeSlide === 10}>
          <h2>🧠 Appendix: AI Brains & Platforms</h2>
          <h3>Additional providers and infrastructure to explore.</h3>
          <div className="two-column">
            <div className="column">
              <div className="toolkit-item">
                <div className="card-logo">
                  <Image src="/deepseek.png" alt="DeepSeek" width={200} height={64} />
                </div>
                <h4>Specialized Code Models:</h4>
                <p><strong>DeepSeek Coder:</strong> Models trained on billions of lines of code, optimized for complex logic and algorithms.</p>
                <p>Outperforms general models on coding-specific tasks.</p>
              </div>
            </div>
            <div className="column">
              <div className="toolkit-item">
                <div className="card-logo">
                  <Image src="/byteplus.png" alt="BytePlus" width={200} height={64} />
                </div>
                <h4>Enterprise AI Platforms:</h4>
                <p><strong>BytePlus:</strong> Enterprise-grade AI cloud platform (from ByteDance) for scaling AI applications.</p>
                <p>Provides access to multiple models, vector databases, and GPU compute power.</p>
              </div>
            </div>
            <div className="column">
              <div className="toolkit-item">
                <div className="card-logo">
                  <Image src="/trae.png" alt="Trae" width={200} height={64} />
                </div>
                <h4>Agent Orchestration:</h4>
                <p><strong>Trae Agent:</strong> A platform for building, orchestrating, and deploying production-grade AI agents.</p>
                <p>Enables complex workflows with multiple agents, tool integrations, and scalable infrastructure for AI-powered applications.</p>
                <p><a href="https://trae.ai" target="_blank" rel="noreferrer noopener">trae.ai</a></p>
              </div>
            </div>
          </div>
        </Slide>

      </div>
    </div>
  );
};

export default Presentation;
