import React from 'react';
import { CheckCircle, Package, Calendar } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const OrderConfirmation = () => {
  const { items, getTotal, getTaxAmount, getFinalTotal } = useCart();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);

  const subtotal = getTotal();
  const tax = getTaxAmount();
  const deliveryFee = items.length > 0 ? 5.99 : 0;
  const total = getFinalTotal();

  return (
    <div className="text-center">
      <div className="mb-8">
        <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">
          Thank you for your order. We'll notify you when your meals are on the way.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center mb-4">
          <Package className="w-5 h-5 text-emerald-600 mr-2" />
          <span className="font-medium">Order #{orderNumber}</span>
        </div>
        <div className="flex items-center justify-center mb-6">
          <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
          <span className="font-medium">
            Estimated Delivery: {estimatedDelivery.toLocaleDateString()}
          </span>
        </div>

        <div className="space-y-2 text-sm border-t pt-4 max-w-xs mx-auto text-left">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax (8.25%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          We've sent a confirmation email with your order details.
        </p>
        <button className="btn-primary">
          Track Your Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;