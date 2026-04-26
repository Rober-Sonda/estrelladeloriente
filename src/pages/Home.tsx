import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <>
      <section className="hero">
        <img src="/hero_tea_peace.png" alt="Té en hebras premium" className="hero-bg" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Estrella del Oriente</h1>
          <p className="hero-subtitle">La guía hacia tu momento de paz.</p>
          <Link to="/catalogo" className="btn btn-primary">Descubrir Blends</Link>
        </div>
      </section>

      <section className="section container text-center">
        <h2 className="section-title">Nuestra Filosofía</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
          En Estrella del Oriente, liderado por Mel Batan y Juan B. Caceres, creemos que cada taza de té es una invitación a la pausa, al disfrute y al encuentro con uno mismo. Elaboramos tés en hebras y blends artesanales cuidadosamente seleccionados para brindarte una experiencia premium en cada sorbo.
        </p>
        <div className="mt-3">
          <Link to="/ruta-del-te" className="btn btn-secondary">Conocer la Historia</Link>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Destacados</h2>
        <div className="product-grid">
          {/* Mock Featured Product 1 */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/tea_blend_mix.png" alt="Blend Relax" className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-title">Blend Paz Interior</h3>
              <p className="product-desc">Una mezcla artesanal de manzanilla, pétalos de rosa y té verde suave, ideal para desconectar al final del día.</p>
              <div className="product-footer">
                <span className="product-price">$8.500</span>
                <Link to="/catalogo" className="btn btn-primary">Ver Catálogo</Link>
              </div>
            </div>
          </div>
          
          {/* Mock Featured Product 2 */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/tea_utensils.png" alt="Utensilios de té" className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-title">Set Ritual Ceremonia</h3>
              <p className="product-desc">Elevá tu experiencia con nuestro set de utensilios premium. Incluye batidor de bambú, tetera de cerámica y cuchara infusora.</p>
              <div className="product-footer">
                <span className="product-price">$25.000</span>
                <Link to="/catalogo" className="btn btn-primary">Ver Catálogo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
