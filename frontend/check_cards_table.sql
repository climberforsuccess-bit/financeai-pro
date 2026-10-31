-- Ver política RLS de cards
SELECT
  tablename,
  policyname,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'cards'
ORDER BY policyname;
