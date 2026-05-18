import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from './data/products';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useToast } from './ToastContext';

export type { Product };

export interface CustomBlendDetails {
  base: string;
  ingredients: string[];
}

export interface CustomBoxDetails {
  boxType: string;
  items: Product[];
}

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
  customBlendDetails?: CustomBlendDetails;
  customBoxDetails?: CustomBoxDetails;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, customBlend?: CustomBlendDetails, customBox?: CustomBoxDetails) => void;
  removeFromCart: (cartItemId: string) => void; 
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  saveCartForLater: () => Promise<void>;
  isSaving: boolean;
  editingOrderId: string | null;
  setEditingOrderId: (id: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const generateCartId = () => Math.random().toString(36).substr(2, 9);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const { user } = useAuth();
  const { showToast } = useToast();

  // Al iniciar sesión, intentamos cargar el carrito guardado
  useEffect(() => {
    const loadCartFromCloud = async () => {
      if (user) {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            const savedItems = cartSnap.data().items as CartItem[];
            if (savedItems && savedItems.length > 0) {
              setItems(savedItems);
            }
          }
        } catch (error) {
          console.error("Error cargando el carrito desde la nube:", error);
        }
      } else {
        // Opcional: si el usuario hace logout, limpiamos el carrito local
        setItems([]);
      }
    };
    
    loadCartFromCloud();
  }, [user]);

  const saveCartForLater = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const cartRef = doc(db, 'carts', user.uid);
      
      // JSON.stringify automáticamente elimina cualquier propiedad que sea 'undefined', 
      // lo cual previene que Firestore tire error por 'Unsupported field value: undefined'.
      const cleanItems = JSON.parse(JSON.stringify(items));
      
      await setDoc(cartRef, {
        items: cleanItems,
        updatedAt: new Date().toISOString()
      });
      showToast('¡Tu pedido ha sido guardado exitosamente!', 'success');
    } catch (error) {
      console.error("Error guardando el carrito:", error);
      showToast('Hubo un error al intentar guardar tu pedido.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const addToCart = (product: Product, quantity = 1, customBlend?: CustomBlendDetails, customBox?: CustomBoxDetails) => {
    setItems(prev => {
      if (!customBlend && !customBox) {
        const existing = prev.find(item => item.id === product.id && !item.customBlendDetails && !item.customBoxDetails);
        if (existing) {
          return prev.map(item => 
            item.cartItemId === existing.cartItemId ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
      }
      const newItem: CartItem = { ...product, quantity, cartItemId: generateCartId() };
      if (customBlend) newItem.customBlendDetails = customBlend;
      if (customBox) newItem.customBoxDetails = customBox;
      
      return [...prev, newItem];
    });

    if (!user) {
      showToast(`¡Agregado al carrito!\n\nNota: Recuerda iniciar sesión con tu cuenta de Google para poder confirmar o guardar tu pedido.`, 'info');
    } else {
      showToast(`¡Agregado al carrito exitosamente!`, 'success');
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prev => prev.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, saveCartForLater, isSaving, editingOrderId, setEditingOrderId }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
