import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, increment, addDoc, getDocs } from 'firebase/firestore';
import { Clock, Package, CheckCircle, XCircle, AlertCircle, MessageCircle, Plus, Trash2 } from 'lucide-react';
import { AdminPagination } from './AdminPagination';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');
  
  // Manual Order State
  const [isCreatingManualOrder, setIsCreatingManualOrder] = useState(false);
  const [manualOrderForm, setManualOrderForm] = useState({ customerName: '', customerEmail: '', items: [] as any[], total: 0 });
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (!window.confirm(`¿Seguro que deseas cambiar el estado a ${newStatus}?`)) return;
    try {
      // Deduct materials if changing to shipped
      if (newStatus === 'shipped' && order.status !== 'shipped') {
        for (const item of order.items) {
          if (item.billOfMaterials && item.billOfMaterials.length > 0) {
            for (const bom of item.billOfMaterials) {
              if (bom.materialId) {
                const quantityToDeduct = bom.quantity * item.quantity;
                const materialRef = doc(db, 'materials', bom.materialId);
                try {
                  await updateDoc(materialRef, {
                    stock: increment(-quantityToDeduct)
                  });
                } catch (e) {
                  console.error("Error deducting material:", e);
                }
              }
            }
          }
        }
      }

      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error al actualizar el estado");
    }
  };

  const handleResolveClaim = async (orderId: string) => {
    if (!window.confirm("¿Marcar este reclamo como resuelto?")) return;
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        'claim.status': 'resolved',
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error resolving claim:", error);
      alert("Error al resolver el reclamo");
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending': return { icon: <Clock size={16} />, color: '#f59e0b', label: 'Pendiente' };
      case 'processing': return { icon: <Package size={16} />, color: '#3b82f6', label: 'Procesando' };
      case 'shipped': return { icon: <Package size={16} />, color: '#8b5cf6', label: 'Enviado' };
      case 'delivered': return { icon: <CheckCircle size={16} />, color: '#10b981', label: 'Entregado' };
      case 'cancelled': return { icon: <XCircle size={16} />, color: '#ef4444', label: 'Cancelado' };
      default: return { icon: <AlertCircle size={16} />, color: '#6b7280', label: 'Desconocido' };
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  // Also create a filter for claims
  const displayedOrders = filter === 'claims' ? orders.filter(o => o.claim && o.claim.status === 'open') : filteredOrders;

  const totalPages = Math.ceil(displayedOrders.length / itemsPerPage);
  const paginatedOrders = displayedOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openManualOrderModal = async () => {
    setIsCreatingManualOrder(true);
    if (availableProducts.length === 0) {
      const q = query(collection(db, 'products'), orderBy('name', 'asc'));
      const snap = await getDocs(q);
      setAvailableProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
  };

  const handleAddManualItem = () => {
    const prod = availableProducts.find(p => p.id === selectedProduct);
    if (!prod) return;
    
    const price = prod.hasVariations && prod.variations?.length > 0 ? prod.variations[0].price : prod.price;
    const name = prod.hasVariations && prod.variations?.length > 0 ? `${prod.name} (${prod.variations[0].name})` : prod.name;

    const newItem = {
      id: prod.id,
      name,
      price: price || 0,
      quantity: selectedQuantity,
      image: prod.image,
      billOfMaterials: prod.billOfMaterials || []
    };

    const newItems = [...manualOrderForm.items, newItem];
    const newTotal = newItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setManualOrderForm({ ...manualOrderForm, items: newItems, total: newTotal });
    setSelectedProduct('');
    setSelectedQuantity(1);
  };

  const removeManualItem = (index: number) => {
    const newItems = [...manualOrderForm.items];
    newItems.splice(index, 1);
    const newTotal = newItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setManualOrderForm({ ...manualOrderForm, items: newItems, total: newTotal });
  };

  const submitManualOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (manualOrderForm.items.length === 0) {
      alert("Debes agregar al menos un producto al pedido.");
      return;
    }

    try {
      const orderData = {
        userId: 'manual_entry',
        userEmail: manualOrderForm.customerEmail || 'No proporcionado',
        userName: manualOrderForm.customerName || 'Cliente Manual',
        items: manualOrderForm.items,
        total: manualOrderForm.total,
        status: 'delivered', // Assume manual orders are delivered directly
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isManual: true
      };
      
      await addDoc(collection(db, 'orders'), orderData);
      
      // Deduct materials if necessary (since status is 'delivered')
      for (const item of manualOrderForm.items) {
        if (item.billOfMaterials && item.billOfMaterials.length > 0) {
          for (const bom of item.billOfMaterials) {
            if (bom.materialId) {
              const quantityToDeduct = bom.quantity * item.quantity;
              const materialRef = doc(db, 'materials', bom.materialId);
              try {
                await updateDoc(materialRef, {
                  stock: increment(-quantityToDeduct)
                });
              } catch (e) {
                console.error("Error deducting material:", e);
              }
            }
          }
        }
      }

      setIsCreatingManualOrder(false);
      setManualOrderForm({ customerName: '', customerEmail: '', items: [], total: 0 });
      alert("Pedido manual creado con éxito");
    } catch (error) {
      console.error("Error creating manual order:", error);
      alert("Hubo un error al crear el pedido");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', margin: 0 }}>Gestión de Pedidos</h2>
        <button className="btn btn-primary" onClick={openManualOrderModal}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} /> Nuevo Pedido Manual
        </button>
      </div>

      {isCreatingManualOrder && (
        <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--color-border)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Registrar Venta Manual</h3>
          <form onSubmit={submitManualOrder}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Nombre del Cliente</label>
                <input type="text" required value={manualOrderForm.customerName} onChange={e => setManualOrderForm({...manualOrderForm, customerName: e.target.value})} className="form-control" placeholder="Ej. Juan Pérez" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Email / Teléfono (Opcional)</label>
                <input type="text" value={manualOrderForm.customerEmail} onChange={e => setManualOrderForm({...manualOrderForm, customerEmail: e.target.value})} className="form-control" placeholder="Contacto" />
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid var(--color-border)' }}>
              <h4 style={{ margin: '0 0 1rem 0' }}>Agregar Productos</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ flex: 2, minWidth: '200px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Producto</label>
                  <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="form-control">
                    <option value="">-- Seleccionar Producto --</option>
                    {availableProducts.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: '100px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Cantidad</label>
                  <input type="number" min="1" value={selectedQuantity} onChange={e => setSelectedQuantity(Number(e.target.value))} className="form-control" />
                </div>
                <button type="button" onClick={handleAddManualItem} disabled={!selectedProduct} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem' }}>Añadir</button>
              </div>

              {manualOrderForm.items.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h5 style={{ margin: '0 0 0.5rem 0' }}>Carrito del Cliente</h5>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {manualOrderForm.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                        <span>{item.quantity}x {item.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                          <button type="button" onClick={() => removeManualItem(idx)} className="icon-btn" style={{ color: '#ef4444' }}><Trash2 size={16} /></button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div style={{ textAlign: 'right', marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Total: ${manualOrderForm.total.toLocaleString('es-AR')}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsCreatingManualOrder(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary" disabled={manualOrderForm.items.length === 0}>Guardar Venta</button>
            </div>
          </form>
        </div>
      )}

      <select 
        className="orders-mobile-filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">Filtro: Todos</option>
        <option value="pending">Filtro: Pendientes</option>
        <option value="processing">Filtro: Procesando</option>
        <option value="shipped">Filtro: Enviados</option>
        <option value="delivered">Filtro: Entregados</option>
        <option value="claims">Filtro: Reclamos</option>
      </select>

      <div className="orders-filter-buttons" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem', whiteSpace: 'nowrap' }}>
        <button onClick={() => setFilter('all')} className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', flexShrink: 0 }}>Todos</button>
        <button onClick={() => setFilter('pending')} className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', flexShrink: 0 }}>Pendientes</button>
        <button onClick={() => setFilter('processing')} className={`btn ${filter === 'processing' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', flexShrink: 0 }}>Procesando</button>
        <button onClick={() => setFilter('shipped')} className={`btn ${filter === 'shipped' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', flexShrink: 0 }}>Enviados</button>
        <button onClick={() => setFilter('delivered')} className={`btn ${filter === 'delivered' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', flexShrink: 0 }}>Entregados</button>
        <button onClick={() => setFilter('claims')} className={`btn ${filter === 'claims' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', flexShrink: 0, background: filter === 'claims' ? '#ef4444' : 'transparent', color: filter === 'claims' ? 'white' : '#ef4444', borderColor: '#ef4444' }}>
          <MessageCircle size={16} style={{ marginRight: '0.3rem' }} /> Reclamos
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {paginatedOrders.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>No hay pedidos para mostrar en esta vista.</p>
        ) : (
          paginatedOrders.map(order => {
            const statusConfig = getStatusConfig(order.status);
            return (
              <div key={order.id} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.5rem' }}>
                <div className="order-card-header">
                  <div>
                    <h3 style={{ margin: '0 0 0.2rem 0' }}>#{order.id.slice(0, 8).toUpperCase()} - {order.userName || 'Cliente Anónimo'}</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{order.userEmail}</p>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="order-card-actions">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.6rem', borderRadius: '20px', background: `${statusConfig.color}20`, color: statusConfig.color, fontWeight: 'bold', fontSize: '0.85rem' }}>
                      {statusConfig.icon}
                      {statusConfig.label}
                    </div>

                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ padding: '0.3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.85rem', background: 'var(--color-bg)' }}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="processing">Procesando</option>
                      <option value="shipped">Enviado</option>
                      <option value="delivered">Entregado</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  <div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {order.items.map((item: any, idx: number) => (
                        <li key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                          <span style={{ flex: 1 }}>{item.quantity}x {item.name} {item.customBlendDetails ? `(Blend: ${item.customBlendDetails.base})` : ''}</span>
                          <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem', fontWeight: 'bold' }}>
                      Total: ${order.total.toLocaleString('es-AR')}
                    </div>
                  </div>
                </div>

                {order.claim && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: order.claim.status === 'open' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', borderLeft: `4px solid ${order.claim.status === 'open' ? '#ef4444' : '#10b981'}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                    <div className="order-claim-header">
                      <div>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: order.claim.status === 'open' ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <AlertCircle size={16} /> Reclamo del Cliente ({order.claim.status === 'open' ? 'Abierto' : 'Resuelto'})
                        </h5>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>"{order.claim.reason}"</p>
                      </div>
                      {order.claim.status === 'open' && (
                        <button onClick={() => handleResolveClaim(order.id)} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>
                          Marcar Resuelto
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <AdminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
