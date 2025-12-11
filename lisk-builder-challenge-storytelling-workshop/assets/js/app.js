const {
            ThemeProvider,
            createTheme,
            CssBaseline,
            Typography,
            Container,
            Box,
            Paper,
            Stack,
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
                }
            }
        });

        const slidesData = [
            {
                id: 1,
                type: 'title',
                title: 'Telling the Story of Your Garden: Pitching & Storytelling',
                subtitle: 'From Code to Connection – Crafting Narratives that Convert',
                presenter: 'sqrDAO',
                date: '10 December 2025',
                quote: 'We tell ourselves stories in order to live.',
                quoteAuthor: 'Joan Didion'
            },
            {
                id: 2,
                type: 'content',
                title: 'The Core Philosophy',
                sections: [
                    {
                        heading: 'You Are Already a Storyteller',
                        content: [
                            'The Myth: Public speaking requires formal rhetoric or a "sales personality."',
                            'The Reality: If you\'ve ever talked yourself out of trouble with parents or wooed a partner, you know how to tell a story.'
                        ]
                    },
                    {
                        heading: 'Code vs. Story',
                        content: [
                            'Code provides the function (the details).',
                            'Story provides the meaning (the connection).'
                        ]
                    },
                    {
                        heading: 'Goal',
                        content: [
                            'Channel your nerves into enthusiasm. Nerves are just energy; use them to power your conviction.'
                        ]
                    }
                ]
            },
            {
                id: 3,
                type: 'content',
                title: 'The "Aha!" Moment',
                subtitle: 'Moving from Narrative to Connection',
                sections: [
                    {
                        heading: 'Narrative vs. Story',
                        content: [
                            'Narrative: A series of bullet points ("I did X, then Y happened").',
                            'Story: A journey that leads to an "Aha!" moment.'
                        ]
                    },
                    {
                        heading: 'The Objective',
                        content: [
                            'Trigger that moment where the audience says, "I get it. I see myself in this."'
                        ]
                    },
                    {
                        heading: 'In-Group vs. Out-Group',
                        content: [
                            'The "Aha!" moment invites the investor/user into your "tribe."',
                            'Trust is built when the audience feels they share a value or vision with you.'
                        ]
                    }
                ]
            },
            {
                id: 4,
                type: 'content',
                title: 'Know Your Audience',
                subtitle: 'Three Keys to Unlocking Attention',
                sections: [
                    {
                        heading: "Don't Monologue, Dance",
                        content: [
                            'Pitching is a reaction to your audience, not a script.'
                        ]
                    },
                    {
                        heading: 'The 3 Questions Every Audience Asks (Subconsciously)',
                        content: [
                            'What are they afraid of? (Insecurities, risks, guardrails).',
                            'What can (or can\'t) they do? (Structural limitations, mandates).',
                            'What is the upside? (How does this make their life/business better?).'
                        ]
                    },
                    {
                        heading: 'Tip',
                        content: [
                            'Tailor your language. A "Database App" might be boring, but a "Foray into Fintech" is exciting. Words carry weight.'
                        ]
                    }
                ]
            },
            {
                id: 5,
                type: 'content',
                title: 'Structuring Your "Garden"',
                subtitle: 'The Fairy Tale Framework for Startups',
                sections: [
                    {
                        heading: 'Stories need a natural flow: Beginning → Middle → End.',
                        content: []
                    },
                    {
                        heading: 'The Classic Arc',
                        content: [
                            'Fairy Tale: Princess in castle → Knight fights witch → Happily ever after.'
                        ]
                    },
                    {
                        heading: 'Your Project',
                        content: [
                            'The Inciting Incident (Pain Point): The problem that disrupts the world.',
                            'The Action (Solution/Execution): How you nurture the solution and solve the pain.',
                            'The Happily Ever After (Scale/Impact): What the world looks like with your project in it.'
                        ]
                    },
                    {
                        heading: 'Sanity Check',
                        content: [
                            'Does your deck flow like a conversation, or is it just a list of features?'
                        ]
                    }
                ]
            },
            {
                id: 6,
                type: 'content',
                title: 'The 3 Whys (The Pitch Core)',
                subtitle: 'If You Only Have 30 Seconds',
                sections: [
                    {
                        heading: 'When time is short, strip away the details and hit these three seeds:',
                        content: []
                    },
                    {
                        heading: 'Why This? (The Hook)',
                        content: [
                            'The pain point. The money being left on the table. The urgency.'
                        ]
                    },
                    {
                        heading: 'Why Now? (The Catalyst)',
                        content: [
                            'Why is today the moment to act? What is the activating factor?'
                        ]
                    },
                    {
                        heading: 'Why You? (The Authenticity)',
                        content: [
                            'Domain expertise. "I\'ve built this." "I\'ve lived this."'
                        ]
                    },
                    {
                        heading: 'Note',
                        content: [
                            'The "Why This" usually creates the first "Aha!" moment.'
                        ]
                    }
                ]
            },
            {
                id: 7,
                type: 'content',
                title: 'Finding Your Authentic Voice',
                subtitle: 'Don\'t Be a "Ghetto Version" of Someone Else',
                sections: [
                    {
                        heading: 'The Trap',
                        content: [
                            'Trying to copy a famous CEO\'s style (e.g., being charismatic when you are naturally analytical).'
                        ]
                    },
                    {
                        heading: 'The Solution: Lean into your truth.',
                        content: [
                            'If you are a quiet builder, say: "I\'m not a marketer, I\'m a structurer. Here are the facts."',
                            'Vulnerability creates credibility.'
                        ]
                    },
                    {
                        heading: 'Authenticity > Polished Acting',
                        content: [
                            'People detect fakes instantly.'
                        ]
                    }
                ]
            },
            {
                id: 8,
                type: 'content',
                title: 'Engagement Tactics',
                subtitle: 'Winning the War for Attention',
                sections: [
                    {
                        heading: 'The Competition',
                        content: [
                            'You are competing against their phone, their emails, and their fatigue.'
                        ]
                    },
                    {
                        heading: 'Hacks to Re-engage',
                        content: [
                            'Physical Action: "Raise your hand if..." (Breaks the phone trance).',
                            'Props: Throw a mascot, use a physical object.',
                            'Questions: Ask the audience something real.'
                        ]
                    },
                    {
                        heading: 'The Rule of Repetition',
                        content: [
                            'Tell them what you\'re going to tell them.',
                            'Tell them.',
                            'Tell them what you told them.',
                            'Why? People rarely remember more than 3 things.'
                        ]
                    }
                ]
            },
            {
                id: 9,
                type: 'content',
                title: 'Planting Seeds vs. Hiding the Harvest',
                subtitle: 'Overcoming "Until it\'s done, tell none"',
                sections: [
                    {
                        heading: 'The Dilemma',
                        content: [
                            'You want to protect your idea, but you need feedback.'
                        ]
                    },
                    {
                        heading: 'The Risk',
                        content: [
                            '"Cooking in the kitchen without anyone tasting the food" leads to products nobody wants.'
                        ]
                    },
                    {
                        heading: 'The Strategy',
                        content: [
                            'Have different "cuts" of your story.',
                            'Safe Version: For general networking (Planting seeds).',
                            'Deep Version: For trusted partners (Validation).',
                            'Networking: You cannot build a community if you don\'t give people a seed to hold onto.'
                        ]
                    }
                ]
            },
            {
                id: 10,
                type: 'content',
                title: 'The 10-Minute Hack',
                subtitle: 'How to Get Better Fast',
                sections: [
                    {
                        heading: 'The Exercise',
                        content: [
                            'Watch a presentation (a meeting, a webinar, a pitch).',
                            'Immediately after, take 10 minutes.',
                            'Ask yourself: "How would I have told that story?"',
                            'What words would I change?',
                            'How would I structure the flow?',
                            'Where was the "Aha!" moment?'
                        ]
                    },
                    {
                        heading: 'Why',
                        content: [
                            'Practice opportunities are rare. Listening opportunities are endless. Use them to simulate reps.'
                        ]
                    }
                ]
            },
            {
                id: 11,
                type: 'content',
                title: 'Final Takeaway',
                subtitle: 'Your Garden, Your Story',
                sections: [
                    {
                        heading: 'Don\'t just build; invite people in.',
                        content: [
                            'Code is the soil. The story is the flower that attracts the bees (investors/users).'
                        ]
                    },
                    {
                        heading: 'Action Item: Review your current pitch deck.',
                        content: [
                            'Does it have a Beginning, Middle, and End?',
                            'Does it answer Why This, Why Now, Why You?',
                            'Is it authentic to your voice?'
                        ]
                    }
                ]
            }
        ];

        function TitleSlide({ slide }) {
            return (
                <Box className="title-slide">
                    <Typography variant="h1" component="h1">
                        {slide.title}
                    </Typography>
                    <Typography variant="h2" component="h2" sx={{ mt: 2, mb: 4 }}>
                        {slide.subtitle}
                    </Typography>
                    <Box className="presenter-info" sx={{ mt: 4, mx: 'auto' }}>
                        <Icon className="material-icons-round" sx={{ fontSize: 18, color: 'var(--brand-primary)' }}>
                            check_circle
                        </Icon>
                        <Typography component="span" variant="body2" sx={{ color: 'var(--neutral-500)', fontWeight: 600 }}>
                            By
                        </Typography>
                        <Typography component="span" variant="body2" sx={{ color: 'var(--foreground)', fontWeight: 700 }}>
                            {slide.presenter}
                        </Typography>
                        <Typography component="span" sx={{ color: 'var(--neutral-400)', padding: '0 0.15rem' }}>·</Typography>
                        <Typography component="span" variant="body2" sx={{ color: 'var(--brand-primary-700)', fontWeight: 700 }}>
                            {slide.date}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid var(--neutral-200)' }}>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontStyle: 'italic',
                                color: 'var(--neutral-600)',
                                fontSize: 'var(--text-lg)'
                            }}
                        >
                            "{slide.quote}" – {slide.quoteAuthor}
                        </Typography>
                    </Box>
                </Box>
            );
        }

        function ContentSlide({ slide }) {
            return (
                <Stack spacing={4}>
                    <Box>
                        <Typography variant="h2" component="h2" gutterBottom>
                            {slide.title}
                        </Typography>
                        {slide.subtitle && (
                            <Typography variant="h3" component="h3" sx={{ mt: 1, mb: 3 }}>
                                {slide.subtitle}
                            </Typography>
                        )}
                    </Box>
                    
                    {slide.sections.map((section, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                p: 3,
                                backgroundColor: index % 2 === 0 ? '#F9FAFB' : '#ffffff',
                                border: '1px solid var(--neutral-200)',
                                borderRadius: 0
                            }}
                        >
                            <Stack spacing={2}>
                                <Typography variant="h4" fontWeight={600} color="primary">
                                    {section.heading}
                                </Typography>
                                {section.content.length > 0 && (
                                    <Stack spacing={1.5} component="ul" sx={{ pl: 3, m: 0 }}>
                                        {section.content.map((item, itemIndex) => (
                                            <Typography 
                                                key={itemIndex}
                                                component="li"
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{ lineHeight: 1.6 }}
                                            >
                                                {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                )}
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
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
            const handleDownloadPDF = () => {
                const element = document.querySelector('.slides-container');
                if (!element) {
                    console.error('Content container not found');
                    return;
                }

                const opt = {
                    margin: [10, 10, 10, 10],
                    filename: 'Storytelling-Workshop.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };

                html2pdf().set(opt).from(element).save().catch((error) => {
                    console.error('Error generating PDF:', error);
                });
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
                            {slidesData.map((slide) => (
                                <Box
                                    key={slide.id}
                                    component="section"
                                    className={`slide ${slide.id === 1 ? 'active' : ''}`}
                                    sx={{
                                        minHeight: '100vh',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: slide.id === 1 ? 'center' : 'flex-start',
                                scrollSnapAlign: 'start',
                                scrollMarginTop: '72px'
                                    }}
                                >
                                    <Box className="slide-content">
                                        {slide.type === 'title' ? (
                                            <TitleSlide slide={slide} />
                                        ) : (
                                            <ContentSlide slide={slide} />
                                        )}
                                    </Box>
                                </Box>
                            ))}
                            
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
