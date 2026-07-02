-- Table for scheduled follow-up emails
CREATE TABLE IF NOT EXISTS scheduled_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  send_at TIMESTAMPTZ NOT NULL,
  type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for cron job query
CREATE INDEX IF NOT EXISTS idx_scheduled_emails_send_at 
  ON scheduled_emails(send_at) 
  WHERE sent = false;
