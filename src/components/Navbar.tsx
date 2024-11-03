import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Menu', href: '/menu' },
    { label: 'Family Meals', href: '/family-meals' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/"
              className="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
            >
              Flourished Nutrition
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {label}
              </Link>
            ))}
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/order')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Order Now</span>
                </button>
                <button 
                  onClick={logout}
                  className="text-gray-700 dark:text-gray-300 hover:text-emerald-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
