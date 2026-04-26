import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { catalogProducts, type Product } from '../data/products';

const BOX_TYPES = [
  { id: 'box1', name: 'Caja Regalo Clásica', price: 3000, desc: 'Hermosa caja de cartón rígido con moño.' },
  { id: 'box2', name: 'Caja Premium Madera', price: 8000, desc: 'Caja artesanal de madera tallada, ideal regalos empresariales.' }
];

export const CustomBox: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedBox, setSelectedBox] = useState<typeof BOX_TYPES[0] | null>(null);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  // Split products to help the user choose
  const teasAndBlends = catalogProducts.filter(p => p.category === 'té' || p.category === 'blend');
  const bazarItems = catalogProducts.filter(p => p.category === 'bazar');

  const toggleItem = (product: Product) => {
    setSelectedItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      
      // Limit to 4 items per box
      if (prev.length >= 4) {
        alert("La caja tiene un límite de 4 artículos para garantizar que todo entre de forma elegante y segura.");
        return prev;
      }
      
      return [...prev, product];
    });
  };

  const calculateTotal = () => {
    const boxPrice = selectedBox ? selectedBox.price : 0;
    const itemsPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
    return boxPrice + itemsPrice;
  };

  const handleAddToCart = () => {
    if (!selectedBox) {
      alert("Por favor, selecciona un tipo de caja.");
      return;
    }
    if (selectedItems.length === 0) {
      alert("Por favor, selecciona al menos un producto para poner en tu caja.");
      return;
    }

    const customBoxProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Box Personalizado: ${selectedBox.name}`,
      description: `Caja armada con: ${selectedItems.map(i => i.name).join(', ')}.`,
      price: calculateTotal(),
      image: '/tea_utensils.png', // Fallback image for box
      category: 'bazar' as const
    };

    addToCart(customBoxProduct, 1, undefined, {
      boxType: selectedBox.name,
      items: selectedItems
    });

    alert("¡Tu Box Personalizado ha sido agregado al carrito!");
    setSelectedBox(null);
    setSelectedItems([]);
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <h1 className="section-title">Arma Tu Regalo</h1>
      <p className="text-center mb-3" style={{ color: 'var(--color-text-muted)' }}>
        Elige la caja y los productos que deseas incluir. Nosotros nos encargamos de armarlo y decorarlo para sorprender.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Lado Izquierdo: Constructor */}
        <div>
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>1. Elige tu Caja</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {BOX_TYPES.map(box => (
                <div 
                  key={box.id} 
                  onClick={() => setSelectedBox(box)}
                  style={{
                    padding: '1rem',
                    border: `2px solid ${selectedBox?.id === box.id ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    backgroundColor: selectedBox?.id === box.id ? 'rgba(197, 168, 128, 0.1)' : 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ margin: 0 }}>{box.name}</h4>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{box.desc}</p>
                  </div>
                  <strong style={{ color: 'var(--color-primary)' }}>+${box.price}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', maxHeight: '400px', overflowY: 'auto', position: 'relative' }}>
            <h3 style={{ color: 'var(--color-primary)', margin: '-1.5rem -1.5rem 1rem -1.5rem', padding: '1.5rem', position: 'sticky', top: 0, background: 'var(--color-surface)', zIndex: 10, borderBottom: '1px solid var(--color-border)' }}>2. Agrega Tés y Blends</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {teasAndBlends.slice(0, 15).map(item => {
                const isSelected = selectedItems.find(p => p.id === item.id);
                return (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div>
                      <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '10px' }}>${item.price}</span>
                    </div>
                    <button 
                      onClick={() => toggleItem(item)}
                      className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                    >
                      {isSelected ? 'Quitar' : 'Sumar'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', maxHeight: '400px', overflowY: 'auto', position: 'relative' }}>
            <h3 style={{ color: 'var(--color-primary)', margin: '-1.5rem -1.5rem 1rem -1.5rem', padding: '1.5rem', position: 'sticky', top: 0, background: 'var(--color-surface)', zIndex: 10, borderBottom: '1px solid var(--color-border)' }}>3. Agrega Bazar</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {bazarItems.slice(0, 15).map(item => {
                const isSelected = selectedItems.find(p => p.id === item.id);
                return (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div>
                      <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '10px' }}>${item.price}</span>
                    </div>
                    <button 
                      onClick={() => toggleItem(item)}
                      className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                    >
                      {isSelected ? 'Quitar' : 'Sumar'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Lado Derecho: Resumen */}
        <div>
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              Resumen de tu Box
            </h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <strong>Tipo de Caja:</strong>
              <p style={{ color: 'var(--color-text-muted)' }}>
                {selectedBox ? `${selectedBox.name} ($${selectedBox.price})` : 'Aún no seleccionada'}
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <strong>Contenido ({selectedItems.length}/4):</strong>
              {selectedItems.length === 0 ? (
                <p style={{ color: 'var(--color-text-muted)' }}>La caja está vacía.</p>
              ) : (
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-text-muted)' }}>
                  {selectedItems.map(item => (
                    <li key={item.id}>{item.name} <span style={{fontSize:'0.8rem'}}>(${item.price})</span></li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Total:</h3>
              <h2 style={{ color: 'var(--color-secondary)', margin: 0 }}>${calculateTotal().toLocaleString('es-AR')}</h2>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', marginTop: '2rem', fontSize: '1.1rem' }}
              onClick={handleAddToCart}
            >
              Cerrar y Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
