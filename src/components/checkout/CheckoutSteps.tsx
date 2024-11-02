import React from 'react';
import { Check } from 'lucide-react';

interface StepProps {
  step: number;
  currentStep: number;
  title: string;
}

const Step: React.FC<StepProps> = ({ step, currentStep, title }) => {
  const isCompleted = currentStep > step;
  const isCurrent = currentStep === step;

  return (
    <div className="flex items-center">
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-full 
        ${isCompleted ? 'bg-emerald-600' : isCurrent ? 'bg-emerald-600' : 'bg-gray-200'}
        ${isCompleted || isCurrent ? 'text-white' : 'text-gray-500'}
      `}>
        {isCompleted ? (
          <Check className="w-5 h-5" />
        ) : (
          <span>{step}</span>
        )}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900">{title}</p>
      </div>
    </div>
  );
};

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol className="space-y-6">
        <li className="flex items-center justify-between">
          <Step step={1} currentStep={currentStep} title="Delivery Information" />
          {currentStep > 1 && <div className="h-0.5 w-full bg-emerald-600 mx-4" />}
        </li>
        <li className="flex items-center justify-between">
          <Step step={2} currentStep={currentStep} title="Payment Details" />
          {currentStep > 2 && <div className="h-0.5 w-full bg-emerald-600 mx-4" />}
        </li>
        <li>
          <Step step={3} currentStep={currentStep} title="Order Confirmation" />
        </li>
      </ol>
    </nav>
  );
};

export default CheckoutSteps;