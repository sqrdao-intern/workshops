document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    function updateActiveNav(hash) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === hash);
        });
    }

    function updateContent(hash) {
        contentSections.forEach(section => {
            section.classList.toggle('active', '#' + section.id === hash);
        });
    }

    function handleNavigation(hash) {
        updateActiveNav(hash);
        updateContent(hash);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(window.location.hash !== targetId) {
               history.pushState(null, null, targetId);
               handleNavigation(targetId);
            }
        });
    });
    
    window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#welcome';
        handleNavigation(hash);
    });
    
    const initialHash = window.location.hash || '#welcome';
    handleNavigation(initialHash);

    const ideaCards = document.querySelectorAll('.idea-card');
    const ideaModal = document.getElementById('idea-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalProblem = document.getElementById('modal-problem');
    const modalAI = document.getElementById('modal-ai');
    const modalSolana = document.getElementById('modal-solana');
    const modalImpact = document.getElementById('modal-impact');
    const closeModal = document.getElementById('close-modal');

    const ideaData = {
        'compute-marketplace': {
            title: "Decentralized AI Compute Marketplace",
            problem: "Problem Solved: Centralized cloud providers are expensive and lack transparency for AI model training and inference.",
            ai: "AI Integration: Users rent/lend GPU power for AI model training/inference, with AI matching requests to available resources and optimizing task distribution.",
            solana: "Solana Advantage: High transaction throughput and low fees enable micro-payments for compute time and rapid allocation of resources, making it economically viable for frequent AI tasks. Solana's speed allows for near real-time resource discovery and payment settlement.",
            impact: "Potential Impact: Democratizes access to AI compute, reduces costs, and fosters a more resilient and transparent infrastructure for AI development."
        },
        'model-verification': {
            title: "On-Chain AI Model Verification",
            problem: "Problem Solved: Lack of trust and transparency in proprietary AI models regarding bias, fairness, and accuracy.",
            ai: "AI Integration: AI models are submitted to the chain, and a decentralized network of validators (potentially using AI themselves) verifies their properties (e.g., bias detection, performance metrics) through cryptographic proofs.",
            solana: "Solana Advantage: Solana's parallel processing (Sealevel) and high transaction speed are crucial for rapidly processing and recording verification results, enabling frequent and cost-effective attestations of model integrity.",
            impact: "Potential Impact: Increases trust in AI systems, promotes ethical AI development, and enables auditable AI for critical applications like finance or healthcare."
        },
        'defi-strategy': {
            title: "AI-Powered DeFi Strategy Vaults",
            problem: "Problem Solved: Complex and time-consuming manual management of DeFi investment strategies, often leading to suboptimal returns or high gas fees.",
            ai: "AI Integration: AI agents analyze real-time market data on Solana, identify optimal lending, borrowing, and yield farming opportunities, and execute trades autonomously within smart contract vaults.",
            solana: "Solana Advantage: Extremely low transaction fees and sub-second finality allow AI agents to execute complex, high-frequency DeFi strategies efficiently without being hampered by high costs or latency, maximizing returns.",
            impact: "Potential Impact: Automates and optimizes DeFi investments for users, potentially leading to higher yields and reduced operational overhead."
        },
        'generative-nft': {
            title: "Generative AI NFT Platform",
            problem: "Problem Solved: The desire for unique, algorithmically generated digital art and collectibles with transparent ownership.",
            ai: "AI Integration: Users provide text prompts or parameters, and generative AI models (e.g., Stable Diffusion, DALL-E) create unique visual or audio NFTs. AI can also be used to evolve NFTs over time based on user interaction or on-chain events.",
            solana: "Solana Advantage: Low minting costs and high transaction speed make it feasible to generate and mint a large volume of unique NFTs on demand, providing a smooth user experience for creators and collectors.",
            impact: "Potential Impact: Expands the creative possibilities within the NFT space, offering new forms of digital art and collectibles with dynamic attributes."
        },
        'content-curation': {
            title: "AI-Driven Content Curation (Decentralized Social)",
            problem: "Problem Solved: Centralized social media platforms often have opaque algorithms, censorship, and unfair content monetization.",
            ai: "AI Integration: AI models curate personalized content feeds based on user preferences and engagement, while ensuring transparency and resisting censorship. AI can also be used for spam detection and content moderation in a decentralized manner.",
            solana: "Solana Advantage: High throughput is essential for handling the massive volume of content and user interactions on a social media platform. Low fees enable micro-payments for content creators and decentralized content storage incentives.",
            impact: "Potential Impact: Creates more equitable and transparent social media experiences, empowering users and creators with greater control over their data and content."
        },
        'predictive-analytics': {
            title: "Predictive Analytics for Solana Ecosystem",
            problem: "Problem Solved: Developers and investors need real-time, actionable insights into Solana network performance, dApp trends, and token price movements.",
            ai: "AI Integration: AI models analyze vast amounts of on-chain data (transactions, TVL, user activity) and off-chain market data to predict future trends, identify anomalies, and provide actionable intelligence.",
            solana: "Solana Advantage: The ability to process and store high volumes of on-chain data efficiently makes Solana an ideal source for training robust AI predictive models. Fast data availability ensures real-time predictions.",
            impact: "Potential Impact: Empowers developers to build more robust dApps, helps investors make informed decisions, and contributes to the overall health and stability of the Solana ecosystem."
        },
        'ai-gaming': {
            title: "AI-Enhanced Gaming (Play-to-Earn)",
            problem: "Problem Solved: Limited complexity and dynamic behavior of NPCs in blockchain games, and a desire for more immersive and fair play-to-earn mechanics.",
            ai: "AI Integration: AI powers intelligent NPCs, dynamic game environments, and adaptive game difficulty. AI decisions or outcomes (e.g., loot generation, character progression) can be recorded on-chain for transparency and fairness.",
            solana: "Solana Advantage: Low latency and high transaction speeds are critical for real-time gaming experiences, allowing AI-driven interactions to feel seamless. Low fees enable frequent in-game transactions and NFT minting.",
            impact: "Potential Impact: Creates more engaging, dynamic, and transparent play-to-earn games, attracting a wider audience and fostering true digital ownership of in-game assets."
        },
        'data-oracle': {
            title: "Decentralized AI Data Oracle",
            problem: "Problem Solved: Smart contracts often need access to reliable, real-world data, but traditional oracles can be centralized and vulnerable to manipulation.",
            ai: "AI Integration: AI models process and verify off-chain data from various sources, identifying inconsistencies or malicious inputs. This AI-vetted data is then fed to Solana smart contracts as reliable data feeds.",
            solana: "Solana Advantage: Solana's speed allows for rapid data updates from the oracle, providing smart contracts with near real-time information. Low fees make frequent data requests economically feasible.",
            impact: "Potential Impact: Enhances the reliability and security of dApps that depend on external data, enabling more sophisticated and trustworthy decentralized applications across various sectors."
        },
        'identity-verification': {
            title: "AI-Powered Identity Verification",
            problem: "Problem Solved: Centralized identity verification systems are prone to data breaches and lack user control over personal information.",
            ai: "AI Integration: AI assists in verifying user identities (e.g., facial recognition, document analysis) while preserving privacy through zero-knowledge proofs or federated learning. AI can also detect fraudulent activities.",
            solana: "Solana Advantage: High transaction throughput supports the processing of numerous identity verification requests efficiently. Low fees make frequent attestations or updates to decentralized identity records practical.",
            impact: "Potential Impact: Provides a more secure, private, and user-centric approach to digital identity, enabling compliant yet decentralized KYC/AML solutions and reputation systems."
        },
        'autonomous-agents': {
            title: "Autonomous AI Agents on Solana",
            problem: "Problem Solved: The need for intelligent, self-executing entities that can interact with dApps and manage assets without constant human intervention.",
            ai: "AI Integration: AI agents are designed to understand goals, make decisions, and execute actions autonomously. They can manage DeFi portfolios, participate in DAOs, or automate complex tasks based on predefined logic and learned behaviors.",
            solana: "Solana Advantage: Solana's low transaction costs and high speed are critical for AI agents that need to perform many micro-transactions or react quickly to market changes. This enables truly autonomous and economically viable operations.",
            impact: "Potential Impact: Unleashes new possibilities for automation and decentralized governance, creating a future where AI entities can actively contribute to and benefit from the blockchain economy."
        }
    };

    ideaCards.forEach(card => {
        card.addEventListener('click', function() {
            const ideaKey = this.dataset.idea;
            const data = ideaData[ideaKey];

            modalTitle.textContent = data.title;
            modalProblem.textContent = data.problem;
            modalAI.textContent = data.ai;
            modalSolana.textContent = data.solana;
            modalImpact.textContent = data.impact;

            ideaModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal functionality
    closeModal.addEventListener('click', function() {
        ideaModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking on backdrop
    ideaModal.addEventListener('click', function(e) {
        if (e.target === ideaModal) {
            ideaModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !ideaModal.classList.contains('hidden')) {
            ideaModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    const dataTracks = document.querySelectorAll('.tab-btn');
    const chartTypeButtons = document.querySelectorAll('.chart-type-btn');
    const insightTitle = document.getElementById('insight-title');
    const insightText = document.getElementById('insight-text');
    const ctx = document.getElementById('dataStoryChart').getContext('2d');
    
    let currentChartType = 'bar';
    let currentTrack = 'ai-compute';

    const chartData = {
        'ai-compute': {
            bar: { data: [5000, 3000, 7000, 4500], labels: ['Q1 Usage (hrs)', 'Q2 Usage (hrs)', 'Q3 Forecast (hrs)', 'Avg Cost ($/hr)'], title: 'AI Compute Usage on Solana', text: 'Projected increase in AI compute usage on Solana, driven by new dApp deployments. Average cost per hour remains competitive.' },
            line: { data: [100, 120, 150, 180, 220, 250], labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], borderColor: '#14F195', title: 'Monthly Decentralized AI Compute Growth', text: 'Consistent month-over-month growth in decentralized AI compute hours, indicating increasing adoption of on-chain AI solutions.' },
            pie: { data: [40, 30, 20, 10], labels: ['Model Training', 'Inference', 'Data Processing', 'Other'], backgroundColor: ['#9945FF', '#14F195', '#a855f7', '#34d399'], title: 'AI Compute Usage Breakdown', text: 'Model training accounts for the largest share of compute usage, followed by real-time inference, reflecting diverse AI workloads.' }
        },
        'on-chain-data': {
            bar: { data: [10, 25, 18, 30], labels: ['Q1 Volume (TB)', 'Q2 Volume (TB)', 'Q3 Forecast (TB)', 'Avg Tx Cost ($)'], title: 'On-Chain AI Data Volume', text: 'Significant growth in on-chain AI data volume, demonstrating increased storage and processing of AI-related data on Solana.' },
            line: { data: [5, 8, 12, 15, 20, 25], labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], borderColor: '#14F195', title: 'Monthly On-Chain AI Data Growth', text: 'Steady increase in monthly on-chain AI data volume, indicating a growing trend of integrating AI data directly onto the blockchain for transparency and immutability.' },
            pie: { data: [50, 30, 20], labels: ['Model Parameters', 'Inference Results', 'Training Data'], backgroundColor: ['#9945FF', '#14F195', '#a855f7'], title: 'On-Chain AI Data Types', text: 'Model parameters and inference results constitute the majority of on-chain AI data, crucial for verifiable and auditable AI applications.' }
        },
        'user-engagement': {
            bar: { data: [8000, 12000, 15000, 75], labels: ['Monthly Active Users', 'New Users (Q)', 'Total Transactions (K)', 'Retention Rate (%)'], title: 'dApp User Engagement Metrics', text: 'Strong growth in monthly active users and new user acquisition, with a healthy retention rate indicating sticky dApps.' },
            line: { data: [50, 60, 70, 65, 80, 90], labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'], borderColor: '#14F195', title: 'Weekly dApp User Engagement', text: 'Weekly engagement shows fluctuations but an overall positive trend, with peak engagement correlating with new feature releases.' },
            pie: { data: [45, 30, 25], labels: ['Gaming dApps', 'DeFi dApps', 'Social dApps'], backgroundColor: ['#9945FF', '#14F195', '#a855f7'], title: 'dApp Category Engagement', text: 'Gaming dApps lead in user engagement, followed by DeFi and social applications, highlighting key areas of user interest on Solana.' }
        }
    };
    
    let myChart = null;

    function renderChart() {
        if (myChart) myChart.destroy();
        const dataConfig = chartData[currentTrack][currentChartType];
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: currentChartType !== 'pie', labels: { color: '#cbd5e1' } },
                tooltip: { backgroundColor: '#1e293b', titleFont: { size: 14 }, bodyFont: { size: 12 }, padding: 10, cornerRadius: 4 }
            },
            scales: currentChartType === 'pie' ? {} : {
                y: { beginAtZero: true, grid: { color: '#334155' }, ticks: { color: '#cbd5e1' } },
                x: { grid: { color: '#334155' }, ticks: { color: '#cbd5e1' } }
            }
        };
        myChart = new Chart(ctx, {
            type: currentChartType,
            data: {
                labels: dataConfig.labels,
                datasets: [{
                    label: dataConfig.title,
                    data: dataConfig.data,
                    backgroundColor: currentChartType === 'pie' ? dataConfig.backgroundColor : '#9945FF',
                    borderColor: '#14F195',
                    borderWidth: 1,
                    borderRadius: currentChartType === 'bar' ? 4 : 0,
                    fill: currentChartType === 'line',
                    tension: currentChartType === 'line' ? 0.3 : 0,
                }]
            },
            options: chartOptions
        });
        insightTitle.textContent = dataConfig.title;
        insightText.textContent = dataConfig.text;
    }

    function updateTrack(track) {
        currentTrack = track;
        renderChart();
        dataTracks.forEach(btn => btn.classList.toggle('active', btn.dataset.track === track));
    }

    function updateChartType(type) {
        currentChartType = type;
        renderChart();
        chartTypeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.chartType === type));
    }

    dataTracks.forEach(button => button.addEventListener('click', () => updateTrack(button.dataset.track)));
    chartTypeButtons.forEach(button => button.addEventListener('click', () => updateChartType(button.dataset.chartType)));
    
    updateTrack(currentTrack);
    updateChartType(currentChartType);
}); 