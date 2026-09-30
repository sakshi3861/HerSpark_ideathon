import { useState } from 'react';
import Modal from '../components/Modal.jsx';
import ScoreRing from '../components/ScoreRing.jsx';
import { Button, Card, Chip, PageTitle, StatusChip, Table, Td } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { t } from '../i18n.js';
import { clinic, findings, partner, whatsappSteps } from '../data/demo.js';

function WhatsAppModal({ onDone, onClose }) {
  const [checked, setChecked] = useState(() => whatsappSteps.map(() => false));
  const all = checked.every(Boolean);
  return (
    <Modal title="Check Linked Devices on your phone" onClose={onClose}>
      <ul className="flex flex-col gap-space-md">
        {whatsappSteps.map((s, i) => (
          <li key={s}>
            <label className="flex items-center gap-space-md font-body-md text-body-md text-on-surface cursor-pointer">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                className="w-5 h-5 accent-primary-container"
              />
              {i + 1}. {s}
            </label>
          </li>
        ))}
      </ul>
      <div className="flex justify-end gap-space-sm">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button disabled={!all} onClick={onDone}>Finish</Button>
      </div>
    </Modal>
  );
}

export default function Health() {
  const { lang, toast, waAttested: attested, setWaAttested: setAttested } = useStore();
  const [checking, setChecking] = useState(false);

  return (
    <>
      <PageTitle>{t('health', lang)}</PageTitle>
      <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-space-lg items-stretch mb-space-lg">
        <Card className="items-center justify-center xl:min-w-[240px]">
          <ScoreRing score={clinic.score} status="amber" />
          <StatusChip status="amber" />
        </Card>
        <Card title="Findings" action={<Chip tone="outline" icon="verified">Signed scan result</Chip>}>
          <Table
            head={[
              { label: 'Check', className: 'w-[46%]' },
              { label: 'Code', className: 'w-[16%]' },
              { label: 'Status', className: 'w-[38%]' },
            ]}
          >
            {findings.map((f) => {
              const isWa = f.key === 'wa';
              const status = isWa && attested ? 'green' : f.status;
              return (
                <tr key={f.key}>
                  <Td>{f.name}</Td>
                  <Td className="text-on-surface-variant tabular-nums">{f.code}</Td>
                  <Td>
                    <div className="flex flex-wrap items-center gap-space-sm">
                      <StatusChip status={status} />
                      {isWa && <Chip tone="outline">{attested ? 'Self-attested' : f.tag}</Chip>}
                      {isWa && !attested && (
                        <Button variant="ghost" small onClick={() => setChecking(true)}>Check</Button>
                      )}
                    </div>
                  </Td>
                </tr>
              );
            })}
          </Table>
        </Card>
      </div>

      <div className="flex items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs font-label-md text-label-md text-on-surface-variant">
          <span>Scan took under 2 minutes</span>
          <span>Only scores and finding codes leave this PC.</span>
        </div>
        <Button icon="support_agent" onClick={() => toast(`Request sent to ${partner.name}`)}>Fix with my Cyber Sakhi</Button>
      </div>

      {checking && (
        <WhatsAppModal
          onClose={() => setChecking(false)}
          onDone={() => { setAttested(true); setChecking(false); }}
        />
      )}
    </>
  );
}
