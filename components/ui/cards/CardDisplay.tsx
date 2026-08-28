'use client';

interface CardDisplayProps {
  name: string;
  bank: string;
  lastDigits: string;
  balance: number;
  limit: number;
  color: string;
  type: 'credit' | 'debit';
}

export function CardDisplay({ name, bank, lastDigits, balance, limit, color, type }: CardDisplayProps) {
  const percentage = (balance / limit) * 100;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}, ${adjustBrightness(color, -30)})`,
      borderRadius: '16px',
      padding: '24px',
      color: '#fff',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Chip */}
      <div style={{
        width: '60px',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        border: '2px solid rgba(255, 255, 255, 0.4)',
      }} />

      {/* Middle Info */}
      <div>
        <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>
          {bank}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
          {name}
        </div>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>
          •••• {lastDigits}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>Balance</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            ${balance.toFixed(2)}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>Limit</div>
          <div style={{ fontSize: '14px' }}>
            ${limit.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.2)',
        height: '4px',
        borderRadius: '2px',
        marginTop: '12px',
        overflow: 'hidden',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          height: '100%',
          width: `${percentage}%`,
          transition: 'width 0.3s',
        }} />
      </div>
    </div>
  );
}

function adjustBrightness(color: string, percent: number) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16)
    .slice(1);
}
