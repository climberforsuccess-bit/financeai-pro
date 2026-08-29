#!/bin/bash

echo "=== Verificando estructura de Supabase ==="
echo ""
echo "Conectando a: https://rqrpazkkwolxtpiqtdfu.supabase.co"
echo ""
echo "Las tablas existentes se pueden verificar en:"
echo "1. Dashboard Supabase → SQL Editor → Run"
echo "2. O en: https://app.supabase.com/project/rqrpazkkwolxtpiqtdfu/editor"
echo ""
echo "Query para listar tablas:"
echo "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
