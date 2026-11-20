const fs = require('fs');
const path = require('path');

const filePath = './src/pages/Dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Buscar el cierre de la tabla de deudas y asegurar que esté bien cerrado
const debtTableEnd = content.indexOf('</table>');
if (debtTableEnd !== -1) {
  // Buscar el siguiente contenido después del primer </table>
  const afterFirstTable = content.substring(0, debtTableEnd + 8); // Include </table>
  const rest = content.substring(debtTableEnd + 8);
  
  // Buscar dónde comienza lastTransactions
  if (rest.includes('{lastTransactions.length > 0 ?')) {
    // Insertar cierre de div si es necesario
    const fixed = afterFirstTable + '\n        ) : (\n          <p className="text-gray-500">{t(\'dashboard.noDebts\')}</p>\n        )}\n      </div>\n\n      <div className="bg-white rounded-lg shadow p-6">\n        <h2 className="text-xl font-bold mb-4">{t(\'dashboard.recentTransactions\')}</h2>' + rest;
    
    fs.writeFileSync(filePath, fixed, 'utf8');
    console.log('✅ Dashboard.tsx arreglado');
  }
}
