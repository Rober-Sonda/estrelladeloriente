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

      <section className="section container text-center" style={{ paddingTop: '3rem' }}>
        <h2 className="section-title">Nuestro Propósito</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          En Estrella del Oriente, liderado por Mel Batan y Juan B. Caceres, creemos que cada taza de té es una invitación a la pausa, al disfrute y al encuentro con uno mismo. Elaboramos tés en hebras y blends artesanales cuidadosamente seleccionados para brindarte una experiencia premium en cada sorbo.
        </p>

        <h2 className="section-title">Nuestra Visión</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          Ser la marca referente que eleve el estándar de bienestar a través de infusiones artesanales, transformando el consumo diario de té y mate en un auténtico ritual de conexión, paz y disfrute para cada persona.
        </p>

        <div>
          <Link to="/ruta-del-te" className="btn btn-secondary">Conocer la Historia</Link>
        </div>
      </section>

      <section className="section container" style={{ paddingTop: '3rem' }}>
        <h2 className="section-title">Destacados</h2>
        <div className="product-grid">
          {/* Categoría: Té */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/tea_blend_mix.png" alt="Blends para Té" className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-title">Universo del Té</h3>
              <p className="product-desc">Descubrí nuestra exclusiva selección de blends de té en hebras. Sabores únicos diseñados para acompañar tus momentos de calma, meditación y bienestar.</p>
              <div className="product-footer">
                <span className="product-price">Desde $8.500</span>
                <Link to="/catalogo" className="btn btn-primary">Ver Blends</Link>
              </div>
            </div>
          </div>

          {/* Categoría: Mate */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/premium_mate.png" alt="Especial para Mate" className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-title">Ritual del Mate</h3>
              <p className="product-desc">Elevá tu tradición con nuestra línea premium. Blends exclusivos con yerba mate y hierbas seleccionadas que transforman cada cebada en una experiencia única.</p>
              <div className="product-footer">
                <span className="product-price">Desde $7.200</span>
                <Link to="/catalogo" className="btn btn-primary">Ver Blends</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
