'use client';

interface CardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  bgColor?: string;
  textColor?: string;
}

export function Card({ title, value, subtitle, icon, bgColor = '#334155', textColor = '#0ea5e9' }: CardProps) {
  return (
    <div style={{
      background: bgColor,
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #475569',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      minHeight: '140px',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>
          {title}
        </div>
        {icon && <span style={{ fontSize: '24px' }}>{icon}</span>}
      </div>
      <div>
        <div style={{ color: textColor, fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ color: '#64748b', fontSize: '12px' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
