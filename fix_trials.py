from supabase import create_client
from datetime import datetime, timedelta, timezone

SUPABASE_URL = "https://rqrpazkkwolxtpiqtdfu.supabase.co"  # ya la veo en la URL
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4"  # click Reveal y copia

supabase = create_client(rqrpazkkwolxtpiqtdfu, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgxMzcyNiwiZXhwIjoyMDk2Mzg5NzI2fQ.yg3L_iYpJykt5WW1_uPhnYaFMzJ6r8zxqaaK36B7qt4)

# Fix trial_ends_at para todos los profiles con NULL
profiles = supabase.table("profiles").select("*").is_("trial_ends_at", "null").execute()

for profile in profiles.data:
    trial_end = datetime.now(timezone.utc) + timedelta(days=7)
    supabase.table("profiles").update({
        "trial_ends_at": trial_end.isoformat()
    }).eq("id", profile["id"]).execute()
    print(f"✅ Trial set for: {profile.get('email', profile['id'])}")

print("✅ Done!")
