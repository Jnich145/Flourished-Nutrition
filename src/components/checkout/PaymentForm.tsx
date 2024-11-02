import React from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentFormProps {
  onBack: () => void;
  onNext: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onBack, onNext }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            required
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="cvv"
              placeholder="123"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
          Name on Card
        </label>
        <input
          type="text"
          id="nameOnCard"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>

      <div className="flex justify-between">
        <button 
          type="button" 
          onClick={onBack}
          className="btn-secondary"
        >
          Back
        </button>
        <button type="submit" className="btn-primary">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;