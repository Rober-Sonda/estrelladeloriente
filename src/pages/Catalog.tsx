import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Product } from '../data/products';
import type { DynamicCategory } from '../components/admin/AdminCategories';
import '../filters.css';

export const Catalog: React.FC = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | 'todos'>('todos');
  const [activeSubCategory, setActiveSubCategory] = useState<string | 'todos'>('todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<DynamicCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prodSnap = await getDocs(collection(db, 'products'));
        const prods: Product[] = [];
        prodSnap.forEach(doc => {
          const data = doc.data() as Product;
          if (!data.isDiscontinued) {
            prods.push({ ...data, id: doc.id });
          }
        });
        setProducts(prods);

        const catSnap = await getDocs(collection(db, 'categories'));
        const cats: DynamicCategory[] = [];
        catSnap.forEach(doc => cats.push({ ...doc.data(), id: doc.id } as DynamicCategory));
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (cat: string | 'todos') => {
    setActiveCategory(cat);
    setActiveSubCategory('todos');
  };

  const filteredProducts = products.filter(p => {
    let matchCategory = true;
    if (activeCategory !== 'todos') {
      const legacyMatch = p.category === activeCategory;
      const newMatch = p.categories && activeCategoryObj ? p.categories.includes(activeCategoryObj.name) : false;
      matchCategory = legacyMatch || newMatch;
    }

    let matchSubCategory = true;
    if (activeSubCategory !== 'todos') {
      const legacySubMatch = p.subCategory === activeSubCategory;
      const newSubMatch = p.subCategories ? p.subCategories.includes(activeSubCategory) : false;
      matchSubCategory = legacySubMatch || newSubMatch;
    }

    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchCategory && matchSubCategory && matchSearch;
  });

  const activeCategoryObj = categories.find(c => c.slug === activeCategory || c.id === activeCategory);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', textAlign: 'center' }}>
        <h1 className="section-title">Nuestro Catálogo</h1>
        <p style={{ color: 'var(--color-primary)' }}>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <h1 className="section-title">Nuestro Catálogo</h1>
      <p className="text-center mb-3" style={{ color: 'var(--color-text-muted)' }}>
        Explora nuestra selección de blends artesanales, tés puros y utensilios.
      </p>

      {/* Top Filter Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(197, 168, 128, 0.3)' }}>
        
        {/* Search Input & Toggle Button */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Buscar productos, ingredientes..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="search-input" 
            />
          </div>
          
          <button 
            className={`filter-toggle-btn ${isFilterOpen ? 'active' : ''}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filtros
          </button>
        </div>

        {/* Active Filters Row */}
        {(activeCategory !== 'todos' || activeSubCategory !== 'todos') && (
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {activeCategory !== 'todos' && (
              <span className="active-filter-tag">
                {activeCategoryObj?.name || activeCategory}
                <button onClick={() => handleCategoryChange('todos')}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {activeSubCategory !== 'todos' && (
              <span className="active-filter-tag">
                {activeSubCategory}
                <button onClick={() => setActiveSubCategory('todos')}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}

        {/* Filter Panel (Collapsible) */}
        {isFilterOpen && (
          <div className="filter-panel">
            <div>
              <span style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Categoría Principal</span>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <button className={`filter-chip ${activeCategory === 'todos' ? 'active' : ''}`} onClick={() => handleCategoryChange('todos')}>Todas</button>
                {categories.map(cat => (
                  <button 
                    key={cat.id} 
                    className={`filter-chip ${activeCategory === cat.slug || activeCategory === cat.id ? 'active' : ''}`} 
                    onClick={() => handleCategoryChange(cat.slug || cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {activeCategory !== 'todos' && activeCategoryObj && activeCategoryObj.subCategories.length > 0 && (
              <div>
                <span style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Subcategoría</span>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {activeCategoryObj.subCategories.map(sub => (
                    <button 
                      key={sub}
                      className={`filter-chip ${activeSubCategory === sub ? 'active' : ''}`} 
                      onClick={() => setActiveSubCategory(sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grilla de productos */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card glass-panel" style={{ border: '1px solid rgba(197, 168, 128, 0.2)' }}>
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
            </div>
            <div className="product-info">
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-secondary)', fontWeight: 700, letterSpacing: '2px' }}>
                {product.categories?.length ? product.categories.join(', ') : product.category} 
                {(product.subCategories?.length || product.subCategory) ? ' • ' : ''}
                {product.subCategories?.length ? product.subCategories.join(', ') : product.subCategory}
              </span>
              <h3 className="product-title" style={{ marginTop: '0.8rem', fontSize: '1.4rem' }}>{product.name}</h3>
              <p className="product-desc" style={{ fontSize: '0.95rem' }}>{product.description}</p>
              
              <div className="product-footer" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                
                {product.hasVariations && product.variations && product.variations.length > 0 ? (
                  <>
                    <span className="product-price" style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                      Desde ${Math.min(...product.variations.map(v => v.price))}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select 
                        id={`var-${product.id}`}
                        className="filter-select" 
                        style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}
                      >
                        {product.variations.map(v => (
                          <option key={v.id} value={v.id}>{v.name} - ${v.price}</option>
                        ))}
                      </select>
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)' }} 
                        onClick={() => {
                          const selectEl = document.getElementById(`var-${product.id}`) as HTMLSelectElement;
                          const varId = selectEl.value;
                          const selectedVar = product.variations?.find(v => v.id === varId);
                          if (selectedVar) {
                            addToCart({
                              ...product,
                              id: `${product.id}-${selectedVar.id}`,
                              name: `${product.name} (${selectedVar.name})`,
                              price: selectedVar.price,
                              // @ts-ignore
                              costPrice: selectedVar.costPrice
                            });
                          }
                        }}
                      >
                        Agregar
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/*@ts-ignore*/}
                    {product.isOnSale ? (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {/*@ts-ignore*/}
                        <span className="product-price" style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>${product.salePrice}</span>
                        <span style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>${product.price}</span>
                      </div>
                    ) : (
                      <span className="product-price" style={{ fontSize: '1.25rem' }}>${product.price}</span>
                    )}
                    <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-md)' }} onClick={() => addToCart(product)}>
                      Agregar
                    </button>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="glass-panel" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>Sin resultados</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>No se encontraron productos que coincidan con tu búsqueda.</p>
            <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); handleCategoryChange('todos'); }}>
              Limpiar Filtros y Búsqueda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
