import React, { useState } from 'react';
import { useCart } from '../CartContext';

const basesTe = [
  { id: 'b1', name: 'Té Verde', desc: 'Fresco, herbáceo y antioxidante.' },
  { id: 'b2', name: 'Té Negro', desc: 'Intenso, robusto y estimulante.' },
  { id: 'b3', name: 'Té Rojo (Pu-erh)', desc: 'Terroso, profundo y digestivo.' },
  { id: 'b4', name: 'Té Blanco', desc: 'Delicado, sutil y muy natural.' },
];

const botanicals = [
  { id: 'i1', name: 'Pétalos de Rosa' },
  { id: 'i2', name: 'Hibiscus (Jamaica)' },
  { id: 'i3', name: 'Manzanilla' },
  { id: 'i4', name: 'Menta' },
  { id: 'i5', name: 'Cedrón' },
  { id: 'i6', name: 'Jengibre' },
  { id: 'i7', name: 'Lavanda' },
  { id: 'i8', name: 'Cáscara de Naranja' }
];

export const CustomBlend: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedBase, setSelectedBase] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [blendName, setBlendName] = useState<string>('');

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(i => i !== ingredient);
      }
      if (prev.length >= 3) {
        alert("Puedes elegir un máximo de 3 ingredientes botánicos para mantener el equilibrio del sabor.");
        return prev;
      }
      return [...prev, ingredient];
    });
  };

  const handleAddToCart = () => {
    if (!selectedBase || selectedIngredients.length === 0 || !blendName) {
      alert("Por favor completa todos los pasos: Base, ingredientes y un nombre para tu creación.");
      return;
    }

    const customProduct = {
      id: `custom-blend-${Date.now()}`,
      name: `Tu Blend: "${blendName}"`,
      description: `Un blend artesanal creado por ti sobre una base de ${selectedBase} con notas de ${selectedIngredients.join(', ')}.`,
      price: 12000, // Fixed price for custom blends
      image: '/hero_tea_peace.png', // Fallback image for custom creations
      category: 'blend' as const
    };

    addToCart(customProduct, 1, {
      base: selectedBase,
      ingredients: selectedIngredients
    });

    alert("¡Tu blend personalizado ha sido agregado al carrito!");
    setSelectedBase('');
    setSelectedIngredients([]);
    setBlendName('');
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '800px' }}>
      <h1 className="section-title">Crea tu Propio Blend</h1>
      <p className="text-center mb-3" style={{ color: 'var(--color-text-muted)' }}>
        Conviértete en un Tea Blender. Selecciona tu base favorita y añade ingredientes para crear una infusión que sea 100% tuya.
      </p>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>1. Elige tu Base de Té</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {basesTe.map(base => (
            <div 
              key={base.id} 
              onClick={() => setSelectedBase(base.name)}
              style={{
                padding: '1rem',
                border: `2px solid ${selectedBase === base.name ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                backgroundColor: selectedBase === base.name ? 'rgba(197, 168, 128, 0.1)' : 'transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{base.name}</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{base.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>2. Elige tus Botánicos (Máx 3)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {botanicals.map(bot => {
            const isSelected = selectedIngredients.includes(bot.name);
            return (
              <button
                key={bot.id}
                onClick={() => handleIngredientToggle(bot.name)}
                className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '50px', padding: '0.5rem 1rem' }}
              >
                {bot.name} {isSelected && '✓'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>3. Bautiza tu Creación</h3>
        <input 
          type="text" 
          value={blendName}
          onChange={(e) => setBlendName(e.target.value)}
          placeholder="Ej: Mañana Serenas, Mix Energético, etc..."
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-alt)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2 style={{ color: 'var(--color-secondary)' }}>Precio: $12.000</h2>
        <button 
          className="btn btn-primary" 
          style={{ padding: '1rem 3rem', fontSize: '1.2rem', marginTop: '1rem' }}
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </button>
      </div>

    </div>
  );
};
