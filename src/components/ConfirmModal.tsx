import React from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel" style={{ padding: '2.5rem', maxWidth: '400px', width: '90%', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
        <AlertCircle size={48} color="var(--color-primary)" style={{ margin: '0 auto 1rem auto' }} />
        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '1rem', fontSize: '1.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-primary" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>,
    document.body
  );
};
