// The demo apps that have SurakshaShield inside, and the partner app that asks each one for data.
// Everything the dashboards show comes from here, so both apps behave the same way.

const latestOf = log => type => log.find(e => e.type === type)?.values ?? [];

const cycleRequests = [
  { key: 'cycleData', label: 'Menstrual-cycle data', icon: 'calendar_month', sense: 'Reproductive health', needed: true, risk: 'High',
    reason: 'Needed to time the wellness plan and suggest appointment dates.' },
  { key: 'symptoms', label: 'Symptoms log', icon: 'pulse_alert', sense: 'Reproductive health', needed: true, risk: 'High',
    reason: 'Needed so the doctor can see what you have been experiencing.' },
  { key: 'location', label: 'Precise location', icon: 'location_on', sense: 'Precise location', needed: true, risk: 'High', canMask: true, maskLabel: 'City only',
    reason: 'Needed to find nearby clinics, but your city is enough. Exact coordinates can reveal your home.' },
  { key: 'pregnancy', label: 'Pregnancy status', icon: 'pregnant_woman', sense: 'Reproductive health', needed: false, risk: 'Very high',
    reason: 'Nothing in this request uses it. Safe to ignore.' },
  { key: 'mood', label: 'Mood & energy', icon: 'mood', sense: 'Health', needed: false, risk: 'Medium',
    reason: 'Not used for a wellness plan or an appointment. Safe to ignore.' },
  { key: 'deviceInfo', label: 'Device information', icon: 'smartphone', sense: 'Device', needed: false, risk: 'Low',
    reason: 'Not required. Often used for ad profiling.' },
];

const moneyRequests = [
  { key: 'balance', label: 'Account balance', icon: 'account_balance', sense: 'Financial', needed: true, risk: 'High', canMask: true, maskLabel: 'Range only',
    reason: 'Needed to set a credit limit, but a range is enough. The exact balance shows how much you can spend.' },
  { key: 'upi', label: 'UPI ID', icon: 'qr_code_2', sense: 'Payment identity', needed: true, risk: 'Medium',
    reason: 'Needed to collect payment for your orders.' },
  { key: 'income', label: 'Monthly income', icon: 'payments', sense: 'Financial', needed: true, risk: 'High',
    reason: 'Needed to work out how much meal credit you can get.' },
  { key: 'transactions', label: 'Transaction history', icon: 'receipt_long', sense: 'Financial', needed: false, risk: 'Very high',
    reason: 'Nothing in this request uses it. It shows where you shop and travel. Safe to ignore.' },
  { key: 'card', label: 'Card number', icon: 'credit_card', sense: 'Payment identity', needed: false, risk: 'Very high',
    reason: 'Not needed, because payments go through UPI. Safe to ignore.' },
  { key: 'pan', label: 'PAN number', icon: 'badge', sense: 'Government ID', needed: false, risk: 'Very high',
    reason: 'Not needed for meal credit. Safe to ignore.' },
];

export const APPS = {
  cyclesafe: {
    id: 'cyclesafe', name: 'CycleSafe', title: 'CycleSafe Homescreen', color: '#a53860', on: '#ffffff', accent: '#a53860', soft: '#f6dde4', vaultName: 'Own Health Vault', bg: '#fbf1f4', ink: '#3a1420', icon: 'favorite',
    decoy: 'calendar', route: '/cyclesafe/home', badgeRoute: '/badge/cyclesafe',
    logKey: 'cyclesafe-log', vaultKey: 'ss-vault', badgeKey: 'ss-badge',
    build: '3.2.0 (7c41e9)', tested: '2026-09-27', passBuild: '3.2.1 (b83f02)',
    welcome: 'Welcome to CycleSafe',
    intro: 'Track your cycle, symptoms and mood. Your health data stays on your device, and only the categories you allow can leave it.',
    ring: { top: 'Sample day', mid: '14', bot: 'of 28', dash: 257 },
    logTypes: {
      period: { label: 'Log Period', icon: 'water_drop', title: 'How is your flow?', options: ['Spotting', 'Light', 'Medium', 'Heavy'], single: true },
      symptoms: { label: 'Symptoms', icon: 'pulse_alert', title: 'Any symptoms today?', options: ['Cramps', 'Headache', 'Bloating', 'Fatigue', 'Back pain', 'Nausea'] },
      mood: { label: 'Mood & Energy', icon: 'mood', title: 'How are you feeling?', options: ['Happy', 'Calm', 'Energetic', 'Anxious', 'Irritable', 'Low'] },
    },
    facts: [['Version', '3.2.0'], ['Category', 'Period & fertility tracker'], ['Data storage', 'Encrypted on device'], ['Data shared with', 'Only companies you approve']],
    ad: {
      full: { event: 'app_open', cycle_day: 14, phase: 'Luteal', device_id: '8f3a91bb-4e20-41' },
      event: 'send_cycle_and_device_id', what: 'your cycle date and your phone’s ID', blocked: 'Cycle date and device ID never left the phone',
    },
    requests: cycleRequests,
    maskPill: 'City only',
    dataOf: log => {
      const latest = latestOf(log);
      return {
        cycleData: { cycle_day: 14, cycle_length: 28, phase: 'Luteal', last_flow: latest('period')[0] ?? 'not logged' },
        symptoms: latest('symptoms'),
        location: { lat: 19.076, lon: 72.877, city: 'Mumbai' },
        pregnancy: { status: 'trying_to_conceive' },
        mood: latest('mood'),
        deviceInfo: { os: 'iOS 17.1', model: 'iPhone 14 Pro' },
      };
    },
    maskOf: { location: all => ({ city: all.location.city }) },
    partner: {
      name: 'HealthPlus', sdk: { color: '#005f73', tint: '#eef7f9', ink: '#0b2a30', off: '#c5d6da' }, color: '#005f73', on: '#ffffff', accent: '#005f73', bg: '#eef7f9', ink: '#0b2a30', icon: 'health_and_safety', route: '/healthapp',
      storeKey: 'aarogya-shared', pendingKey: 'ss-pending',
      purpose: 'Build a personalised wellness plan and book a gynaecology appointment.',
      sharingPurpose: 'build a wellness plan and book a gynaecology appointment.',
      intro: 'Your all-in-one health companion. Connect your other health apps to get a plan that fits you.',
      connectTitle: 'Connect CycleSafe', connectText: 'Share cycle information to personalise your plan.',
      askText: 'asks for your cycle information',
      tiles: shared => [
        ['Wellness plan', shared?.received && Object.keys(shared.received).length ? 'Ready to build' : 'Not started', 'spa'],
        ['Next appointment', 'None booked', 'event'],
        ['Connected apps', shared ? '1 (CycleSafe)' : 'None', 'link'],
      ],
    },
  },

  finsafe: {
    id: 'finsafe', name: 'FinSafe', title: 'FinSafe Homescreen', color: '#f48c06', on: '#2b1600', accent: '#a85a00', soft: '#fde0b8', vaultName: 'Own Money Vault', bg: '#fff4e5', ink: '#2b1600', icon: 'account_balance_wallet',
    decoy: 'calculator', route: '/finsafe/home', badgeRoute: '/badge/finsafe',
    logKey: 'finsafe-log', vaultKey: 'ss-vault-finsafe', badgeKey: 'ss-badge-finsafe',
    build: '2.8.0 (c5d91a)', tested: '2026-09-25', passBuild: '2.8.1 (4e7b20)',
    welcome: 'Welcome to FinSafe',
    intro: 'Track your spending, income and savings goals. Your money data stays on your device, and only the categories you allow can leave it.',
    ring: { top: 'Sample goal', mid: '62%', bot: 'saved', dash: 319 },
    logTypes: {
      expense: { label: 'Add Expense', icon: 'shopping_cart', title: 'What did you spend on?', options: ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Rent'] },
      income: { label: 'Add Income', icon: 'trending_up', title: 'Where did money come from?', options: ['Salary', 'Freelance', 'Gift', 'Refund'], single: true },
      goal: { label: 'Savings Goal', icon: 'savings', title: 'What are you saving for?', options: ['Emergency fund', 'Trip', 'Gadget', 'Education', 'Home'] },
    },
    facts: [['Version', '2.8.0'], ['Category', 'Personal finance & UPI'], ['Data storage', 'Encrypted on device'], ['Data shared with', 'Only companies you approve']],
    ad: {
      full: { event: 'app_open', account_balance: 48250, upi_id: 'priya@okbank', device_id: '8f3a91bb-4e20-41' },
      event: 'send_balance_and_device_id', what: 'your account balance and your phone’s ID', blocked: 'Balance and device ID never left the phone',
    },
    requests: moneyRequests,
    maskPill: 'Range only',
    dataOf: log => {
      const latest = latestOf(log);
      return {
        balance: { amount: 48250, currency: 'INR' },
        upi: { id: 'priya@okbank' },
        income: { monthly: 62000, source: latest('income')[0] ?? 'Salary' },
        transactions: latest('expense'),
        card: { number: '4111 1111 1111 1111', network: 'Visa' },
        pan: { number: 'ABCDE1234F' },
      };
    },
    maskOf: { balance: () => ({ range: '₹25,000 to ₹50,000' }) },
    partner: {
      name: 'QuickBite', sdk: { color: '#9d0208', tint: '#fbe8e9', ink: '#3b0d10', off: '#e6cdcf' }, color: '#ad2831', on: '#ffffff', accent: '#ad2831', bg: '#fdf1f1', ink: '#3b0d10', icon: 'lunch_dining', route: '/foodapp',
      storeKey: 'quickbite-shared', pendingKey: 'ss-pending-finsafe',
      purpose: 'Offer pay-later meal credit and collect payment for your orders.',
      sharingPurpose: 'offer pay-later meal credit and collect payment for your orders.',
      intro: 'Food from your favourite places, delivered fast. Connect your money app to unlock pay-later meal credit.',
      connectTitle: 'Connect FinSafe', connectText: 'Share a few money details to unlock meal credit.',
      askText: 'asks for your money details',
      tiles: shared => [
        ['Meal credit', shared?.received && Object.keys(shared.received).length ? 'Ready to set up' : 'Not started', 'payments'],
        ['Next order', 'None placed', 'shopping_bag'],
        ['Connected apps', shared ? '1 (FinSafe)' : 'None', 'link'],
      ],
    },
  },
};
