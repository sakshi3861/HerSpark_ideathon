// UI strings for the EN | हिं | मरा toggle. Missing keys fall back to English.
export const LANGS = [
  { id: 'en', label: 'EN' },
  { id: 'hi', label: 'हिं' },
  { id: 'mr', label: 'मरा' },
];

const dict = {
  clinics: { en: 'Clinics', hi: 'क्लिनिक', mr: 'क्लिनिक' },
  earnings: { en: 'Earnings', hi: 'कमाई', mr: 'कमाई' },
  health: { en: 'Health Score', hi: 'हेल्थ स्कोर', mr: 'हेल्थ स्कोअर' },
  scam: { en: 'Scam Check', hi: 'स्कैम जाँच', mr: 'स्कॅम तपासणी' },
  backup: { en: 'Backup & Protection', hi: 'बैकअप और सुरक्षा', mr: 'बॅकअप आणि सुरक्षा' },
  approvals: { en: 'Approvals & Audit', hi: 'स्वीकृति और ऑडिट', mr: 'मंजुरी आणि ऑडिट' },
  report: { en: 'Report Card', hi: 'रिपोर्ट कार्ड', mr: 'रिपोर्ट कार्ड' },
  switchRole: { en: 'Switch role', hi: 'भूमिका बदलें', mr: 'भूमिका बदला' },
  tagline: {
    en: 'Security for every clinic, run by someone you trust.',
    hi: 'हर क्लिनिक के लिए सुरक्षा, आपके भरोसेमंद व्यक्ति द्वारा।',
    mr: 'प्रत्येक क्लिनिकसाठी सुरक्षा, तुमच्या विश्वासू व्यक्तीकडून.',
  },
  roleSakhi: { en: "I'm a Cyber Sakhi", hi: 'मैं साइबर सखी हूँ', mr: 'मी सायबर सखी आहे' },
  roleClinic: { en: 'I run a clinic', hi: 'मैं क्लिनिक चलाता/चलाती हूँ', mr: 'मी क्लिनिक चालवतो/चालवते' },
  showEnglish: { en: 'Show in English', hi: 'अंग्रेज़ी में दिखाएँ', mr: 'इंग्रजीत दाखवा' },
  reasons: { en: 'Why', hi: 'कारण', mr: 'कारणे' },
  todo: { en: 'What to do', hi: 'क्या करें', mr: 'काय करावे' },
};

export const t = (key, lang) => dict[key]?.[lang] ?? dict[key]?.en ?? key;
