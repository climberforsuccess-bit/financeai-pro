module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LanguageContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$TopBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/TopBar.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function RootLayout({ children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Register Service Worker for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then((registration)=>{
                console.log('✅ Service Worker registered:', registration);
            }).catch((error)=>{
                console.error('❌ Service Worker registration failed:', error);
            });
        }
        // Handle install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e)=>{
            e.preventDefault();
            deferredPrompt = e;
            console.log('📱 Install prompt available');
        });
        // Handle app installed
        window.addEventListener('appinstalled', ()=>{
            console.log('✅ PWA installed successfully');
            deferredPrompt = null;
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "es",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        charSet: "utf-8"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1, viewport-fit=cover"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Gestiona tus finanzas personales con inteligencia artificial"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#0088FF"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "mobile-web-app-capable",
                        content: "yes"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "apple-mobile-web-app-capable",
                        content: "yes"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "apple-mobile-web-app-status-bar-style",
                        content: "black-translucent"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "apple-mobile-web-app-title",
                        content: "FinanceAI Pro"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "manifest",
                        href: "/manifest.json"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        type: "image/svg+xml",
                        href: "/file.svg"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "apple-touch-icon",
                        href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%2300EEFF'/><stop offset='100%' style='stop-color:%230088FF'/></linearGradient></defs><rect width='180' height='180' fill='%230b121e'/><circle cx='90' cy='90' r='85' fill='url(%23g)' opacity='0.15'/><circle cx='90' cy='90' r='85' fill='none' stroke='url(%23g)' stroke-width='3'/><text x='90' y='108' font-family='Arial' font-weight='800' font-size='60' fill='url(%23g)' text-anchor='middle'>F</text></svg>"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "apple-touch-startup-image",
                        href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 540 720'><rect fill='%230b121e' width='540' height='720'/><text x='270' y='360' font-size='60' fill='%2300EEFF' text-anchor='middle' font-weight='bold'>FinanceAI Pro</text></svg>"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "FinanceAI Pro - Finanzas con IA"
                    }, void 0, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100vh'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$TopBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TopBar"], {}, void 0, false, {
                                fileName: "[project]/app/layout.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sidebar"], {}, void 0, false, {
                                        fileName: "[project]/app/layout.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                        style: {
                                            marginLeft: '0',
                                            width: '100%',
                                            minHeight: 'calc(100vh - 57px)',
                                            overflowY: 'auto',
                                            paddingBottom: 'env(safe-area-inset-bottom)'
                                        },
                                        children: children
                                    }, void 0, false, {
                                        fileName: "[project]/app/layout.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/layout.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/Sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LanguageContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Sidebar() {
    const { language, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isCollapsed, setIsCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const clientName = 'Juan Pérez';
    const planName = language === 'es' ? 'Plan Pro' : 'Pro Plan';
    const clientInitial = clientName.charAt(0).toUpperCase();
    const menuItems = [
        {
            href: '/dashboard',
            label: t('dashboard'),
            icon: '📊'
        },
        {
            href: '/transactions',
            label: t('transactions'),
            icon: '💰'
        },
        {
            href: '/cards',
            label: t('myCards'),
            icon: '💳'
        },
        {
            href: '/debt-plan',
            label: t('debtPlan'),
            icon: '📉'
        },
        {
            href: '/subscriptions',
            label: t('subscriptions'),
            icon: '🔄'
        },
        {
            href: '/scanner',
            label: t('scannerReceipt'),
            icon: '📸'
        },
        {
            href: '/settings',
            label: t('settings'),
            icon: '⚙️'
        }
    ];
    const isActive = (href)=>pathname === href;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        style: {
            width: isCollapsed ? '80px' : '250px',
            background: '#1e293b',
            borderRight: '1px solid #334155',
            padding: '20px',
            height: '100vh',
            overflowY: 'auto',
            transition: 'width 0.3s',
            display: 'flex',
            flexDirection: 'column'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '30px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '24px'
                                        },
                                        children: "💰"
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#0ea5e9',
                                            fontSize: '16px',
                                            fontWeight: 'bold'
                                        },
                                        children: "FinanceAI Pro"
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 45,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#64748b',
                                    fontSize: '11px',
                                    marginLeft: '34px'
                                },
                                children: "by climberforsuccess"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/layout/Sidebar.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsCollapsed(!isCollapsed),
                        style: {
                            background: 'transparent',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: 0
                        },
                        children: isCollapsed ? '→' : '←'
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Sidebar.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: {
                    marginBottom: 'auto'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    style: {
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                    },
                    children: menuItems.map((item)=>{
                        const active = isActive(item.href);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: {
                                marginBottom: '10px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    color: active ? '#0ea5e9' : '#94a3b8',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                    background: active ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
                                    borderLeft: active ? '3px solid #0ea5e9' : '3px solid transparent',
                                    paddingLeft: active ? '9px' : '12px'
                                },
                                onMouseEnter: (e)=>{
                                    if (!active) {
                                        e.currentTarget.style.background = '#334155';
                                        e.currentTarget.style.color = '#0ea5e9';
                                    }
                                },
                                onMouseLeave: (e)=>{
                                    if (!active) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = '#94a3b8';
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '18px'
                                        },
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this),
                                    !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '14px',
                                            fontWeight: active ? '600' : '400'
                                        },
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 103,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 74,
                                columnNumber: 17
                            }, this)
                        }, item.href, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 73,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/layout/Sidebar.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '1px solid #334155',
                    paddingTop: '20px',
                    marginTop: 'auto'
                },
                children: !isCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: '#94a3b8',
                                fontSize: '11px',
                                marginBottom: '4px'
                            },
                            children: language === 'es' ? 'Cliente' : 'Client'
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: '#0ea5e9',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginBottom: '12px'
                            },
                            children: clientName
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: '#94a3b8',
                                fontSize: '11px',
                                marginBottom: '4px'
                            },
                            children: language === 'es' ? 'Plan' : 'Plan'
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'inline-block',
                                background: 'rgba(14, 165, 233, 0.1)',
                                color: '#0ea5e9',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            },
                            children: planName
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Sidebar.tsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(14, 165, 233, 0.2)',
                        borderRadius: '6px',
                        color: '#0ea5e9',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        margin: '0 auto',
                        flexShrink: 0
                    },
                    children: clientInitial
                }, void 0, false, {
                    fileName: "[project]/components/layout/Sidebar.tsx",
                    lineNumber: 136,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Sidebar.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/TopBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopBar",
    ()=>TopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LanguageContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function TopBar() {
    const { language, setLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#0f172a',
            borderBottom: '1px solid #334155',
            padding: '12px 40px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '20px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                gap: '8px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setLanguage('es'),
                    style: {
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: language === 'es' ? '1px solid #0ea5e9' : '1px solid #334155',
                        background: language === 'es' ? '#0f172a' : 'transparent',
                        color: language === 'es' ? '#0ea5e9' : '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        transition: 'all 0.2s'
                    },
                    children: "ES"
                }, void 0, false, {
                    fileName: "[project]/components/layout/TopBar.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setLanguage('en'),
                    style: {
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: language === 'en' ? '1px solid #0ea5e9' : '1px solid #334155',
                        background: language === 'en' ? '#0f172a' : 'transparent',
                        color: language === 'en' ? '#0ea5e9' : '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        transition: 'all 0.2s'
                    },
                    children: "EN"
                }, void 0, false, {
                    fileName: "[project]/components/layout/TopBar.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/layout/TopBar.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/TopBar.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/context/LanguageContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "translations",
    ()=>translations,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const translations = {
    es: {
        dashboard: 'Dashboard',
        transactions: 'Transacciones',
        myCards: 'Mis Tarjetas',
        debtPlan: 'Salir de Deudas',
        subscriptions: 'Suscripciones',
        recommendations: 'Recomendaciones',
        aiAssistant: 'Asistente IA',
        reports: 'Reportes',
        settings: 'Configuración',
        scannerReceipt: 'Escanear Recibo',
        totalBalance: 'Balance Total',
        monthlyIncome: 'Ingresos Mensuales',
        monthlyExpenses: 'Gastos Mensuales',
        totalDebt: 'Deuda Total',
        savings: 'Ahorros',
        recentTransactions: 'Transacciones Recientes',
        addCard: 'Agregar Tarjeta',
        viewAll: 'Ver Todo',
        noTransactions: 'Sin transacciones',
        date: 'Fecha',
        merchant: 'Comercio',
        category: 'Categoría',
        amount: 'Monto',
        card: 'Tarjeta',
        exportPDF: 'Exportar PDF',
        exportCSV: 'Exportar CSV',
        search: 'Buscar',
        filter: 'Filtrar',
        month: 'Mes',
        year: 'Año',
        cardName: 'Nombre de Tarjeta',
        bank: 'Banco',
        type: 'Tipo',
        balance: 'Balance',
        limit: 'Límite',
        paymentDueDate: 'Fecha de Pago',
        debit: 'Débito',
        credit: 'Crédito',
        personal: 'Personal',
        business: 'Negocio',
        apr: 'APR',
        noCards: 'Sin tarjetas',
        totalDebtAmount: 'Deuda Total',
        debtStrategy: 'Estrategia de Pago',
        estimatedPayoffTime: 'Tiempo Estimado de Pago',
        monthlyPayment: 'Pago Mensual',
        interestRate: 'Tasa de Interés',
        debtType: 'Tipo de Deuda',
        mortgage: 'Hipoteca',
        autoLoan: 'Préstamo de Auto',
        creditCard: 'Tarjeta de Crédito',
        personalLoan: 'Préstamo Personal',
        other: 'Otro',
        avalanche: 'Avalanche',
        snowball: 'Snowball',
        consolidation: 'Consolidación',
        hybrid: 'Híbrido',
        addDebt: 'Agregar Deuda',
        thisMonth: 'Este Mes',
        saved: 'Ahorrado',
        variation: 'Variación',
        food: 'Alimentos',
        transport: 'Transporte',
        income: 'Ingresos',
        entertainment: 'Entretenimiento',
        health: 'Salud',
        salaryPayment: 'Pago de Salario',
        wholeFoodsMarket: 'Whole Foods Market',
        uber: 'Uber',
        netflix: 'Netflix',
        pharmacyCVS: 'Farmacia CVS',
        incomeVsExpenses: 'Ingresos vs Gastos',
        january: 'Ene',
        february: 'Feb',
        march: 'Mar',
        april: 'Abr',
        may: 'May',
        expenses: 'Gastos',
        activeDebt: 'Deuda Activa',
        cards: 'Tarjetas',
        averageInterest: 'Interés Promedio',
        debtObjective: 'Objetivo de Deuda',
        method: 'Método',
        timeline: 'Tiempo',
        months: 'meses',
        incomeLabel: 'Ingresos',
        expensesLabel: 'Gastos',
        balanceLabel: 'Balance',
        previous: 'Anterior',
        next: 'Siguiente',
        page: 'Página',
        of: 'de',
        shopping: 'Compras',
        foodDrink: 'Comida y Bebida',
        groceries: 'Abarrotes',
        transportation: 'Transporte',
        dining: 'Restaurantes',
        gymMembership: 'Membresía de Gimnasio',
        amazon: 'Amazon',
        starbucks: 'Starbucks',
        salaryDeposit: 'Depósito de Salario',
        wholefiles: 'Whole Foods',
        restaurant: 'Restaurante',
        cards_singular: 'tarjeta',
        cards_plural: 'tarjetas',
        totalCreditDebt: 'Deuda Total (Crédito)',
        totalLimit: 'Límite Total',
        utilization: 'Utilización',
        yourCards: 'Tus Tarjetas',
        cardDetails: 'Detalles de Tarjetas',
        edit: 'Editar',
        delete: 'Eliminar',
        utilizationHeader: 'Utilización',
        activeDebts: 'deudas activas',
        highestInterestRate: 'Tasa Más Alta',
        chooseStrategy: 'Elige tu Estrategia',
        strategyDetails: 'Detalles de',
        advantage: 'Ventaja',
        disadvantage: 'Desventaja',
        timeToPayoff: 'Tiempo para Pagar',
        totalEstimatedInterest: 'Interés Total Estimado',
        paymentOrder: 'Orden de Pago',
        order: 'Orden',
        debt: 'Deuda',
        rate: 'Tasa',
        monthlyPaymentHeader: 'Pago Mensual',
        timeHeader: 'Tiempo',
        years: 'años',
        subscription_singular: 'suscripción activa',
        subscription_plural: 'suscripciones activas',
        monthlyCost: 'Costo Mensual',
        activeSubscriptions: 'Suscripciones Activas',
        potentialSavings: 'Ahorro Potencial',
        cancelEntertainment: 'Si cancelas entretenimiento',
        filterByCategory: 'Filtrar por categoría',
        yourSubscriptions: 'Tus Suscripciones',
        monthly: 'Mensual',
        yearly: 'Anual',
        nextPayment: 'Próximo pago',
        cancel: 'Cancelar',
        noSubscriptionsCategory: 'No hay suscripciones en esta categoría',
        upcomingPayments: 'Próximos Pagos',
        subscription: 'Suscripción',
        nextBillingDate: 'Próximo Pago',
        action: 'Acción',
        in: 'En',
        days: 'días',
        aiRecommendations: 'Recomendaciones de IA',
        consolidateStreaming: 'Consolidar Streaming',
        consolidateStreamingDesc: 'Detectamos que tienes 2 servicios de streaming. Considera usar solo uno para ahorrar $20/mes.',
        adobeAlternative: 'Adobe Creative Cloud',
        adobeAlternativeDesc: 'Es tu suscripción más cara. Considera alternativas como Figma o Canva.',
        optimalSpending: 'Gasto Óptimo',
        optimalSpendingDesc: 'Tu gasto total es {monthly}/mes ({percentage}% de ingresos)',
        underControl: 'Está bajo control',
        yearlyTotal: '/año',
        inCategory: 'en',
        all: 'Todos',
        scanReceiptSubtitle: 'Escanea recibos para agregar transacciones automáticamente',
        processing: 'Procesando recibo...',
        analyzingOCR: 'Analizando imagen con OCR',
        clickToUpload: 'Haz clic para cargar un recibo',
        dragOrUpload: 'O arrastra una imagen aquí (JPG, PNG, HEIC)',
        scannedReceipts: 'Recibos Escaneados',
        receiptAmount: 'Monto',
        receiptCard: 'Tarjeta',
        add: 'Agregar',
        discard: 'Descartar',
        info: 'Información',
        supportsFormats: 'Soportamos JPG, PNG, HEIC y otros formatos de imagen',
        extractsAutomatically: 'Extrae automáticamente: comercio, monto, fecha y hora',
        detectsCardDigits: 'Detecta el último dígito de tu tarjeta',
        assignsCategory: 'Asigna categoría automáticamente',
        addsTransaction: 'Agregará la transacción a tu historial',
        at: 'a las',
        settingsTitle: 'Configuración',
        manageAccount: 'Administra tu cuenta y preferencias',
        accountTab: 'Cuenta',
        notificationsTab: 'Notificaciones',
        privacyTab: 'Privacidad',
        currentPlan: 'Plan Actual',
        yourCurrentPlan: 'Tu plan actual',
        financeAIProPlan: 'FinanceAI Pro',
        renewalDate: 'Renovación el 15 de septiembre, 2026',
        cancelSubscription: 'Cancelar Suscripción',
        changePlan: 'Cambiar Plan',
        perMonth: '/mes',
        currentPlanButton: 'Plan Actual',
        language: 'Idioma',
        accountSection: 'Cuenta',
        emailLabel: 'Email',
        changePassword: 'Cambiar Contraseña',
        legalSection: 'Legal',
        termsOfService: 'Términos de Servicio',
        privacyPolicy: 'Política de Privacidad',
        legalTerms: 'Términos Legales',
        planFree: 'Gratis',
        planPersonal: 'Personal',
        planPro: 'Pro',
        planBusiness: 'Business',
        featureBasicDashboard: 'Dashboard básico',
        featureLimitedTx: '5 transacciones/mes',
        featureNoAI: 'Sin IA',
        featureCompleteDashboard: 'Dashboard completo',
        featureUnlimitedTx: 'Transacciones ilimitadas',
        featureBasicAI: 'Asistente IA básico',
        featureScanReceipts: 'Scanner de recibos',
        featureEverythingPersonal: 'Todo de Personal',
        featureAdvancedAI: 'IA avanzada',
        featureExpenseAnalysis: 'Análisis de gastos',
        featureExportPDF: 'Exportación PDF/CSV',
        featureEverythingPro: 'Todo de Pro',
        featureMultiProfiles: '5 perfiles',
        featurePrioritySupport: 'Soporte prioritario',
        featureAPIAccess: 'API access'
    },
    en: {
        dashboard: 'Dashboard',
        transactions: 'Transactions',
        myCards: 'My Cards',
        debtPlan: 'Debt Plan',
        subscriptions: 'Subscriptions',
        recommendations: 'Recommendations',
        aiAssistant: 'AI Assistant',
        reports: 'Reports',
        settings: 'Settings',
        scannerReceipt: 'Scan Receipt',
        totalBalance: 'Total Balance',
        monthlyIncome: 'Monthly Income',
        monthlyExpenses: 'Monthly Expenses',
        totalDebt: 'Total Debt',
        savings: 'Savings',
        recentTransactions: 'Recent Transactions',
        addCard: 'Add Card',
        viewAll: 'View All',
        noTransactions: 'No transactions',
        date: 'Date',
        merchant: 'Merchant',
        category: 'Category',
        amount: 'Amount',
        card: 'Card',
        exportPDF: 'Export PDF',
        exportCSV: 'Export CSV',
        search: 'Search',
        filter: 'Filter',
        month: 'Month',
        year: 'Year',
        cardName: 'Card Name',
        bank: 'Bank',
        type: 'Type',
        balance: 'Balance',
        limit: 'Limit',
        paymentDueDate: 'Payment Due Date',
        debit: 'Debit',
        credit: 'Credit',
        personal: 'Personal',
        business: 'Business',
        apr: 'APR',
        noCards: 'No cards',
        totalDebtAmount: 'Total Debt',
        debtStrategy: 'Payment Strategy',
        estimatedPayoffTime: 'Estimated Payoff Time',
        monthlyPayment: 'Monthly Payment',
        interestRate: 'Interest Rate',
        debtType: 'Debt Type',
        mortgage: 'Mortgage',
        autoLoan: 'Auto Loan',
        creditCard: 'Credit Card',
        personalLoan: 'Personal Loan',
        other: 'Other',
        avalanche: 'Avalanche',
        snowball: 'Snowball',
        consolidation: 'Consolidation',
        hybrid: 'Hybrid',
        addDebt: 'Add Debt',
        thisMonth: 'This Month',
        saved: 'Saved',
        variation: 'Variation',
        food: 'Food',
        transport: 'Transport',
        income: 'Income',
        entertainment: 'Entertainment',
        health: 'Health',
        salaryPayment: 'Salary Payment',
        wholeFoodsMarket: 'Whole Foods Market',
        uber: 'Uber',
        netflix: 'Netflix',
        pharmacyCVS: 'Pharmacy CVS',
        incomeVsExpenses: 'Income vs Expenses',
        january: 'Jan',
        february: 'Feb',
        march: 'Mar',
        april: 'Apr',
        may: 'May',
        expenses: 'Expenses',
        activeDebt: 'Active Debt',
        cards: 'Cards',
        averageInterest: 'Average Interest',
        debtObjective: 'Debt Objective',
        method: 'Method',
        timeline: 'Timeline',
        months: 'months',
        incomeLabel: 'Income',
        expensesLabel: 'Expenses',
        balanceLabel: 'Balance',
        previous: 'Previous',
        next: 'Next',
        page: 'Page',
        of: 'of',
        shopping: 'Shopping',
        foodDrink: 'Food & Drink',
        groceries: 'Groceries',
        transportation: 'Transportation',
        dining: 'Dining',
        gymMembership: 'Gym Membership',
        amazon: 'Amazon',
        starbucks: 'Starbucks',
        salaryDeposit: 'Salary Deposit',
        wholefiles: 'Whole Foods',
        restaurant: 'Restaurant',
        cards_singular: 'card',
        cards_plural: 'cards',
        totalCreditDebt: 'Total Credit Debt',
        totalLimit: 'Total Limit',
        utilization: 'Utilization',
        yourCards: 'Your Cards',
        cardDetails: 'Card Details',
        edit: 'Edit',
        delete: 'Delete',
        utilizationHeader: 'Utilization',
        activeDebts: 'active debts',
        highestInterestRate: 'Highest Interest Rate',
        chooseStrategy: 'Choose Your Strategy',
        strategyDetails: 'Details of',
        advantage: 'Advantage',
        disadvantage: 'Disadvantage',
        timeToPayoff: 'Time to Payoff',
        totalEstimatedInterest: 'Total Estimated Interest',
        paymentOrder: 'Payment Order',
        order: 'Order',
        debt: 'Debt',
        rate: 'Rate',
        monthlyPaymentHeader: 'Monthly Payment',
        timeHeader: 'Time',
        years: 'years',
        subscription_singular: 'active subscription',
        subscription_plural: 'active subscriptions',
        monthlyCost: 'Monthly Cost',
        activeSubscriptions: 'Active Subscriptions',
        potentialSavings: 'Potential Savings',
        cancelEntertainment: 'If you cancel entertainment',
        filterByCategory: 'Filter by category',
        yourSubscriptions: 'Your Subscriptions',
        monthly: 'Monthly',
        yearly: 'Yearly',
        nextPayment: 'Next payment',
        cancel: 'Cancel',
        noSubscriptionsCategory: 'No subscriptions in this category',
        upcomingPayments: 'Upcoming Payments',
        subscription: 'Subscription',
        nextBillingDate: 'Next Payment',
        action: 'Action',
        in: 'In',
        days: 'days',
        aiRecommendations: 'AI Recommendations',
        consolidateStreaming: 'Consolidate Streaming',
        consolidateStreamingDesc: 'We detected 2 streaming services. Consider using only one to save $20/month.',
        adobeAlternative: 'Adobe Creative Cloud',
        adobeAlternativeDesc: 'It\'s your most expensive subscription. Consider alternatives like Figma or Canva.',
        optimalSpending: 'Optimal Spending',
        optimalSpendingDesc: 'Your total spending is {monthly}/month ({percentage}% of income)',
        underControl: 'Is under control',
        yearlyTotal: '/year',
        inCategory: 'in',
        all: 'All',
        scanReceiptSubtitle: 'Scan receipts to add transactions automatically',
        processing: 'Processing receipt...',
        analyzingOCR: 'Analyzing image with OCR',
        clickToUpload: 'Click to upload a receipt',
        dragOrUpload: 'Or drag an image here (JPG, PNG, HEIC)',
        scannedReceipts: 'Scanned Receipts',
        receiptAmount: 'Amount',
        receiptCard: 'Card',
        add: 'Add',
        discard: 'Discard',
        info: 'Information',
        supportsFormats: 'We support JPG, PNG, HEIC and other image formats',
        extractsAutomatically: 'Automatically extracts: merchant, amount, date and time',
        detectsCardDigits: 'Detects the last digits of your card',
        assignsCategory: 'Automatically assigns category',
        addsTransaction: 'Will add the transaction to your history',
        at: 'at',
        settingsTitle: 'Settings',
        manageAccount: 'Manage your account and preferences',
        accountTab: 'Account',
        notificationsTab: 'Notifications',
        privacyTab: 'Privacy',
        currentPlan: 'Current Plan',
        yourCurrentPlan: 'Your current plan',
        financeAIProPlan: 'FinanceAI Pro',
        renewalDate: 'Renewal on September 15, 2026',
        cancelSubscription: 'Cancel Subscription',
        changePlan: 'Change Plan',
        perMonth: '/month',
        currentPlanButton: 'Current Plan',
        language: 'Language',
        accountSection: 'Account',
        emailLabel: 'Email',
        changePassword: 'Change Password',
        legalSection: 'Legal',
        termsOfService: 'Terms of Service',
        privacyPolicy: 'Privacy Policy',
        legalTerms: 'Legal Terms',
        planFree: 'Free',
        planPersonal: 'Personal',
        planPro: 'Pro',
        planBusiness: 'Business',
        featureBasicDashboard: 'Basic dashboard',
        featureLimitedTx: '5 transactions/month',
        featureNoAI: 'No AI',
        featureCompleteDashboard: 'Complete dashboard',
        featureUnlimitedTx: 'Unlimited transactions',
        featureBasicAI: 'Basic AI Assistant',
        featureScanReceipts: 'Receipt scanner',
        featureEverythingPersonal: 'Everything in Personal',
        featureAdvancedAI: 'Advanced AI',
        featureExpenseAnalysis: 'Expense analysis',
        featureExportPDF: 'PDF/CSV export',
        featureEverythingPro: 'Everything in Pro',
        featureMultiProfiles: '5 profiles',
        featurePrioritySupport: 'Priority support',
        featureAPIAccess: 'API access'
    }
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const LanguageProvider = ({ children })=>{
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('es');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        try {
            const saved = localStorage.getItem('financeai-lang');
            if (saved && [
                'es',
                'en'
            ].includes(saved)) {
                setLanguageState(saved);
            }
        } catch  {}
    }, []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        try {
            localStorage.setItem('financeai-lang', lang);
        } catch  {}
    };
    const t = (key)=>{
        return translations[language][key] || key;
    };
    if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/context/LanguageContext.tsx",
        lineNumber: 477,
        columnNumber: 24
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/LanguageContext.tsx",
        lineNumber: 480,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useLanguage = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        return {
            language: 'es',
            setLanguage: ()=>{},
            t: (key)=>key
        };
    }
    return context;
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1t5gss6._.js.map