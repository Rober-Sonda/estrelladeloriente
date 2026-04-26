import React, { createContext, useContext, useState } from 'react';
import type { Product } from './data/products';

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
  removeFromCart: (cartItemId: string) => void; // Uses a unique cart item ID
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate a unique ID for cart items to distinguish between multiple custom items
const generateCartId = () => Math.random().toString(36).substr(2, 9);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1, customBlend?: CustomBlendDetails, customBox?: CustomBoxDetails) => {
    setItems(prev => {
      // If it's a standard product, we can group it
      if (!customBlend && !customBox) {
        const existing = prev.find(item => item.id === product.id && !item.customBlendDetails && !item.customBoxDetails);
        if (existing) {
          return prev.map(item => 
            item.cartItemId === existing.cartItemId ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
      }
      
      // If custom or new, add as a new row
      return [...prev, { ...product, quantity, customBlendDetails: customBlend, customBoxDetails: customBox, cartItemId: generateCartId() }];
    });
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
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
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
