export type Category = 'té' | 'blend' | 'bazar';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
}

const adjectives = ['Premium', 'Imperial', 'Artesanal', 'Silvestre', 'Energía', 'Místico', 'Oriental', 'Serenidad', 'Floral'];
const basesTe = ['Té Verde', 'Té Negro', 'Té Rojo', 'Té Blanco', 'Oolong', 'Matcha'];
const basesBlend = ['Blend Relax', 'Blend Frutal', 'Ice Tea', 'Infusión Herbal', 'Blend Cítrico'];
const basesBazar = ['Tetera de Vidrio', 'Infusor Metálico', 'Set de Tazas', 'Cuchara Medidora', 'Jarra Ice Tea', 'Batidor Matcha'];

function generateMockProducts(): Product[] {
  const products: Product[] = [];
  for (let i = 1; i <= 54; i++) {
    // Distribute categories roughly evenly
    const isBazar = i > 36;
    const isBlend = i > 18 && i <= 36;
    const category: Category = isBazar ? 'bazar' : (isBlend ? 'blend' : 'té');
    
    let name = '';
    if (category === 'té') {
      name = `${basesTe[i % basesTe.length]} ${adjectives[i % adjectives.length]}`;
    } else if (category === 'blend') {
      name = `${basesBlend[i % basesBlend.length]} ${adjectives[(i+2) % adjectives.length]}`;
    } else {
      name = `${basesBazar[i % basesBazar.length]} ${adjectives[(i+4) % adjectives.length]}`;
    }
    
    products.push({
      id: `prod-${i}`,
      name: `${name} #${i}`, // Adding #i to ensure uniqueness for now
      description: 'Esta es una descripción temporal para este producto generado con tus imágenes. Pronto actualizaremos los nombres reales.',
      price: Math.floor(Math.random() * 150) * 100 + 5000, // Precios entre 5000 y 20000
      image: `/products/prod-${i}.jpeg`,
      category
    });
  }
  return products;
}

const realProducts: Product[] = [
  { id: 'real-1', name: 'Boldo', description: 'Hojas de boldo seleccionadas. Ideal para infusiones digestivas y cuidar el hígado.', price: 5500, image: '/products/boldo.jpg', category: 'té' },
  { id: 'real-2', name: 'Menta', description: 'Hojas de menta fresca deshidratada. Refrescante, digestiva y perfecta para despejar la mente.', price: 5500, image: '/products/menta.jpg', category: 'té' },
  { id: 'real-3', name: 'Manzanilla', description: 'Flores de manzanilla puras. Reconfortante, ideal para relajar antes de dormir.', price: 5500, image: '/products/manzanilla.jpg', category: 'té' },
  { id: 'real-4', name: 'Mix Floral', description: 'Blend exquisito con Siempreviva, Marcela, Flor de Jazmín y Caléndula. Un abrazo para el alma.', price: 7800, image: '/products/mix-floral.jpg', category: 'blend' },
  { id: 'real-5', name: 'Blend Tereré', description: 'Especial para el calor: Cola de caballo, menta, hierba buena, polvo de naranja, rodajas de jengibre y cáscaras de naranja.', price: 8200, image: '/products/blend-terere.jpg', category: 'blend' },
  { id: 'real-6', name: 'Mix Tropical (Coco & Naranja)', description: 'Blend exótico con abundante coco rallado, una gran rodaja de naranja deshidratada y toques herbales. Ideal para mates dulces o infusiones frías.', price: 8500, image: '/products/mix-tropical.jpg', category: 'blend' },
];

export const catalogProducts = [...realProducts, ...generateMockProducts()];
