// ============================================
// SUPABASE CONFIG - FinanceAI Pro
// ============================================
const SUPABASE_URL = 'https://rqrpazkkwolxtpiqtdfu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// AUTH FUNCTIONS
// ============================================

// LOGIN
async function doLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-pass').value.trim();

    if (!email || !password) {
        showAuthError('Please enter email and password');
        return;
    }

    showAuthLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    showAuthLoading(false);

    if (error) {
        showAuthError(error.message);
        return;
    }

  // Success - redirect to app
localStorage.setItem('financeai_user', JSON.stringify(data.user));
setTimeout(() => {
window.location.replace('app.html');


}, 500);

}

// REGISTER
async function doRegister() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-pass').value.trim();
    const confirm = document.getElementById('reg-confirm').value.trim();

    if (!name || !email || !password) {
        showAuthError('Please fill all fields');
        return;
    }

    if (password !== confirm) {
        showAuthError('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        showAuthError('Password must be at least 6 characters');
        return;
    }

    showAuthLoading(true);

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: name }
        }
    });

    showAuthLoading(false);

    if (error) {
        showAuthError(error.message);
        return;
    }

    showAuthSuccess('Account created! Please check your email to verify.');
}

// FORGOT PASSWORD
async function doForgotPassword() {
    const email = document.getElementById('login-email').value.trim();

    if (!email) {
        showAuthError('Enter your email first');
        return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://climberforsuccess.online/app.html'
    });

    if (error) {
        showAuthError(error.message);
        return;
    }

    showAuthSuccess('Password reset email sent! Check your inbox.');
}

// LOGOUT
async function doLogout() {
    await supabase.auth.signOut();
    localStorage.removeItem('financeai_user');
    window.location.href = 'index.html';
}

// CHECK SESSION
async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

// PROTECT APP PAGE
async function protectPage() {
    const session = await checkSession();
    if (!session) {
        window.location.href = 'index.html';
    }
    return session;
}

// ============================================
// UI HELPERS
// ============================================
function showAuthError(msg) {
    let el = document.getElementById('auth-error');
    if (!el) {
        el = document.createElement('div');
        el.id = 'auth-error';
        el.style.cssText = `
            background: rgba(255,50,50,0.1);
            border: 1px solid rgba(255,50,50,0.3);
            color: #FF6B6B;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 0.85rem;
            margin-top: 12px;
            text-align: center;
        `;
        const form = document.querySelector('.auth-box');
        if (form) form.appendChild(el);
    }
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function showAuthSuccess(msg) {
    let el = document.getElementById('auth-success');
    if (!el) {
        el = document.createElement('div');
        el.id = 'auth-success';
        el.style.cssText = `
            background: rgba(0,238,255,0.1);
            border: 1px solid rgba(0,238,255,0.3);
            color: #00EEFF;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 0.85rem;
            margin-top: 12px;
            text-align: center;
        `;
        const form = document.querySelector('.auth-box');
        if (form) form.appendChild(el);
    }
    el.textContent = msg;
    el.style.display = 'block';
}

function showAuthLoading(show) {
    const btn = document.querySelector('.btn-primary.btn-full');
    if (btn) {
        btn.textContent = show ? 'Loading...' : 'Iniciar Sesión';
        btn.disabled = show;
    }
}
