import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) code += '-';
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, plan, billing } = req.body;

    if (!email || !plan) {
      return res.status(400).json({ error: 'email and plan required' });
    }

    const code = generateCode();
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const { error: dbError } = await supabase
      .from('gift_codes')
      .insert({
        code,
        plan,
        billing: billing || 'monthly',
        created_for_email: email,
        used: false,
        expires_at: expiresAt.toISOString()
      });

    if (dbError) {
      console.error('Supabase error:', dbError);
      return res.status(500).json({ error: dbError.message });
    }

    const { error: emailError } = await resend.emails.send({
      from: 'FinanceAI <noreply@climberforsuccess.online>',
      to: [email],
      subject: '🎁 Your FinanceAI Gift Code',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#ffffff;padding:40px;border-radius:12px;">
          <h1 style="color:#6366f1;text-align:center;">🎁 Your FinanceAI Gift Code</h1>
          <p style="text-align:center;color:#94a3b8;">Someone special sent you a gift!</p>
          <div style="background:#1e293b;border:2px solid #6366f1;border-radius:12px;padding:30px;text-align:center;margin:30px 0;">
            <p style="color:#94a3b8;margin:0 0 10px 0;">Your activation code:</p>
            <h2 style="color:#ffffff;font-size:28px;letter-spacing:4px;margin:0;">${code}</h2>
          </div>
          <div style="background:#1e293b;border-radius:8px;padding:20px;margin:20px 0;">
            <p style="margin:5px 0;color:#94a3b8;">📦 Plan: <span style="color:#ffffff;text-transform:capitalize;">${plan}</span></p>
            <p style="margin:5px 0;color:#94a3b8;">📅 Billing: <span style="color:#ffffff;text-transform:capitalize;">${billing || 'monthly'}</span></p>
            <p style="margin:5px 0;color:#94a3b8;">⏰ Expires: <span style="color:#ffffff;">${expiresAt.toLocaleDateString()}</span></p>
          </div>
          <div style="text-align:center;margin-top:30px;">
            <a href="https://www.climberforsuccess.online" style="background:#6366f1;color:white;padding:14px 30px;border-radius:8px;text-decoration:none;font-weight:bold;">
              Activate Now →
            </a>
          </div>
          <p style="text-align:center;color:#475569;font-size:12px;margin-top:30px;">
            FinanceAI Pro · climberforsuccess.online
          </p>
        </div>
      `
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return res.status(500).json({ error: 'Email failed', details: emailError });
    }

    return res.status(200).json({ success: true, code });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
