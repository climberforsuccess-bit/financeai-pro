// ===========================
// FINANCEAI PRO — LANG.JS
// i18n Architecture v2.0
// Climberforsuccess LLC
// ===========================

const TRANSLATIONS = {
  en: {
    // NAVBAR
    nav_features:    'Features',
    nav_pricing:     'Pricing',
    nav_login:       'Login',
    nav_start:       'Start Free',

    // HERO
    hero_badge:      '✨ POWERED BY AI — FREE TO START',
    hero_title:      'Take Control of your <span style="color:#00EEFF">Finances</span> with Artificial Intelligence',
    hero_desc:       'Scan receipts, manage debts, discover the best cards and get personalized AI recommendations. All in one place.',
    hero_cta:        '🚀 Start Free Now',
    hero_demo:       'Watch Demo',
    stat1:           'Active Users',
    stat2:           'In Managed Debts',
    stat3:           'Compatible Cards',
    stat4:           'Average Rating',

    // FEATURES SECTION
    feat_title:      'Everything you need for your finances',
    feat_sub:        'Powerful features powered by artificial intelligence',
    f1_title:        'AI Receipt Scanner',
    f1_desc:         'Photograph any receipt and our AI automatically detects the amount, category, date and merchant.',
    f2_title:        'Best Card for Each Purchase',
    f2_desc:         'Get recommendations on which card to use based on benefits, cashback and available points.',
    f3_title:        'Debt Payoff Plan',
    f3_desc:         'Personalized strategies to pay off your debts faster using Avalanche and Snowball methods.',
    f4_title:        'AI Financial Assistant',
    f4_desc:         'Ask anything about your finances and get personalized advice based on your real data.',
    f5_title:        'Subscription Manager',
    f5_desc:         'Automatically detect your active subscriptions, alert you before charges and calculate monthly spend.',
    f6_title:        'Personal vs Business',
    f6_desc:         'Automatically separate personal and business expenses to keep your finances organized.',

    // PRICING SECTION
    price_title:     'Plans & Pricing',
    price_sub:       'Start free, scale when you are ready',
    billing_monthly: 'Monthly',
    billing_annual:  'Annual',
    billing_save:    '-20%',
    billing_banner:  '🎉 Annual plan saves you up to $120/year — 2 months FREE',
    plan_popular:    'Most Popular',
    plan_current:    'Current plan',
    plan_month:      '/mo',
    plan_year:       '/yr',
    period_personal: '/mo',
    period_pro:      '/mo',
    period_business: '/mo',
    plan_free_btn:   'Free forever',
    plan_pers_btn:   'Get Personal',
    plan_pro_btn:    'Get Pro',
    plan_biz_btn:    'Get Business',

    // SIDEBAR NAV
    nav_dash:        'Dashboard',
    nav_scan:        'AI Scanner',
    nav_trans:       'Transactions',
    nav_cards:       'My Cards',
    nav_debts:       'Debts',
    nav_subs:        'Subscriptions',
    nav_recs:        'Recommendations',
    nav_ai:          'AI Assistant',
    nav_rep:         'Reports',
    nav_set:         'Settings',
    nav_logout:      'Log Out',

    // DASHBOARD
    dash_title:      'Dashboard',
    dash_sub:        'Financial summary for this month',
    lbl_income:      'Monthly Income',
    lbl_expense:     'Monthly Expenses',
    lbl_balance:     'Available Balance',
    lbl_debt:        'Total Debt',
    lbl_recent:      'Recent Transactions',
    lbl_subs:        'Active Subscriptions',
    lbl_debts:       'Debt Plan',
    dash_view_all:   'View all',
    dash_ai_title:   '🤖 AI Assistant',
    dash_ai_online:  'Online',
    dash_chat_ph:    'Ask me something about your finances...',

    // TRANSACTIONS
    trans_title:     'Transactions',
    trans_add:       'Add Transaction',
    trans_all:       'All',
    trans_income:    'Income',
    trans_expense:   'Expense',
    trans_empty:     'No transactions yet',

    // CARDS
    cards_title:     'My Cards',
    cards_add:       'Add Card',
    cards_limit:     'Credit Limit',
    cards_used:      'Used',
    cards_available: 'Available',
    cards_empty:     'No cards added yet',

    // DEBTS
    debts_title:     'Debts',
    debts_total:     'Total Debt',
    debts_payoff:    'Estimated Payoff',
    debts_method:    'Payoff Method',
    debts_add:       'Add Debt',
    debts_empty:     'No debts registered',
    debt_method_title: '❄️ Avalanche Method',
    debt_ai_recs:    '💡 AI Recommendations',

    // SUBSCRIPTIONS
    subs_title:      'Subscriptions',
    subs_total:      'Total Monthly',
    subs_count:      'Active Subscriptions',
    subs_add:        'Add Subscription',
    subs_empty:      'No subscriptions yet',

    // SCANNER
    scan_title:      'AI Receipt Scanner',
    scan_upload:     'Drop your receipt here or click to upload',
    scan_formats:    'Supports JPG, PNG, PDF',
    scan_analyzing:  'Analyzing receipt...',
    scan_merchant:   'Merchant',
    scan_amount:     'Amount',
    scan_date:       'Date',
    scan_category:   'Category',
    scan_save:       'Save Expense',

    // REPORTS
    rep_title:       'Reports',
    rep_cat:         '📊 Expenses by Category',
    rep_monthly:     '📅 Monthly Summary 2025',

    // SETTINGS
    set_title:       'Settings',
    set_profile:     '👤 Profile',
    set_subtitle:    'Customize your experience',
    lbl_name:        'Name',
    lbl_email:       'Email',
    lbl_country:     'Country',
    set_currency:    'Currency',
    set_language:    '🌐 Language',
    set_plan:        '💳 Choose your plan',
    set_notif:       '🔔 Notifications',
    set_danger:      '⚠️ Danger Zone',
    set_legal:       '⚖️ Legal',
    set_save:        'Save Changes',
    set_logout_all:  'Log Out of All Devices',
    set_delete:      'Delete Account',

    // GENERAL
    general_save:    'Save',
    general_cancel:  'Cancel',
    general_delete:  'Delete',
    general_edit:    'Edit',
    general_add:     'Add',
    general_close:   'Close',
    general_loading: 'Loading...',
    general_yes:     'Yes, delete',
    general_personal:'Personal',
    general_business:'Business',

    // TOASTS
    toast_saved:     'Saved successfully',
    toast_deleted:   'Deleted successfully',
    toast_error:     'Error. Please try again.',

    // UPGRADE MODAL
    upgrade_title:   'Upgrade your plan',
    upgrade_cta:     'See Plans',
    upgrade_cancel:  'Maybe later',

    // LIMIT BANNERS
    limit_reached:   '🚫 Limit reached',
    limit_warning:   '⚠️ used — Consider upgrading',
    limit_upgrade:   'Upgrade your plan',

    // AI CHAT
    ai_welcome:      '👋 Hi! I\'m your FinanceAI assistant. How can I help you today?',
    ai_placeholder:  'Ask me something about your finances...',
    ai_thinking:     '💭 Thinking...',
    ai_msgs_left:    'messages today',
  },

  es: {
    // NAVBAR
    nav_features:    'Funciones',
    nav_pricing:     'Precios',
    nav_login:       'Entrar',
    nav_start:       'Empezar Gratis',

    // HERO
    hero_badge:      '✨ POWERED BY AI — GRATIS PARA EMPEZAR',
    hero_title:      'Toma el Control de tus <span style="color:#00EEFF">Finanzas</span> con Inteligencia Artificial',
    hero_desc:       'Escanea recibos, gestiona deudas, descubre las mejores tarjetas y recibe recomendaciones personalizadas con IA. Todo en un solo lugar.',
    hero_cta:        '🚀 Empezar Gratis Ahora',
    hero_demo:       'Ver Demo',
    stat1:           'Usuarios Activos',
    stat2:           'En Deudas Gestionadas',
    stat3:           'Tarjetas Compatibles',
    stat4:           'Calificación Promedio',

    // FEATURES SECTION
    feat_title:      'Todo lo que necesitas para tus finanzas',
    feat_sub:        'Funciones poderosas impulsadas por inteligencia artificial',
    f1_title:        'Escáner de Recibos IA',
    f1_desc:         'Fotografía cualquier recibo y nuestra IA detecta automáticamente el monto, categoría, fecha y comercio.',
    f2_title:        'Mejor Tarjeta para Cada Gasto',
    f2_desc:         'Recibe recomendaciones de qué tarjeta usar según los beneficios, cashback y puntos disponibles.',
    f3_title:        'Plan de Pago de Deudas',
    f3_desc:         'Estrategias personalizadas para pagar tus deudas más rápido usando los métodos Avalanche y Snowball.',
    f4_title:        'Asistente Financiero IA',
    f4_desc:         'Pregunta cualquier cosa sobre tus finanzas y recibe consejos personalizados basados en tus datos reales.',
    f5_title:        'Gestión de Suscripciones',
    f5_desc:         'Detecta automáticamente tus suscripciones activas, te alerta antes de cobros y calcula cuánto gastas al mes.',
    f6_title:        'Personal vs Empresa',
    f6_desc:         'Separa automáticamente gastos personales de los del negocio para mantener tus finanzas organizadas.',

    // PRICING SECTION
    price_title:     'Planes y Precios',
    price_sub:       'Comienza gratis, escala cuando estés listo',
    billing_monthly: 'Mensual',
    billing_annual:  'Anual',
    billing_save:    '-20%',
    billing_banner:  '🎉 Pagas anual y ahorras hasta $120/año — 2 meses GRATIS',
    plan_popular:    'Más Popular',
    plan_current:    'Tu plan actual',
    plan_month:      '/mes',
    plan_year:       '/año',
    period_personal: '/mes',
    period_pro:      '/mes',
    period_business: '/mes',
    plan_free_btn:   'Gratis para siempre',
    plan_pers_btn:   'Obtener Personal',
    plan_pro_btn:    'Obtener Pro',
    plan_biz_btn:    'Obtener Business',

    // SIDEBAR NAV
    nav_dash:        'Dashboard',
    nav_scan:        'Escáner IA',
    nav_trans:       'Transacciones',
    nav_cards:       'Mis Tarjetas',
    nav_debts:       'Deudas',
    nav_subs:        'Suscripciones',
    nav_recs:        'Recomendaciones',
    nav_ai:          'Asistente IA',
    nav_rep:         'Reportes',
    nav_set:         'Configuración',
    nav_logout:      'Cerrar Sesión',

    // DASHBOARD
    dash_title:      'Dashboard',
    dash_sub:        'Resumen financiero de este mes',
    lbl_income:      'Ingresos del Mes',
    lbl_expense:     'Gastos del Mes',
    lbl_balance:     'Balance Disponible',
    lbl_debt:        'Deuda Total',
    lbl_recent:      'Transacciones Recientes',
    lbl_subs:        'Suscripciones Activas',
    lbl_debts:       'Plan de Deudas',
    dash_view_all:   'Ver todas',
    dash_ai_title:   '🤖 Asistente IA',
    dash_ai_online:  'En línea',
    dash_chat_ph:    'Pregúntame algo sobre tus finanzas...',

    // TRANSACTIONS
    trans_title:     'Transacciones',
    trans_add:       'Agregar Transacción',
    trans_all:       'Todas',
    trans_income:    'Ingresos',
    trans_expense:   'Gastos',
    trans_empty:     'Sin transacciones aún',

    // CARDS
    cards_title:     'Mis Tarjetas',
    cards_add:       'Agregar Tarjeta',
    cards_limit:     'Límite de Crédito',
    cards_used:      'Usado',
    cards_available: 'Disponible',
    cards_empty:     'No hay tarjetas agregadas',

    // DEBTS
    debts_title:     'Deudas',
    debts_total:     'Deuda Total',
    debts_payoff:    'Liquidación Estimada',
    debts_method:    'Método de Pago',
    debts_add:       'Agregar Deuda',
    debts_empty:     'Sin deudas registradas',
    debt_method_title: '❄️ Método Avalanche',
    debt_ai_recs:    '💡 Recomendaciones IA',

    // SUBSCRIPTIONS
    subs_title:      'Suscripciones',
    subs_total:      'Total Mensual',
    subs_count:      'Suscripciones Activas',
    subs_add:        'Agregar Suscripción',
    subs_empty:      'Sin suscripciones aún',

    // SCANNER
    scan_title:      'Escáner de Recibos IA',
    scan_upload:     'Arrastra tu recibo aquí o haz clic para subir',
    scan_formats:    'Soporta JPG, PNG, PDF',
    scan_analyzing:  'Analizando recibo...',
    scan_merchant:   'Comercio',
    scan_amount:     'Monto',
    scan_date:       'Fecha',
    scan_category:   'Categoría',
    scan_save:       'Guardar Gasto',

    // REPORTS
    rep_title:       'Reportes',
    rep_cat:         '📊 Gastos por Categoría',
    rep_monthly:     '📅 Resumen Mensual 2025',

    // SETTINGS
    set_title:       'Configuración',
    set_profile:     '👤 Perfil',
    set_subtitle:    'Personaliza tu experiencia',
    lbl_name:        'Nombre',
    lbl_email:       'Email',
    lbl_country:     'País',
    set_currency:    'Moneda',
    set_language:    '🌐 Idioma',
    set_plan:        '💳 Elige tu plan',
    set_notif:       '🔔 Notificaciones',
    set_danger:      '⚠️ Zona de Peligro',
    set_legal:       '⚖️ Legal',
    set_save:        'Guardar Cambios',
    set_logout_all:  'Cerrar Sesión en Todos los Dispositivos',
    set_delete:      'Eliminar Cuenta',

    // GENERAL
    general_save:    'Guardar',
    general_cancel:  'Cancelar',
    general_delete:  'Eliminar',
    general_edit:    'Editar',
    general_add:     'Agregar',
    general_close:   'Cerrar',
    general_loading: 'Cargando...',
    general_yes:     'Sí, eliminar',
    general_personal:'Personal',
    general_business:'Empresa',

    // TOASTS
    toast_saved:     'Guardado exitosamente',
    toast_deleted:   'Eliminado exitosamente',
    toast_error:     'Error. Por favor intenta de nuevo.',

    // UPGRADE MODAL
    upgrade_title:   'Actualiza tu plan',
    upgrade_cta:     'Ver Planes',
    upgrade_cancel:  'Quizás después',

    // LIMIT BANNERS
    limit_reached:   '🚫 Límite alcanzado',
    limit_warning:   '⚠️ usadas — Considera actualizar',
    limit_upgrade:   'Actualiza tu plan',

    // AI CHAT
    ai_welcome:      '👋 ¡Hola! Soy tu asistente financiero IA. ¿En qué te puedo ayudar?',
    ai_placeholder:  'Pregúntame algo sobre tus finanzas...',
    ai_thinking:     '💭 Pensando...',
    ai_msgs_left:    'mensajes hoy',
  }
};

// ===========================
// ID → KEY MAP (complete)
// ===========================
const ID_KEY_MAP = {
  // NAVBAR
  'nav-features':      'nav_features',
  'nav-pricing':       'nav_pricing',
  'nav-login':         'nav_login',
  'nav-start':         'nav_start',

  // HERO
  'hero-badge':        'hero_badge',
  'hero-title':        'hero_title',
  'hero-desc':         'hero_desc',
  'hero-cta':          'hero_cta',
  'hero-demo':         'hero_demo',
  'stat1':             'stat1',
  'stat2':             'stat2',
  'stat3':             'stat3',
  'stat4':             'stat4',

  // FEATURES
  'feat-title':        'feat_title',
  'feat-sub':          'feat_sub',
  'f1-title':          'f1_title',
  'f1-desc':           'f1_desc',
  'f2-title':          'f2_title',
  'f2-desc':           'f2_desc',
  'f3-title':          'f3_title',
  'f3-desc':           'f3_desc',
  'f4-title':          'f4_title',
  'f4-desc':           'f4_desc',
  'f5-title':          'f5_title',
  'f5-desc':           'f5_desc',
  'f6-title':          'f6_title',
  'f6-desc':           'f6_desc',

  // PRICING
  'price-title':       'price_title',
  'price-sub':         'price_sub',
  'period-personal':   'period_personal',
  'period-pro':        'period_pro',
  'period-business':   'period_business',

  // SIDEBAR NAV
  'nav-dash':          'nav_dash',
  'nav-scan':          'nav_scan',
  'nav-trans':         'nav_trans',
  'nav-cards':         'nav_cards',
  'nav-debts':         'nav_debts',
  'nav-subs':          'nav_subs',
  'nav-recs':          'nav_recs',
  'nav-ai':            'nav_ai',
  'nav-rep':           'nav_rep',
  'nav-set':           'nav_set',

  // DASHBOARD
  'dash-title':        'dash_title',
  'dash-sub':          'dash_sub',
  'lbl-income':        'lbl_income',
  'lbl-expense':       'lbl_expense',
  'lbl-balance':       'lbl_balance',
  'lbl-debt':          'lbl_debt',
  'lbl-recent':        'lbl_recent',
  'lbl-subs':          'lbl_subs',
  'lbl-debts':         'lbl_debts',
  'debt-method-title': 'debt_method_title',
};

// ===========================
// LANGUAGE STATE
// ===========================
let currentLang = localStorage.getItem('financeai_lang') || 'es';

// ===========================
// t() — get translation
// ===========================
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || (TRANSLATIONS['en'] && TRANSLATIONS['en'][key])
    || key;
}

// ===========================
// applyLanguage — full DOM
// ===========================
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('financeai_lang', lang);
  document.documentElement.lang = lang;

  // 1. ID_KEY_MAP
  Object.entries(ID_KEY_MAP).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = t(key);
  });

  // 2. data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.innerHTML = t(key);
  });

  // 3. data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.placeholder = t(key);
  });

  // 4. Logout buttons
  document.querySelectorAll('[data-i18n-logout]').forEach(btn => {
    btn.textContent = t('nav_logout');
  });

  // 5. Lang button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const onclick = btn.getAttribute('onclick') || '';
    btn.classList.toggle('active', onclick.includes(`'${lang}'`));
  });

  // 6. Dispatch event for app.js dynamic content
  window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}

// ===========================
// setLang — public API
// ===========================
function setLang(lang) {
  applyLanguage(lang);
}

// ===========================
// toggleLang
// ===========================
function toggleLang() {
  setLang(currentLang === 'en' ? 'es' : 'en');
}

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
});

// ===========================
// EXPORTS
// ===========================
window.t = t;
window.setLang = setLang;
window.toggleLang = toggleLang;
window.FinanceAILang = {
  toggle: toggleLang,
  apply: applyLanguage,
  get: t,
  current: () => currentLang,
  translations: TRANSLATIONS
};
