import { useStore } from '../store.jsx';
import { Icon } from './ui.jsx';

export default function Toast() {
  const { toastMsg } = useStore();
  if (!toastMsg) return null;
  return (
    <div
      role="status"
      className="fixed bottom-space-lg left-1/2 -translate-x-1/2 z-[60] flex items-center gap-space-sm rounded-lg bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm shadow-lg font-label-lg text-label-lg"
    >
      <Icon name="check_circle" className="text-primary-fixed-dim" />
      {toastMsg}
    </div>
  );
}
