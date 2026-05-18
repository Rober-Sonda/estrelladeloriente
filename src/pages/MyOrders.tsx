import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { Package, XCircle, AlertCircle, Clock, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from '../ToastContext';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../components/ConfirmModal';

export const MyOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { clearCart, addToCart, setEditingOrderId } = useCart();
  const navigate = useNavigate();
  const [confirmDialog, setConfirmDialog] = useState<{ message: string, title: string, onConfirm: () => void } | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid)
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCancelOrder = async (orderId: string) => {
    setConfirmDialog({
      title: "Cancelar Pedido",
      message: "¿Estás seguro de que deseas cancelar este pedido?",
      onConfirm: async () => {
        try {
          await updateDoc(doc(db, 'orders', orderId), {
            status: 'cancelled',
            updatedAt: new Date().toISOString()
          });
          showToast('Pedido cancelado exitosamente', 'success');
        } catch (error) {
          console.error("Error cancelling order:", error);
          showToast('Hubo un error al cancelar el pedido', 'error');
        }
      }
    });
  };

  const handleDeleteOrder = async (orderId: string) => {
    setConfirmDialog({
      title: "Eliminar Pedido",
      message: "¿Estás seguro de eliminar este pedido permanentemente? Esta acción no se puede deshacer.",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'orders', orderId));
          showToast('Pedido eliminado', 'success');
        } catch (error) {
          console.error("Error deleting order:", error);
          showToast('Hubo un error al eliminar', 'error');
        }
      }
    });
  };

  const handleEditOrder = async (order: any) => {
    setConfirmDialog({
      title: "Editar Pedido",
      message: "Para editar, cargaremos los productos en tu carrito. Podrás modificarlos y guardar los cambios. ¿Deseas continuar?",
      onConfirm: async () => {
        try {
          clearCart();
          order.items.forEach((item: any) => {
            addToCart(item, item.quantity, item.customBlendDetails, item.customBoxDetails);
          });
          if (setEditingOrderId) setEditingOrderId(order.id);
          showToast('Pedido cargado en el carrito. Puedes modificarlo y guardar los cambios.', 'success');
          navigate('/catalogo');
        } catch (error) {
          console.error("Error editing order:", error);
          showToast('Error al intentar editar el pedido', 'error');
        }
      }
    });
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
              <div key={order.id} className="glass-panel order-history-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(197, 168, 128, 0.3)', boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.4rem 0', fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)' }}>
                      Pedido <span style={{ color: 'var(--color-secondary)' }}>#{order.id.slice(0,8).toUpperCase()}</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      <Clock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                      {new Date(order.createdAt).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '20px', background: `${statusConfig.color}20`, color: statusConfig.color, fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {statusConfig.icon}
                    {statusConfig.label}
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.1rem' }}>Resumen de Artículos</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', background: 'rgba(255, 255, 255, 0.5)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(197, 168, 128, 0.15)' }}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                        ) : (
                          <div style={{ width: '50px', height: '50px', background: 'var(--color-border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Package size={24} color="var(--color-text-muted)" />
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <h5 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem', color: 'var(--color-text)' }}>{item.name}</h5>
                          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Cantidad: {item.quantity} × ${item.price.toLocaleString('es-AR')}</span>
                        </div>
                        <div style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                          ${(item.price * item.quantity).toLocaleString('es-AR')}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid rgba(197, 168, 128, 0.2)' }}>
                    <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Total a Pagar</span>
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>${order.total.toLocaleString('es-AR')}</span>
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

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'flex-end', flexWrap: 'wrap', paddingTop: '1rem' }}>
                  {(order.status === 'pending' || order.status === 'processing') && (
                    <>
                      <button onClick={() => handleEditOrder(order)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', display: 'flex', gap: '0.4rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600 }}>
                        <Edit size={16} /> Editar
                      </button>
                      <button onClick={() => handleDeleteOrder(order.id)} style={{ background: 'none', border: 'none', color: '#ef4444', display: 'flex', gap: '0.4rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600 }}>
                        <Trash2 size={16} /> Eliminar
                      </button>
                    </>
                  )}
                  {order.status === 'cancelled' && (
                    <button onClick={() => handleDeleteOrder(order.id)} style={{ background: 'none', border: 'none', color: '#ef4444', display: 'flex', gap: '0.4rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600 }}>
                      <Trash2 size={16} /> Eliminar
                    </button>
                  )}
                  {order.status !== 'pending' && order.status !== 'cancelled' && !order.claim && (
                    <button onClick={() => handleCreateClaim(order.id)} style={{ background: 'none', border: 'none', color: '#f59e0b', display: 'flex', gap: '0.4rem', alignItems: 'center', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600 }}>
                      <AlertCircle size={16} /> Iniciar Reclamo
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {confirmDialog && (
        <ConfirmModal 
          isOpen={!!confirmDialog}
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={() => {
            confirmDialog.onConfirm();
            setConfirmDialog(null);
          }}
          onCancel={() => setConfirmDialog(null)}
        />
      )}
    </div>
  );
};
