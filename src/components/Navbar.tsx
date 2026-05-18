import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, ShoppingBag, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { CartModal } from './CartModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { items } = useCart();
  const { user, login, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const isAdmin = user && user.email && ['rober.junin@gmail.com', 'juanncaceress99@gmail.com', 'melinabatan@gmail.com'].includes(user.email.toLowerCase());

  return (
    <>
      <nav className="navbar glass-panel">
        <div className="container nav-container">
          <Link to="/" className="nav-logo">
            <span className="desktop-logo-text">Estrella del Oriente</span>
            <img 
              src="/logo-transparent.png" 
              alt="Estrella del Oriente" 
              className="mobile-logo-img" 
            />
          </Link>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/catalogo" className="nav-link">Catálogo</Link>
            <Link to="/crea-tu-blend" className="nav-link">Tu Blend</Link>
            <Link to="/arma-tu-box" className="nav-link">Tu Box</Link>
            <Link to="/ruta-del-te" className="nav-link">Ruta del Té</Link>
            {user && (
              <Link to="/mis-pedidos" className="nav-link" style={{ color: 'var(--color-primary)' }}>Pedidos</Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="nav-link" style={{ color: 'var(--color-secondary)' }}>Admin</Link>
            )}
          </div>

          <div className="nav-actions">
            <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="icon-btn" aria-label="Cart" style={{ position: 'relative' }} onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span style={{ position: 'absolute', top: '-5px', right: '-8px', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* User Auth Section */}
            {!user ? (
              <button onClick={login} className="icon-btn" aria-label="Login" title="Iniciar Sesión">
                <LogIn size={20} />
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-primary)' }} />
                ) : (
                  <User size={20} color="var(--color-primary)" />
                )}
                <button onClick={logout} className="icon-btn" aria-label="Logout" title="Cerrar Sesión">
                  <LogOut size={20} />
                </button>
              </div>
            )}

            <button className="icon-btn mobile-only" aria-label="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay glass-panel">
          <div className="mobile-nav-links">
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
            <Link to="/catalogo" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Catálogo</Link>
            <Link to="/crea-tu-blend" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Tu Blend</Link>
            <Link to="/arma-tu-box" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Tu Box</Link>
            <Link to="/ruta-del-te" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Ruta del Té</Link>
            {user && (
              <Link to="/mis-pedidos" className="nav-link" style={{ color: 'var(--color-primary)' }} onClick={() => setIsMobileMenuOpen(false)}>Pedidos</Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="nav-link" style={{ color: 'var(--color-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
            )}
          </div>
        </div>
      )}
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
