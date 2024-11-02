import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-50 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span 
              className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              Flourished Nutrition
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              onClick={() => onNavigate('home')}
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <a 
              onClick={() => onNavigate('menu')}
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Menu
            </a>
            <a 
              onClick={() => onNavigate('family-meals')}
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Family Meals
            </a>
            <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</a>
            <ThemeToggle />
            <button 
              onClick={() => onNavigate('order')}
              className="btn-primary flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Order Now</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800">
            <a 
              onClick={() => {
                onNavigate('home');
                setIsOpen(false);
              }}
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              Home
            </a>
            <a 
              onClick={() => {
                onNavigate('menu');
                setIsOpen(false);
              }}
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              Menu
            </a>
            <a 
              onClick={() => {
                onNavigate('family-meals');
                setIsOpen(false);
              }}
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              Family Meals
            </a>
            <a href="#how-it-works" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">How It Works</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">About</a>
            <button 
              onClick={() => {
                onNavigate('order');
                setIsOpen(false);
              }}
              className="w-full btn-primary mt-4 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;