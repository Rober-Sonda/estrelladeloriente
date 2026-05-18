import React, { useState } from 'react';

import { db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { catalogProducts } from '../data/products';
import { AdminCatalog } from '../components/admin/AdminCatalog';
import { AdminCategories } from '../components/admin/AdminCategories';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminMaterials } from '../components/admin/AdminMaterials';
import { AdminClients } from '../components/admin/AdminClients';
import { AIAssistant } from '../components/admin/AIAssistant';
import { useToast } from '../ToastContext';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finances' | 'catalog' | 'categories' | 'settings' | 'orders' | 'materials' | 'clients' | 'assistant'>('orders');
  const [isMigrating, setIsMigrating] = useState(false);
  const { showToast } = useToast();

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
      showToast('¡Migración de productos completada con éxito!', 'success');
    } catch (error) {
      console.error("Error migrating data:", error);
      showToast('Hubo un error en la migración.', 'error');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ margin: 0 }}>Dashboard Administrativo</h1>
      </div>

      <div className="admin-layout">

        {/* Sidebar Nav */}
        <div className="admin-sidebar glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div className="admin-mobile-nav">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
            >
              <option value="orders">Pedidos y Reclamos</option>
              <option value="finances">Resumen Financiero</option>
              <option value="catalog">Catálogo de Productos</option>
              <option value="categories">Categorías</option>
              <option value="materials">Insumos y Materias Primas</option>
              <option value="clients">Clientes</option>
              <option value="assistant">BotAsistente IA</option>
              <option value="settings">Configuración del Sitio</option>
            </select>
          </div>

          <ul className="admin-nav-list">
            <li>
              <button
                onClick={() => setActiveTab('orders')}
                className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              >
                Pedidos y Reclamos
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('finances')}
                className={`admin-nav-btn ${activeTab === 'finances' ? 'active' : ''}`}
              >
                Resumen Financiero
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('catalog')}
                className={`admin-nav-btn ${activeTab === 'catalog' ? 'active' : ''}`}
              >
                Catálogo de Productos
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('categories')}
                className={`admin-nav-btn ${activeTab === 'categories' ? 'active' : ''}`}
              >
                Categorías
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('materials')}
                className={`admin-nav-btn ${activeTab === 'materials' ? 'active' : ''}`}
              >
                Insumos y Materias Primas
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('clients')}
                className={`admin-nav-btn ${activeTab === 'clients' ? 'active' : ''}`}
              >
                Clientes
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('assistant')}
                className={`admin-nav-btn ${activeTab === 'assistant' ? 'active' : ''}`}
              >
                <img src="/logo-transparent.png" alt="Bot" className="admin-nav-icon" /> Asistente IA
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              >
                Configuración del Sitio
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', minHeight: '600px', minWidth: 0, overflowX: 'hidden' }}>
          {activeTab === 'finances' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Resumen Financiero</h2>
              <p style={{ color: 'var(--color-text-muted)' }}>Módulo en construcción. Aquí verás los ingresos y egresos del emprendimiento.</p>
            </div>
          )}

          {activeTab === 'orders' && (
            <AdminOrders />
          )}

          {activeTab === 'catalog' && (
            <AdminCatalog />
          )}

          {activeTab === 'categories' && (
            <AdminCategories />
          )}

          {activeTab === 'materials' && (
            <AdminMaterials />
          )}

          {activeTab === 'clients' && (
            <AdminClients />
          )}

          {activeTab === 'assistant' && (
            <AIAssistant />
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
