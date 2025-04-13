import React from 'react';

interface ListPopupProps {
  trigger: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    transform?: string;
  };
}

function ListPopup({ trigger, children, onClose, position }: ListPopupProps) {
  if (!trigger) return null;

  const popupPosition = {
    top: position?.top || '1rem',
    right: position?.right || '1rem',
    bottom: position?.bottom || 'auto',
    left: position?.left || 'auto',
  };

  return (
    <section>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="fixed flex items-start p-4 z-50" style={{top: popupPosition.top, right: popupPosition.right, bottom: popupPosition.bottom, left: popupPosition.left,}}>
          <div className="opacity-80 backdrop-blur-sm rounded-xl shadow-xl p-6 w-full max-w-xs border border-black pointer-events-auto relative" style={{ backgroundColor: '#665C5C' }}>
            <button className="absolute top-2 right-2 hover:text-red-500 text-xl" onClick={onClose}>✕</button>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListPopup;

