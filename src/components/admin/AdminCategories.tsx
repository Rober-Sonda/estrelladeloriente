import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<DynamicCategory>>({});

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const cats: DynamicCategory[] = [];
      querySnapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() } as DynamicCategory);
      });
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName) return;
    try {
      await addDoc(collection(db, 'categories'), {
        name: newCategoryName,
        slug: newCategoryName.toLowerCase().replace(/ /g, '-'),
        subCategories: []
      });
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleAddSubcategory = async (catId: string, currentSubs: string[]) => {
    const newSub = window.prompt('Nombre de la nueva subcategoría:');
    if (!newSub) return;
    try {
      await updateDoc(doc(db, 'categories', catId), {
        subCategories: [...currentSubs, newSub.toLowerCase()]
      });
      fetchCategories();
    } catch (error) {
      console.error("Error adding subcategory:", error);
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
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>Gestión de Categorías</h2>
      </div>

      <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
        <input 
          type="text" 
          placeholder="Nombre de nueva categoría principal" 
          value={newCategoryName} 
          onChange={e => setNewCategoryName(e.target.value)} 
          className="search-input"
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary">Agregar Categoría</button>
      </form>

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
                <button onClick={() => handleAddSubcategory(cat.id, cat.subCategories)} style={{ background: 'transparent', border: '1px dashed var(--color-primary)', color: 'var(--color-primary)', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.9rem', cursor: 'pointer' }}>
                  + Agregar Subcategoría
                </button>
              </div>
            </div>
          </div>
        ))}
        {categories.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>No hay categorías. Crea la primera.</p>}
      </div>
    </div>
  );
};
