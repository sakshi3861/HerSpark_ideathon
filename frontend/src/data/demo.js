// Single source of truth for all hardcoded values.
export const clinic = { name: 'Sunrise Family Clinic', location: 'Pune', doctors: 2, score: 72, doctor: 'Dr. Mehta' };

export const partner = {
  name: 'Sneha Kulkarni',
  title: 'Certified Cyber Sakhi',
  cluster: 'Pune cluster',
  clinicCount: 30,
  phone: '+91 98XXX XXXXX',
};

export const PLANS = {
  basic: { label: 'Basic', price: 799, partnerCut: 240 },
  plus: { label: 'Plus', price: 1200, partnerCut: 360 },
};

// Red first.
export const clinics = [
  { id: 'shree-dental', name: 'Shree Dental Care', location: 'Pune', score: 48, status: 'red' },
  { id: 'lifeline', name: 'Lifeline Clinic', location: 'Pune', score: 63, status: 'amber' },
  { id: 'sunrise', name: 'Sunrise Family Clinic', location: 'Pune', score: 72, status: 'amber' },
  { id: 'apex', name: 'Apex Pathology Lab', location: 'Pune', score: 85, status: 'green' },
  { id: 'patil', name: 'Dr. Patil Diagnostics', location: 'Pune', score: 91, status: 'green' },
];

export const needsAttention = 8;

export const earnings = {
  thisMonth: 7200,
  perClinic: 240,
  months: [
    { m: 'Apr', v: 2400 },
    { m: 'May', v: 3360 },
    { m: 'Jun', v: 4320 },
    { m: 'Jul', v: 5280 },
    { m: 'Aug', v: 6240 },
    { m: 'Sep', v: 7200 },
  ],
  goal: { clinics: 40, monthly: 9600 },
};

export const fixTasks = [
  { id: 'FIX-PWD-01', title: 'Change shared reception PC password' },
  { id: 'FIX-UPD-02', title: 'Turn on Windows updates' },
  { id: 'FIX-BKP-03', title: 'Enable automatic backup' },
  { id: 'FIX-WA-04', title: 'Log out WhatsApp Web on shared PC' },
];

export const findings = [
  { key: 'pwd', name: 'Passwords', code: 'PWD-101', status: 'amber' },
  { key: 'upd', name: 'Updates', code: 'UPD-200', status: 'green' },
  { key: 'bkp', name: 'Backups', code: 'BKP-300', status: 'red' },
  { key: 'enc', name: 'Legacy encryption found: SMBv1 and 3DES on billing PC', code: 'ENC-410', status: 'amber' },
  { key: 'eml', name: 'Email', code: 'EML-120', status: 'green' },
  { key: 'wa', name: 'WhatsApp Web', code: 'WA-150', status: 'amber', tag: 'Self-check' },
];

export const whatsappSteps = [
  'Open WhatsApp on your phone.',
  'Tap the three dots, then Linked Devices.',
  'Look at every device in the list.',
  'Tap any device you do not recognise.',
  'Tap Log out for each unknown device.',
];

export const restorePoints = [
  { date: 'Today, 2:10 AM', size: '4.2 GB' },
  { date: 'Yesterday, 2:08 AM', size: '4.2 GB' },
  { date: '28 Sep, 2:11 AM', size: '4.1 GB' },
];

export const initialPending = {
  id: 'p-sunrise-bkp',
  title: 'Enable automatic backup',
  fixId: 'FIX-BKP-03',
};

export const auditLog = [
  { time: 'Today, 09:42', who: 'Sneha Kulkarni', action: 'Windows updates enabled', fixId: 'FIX-UPD-02', result: 'Done' },
  { time: 'Yesterday, 16:05', who: 'Sneha Kulkarni', action: 'Reception PC password changed', fixId: 'FIX-PWD-01', result: 'Done' },
  { time: 'Yesterday, 15:58', who: 'Dr. Mehta', action: 'Approved password change', fixId: 'FIX-PWD-01', result: 'Approved' },
  { time: '27 Sep, 11:20', who: 'Sneha Kulkarni', action: 'WhatsApp Web logged out on shared PC', fixId: 'FIX-WA-04', result: 'Done' },
  { time: '27 Sep, 11:12', who: 'Dr. Mehta', action: 'Approved WhatsApp Web logout', fixId: 'FIX-WA-04', result: 'Approved' },
  { time: '25 Sep, 10:30', who: 'Sneha Kulkarni', action: 'Setup scan reviewed', fixId: 'FIX-SCN-00', result: 'Done' },
];

export const logFingerprint = '9f3a...c21b';

export const report = {
  title: 'Sunrise Family Clinic - September report',
  delta: '+6 from last month',
  tiles: [
    { icon: 'shield', value: '312', label: 'threats blocked' },
    { icon: 'gpp_maybe', value: '1', label: 'scam message caught' },
    { icon: 'cloud_done', value: '30/30', label: 'days backup ran' },
    { icon: 'restore', value: 'Passed', label: 'restore test' },
  ],
};

// Scam samples with English/Hindi/Marathi result text.
export const scamSamples = [
  {
    id: 'payment',
    chip: 'Payment screenshot scam',
    text: 'Payment of Rs 4,500 received from +91 98765 43210. Confirm here to release the amount: http://upi-claim.in/pay?id=8821. Reply within 10 minutes or it will be reversed. UPI: reception@okbank',
    redacted: 'Payment of Rs 4,500 received from <PHONE_1>. Confirm here to release the amount: <LINK_1>. Reply within 10 minutes or it will be reversed. UPI: <UPI_1>',
    verdict: 'scam', confidence: 94, source: 'device', payment: true,
    en: { reasons: ['Fake payment link', 'Urgency pressure', 'Sender not in your contacts'], todo: 'Do not click the link. Delete the message.' },
    hi: { reasons: ['नकली भुगतान लिंक', 'जल्दबाज़ी का दबाव', 'भेजने वाला आपके संपर्कों में नहीं'], todo: 'लिंक पर क्लिक न करें। संदेश हटा दें।' },
    mr: { reasons: ['बनावट पेमेंट लिंक', 'घाई करण्याचा दबाव', 'पाठवणारा तुमच्या संपर्कांत नाही'], todo: 'लिंकवर क्लिक करू नका. संदेश हटवा.' },
  },
  {
    id: 'lab',
    chip: 'Fake lab message',
    text: 'Dear doctor, your lab report bundle is ready. Download now: http://labs-reports.co/dl. Login with your clinic email to view. From: Apex Labs Team',
    redacted: 'Dear doctor, your lab report bundle is ready. Download now: <LINK_1>. Login with your clinic email to view. From: Apex Labs Team',
    verdict: 'suspicious', confidence: 58, source: 'second', payment: false,
    en: { reasons: ['Link does not match the lab you use', 'Asks you to log in through a link'], todo: 'Call the lab on the number you already have before opening it.' },
    hi: { reasons: ['लिंक आपकी लैब से मेल नहीं खाता', 'लिंक से लॉग इन करने को कहा गया'], todo: 'खोलने से पहले अपने पास मौजूद नंबर पर लैब को फ़ोन करें।' },
    mr: { reasons: ['लिंक तुमच्या लॅबशी जुळत नाही', 'लिंकद्वारे लॉग इन करायला सांगितले'], todo: 'उघडण्यापूर्वी तुमच्याकडील नंबरवर लॅबला फोन करा.' },
  },
  {
    id: 'normal',
    chip: 'Normal message',
    text: 'Hi, this is Ravi from the pharmacy. Your order will be delivered tomorrow at 11 AM. Please keep the clinic door open.',
    redacted: 'Hi, this is <NAME_1> from the pharmacy. Your order will be delivered tomorrow at 11 AM. Please keep the clinic door open.',
    verdict: 'clear', confidence: 88, source: 'device', payment: false,
    en: { reasons: [], todo: 'Nothing unusual here. Still be careful with links and payment requests.' },
    hi: { reasons: [], todo: 'कुछ असामान्य नहीं मिला। फिर भी लिंक और भुगतान अनुरोधों से सावधान रहें।' },
    mr: { reasons: [], todo: 'काहीही असामान्य आढळले नाही. तरीही लिंक आणि पेमेंट विनंत्यांबाबत सावध रहा.' },
  },
];

export const bankLine = {
  en: 'Confirm the money in your bank app or SMS.',
  hi: 'पैसे बैंक ऐप या SMS में जाँचें।',
  mr: 'पैसे बँक अ‍ॅप किंवा SMS मध्ये तपासा.',
};

export const verdictLabel = {
  scam: { en: 'Likely scam', hi: 'संभावित धोखाधड़ी', mr: 'संभाव्य फसवणूक' },
  suspicious: { en: 'Suspicious, verify', hi: 'संदिग्ध, जाँचें', mr: 'संशयास्पद, तपासा' },
  clear: { en: 'No known red flags found', hi: 'कोई ज्ञात चेतावनी नहीं मिली', mr: 'कोणतेही ज्ञात धोके आढळले नाहीत' },
};
