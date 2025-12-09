document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    function updateActiveNav(hash) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function updateContent(hash) {
        contentSections.forEach(section => {
            if ('#' + section.id === hash) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            history.pushState(null, null, targetId);
            updateActiveNav(targetId);
            updateContent(targetId);
        });
    });
    
    window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#welcome';
        updateActiveNav(hash);
        updateContent(hash);
    });
    
    const initialHash = window.location.hash || '#welcome';
    updateActiveNav(initialHash);
    updateContent(initialHash);


    const liskTabs = document.querySelectorAll('.lisk-tab-btn');
    const liskContent = document.getElementById('lisk-content');
    const liskContentData = {
        'lisk-adoption': { title: "Driving Adoption", text: "Our intuitive UI/UX, coupled with gamified incentives, lowers the barrier to entry for Web2 users, onboarding them directly into the Lisk ecosystem." },
        'lisk-market-fit': { title: "Market Fit", text: "Our decentralized identity solution addresses the growing demand for secure and interoperable digital identities within the Lisk Sidechain ecosystem, enhancing user trust and simplifying dApp interactions." },
        'lisk-tech': { title: "Technical Advantages", text: "By building on a Lisk Sidechain, we benefit from its high scalability and predictable low transaction fees, ensuring a smooth and cost-effective user experience. The upcoming EVM compatibility will further broaden our developer reach." },
        'lisk-community': { title: "Community Impact", text: "We plan to integrate community governance features, allowing LSK holders to vote on key protocol upgrades, fostering a sense of ownership and active participation within the Lisk community." },
        'lisk-interop': { title: "Interoperability Benefits", text: "Our cross-chain asset bridge leverages Lisk's interoperability with the Optimism Superchain, enabling seamless asset transfers and liquidity flow, thus enriching the entire OP Stack ecosystem." },
    };

    liskTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.target;
            const content = liskContentData[target];
            liskContent.innerHTML = `<h4 class="font-bold text-lisk-blue">${content.title}</h4><p class="text-slate-600">${content.text}</p>`;
        });
    });

    const dataTracks = document.querySelectorAll('.tab-btn');
    const chartTypeButtons = document.querySelectorAll('.chart-type-btn');
    const insightTitle = document.getElementById('insight-title');
    const insightText = document.getElementById('insight-text');
    const ctx = document.getElementById('dataStoryChart').getContext('2d');
    
    let currentChartType = 'bar'; // Default chart type
    let currentTrack = 'consumer'; // Default track

    const chartData = {
        consumer: {
            bar: {
                labels: ['Q1 Growth', 'Engagement', 'Q2 Forecast', 'Retention'],
                data: [1500, 75, 2200, 60],
                backgroundColor: '#3561F6',
                title: 'Consumer Apps: User Adoption Predictions',
                text: 'AI models predict a strong Q2 user growth of 46%, driven by high initial engagement. However, retention rates may dip without new feature rollouts, suggesting a focus on product iteration.'
            },
            line: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [1000, 1200, 1500, 1700, 2000, 2200],
                borderColor: '#3561F6',
                title: 'Consumer Apps: Monthly User Growth',
                text: 'Visualizing user growth over six months reveals a consistent upward trend, demonstrating successful user acquisition strategies. The steepest growth occurred in Q2.'
            },
            pie: {
                labels: ['New Users', 'Returning Users'],
                data: [55, 45],
                backgroundColor: ['#3561F6', '#25AC67'],
                title: 'Consumer Apps: User Type Distribution',
                text: 'The distribution of users shows that new users currently represent 55% of the total, indicating effective marketing. Sustaining returning users will be key for long-term growth.'
            }
        },
        stablecoins: {
            bar: {
                labels: ['Market Cap ($B)', 'Volume ($B)', 'Growth %', 'Adoption Rate'],
                data: [130, 650, 15, 45],
                backgroundColor: '#3561F6',
                title: 'Stablecoins: Market Size Visualization',
                text: 'The stablecoin market remains robust with a $130B capitalization. AI analysis highlights a 15% growth in new wallets, indicating widening adoption outside of core crypto trading.'
            },
            line: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [100, 105, 115, 120, 125, 130], // Market Cap in Billions
                borderColor: '#3561F6',
                title: 'Stablecoins: Market Cap Trend',
                text: 'The line chart illustrates a steady increase in stablecoin market capitalization over the past six months, reflecting growing confidence and utility in the crypto ecosystem.'
            },
            pie: {
                labels: ['USDT Share', 'USDC Share', 'Others'],
                data: [68, 25, 7],
                backgroundColor: ['#3561F6', '#25AC67', '#7E3AF2'],
                title: 'Stablecoins: Dominance by Type',
                text: 'A pie chart of stablecoin market share reveals USDT maintains significant dominance, followed by USDC. The "Others" category indicates opportunities for niche stablecoin growth.'
            }
        },
        defi: {
            bar: {
                labels: ['TVL ($B)', 'Active Users', 'Alpha Leakage', 'Comp. A TVL'],
                data: [45, 12000, 8, 30],
                backgroundColor: '#3561F6',
                title: 'DeFi: Competitor Analysis',
                text: 'Our protocol shows strong TVL at $45B. Competitor analysis reveals that while Competitor A has lower TVL, their user base is growing faster. AI suggests our 8% alpha leakage is a key area for improvement.'
            },
            line: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                data: [30, 35, 40, 45], // TVL in Billions
                borderColor: '#3561F6',
                title: 'DeFi: Quarterly TVL Growth',
                text: 'Quarterly Total Value Locked (TVL) data indicates consistent growth, highlighting the protocol\'s increasing adoption and capital efficiency in the DeFi space.'
            },
            pie: {
                labels: ['Lending', 'DEX', 'Staking', 'Others'],
                data: [40, 30, 20, 10],
                backgroundColor: ['#3561F6', '#25AC67', '#7E3AF2', '#6b7280'],
                title: 'DeFi: Protocol Activity Distribution',
                text: 'The pie chart shows that lending protocols currently dominate DeFi activity, followed closely by decentralized exchanges (DEXs), reflecting major user engagement areas.'
            }
        }
    };
    
    let myChart = null; // Initialize chart as null

    function renderChart() {
        if (myChart) {
            myChart.destroy(); // Destroy existing chart instance
        }

        const dataConfig = chartData[currentTrack][currentChartType];

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: currentChartType !== 'pie' }, // Display legend for non-pie charts
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: { size: 14 },
                    bodyFont: { size: 12 },
                    padding: 10,
                    cornerRadius: 4,
                }
            }
        };

        if (currentChartType !== 'pie') {
            chartOptions.scales = { y: { beginAtZero: true } };
        }

        myChart = new Chart(ctx, {
            type: currentChartType,
            data: {
                labels: dataConfig.labels,
                datasets: [{
                    label: dataConfig.label || 'Value',
                    data: dataConfig.data,
                    backgroundColor: dataConfig.backgroundColor,
                    borderColor: dataConfig.borderColor || '#2b4cd6',
                    borderWidth: 1,
                    borderRadius: currentChartType === 'bar' ? 4 : 0,
                    fill: currentChartType === 'line' ? true : false,
                    tension: currentChartType === 'line' ? 0.3 : 0, // Smooth lines
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
        dataTracks.forEach(btn => {
           if(btn.dataset.track === track) {
               btn.classList.add('active');
           } else {
               btn.classList.remove('active');
           }
        });
    }

    function updateChartType(type) {
        currentChartType = type;
        renderChart();
        chartTypeButtons.forEach(btn => {
            if (btn.dataset.chartType === type) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    dataTracks.forEach(button => {
        button.addEventListener('click', function() {
            updateTrack(this.dataset.track);
        });
    });

    chartTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            updateChartType(this.dataset.chartType);
        });
    });
    
    // Initialize with default selections
    updateTrack(currentTrack);
    updateChartType(currentChartType);
}); 