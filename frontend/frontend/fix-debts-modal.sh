#!/bin/bash

# Reemplaza la condición final en Debts.tsx
sed -i '' 's/{selectedDebt && !selectedDebt\.is_card && (/{selectedDebt && (/g' src/pages/Debts.tsx

echo "✅ Fixed Debts.tsx modal condition"
