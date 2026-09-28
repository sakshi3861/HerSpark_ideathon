import React from 'react';

export default function Toggle({ enabled, onChange, label }) {
  return (
    <button type="button" role="switch" aria-label={label} aria-checked={enabled} onClick={onChange} className={`w-11 h-6 rounded-full relative flex items-center px-0.5 cursor-pointer focus:outline-none transition-colors ${enabled ? 'bg-primary-container' : 'bg-surface-container-highest'}`}>
      <span className={`w-5 h-5 bg-surface-container-lowest rounded-full shadow-md transform transition-transform duration-200 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}
