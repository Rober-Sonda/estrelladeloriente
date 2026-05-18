import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { createPortal } from 'react-dom';
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import type { Product, ProductVariation } from '../../data/products';
import { AdminPagination } from './AdminPagination';
import { useToast } from '../../ToastContext';
import { ConfirmModal } from '../ConfirmModal';
import { X } from 'lucide-react';

export interface DynamicCategory {
  id: string;
  name: string;
  slug: string;
  subCategories: string[];
}

export const AdminCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<DynamicCategory[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ message: string, title: string, onConfirm: () => void } | null>(null);
  const { showToast } = useToast();
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    costPrice: 0,
    image: '',
    categories: [],
    subCategories: [],
    hasVariations: false,
    variations: [],
    // @ts-ignore
    isDiscontinued: false,
    // @ts-ignore
    isOnSale: false,
    // @ts-ignore
    salePrice: 0,
    billOfMaterials: []
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

  const fetchDynamicCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const cats: DynamicCategory[] = [];
      querySnapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() } as DynamicCategory);
      });
      setDynamicCategories(cats);
    } catch (error) {
      console.error("Error fetching dynamic categories:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'materials'));
      const mats: any[] = [];
      querySnapshot.forEach((doc) => {
        mats.push({ id: doc.id, ...doc.data() });
      });
      setMaterials(mats);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchDynamicCategories();
    fetchMaterials();
  }, []);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        ...product,
        categories: product.categories || (product.category ? [product.category] : []),
        subCategories: product.subCategories || (product.subCategory ? [product.subCategory] : []),
        costPrice: product.costPrice || 0,
        hasVariations: product.hasVariations || false,
        variations: product.variations || [],
        billOfMaterials: product.billOfMaterials || []
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        costPrice: 0,
        image: '',
        categories: [],
        subCategories: [],
        hasVariations: false,
        variations: [],
        // @ts-ignore
        isDiscontinued: false,
        // @ts-ignore
        isOnSale: false,
        // @ts-ignore
        salePrice: 0,
        billOfMaterials: []
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
      showToast(editingId ? "Producto actualizado con éxito" : "Producto creado con éxito", "success");
    } catch (error) {
      console.error("Error saving product:", error);
      showToast("Hubo un error al guardar los cambios.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    setConfirmDialog({
      title: "Eliminar Producto",
      message: "¿Estás seguro de eliminar este producto? Se borrará permanentemente de la base de datos.",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'products', id));
          fetchProducts();
          showToast("Producto eliminado", "success");
        } catch (error) {
          console.error("Error deleting product:", error);
          showToast("Error al eliminar el producto", "error");
        }
      }
    });
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

  const addBomItem = () => {
    setFormData({
      ...formData,
      billOfMaterials: [...(formData.billOfMaterials || []), { materialId: '', quantity: 1 }]
    });
  };

  const updateBomItem = (index: number, field: string, value: any) => {
    const updatedBom = [...(formData.billOfMaterials || [])];
    updatedBom[index] = { ...updatedBom[index], [field]: value };
    setFormData({ ...formData, billOfMaterials: updatedBom });
  };

  const removeBomItem = (index: number) => {
    const updatedBom = [...(formData.billOfMaterials || [])];
    updatedBom.splice(index, 1);
    setFormData({ ...formData, billOfMaterials: updatedBom });
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <p>Cargando catálogo...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Gestión del Catálogo</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Nuevo Producto</button>
      </div>

      {isModalOpen && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="glass-panel modal-panel-responsive" style={{ position: 'relative', width: '100%', maxWidth: '700px', borderRadius: 'var(--radius-lg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <button 
              onClick={handleCloseModal} 
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <X size={24} />
            </button>
            <h3 style={{ marginTop: 0, color: 'var(--color-primary)', paddingRight: '2rem' }}>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Nombre</label>
                <input required type="text" className="form-control" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Descripción</label>
                <textarea required className="form-control" style={{ minHeight: '80px', borderRadius: 'var(--radius-sm)' }} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>URL de Imagen</label>
                  <input required type="text" className="form-control" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold' }}>Categorías y Subcategorías</label>
                {dynamicCategories.length === 0 ? <p style={{fontSize: '0.8rem', color: 'var(--color-text-muted)'}}>No hay categorías creadas. Ve a Configuración &gt; Gestión de Categorías.</p> : null}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {dynamicCategories.map(cat => {
                    const isCatChecked = (formData.categories || []).includes(cat.name);
                    return (
                      <div key={cat.id} style={{ flex: '1 1 130px', display: 'flex', flexDirection: 'column', gap: '0.8rem', minWidth: '130px', background: 'var(--color-bg-alt)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                        <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            style={{ display: 'none' }}
                            checked={isCatChecked}
                            onChange={(e) => {
                              const newCats = e.target.checked 
                                ? [...(formData.categories || []), cat.name] 
                                : (formData.categories || []).filter(c => c !== cat.name);
                              setFormData({...formData, categories: newCats});
                            }} 
                          />
                          <span style={{ 
                            padding: '0.4rem 1rem', 
                            borderRadius: '20px', 
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            transition: 'all 0.2s',
                            background: isCatChecked ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: isCatChecked ? '#fff' : 'var(--color-text)',
                            border: `1px solid ${isCatChecked ? 'var(--color-primary)' : 'var(--color-border)'}`
                          }}>
                            {cat.name}
                          </span>
                        </label>
                        
                        {cat.subCategories && cat.subCategories.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {cat.subCategories.map(sub => {
                              const isSubChecked = (formData.subCategories || []).includes(sub);
                              return (
                                <label key={sub} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                                  <input 
                                    type="checkbox" 
                                    style={{ display: 'none' }}
                                    checked={isSubChecked}
                                    onChange={(e) => {
                                      const newSubs = e.target.checked 
                                        ? [...(formData.subCategories || []), sub] 
                                        : (formData.subCategories || []).filter(s => s !== sub);
                                      setFormData({...formData, subCategories: newSubs});
                                    }} 
                                  />
                                  <span style={{ 
                                    padding: '0.2rem 0.8rem', 
                                    borderRadius: '15px', 
                                    fontSize: '0.85rem',
                                    transition: 'all 0.2s',
                                    background: isSubChecked ? 'var(--color-secondary)' : 'var(--color-bg)',
                                    color: isSubChecked ? '#fff' : 'var(--color-text-muted)',
                                    border: `1px solid ${isSubChecked ? 'var(--color-secondary)' : 'var(--color-border)'}`
                                  }}>
                                    {sub}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 120px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: 'var(--color-text-muted)' }}>Precio de Venta ($)</label>
                      <input required={!formData.hasVariations} type="number" className="form-control" value={formData.price || 0} onChange={e => setFormData({...formData, price: Number(e.target.value)})} style={{ padding: '0.4rem' }} />
                    </div>
                    <div style={{ flex: '1 1 120px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem', color: 'var(--color-text-muted)' }}>Precio de Costo ($)</label>
                      <input required={!formData.hasVariations} type="number" className="form-control" value={formData.costPrice || 0} onChange={e => setFormData({...formData, costPrice: Number(e.target.value)})} style={{ padding: '0.4rem' }} />
                    </div>
                  </div>
                ) : (
                  <div>
                    {formData.variations?.map((v) => (
                      <div key={v.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '1rem', flexWrap: 'wrap', background: 'rgba(0,0,0,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
                        <div style={{ flex: '1 1 150px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Tamaño/Ración (ej. 50g)</label>
                          <input required type="text" className="form-control" value={v.name} onChange={e => updateVariation(v.id, 'name', e.target.value)} style={{ padding: '0.3rem' }} />
                        </div>
                        <div style={{ flex: '1 1 80px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Venta ($)</label>
                          <input required type="number" className="form-control" value={v.price || 0} onChange={e => updateVariation(v.id, 'price', Number(e.target.value))} style={{ padding: '0.3rem' }} />
                        </div>
                        <div style={{ flex: '1 1 80px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Costo ($)</label>
                          <input required type="number" className="form-control" value={v.costPrice || 0} onChange={e => updateVariation(v.id, 'costPrice', Number(e.target.value))} style={{ padding: '0.3rem' }} />
                        </div>
                        <button type="button" onClick={() => removeVariation(v.id)} style={{ padding: '0.4rem 0.8rem', background: '#fee2e2', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '4px', cursor: 'pointer', flexShrink: 0 }}>✕ Eliminar</button>
                      </div>
                    ))}
                    <button type="button" onClick={addVariation} style={{ background: 'transparent', border: '1px dashed var(--color-primary)', color: 'var(--color-primary)', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem', marginTop: '0.5rem' }}>+ Agregar Opción</button>
                  </div>
                )}
              </div>

              {/* Bill of Materials Section */}
              <div style={{ border: '1px solid var(--color-border)', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, color: 'var(--color-primary)' }}>Insumos Asociados (BOM)</h4>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                  Añade materias primas a este producto. Se descontarán automáticamente del stock cuando un pedido de este producto sea enviado.
                </p>
                {formData.billOfMaterials?.map((bom, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '1rem', flexWrap: 'wrap', background: 'rgba(0,0,0,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
                    <div style={{ flex: '1 1 200px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Insumo</label>
                      <select required className="form-control" value={bom.materialId} onChange={e => updateBomItem(idx, 'materialId', e.target.value)} style={{ padding: '0.3rem' }}>
                        <option value="">Selecciona un insumo...</option>
                        {materials.map(m => (
                          <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ flex: '1 1 100px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Cantidad (en su unidad)</label>
                      <input required type="number" step="0.01" className="form-control" value={bom.quantity || 1} onChange={e => updateBomItem(idx, 'quantity', Number(e.target.value))} style={{ padding: '0.3rem' }} />
                    </div>
                    <button type="button" onClick={() => removeBomItem(idx)} style={{ padding: '0.4rem 0.8rem', background: '#fee2e2', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '4px', cursor: 'pointer', flexShrink: 0 }}>✕ Eliminar</button>
                  </div>
                ))}
                <button type="button" onClick={addBomItem} style={{ background: 'transparent', border: '1px dashed var(--color-primary)', color: 'var(--color-primary)', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem', marginTop: '0.5rem' }}>+ Agregar Insumo</button>
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

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>, document.body
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
            {paginatedProducts.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '4px', backgroundColor: 'var(--color-bg)' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </td>
                
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                  {product.name}
                </td>
                
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontWeight: 'bold' }}>{product.categories?.length ? product.categories.join(', ') : product.category}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{product.subCategories?.length ? product.subCategories.join(', ') : product.subCategory}</span>
                  </div>
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

      <AdminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      <ConfirmModal
        isOpen={!!confirmDialog}
        title={confirmDialog?.title || ''}
        message={confirmDialog?.message || ''}
        onConfirm={() => {
          if (confirmDialog) confirmDialog.onConfirm();
          setConfirmDialog(null);
        }}
        onCancel={() => setConfirmDialog(null)}
      />
    </div>
  );
};
