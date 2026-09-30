import { Button, Card, Chip, Icon, PageTitle } from '../components/ui.jsx';
import ScoreRing from '../components/ScoreRing.jsx';
import { useStore } from '../store.jsx';
import { t } from '../i18n.js';
import { clinic, report } from '../data/demo.js';

export default function Report() {
  const { lang, toast } = useStore();

  return (
    <>
      <PageTitle>{t('report', lang)}</PageTitle>
      <div className="grid grid-cols-2 gap-space-lg items-stretch">
        <Card className="items-center text-center">
          <h2 className="font-title text-title text-on-surface">{report.title}</h2>
          <ScoreRing score={clinic.score} status="amber" />
          <Chip tone="green" icon="trending_up">{report.delta}</Chip>
          <div className="grid grid-cols-2 gap-space-md w-full">
            {report.tiles.map((tile) => (
              <div key={tile.label} className="rounded-lg bg-surface-container-low p-space-md flex flex-col items-center gap-space-xs">
                <Icon name={tile.icon} className="text-primary-container" />
                <span className="font-headline-sm text-headline-sm text-on-surface tabular-nums">{tile.value}</span>
                <span className="font-label-md text-label-md text-on-surface-variant">{tile.label}</span>
              </div>
            ))}
          </div>
          <Chip tone="teal" icon="workspace_premium">Protected Clinic</Chip>
        </Card>

        <Card title="WhatsApp message">
          <div className="rounded-xl bg-[#e7f6ee] p-space-md flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface">
            <span className="font-label-lg text-label-lg text-ok">To {clinic.doctor}</span>
            <p>Hello {clinic.doctor}, here is the September report for {clinic.name}.</p>
            <p>Health score: {clinic.score} ({report.delta}). 312 threats blocked, 1 scam message caught, backup ran 30/30 days, restore test passed.</p>
            <p>Your clinic is a Protected Clinic.</p>
          </div>
          <div className="mt-auto">
            <Button icon="send" onClick={() => toast(`Sent to ${clinic.doctor}`)}>Send on WhatsApp</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
