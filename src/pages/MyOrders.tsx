import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';
import { Package, XCircle, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '../ToastContext';

export const MyOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar este pedido?')) return;
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      });
      showToast('Pedido cancelado exitosamente', 'success');
      fetchOrders();
    } catch (error) {
      console.error("Error cancelling order:", error);
      showToast('Hubo un error al cancelar el pedido', 'error');
    }
  };

  const handleCreateClaim = async (orderId: string) => {
    const claimReason = window.prompt('Describe brevemente el motivo de tu reclamo:');
    if (!claimReason) return;
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        claim: {
          reason: claimReason,
          status: 'open',
          createdAt: new Date().toISOString()
        },
        updatedAt: new Date().toISOString()
      });
      showToast('Reclamo enviado exitosamente', 'success');
      fetchOrders();
    } catch (error) {
      console.error("Error creating claim:", error);
      showToast('Hubo un error al enviar el reclamo', 'error');
    }
  };

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'pending': return { icon: <Clock size={16}/>, color: '#f59e0b', label: 'Pendiente' };
      case 'processing': return { icon: <Package size={16}/>, color: '#3b82f6', label: 'Procesando' };
      case 'shipped': return { icon: <Package size={16}/>, color: '#8b5cf6', label: 'Enviado' };
      case 'delivered': return { icon: <CheckCircle size={16}/>, color: '#10b981', label: 'Entregado' };
      case 'cancelled': return { icon: <XCircle size={16}/>, color: '#ef4444', label: 'Cancelado' };
      default: return { icon: <AlertCircle size={16}/>, color: '#6b7280', label: 'Desconocido' };
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ paddingTop: '100px', minHeight: '60vh', textAlign: 'center' }}>
        <h2>Debes iniciar sesión para ver tus pedidos.</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '4rem' }}>
      <h1 className="section-title">Mis Pedidos</h1>
      
      {loading ? (
        <p>Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <Package size={48} style={{ opacity: 0.5, marginBottom: '1rem', margin: '0 auto' }} />
          <h3>No tienes pedidos todavía</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Cuando realices una compra, aparecerá aquí.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map(order => {
            const statusConfig = getStatusConfig(order.status);
            return (
              <div key={order.id} className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>Pedido #{order.id.slice(0,8).toUpperCase()}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      Fecha: {new Date(order.createdAt).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '20px', background: `${statusConfig.color}20`, color: statusConfig.color, fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {statusConfig.icon}
                    {statusConfig.label}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>Artículos:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {order.items.map((item: any, idx: number) => (
                      <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px dashed var(--color-border)' }}>
                        <span>{item.quantity}x {item.name}</span>
                        <span style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span style={{ color: 'var(--color-primary)' }}>${order.total.toLocaleString('es-AR')}</span>
                  </div>
                </div>

                {order.claim && (
                  <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: '1.5rem' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={16} /> Reclamo Abierto
                    </h5>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{order.claim.reason}</p>
                    <small style={{ color: 'var(--color-text-muted)' }}>Estado: {order.claim.status === 'open' ? 'En revisión' : 'Resuelto'}</small>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  {order.status === 'pending' && (
                    <button onClick={() => handleCancelOrder(order.id)} className="btn btn-secondary" style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444' }}>
                      Cancelar Pedido
                    </button>
                  )}
                  {order.status !== 'pending' && order.status !== 'cancelled' && !order.claim && (
                    <button onClick={() => handleCreateClaim(order.id)} className="btn btn-secondary" style={{ background: 'transparent', border: '1px solid #f59e0b', color: '#f59e0b' }}>
                      Abrir Reclamo
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
