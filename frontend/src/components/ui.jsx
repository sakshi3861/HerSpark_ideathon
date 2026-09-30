import { useEffect, useState } from 'react';

export const Icon = ({ name, className = '' }) => (
  <span className={`material-symbols-outlined text-[20px] leading-none ${className}`} aria-hidden="true">{name}</span>
);

export const PageTitle = ({ children, chip }) => (
  <div className="flex flex-col gap-space-sm mb-space-lg">
    <h1 className="font-headline-md text-headline-md text-on-surface">{children}</h1>
    {chip}
  </div>
);

export const Card = ({ title, action, children, className = '' }) => (
  <section className={`bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-space-lg flex flex-col gap-space-md ${className}`}>
    {(title || action) && (
      <div className="flex items-center justify-between gap-space-md">
        {title && <h2 className="font-title text-title text-on-surface">{title}</h2>}
        {action}
      </div>
    )}
    {children}
  </section>
);

const buttonStyles = {
  primary: 'bg-primary-container text-on-primary hover:bg-primary',
  secondary: 'bg-surface-container-lowest text-primary-container border border-primary-container hover:bg-surface-container-low',
  coral: 'bg-coral text-white hover:opacity-90',
  ghost: 'text-primary-container hover:bg-surface-container-low',
};

export const Button = ({ variant = 'primary', icon, children, className = '', small, ...rest }) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center gap-space-sm rounded-lg font-label-lg text-label-lg whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${small ? 'h-8 px-space-md' : 'h-10 px-space-md'} ${buttonStyles[variant]} ${className}`}
    {...rest}
  >
    {icon && <Icon name={icon} className="text-[18px]" />}
    {children}
  </button>
);

const chipStyles = {
  green: 'bg-ok-bg text-ok',
  amber: 'bg-warn-bg text-warn',
  red: 'bg-bad-bg text-bad',
  grey: 'bg-surface-container text-on-surface-variant',
  outline: 'border border-outline-variant text-on-surface-variant',
  teal: 'bg-primary-fixed text-on-primary-fixed-variant',
};
const chipDefault = { green: 'Healthy', amber: 'Needs attention', red: 'Urgent', awaiting: 'Awaiting clinic approval' };

export const Chip = ({ tone = 'grey', icon, children }) => (
  <span className={`inline-flex items-center gap-1 h-6 px-space-sm rounded-full font-label-md text-label-md whitespace-nowrap self-start ${chipStyles[tone]}`}>
    {icon && <Icon name={icon} className="text-[14px]" />}
    {children}
  </span>
);

export const StatusChip = ({ status, children }) => (
  <Chip tone={status === 'awaiting' ? 'grey' : status}>{children ?? chipDefault[status]}</Chip>
);

export const Table = ({ head, children }) => (
  <table className="w-full text-left table-fixed">
    <thead>
      <tr className="border-b border-outline-variant/40">
        {head.map((h) => (
          <th key={h.label} className={`py-space-sm px-space-sm font-label-md text-label-md text-on-surface-variant uppercase ${h.className ?? ''}`}>{h.label}</th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-outline-variant/30">{children}</tbody>
  </table>
);

export const Td = ({ children, className = '' }) => (
  <td className={`py-space-md px-space-sm font-body-sm text-body-sm text-on-surface align-middle ${className}`}>{children}</td>
);

export const StatCard = ({ label, value, icon }) => (
  <Card>
    <div className="flex items-center gap-space-sm text-on-surface-variant">
      <Icon name={icon} className="text-primary-container" />
      <span className="font-label-lg text-label-lg">{label}</span>
    </div>
    <div className="font-headline-lg text-headline-lg text-on-surface tabular-nums">{value}</div>
  </Card>
);

export function useCountdown(expiresAt) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return Math.max(0, Math.ceil((expiresAt - now) / 1000));
}

export const formatMMSS = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export const Countdown = ({ expiresAt }) => <span className="tabular-nums">{formatMMSS(useCountdown(expiresAt))}</span>;
