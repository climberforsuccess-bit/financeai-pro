-- Insertar deuda de prueba
INSERT INTO debts (
  profile_id, name, total_amount, current_balance, 
  interest_rate, minimum_payment, due_date, debt_type, created_at
)
VALUES (
  '8181842f-0232-4981-8f5c-363617185321',
  'Tarjeta de Crédito Banco X',
  5000.00,
  5000.00,
  18.5,
  150.00,
  30,
  'credit_card',
  NOW()
);

-- Insertar transacción de prueba
INSERT INTO transactions (
  profile_id, description, amount, type, category, 
  date, created_at
)
VALUES (
  '8181842f-0232-4981-8f5c-363617185321',
  'Pago de servicios',
  150.00,
  'expense',
  'utilities',
  NOW(),
  NOW()
);

-- Insertar suscripción de prueba
INSERT INTO subscriptions (
  profile_id, name, amount, billing_cycle, 
  category, status, created_at
)
VALUES (
  '8181842f-0232-4981-8f5c-363617185321',
  'Netflix',
  15.99,
  'monthly',
  'entertainment',
  'active',
  NOW()
);
