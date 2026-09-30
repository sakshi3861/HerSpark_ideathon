import { Card, Chip, Icon, PageTitle } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { t } from '../i18n.js';
import { earnings, partner } from '../data/demo.js';

const inr = (n) => `Rs ${n.toLocaleString('en-IN')}`;

function Bars() {
  const max = Math.max(...earnings.months.map((m) => m.v));
  return (
    <div className="flex items-end gap-space-md h-48">
      {earnings.months.map((m, i) => {
        const last = i === earnings.months.length - 1;
        return (
          <div key={m.m} className="flex-1 flex flex-col items-center justify-end gap-space-sm h-full">
            <span className="font-label-md text-label-md text-on-surface-variant tabular-nums">{m.v.toLocaleString('en-IN')}</span>
            <div
              className={`w-full rounded-t-lg ${last ? 'bg-primary-container' : 'bg-primary-fixed-dim'}`}
              style={{ height: `${(m.v / max) * 100}%` }}
            />
            <span className="font-label-md text-label-md text-on-surface-variant">{m.m}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Earnings() {
  const { lang } = useStore();
  const progress = Math.round((partner.clinicCount / earnings.goal.clinics) * 100);

  return (
    <>
      <PageTitle>{t('earnings', lang)}</PageTitle>
      <div className="grid grid-cols-2 gap-space-lg mb-space-lg">
        <Card>
          <span className="font-label-lg text-label-lg text-on-surface-variant">This month</span>
          <div className="font-headline-lg text-headline-lg text-on-surface tabular-nums">{inr(earnings.thisMonth)}</div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {partner.clinicCount} clinics x {inr(earnings.perClinic)}
          </span>
        </Card>
        <Card>
          <div className="flex items-center gap-space-md">
            <span className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
              <Icon name="workspace_premium" className="text-[28px]" />
            </span>
            <div className="flex flex-col gap-space-sm">
              <Chip tone="teal" icon="verified">{partner.title}</Chip>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{partner.name}, {partner.cluster}</span>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-space-lg">
        <Card title="Last 6 months">
          <Bars />
        </Card>
        <Card title="Next goal">
          <span className="font-body-md text-body-md text-on-surface">
            {earnings.goal.clinics} clinics = {inr(earnings.goal.monthly)}/month
          </span>
          <div className="h-2 rounded-full bg-surface-container overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-coral rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant tabular-nums">{partner.clinicCount} of {earnings.goal.clinics} clinics</span>
        </Card>
      </div>
    </>
  );
}
