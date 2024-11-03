import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
}

const Hero = ({ onOrderNow }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-6">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Fresh & Nutritious</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Nutrition You Can <br />
            <span className="text-emerald-400">Flourish</span> From
          </h1>
          
          <p className="text-lg text-gray-200 mb-8 max-w-2xl">
            Experience the perfect blend of taste and nutrition with our chef-crafted, 
            personalized meal plans. Fresh ingredients, expert preparation, delivered to your door.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onOrderNow}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <span>Order Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#menu"
              className="btn-secondary"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
