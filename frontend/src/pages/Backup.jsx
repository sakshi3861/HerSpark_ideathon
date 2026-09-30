import { useState } from 'react';
import { Button, Card, Chip, Icon, PageTitle } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { t } from '../i18n.js';
import { partner, restorePoints } from '../data/demo.js';

const Step = ({ n, children }) => (
  <li className="flex items-start gap-space-md font-body-sm text-body-sm text-on-surface">
    <span className="w-6 h-6 shrink-0 rounded-full bg-primary-fixed text-primary font-label-md text-label-md flex items-center justify-center">{n}</span>
    <span className="pt-0.5">{children}</span>
  </li>
);

export default function Backup() {
  const { lang, toast } = useStore();
  const [alert, setAlert] = useState(false);

  return (
    <>
      <PageTitle>{t('backup', lang)}</PageTitle>
      <div className="grid grid-cols-2 gap-space-lg items-stretch">
        <Card title="Encrypted backup">
          <div className="flex items-center gap-space-sm text-ok font-label-lg text-label-lg">
            <Icon name="check_circle" />Last backup: today, 2:10 AM
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">4.2 GB · Next backup tonight</span>
          <div className="flex flex-wrap gap-space-sm">
            <Chip tone="teal" icon="lock">Encrypted on this PC</Chip>
            <Chip tone="teal" icon="lock_clock">Locked for 30 days (cannot be deleted)</Chip>
            <Chip tone="teal" icon="key">Keys stay with your clinic</Chip>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-label-lg text-label-lg text-on-surface">Restore points</h3>
            <ul className="divide-y divide-outline-variant/30">
              {restorePoints.map((p) => (
                <li key={p.date} className="flex items-center justify-between py-space-sm">
                  <span className="font-body-sm text-body-sm text-on-surface">{p.date}</span>
                  <span className="flex items-center gap-space-md">
                    <span className="font-body-sm text-body-sm text-on-surface-variant tabular-nums">{p.size}</span>
                    <Button variant="secondary" small onClick={() => toast(`Restoring from ${p.date}`)}>Restore</Button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <span className="font-label-md text-label-md text-on-surface-variant mt-auto">Monthly restore test: passed (Sep 28)</span>
        </Card>

        <div className="grid grid-rows-[auto_1fr] gap-space-lg">
          <Card title="Recovery code">
            <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface">
              <Icon name="check_circle" className="text-ok" />24-word recovery code: printed and stored
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant">
              If you lose both your passphrase and this code, backups cannot be recovered.
            </p>
            <div>
              <Button variant="secondary" small icon="print" onClick={() => toast('Reprint sent to the printer')}>Reprint</Button>
            </div>
          </Card>

          <Card
            title="Ransomware watch"
            className={alert ? '!bg-bad-bg !border-bad/30' : ''}
            action={alert
              ? <button type="button" onClick={() => setAlert(false)} className="font-label-md text-label-md text-bad underline">Reset</button>
              : <Button variant="ghost" small onClick={() => setAlert(true)}>Simulate alert</Button>}
          >
            {alert ? (
              <>
                <div className="flex items-start gap-space-sm font-body-sm text-body-sm text-bad">
                  <Icon name="dangerous" />
                  <span>Suspicious file activity on Reception PC. Backup rotation paused.</span>
                </div>
                <div>
                  <Button variant="coral" small icon="call" onClick={() => toast(`Calling ${partner.name} ${partner.phone}`)}>Call Sneha</Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-ok">
                  <Icon name="check_circle" />Watching 3 decoy files and unusual file changes
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant">Last alert: none in 30 days</span>
              </>
            )}
          </Card>
        </div>

        <Card title="If something goes wrong" className="col-span-2">
          <ol className="grid grid-cols-3 gap-space-lg">
            <Step n={1}>Call: {partner.name} ({partner.phone})</Step>
            <Step n={2}>Lock: switch off internet, shut down the reception PC</Step>
            <Step n={3}>Tell: use the patient message template</Step>
          </ol>
          <div>
            <Button variant="secondary" icon="download" onClick={() => toast('Playbook downloaded (PDF)')}>Download playbook (PDF)</Button>
          </div>
        </Card>
      </div>
      <p className="mt-space-md font-label-md text-label-md text-on-surface-variant">
        Protection: AES-256 encryption, post-quantum-ready key exchange.
      </p>
    </>
  );
}
