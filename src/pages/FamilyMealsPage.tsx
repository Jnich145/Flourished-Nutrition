import React from 'react';
import { Heart, Users, Apple, Clock } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import type { Meal } from '../types/meal';
import { familyMeals } from '../data/familyMeals';

interface FamilyMealCardProps {
  meal: Meal;
  onAddToCart: (meal: Meal) => void;
}

const FamilyMealCard: React.FC<FamilyMealCardProps> = ({ meal, onAddToCart }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <img 
          src={meal.image} 
          alt={meal.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
          Serves 4
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{meal.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{meal.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Apple className="w-4 h-4 mr-1" />
              <span>{meal.calories} cal/serving</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              <span>30 min</span>
            </div>
          </div>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${meal.price}</span>
        </div>

        <button
          onClick={() => onAddToCart(meal)}
          className="w-full bg-emerald-600 dark:bg-emerald-500 text-white py-2 rounded-lg 
                   hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const FamilyMealsPage = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Family Meals</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Nutritious, delicious meals the whole family will love. Each meal serves 4 people 
            and is designed to be both kid-friendly and parent-approved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {familyMeals.map((meal) => (
            <FamilyMealCard
              key={meal.id}
              meal={meal}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Why Choose Our Family Meals?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <Heart className="w-8 h-8 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Nutritious & Delicious
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Balanced meals that kids love, packed with hidden vegetables and nutrients.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Perfect for Families
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Generous portions that serve 4 people, with options everyone will enjoy.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="w-8 h-8 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Quick & Easy
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ready in 30 minutes or less, perfect for busy weeknight dinners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyMealsPage;