import React from 'react';
import { UserProfile } from '../../types/user';

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

interface MacroDisplayProps {
  meal: Meal;
  userProfile?: UserProfile;
  excludedIngredients?: string[];
}

const MacroDisplay: React.FC<MacroDisplayProps> = ({ meal, userProfile, excludedIngredients = [] }) => {
  // Calculate adjusted macros based on excluded ingredients
  const calculateAdjustedMacros = () => {
    if (!excludedIngredients.length) return meal;

    // This is a simplified adjustment - in production, you'd need a proper
    // ingredient-to-macro mapping database
    const adjustmentFactor = 1 - (excludedIngredients.length * 0.1);
    
    return {
      ...meal,
      calories: Math.round(meal.calories * adjustmentFactor),
      protein: Math.round(meal.protein * adjustmentFactor),
      carbs: Math.round(meal.carbs * adjustmentFactor),
      fat: Math.round(meal.fat * adjustmentFactor),
    };
  };

  const adjustedMeal = calculateAdjustedMacros();

  // Calculate percentage of daily targets for premium users
  const calculatePercentage = (value: number, target?: number) => {
    if (!target) return null;
    return Math.round((value / target) * 100);
  };

  const macroTargets = userProfile?.isPremium ? userProfile.macroTargets : undefined;

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
        <div className="font-semibold">{adjustedMeal.calories}</div>
        {macroTargets?.calories && (
          <div className="text-xs text-emerald-600">
            {calculatePercentage(adjustedMeal.calories, macroTargets.calories)}% daily
          </div>
        )}
      </div>
      
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
        <div className="font-semibold">{adjustedMeal.protein}g</div>
        {macroTargets?.protein && (
          <div className="text-xs text-emerald-600">
            {calculatePercentage(adjustedMeal.protein, macroTargets.protein)}% daily
          </div>
        )}
      </div>
      
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
        <div className="font-semibold">{adjustedMeal.carbs}g</div>
        {macroTargets?.carbs && (
          <div className="text-xs text-emerald-600">
            {calculatePercentage(adjustedMeal.carbs, macroTargets.carbs)}% daily
          </div>
        )}
      </div>
      
      <div className="text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
        <div className="font-semibold">{adjustedMeal.fat}g</div>
        {macroTargets?.fat && (
          <div className="text-xs text-emerald-600">
            {calculatePercentage(adjustedMeal.fat, macroTargets.fat)}% daily
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroDisplay;
