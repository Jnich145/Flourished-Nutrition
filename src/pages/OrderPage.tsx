import React from 'react';
import MealSelection from '../components/order/MealSelection';
import Cart from '../components/order/Cart';
import { useCart } from '../hooks/useCart';

interface OrderPageProps {
  onCheckout: () => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ onCheckout }) => {
  const { items, addToCart, updateQuantity, removeItem, getTotal } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Order Now</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MealSelection onAddToCart={addToCart} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Cart
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onCheckout={onCheckout}
                total={getTotal()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;