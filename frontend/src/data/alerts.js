// Recent alerts shown on the Live Monitor. Shared with the details page.
export const baseAlerts = [
  { icon: 'warning', tone: 'bg-error-container text-error', title: 'Big data grab stopped', body: 'An app tried to copy 48 period entries in one go. We stopped it.', ageMin: 6 },
  { icon: 'radar', tone: 'bg-surface-container-highest text-on-surface', title: 'Unknown website blocked', body: 'An app tried to send data to a website we do not know. We blocked it.', ageMin: 14 },
  { icon: 'location_on', tone: 'bg-primary-fixed text-primary', title: 'Location blurred', body: 'An ad company asked for your exact location. We shared only the city.', ageMin: 27 },
  { icon: 'smartphone', tone: 'bg-secondary-container/40 text-secondary', title: 'Phone ID kept hidden', body: 'A tracker asked for your phone’s ID. We did not let it through.', ageMin: 41 },
  { icon: 'visibility', tone: 'bg-error-container text-error', title: 'Possible spy app', body: 'Another app may be watching your screen. Open the Security tab in your app to check.', ageMin: 55 },
];
