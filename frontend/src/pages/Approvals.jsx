import { Button, Card, Chip, Countdown, PageTitle, Table, Td } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { t } from '../i18n.js';
import { logFingerprint, partner } from '../data/demo.js';

export default function Approvals() {
  const { lang, pending, log, approve, deny } = useStore();

  return (
    <>
      <PageTitle>{t('approvals', lang)}</PageTitle>
      <div className="flex flex-col gap-space-lg">
        <Card title="Pending approval">
          {pending.length === 0 && <p className="font-body-sm text-body-sm text-on-surface-variant">No pending requests.</p>}
          {pending.map((req) => (
            <div key={req.id} className="flex items-center justify-between gap-space-md">
              <div className="flex flex-col gap-1">
                <span className="font-body-md text-body-md text-on-surface">
                  {partner.name} requests: {req.title} ({req.fixId})
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Expires in <Countdown expiresAt={req.expiresAt} />
                </span>
              </div>
              <div className="flex gap-space-sm">
                <Button variant="secondary" onClick={() => deny(req)}>Deny</Button>
                <Button onClick={() => approve(req)}>Approve</Button>
              </div>
            </div>
          ))}
        </Card>

        <Card
          title="Activity log"
          action={<Chip tone="teal" icon="lock">Log is tamper-evident</Chip>}
        >
          <Table
            head={[
              { label: 'Time', className: 'w-[18%]' },
              { label: 'Who', className: 'w-[16%]' },
              { label: 'Action', className: 'w-[34%]' },
              { label: 'Fix ID', className: 'w-[18%]' },
              { label: 'Result', className: 'w-[14%]' },
            ]}
          >
            {log.map((r, i) => (
              <tr key={`${r.time}-${r.fixId}-${i}`}>
                <Td className="text-on-surface-variant">{r.time}</Td>
                <Td>{r.who}</Td>
                <Td>{r.action}</Td>
                <Td className="tabular-nums text-on-surface-variant">{r.fixId}</Td>
                <Td>{r.result}</Td>
              </tr>
            ))}
          </Table>
          <span className="font-label-md text-label-md text-on-surface-variant">Daily log fingerprint: {logFingerprint}</span>
        </Card>
      </div>
    </>
  );
}
