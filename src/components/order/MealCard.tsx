import React from 'react';
import type { Meal } from '../../types/meal';
import { Tag } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
  onSelect: (meal: Meal) => void;
}

export function MealCard({ meal, onSelect }: MealCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={meal.image}
        alt={meal.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{meal.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{meal.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            ${meal.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{meal.tags.join(', ')}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <div className="font-semibold">Calories</div>
            <div>{meal.calories}</div>
          </div>
          <div>
            <div className="font-semibold">Protein</div>
            <div>{meal.protein}g</div>
          </div>
          <div>
            <div className="font-semibold">Carbs</div>
            <div>{meal.carbs}g</div>
          </div>
          <div>
            <div className="font-semibold">Fat</div>
            <div>{meal.fat}g</div>
          </div>
        </div>
        <button
          onClick={() => onSelect(meal)}
          className="w-full bg-emerald-600 dark:bg-emerald-500 text-white py-2 rounded-md 
                   hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors duration-300"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}