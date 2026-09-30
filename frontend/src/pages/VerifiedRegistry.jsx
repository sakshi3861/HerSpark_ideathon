import React, { useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Skeleton from '../components/Skeleton';
import useLoading from '../hooks/useLoading';
import useTitle from '../hooks/useTitle';
import { useBadge } from '../state/badge';

const badge = {
  trusted: ['verified', 'Trusted', 'bg-secondary-container/40 border-secondary/30 text-secondary'],
  untrusted: ['warning', 'Not trusted', 'bg-error-container border-error/30 text-error'],
};

// Every app has its own five checks, written for what that app does. [check] passes; [check, problem]
// fails, and the problem is shown in plain words instead of the check.
const rawApps = [
  { name: 'CycleSafe', checked: '1 day ago', summary: 'Nothing private leaves the app without your say-so.', checks: [
    ['Your period dates are stored only on your phone'],
    ['Nothing you log can be seen by advertising companies'],
    ['Other apps get your data only after you approve each request'],
    ['You can see a list of every company that has received your data'],
    ['Passed its most recent check with no problems'],
  ] },
  { name: 'FinSafe', checked: '2 days ago', summary: 'Your balance and payment details stay on your phone.', checks: [
    ['Your balance and transactions are stored only on your phone'],
    ['Advertising companies never see your spending'],
    ['Other apps get money details only after you approve each one'],
    ['Card and PAN numbers are never sent out'],
    ['Passed its most recent check with no problems'],
  ] },
  { name: 'MatruCare', checked: '2 days ago', summary: 'Pregnancy records stay private to you and your doctor.', checks: [
    ['Scan reports and test results are locked with a key only you hold'],
    ['Your doctor sees only what you choose to show them'],
    ['Family members cannot open your pregnancy details'],
    ['Your pregnancy is never used to show baby-product ads'],
    ['Delivery-date reminders do not name your condition'],
  ] },
  { name: 'PeriodPal', checked: '5 days ago', summary: 'Very good, with one small thing to fix.', checks: [
    ['Your period predictions are worked out on your phone'],
    ['Lock-screen reminders do not reveal what they are about'],
    ['Only your city is used for weather and mood tips', 'Uses a more exact location than it needs for daily tips'],
    ['Deleting your account removes all your logs'],
    ['Health articles are shown without tracking what you read'],
  ] },
  { name: 'HerHealth Diary', checked: '6 weeks ago', summary: 'A good record, but its latest update has not been checked.', checks: [
    ['Symptom notes stay in a locked diary on your phone'],
    ['Cloud backups can only be opened by you'],
    ['Photos of your symptoms are not shared with anyone'],
    ['You can export your diary and take it to any doctor'],
    ['Was re-checked after its last big update', 'The last big update has not been re-checked yet'],
  ] },
  { name: 'SafeWalk SOS', checked: '3 days ago', summary: 'Good in an emergency, but it shares more than it needs to.', checks: [
    ['Your location is shared only after you press the SOS button', 'Shares your live location with an outside company before you press SOS'],
    ['Alerts go only to the trusted contacts you picked'],
    ['Trip history is wiped once you reach home'],
    ['Works without uploading your phone contact list'],
    ['Panic alerts still go out when you have no internet'],
  ] },
  { name: 'OvuGuide', checked: '1 week ago', summary: 'Some of your data still goes to advertisers.', checks: [
    ['Ovulation dates are kept away from ad companies'],
    ["Your phone's advertising ID is not collected", "Your phone's advertising ID is sent to an ad company"],
    ['Test-strip photos are deleted after they are read'],
    ['Fertility tips are not based on what you search elsewhere'],
    ['Problems found in the last check have been fixed', 'Problems found in the last check are still not fixed'],
  ] },
  { name: 'HeartMatch Dating', checked: '9 days ago', summary: 'Your profile is shared more widely than you would expect.', checks: [
    ['Only people you match with can see your profile', 'People you have not matched with can see your profile'],
    ['Photo and ID checks are stored safely'],
    ['Your age and interests are kept out of advertising', 'Shares your age and interests with advertisers'],
    ['Other users cannot tell which area you live in'],
    ['People you block can never see you again'],
  ] },
  { name: 'MoonCalendar', checked: '2 weeks ago', summary: 'Your location and cycle dates are passed on to other companies.', checks: [
    ['Cycle dates are not shared with the company that measures its ads', 'Shares your cycle dates with an ad-measuring company'],
    ['Tracking starts only after you tap agree', 'Starts tracking you before you agree'],
    ['Your exact position is not sent to any outside company', 'Sends your exact location to a tracking company'],
    ['Sign-in is protected with a code sent to your phone'],
    ['You can turn off usage tracking with one tap'],
  ] },
  { name: 'ShaadiSathi', checked: '3 weeks ago', summary: 'Your documents and details are not kept safe.', checks: [
    ['ID documents are kept in locked storage', 'Stores your ID documents where others could read them'],
    ['Your details reach only the families you choose', 'Shares your details with other companies without asking'],
    ['Your phone number stays hidden until you agree'],
    ['Other users cannot save or forward your photos'],
    ['Old profiles are taken down when people stop using the site', 'Profiles stay online long after people stop using the site'],
  ] },
  { name: 'GenericTracker', checked: '12 days ago', summary: 'Sends your private entries straight to advertisers.', checks: [
    ['Period and ovulation entries are not sent out', 'Sent your ovulation dates to 4 advertising companies'],
    ['Asks before it starts learning about you', 'Starts building a profile of you before you agree'],
    ['Your data is scrambled while it travels', 'Sends your data without locking it'],
    ['Your exact location stays private', 'Sends your exact location to advertisers'],
    ['Has a clear way to delete your account'],
  ] },
];

// Picks a symbol that shows what a check is about, from its wording. First match wins.
const iconRules = [
  [/balance and transactions|money details|card and PAN/i, 'account_balance_wallet'],
  [/internet/i, 'wifi_off'],
  [/sos|alert|panic/i, 'sos'],
  [/scan reports|test results/i, 'lock'],
  [/pregnan|delivery|baby/i, 'pregnant_woman'],
  [/period|cycle|ovulat|fertil/i, 'water_drop'],
  [/location|position|area|city/i, 'location_on'],
  [/advert|ads?|ad compan|ad-measuring/i, 'campaign'],
  [/photo|document|ID/i, 'photo_camera'],
  [/remind|notification/i, 'notifications'],
  [/symptom|diary|doctor|export/i, 'stethoscope'],
  [/contact|phone number|famil|users|match|block|profile can/i, 'group'],
  [/lock|key|scrambled|backup/i, 'lock'],
  [/delet|wiped|removes|taken down/i, 'delete'],
  [/track|learning|profile of/i, 'visibility'],
  [/approve|permission/i, 'how_to_reg'],
  [/sign-in|code/i, 'password'],
  [/check|problem|update|fixed/i, 'fact_check'],
  [/list|compan/i, 'list_alt'],
];
const iconFor = text => (iconRules.find(([re]) => re.test(text)) || [null, 'shield'])[1];

// An app is Trusted when at least three of its five checks pass.
// Apps are listed by audit date, most recent first (CycleSafe is the most recent).
// '6 weeks ago' -> 42. Used to order by audit date.
const daysAgo = text => { const [n, unit] = text.split(' '); return Number(n) * (unit.startsWith('week') ? 7 : 1); };

const apps = rawApps
  .map(a => {
    const checks = a.checks.map(([q, problem]) => ({ ok: !problem, text: problem || q, icon: iconFor(q) }));
    return { ...a, checks, state: checks.filter(c => c.ok).length >= 3 ? 'trusted' : 'untrusted' };
  })
  .sort((x, y) => daysAgo(x.checked) - daysAgo(y.checked) || x.name.localeCompare(y.name));

export default function VerifiedRegistry() {
  useTitle('Trusted Apps');
  const loading = useLoading(700);
  const [query, setQuery] = useState('');
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);
  const verifyApp = () => {
    if (checking) return;
    setChecking(true);
    window.setTimeout(() => setChecking(false), 700);
  };

  const cycleBadge = useBadge('cyclesafe');
  const finBadge = useBadge('finsafe');
  // A revoked badge shows up here at once.
  const revoked = { CycleSafe: cycleBadge.status === 'failed', FinSafe: finBadge.status === 'failed' };
  const list = useMemo(() => apps.map(a => (revoked[a.name]
    ? { ...a, state: 'untrusted', summary: 'Failed its latest independent test, and its badge was revoked.' }
    : a)), [revoked.CycleSafe, revoked.FinSafe]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? list.filter(a => a.name.toLowerCase().includes(q)) : list;
  }, [query, list]);

  return (
    <>
      <Header active="verified_registry" />
      <main className="w-full pt-20 bg-background text-on-surface min-h-screen">
        <div className="page page-stack">
          <section className="flex flex-col items-center text-center max-w-3xl mx-auto w-full">
            <h1 className="page-title">Trusted Apps</h1>
            <p className="page-sub">Each app is checked on the things it is meant to do with your data.</p>

            <div className="w-full mt-space-lg card-bordered p-space-sm focus-within:border-primary/40 transition-colors">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm">
                <div className="flex items-center gap-space-md pl-space-md flex-1">
                  <span className="material-symbols-outlined text-outline text-xl">search</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    className="w-full h-12 bg-transparent text-t-body text-on-surface placeholder:text-outline focus:outline-none"
                    id="registry-search-input"
                    placeholder="Search app name, e.g. CycleSafe"
                    type="text"
                    aria-label="Search apps"
                  />
                  {query && (
                    <button
                      aria-label="Clear search"
                      className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container px-space-xs py-space-xs rounded-lg transition-colors"
                      id="search-clear-btn"
                      type="button"
                      onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  )}
                </div>
                <button className="btn-primary" id="check-app-btn" type="button" onClick={verifyApp} disabled={checking}>
                  {checking ? (
                    <><span className="material-symbols-outlined text-lg animate-spin">refresh</span><span>Checking…</span></>
                  ) : (
                    <><span className="material-symbols-outlined text-lg">verified_user</span><span>Check app</span></>
                  )}
                </button>
              </div>
            </div>
            {!loading && <p className="text-t-caption text-on-surface-variant mt-space-md">{results.length} of {apps.length} apps</p>}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg items-stretch">
            {loading && Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="card-bordered flex flex-col gap-space-md">
                <div className="flex justify-between"><Skeleton className="h-7 w-40" /><Skeleton className="h-7 w-28 rounded-full" /></div>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className={`h-10 ${i % 2 ? 'w-3/4' : 'w-full'}`} />
              </div>
            ))}

            {!loading && results.map(app => {
              const [icon, label, tone] = badge[app.state];
              return (
                <article key={app.name} className="card-bordered card-hover flex flex-col gap-space-lg">
                  <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/30">
                    <div>
                      <h2 className="text-t-card text-on-surface">{app.name}</h2>
                      <p className="text-t-caption text-on-surface-variant">Last audited {app.checked}</p>
                      {(app.name === 'CycleSafe' || app.name === 'FinSafe') && <a href={`/badge/${app.name.toLowerCase()}`} target="_blank" rel="noopener" className="text-t-caption text-primary underline underline-offset-4">Check live</a>}
                    </div>
                    <div className={`inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full border ${tone}`}>
                      <span className="material-symbols-outlined text-base" aria-hidden="true">{icon}</span>
                      <span className="text-t-status uppercase">{label}</span>
                    </div>
                  </div>
                  <p className="text-t-body text-on-surface-variant">{app.summary}</p>
                  <div className="flex flex-col gap-space-sm">
                    {app.checks.map(c => (
                      <div key={c.text} className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md">
                        <span className="material-symbols-outlined text-lg shrink-0 text-[#002855]" aria-hidden="true">{c.icon}</span>
                        <span className="text-t-body text-on-surface flex-1">{c.text}</span>
                        <span className={`material-symbols-outlined text-lg shrink-0 ${c.ok ? 'text-secondary' : 'text-error'}`} role="img" aria-label={c.ok ? 'Passed' : 'Failed'}>{c.ok ? 'check_circle' : 'cancel'}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}

            {!loading && results.length === 0 && (
              <div className="lg:col-span-2 card-bordered flex flex-col items-center text-center gap-space-sm py-space-2xl">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-outline"><span className="material-symbols-outlined">search_off</span></div>
                <div className="text-t-card">No apps match &ldquo;{query}&rdquo;</div>
                <p className="text-t-body text-on-surface-variant">Check the spelling and try again.</p>
                <button type="button" className="btn-secondary mt-space-sm" onClick={() => setQuery('')}>Clear search</button>
              </div>
            )}
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
