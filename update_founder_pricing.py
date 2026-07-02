import re

# ============================================
# FOUNDER PRICING CONFIG
# ============================================
PRICES = {
    'personal': {'monthly': 7.99, 'monthly_original': 9.99, 'annual': 5.99, 'annual_original': 7.99},
    'pro':      {'monthly': 15.99, 'monthly_original': 19.99, 'annual': 11.99, 'annual_original': 15.99},
    'business': {'monthly': 39.99, 'monthly_original': 49.99, 'annual': 29.99, 'annual_original': 39.99},
}

DEADLINE = "September 30, 2026"
DEADLINE_ISO = "2026-09-30T23:59:59"

# ============================================
# COUNTDOWN BANNER HTML
# ============================================
BANNER = f'''
<!-- FOUNDER PRICING BANNER -->
<div id="founder-banner" style="background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 14px 20px; text-align: center; position: sticky; top: 0; z-index: 999;">
  <p style="color: white; font-weight: 700; font-size: 15px; margin: 0;">
    🔒 Founder's Price — Ends in: 
    <span id="countdown-timer" style="font-size: 18px; letter-spacing: 1px;">loading...</span>
    &nbsp;·&nbsp; Price increases on <strong>{DEADLINE}</strong>
  </p>
</div>

<script>
(function() {{
  const deadline = new Date("{DEADLINE_ISO}");
  function updateCountdown() {{
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) {{
      document.getElementById("countdown-timer").textContent = "EXPIRED";
      return;
    }}
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById("countdown-timer").textContent = 
      days + "d " + String(hours).padStart(2,"0") + "h " + 
      String(mins).padStart(2,"0") + "m " + String(secs).padStart(2,"0") + "s";
  }}
  updateCountdown();
  setInterval(updateCountdown, 1000);
}})();
</script>
'''

# ============================================
# READ FILES
# ============================================
with open("index.html", "r") as f:
    html = f.read()

with open("app.js", "r") as f:
    js = f.read()

# ============================================
# 1) INJECT BANNER after <body> tag
# ============================================
if 'founder-banner' not in html:
    html = html.replace('<body>', '<body>\n' + BANNER, 1)
    print("✅ Banner inserted after <body>")
else:
    print("⚠️  Banner already exists, skipping")

# ============================================
# 2) UPDATE PRICES IN app.js
# ============================================
# Look for pricing object or PLAN_PRICES in app.js
price_block = f"""
// FOUNDER PRICING - Updated automatically
const FOUNDER_PRICES = {{
  personal: {{
    monthly: {PRICES['personal']['monthly']},
    monthly_original: {PRICES['personal']['monthly_original']},
    annual: {PRICES['personal']['annual']},
    annual_original: {PRICES['personal']['annual_original']}
  }},
  pro: {{
    monthly: {PRICES['pro']['monthly']},
    monthly_original: {PRICES['pro']['monthly_original']},
    annual: {PRICES['pro']['annual']},
    annual_original: {PRICES['pro']['annual_original']}
  }},
  business: {{
    monthly: {PRICES['business']['monthly']},
    monthly_original: {PRICES['business']['monthly_original']},
    annual: {PRICES['business']['annual']},
    annual_original: {PRICES['business']['annual_original']}
  }}
}};
const FOUNDER_DEADLINE = "{DEADLINE}";
const FOUNDER_DEADLINE_ISO = "{DEADLINE_ISO}";
"""

if 'FOUNDER_PRICES' not in js:
    # Insert after first line or after 'use strict'
    if "'use strict'" in js:
        js = js.replace("'use strict'", "'use strict'\n" + price_block, 1)
    else:
        js = price_block + js
    print("✅ FOUNDER_PRICES injected into app.js")
else:
    print("⚠️  FOUNDER_PRICES already exists in app.js, skipping")

# ============================================
# 3) SAVE FILES
# ============================================
with open("index.html", "w") as f:
    f.write(html)
print("✅ index.html saved")

with open("app.js", "w") as f:
    f.write(js)
print("✅ app.js saved")

print("\n🎉 Done! Next step: update renderPricing() to use FOUNDER_PRICES")
