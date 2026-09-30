import { Link, Navigate, useParams } from 'react-router-dom';
import ScoreRing, { statusForScore } from '../components/ScoreRing.jsx';
import { Button, Card, Chip, Countdown, Icon, StatusChip } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { t } from '../i18n.js';
import { fixTasks } from '../data/demo.js';

const BASE_SCORE = 44; // 48 with the one pre-done fix
const POINTS_PER_FIX = 4;

function TaskAction({ task, fix }) {
  const { requestFix, runFix } = useStore();
  switch (fix.status) {
    case 'waiting':
      return <Button variant="secondary" small disabled>Waiting for clinic approval</Button>;
    case 'approved':
      return (
        <div className="flex items-center gap-space-md">
          <span className="font-label-md text-label-md text-ok">Approved, <Countdown expiresAt={fix.expiresAt} /> left</span>
          <Button small onClick={() => runFix(task)}>Run fix</Button>
        </div>
      );
    case 'done':
      return (
        <div className="flex items-center gap-space-sm">
          <span className="font-label-md text-label-md text-on-surface-variant">Signed fix, logged</span>
          <Chip tone="green" icon="check">Done</Chip>
        </div>
      );
    default:
      return <Button variant="secondary" small onClick={() => requestFix(task)}>Request approval</Button>;
  }
}

export default function ClinicDetail() {
  const { id } = useParams();
  const { lang, clinics, fixes } = useStore();
  const clinic = clinics.find((c) => c.id === id && c.status !== 'awaiting');
  if (!clinic) return <Navigate to="/partner" replace />;

  const isFixTarget = id === 'shree-dental';
  const doneCount = fixTasks.filter((f) => fixes[f.id]?.status === 'done').length;
  const score = isFixTarget ? BASE_SCORE + POINTS_PER_FIX * doneCount : clinic.score;
  const status = isFixTarget ? statusForScore(score) : clinic.status;

  return (
    <>
      <nav className="flex items-center gap-space-sm font-label-lg text-label-lg text-on-surface-variant mb-space-md">
        <Link to="/partner" className="hover:text-primary">{t('clinics', lang)}</Link>
        <Icon name="chevron_right" className="text-[18px]" />
        <span className="text-on-surface">{clinic.name}</span>
      </nav>

      <div className="flex items-center gap-space-lg mb-space-lg">
        <ScoreRing score={score} status={status} />
        <div className="flex flex-col gap-space-sm">
          <h1 className="font-headline-md text-headline-md text-on-surface">{clinic.name}</h1>
          <StatusChip status={status} />
        </div>
      </div>

      {isFixTarget ? (
        <>
          <Card
            title="Fix tasks"
            action={<span className="font-label-lg text-label-lg text-on-surface-variant">{doneCount} of {fixTasks.length} fixed</span>}
          >
            <ul className="divide-y divide-outline-variant/30">
              {fixTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between gap-space-md py-space-md first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-body-md text-body-md text-on-surface">{task.title}</span>
                    <span className="font-label-md text-label-md text-on-surface-variant">{task.id} · ~10 min</span>
                  </div>
                  <TaskAction task={task} fix={fixes[task.id] ?? { status: 'idle' }} />
                </li>
              ))}
            </ul>
          </Card>
          <p className="mt-space-md font-label-md text-label-md text-on-surface-variant">
            Fixes run only as signed, approved scripts. No remote access.
          </p>
        </>
      ) : (
        <Card title="Fix tasks">
          <p className="font-body-sm text-body-sm text-on-surface-variant">No urgent fixes.</p>
        </Card>
      )}
    </>
  );
}
