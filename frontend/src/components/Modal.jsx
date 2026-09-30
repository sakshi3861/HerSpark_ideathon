import { useEffect } from 'react';
import { Icon } from './ui.jsx';

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 p-space-md" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-surface-container-lowest rounded-xl p-space-lg flex flex-col gap-space-md shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-title text-title text-on-surface">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
