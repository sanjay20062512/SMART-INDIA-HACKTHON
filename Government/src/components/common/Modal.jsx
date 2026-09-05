import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, maxWidth = '650px', systemTag = 'OFFICIAL ACTION' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container" 
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div className="modal-header-titles">
            <span className="modal-system-tag font-mono">{systemTag}</span>
            <h3 className="modal-title">{title}</h3>
          </div>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          {children}
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 24, 33, 0.6);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 2000;
          animation: modal-fade-in 0.15s ease-out;
        }

        @keyframes modal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          width: 100%;
          background: var(--bg-surface);
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          animation: modal-slide-up 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modal-slide-up {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .modal-header {
          padding: 14px 20px;
          background-color: var(--bg-surface-elevated);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .modal-system-tag {
          display: block;
          font-size: 10px;
          font-weight: 700;
          color: var(--govt-forest);
          letter-spacing: 0.06em;
          margin-bottom: 2px;
        }

        .modal-title {
          font-family: var(--font-heading);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .modal-close-btn {
          width: 30px;
          height: 30px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.15s;
        }
        .modal-close-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-strong);
          background-color: var(--bg-surface-subtle);
        }

        .modal-content {
          padding: 20px;
          max-height: calc(85vh - 70px);
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
