import React from 'react';
import { X, Minus, Plus, ShoppingBag, Save, LogIn } from 'lucide-react';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { useToast } from '../ToastContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, total, clearCart, saveCartForLater, isSaving, editingOrderId, setEditingOrderId } = useCart();
  const { user, login } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (!user) {
      showToast("Por favor, inicia sesión para poder realizar el pedido.", "error");
      return;
    }

    try {
      if (editingOrderId) {
        await updateDoc(doc(db, 'orders', editingOrderId), {
          items: items,
          total: total,
          updatedAt: new Date().toISOString(),
          editedByClient: true,
          status: 'pending' // Regresa a pending para que el admin lo revise
        });

        let message = `Hola! He modificado mi pedido (ID: ${editingOrderId}):%0A%0A`;
        items.forEach(item => {
          message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-AR')})%0A`;
          if (item.customBlendDetails) {
            message += `  Base: ${item.customBlendDetails.base}%0A  Ingredientes: ${item.customBlendDetails.ingredients.join(', ')}%0A`;
          }
          if (item.customBoxDetails) {
            message += `  Caja: ${item.customBoxDetails.boxType}%0A  Contiene: ${item.customBoxDetails.items.map(i => i.name).join(', ')}%0A`;
          }
        });
        
        message += `%0A*Nuevo Total: $${total.toLocaleString('es-AR')}*%0A%0A`;
        message += `Por favor, confirmen cuando puedan. ¡Gracias!`;

        const whatsappUrl = `https://wa.me/5492317472432?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        clearCart();
        setEditingOrderId(null);
        showToast("Cambios guardados con éxito", "success");
        onClose();
        return;
      }

      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        items: items,
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const docRef = await addDoc(collection(db, 'orders'), orderData);

      let message = `Hola! Vengo desde la página de Estrella del Oriente y quisiera realizar el siguiente pedido (ID: ${docRef.id}):%0A%0A`;
      
      items.forEach(item => {
        message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-AR')})%0A`;
        if (item.customBlendDetails) {
          message += `  Base: ${item.customBlendDetails.base}%0A`;
          message += `  Ingredientes: ${item.customBlendDetails.ingredients.join(', ')}%0A`;
        }
        if (item.customBoxDetails) {
          message += `  Caja: ${item.customBoxDetails.boxType}%0A`;
          message += `  Contiene: ${item.customBoxDetails.items.map(i => i.name).join(', ')}%0A`;
        }
      });
      
      message += `%0A*Total: $${total.toLocaleString('es-AR')}*%0A%0A`;
      message += `¿Me podrían confirmar si tienen stock y cómo coordinamos el pago/envío? Muchas gracias!`;

      const whatsappUrl = `https://wa.me/5492317472432?text=${message}`;
      window.open(whatsappUrl, '_blank');
      
      clearCart();
      showToast("¡Pedido realizado con éxito!", "success");
      onClose();
    } catch (error) {
      console.error("Error creating order", error);
      showToast("Hubo un error al procesar tu pedido. Inténtalo nuevamente.", "error");
    }
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()} className="glass-panel">
        <div style={headerStyle}>
          <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Tu Pedido</h2>
          <button onClick={onClose} className="icon-btn"><X /></button>
        </div>

        <div style={contentStyle}>
          {items.length === 0 ? (
            <div className="text-center" style={{ padding: '3rem 0', color: 'var(--color-text-muted)' }}>
              <ShoppingBag size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {items.map(item => (
                <li key={item.cartItemId} style={itemStyle}>
                  <img src={item.image} alt={item.name} style={imgStyle} />
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{item.name}</h4>
                    {item.customBlendDetails && <span style={{fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem'}}>Base: {item.customBlendDetails.base}</span>}
                    {item.customBoxDetails && <span style={{fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem'}}>{item.customBoxDetails.items.length} items seleccionados</span>}
                    <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      ${item.price.toLocaleString('es-AR')}
                    </p>
                  </div>
                  <div style={quantityStyle}>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} style={qBtnStyle}><Minus size={14}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} style={qBtnStyle}><Plus size={14}/></button>
                  </div>
                  <button onClick={() => removeFromCart(item.cartItemId)} className="icon-btn" style={{ color: 'var(--color-text-muted)' }}>
                    <X size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div style={footerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>

            {!user ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                  Por favor, inicia sesión para poder finalizar tu pedido o guardarlo para más tarde.
                </p>
                <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={handleLogin}>
                  <LogIn size={20} />
                  Iniciar Sesión con Google
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={handleCheckout}>
                  {editingOrderId ? 'Guardar Cambios y Notificar' : 'Confirmar y Pedir por WhatsApp'}
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--color-bg-alt)' }} 
                  onClick={saveCartForLater}
                  disabled={isSaving}
                >
                  <Save size={20} />
                  {isSaving ? 'Guardando...' : 'Guardar para después'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Inline styles for modal
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: 2000,
  display: 'flex',
  justifyContent: 'flex-end'
};

const modalStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '400px',
  height: '100%',
  backgroundColor: 'var(--color-surface)',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '-4px 0 24px rgba(0,0,0,0.1)'
};

const headerStyle: React.CSSProperties = {
  padding: '1.5rem',
  borderBottom: '1px solid var(--color-border)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const contentStyle: React.CSSProperties = {
  flexGrow: 1,
  overflowY: 'auto',
  padding: '1.5rem'
};

const footerStyle: React.CSSProperties = {
  padding: '1.5rem',
  borderTop: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-bg-alt)'
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '1.5rem',
  paddingBottom: '1.5rem',
  borderBottom: '1px solid var(--color-border)'
};

const imgStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  objectFit: 'cover',
  borderRadius: 'var(--radius-sm)'
};

const quantityStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  padding: '0.2rem 0.5rem'
};

const qBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.2rem',
  color: 'var(--color-text)',
  cursor: 'pointer'
};
