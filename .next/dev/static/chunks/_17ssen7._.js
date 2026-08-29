(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/subscriptions/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SubscriptionsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LanguageContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const mockSubscriptions = [
    {
        id: '1',
        name: 'Netflix',
        category: 'Entertainment',
        amount: 14.99,
        billingCycle: 'monthly',
        nextBillingDate: '2026-09-05',
        icon: '📺',
        color: '#e50914',
        priority: 'low'
    },
    {
        id: '2',
        name: 'Spotify Premium',
        category: 'Music',
        amount: 9.99,
        billingCycle: 'monthly',
        nextBillingDate: '2026-08-30',
        icon: '🎵',
        color: '#1DB954',
        priority: 'low'
    },
    {
        id: '3',
        name: 'Adobe Creative Cloud',
        category: 'Software',
        amount: 54.99,
        billingCycle: 'monthly',
        nextBillingDate: '2026-09-01',
        icon: '🎨',
        color: '#FF0000',
        priority: 'medium'
    },
    {
        id: '4',
        name: 'AWS',
        category: 'Cloud',
        amount: 125.50,
        billingCycle: 'monthly',
        nextBillingDate: '2026-09-10',
        icon: '☁️',
        color: '#FF9900',
        priority: 'high'
    },
    {
        id: '5',
        name: 'Microsoft 365',
        category: 'Productivity',
        amount: 69.99,
        billingCycle: 'yearly',
        nextBillingDate: '2027-03-15',
        icon: '📊',
        color: '#0078D4',
        priority: 'medium'
    }
];
const categories = [
    'All',
    'Entertainment',
    'Music',
    'Software',
    'Cloud',
    'Productivity'
];
function SubscriptionsPage() {
    _s();
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [subscriptions, setSubscriptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mockSubscriptions);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const filtered = selectedCategory === 'All' ? subscriptions : subscriptions.filter((s)=>s.category === selectedCategory);
    const monthlyTotal = subscriptions.filter((s)=>s.billingCycle === 'monthly').reduce((sum, s)=>sum + s.amount, 0);
    const yearlyMonthly = subscriptions.filter((s)=>s.billingCycle === 'yearly').reduce((sum, s)=>sum + s.amount / 12, 0);
    const totalMonthly = monthlyTotal + yearlyMonthly;
    const totalYearly = totalMonthly * 12;
    // Potential savings (ejemplo: canceling entertainment)
    const entertainmentTotal = subscriptions.filter((s)=>s.category === 'Entertainment').reduce((sum, s)=>sum + (s.billingCycle === 'monthly' ? s.amount : s.amount / 12), 0);
    const potentialSavings = entertainmentTotal * 12;
    // Sort by next billing date
    const sortedByBilling = [
        ...filtered
    ].sort((a, b)=>new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime());
    const handleCancel = (id)=>{
        setSubscriptions(subscriptions.filter((s)=>s.id !== id));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.headerSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: styles.title,
                            children: t('subscriptions')
                        }, void 0, false, {
                            fileName: "[project]/app/subscriptions/page.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: styles.subtitle,
                            children: [
                                subscriptions.length,
                                " ",
                                subscriptions.length === 1 ? t('subscription_singular') : t('subscription_plural')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/subscriptions/page.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/subscriptions/page.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.statsGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: t('monthlyCost'),
                        value: `$${totalMonthly.toFixed(2)}`,
                        subtitle: `$${totalYearly.toFixed(2)}${t('yearlyTotal')}`,
                        icon: "📅",
                        textColor: "#0ea5e9",
                        bgColor: "rgba(14, 165, 233, 0.1)"
                    }, void 0, false, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: t('activeSubscriptions'),
                        value: subscriptions.length.toString(),
                        subtitle: `${filtered.length} ${t('inCategory')} ${selectedCategory}`,
                        icon: "📊",
                        textColor: "#10b981",
                        bgColor: "rgba(16, 185, 129, 0.1)"
                    }, void 0, false, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: t('potentialSavings'),
                        value: `$${potentialSavings.toFixed(2)}`,
                        subtitle: t('cancelEntertainment'),
                        icon: "💰",
                        textColor: "#f59e0b",
                        bgColor: "rgba(245, 158, 11, 0.1)"
                    }, void 0, false, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.filterSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: styles.filterTitle,
                        children: t('filterByCategory')
                    }, void 0, false, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.filterButtons,
                        children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedCategory(cat),
                                style: {
                                    ...styles.filterButton,
                                    ...selectedCategory === cat && styles.filterButtonActive
                                },
                                children: cat === 'All' ? t('all') : cat
                            }, cat, false, {
                                fileName: "[project]/app/subscriptions/page.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.gridSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: styles.sectionTitle,
                        children: t('yourSubscriptions')
                    }, void 0, false, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.subscriptionsGrid,
                        children: filtered.length > 0 ? filtered.map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.subscriptionCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.cardHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.cardIcon,
                                                children: sub.icon
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            ...styles.badge,
                                                            ...styles.badgeCategory
                                                        },
                                                        children: sub.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/subscriptions/page.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            ...styles.badge,
                                                            color: sub.billingCycle === 'monthly' ? '#0ea5e9' : '#8b5cf6',
                                                            background: sub.billingCycle === 'monthly' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(139, 92, 246, 0.2)'
                                                        },
                                                        children: sub.billingCycle === 'monthly' ? t('monthly') : t('yearly')
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/subscriptions/page.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/subscriptions/page.tsx",
                                        lineNumber: 188,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.cardContent,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.cardName,
                                                children: sub.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.cardPrice,
                                                children: [
                                                    "$",
                                                    sub.amount.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/subscriptions/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.cardFooter,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.nextBilling,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.nextBillingLabel,
                                                        children: t('nextPayment')
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/subscriptions/page.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.nextBillingDate,
                                                        children: new Date(sub.nextBillingDate).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/subscriptions/page.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleCancel(sub.id),
                                                style: styles.cancelButton,
                                                children: t('cancel')
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 227,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/subscriptions/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, sub.id, true, {
                                fileName: "[project]/app/subscriptions/page.tsx",
                                lineNumber: 187,
                                columnNumber: 15
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.emptyState,
                            children: t('noSubscriptionsCategory')
                        }, void 0, false, {
                            fileName: "[project]/app/subscriptions/page.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.tableSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: styles.sectionTitle,
                        children: t('upcomingPayments')
                    }, void 0, false, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.tableWrapper,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            style: styles.table,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: styles.tableHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'left'
                                                },
                                                children: t('subscription')
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'left'
                                                },
                                                children: t('category')
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'right'
                                                },
                                                children: t('amount')
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 257,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'right'
                                                },
                                                children: t('nextBillingDate')
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'center'
                                                },
                                                children: t('action')
                                            }, void 0, false, {
                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                lineNumber: 263,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/subscriptions/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/subscriptions/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: sortedByBilling.map((sub)=>{
                                        const daysUntilBilling = Math.ceil((new Date(sub.nextBillingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: styles.tableRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: styles.cell,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: sub.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                                lineNumber: 278,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontWeight: '600'
                                                                },
                                                                children: sub.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/subscriptions/page.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/subscriptions/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/subscriptions/page.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...styles.cell,
                                                        color: '#94a3b8'
                                                    },
                                                    children: sub.category
                                                }, void 0, false, {
                                                    fileName: "[project]/app/subscriptions/page.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...styles.cell,
                                                        textAlign: 'right',
                                                        color: '#10b981',
                                                        fontWeight: '700'
                                                    },
                                                    children: [
                                                        "$",
                                                        sub.amount.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/subscriptions/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...styles.cell,
                                                        textAlign: 'right',
                                                        color: daysUntilBilling <= 5 ? '#ef4444' : daysUntilBilling <= 15 ? '#f59e0b' : '#94a3b8'
                                                    },
                                                    children: [
                                                        t('in'),
                                                        " ",
                                                        daysUntilBilling,
                                                        " ",
                                                        t('days')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/subscriptions/page.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...styles.cell,
                                                        textAlign: 'center'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleCancel(sub.id),
                                                        style: styles.miniCancelButton,
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/subscriptions/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/subscriptions/page.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, sub.id, true, {
                                            fileName: "[project]/app/subscriptions/page.tsx",
                                            lineNumber: 275,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/subscriptions/page.tsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/subscriptions/page.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.recommendationsSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: styles.sectionTitle,
                        children: [
                            "💡 ",
                            t('aiRecommendations')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.recommendationsGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecommendationCard, {
                                icon: "🎬",
                                title: t('consolidateStreaming'),
                                description: t('consolidateStreamingDesc'),
                                savings: "$240/año",
                                color: "#ef4444"
                            }, void 0, false, {
                                fileName: "[project]/app/subscriptions/page.tsx",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecommendationCard, {
                                icon: "🎨",
                                title: t('adobeAlternative'),
                                description: t('adobeAlternativeDesc'),
                                savings: "$660/año",
                                color: "#f59e0b"
                            }, void 0, false, {
                                fileName: "[project]/app/subscriptions/page.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecommendationCard, {
                                icon: "📊",
                                title: t('optimalSpending'),
                                description: t('optimalSpendingDesc').replace('{monthly}', `$${totalMonthly.toFixed(2)}`).replace('{percentage}', (totalMonthly / 4200 * 100).toFixed(1)),
                                savings: t('underControl'),
                                color: "#10b981"
                            }, void 0, false, {
                                fileName: "[project]/app/subscriptions/page.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/subscriptions/page.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/subscriptions/page.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_s(SubscriptionsPage, "DX4w/e40LsNgmcLD/BALB3M1N+c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = SubscriptionsPage;
function RecommendationCard({ icon, title, description, savings, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...styles.recommendationCard,
            borderLeftColor: color
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.recIcon,
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 376,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.recTitle,
                children: title
            }, void 0, false, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.recDescription,
                children: description
            }, void 0, false, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 378,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    ...styles.recSavings,
                    color
                },
                children: savings
            }, void 0, false, {
                fileName: "[project]/app/subscriptions/page.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/subscriptions/page.tsx",
        lineNumber: 370,
        columnNumber: 5
    }, this);
}
_c1 = RecommendationCard;
const styles = {
    container: {
        padding: '32px',
        maxWidth: '1600px',
        margin: '0 auto'
    },
    headerSection: {
        marginBottom: '32px'
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#f1f5f9',
        marginBottom: '4px',
        letterSpacing: '-0.5px'
    },
    subtitle: {
        fontSize: '13px',
        color: '#94a3b8',
        fontWeight: '500'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '40px'
    },
    filterSection: {
        marginBottom: '40px'
    },
    filterTitle: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '12px'
    },
    filterButtons: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    },
    filterButton: {
        padding: '8px 14px',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '20px',
        color: '#94a3b8',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    filterButtonActive: {
        background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        borderColor: '#06b6d4',
        color: '#fff'
    },
    gridSection: {
        marginBottom: '40px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#f1f5f9',
        marginBottom: '20px',
        letterSpacing: '-0.3px'
    },
    subscriptionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px'
    },
    subscriptionCard: {
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    cardIcon: {
        fontSize: '28px'
    },
    badge: {
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600'
    },
    badgeCategory: {
        background: 'rgba(94, 234, 212, 0.2)',
        color: '#2dd4bf'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    cardName: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#e2e8f0'
    },
    cardPrice: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#10b981'
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '12px',
        borderTop: '1px solid #334155'
    },
    nextBilling: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    nextBillingLabel: {
        fontSize: '11px',
        color: '#94a3b8',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    nextBillingDate: {
        fontSize: '12px',
        color: '#06b6d4',
        fontWeight: '600'
    },
    cancelButton: {
        padding: '6px 12px',
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '4px',
        color: '#ef4444',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    emptyState: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '40px',
        color: '#94a3b8'
    },
    tableSection: {
        marginBottom: '40px'
    },
    tableWrapper: {
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid #334155',
        borderRadius: '12px',
        overflow: 'hidden'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px'
    },
    tableHeader: {
        background: '#0f172a',
        borderBottom: '1px solid #334155'
    },
    headerCell: {
        padding: '14px 16px',
        color: '#94a3b8',
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: '12px',
        letterSpacing: '0.5px'
    },
    tableRow: {
        borderBottom: '1px solid #334155',
        transition: 'background 0.2s ease'
    },
    cell: {
        padding: '12px 16px',
        color: '#e2e8f0'
    },
    miniCancelButton: {
        width: '28px',
        height: '28px',
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '4px',
        color: '#ef4444',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    recommendationsSection: {
        marginBottom: '20px'
    },
    recommendationsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
    },
    recommendationCard: {
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid #334155',
        borderLeft: '4px solid',
        borderRadius: '8px',
        padding: '16px'
    },
    recIcon: {
        fontSize: '24px',
        marginBottom: '8px'
    },
    recTitle: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#f1f5f9',
        marginBottom: '4px'
    },
    recDescription: {
        fontSize: '12px',
        color: '#94a3b8',
        marginBottom: '8px',
        lineHeight: '1.4'
    },
    recSavings: {
        fontSize: '13px',
        fontWeight: '700'
    }
};
var _c, _c1;
__turbopack_context__.k.register(_c, "SubscriptionsPage");
__turbopack_context__.k.register(_c1, "RecommendationCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Card({ title, value, subtitle, icon, bgColor = '#334155', textColor = '#0ea5e9' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: bgColor,
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #475569',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minHeight: '140px',
            justifyContent: 'space-between'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: '#94a3b8',
                            fontSize: '14px',
                            fontWeight: '500'
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Card.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '24px'
                        },
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Card.tsx",
                        lineNumber: 29,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Card.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: textColor,
                            fontSize: '32px',
                            fontWeight: 'bold',
                            marginBottom: '4px'
                        },
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Card.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: '#64748b',
                            fontSize: '12px'
                        },
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Card.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Card.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Card.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_17ssen7._.js.map