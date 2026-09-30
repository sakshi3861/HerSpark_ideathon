import { useEffect, useRef, useState } from 'react';
import { Button, Card, Chip, Icon, PageTitle } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { LANGS, t } from '../i18n.js';
import { bankLine, scamSamples, verdictLabel } from '../data/demo.js';

const verdictTone = { scam: 'red', suspicious: 'amber', clear: 'green' };
const barTone = { scam: 'bg-bad', suspicious: 'bg-warn', clear: 'bg-ok' };

// Picks the canned result for whatever was entered.
function pickSample(text) {
  const exact = scamSamples.find((s) => s.text === text.trim());
  if (exact) return exact;
  const lower = text.toLowerCase();
  if (/(upi|rs\s?\d|payment|received)/.test(lower)) return scamSamples[0];
  if (/(http|www\.|lab|report)/.test(lower)) return scamSamples[1];
  return scamSamples[2];
}

function Result({ sample, lang }) {
  const [redacted, setRedacted] = useState(false);
  const [english, setEnglish] = useState(false);
  const shown = english ? 'en' : lang;
  const copy = sample[shown];

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between gap-space-md">
        <Chip tone={verdictTone[sample.verdict]}>{verdictLabel[sample.verdict][shown]}</Chip>
        {lang !== 'en' && (
          <label className="flex items-center gap-space-sm font-label-md text-label-md text-on-surface-variant cursor-pointer">
            <input type="checkbox" checked={english} onChange={() => setEnglish((v) => !v)} className="accent-primary-container" />
            {t('showEnglish', lang)}
          </label>
        )}
      </div>

      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
          <span>Confidence</span>
          <span className="tabular-nums">{sample.confidence}%</span>
        </div>
        <div className="h-2 rounded-full bg-surface-container overflow-hidden">
          <div className={`h-full rounded-full ${barTone[sample.verdict]}`} style={{ width: `${sample.confidence}%` }} />
        </div>
        <Chip tone="outline" icon="lock">{sample.source === 'device' ? 'Answered on your device' : 'Second check used'}</Chip>
      </div>

      {copy.reasons.length > 0 && (
        <div className="flex flex-col gap-space-sm">
          <h3 className="font-label-lg text-label-lg text-on-surface">{t('reasons', shown)}</h3>
          <ul className="flex flex-col gap-space-xs">
            {copy.reasons.map((r) => (
              <li key={r} className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface">
                <Icon name="warning" className="text-[18px] text-warn" />{r}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-space-xs">
        <h3 className="font-label-lg text-label-lg text-on-surface">{t('todo', shown)}</h3>
        <p className="font-body-sm text-body-sm text-on-surface">{copy.todo}</p>
        {sample.payment && <p className="font-body-sm text-body-sm font-semibold text-on-surface">{bankLine[shown]}</p>}
      </div>

      <div className="flex flex-col gap-space-sm mt-auto">
        <label className="flex items-center gap-space-sm font-label-md text-label-md text-on-surface-variant cursor-pointer">
          <input type="checkbox" checked={redacted} onChange={() => setRedacted((v) => !v)} className="accent-primary-container" />
          Redacted view
        </label>
        {redacted && (
          <p className="rounded-lg bg-surface-container-low p-space-md font-body-sm text-body-sm text-on-surface-variant">{sample.redacted}</p>
        )}
      </div>
    </Card>
  );
}

export default function ScamCheck() {
  const { lang, setLang, toast } = useStore();
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [state, setState] = useState({ phase: 'idle' });
  const fileRef = useRef();
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const check = () => {
    setState({ phase: 'loading' });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setState({ phase: 'done', sample: text.trim() ? pickSample(text) : scamSamples[0] });
    }, 1000);
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    toast(`Added ${f.name}`);
  };

  return (
    <>
      <PageTitle>{t('scam', lang)}</PageTitle>
      <div className="grid grid-cols-2 gap-space-lg items-stretch">
        <Card>
          <div className="flex flex-wrap gap-space-sm">
            {scamSamples.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => { setText(s.text); setState({ phase: 'idle' }); }}
                className="h-8 px-space-md rounded-full border border-outline-variant font-label-md text-label-md text-on-surface-variant hover:border-primary-container hover:text-primary transition-colors"
              >
                {s.chip}
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
            placeholder="Paste text or a link"
            className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest p-space-md font-body-sm text-body-sm text-on-surface resize-none focus:outline-none focus:border-primary-container"
          />
          <input ref={fileRef} type="file" accept="image/*,audio/*" className="hidden" onChange={onFile} />
          <div className="flex items-center justify-between gap-space-md">
            <Button variant="secondary" icon="upload_file" onClick={() => fileRef.current.click()}>
              Upload screenshot or voice note
            </Button>
            <select
              aria-label="Answer language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="h-10 rounded-lg border border-outline-variant bg-surface-container-lowest px-space-md font-label-lg text-label-lg text-on-surface"
            >
              {LANGS.map((l) => (
                <option key={l.id} value={l.id}>{{ en: 'English', hi: 'हिंदी', mr: 'मराठी' }[l.id]}</option>
              ))}
            </select>
          </div>
          {fileName && <span className="font-label-md text-label-md text-on-surface-variant truncate">{fileName}</span>}
          <Button disabled={!text.trim() && !fileName} onClick={check} className="w-full">Check</Button>
          <span className="font-label-md text-label-md text-on-surface-variant">Personal details are hidden before checking</span>
        </Card>

        {state.phase === 'done' ? (
          <Result key={state.sample.id} sample={state.sample} lang={lang} />
        ) : (
          <Card className="items-center justify-center text-on-surface-variant">
            {state.phase === 'loading' && <span className="font-label-lg text-label-lg">Checking...</span>}
          </Card>
        )}
      </div>
    </>
  );
}
