import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000); // 5 seconds display
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={toastContainerStyle}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{...toastStyle, ...(toast.type === 'error' ? errorStyle : toast.type === 'success' ? successStyle : infoStyle)}} className="glass-panel">
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const toastContainerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  zIndex: 9999,
  pointerEvents: 'none',
};

const toastStyle: React.CSSProperties = {
  padding: '1rem 1.5rem',
  borderRadius: 'var(--radius-md)',
  minWidth: '250px',
  maxWidth: '400px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  animation: 'slideIn 0.3s ease forwards',
  whiteSpace: 'pre-wrap',
  lineHeight: '1.4',
  fontSize: '0.9rem',
};

const successStyle: React.CSSProperties = {
  borderLeft: '4px solid #10b981',
};

const errorStyle: React.CSSProperties = {
  borderLeft: '4px solid #ef4444',
};

const infoStyle: React.CSSProperties = {
  borderLeft: '4px solid var(--color-secondary)',
};
