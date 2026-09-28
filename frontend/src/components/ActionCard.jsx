import React from 'react';

export default function ActionCard({ onClick, pressed, children }) {
  return (
    <button type="button" onClick={onClick} className={`flex flex-col items-start p-space-md rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-all text-left shadow-sm group ${pressed ? 'scale-[0.98]' : ''}`}>
      {children}
    </button>
  );
}
