import React, { useState } from 'react';
import { X, Plus, Minus, Edit2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import MacroDisplay from '../meals/MacroDisplay';

interface Meal {
  id: string;
  name: string;
  price: number;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  availableAddOns?: string[];
}

interface CartItemProps {
  meal: Meal;
  onUpdateIngredients: (mealId: string, ingredients: string[]) => void;
  onAddIngredient: (mealId: string, ingredient: string) => void;
  onRemove: (mealId: string) => void;
  onUpdateQuantity: (mealId: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  meal,
  onUpdateIngredients,
  onAddIngredient,
  onRemove,
  onUpdateQuantity
}) => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [showIngredients, setShowIngredients] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      onUpdateQuantity(meal.id, newQuantity);
    }
  };

  const handleIngredientToggle = (ingredient: string) => {
    const newExcluded = excludedIngredients.includes(ingredient)
      ? excludedIngredients.filter(i => i !== ingredient)
      : [...excludedIngredients, ingredient];
    
    setExcludedIngredients(newExcluded);
    onUpdateIngredients(meal.id, meal.ingredients.filter(i => !newExcluded.includes(i)));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{meal.name}</h3>
            <p className="text-emerald-600 font-medium">${meal.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => onRemove(meal.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <MacroDisplay
        meal={meal}
        userProfile={user}
        excludedIngredients={excludedIngredients}
      />

      <div className="mt-4">
        <button
          onClick={() => setShowIngredients(!showIngredients)}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
        >
          <Edit2 className="w-4 h-4" />
          <span>Customize Ingredients</span>
        </button>

        {showIngredients && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              {meal.ingredients.map((ingredient) => (
                <label key={ingredient} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!excludedIngredients.includes(ingredient)}
                    onChange={() => handleIngredientToggle(ingredient)}
                    className="form-checkbox text-emerald-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                </label>
              ))}
            </div>

            {user?.isPremium && meal.availableAddOns && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Additional Ingredients</h4>
                <select
                  onChange={(e) => onAddIngredient(meal.id, e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Add ingredient...</option>
                  {meal.availableAddOns.map((addon) => (
                    <option key={addon} value={addon}>
                      {addon}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
