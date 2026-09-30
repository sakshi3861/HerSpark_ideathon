import { Link, NavLink, Outlet } from 'react-router-dom';
import { LANGS, t } from '../i18n.js';
import { useStore } from '../store.jsx';
import { clinic, partner } from '../data/demo.js';
import { Icon } from './ui.jsx';
import Toast from './Toast.jsx';

const NAV = {
  partner: {
    home: '/partner',
    who: `${partner.name}, ${partner.cluster}`,
    items: [
      { to: '/partner', end: true, icon: 'local_hospital', key: 'clinics' },
      { to: '/partner/earnings', icon: 'account_balance_wallet', key: 'earnings' },
    ],
  },
  clinic: {
    home: '/clinic/health',
    who: `${clinic.name}, ${clinic.location}`,
    items: [
      { to: '/clinic/health', icon: 'verified_user', key: 'health' },
      { to: '/clinic/scam-check', icon: 'gpp_maybe', key: 'scam' },
      { to: '/clinic/backup', icon: 'cloud_done', key: 'backup' },
      { to: '/clinic/approvals', icon: 'fact_check', key: 'approvals' },
      { to: '/clinic/report', icon: 'description', key: 'report' },
    ],
  },
};

const navClass = ({ isActive }) =>
  `flex items-center gap-space-sm h-10 px-space-md rounded-lg font-label-lg text-label-lg transition-colors ${
    isActive ? 'bg-primary-container text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high'
  }`;

export function LangToggle() {
  const { lang, setLang } = useStore();
  return (
    <div role="group" aria-label="Language" className="inline-flex p-1 bg-surface-container rounded-full">
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          onClick={() => setLang(l.id)}
          className={`h-7 px-space-md rounded-full font-label-md text-label-md transition-colors ${
            lang === l.id ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function Shell({ role }) {
  const { lang, pending } = useStore();
  const nav = NAV[role];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md">
      <aside className="fixed inset-y-0 left-0 w-64 bg-surface-container-lowest border-r border-outline-variant/40 flex flex-col justify-between p-space-md">
        <div className="flex flex-col gap-space-lg">
          <Link to={nav.home} className="flex items-center gap-space-sm h-10 px-space-sm">
            <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
              <Icon name="verified_user" />
            </span>
            <span className="font-title text-title text-primary">Cyber Sakhi Box</span>
          </Link>
          <nav className="flex flex-col gap-space-xs">
            {nav.items.map((i) => (
              <NavLink key={i.to} to={i.to} end={i.end} className={navClass}>
                <Icon name={i.icon} />
                <span className="flex-1">{t(i.key, lang)}</span>
                {i.key === 'approvals' && pending.length > 0 && (
                  <span className="min-w-5 h-5 px-1 rounded-full bg-coral text-white font-label-md text-label-md flex items-center justify-center">
                    {pending.length}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        <Link
          to="/"
          className="flex items-center gap-space-sm h-10 px-space-md rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high"
        >
          <Icon name="logout" />
          {t('switchRole', lang)}
        </Link>
      </aside>

      <div className="pl-64">
        <header className="h-16 px-space-xl flex items-center justify-between border-b border-outline-variant/40 bg-surface-container-lowest">
          <span className="font-label-lg text-label-lg text-on-surface-variant">{nav.who}</span>
          <LangToggle />
        </header>
        <main className="max-w-[1120px] mx-auto p-space-xl">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  );
}
