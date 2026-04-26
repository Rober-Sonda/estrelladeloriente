import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { catalogProducts, type Category } from '../data/products';

export const Catalog: React.FC = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<Category | 'todos'>('todos');

  const filteredProducts = activeCategory === 'todos' 
    ? catalogProducts 
    : catalogProducts.filter(p => p.category === activeCategory);

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <h1 className="section-title">Nuestro Catálogo</h1>
      <p className="text-center mb-3" style={{ color: 'var(--color-text-muted)' }}>
        Explora nuestra selección completa de tés puros, blends artesanales y utensilios de bazar.
      </p>

      {/* Categorías / Filtros */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <button 
          className={activeCategory === 'todos' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveCategory('todos')}
        >
          Todos
        </button>
        <button 
          className={activeCategory === 'té' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveCategory('té')}
        >
          Tés Puros
        </button>
        <button 
          className={activeCategory === 'blend' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveCategory('blend')}
        >
          Blends
        </button>
        <button 
          className={activeCategory === 'bazar' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveCategory('bazar')}
        >
          Bazar
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
            </div>
            <div className="product-info">
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-secondary)', fontWeight: 700, letterSpacing: '1px' }}>
                {product.category}
              </span>
              <h3 className="product-title" style={{ marginTop: '0.5rem' }}>{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toLocaleString('es-AR')}</span>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
