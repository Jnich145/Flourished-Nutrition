import React from 'react';
import { ClipboardList, ChefHat, Truck, Apple } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const Step: React.FC<StepProps> = ({ icon, title, description, delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div 
      ref={ref}
      className={`flex flex-col items-center text-center transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const { ref: sectionRef, isInView: sectionIsInView } = useInView({ threshold: 0.1 });

  const steps = [
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: 'Choose Your Plan',
      description: 'Select from our variety of nutritious meal plans tailored to your goals.',
    },
    {
      icon: <Apple className="w-8 h-8" />,
      title: 'Customize Meals',
      description: 'Personalize your meals based on your dietary preferences and restrictions.',
    },
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: 'We Cook Fresh',
      description: 'Our chefs prepare your meals with fresh, high-quality ingredients.',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Enjoy convenient delivery right to your doorstep.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${
            sectionIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-title">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started with Flourished Nutrition is easy. Follow these simple steps 
            to begin your journey to better health.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Step key={index} {...step} delay={index * 200} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;