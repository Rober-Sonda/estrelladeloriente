import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { catalogProducts } from '../data/products';
import { AdminCatalog } from '../components/admin/AdminCatalog';
import { AdminCategories } from '../components/admin/AdminCategories';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'finances' | 'catalog' | 'categories' | 'settings'>('finances');
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigration = async () => {
    if (!window.confirm('¿Estás seguro de migrar los productos estáticos a Firestore? Esto podría duplicar datos si ya lo hiciste.')) return;
    setIsMigrating(true);
    try {
      const productsRef = collection(db, 'products');
      for (const product of catalogProducts) {
        // Use the static ID as the document ID to avoid duplicates if run multiple times
        await setDoc(doc(productsRef, product.id), {
          ...product,
          costPrice: product.costPrice || 0,
          hasVariations: product.hasVariations || false,
          variations: product.variations || [],
          isDiscontinued: false,
          isOnSale: false,
          salePrice: null,
          createdAt: new Date().toISOString()
        });
      }

      // Seed default categories
      const categoriesRef = collection(db, 'categories');
      const defaultCategories = [
        { id: 'blend', name: 'Blends', slug: 'blend', subCategories: ['té', 'mate', 'ambos'] },
        { id: 'hierba', name: 'Hierbas Puras', slug: 'hierba', subCategories: ['digestiva', 'relajante', 'refrescante', 'general'] },
        { id: 'bazar', name: 'Accesorios', slug: 'bazar', subCategories: [] }
      ];

      for (const cat of defaultCategories) {
        await setDoc(doc(categoriesRef, cat.id), cat);
      }
      alert('¡Migración de productos completada con éxito!');
    } catch (error) {
      console.error("Error migrating data:", error);
      alert('Hubo un error en la migración.');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ margin: 0 }}>Dashboard Administrativo</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{user?.email}</span>
          <button className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }} onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="admin-layout" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Sidebar Nav */}
        <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <button 
                onClick={() => setActiveTab('finances')}
                style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', background: activeTab === 'finances' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'finances' ? '#fff' : 'var(--color-text)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === 'finances' ? '600' : '400' }}
              >
                Resumen Financiero
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('catalog')}
                style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', background: activeTab === 'catalog' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'catalog' ? '#fff' : 'var(--color-text)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === 'catalog' ? '600' : '400' }}
              >
                Catálogo de Productos
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('categories')}
                style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', background: activeTab === 'categories' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'categories' ? '#fff' : 'var(--color-text)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === 'categories' ? '600' : '400' }}
              >
                Categorías
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')}
                style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', background: activeTab === 'settings' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'settings' ? '#fff' : 'var(--color-text)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: activeTab === 'settings' ? '600' : '400' }}
              >
                Configuración del Sitio
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', minHeight: '600px' }}>
          {activeTab === 'finances' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Resumen Financiero</h2>
              <p style={{ color: 'var(--color-text-muted)' }}>Módulo en construcción. Aquí verás los ingresos y egresos del emprendimiento.</p>
            </div>
          )}
          
          {activeTab === 'catalog' && (
            <AdminCatalog />
          )}

          {activeTab === 'categories' && (
            <AdminCategories />
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Configuración del Sitio</h2>
              <p style={{ color: 'var(--color-text-muted)' }}>Módulo en construcción. Aquí editarás el contenido del Footer.</p>
              
              <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255,0,0,0.05)', border: '1px solid rgba(255,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Acciones de Desarrollador</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Usá este botón por única vez para cargar todos los productos que están escritos en el código directamente a la base de datos de Firebase.
                </p>
                <button 
                  className="btn btn-primary" 
                  onClick={handleMigration} 
                  disabled={isMigrating}
                >
                  {isMigrating ? 'Migrando datos...' : 'Ejecutar Migración de Catálogo a Firebase'}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
