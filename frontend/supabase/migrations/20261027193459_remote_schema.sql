alter table "public"."transactions" drop constraint "transactions_status_check";

alter table "public"."transactions" add constraint "transactions_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying, 'disputed'::character varying])::text[]))) not valid;

alter table "public"."transactions" validate constraint "transactions_status_check";


