import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { createPortal } from 'react-dom';
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';

export interface DynamicCategory {
  id: string;
  name: string;
  slug: string;
  subCategories: string[];
}

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<DynamicCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const cats: DynamicCategory[] = [];
      querySnapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() } as DynamicCategory);
      });
      setCategories(cats);
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      alert("Error interno al cargar la base de datos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      alert("Por favor escribí el nombre de la categoría antes de apretar Agregar.");
      return;
    }
    try {
      await addDoc(collection(db, 'categories'), {
        name: newCategoryName,
        slug: newCategoryName.toLowerCase().replace(/ /g, '-'),
        subCategories: []
      });
      setNewCategoryName('');
      setIsModalOpen(false);
      fetchCategories();
      alert('Categoría agregada con éxito');
    } catch (error: any) {
      console.error("Error adding category:", error);
      alert('Hubo un error al agregar la categoría: ' + error.message);
    }
  };

  const [subModalCatId, setSubModalCatId] = useState<string | null>(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');

  const submitSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subModalCatId || !newSubCategoryName.trim()) {
      alert("Por favor escribí el nombre de la subcategoría.");
      return;
    }
    
    const cat = categories.find(c => c.id === subModalCatId);
    if (!cat) return;

    try {
      await updateDoc(doc(db, 'categories', subModalCatId), {
        subCategories: [...cat.subCategories, newSubCategoryName.trim().toLowerCase()]
      });
      setNewSubCategoryName('');
      setSubModalCatId(null);
      fetchCategories();
      alert('Subcategoría agregada con éxito');
    } catch (error: any) {
      console.error("Error adding subcategory:", error);
      alert('Hubo un error al agregar la subcategoría: ' + error.message);
    }
  };

  const handleDeleteSubcategory = async (catId: string, currentSubs: string[], subToDelete: string) => {
    if (!window.confirm(`¿Eliminar la subcategoría "${subToDelete}"?`)) return;
    try {
      await updateDoc(doc(db, 'categories', catId), {
        subCategories: currentSubs.filter(sub => sub !== subToDelete)
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar esta categoría completa?")) return;
    try {
      await deleteDoc(doc(db, 'categories', id));
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (loading) return <p>Cargando categorías...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', margin: 0 }}>Gestión de Categorías</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Nueva Categoría</button>
      </div>

      {isModalOpen && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--color-primary)' }}>Nueva Categoría</h3>
            <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Nombre de la Categoría</label>
                <input 
                  type="text" 
                  placeholder="Ej. Blends, Accesorios..." 
                  value={newCategoryName} 
                  onChange={e => setNewCategoryName(e.target.value)} 
                  className="search-input"
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>, document.body
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {categories.map(cat => (
          <div key={cat.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', background: 'var(--color-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '1px' }}>{cat.name}</h3>
              <button onClick={() => handleDeleteCategory(cat.id)} style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer', fontSize: '0.8rem' }}>Eliminar Categoría</button>
            </div>
            
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>SUBCATEGORÍAS:</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {cat.subCategories.map(sub => (
                  <div key={sub} style={{ background: 'var(--color-bg)', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--color-border)' }}>
                    {sub}
                    <button onClick={() => handleDeleteSubcategory(cat.id, cat.subCategories, sub)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 0 }}>✕</button>
                  </div>
                ))}
                <button onClick={() => setSubModalCatId(cat.id)} style={{ background: 'transparent', border: '1px dashed var(--color-primary)', color: 'var(--color-primary)', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.9rem', cursor: 'pointer' }}>
                  + Agregar Subcategoría
                </button>
              </div>
            </div>
          </div>
        ))}
        {categories.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>No hay categorías. Crea la primera.</p>}
      </div>

      {subModalCatId && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--color-primary)' }}>Nueva Subcategoría</h3>
            <form onSubmit={submitSubcategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Nombre de la Subcategoría</label>
                <input 
                  type="text" 
                  placeholder="Ej. Digestiva, Refrescante..." 
                  value={newSubCategoryName} 
                  onChange={e => setNewSubCategoryName(e.target.value)} 
                  className="search-input"
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSubModalCatId(null)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>, document.body
      )}

    </div>
  );
};
