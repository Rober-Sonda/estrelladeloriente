export type Category = 'blend' | 'hierba' | 'bazar';
export type SubCategory = 'té' | 'mate' | 'ambos' | 'digestiva' | 'relajante' | 'refrescante' | 'general' | null;

export interface ProductVariation {
  id: string;
  name: string;
  price: number;
  costPrice: number;
}

export interface BillOfMaterialItem {
  materialId: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: Category; // Legacy
  subCategory?: SubCategory; // Legacy
  categories?: string[];
  subCategories?: string[];
  costPrice?: number;
  hasVariations?: boolean;
  variations?: ProductVariation[];
  isDiscontinued?: boolean;
  isOnSale?: boolean;
  salePrice?: number | null;
  createdAt?: string;
  billOfMaterials?: BillOfMaterialItem[];
}

const adjectives = ['Premium', 'Imperial', 'Artesanal', 'Silvestre', 'Energía', 'Místico', 'Oriental', 'Serenidad', 'Floral'];
const basesHierba = ['Hierba Serrana', 'Mezcla Andina', 'Yuyitos', 'Hierbas del Bosque'];
const basesBlend = ['Blend Relax', 'Blend Frutal', 'Ice Tea', 'Infusión Herbal', 'Blend Cítrico'];
const basesBazar = ['Tetera de Vidrio', 'Infusor Metálico', 'Set de Tazas', 'Cuchara Medidora', 'Jarra Ice Tea', 'Batidor Matcha'];

function generateMockProducts(): Product[] {
  const products: Product[] = [];
  for (let i = 1; i <= 54; i++) {
    const isBazar = i > 36;
    const isBlend = i > 18 && i <= 36;
    const category: Category = isBazar ? 'bazar' : (isBlend ? 'blend' : 'hierba');
    
    let name = '';
    let subCategory: SubCategory = null;

    if (category === 'hierba') {
      name = `${basesHierba[i % basesHierba.length]} ${adjectives[i % adjectives.length]}`;
      const hierbaProps: SubCategory[] = ['digestiva', 'relajante', 'refrescante', 'general'];
      subCategory = hierbaProps[i % hierbaProps.length];
    } else if (category === 'blend') {
      name = `${basesBlend[i % basesBlend.length]} ${adjectives[(i+2) % adjectives.length]}`;
      subCategory = i % 2 === 0 ? 'té' : 'mate';
    } else {
      name = `${basesBazar[i % basesBazar.length]} ${adjectives[(i+4) % adjectives.length]}`;
    }
    
    products.push({
      id: `prod-${i}`,
      name: `${name} #${i}`,
      description: 'Esta es una descripción temporal para este producto generado con tus imágenes. Pronto actualizaremos los nombres reales.',
      price: Math.floor(Math.random() * 150) * 100 + 5000,
      image: `/products/prod-${i}.jpeg`,
      category,
      subCategory
    });
  }
  return products;
}

const realProducts: Product[] = [
  { id: 'real-1', name: 'Boldo', description: 'Hojas de boldo seleccionadas. Ideal para infusiones digestivas y cuidar el hígado.', price: 5500, image: '/products/boldo.jpg', category: 'hierba', subCategory: 'digestiva' },
  { id: 'real-2', name: 'Menta', description: 'Hojas de menta fresca deshidratada. Refrescante, digestiva y perfecta para despejar la mente.', price: 5500, image: '/products/menta.jpg', category: 'hierba', subCategory: 'refrescante' },
  { id: 'real-3', name: 'Manzanilla', description: 'Flores de manzanilla puras. Reconfortante, ideal para relajar antes de dormir.', price: 5500, image: '/products/manzanilla.jpg', category: 'hierba', subCategory: 'relajante' },
  { id: 'real-4', name: 'Mix Floral', description: 'Blend exquisito con Siempreviva, Marcela, Flor de Jazmín y Caléndula. Un abrazo para el alma.', price: 7800, image: '/products/mix-floral.jpg', category: 'blend', subCategory: 'té' },
  { id: 'real-5', name: 'Blend Tereré', description: 'Especial para el calor: Cola de caballo, menta, hierba buena, polvo de naranja, rodajas de jengibre y cáscaras de naranja.', price: 8200, image: '/products/blend-terere.jpg', category: 'blend', subCategory: 'mate' },
  { id: 'real-6', name: 'Mix Tropical (Coco & Naranja)', description: 'Blend exótico con abundante coco rallado, una gran rodaja de naranja deshidratada y toques herbales. Ideal para mates dulces o infusiones frías.', price: 8500, image: '/products/mix-tropical.jpg', category: 'blend', subCategory: 'mate' },
];

export const catalogProducts = [...realProducts, ...generateMockProducts()];
