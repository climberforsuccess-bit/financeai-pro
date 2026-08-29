(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/debt-plan/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DebtPlanPage
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
const mockDebts = [
    {
        id: '1',
        name: 'Chase Visa Card',
        type: 'creditCard',
        balance: 3450.00,
        interestRate: 18.5,
        minimumPayment: 100,
        icon: '💳'
    },
    {
        id: '2',
        name: 'Car Loan',
        type: 'autoLoan',
        balance: 15000.00,
        interestRate: 4.2,
        minimumPayment: 350,
        icon: '🚗'
    },
    {
        id: '3',
        name: 'Home Mortgage',
        type: 'mortgage',
        balance: 250000.00,
        interestRate: 3.5,
        minimumPayment: 1500,
        icon: '🏠'
    },
    {
        id: '4',
        name: 'Personal Loan',
        type: 'personalLoan',
        balance: 5000.00,
        interestRate: 8.5,
        minimumPayment: 150,
        icon: '📊'
    }
];
const strategies = [
    {
        id: 'avalanche',
        label: 'Avalanche',
        description: 'Pagar deudas con mayor tasa de interés primero',
        advantage: 'Menor interés total pagado',
        disadvantage: 'Menos motivación inicial',
        timeToPayoff: '4.2 años',
        totalInterest: '$12,450',
        icon: '⛏️'
    },
    {
        id: 'snowball',
        label: 'Snowball',
        description: 'Pagar deudas con menor balance primero',
        advantage: 'Motivación rápida con victorias pequeñas',
        disadvantage: 'Más interés total',
        timeToPayoff: '4.8 años',
        totalInterest: '$14,200',
        icon: '⛄'
    },
    {
        id: 'consolidation',
        label: 'Consolidation',
        description: 'Consolidar todas las deudas en una',
        advantage: 'Un único pago mensual',
        disadvantage: 'Puede aumentar interés',
        timeToPayoff: '5.1 años',
        totalInterest: '$15,800',
        icon: '🔗'
    },
    {
        id: 'hybrid',
        label: 'Hybrid',
        description: 'Combinación óptima de estrategias',
        advantage: 'Balance entre velocidad y motivación',
        disadvantage: 'Requiere más disciplina',
        timeToPayoff: '4.5 años',
        totalInterest: '$13,100',
        icon: '⚡'
    }
];
function DebtPlanPage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [selectedStrategy, setSelectedStrategy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('avalanche');
    const totalDebt = mockDebts.reduce((sum, d)=>sum + d.balance, 0);
    const totalMonthlyPayment = mockDebts.reduce((sum, d)=>sum + d.minimumPayment, 0);
    const highestRate = Math.max(...mockDebts.map((d)=>d.interestRate));
    const currentStrategy = strategies.find((s)=>s.id === selectedStrategy);
    // Sort debts based on strategy
    const sortedDebts = [
        ...mockDebts
    ].sort((a, b)=>{
        if (selectedStrategy === 'avalanche') {
            return b.interestRate - a.interestRate;
        } else if (selectedStrategy === 'snowball') {
            return a.balance - b.balance;
        }
        return 0;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.headerSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.headerTop,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: styles.title,
                                    children: t('debtPlan')
                                }, void 0, false, {
                                    fileName: "[project]/app/debt-plan/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: styles.subtitle,
                                    children: [
                                        mockDebts.length,
                                        " ",
                                        t('activeDebts')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/debt-plan/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/debt-plan/page.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: styles.addDebtButton,
                            children: [
                                "+ ",
                                t('addDebt')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/debt-plan/page.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/debt-plan/page.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/debt-plan/page.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.statsGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: t('totalDebtAmount'),
                        value: `$${totalDebt.toLocaleString('en-US', {
                            maximumFractionDigits: 2
                        })}`,
                        icon: "💰",
                        textColor: "#ef4444",
                        bgColor: "rgba(239, 68, 68, 0.1)"
                    }, void 0, false, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: t('monthlyPayment'),
                        value: `$${totalMonthlyPayment.toFixed(2)}`,
                        icon: "📈",
                        textColor: "#f59e0b",
                        bgColor: "rgba(245, 158, 11, 0.1)"
                    }, void 0, false, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: t('highestInterestRate'),
                        value: `${highestRate}%`,
                        icon: "📊",
                        textColor: "#ef4444",
                        bgColor: "rgba(239, 68, 68, 0.1)"
                    }, void 0, false, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: t('estimatedPayoffTime'),
                        value: currentStrategy.timeToPayoff,
                        icon: "⏱️",
                        textColor: "#3b82f6",
                        bgColor: "rgba(59, 130, 246, 0.1)"
                    }, void 0, false, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/debt-plan/page.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.strategySection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: styles.sectionTitle,
                        children: t('chooseStrategy')
                    }, void 0, false, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.strategyGrid,
                        children: strategies.map((strategy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedStrategy(strategy.id),
                                style: {
                                    ...styles.strategyButton,
                                    ...selectedStrategy === strategy.id && styles.strategyButtonActive
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.strategyIcon,
                                        children: strategy.icon
                                    }, void 0, false, {
                                        fileName: "[project]/app/debt-plan/page.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.strategyLabel,
                                        children: strategy.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/debt-plan/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.strategyDesc,
                                        children: strategy.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/debt-plan/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, strategy.id, true, {
                                fileName: "[project]/app/debt-plan/page.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/debt-plan/page.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.strategyDetailsSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: styles.sectionTitle,
                        children: [
                            t('strategyDetails'),
                            " ",
                            currentStrategy.label
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.strategyDetailsGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StrategyDetailCard, {
                                icon: "✨",
                                title: t('advantage'),
                                content: currentStrategy.advantage,
                                color: "#10b981"
                            }, void 0, false, {
                                fileName: "[project]/app/debt-plan/page.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StrategyDetailCard, {
                                icon: "⚠️",
                                title: t('disadvantage'),
                                content: currentStrategy.disadvantage,
                                color: "#f59e0b"
                            }, void 0, false, {
                                fileName: "[project]/app/debt-plan/page.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StrategyDetailCard, {
                                icon: "⏱️",
                                title: t('timeToPayoff'),
                                content: currentStrategy.timeToPayoff,
                                color: "#06b6d4"
                            }, void 0, false, {
                                fileName: "[project]/app/debt-plan/page.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StrategyDetailCard, {
                                icon: "💸",
                                title: t('totalEstimatedInterest'),
                                content: currentStrategy.totalInterest,
                                color: "#ef4444"
                            }, void 0, false, {
                                fileName: "[project]/app/debt-plan/page.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/debt-plan/page.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.debtsTableSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: styles.sectionTitle,
                        children: [
                            t('paymentOrder'),
                            " (",
                            currentStrategy.label,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 233,
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
                                                children: t('order')
                                            }, void 0, false, {
                                                fileName: "[project]/app/debt-plan/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'left'
                                                },
                                                children: t('debt')
                                            }, void 0, false, {
                                                fileName: "[project]/app/debt-plan/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'right'
                                                },
                                                children: t('balance')
                                            }, void 0, false, {
                                                fileName: "[project]/app/debt-plan/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'right'
                                                },
                                                children: t('rate')
                                            }, void 0, false, {
                                                fileName: "[project]/app/debt-plan/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'right'
                                                },
                                                children: t('monthlyPaymentHeader')
                                            }, void 0, false, {
                                                fileName: "[project]/app/debt-plan/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...styles.headerCell,
                                                    textAlign: 'center'
                                                },
                                                children: t('timeHeader')
                                            }, void 0, false, {
                                                fileName: "[project]/app/debt-plan/page.tsx",
                                                lineNumber: 245,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/debt-plan/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/debt-plan/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: sortedDebts.map((debt, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: styles.tableRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...styles.cell,
                                                        color: '#06b6d4',
                                                        fontWeight: '700'
                                                    },
                                                    children: [
                                                        "#",
                                                        index + 1
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/debt-plan/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 19
                                                }, this),
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
                                                                children: debt.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/debt-plan/page.tsx",
                                                                lineNumber: 256,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontWeight: '600'
                                                                },
                                                                children: debt.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/debt-plan/page.tsx",
                                                                lineNumber: 257,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/debt-plan/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/debt-plan/page.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...styles.cell,
                                                        textAlign: 'right',
                                                        color: '#ef4444',
                                                        fontWeight: '700'
                                                    },
                                                    children: [
                                                        "$",
                                                        debt.balance.toLocaleString('en-US', {
                                                            maximumFractionDigits: 2
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/debt-plan/page.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...styles.cell,
                                                        textAlign: 'right',
                                                        color: '#f59e0b'
                                                    },
                                                    children: [
                                                        debt.interestRate,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/debt-plan/page.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...styles.cell,
                                                        textAlign: 'right',
                                                        color: '#3b82f6'
                                                    },
                                                    children: [
                                                        "$",
                                                        debt.minimumPayment.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/debt-plan/page.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...styles.cell,
                                                        textAlign: 'center',
                                                        color: '#94a3b8',
                                                        fontSize: '13px'
                                                    },
                                                    children: [
                                                        "~",
                                                        Math.ceil(debt.balance / debt.minimumPayment / 12),
                                                        " ",
                                                        t('years')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/debt-plan/page.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, debt.id, true, {
                                            fileName: "[project]/app/debt-plan/page.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/debt-plan/page.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/debt-plan/page.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/debt-plan/page.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/debt-plan/page.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/debt-plan/page.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(DebtPlanPage, "HdRd7rtsP7Pmvu7+Ae7qmdQLZDA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = DebtPlanPage;
function StrategyDetailCard({ icon, title, content, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...styles.detailCard,
            borderTopColor: color
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.detailIcon,
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/debt-plan/page.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.detailTitle,
                children: title
            }, void 0, false, {
                fileName: "[project]/app/debt-plan/page.tsx",
                lineNumber: 310,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.detailContent,
                children: content
            }, void 0, false, {
                fileName: "[project]/app/debt-plan/page.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/debt-plan/page.tsx",
        lineNumber: 308,
        columnNumber: 5
    }, this);
}
_c1 = StrategyDetailCard;
const styles = {
    container: {
        padding: '32px',
        maxWidth: '1600px',
        margin: '0 auto'
    },
    headerSection: {
        marginBottom: '40px'
    },
    headerTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
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
    addDebtButton: {
        padding: '10px 20px',
        background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '40px'
    },
    strategySection: {
        marginBottom: '40px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#f1f5f9',
        marginBottom: '20px',
        letterSpacing: '-0.3px'
    },
    strategyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
    },
    strategyButton: {
        padding: '20px',
        background: '#1e293b',
        border: '2px solid #334155',
        borderRadius: '10px',
        color: '#94a3b8',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    strategyButtonActive: {
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
        borderColor: '#06b6d4',
        color: '#06b6d4'
    },
    strategyIcon: {
        fontSize: '28px',
        marginBottom: '8px'
    },
    strategyLabel: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#f1f5f9',
        marginBottom: '4px'
    },
    strategyDesc: {
        fontSize: '12px',
        color: '#94a3b8',
        lineHeight: '1.4'
    },
    strategyDetailsSection: {
        marginBottom: '40px'
    },
    strategyDetailsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
    },
    detailCard: {
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid #334155',
        borderTop: '3px solid',
        borderRadius: '10px',
        padding: '16px'
    },
    detailIcon: {
        fontSize: '24px',
        marginBottom: '8px'
    },
    detailTitle: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '8px'
    },
    detailContent: {
        fontSize: '14px',
        color: '#e2e8f0',
        fontWeight: '600'
    },
    debtsTableSection: {
        marginBottom: '20px'
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
        padding: '16px',
        color: '#94a3b8',
        fontWeight: '600',
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        letterSpacing: '0.5px'
    },
    tableRow: {
        borderBottom: '1px solid #334155',
        transition: 'background 0.2s ease'
    },
    cell: {
        padding: '14px 16px',
        color: '#e2e8f0'
    }
};
var _c, _c1;
__turbopack_context__.k.register(_c, "DebtPlanPage");
__turbopack_context__.k.register(_c1, "StrategyDetailCard");
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

//# sourceMappingURL=_0-q2q45._.js.map