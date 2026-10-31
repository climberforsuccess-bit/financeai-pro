alter table "public"."transactions" drop constraint "transactions_status_check";

alter table "public"."cards" drop column "billing_cycle_start";

alter table "public"."cards" drop column "statement_date";

alter table "public"."debts" add column "card_id" uuid;

CREATE INDEX idx_debts_card_id ON public.debts USING btree (card_id);

alter table "public"."debts" add constraint "debts_card_id_fkey" FOREIGN KEY (card_id) REFERENCES public.cards(id) ON DELETE SET NULL not valid;

alter table "public"."debts" validate constraint "debts_card_id_fkey";

alter table "public"."transactions" add constraint "transactions_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying, 'disputed'::character varying])::text[]))) not valid;

alter table "public"."transactions" validate constraint "transactions_status_check";


  create policy "Users can delete own cards"
  on "public"."cards"
  as permissive
  for delete
  to public
using ((auth.uid() = profile_id));



  create policy "Users can insert own cards"
  on "public"."cards"
  as permissive
  for insert
  to public
with check ((auth.uid() = profile_id));



  create policy "Users can update own cards"
  on "public"."cards"
  as permissive
  for update
  to public
using ((auth.uid() = profile_id))
with check ((auth.uid() = profile_id));



  create policy "Users can view own cards"
  on "public"."cards"
  as permissive
  for select
  to public
using ((auth.uid() = profile_id));



