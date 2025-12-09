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

    const solanaTabs = document.querySelectorAll('.solana-tab-btn');
    const solanaContent = document.getElementById('solana-content');
    const solanaContentData = {
        'sol-adoption': { title: "Driving Adoption", text: "Our dApp leverages Solana's high transaction throughput and low fees to provide a seamless user experience, making it attractive for mainstream adoption and onboarding users unfamiliar with blockchain." },
        'sol-market-fit': { title: "Market Fit", text: "Our decentralized compute marketplace addresses the growing demand for scalable, cost-efficient computing resources directly on the Solana network, enhancing developer capabilities and fostering innovation." },
        'sol-tech': { title: "Technical Advantages", text: "Built on Solana, our project fully utilizes its parallel processing capabilities via Sealevel and achieves lightning-fast, low-cost transactions, enabling real-time interactions previously impossible on other blockchains." },
        'sol-community': { title: "Community Impact", text: "We foster community engagement through open-source contributions, developer bounties, and a governance model that empowers SOL holders to shape the protocol's future, strengthening the vibrant Solana ecosystem." },
        'sol-interop': { title: "Interoperability Benefits", text: "Our solution integrates seamlessly with Wormhole, enabling cross-chain asset transfers and data flow between Solana and other major blockchains, contributing to a more interconnected Web3 landscape." },
    };

    solanaTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.target;
            const content = solanaContentData[target];
            solanaContent.innerHTML = `<h4 class="font-bold text-solana-purple">${content.title}</h4><p class="text-slate-400">${content.text}</p>`;
            solanaTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const dataTracks = document.querySelectorAll('.tab-btn');
    const chartTypeButtons = document.querySelectorAll('.chart-type-btn');
    const insightTitle = document.getElementById('insight-title');
    const insightText = document.getElementById('insight-text');
    const ctx = document.getElementById('dataStoryChart').getContext('2d');
    
    let currentChartType = 'bar';
    let currentTrack = 'consumer';

    const chartData = {
        consumer: {
            bar: { data: [1500, 75, 2200, 60], labels: ['Q1 Growth', 'Engagement', 'Q2 Forecast', 'Retention'], title: 'Consumer Apps: User Adoption Predictions', text: 'AI models predict a strong Q2 user growth of 46%, driven by high initial engagement. However, retention rates may dip without new feature rollouts.' },
            line: { data: [1000, 1200, 1500, 1700, 2000, 2200], labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], title: 'Consumer Apps: Monthly User Growth', text: 'Visualizing user growth over six months reveals a consistent upward trend, demonstrating successful user acquisition strategies.' },
            pie: { data: [55, 45], labels: ['New Users', 'Returning Users'], title: 'Consumer Apps: User Type Distribution', text: 'New users currently represent 55% of the total, indicating effective marketing. Sustaining returning users will be key for long-term growth.' }
        },
        stablecoins: {
            bar: { data: [130, 650, 15, 45], labels: ['Market Cap ($B)', 'Volume ($B)', 'Growth %', 'Adoption Rate'], title: 'Stablecoins: Market Size Visualization', text: 'The stablecoin market remains robust with a $130B capitalization. AI analysis highlights a 15% growth in new wallets.' },
            line: { data: [100, 105, 115, 120, 125, 130], labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], title: 'Stablecoins: Market Cap Trend', text: 'The line chart illustrates a steady increase in stablecoin market capitalization over the past six months, reflecting growing confidence.' },
            pie: { data: [68, 25, 7], labels: ['USDT Share', 'USDC Share', 'Others'], title: 'Stablecoins: Dominance by Type', text: 'A pie chart of stablecoin market share reveals USDT maintains significant dominance, followed by USDC.' }
        },
        defi: {
            bar: { data: [45, 12000, 8, 30], labels: ['TVL ($B)', 'Active Users', 'Alpha Leakage', 'Comp. A TVL'], title: 'DeFi: Competitor Analysis', text: 'Our protocol shows strong TVL at $45B. Competitor analysis reveals that while Competitor A has lower TVL, their user base is growing faster.' },
            line: { data: [30, 35, 40, 45], labels: ['Q1', 'Q2', 'Q3', 'Q4'], title: 'DeFi: Quarterly TVL Growth', text: 'Quarterly Total Value Locked (TVL) data indicates consistent growth, highlighting the protocol\'s increasing adoption.' },
            pie: { data: [40, 30, 20, 10], labels: ['Lending', 'DEX', 'Staking', 'Others'], title: 'DeFi: Protocol Activity Distribution', text: 'The pie chart shows that lending protocols currently dominate DeFi activity, followed closely by decentralized exchanges (DEXs).' }
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
                    data: dataConfig.data,
                    backgroundColor: currentChartType === 'pie' ? ['#9945FF', '#14F195', '#a855f7', '#34d399'] : '#9945FF',
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