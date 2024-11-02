import { useState } from 'react';
import type { Meal } from '../types/meal';

export interface CartItem extends Meal {
  quantity: number;
}

export const TAX_RATE = 0.0825; // 8.25% tax rate
export const DELIVERY_FEE = 5.99;

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (meal: Meal) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === meal.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...meal, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTaxAmount = () => {
    return getTotal() * TAX_RATE;
  };

  const getFinalTotal = () => {
    const subtotal = getTotal();
    const tax = getTaxAmount();
    const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
    return subtotal + tax + deliveryFee;
  };

  return {
    items,
    addToCart,
    updateQuantity,
    removeItem,
    getTotal,
    getTaxAmount,
    getFinalTotal,
  };
};