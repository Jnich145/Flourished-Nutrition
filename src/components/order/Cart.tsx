import React from 'react';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../hooks/useCart';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  total 
}) => {
  const TAX_RATE = 0.0825; // 8.25% tax rate
  const deliveryFee = items.length > 0 ? 5.99 : 0;
  const salesTax = total * TAX_RATE;
  const finalTotal = total + salesTax + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center py-12">
        <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 dark:text-gray-400">Add some delicious meals to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Your Cart</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b dark:border-gray-700">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
              <p className="text-emerald-600 dark:text-emerald-400">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-gray-900 dark:text-gray-100">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
                         text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm border-t dark:border-gray-700 pt-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Sales Tax (8.25%)</span>
          <span>${salesTax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 border-t dark:border-gray-700 
                      text-gray-900 dark:text-gray-100">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <button 
        onClick={onCheckout}
        className="w-full btn-primary mt-6"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;