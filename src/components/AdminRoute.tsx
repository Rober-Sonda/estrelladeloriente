import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ALLOWED_ADMINS = ['rober.junin@gmail.com', 'juanncaceress99@gmail.com', 'melinabatan@gmail.com'];

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <p style={{ color: 'var(--color-primary)' }}>Verificando credenciales...</p>
      </div>
    );
  }

  // Check if user is logged in AND their email is in the allowed list (case-insensitive)
  if (!user || !user.email || !ALLOWED_ADMINS.includes(user.email.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
