(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/transactions/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TransactionsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LanguageContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const mockTransactions = [
    {
        id: '1',
        date: '2026-08-28',
        merchant: 'Amazon',
        category: 'Shopping',
        amount: -45.99,
        card: '•••• 4242',
        icon: '🛍️'
    },
    {
        id: '2',
        date: '2026-08-27',
        merchant: 'Starbucks',
        category: 'Food & Drink',
        amount: -5.50,
        card: '•••• 1234',
        icon: '☕'
    },
    {
        id: '3',
        date: '2026-08-26',
        merchant: 'Salary Deposit',
        category: 'Income',
        amount: 4200.00,
        card: '•••• 5678',
        icon: '💰'
    },
    {
        id: '4',
        date: '2026-08-25',
        merchant: 'Netflix',
        category: 'Subscriptions',
        amount: -14.99,
        card: '•••• 4242',
        icon: '📺'
    },
    {
        id: '5',
        date: '2026-08-24',
        merchant: 'Whole Foods',
        category: 'Groceries',
        amount: -87.32,
        card: '•••• 1234',
        icon: '🛒'
    },
    {
        id: '6',
        date: '2026-08-23',
        merchant: 'Uber',
        category: 'Transportation',
        amount: -18.50,
        card: '•••• 4242',
        icon: '🚗'
    },
    {
        id: '7',
        date: '2026-08-22',
        merchant: 'Gym Membership',
        category: 'Health',
        amount: -49.99,
        card: '•••• 1234',
        icon: '💪'
    },
    {
        id: '8',
        date: '2026-08-21',
        merchant: 'Restaurant',
        category: 'Dining',
        amount: -65.80,
        card: '•••• 5678',
        icon: '🍽️'
    }
];
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}
function TransactionsPage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedMonth, setSelectedMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('08');
    const [selectedYear, setSelectedYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('2026');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const itemsPerPage = 10;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionsPage.useEffect": ()=>{
            setMounted(true);
        }
    }["TransactionsPage.useEffect"], []);
    const filteredTransactions = mockTransactions.filter((tx)=>(tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || tx.category.toLowerCase().includes(searchTerm.toLowerCase())) && tx.date.includes(`${selectedYear}-${selectedMonth}`));
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const monthlyIncome = filteredTransactions.filter((tx)=>tx.amount > 0).reduce((sum, tx)=>sum + tx.amount, 0);
    const monthlyExpenses = filteredTransactions.filter((tx)=>tx.amount < 0).reduce((sum, tx)=>sum + Math.abs(tx.amount), 0);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.loadingContainer,
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/app/transactions/page.tsx",
            lineNumber: 134,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.headerSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: styles.title,
                            children: t('transactions')
                        }, void 0, false, {
                            fileName: "[project]/app/transactions/page.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: styles.subtitle,
                            children: [
                                t('month'),
                                ": August ",
                                selectedYear
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/transactions/page.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/transactions/page.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/transactions/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.summaryGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        icon: "📈",
                        label: "Ingresos",
                        value: `$${monthlyIncome.toFixed(2)}`,
                        color: "#10b981"
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        icon: "📉",
                        label: "Gastos",
                        value: `$${monthlyExpenses.toFixed(2)}`,
                        color: "#ef4444"
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        icon: "💰",
                        label: "Balance",
                        value: `$${(monthlyIncome - monthlyExpenses).toFixed(2)}`,
                        color: "#06b6d4"
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/transactions/page.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.filtersSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: t('search'),
                        value: searchTerm,
                        onChange: (e)=>setSearchTerm(e.target.value),
                        style: styles.searchInput
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedMonth,
                        onChange: (e)=>setSelectedMonth(e.target.value),
                        style: styles.selectInput,
                        children: [
                            '01',
                            '02',
                            '03',
                            '04',
                            '05',
                            '06',
                            '07',
                            '08',
                            '09',
                            '10',
                            '11',
                            '12'
                        ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: m,
                                children: new Date(`2026-${m}-01`).toLocaleDateString('es-ES', {
                                    month: 'long'
                                })
                            }, m, false, {
                                fileName: "[project]/app/transactions/page.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedYear,
                        onChange: (e)=>setSelectedYear(e.target.value),
                        style: styles.selectInput,
                        children: [
                            '2024',
                            '2025',
                            '2026'
                        ].map((y)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: y,
                                children: y
                            }, y, false, {
                                fileName: "[project]/app/transactions/page.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            ...styles.button,
                            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                            color: '#fff'
                        },
                        children: [
                            "📥 ",
                            t('exportPDF')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            ...styles.button,
                            background: '#10b981',
                            color: '#fff'
                        },
                        children: [
                            "📊 ",
                            t('exportCSV')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/transactions/page.tsx",
                lineNumber: 172,
                columnNumber: 7
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
                                        children: t('date')
                                    }, void 0, false, {
                                        fileName: "[project]/app/transactions/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...styles.headerCell,
                                            textAlign: 'left'
                                        },
                                        children: t('merchant')
                                    }, void 0, false, {
                                        fileName: "[project]/app/transactions/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...styles.headerCell,
                                            textAlign: 'left'
                                        },
                                        children: t('category')
                                    }, void 0, false, {
                                        fileName: "[project]/app/transactions/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...styles.headerCell,
                                            textAlign: 'left'
                                        },
                                        children: t('card')
                                    }, void 0, false, {
                                        fileName: "[project]/app/transactions/page.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...styles.headerCell,
                                            textAlign: 'right'
                                        },
                                        children: t('amount')
                                    }, void 0, false, {
                                        fileName: "[project]/app/transactions/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/transactions/page.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/transactions/page.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: paginatedTransactions.length > 0 ? paginatedTransactions.map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: styles.tableRow,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: styles.cell,
                                            children: formatDate(tx.date)
                                        }, void 0, false, {
                                            fileName: "[project]/app/transactions/page.tsx",
                                            lineNumber: 226,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.cell,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: tx.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/app/transactions/page.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 21
                                                }, this),
                                                " ",
                                                tx.merchant
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/transactions/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.cell,
                                                color: '#94a3b8'
                                            },
                                            children: tx.category
                                        }, void 0, false, {
                                            fileName: "[project]/app/transactions/page.tsx",
                                            lineNumber: 230,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.cell,
                                                color: '#94a3b8',
                                                fontSize: '13px'
                                            },
                                            children: tx.card
                                        }, void 0, false, {
                                            fileName: "[project]/app/transactions/page.tsx",
                                            lineNumber: 231,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.cell,
                                                textAlign: 'right',
                                                color: tx.amount > 0 ? '#10b981' : '#ef4444',
                                                fontWeight: '700'
                                            },
                                            children: [
                                                tx.amount > 0 ? '+' : '',
                                                tx.amount.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/transactions/page.tsx",
                                            lineNumber: 232,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, tx.id, true, {
                                    fileName: "[project]/app/transactions/page.tsx",
                                    lineNumber: 225,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: 5,
                                    style: {
                                        ...styles.cell,
                                        textAlign: 'center',
                                        color: '#94a3b8'
                                    },
                                    children: t('noTransactions')
                                }, void 0, false, {
                                    fileName: "[project]/app/transactions/page.tsx",
                                    lineNumber: 246,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/transactions/page.tsx",
                                lineNumber: 245,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/transactions/page.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/transactions/page.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/transactions/page.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.paginationContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage(Math.max(1, currentPage - 1)),
                        disabled: currentPage === 1,
                        style: {
                            ...styles.paginationButton,
                            opacity: currentPage === 1 ? 0.5 : 1
                        },
                        children: "← Anterior"
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: styles.pageInfo,
                        children: [
                            "Página ",
                            currentPage,
                            " de ",
                            totalPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrentPage(Math.min(totalPages, currentPage + 1)),
                        disabled: currentPage === totalPages,
                        style: {
                            ...styles.paginationButton,
                            opacity: currentPage === totalPages ? 0.5 : 1
                        },
                        children: "Siguiente →"
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.tsx",
                        lineNumber: 268,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/transactions/page.tsx",
                lineNumber: 257,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/transactions/page.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(TransactionsPage, "nl2Gcxzfb06cwF6/0Zk4Oov7vwI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = TransactionsPage;
function SummaryCard({ icon, label, value, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...styles.summaryCard,
            borderTopColor: color
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.summaryIcon,
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/transactions/page.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.summaryLabel,
                children: label
            }, void 0, false, {
                fileName: "[project]/app/transactions/page.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    ...styles.summaryValue,
                    color
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/app/transactions/page.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/transactions/page.tsx",
        lineNumber: 293,
        columnNumber: 5
    }, this);
}
_c1 = SummaryCard;
const styles = {
    loadingContainer: {
        padding: '40px',
        textAlign: 'center',
        color: '#94a3b8'
    },
    container: {
        padding: '32px',
        maxWidth: '1400px',
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
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
    },
    summaryCard: {
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid #334155',
        borderTop: '3px solid',
        borderRadius: '12px',
        padding: '20px'
    },
    summaryIcon: {
        fontSize: '24px',
        marginBottom: '8px'
    },
    summaryLabel: {
        fontSize: '12px',
        color: '#94a3b8',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '8px'
    },
    summaryValue: {
        fontSize: '24px',
        fontWeight: '700',
        letterSpacing: '-0.5px'
    },
    filtersSection: {
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap'
    },
    searchInput: {
        flex: 1,
        minWidth: '250px',
        padding: '10px 14px',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '8px',
        color: '#e2e8f0',
        fontSize: '14px'
    },
    selectInput: {
        padding: '10px 14px',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '8px',
        color: '#e2e8f0',
        fontSize: '14px',
        cursor: 'pointer'
    },
    button: {
        padding: '10px 16px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    tableWrapper: {
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid #334155',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '24px'
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
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        marginTop: '24px'
    },
    paginationButton: {
        padding: '8px 16px',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '6px',
        color: '#e2e8f0',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    pageInfo: {
        color: '#94a3b8',
        fontSize: '14px',
        fontWeight: '600'
    }
};
var _c, _c1;
__turbopack_context__.k.register(_c, "TransactionsPage");
__turbopack_context__.k.register(_c1, "SummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_transactions_page_tsx_1d168yo._.js.map