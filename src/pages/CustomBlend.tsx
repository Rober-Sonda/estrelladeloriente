import React, { useState, useMemo } from 'react';
import { useCart } from '../CartContext';
import { useToast } from '../ToastContext';

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
  const { showToast } = useToast();
  const [selectedBase, setSelectedBase] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleIngredientToggle = (ingredient: string) => {
    const isSelected = selectedIngredients.includes(ingredient);
    
    if (!isSelected && selectedIngredients.length >= 3) {
      showToast("Puedes elegir un máximo de 3 ingredientes botánicos para mantener el equilibrio del sabor.", "error");
      return;
    }

    setSelectedIngredients(prev => {
      if (isSelected) {
        return prev.filter(i => i !== ingredient);
      }
      return [...prev, ingredient];
    });
  };

  // Generador determinístico de nombres místicos/históricos para el blend
  const generatedName = useMemo(() => {
    if (!selectedBase) return '';

    const baseNouns: Record<string, string> = {
      'Té Verde': 'Brisa de Jade',
      'Té Negro': 'Sombra Imperial',
      'Té Rojo (Pu-erh)': 'Tierra Milenaria',
      'Té Blanco': 'Lágrima de Loto'
    };

    const ingAdjectives: Record<string, string> = {
      'Pétalos de Rosa': 'del Jardín Prohibido',
      'Hibiscus (Jamaica)': 'del Atardecer Carmesí',
      'Manzanilla': 'de la Calma Eterna',
      'Menta': 'del Bosque Boreal',
      'Cedrón': 'del Valle Luminoso',
      'Jengibre': 'del Despertar',
      'Lavanda': 'de los Sueños Místicos',
      'Cáscara de Naranja': 'del Verano Dorado'
    };

    const noun = baseNouns[selectedBase] || 'Elixir Ancestral';
    
    if (selectedIngredients.length === 0) return `${noun} Puro`;

    // Usa el primer ingrediente como modificador principal para el nombre
    const primaryIng = selectedIngredients[0];
    const adj = ingAdjectives[primaryIng] || 'de la Dinastía Perdida';

    return `${noun} ${adj}`;
  }, [selectedBase, selectedIngredients]);

  const handleAddToCart = () => {
    if (!selectedBase || selectedIngredients.length === 0) {
      showToast("Por favor selecciona una base de té y al menos un ingrediente botánico.", "error");
      return;
    }

    const customProduct = {
      id: `custom-blend-${Date.now()}`,
      name: `Blend: "${generatedName}"`,
      description: `Un blend artesanal místico sobre una base de ${selectedBase} con notas de ${selectedIngredients.join(', ')}.`,
      price: 12000, 
      image: '/hero_tea_peace.png', 
      category: 'blend' as const
    };

    addToCart(customProduct, 1, {
      base: selectedBase,
      ingredients: selectedIngredients
    });

    setSelectedBase('');
    setSelectedIngredients([]);
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '800px' }}>
      <h1 className="section-title">Crea tu Propio Blend</h1>
      <p className="text-center mb-3" style={{ color: 'var(--color-text-muted)' }}>
        Conviértete en un Tea Blender. Selecciona tu base favorita y añade ingredientes para crear una infusión única. Los antiguos espíritus del té nombrarán tu creación.
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

      {generatedName && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', textAlign: 'center', background: 'rgba(197, 168, 128, 0.05)' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-muted)', fontSize: '1rem' }}>El nombre de tu creación es:</h3>
          <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '2rem', letterSpacing: '1px' }}>
            « {generatedName} »
          </h2>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2 style={{ color: 'var(--color-secondary)' }}>Precio: $12.000</h2>
        <button 
          className="btn btn-primary" 
          style={{ padding: '1rem 3rem', fontSize: '1.2rem', marginTop: '1rem' }}
          onClick={handleAddToCart}
          disabled={!selectedBase || selectedIngredients.length === 0}
        >
          Agregar al Carrito
        </button>
      </div>

    </div>
  );
};
