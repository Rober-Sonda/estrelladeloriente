import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h3 className="footer-logo">Estrella del Oriente</h3>
          <p>La guía hacia tu momento de paz. Té en hebras y blends artesanales.</p>
        </div>
        
        <div className="footer-links">
          <h4>Explorar</h4>
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/ruta-del-te">La Ruta del Té</Link>
        </div>

        <div className="footer-social">
          <h4>Conectemos</h4>
          <div className="social-icons" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="https://www.instagram.com/estrella_del_oriente_/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="mailto:contacto@estrelladeloriente.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} /> Email
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Estrella del Oriente. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
