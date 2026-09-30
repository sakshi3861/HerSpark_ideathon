import { Link } from 'react-router-dom';
import { LangToggle } from '../components/Shell.jsx';
import { Icon } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { t } from '../i18n.js';

const roles = [
  { to: '/partner', icon: 'support_agent', key: 'roleSakhi' },
  { to: '/clinic/health', icon: 'local_hospital', key: 'roleClinic' },
];

export default function RoleSelect() {
  const { lang } = useStore();
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="h-16 px-space-xl flex items-center justify-end">
        <LangToggle />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center gap-space-xl px-space-xl pb-12">
        <div className="flex flex-col items-center gap-space-md text-center">
          <span className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
            <Icon name="verified_user" className="text-[28px]" />
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary">Cyber Sakhi Box</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">{t('tagline', lang)}</p>
        </div>
        <div className="grid grid-cols-2 gap-space-lg w-full max-w-2xl">
          {roles.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-space-lg flex flex-col items-center gap-space-md text-center hover:border-primary-container hover:shadow-md transition-all"
            >
              <span className="w-14 h-14 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
                <Icon name={r.icon} className="text-[28px]" />
              </span>
              <span className="font-title text-title text-on-surface">{t(r.key, lang)}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
