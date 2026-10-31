


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."cards" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "last_four" "text",
    "card_type" "text" DEFAULT 'credit'::"text",
    "balance" numeric(10,2) DEFAULT 0,
    "limit_amount" numeric(10,2) DEFAULT 0,
    "due_date" integer,
    "color" "text" DEFAULT '#00EEFF'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "apr" numeric DEFAULT 0,
    "owner_type" "text" DEFAULT 'personal'::"text" NOT NULL,
    "bank" "text",
    "profile_id" "uuid",
    "utilization_ratio" numeric DEFAULT 0,
    "payment_status" "text" DEFAULT 'current'::"text",
    "payment_method" character varying(50),
    "min_payment" numeric(15,2),
    "statement_date" integer,
    "is_active" boolean DEFAULT true,
    "notes" "text",
    "billing_cycle_start" integer,
    CONSTRAINT "cards_payment_status_check" CHECK (("payment_status" = ANY (ARRAY['current'::"text", 'late'::"text", 'paid_off'::"text"])))
);


ALTER TABLE "public"."cards" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."debt_payments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "debt_id" "uuid" NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "amount" numeric(12,2) NOT NULL,
    "payment_date" timestamp without time zone DEFAULT "now"(),
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "payment_method" character varying(50) DEFAULT 'manual'::character varying,
    CONSTRAINT "amount_positive" CHECK (("amount" > (0)::numeric))
);


ALTER TABLE "public"."debt_payments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."debts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "total_amount" numeric(10,2) DEFAULT 0,
    "current_balance" numeric(10,2) DEFAULT 0,
    "interest_rate" numeric(5,2) DEFAULT 0,
    "minimum_payment" numeric(10,2) DEFAULT 0,
    "due_date" integer,
    "debt_type" "text" DEFAULT 'credit_card'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "profile_id" "uuid",
    "category" "text" DEFAULT 'consumo'::"text",
    "property_value" numeric DEFAULT 0,
    "loan_term_months" integer DEFAULT 0,
    "loan_start_date" "date",
    "current_loan_month" integer DEFAULT 1,
    "vehicle_value" numeric DEFAULT 0,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "notes" "text",
    "interest_accrued" numeric(15,2) DEFAULT 0,
    "payment_frequency" character varying(50),
    "amount_paid" numeric(15,2) DEFAULT 0,
    "remaining_amount" numeric(15,2),
    "principal" numeric(15,2)
);


ALTER TABLE "public"."debts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."gift_codes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "code" "text" NOT NULL,
    "plan" "text" NOT NULL,
    "billing" "text" DEFAULT 'monthly'::"text",
    "created_for_email" "text",
    "redeemed_by_email" "text",
    "used" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "expires_at" timestamp with time zone,
    "redeemed_at" timestamp with time zone,
    "used_by" "uuid",
    "used_at" timestamp with time zone,
    "max_uses" integer DEFAULT 1,
    "times_used" integer DEFAULT 0,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "discount_type" character varying(50),
    "discount_value" numeric(15,2),
    "created_by" "uuid",
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."gift_codes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."goals" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "target_amount" numeric(15,2) NOT NULL,
    "current_amount" numeric(15,2) DEFAULT 0,
    "deadline" "date",
    "category" "text",
    "status" "text" DEFAULT 'active'::"text",
    "currency" "text" DEFAULT 'USD'::"text",
    "is_recurring" boolean DEFAULT false,
    "recurrence_frequency" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."goals" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "email" "text",
    "full_name" "text",
    "plan" "text" DEFAULT 'free'::"text",
    "subscription_status" "text" DEFAULT 'inactive'::"text",
    "stripe_customer_id" "text",
    "stripe_subscription_id" "text",
    "billing_period" "text" DEFAULT 'monthly'::"text",
    "trial_ends_at" timestamp with time zone,
    "subscription_ends_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "ai_usage_count" integer DEFAULT 0,
    "financial_score" integer DEFAULT 0,
    "days_active" integer DEFAULT 0,
    "total_saved" numeric DEFAULT 0,
    "retention_offer_used" boolean DEFAULT false,
    "retention_reason" "text",
    "retention_discount_id" "text",
    "country" "text" DEFAULT 'us'::"text",
    "currency" "text" DEFAULT 'USD'::"text",
    "display_name" "text"
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."retention_offers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "reason" "text" NOT NULL,
    "offer_type" "text" NOT NULL,
    "offer_accepted" boolean DEFAULT false,
    "discount_coupon" "text",
    "ai_message" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "expires_at" timestamp with time zone DEFAULT ("now"() + '00:10:00'::interval),
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "notes" "text",
    "discount_type" character varying(50),
    "discount_value" numeric(15,2),
    "ai_confidence" numeric(3,2),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."retention_offers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."scheduled_emails" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text" NOT NULL,
    "send_at" timestamp with time zone NOT NULL,
    "type" "text" NOT NULL,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "sent" boolean DEFAULT false,
    "sent_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."scheduled_emails" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "amount" numeric(10,2) DEFAULT 0,
    "billing_cycle" "text" DEFAULT 'monthly'::"text",
    "category" "text" DEFAULT 'entertainment'::"text",
    "next_billing_date" "date",
    "status" "text" DEFAULT 'active'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "profile_id" "uuid",
    "card_id" "uuid",
    "notify_days_before" integer DEFAULT 3,
    "last_auto_charged" "date",
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "payment_method" character varying(50),
    "notes" "text",
    "auto_charge" boolean DEFAULT true,
    "auto_charge_retry_count" integer DEFAULT 0,
    "cancellation_reason" "text",
    "billing_day" integer,
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."subscriptions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."transactions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "description" "text" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "type" "text",
    "category" "text",
    "expense_type" "text" DEFAULT 'personal'::"text",
    "date" "date" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "profile_id" "uuid",
    "card_id" "uuid",
    "merchant" "text",
    "tags" "text"[] DEFAULT '{}'::"text"[],
    "receipt_id" "uuid",
    "recurring" boolean DEFAULT false,
    "status" character varying(20) DEFAULT 'confirmed'::character varying,
    "currency" character varying(3) DEFAULT 'USD'::character varying,
    "payment_method" character varying(50),
    "notes" "text",
    "is_recurring" boolean DEFAULT false,
    "recurring_id" "uuid",
    "recurring_frequency" character varying(50),
    "recurring_end_date" "date",
    "split_id" "uuid",
    CONSTRAINT "transactions_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying, 'disputed'::character varying])::"text"[]))),
    CONSTRAINT "transactions_type_check" CHECK (("type" = ANY (ARRAY['income'::"text", 'expense'::"text"])))
);


ALTER TABLE "public"."transactions" OWNER TO "postgres";


ALTER TABLE ONLY "public"."cards"
    ADD CONSTRAINT "cards_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."debt_payments"
    ADD CONSTRAINT "debt_payments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."debts"
    ADD CONSTRAINT "debts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."gift_codes"
    ADD CONSTRAINT "gift_codes_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."gift_codes"
    ADD CONSTRAINT "gift_codes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."goals"
    ADD CONSTRAINT "goals_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."retention_offers"
    ADD CONSTRAINT "retention_offers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."scheduled_emails"
    ADD CONSTRAINT "scheduled_emails_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");



CREATE INDEX "goals_profile_id_idx" ON "public"."goals" USING "btree" ("profile_id");



CREATE INDEX "idx_cards_profile_id" ON "public"."cards" USING "btree" ("profile_id");



CREATE INDEX "idx_debt_payments_debt_id" ON "public"."debt_payments" USING "btree" ("debt_id");



CREATE INDEX "idx_debt_payments_payment_date" ON "public"."debt_payments" USING "btree" ("payment_date" DESC);



CREATE INDEX "idx_debt_payments_profile_id" ON "public"."debt_payments" USING "btree" ("profile_id");



CREATE INDEX "idx_debts_profile_id" ON "public"."debts" USING "btree" ("profile_id");



CREATE INDEX "idx_scheduled_emails_send_at" ON "public"."scheduled_emails" USING "btree" ("send_at") WHERE ("sent" = false);



CREATE INDEX "idx_subscriptions_next_billing" ON "public"."subscriptions" USING "btree" ("next_billing_date");



CREATE INDEX "idx_subscriptions_profile_id" ON "public"."subscriptions" USING "btree" ("profile_id");



CREATE INDEX "idx_transactions_category" ON "public"."transactions" USING "btree" ("category");



CREATE INDEX "idx_transactions_date" ON "public"."transactions" USING "btree" ("date");



CREATE INDEX "idx_transactions_profile_id" ON "public"."transactions" USING "btree" ("profile_id");



CREATE INDEX "idx_transactions_receipt_id" ON "public"."transactions" USING "btree" ("receipt_id");



CREATE INDEX "idx_transactions_recurring" ON "public"."transactions" USING "btree" ("recurring");



CREATE INDEX "idx_transactions_status" ON "public"."transactions" USING "btree" ("status");



CREATE INDEX "idx_transactions_tags" ON "public"."transactions" USING "gin" ("tags");



ALTER TABLE ONLY "public"."debt_payments"
    ADD CONSTRAINT "debt_payments_debt_id_fkey" FOREIGN KEY ("debt_id") REFERENCES "public"."debts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."debt_payments"
    ADD CONSTRAINT "debt_payments_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."gift_codes"
    ADD CONSTRAINT "gift_codes_used_by_fkey" FOREIGN KEY ("used_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."goals"
    ADD CONSTRAINT "goals_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE SET NULL;



CREATE POLICY "Service role full access" ON "public"."gift_codes" USING (true) WITH CHECK (true);



CREATE POLICY "Users can insert own profile" ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Users can insert their own debt payments" ON "public"."debt_payments" FOR INSERT WITH CHECK (("profile_id" = "auth"."uid"()));



CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view their own debt payments" ON "public"."debt_payments" FOR SELECT USING (("profile_id" = "auth"."uid"()));



ALTER TABLE "public"."cards" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."debt_payments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."gift_codes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."retention_offers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."scheduled_emails" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."transactions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."cards" TO "anon";
GRANT ALL ON TABLE "public"."cards" TO "authenticated";
GRANT ALL ON TABLE "public"."cards" TO "service_role";



GRANT ALL ON TABLE "public"."debt_payments" TO "anon";
GRANT ALL ON TABLE "public"."debt_payments" TO "authenticated";
GRANT ALL ON TABLE "public"."debt_payments" TO "service_role";



GRANT ALL ON TABLE "public"."debts" TO "anon";
GRANT ALL ON TABLE "public"."debts" TO "authenticated";
GRANT ALL ON TABLE "public"."debts" TO "service_role";



GRANT ALL ON TABLE "public"."gift_codes" TO "anon";
GRANT ALL ON TABLE "public"."gift_codes" TO "authenticated";
GRANT ALL ON TABLE "public"."gift_codes" TO "service_role";



GRANT ALL ON TABLE "public"."goals" TO "anon";
GRANT ALL ON TABLE "public"."goals" TO "authenticated";
GRANT ALL ON TABLE "public"."goals" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."retention_offers" TO "anon";
GRANT ALL ON TABLE "public"."retention_offers" TO "authenticated";
GRANT ALL ON TABLE "public"."retention_offers" TO "service_role";



GRANT ALL ON TABLE "public"."scheduled_emails" TO "anon";
GRANT ALL ON TABLE "public"."scheduled_emails" TO "authenticated";
GRANT ALL ON TABLE "public"."scheduled_emails" TO "service_role";



GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";



GRANT ALL ON TABLE "public"."transactions" TO "anon";
GRANT ALL ON TABLE "public"."transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."transactions" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";

alter table "public"."transactions" drop constraint "transactions_status_check";

alter table "public"."transactions" add constraint "transactions_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying, 'disputed'::character varying])::text[]))) not valid;

alter table "public"."transactions" validate constraint "transactions_status_check";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


