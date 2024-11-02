import React, { useState } from 'react';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import DeliveryForm from '../components/checkout/DeliveryForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderConfirmation from '../components/checkout/OrderConfirmation';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="mb-8">
          <CheckoutSteps currentStep={currentStep} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {currentStep === 1 && (
            <DeliveryForm onNext={handleNext} />
          )}
          {currentStep === 2 && (
            <PaymentForm onBack={handleBack} onNext={handleNext} />
          )}
          {currentStep === 3 && (
            <OrderConfirmation />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;