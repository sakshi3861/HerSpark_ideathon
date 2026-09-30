const tone = { green: '#15803d', amber: '#b45309', red: '#b91c1c' };
const R = 52;
const C = 2 * Math.PI * R;

export default function ScoreRing({ score, status, size = 144 }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" width={size} height={size} className="-rotate-90">
        <circle cx="60" cy="60" r={R} fill="none" stroke="#e7eeff" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={R} fill="none" stroke={tone[status]} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - score / 100)} style={{ transition: 'stroke-dashoffset 0.6s' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-headline-lg text-headline-lg text-on-surface tabular-nums leading-none">{score}</span>
        <span className="font-label-md text-label-md text-on-surface-variant">/ 100</span>
      </div>
    </div>
  );
}

export const statusForScore = (s) => (s >= 80 ? 'green' : s >= 60 ? 'amber' : 'red');
