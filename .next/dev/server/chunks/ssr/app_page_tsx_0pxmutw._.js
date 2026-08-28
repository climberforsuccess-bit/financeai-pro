module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LanguageContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function LandingPage() {
    const { language, setLanguage, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const content = {
        es: {
            nav: {
                features: 'Características',
                pricing: 'Precios',
                about: 'Acerca de',
                blog: 'Blog'
            },
            hero: {
                title: 'Toma el Control de tus Finanzas con IA',
                subtitle: 'Escanea recibos, gestiona deudas y recibe recomendaciones personalizadas. Todo en un solo lugar bajo tecnología avanzada.',
                cta: 'Empezar Gratis',
                stats: [
                    {
                        value: '10K+',
                        label: 'Usuarios Activos'
                    },
                    {
                        value: '$2M+',
                        label: 'Deudas Gestionadas'
                    },
                    {
                        value: '500+',
                        label: 'Tarjetas Compatibles'
                    }
                ]
            },
            features: {
                title: 'Características Principales',
                items: [
                    {
                        icon: '📸',
                        title: 'Escáner de Recibos con IA',
                        desc: 'Toma fotos a tus tickets y nuestra IA clasifica automáticamente monto, categoría y comercio.'
                    },
                    {
                        icon: '💡',
                        title: 'Recomendador Inteligente',
                        desc: 'La IA analiza tus gastos y te dice exactamente qué tarjeta usar para maximizar cashback y puntos.'
                    },
                    {
                        icon: '📈',
                        title: 'Estrategia de Deudas',
                        desc: 'Reduce el pago de intereses usando algoritmos que priorizan tus deudas automáticamente.'
                    },
                    {
                        icon: '💳',
                        title: 'Gestión de Suscripciones',
                        desc: 'Detecta y controla todas tus suscripciones. Ahorra cientos de dólares identificando gastos innecesarios.'
                    },
                    {
                        icon: '📊',
                        title: 'Reportes Detallados',
                        desc: 'Exporta análisis completos en PDF o CSV. Visualiza tendencias y patrones de gasto.'
                    },
                    {
                        icon: '🎯',
                        title: 'Metas de Ahorro',
                        desc: 'Define objetivos financieros y recibe alertas personalizadas para mantener el rumbo.'
                    }
                ]
            },
            pricing: {
                title: 'Planes Simples y Transparentes',
                plans: [
                    {
                        name: 'Free',
                        price: '$0',
                        period: '/mes',
                        desc: 'Perfecto para comenzar',
                        features: [
                            '✓ Dashboard básico',
                            '✓ 5 transacciones/mes',
                            '✓ Categorización manual'
                        ],
                        cta: 'Empezar Ahora',
                        highlight: false
                    },
                    {
                        name: 'Personal',
                        price: '$9.99',
                        period: '/mes',
                        desc: 'Para usuarios individuales',
                        features: [
                            '✓ Dashboard completo',
                            '✓ Transacciones ilimitadas',
                            '✓ Escáner de Recibos IA',
                            '✓ Recomendaciones básicas'
                        ],
                        cta: 'Suscribirse',
                        highlight: false
                    },
                    {
                        name: 'Pro',
                        price: '$19.99',
                        period: '/mes',
                        desc: 'Poder total de IA',
                        features: [
                            '✓ Todo de Personal',
                            '✓ IA Avanzada (GPT-4o)',
                            '✓ Análisis profundo de gastos',
                            '✓ Exportación PDF/CSV',
                            '✓ Prioridad en soporte'
                        ],
                        cta: 'Prueba Pro',
                        highlight: true
                    },
                    {
                        name: 'Business',
                        price: '$49.99',
                        period: '/mes',
                        desc: 'Para equipos y empresas',
                        features: [
                            '✓ Todo de Pro',
                            '✓ 5 perfiles de usuario',
                            '✓ API Access',
                            '✓ Soporte 24/7',
                            '✓ Integraciones personalizadas'
                        ],
                        cta: 'Contactar Ventas',
                        highlight: false
                    }
                ]
            },
            faq: {
                title: 'Preguntas Frecuentes',
                items: [
                    {
                        q: '¿Es seguro conectar mis cuentas?',
                        a: 'Sí, utilizamos encriptación de nivel bancario. Tus datos nunca se almacenan en servidor, solo se sincronizan en tiempo real.'
                    },
                    {
                        q: '¿Puedo cancelar en cualquier momento?',
                        a: 'Absolutamente. Sin contrato, sin compromiso. Cancela desde Configuración cuando quieras.'
                    },
                    {
                        q: '¿El escáner funciona con fotos borrosas?',
                        a: 'Sí, nuestro OCR con IA puede leer incluso recibos viejos o de baja calidad. Si algo no se detecta, lo editas manualmente.'
                    },
                    {
                        q: '¿Qué bancos son compatibles?',
                        a: 'Trabajamos con 500+ instituciones financieras en América Latina y USA. Ve la lista completa en Integraciones.'
                    }
                ]
            },
            cta: {
                title: '¿Listo para Optimizar tus Finanzas?',
                desc: 'Únete a miles de usuarios que ya están ahorrando dinero con FinanceAI Pro.',
                button: 'Empezar Gratis Ahora'
            },
            footer: {
                company: 'FinanceAI Pro by Climberforsuccess',
                copyright: '© 2024-2026 Climberforsuccess LLC. Todos los derechos reservados.',
                links: [
                    {
                        label: 'Privacidad',
                        href: '#'
                    },
                    {
                        label: 'Términos',
                        href: '#'
                    },
                    {
                        label: 'Contacto',
                        href: '#'
                    },
                    {
                        label: 'Status',
                        href: '#'
                    }
                ]
            }
        },
        en: {
            nav: {
                features: 'Features',
                pricing: 'Pricing',
                about: 'About',
                blog: 'Blog'
            },
            hero: {
                title: 'Take Control of Your Finances with AI',
                subtitle: 'Scan receipts, manage debt, and get personalized recommendations. All in one place with cutting-edge technology.',
                cta: 'Start Free',
                stats: [
                    {
                        value: '10K+',
                        label: 'Active Users'
                    },
                    {
                        value: '$2M+',
                        label: 'Debt Managed'
                    },
                    {
                        value: '500+',
                        label: 'Cards Compatible'
                    }
                ]
            },
            features: {
                title: 'Core Features',
                items: [
                    {
                        icon: '📸',
                        title: 'AI Receipt Scanner',
                        desc: 'Take photos of receipts and our AI automatically classifies amount, category, and merchant.'
                    },
                    {
                        icon: '💡',
                        title: 'Smart Recommender',
                        desc: 'AI analyzes your spending and tells you exactly which card to use to maximize cashback and points.'
                    },
                    {
                        icon: '📈',
                        title: 'Debt Strategy',
                        desc: 'Reduce interest payments using algorithms that automatically prioritize your debts.'
                    },
                    {
                        icon: '💳',
                        title: 'Subscription Manager',
                        desc: 'Detect and control all subscriptions. Save hundreds by identifying unnecessary expenses.'
                    },
                    {
                        icon: '📊',
                        title: 'Detailed Reports',
                        desc: 'Export complete analysis in PDF or CSV. Visualize spending trends and patterns.'
                    },
                    {
                        icon: '🎯',
                        title: 'Savings Goals',
                        desc: 'Set financial objectives and receive personalized alerts to stay on track.'
                    }
                ]
            },
            pricing: {
                title: 'Simple and Transparent Pricing',
                plans: [
                    {
                        name: 'Free',
                        price: '$0',
                        period: '/month',
                        desc: 'Perfect to get started',
                        features: [
                            '✓ Basic dashboard',
                            '✓ 5 transactions/month',
                            '✓ Manual categorization'
                        ],
                        cta: 'Start Now',
                        highlight: false
                    },
                    {
                        name: 'Personal',
                        price: '$9.99',
                        period: '/month',
                        desc: 'For individual users',
                        features: [
                            '✓ Full dashboard',
                            '✓ Unlimited transactions',
                            '✓ AI Receipt Scanner',
                            '✓ Basic recommendations'
                        ],
                        cta: 'Subscribe',
                        highlight: false
                    },
                    {
                        name: 'Pro',
                        price: '$19.99',
                        period: '/month',
                        desc: 'Full AI Power',
                        features: [
                            '✓ Everything in Personal',
                            '✓ Advanced AI (GPT-4o)',
                            '✓ Deep spending analysis',
                            '✓ PDF/CSV export',
                            '✓ Priority support'
                        ],
                        cta: 'Try Pro',
                        highlight: true
                    },
                    {
                        name: 'Business',
                        price: '$49.99',
                        period: '/month',
                        desc: 'For teams & enterprises',
                        features: [
                            '✓ Everything in Pro',
                            '✓ 5 user profiles',
                            '✓ API Access',
                            '✓ 24/7 Support',
                            '✓ Custom integrations'
                        ],
                        cta: 'Contact Sales',
                        highlight: false
                    }
                ]
            },
            faq: {
                title: 'Frequently Asked Questions',
                items: [
                    {
                        q: 'Is it safe to connect my accounts?',
                        a: 'Yes, we use bank-level encryption. Your data is never stored on servers, only synced in real-time.'
                    },
                    {
                        q: 'Can I cancel anytime?',
                        a: 'Absolutely. No contract, no commitment. Cancel from Settings whenever you want.'
                    },
                    {
                        q: 'Does the scanner work with blurry photos?',
                        a: 'Yes, our AI OCR can read even old or low-quality receipts. If something isn\'t detected, you can edit it manually.'
                    },
                    {
                        q: 'Which banks are compatible?',
                        a: 'We work with 500+ financial institutions in Latin America and USA. See the complete list in Integrations.'
                    }
                ]
            },
            cta: {
                title: 'Ready to Optimize Your Finances?',
                desc: 'Join thousands of users already saving money with FinanceAI Pro.',
                button: 'Start Free Today'
            },
            footer: {
                company: 'FinanceAI Pro by Climberforsuccess',
                copyright: '© 2024-2026 Climberforsuccess LLC. All rights reserved.',
                links: [
                    {
                        label: 'Privacy',
                        href: '#'
                    },
                    {
                        label: 'Terms',
                        href: '#'
                    },
                    {
                        label: 'Contact',
                        href: '#'
                    },
                    {
                        label: 'Status',
                        href: '#'
                    }
                ]
            }
        }
    };
    const currentContent = content[language];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.root,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: styles.navbar,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.navContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.logo,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '24px',
                                        marginRight: '8px'
                                    },
                                    children: "📊"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 324,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: styles.logoText,
                                    children: "FinanceAI Pro"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 325,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 323,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.navLinks,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#features",
                                    style: styles.navLink,
                                    children: currentContent.nav.features
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#pricing",
                                    style: styles.navLink,
                                    children: currentContent.nav.pricing
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 332,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#faq",
                                    style: styles.navLink,
                                    children: "FAQ"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 335,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 328,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.navActions,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setLanguage(language === 'es' ? 'en' : 'es'),
                                    style: styles.langButton,
                                    children: language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: styles.ctaButton,
                                        children: currentContent.hero.cta
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 347,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 340,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 322,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: styles.hero,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.heroContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: styles.heroTitle,
                            children: currentContent.hero.title
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 359,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: styles.heroSubtitle,
                            children: currentContent.hero.subtitle
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.heroCTA,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    style: {
                                        ...styles.ctaButton,
                                        ...styles.heroCtaButton
                                    },
                                    children: [
                                        "🚀 ",
                                        currentContent.hero.cta
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 362,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.statsGrid,
                            children: currentContent.hero.stats.map((stat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.statCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.statValue,
                                            children: stat.value
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 373,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.statLabel,
                                            children: stat.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 374,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 370,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 358,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: styles.features,
                id: "features",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.sectionContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: styles.sectionTitle,
                            children: currentContent.features.title
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 384,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.featuresGrid,
                            children: currentContent.features.items.map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.featureCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.featureIcon,
                                            children: feature.icon
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 388,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: styles.featureTitle,
                                            children: feature.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 389,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.featureDesc,
                                            children: feature.desc
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 390,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 387,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 385,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 383,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: styles.pricing,
                id: "pricing",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.sectionContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: styles.sectionTitle,
                            children: currentContent.pricing.title
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 400,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.pricingGrid,
                            children: currentContent.pricing.plans.map((plan, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        ...styles.pricingCard,
                                        ...plan.highlight && styles.pricingCardHighlight
                                    },
                                    children: [
                                        plan.highlight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.badge,
                                            children: "POPULAR"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 410,
                                            columnNumber: 36
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: styles.planName,
                                            children: plan.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 411,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.planDesc,
                                            children: plan.desc
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 412,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.planPrice,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: styles.priceValue,
                                                    children: plan.price
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: styles.pricePeriod,
                                                    children: plan.period
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 413,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: {
                                                    ...styles.planButton,
                                                    ...plan.highlight && styles.planButtonHighlight
                                                },
                                                children: plan.cta
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 418,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 417,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: styles.planFeatures,
                                            children: plan.features.map((feature, fidx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    style: styles.planFeature,
                                                    children: feature
                                                }, fidx, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 427,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 401,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 399,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 398,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: styles.faq,
                id: "faq",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.sectionContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: styles.sectionTitle,
                            children: currentContent.faq.title
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 443,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.faqGrid,
                            children: currentContent.faq.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.faqItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: styles.faqQ,
                                            children: item.q
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 447,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.faqA,
                                            children: item.a
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 448,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 446,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 444,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 442,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 441,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: styles.finalCta,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.sectionContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: styles.ctaTitle,
                            children: currentContent.cta.title
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 458,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: styles.ctaDesc,
                            children: currentContent.cta.desc
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 459,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: {
                                    ...styles.ctaButton,
                                    ...styles.finalCtaButton
                                },
                                children: currentContent.cta.button
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 461,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 460,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 457,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 456,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                style: styles.footer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.footerContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.footerBrand,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.logo,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '20px',
                                                marginRight: '8px'
                                            },
                                            children: "📊"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 473,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.logoText,
                                            children: currentContent.footer.company
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 474,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 472,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: styles.footerCopy,
                                    children: currentContent.footer.copyright
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 476,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 471,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.footerLinks,
                            children: currentContent.footer.links.map((link, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: link.href,
                                    style: styles.footerLink,
                                    children: link.label
                                }, idx, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 480,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 478,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 470,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 469,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 319,
        columnNumber: 5
    }, this);
}
const styles = {
    root: {
        background: '#0f172a',
        color: '#e2e8f0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: '1.6'
    },
    navbar: {
        background: 'linear-gradient(180deg, #0f172a 0%, rgba(15, 23, 42, 0.9) 100%)',
        borderBottom: '1px solid #334155',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)'
    },
    navContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '18px',
        fontWeight: '700',
        letterSpacing: '-0.5px'
    },
    logoText: {
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    },
    navLinks: {
        display: 'flex',
        gap: '32px'
    },
    navLink: {
        color: '#94a3b8',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'color 0.2s'
    },
    navActions: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
    },
    langButton: {
        padding: '8px 12px',
        background: 'transparent',
        border: '1px solid #334155',
        borderRadius: '6px',
        color: '#94a3b8',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    hero: {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        padding: '120px 32px',
        textAlign: 'center'
    },
    heroContent: {
        maxWidth: '900px',
        margin: '0 auto'
    },
    heroTitle: {
        fontSize: '52px',
        fontWeight: '800',
        marginBottom: '24px',
        lineHeight: '1.2',
        letterSpacing: '-1px'
    },
    heroSubtitle: {
        fontSize: '18px',
        color: '#94a3b8',
        marginBottom: '32px',
        maxWidth: '700px',
        margin: '0 auto 32px'
    },
    heroCTA: {
        marginBottom: '60px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px'
    },
    statCard: {
        background: 'rgba(6, 182, 212, 0.1)',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '24px 16px'
    },
    statValue: {
        fontSize: '32px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '8px'
    },
    statLabel: {
        fontSize: '12px',
        color: '#94a3b8',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    features: {
        padding: '120px 32px',
        background: '#0f172a'
    },
    sectionContainer: {
        maxWidth: '1400px',
        margin: '0 auto'
    },
    sectionTitle: {
        fontSize: '40px',
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: '64px',
        letterSpacing: '-0.5px'
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
    },
    featureCard: {
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '32px 24px',
        textAlign: 'center',
        transition: 'all 0.3s ease'
    },
    featureIcon: {
        fontSize: '48px',
        marginBottom: '16px'
    },
    featureTitle: {
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '12px'
    },
    featureDesc: {
        fontSize: '14px',
        color: '#94a3b8',
        lineHeight: '1.6'
    },
    pricing: {
        padding: '120px 32px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    },
    pricingGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
    },
    pricingCard: {
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '32px 24px',
        position: 'relative',
        transition: 'all 0.3s ease'
    },
    pricingCardHighlight: {
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
        borderColor: '#06b6d4',
        transform: 'scale(1.05)'
    },
    badge: {
        position: 'absolute',
        top: '-12px',
        left: '24px',
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
        color: '#fff',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '700'
    },
    planName: {
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '8px'
    },
    planDesc: {
        fontSize: '13px',
        color: '#94a3b8',
        marginBottom: '16px'
    },
    planPrice: {
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: '4px'
    },
    priceValue: {
        fontSize: '36px',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    },
    pricePeriod: {
        fontSize: '14px',
        color: '#94a3b8'
    },
    planButton: {
        width: '100%',
        padding: '12px 16px',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '6px',
        color: '#06b6d4',
        fontWeight: '600',
        cursor: 'pointer',
        marginBottom: '24px',
        transition: 'all 0.2s'
    },
    planButtonHighlight: {
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
        border: 'none',
        color: '#0f172a'
    },
    planFeatures: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    planFeature: {
        fontSize: '13px',
        color: '#94a3b8',
        marginBottom: '12px',
        textAlign: 'left'
    },
    faq: {
        padding: '120px 32px',
        background: '#0f172a'
    },
    faqGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '32px'
    },
    faqItem: {
        borderLeft: '2px solid #06b6d4',
        paddingLeft: '24px'
    },
    faqQ: {
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '12px',
        color: '#e2e8f0'
    },
    faqA: {
        fontSize: '14px',
        color: '#94a3b8',
        lineHeight: '1.7'
    },
    finalCta: {
        padding: '120px 32px',
        background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
        textAlign: 'center'
    },
    ctaTitle: {
        fontSize: '40px',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '16px'
    },
    ctaDesc: {
        fontSize: '16px',
        color: '#1e293b',
        marginBottom: '32px',
        maxWidth: '600px',
        margin: '0 auto 32px'
    },
    ctaButton: {
        padding: '12px 28px',
        background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: '700',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    heroCtaButton: {
        padding: '14px 32px',
        fontSize: '16px'
    },
    finalCtaButton: {
        padding: '16px 40px',
        fontSize: '16px',
        background: '#0f172a',
        color: '#06b6d4'
    },
    footer: {
        background: '#0f172a',
        borderTop: '1px solid #334155',
        padding: '48px 32px'
    },
    footerContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px'
    },
    footerBrand: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    footerCopy: {
        fontSize: '12px',
        color: '#64748b'
    },
    footerLinks: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '24px',
        textAlign: 'right'
    },
    footerLink: {
        fontSize: '14px',
        color: '#94a3b8',
        textDecoration: 'none',
        transition: 'color 0.2s'
    }
};
}),
];

//# sourceMappingURL=app_page_tsx_0pxmutw._.js.map