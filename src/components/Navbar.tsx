import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, ShoppingBag, Menu, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useCart } from '../CartContext';
import { CartModal } from './CartModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

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
            <Link to="/crea-tu-blend" className="nav-link">Crea tu Blend</Link>
            <Link to="/arma-tu-box" className="nav-link">Armá tu Box</Link>
            <Link to="/ruta-del-te" className="nav-link">Ruta del Té</Link>
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
            <Link to="/crea-tu-blend" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Crea tu Blend</Link>
            <Link to="/arma-tu-box" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Armá tu Box</Link>
            <Link to="/ruta-del-te" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Ruta del Té</Link>
          </div>
        </div>
      )}
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
