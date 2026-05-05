import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import type { Product, Category, SubCategory, ProductVariation } from '../../data/products';

export const AdminCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    costPrice: 0,
    image: '',
    category: 'blend',
    subCategory: 'té',
    hasVariations: false,
    variations: [],
    // @ts-ignore
    isDiscontinued: false,
    // @ts-ignore
    isOnSale: false,
    // @ts-ignore
    salePrice: 0
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const prods: Product[] = [];
      querySnapshot.forEach((doc) => {
        prods.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(prods);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        ...product,
        costPrice: product.costPrice || 0,
        hasVariations: product.hasVariations || false,
        variations: product.variations || []
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        costPrice: 0,
        image: '',
        category: 'blend',
        subCategory: 'té',
        hasVariations: false,
        variations: [],
        // @ts-ignore
        isDiscontinued: false,
        // @ts-ignore
        isOnSale: false,
        // @ts-ignore
        salePrice: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), formData);
      } else {
        await addDoc(collection(db, 'products'), {
          ...formData,
          // @ts-ignore
          createdAt: new Date().toISOString()
        });
      }
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto? Se borrará permanentemente de la base de datos.")) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleDiscontinued = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'products', id), { isDiscontinued: !currentStatus });
      fetchProducts();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const addVariation = () => {
    const newVariation: ProductVariation = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      price: 0,
      costPrice: 0
    };
    setFormData({
      ...formData,
      variations: [...(formData.variations || []), newVariation]
    });
  };

  const updateVariation = (id: string, field: keyof ProductVariation, value: any) => {
    const updatedVariations = formData.variations?.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    );
    setFormData({ ...formData, variations: updatedVariations });
  };

  const removeVariation = (id: string) => {
    const updatedVariations = formData.variations?.filter(v => v.id !== id);
    setFormData({ ...formData, variations: updatedVariations });
  };

  if (loading) return <p>Cargando catálogo...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Gestión del Catálogo</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Nuevo Producto</button>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '700px', padding: '2rem', borderRadius: 'var(--radius-lg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, color: 'var(--color-primary)' }}>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Nombre</label>
                <input required type="text" className="search-input" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Descripción</label>
                <textarea required className="search-input" style={{ minHeight: '80px', borderRadius: 'var(--radius-sm)' }} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>URL de Imagen</label>
                  <input required type="text" className="search-input" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Categoría Principal</label>
                  <select className="filter-select" style={{ width: '100%', padding: '0.5rem' }} value={formData.category || 'blend'} onChange={e => setFormData({...formData, category: e.target.value as Category})}>
                    <option value="blend">Blends</option>
                    <option value="hierba">Hierbas Puras</option>
                    <option value="bazar">Accesorios</option>
                  </select>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Subcategoría (Opcional)</label>
                  <select className="filter-select" style={{ width: '100%', padding: '0.5rem' }} value={formData.subCategory || ''} onChange={e => setFormData({...formData, subCategory: e.target.value as SubCategory})}>
                    <option value="">Ninguna</option>
                    <option value="té">Para Té</option>
                    <option value="mate">Para Mate</option>
                    <option value="ambos">Para Ambos</option>
                    <option value="digestiva">Digestivas</option>
                    <option value="relajante">Relajantes</option>
                    <option value="refrescante">Refrescantes</option>
                    <option value="general">Otras (General)</option>
                  </select>
                </div>
              </div>

              {/* Pricing Section */}
              <div style={{ border: '1px solid var(--color-border)', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, color: 'var(--color-primary)' }}>Precios y Presentaciones</h4>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={formData.hasVariations || false} onChange={e => setFormData({...formData, hasVariations: e.target.checked})} />
                    Se vende a granel / por raciones
                  </label>
                </div>

                {!formData.hasVariations ? (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: 'var(--color-text-muted)' }}>Precio de Venta ($)</label>
                      <input required={!formData.hasVariations} type="number" className="search-input" value={formData.price || 0} onChange={e => setFormData({...formData, price: Number(e.target.value)})} style={{ padding: '0.4rem' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: 'var(--color-text-muted)' }}>Precio de Costo ($)</label>
                      <input required={!formData.hasVariations} type="number" className="search-input" value={formData.costPrice || 0} onChange={e => setFormData({...formData, costPrice: Number(e.target.value)})} style={{ padding: '0.4rem' }} />
                    </div>
                  </div>
                ) : (
                  <div>
                    {formData.variations?.map((v) => (
                      <div key={v.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '0.8rem' }}>
                        <div style={{ flex: 2 }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Tamaño/Ración (ej. 50g)</label>
                          <input required type="text" className="search-input" value={v.name} onChange={e => updateVariation(v.id, 'name', e.target.value)} style={{ padding: '0.3rem' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Venta ($)</label>
                          <input required type="number" className="search-input" value={v.price || 0} onChange={e => updateVariation(v.id, 'price', Number(e.target.value))} style={{ padding: '0.3rem' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Costo ($)</label>
                          <input required type="number" className="search-input" value={v.costPrice || 0} onChange={e => updateVariation(v.id, 'costPrice', Number(e.target.value))} style={{ padding: '0.3rem' }} />
                        </div>
                        <button type="button" onClick={() => removeVariation(v.id)} style={{ padding: '0.4rem', background: 'transparent', border: '1px solid red', color: 'red', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={addVariation} style={{ background: 'transparent', border: '1px dashed var(--color-primary)', color: 'var(--color-primary)', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem', marginTop: '0.5rem' }}>+ Agregar Opción</button>
                  </div>
                )}
              </div>

              {!formData.hasVariations && (
                <div style={{ display: 'flex', gap: '2rem', padding: '1rem', background: 'rgba(197, 168, 128, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    {/*@ts-ignore*/}
                    <input type="checkbox" checked={formData.isOnSale || false} onChange={e => setFormData({...formData, isOnSale: e.target.checked})} />
                    En Oferta
                  </label>
                  {/*@ts-ignore*/}
                  {formData.isOnSale && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Precio de Oferta ($)</label>
                      {/*@ts-ignore*/}
                      <input type="number" className="search-input" value={formData.salePrice || 0} onChange={e => setFormData({...formData, salePrice: Number(e.target.value)})} style={{ padding: '0.2rem 0.5rem' }} />
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Producto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '1rem' }}>Imagen</th>
              <th style={{ padding: '1rem' }}>Nombre</th>
              <th style={{ padding: '1rem' }}>Categoría</th>
              <th style={{ padding: '1rem' }}>Precio Venta</th>
              <th style={{ padding: '1rem' }}>Precio Costo</th>
              <th style={{ padding: '1rem' }}>Estado</th>
              <th style={{ padding: '1rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem' }}>
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                  {product.name}
                </td>
                
                <td style={{ padding: '1rem' }}>
                  <span>{product.category} {product.subCategory ? ` > ${product.subCategory}` : ''}</span>
                </td>
                
                <td style={{ padding: '1rem' }}>
                  {product.hasVariations ? (
                    <span style={{ color: 'var(--color-primary)' }}>Desde ${Math.min(...(product.variations?.map(v => v.price) || [0]))}</span>
                  ) : (
                    /*@ts-ignore*/
                    product.isOnSale ? (
                      <div>
                        {/*@ts-ignore*/}
                        <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>${product.salePrice}</span>
                        <br/>
                        <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>${product.price}</span>
                      </div>
                    ) : (
                      <span>${product.price}</span>
                    )
                  )}
                </td>

                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                  {product.hasVariations ? (
                    <span>Múltiples</span>
                  ) : (
                    <span>${product.costPrice || 0}</span>
                  )}
                </td>
                
                <td style={{ padding: '1rem' }}>
                  {/*@ts-ignore*/}
                  {product.isDiscontinued ? (
                    <span style={{ backgroundColor: 'rgba(255,0,0,0.1)', color: 'red', padding: '0.3rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block' }}>Pausado</span>
                  ) : (
                    <span style={{ backgroundColor: 'rgba(0,255,0,0.1)', color: 'var(--color-primary)', padding: '0.3rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block' }}>Activo</span>
                  )}
                </td>
                
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => handleOpenModal(product)} style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid var(--color-primary)', borderRadius: '4px', cursor: 'pointer', color: 'var(--color-primary)' }}>Editar</button>
                    {/*@ts-ignore*/}
                    <button onClick={() => toggleDiscontinued(product.id, product.isDiscontinued)} style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid orange', borderRadius: '4px', cursor: 'pointer', color: 'orange' }}>
                      {/*@ts-ignore*/}
                      {product.isDiscontinued ? 'Activar' : 'Pausar'}
                    </button>
                    <button onClick={() => handleDelete(product.id)} style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid red', borderRadius: '4px', cursor: 'pointer', color: 'red' }}>Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No hay productos en el catálogo. Ejecutá la migración desde la Configuración o agregá uno nuevo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
