const fs = require('fs');

const filePath = './src/pages/Dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Buscar el primer </table> (tabla de deudas)
const firstTableEnd = content.indexOf('</table>');

if (firstTableEnd !== -1) {
  // Buscar el cierre de las llaves y div después de la primera tabla
  const afterFirstTable = content.substring(firstTableEnd + 8);
  
  // Reemplazar la estructura para cerrar correctamente la primera tabla
  const replacement = `</table>
        ) : (
          <p className="text-gray-500">{t('dashboard.noDebts')}</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">{t('dashboard.recentTransactions')}</h2>`;
  
  const beforeFirstTable = content.substring(0, firstTableEnd + 8);
  
  // Encontrar dónde termina el bloque de deudas (antes de lastTransactions)
  const lastTransactionsIndex = afterFirstTable.indexOf('{lastTransactions.length > 0');
  
  if (lastTransactionsIndex !== -1) {
    const betweenTables = afterFirstTable.substring(0, lastTransactionsIndex);
    const fromLastTransactions = afterFirstTable.substring(lastTransactionsIndex);
    
    const fixed = beforeFirstTable + replacement + '\n        ' + fromLastTransactions;
    
    fs.writeFileSync(filePath, fixed, 'utf8');
    console.log('✅ Dashboard.tsx arreglado');
  }
}
