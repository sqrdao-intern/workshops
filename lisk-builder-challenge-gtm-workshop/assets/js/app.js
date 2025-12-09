const {
            ThemeProvider,
            createTheme,
            CssBaseline,
            Typography,
            Container,
            Box,
            Grid,
            Card,
            CardContent,
            Paper,
            Stack,
            Chip,
            Divider,
            Icon,
            Button
        } = MaterialUI;

        const liskTheme = createTheme({
            palette: {
                mode: 'light',
                primary: {
                    main: '#0057ff',
                    light: '#1a6bff',
                    dark: '#0a50e6',
                    contrastText: '#ffffff'
                },
                secondary: {
                    main: '#00e0b8',
                    light: '#00c9a4',
                    dark: '#00ae90',
                    contrastText: '#1f1f1f'
                },
                error: {
                    main: '#ef4444',
                    light: '#f87171',
                    dark: '#dc2626',
                    contrastText: '#ffffff'
                },
                warning: {
                    main: '#f59e0b',
                    light: '#fbbf24',
                    dark: '#d97706',
                    contrastText: '#ffffff'
                },
                info: {
                    main: '#2E9AD6',
                    light: '#57B0E0',
                    dark: '#247AAB',
                    contrastText: '#ffffff'
                },
                success: {
                    main: '#16a34a',
                    light: '#22c55e',
                    dark: '#15803d',
                    contrastText: '#ffffff'
                },
                background: {
                    default: '#ffffff',
                    paper: '#ffffff'
                },
                text: {
                    primary: '#1f1f1f',
                    secondary: '#6b7280'
                },
                divider: '#e5e7eb',
                grey: {
                    50: '#f8f8f8',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#2f2f2f',
                    900: '#1f1f1f'
                }
            },
            typography: {
                fontFamily: 'var(--font-sans)',
                h1: {
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 'var(--text-4xl)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: 'var(--foreground)'
                },
                h2: {
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 'var(--text-3xl)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: 'var(--foreground)'
                },
                h3: {
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: 'var(--text-xl)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.4,
                    color: 'var(--brand-primary)'
                },
                h4: {
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: 'var(--text-lg)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.4,
                    color: 'var(--neutral-700)'
                },
                h5: {
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 'var(--text-base)',
                    letterSpacing: '-0.01em'
                },
                h6: {
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: 'var(--text-xl)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.4
                },
                body1: {
                    fontSize: 'var(--text-lg)',
                    lineHeight: 1.4,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-muted)',
                    fontWeight: 400
                },
                body2: {
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.5,
                    color: 'var(--neutral-600)'
                },
                button: {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 'var(--text-base)'
                }
            },
            shape: {
                borderRadius: 12
            },
            transitions: {
                duration: {
                    shortest: 150,
                    shorter: 200,
                    short: 220,
                    standard: 300,
                    complex: 320,
                    enteringScreen: 225,
                    leavingScreen: 195
                },
                easing: {
                    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
                    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
                    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
                }
            },
            shadows: [
                'none',
                '0 1px 2px rgba(0, 0, 0, 0.06)',
                '0 4px 12px rgba(0, 0, 0, 0.08)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)',
                '0 10px 30px rgba(0, 0, 0, 0.12)'
            ],
            components: {
                MuiCard: {
                    styleOverrides: {
                        root: {
                            border: '1px solid var(--neutral-200)',
                            boxShadow: 'var(--shadow-sm)',
                            borderRadius: 'var(--radius-md)',
                            transition: 'transform var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 'var(--shadow-md)'
                            }
                        }
                    }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--neutral-200)',
                            backgroundColor: 'var(--surface)'
                        },
                        elevation0: {
                            boxShadow: 'var(--shadow-sm)'
                        }
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 'var(--radius-sm)',
                            padding: '10px 24px',
                            transition: 'all var(--duration-fast) var(--ease-standard)',
                            backgroundColor: 'var(--button-bg)',
                            color: 'var(--button-fg)',
                            '&:hover': {
                                backgroundColor: 'var(--button-bg-hover)',
                                transform: 'translateY(-2px)',
                                boxShadow: 'var(--shadow-md)'
                            }
                        }
                    }
                },
                MuiChip: {
                    styleOverrides: {
                        root: {
                            borderRadius: '999px',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            padding: '0.35rem 0.6rem'
                        }
                    }
                }
            }
        });

        const conceptData = {
            foundation: {
                pmf: {
                    title: "GTM Rule #1: Don't Build What You Love, Build What They Need.",
                    description: "Your Go-to-Market strategy begins with Product-Market Fit (PMF). This is the process of ensuring you are building a solution for a real problem that a specific group of people has.",
                    takeaway: {
                        title: "Action",
                        body: "Test early and often. Iterate fast. If market response is poor, pivot. If it's good, optimize (V2, V3)."
                    }
                },
                pivot: {
                    title: "Be Ready to Pivot: Failure is Preparation",
                    description: "Pivoting isn't a sign of failure; it's a sign of learning. Each pivot gets you closer to true PMF. Staying in the game during hard times builds conviction and trust.",
                    example: "The Zeus Network team pivoted 3+ times before finding a successful direction, leveraging their experience each time.",
                    takeaway: {
                        title: "Key Insight",
                        body: "The goal is not always 100% speed, but sometimes just survival. Persistence builds reputation."
                    }
                },
                validation: {
                    title: "Validation is Key: Go Beyond Your Own Conviction",
                    description: "You might be convinced your idea is brilliant, but the market is the only judge that matters. Your product needs community validation.",
                    takeaway: {
                        title: "Action",
                        body: "Get your idea in front of real users (even just five) before you write thousands of lines of code."
                    }
                }
            },
            narrative: {
                aha: {
                    title: "The Goal: The \"Aha!\" Moment",
                    description: "Storytelling is your primary tool for connection. Your goal is to create a moment where your audience's perspective shifts and they truly understand your vision.",
                    takeaway: {
                        title: "Key Insight",
                        body: "A pitch is not a list of features. It's a story designed to create an emotional and logical connection."
                    }
                },
                framework: {
                    title: "The 3-Part Framework: Why This? Why Now? Why You?",
                    description: "Every successful pitch, presentation, or meeting must answer three core questions.",
                    points: [
                        {
                            heading: "Why This (The Problem)",
                            text: "What is the specific, painful problem or consequence you are solving?"
                        },
                        {
                            heading: "Why Now (The Urgency)",
                            text: "What trend or market event makes your solution mandatory today? (e.g., Solana's resurgence, the rise of RWA, new regulations)."
                        },
                        {
                            heading: "Why You (The Authenticity)",
                            text: "Why are you and your team uniquely equipped to solve this problem? What is your unique expertise or conviction?"
                        }
                    ],
                    takeaway: {
                        title: "Action",
                        body: "Write a one-sentence answer for each of these questions. This is the core of your narrative."
                    }
                },
                dance: {
                    title: "Storytelling is a Dance, Not a Monologue",
                    description: "You must be able to read your audience. If they look bored or confused, adapt. It's an interactive dance where you respond to their cues.",
                    takeaway: {
                        title: "Key Insight",
                        body: "Pay attention to engagement. Be prepared to change your approach, ask a question, or simplify your point."
                    }
                }
            },
            strategy: {
                timing: {
                    title: "Timing: Align with Hot Narratives",
                    description: "A good product launched at the wrong time will fail. A decent product launched at the perfect time can succeed. Identify current hot narratives and align your product to leverage existing buzz.",
                    example: "Examples: Bitcoin liquidity on Solana, AI & Web3 integration, Real-World Assets (RWA), or high-controversy topics like Gold vs. Silver or Tesla stock for prediction markets.",
                    takeaway: {
                        title: "Key Insight",
                        body: "Don't swim against the current. Find the current and ride it."
                    }
                },
                targeting: {
                    title: "Targeting: Know Your Customer (KYC)",
                    description: "Do not market to 'everyone'. Identify the specific user types who will value your utility. Different personas have different motivations.",
                    takeaway: {
                        title: "Action",
                        body: "Tailor your language. Speak to their specific fears, guardrails, and potential upside."
                    }
                },
                distribution: {
                    title: "Distribution & Cross-Collaboration",
                    description: "Find the right channels for regional conversion. Cross-collaboration with seemingly unrelated communities can expand your reach.",
                    example: "Partnering with NFTs or memecoins can introduce a fun, engaged crowd willing to try new things.",
                    takeaway: {
                        title: "Key Insight",
                        body: "Look for partners with engaged, active communities—not just large, passive ones."
                    }
                }
            },
            community: {
                trust: {
                    title: "Go Beyond Networking: Build Genuine Trust",
                    description: "In Web3, your reputation is your most valuable asset. Go beyond transactional networking and cultivate trust.",
                    example: "Think of it as betting on each other's futures. Help people, be reliable, and play the long game to build a real tribe.",
                    takeaway: {
                        title: "Key Insight",
                        body: "A strong network built on trust is your best survival tool in a bear market."
                    }
                },
                traffic: {
                    title: "Convert High Traffic: The First 5 Minutes",
                    description: "When you launch you get one chance to capture initial high traffic. You must welcome and onboard new users immediately.",
                    example: "The Zeus Working Group Model had a dedicated team ready to welcome newcomers, answer questions, and guide them from the first interaction.",
                    takeaway: {
                        title: "Action",
                        body: "Don't just point new users to docs. Create a welcoming, human-first onboarding experience."
                    }
                },
                voice: {
                    title: "Find Your Authentic Voice",
                    description: "Your community forms around your project's unique voice and values. Authenticity is non-negotiable.",
                    example: "Study other presentations for inspiration, but deliver the pitch in your own way. Inauthenticity stops connection instantly.",
                    takeaway: {
                        title: "Key Insight",
                        body: "Be yourself. Your tribe will find you."
                    }
                }
            }
        };

        const pillarMeta = {
            foundation: {
                label: "The Foundation (Soil)",
                intro: "Before you can grow, you need fertile soil. Product-Market Fit is the hard early work of validating that you're building something people actually need.",
                iconName: "agriculture"
            },
            narrative: {
                label: "The Narrative (Seed)",
                intro: "Your core idea is the seed. Your narrative wraps it in a compelling story that earns trust and creates the \"Aha!\" moment.",
                iconName: "campaign"
            },
            strategy: {
                label: "The Strategy (Water)",
                intro: "Execution brings your vision to life. Strategy aligns timing, audience, and channels to deliver measurable traction.",
                iconName: "water_drop"
            },
            community: {
                label: "The Community (Sunlight)",
                intro: "Community is the scalable energy that keeps your project thriving. Prioritize trust, authenticity, and shared conviction.",
                iconName: "wb_sunny"
            }
        };

        function DetailCard({ concept }) {
            if (!concept) {
                return (
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 5,
                            textAlign: 'center',
                            color: 'text.secondary',
                            borderStyle: 'dashed',
                                            borderColor: 'var(--neutral-200)',
                            background: 'rgba(46, 154, 214, 0.04)',
                            borderRadius: 12
                        }}
                    >
                        <Typography variant="body1">
                            Select a concept to explore insights and next steps.
                        </Typography>
                    </Paper>
                );
            }

            return (
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h5" color="primary" gutterBottom>
                            {concept.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {concept.description}
                        </Typography>
                    </Box>

                    {concept.points && (
                        <Stack spacing={2}>
                            {concept.points.map((point) => (
                                <Paper
                                    key={point.heading}
                                    elevation={0}
                                    sx={{ 
                                        p: 3, 
                                        backgroundColor: '#F9FAFB',
                                        border: '1px solid var(--neutral-200)',
                                        borderRadius: 12
                                    }}
                                >
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {point.heading}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {point.text}
                                    </Typography>
                                </Paper>
                            ))}
                        </Stack>
                    )}

                    {concept.example && (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderLeft: '4px solid',
                                borderColor: 'info.main',
                                backgroundColor: 'rgba(46, 154, 214, 0.06)',
                                borderRadius: 12,
                                borderTop: '1px solid var(--neutral-200)',
                                borderRight: '1px solid var(--neutral-200)',
                                borderBottom: '1px solid var(--neutral-200)'
                            }}
                        >
                            <Typography variant="subtitle2" color="secondary" gutterBottom>
                                Case Study
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {concept.example}
                            </Typography>
                        </Paper>
                    )}

                    {concept.takeaway && (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                background:
                                    'linear-gradient(135deg, rgba(0, 170, 98, 0.95) 0%, rgba(46, 154, 214, 0.85) 100%)',
                                color: '#ffffff',
                                borderRadius: 12,
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {concept.takeaway.title}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {concept.takeaway.body}
                            </Typography>
                        </Paper>
                    )}
                </Stack>
            );
        }

        function OverviewPanel() {
            const chartRef = React.useRef(null);
            const chartInstance = React.useRef(null);

            React.useEffect(() => {
                if (!chartRef.current) return;

                chartInstance.current = new Chart(chartRef.current, {
                type: 'doughnut',
                data: {
                        labels: [
                            '🌱 Foundation (PMF)',
                            '📣 Narrative (Story)',
                            '💧 Strategy (Execution)',
                            '☀️ Community (Tribe)'
                        ],
                        datasets: [
                            {
                                label: 'GTM Pillar Focus',
                                data: [30, 25, 20, 25],
                                backgroundColor: ['#00AA62', '#613FFF', '#2E9AD6', '#E8B14D'],
                                borderWidth: 0,
                                hoverOffset: 16
                            }
                        ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                        cutout: '65%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                    color: '#152440',
                                font: {
                                        family: 'Inter',
                                        size: 14
                                },
                                    padding: 24
                            }
                        },
                        tooltip: {
                                backgroundColor: 'var(--neutral-900)',
                                padding: 12,
                                titleFont: {
                                    family: 'Instrument Sans, Inter, Space Grotesk, sans-serif',
                                    size: 14,
                                    weight: 600
                                },
                                bodyFont: {
                                    family: 'Instrument Sans, Inter, Space Grotesk, sans-serif',
                                    size: 13
                                },
                            callbacks: {
                                    label: (context) => {
                                        const label = context.label || '';
                                        const value = context.parsed !== null ? context.parsed : '';
                                        return `${label}: ${value}% of GTM focus`;
                                    }
                                }
                            }
                        }
                    }
                });

                return () => {
                    chartInstance.current && chartInstance.current.destroy();
                };
            }, []);

            return (
                <Stack spacing={6} alignItems="center">
                        <Paper
                            elevation={0}
                            sx={{
                            p: { xs: 4, md: 6 },
                            borderRadius: '999px',
                            width: '100%',
                            maxWidth: '900px',
                                background:
                                'linear-gradient(135deg, #00e0b8 0%, #00c9a4 25%, #613fff 75%, #4d2ecc 100%)',
                            color: '#ffffff',
                            border: 'none',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Stack spacing={3}>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    fontWeight: 600,
                                    color: '#ffffff',
                                    fontSize: { xs: '1.5rem', md: '2rem' }
                                }}
                            >
                                A Framework for Growth
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    opacity: 0.95,
                                    color: '#ffffff',
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    lineHeight: 1.6
                                }}
                            >
                                    A strong Go-to-Market strategy is a balanced ecosystem. Explore each pillar to
                                    understand how foundation, narrative, strategy, and community work together.
                                </Typography>
                            <Divider 
                                light 
                                sx={{ 
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    my: 1
                                }} 
                            />
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    opacity: 0.9,
                                    color: '#ffffff',
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    lineHeight: 1.5
                                }}
                            >
                                Scroll through the sections below to explore each pillar and unlock actionable guidance drawn
                                    from the Lisk brand playbook.
                                </Typography>
                            </Stack>
                        </Paper>
                        <Box
                            sx={{
                                position: 'relative',
                            width: '100%',
                            maxWidth: '600px',
                                height: { xs: 320, sm: 360, md: 420 }
                            }}
                        >
                            <canvas ref={chartRef} />
                        </Box>
                </Stack>
            );
        }

        function PillarPanel({ pillarKey, selectedConcept, onSelect }) {
            const meta = pillarMeta[pillarKey];

            return (
                <Stack spacing={5}>
                    <Box textAlign="center">
                        <Chip
                            icon={
                                <Icon className="material-icons-round" sx={{ fontSize: 20 }}>
                                    {meta.iconName}
                                </Icon>
                            }
                            label={meta.label}
                            color="primary"
                            variant="outlined"
                            sx={{ fontWeight: 600, fontSize: 14, px: 1 }}
                        />
                        <Typography variant="h4" mt={3} mb={2}>
                            {meta.label.split(':')[1]?.trim() || meta.label}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" maxWidth={700} mx="auto">
                            {meta.intro}
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {Object.entries(conceptData[pillarKey]).map(([key, concept]) => {
                            const isActive = selectedConcept === key;
                            return (
                                <Grid item xs={12} md={4} key={key}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            borderWidth: isActive ? 2 : 1,
                                            borderColor: isActive
                                                ? 'primary.main'
                                                : 'var(--neutral-200)',
                                            transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                                            transition: 'all 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                                            backgroundColor: isActive ? 'rgba(0, 170, 98, 0.04)' : 'background.paper',
                                            cursor: 'pointer',
                                            boxShadow: isActive 
                                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                                : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                                        }}
                                            onClick={() => onSelect(key)}
                                        >
                                            <CardContent>
                                                <Stack spacing={1.5}>
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        {concept.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {concept.description.slice(0, 110)}...
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    <DetailCard concept={conceptData[pillarKey][selectedConcept]} />
                </Stack>
            );
        }

        function SectionHeading({ icon, title, color = '#152440' }) {
            return (
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    {icon && (
                        <Icon className="material-icons-round" sx={{ fontSize: 32, color }}>
                            {icon}
                        </Icon>
                    )}
                    <Typography variant="h2" sx={{ color, fontWeight: 700 }}>
                        {title}
                            </Typography>
                </Stack>
            );
        }

        function SectionCard({ title, description, prompt }) {
            return (
                <Card elevation={0} sx={{ height: '100%', p: 3 }}>
                    <Stack spacing={1.5}>
                        {title && (
                            <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                                {title}
                            </Typography>
                        )}
                        {description && (
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        )}
                        {prompt && (
                        <Paper
                            elevation={0}
                            sx={{
                                    p: 2,
                                    backgroundColor: 'rgba(46, 154, 214, 0.06)',
                                    borderLeft: '3px solid #2E9AD6'
                                }}
                            >
                                <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#2E9AD6' }}>
                                    "{prompt}"
                                </Typography>
                        </Paper>
                        )}
                                                </Stack>
                                    </Card>
            );
        }

        function Header({ onDownloadPDF }) {
            return (
                <Box
                    component="header"
                    sx={{
                        position: 'sticky',
                        top: 0,
                            zIndex: 50,
                        backgroundColor: '#ffffff',
                            borderBottom: '1px solid var(--neutral-200)',
                            backdropFilter: 'saturate(180%) blur(8px)',
                            py: 0
                    }}
                >
                    <Container maxWidth="lg">
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 64 }}>
                            <Box
                                component="img"
                                src="img/lisk.png"
                                alt="Lisk logo"
                                sx={{ height: 28, width: 'auto' }}
                            />
                            <Button
                                variant="contained"
                                startIcon={<Icon className="material-icons-round">download</Icon>}
                                onClick={onDownloadPDF}
                                sx={{
                                    backgroundColor: 'var(--brand-primary)',
                                    color: '#ffffff',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    '&:hover': {
                                        backgroundColor: 'var(--brand-primary-700)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'var(--shadow-md)'
                                    },
                                    transition: 'all var(--duration-fast) var(--ease-standard)'
                                }}
                            >
                                Download PDF
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            );
        }

        function Footer() {
            return (
                <Box
                    component="footer"
                    sx={{
                        width: '100%',
                        background: '#f8f8f8',
                        borderTop: '1px solid var(--neutral-200)',
                        mt: 'var(--space-20)'
                    }}
                >
                    <Box
                        sx={{
                            borderTop: '1px solid var(--neutral-200)',
                            background: '#f8f8f8'
                        }}
                    >
                        <Container maxWidth="lg">
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                    py: '0.75rem'
                                }}
                            >
                                <Box
                                    component="img"
                                    src="img/lisk.png"
                                    alt="Lisk logo"
                                    sx={{ height: 39, width: 'auto' }}
                                />
                                <Stack
                                    direction="column"
                                    alignItems="flex-end"
                                    spacing={0.15}
                                    sx={{ lineHeight: 1.3 }}
                                >
                                    <Typography
                                        component="small"
                                        sx={{
                                            color: 'var(--neutral-600)',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        © {new Date().getFullYear()} sqrDAO. All rights reserved.
                                    </Typography>
                                    <Typography
                                        component="small"
                                        sx={{
                                            color: 'var(--neutral-800)',
                                            fontWeight: 600,
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        Not affiliated with Lisk. For event info only.
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Container>
                    </Box>
                </Box>
            );
        }

        function App() {
            const [selectedConcepts, setSelectedConcepts] = React.useState({
                foundation: null,
                narrative: null,
                strategy: null,
                community: null
            });

            const handleSelectConcept = (pillar, key) => {
                setSelectedConcepts((prev) => ({
                    ...prev,
                    [pillar]: key
                }));
            };

            const handleDownloadPDF = () => {
                const element = document.querySelector('.slides-container');
                if (!element) {
                    console.error('Content container not found');
                    return;
                }

                const opt = {
                    margin: [10, 10, 10, 10],
                    filename: 'GTM-Strategy-Guide.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };

                html2pdf().set(opt).from(element).save().catch((error) => {
                    console.error('Error generating PDF:', error);
                });
            };

            const sectionColors = {
                overview: '#2E9AD6',
                foundation: '#E84D31',
                narrative: '#E8B14D',
                strategy: '#00AA62',
                community: '#613FFF'
            };

            return (
                <ThemeProvider theme={liskTheme}>
                    <CssBaseline />
                    <Box
                        component="div"
                        className="presentation-container"
                        sx={{
                            minHeight: '100vh',
                            backgroundColor: 'var(--neutral-0)',
                            background: 'var(--positive-gradient)'
                        }}
                    >
                        <Header onDownloadPDF={handleDownloadPDF} />
                        <Box
                            component="div"
                            className="slides-container"
                        >
                            {/* Title Slide */}
                            <Box
                                component="section"
                                className="slide active"
                                sx={{
                                    minHeight: '100vh',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    scrollSnapAlign: 'start'
                                }}
                            >
                                <Box className="slide-content">
                                    <Box className="title-slide">
                                        <Typography variant="h1" component="h1">
                                        Reaching for the Sun
                                    </Typography>
                                        <Typography variant="h2" component="h2">
                                            Interactive GTM Strategy Guide
                                    </Typography>
                                        <Typography variant="h3" component="h3">
                                            A Framework for Web3 Growth
                                        </Typography>
                                        <Box className="presenter-info" sx={{ mt: 4, mx: 'auto' }}>
                                            <Icon className="material-icons-round" sx={{ fontSize: 18, color: 'var(--brand-primary)' }}>
                                                check_circle
                                            </Icon>
                                            <Typography component="span" variant="body2" sx={{ color: 'var(--neutral-500)', fontWeight: 600 }}>
                                                By
                                            </Typography>
                                            <Typography component="span" variant="body2" sx={{ color: 'var(--foreground)', fontWeight: 700 }}>
                                                Long 'Leo' Pham
                                            </Typography>
                                            <Typography component="span" sx={{ color: 'var(--neutral-400)', padding: '0 0.15rem' }}>·</Typography>
                                            <Typography component="span" variant="body2" sx={{ color: 'var(--brand-primary-700)', fontWeight: 700 }}>
                                                sqrDAO
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Overview Slide */}
                            <Box
                                component="section"
                                className="slide"
                                sx={{
                                    minHeight: '100vh',
                                    scrollSnapAlign: 'start'
                                }}
                            >
                                <Box className="slide-content">
                                    <SectionHeading
                                        icon="home"
                                        title="Reaching for the Sun"
                                        color={sectionColors.overview}
                                    />
                                    <Typography variant="h3" sx={{ mb: 4 }}>
                                        A Framework for Growth
                                    </Typography>
                                        <OverviewPanel />
                                </Box>
                            </Box>

                            {/* Foundation Slide */}
                            <Box
                                component="section"
                                className="slide"
                                sx={{
                                    minHeight: '100vh',
                                    scrollSnapAlign: 'start'
                                }}
                            >
                                <Box className="slide-content">
                                    <SectionHeading
                                        icon="agriculture"
                                        title={pillarMeta.foundation.label}
                                        color={sectionColors.foundation}
                                    />
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
                                        {pillarMeta.foundation.intro}
                                    </Typography>
                                        <PillarPanel
                                            pillarKey="foundation"
                                            selectedConcept={selectedConcepts.foundation}
                                            onSelect={(key) => handleSelectConcept('foundation', key)}
                                        />
                                </Box>
                            </Box>

                            {/* Narrative Slide */}
                            <Box
                                component="section"
                                className="slide"
                                sx={{
                                    minHeight: '100vh',
                                    scrollSnapAlign: 'start'
                                }}
                            >
                                <Box className="slide-content">
                                    <SectionHeading
                                        icon="campaign"
                                        title={pillarMeta.narrative.label}
                                        color={sectionColors.narrative}
                                    />
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
                                        {pillarMeta.narrative.intro}
                                    </Typography>
                                        <PillarPanel
                                            pillarKey="narrative"
                                            selectedConcept={selectedConcepts.narrative}
                                            onSelect={(key) => handleSelectConcept('narrative', key)}
                                        />
                                </Box>
                            </Box>

                            {/* Strategy Slide */}
                            <Box
                                component="section"
                                className="slide"
                                sx={{
                                    minHeight: '100vh',
                                    scrollSnapAlign: 'start'
                                }}
                            >
                                <Box className="slide-content">
                                    <SectionHeading
                                        icon="water_drop"
                                        title={pillarMeta.strategy.label}
                                        color={sectionColors.strategy}
                                    />
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
                                        {pillarMeta.strategy.intro}
                                    </Typography>
                                        <PillarPanel
                                            pillarKey="strategy"
                                            selectedConcept={selectedConcepts.strategy}
                                            onSelect={(key) => handleSelectConcept('strategy', key)}
                                        />
                                </Box>
                            </Box>

                            {/* Community Slide */}
                            <Box
                                component="section"
                                className="slide"
                                sx={{
                                    minHeight: '100vh',
                                    scrollSnapAlign: 'start'
                                }}
                            >
                                <Box className="slide-content">
                                    <SectionHeading
                                        icon="wb_sunny"
                                        title={pillarMeta.community.label}
                                        color={sectionColors.community}
                                    />
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
                                        {pillarMeta.community.intro}
                                    </Typography>
                                        <PillarPanel
                                            pillarKey="community"
                                            selectedConcept={selectedConcepts.community}
                                            onSelect={(key) => handleSelectConcept('community', key)}
                                        />
                                </Box>
                            </Box>
                            
                            {/* Footer */}
                            <Box
                                component="footer"
                                sx={{
                                    width: '100%',
                                    background: '#f8f8f8',
                                    borderTop: '1px solid var(--neutral-200)',
                                    mt: 'var(--space-20)',
                                    scrollSnapAlign: 'start'
                                }}
                            >
                                <Box
                                    sx={{
                                        borderTop: '1px solid var(--neutral-200)',
                                        background: '#f8f8f8'
                                    }}
                                >
                                    <Container maxWidth="lg">
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{
                                                py: '0.75rem'
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src="img/lisk.png"
                                                alt="Lisk logo"
                                                sx={{ height: 39, width: 'auto' }}
                                            />
                                            <Stack
                                                direction="column"
                                                alignItems="flex-end"
                                                spacing={0.15}
                                                sx={{ lineHeight: 1.3 }}
                                            >
                                                <Typography
                                                    component="small"
                                                    sx={{
                                                        color: 'var(--neutral-600)',
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    © {new Date().getFullYear()} sqrDAO. All rights reserved.
                                                </Typography>
                                                <Typography
                                                    component="small"
                                                    sx={{
                                                        color: 'var(--neutral-800)',
                                                        fontWeight: 600,
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    Not affiliated with Lisk. For event info only.
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Container>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </ThemeProvider>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
