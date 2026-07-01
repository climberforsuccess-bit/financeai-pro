import os
from supabase import create_client
from datetime import datetime, timedelta, timezone

SUPABASE_URL = "tu_supabase_url"
SUPABASE_KEY = "tu_service_role_key"  # usa service_role, NO anon key

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ✅ Fix 1 — Poner trial_ends_at a todos los profiles que tienen NULL
profiles = supabase.table("profiles").select("*").is_("trial_ends_at", "null").execute()

for profile in profiles.data:
    trial_end = datetime.now(timezone.utc) + timedelta(days=7)
    supabase.table("profiles").update({
        "trial_ends_at": trial_end.isoformat()
    }).eq("id", profile["id"]).execute()
    print(f"✅ Trial set for: {profile.get('email', profile['id'])}")

print("Done!")

