import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Activity, Scale, Info } from 'lucide-react';

interface MacroTargetsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const calculateMacros = (weight: number, activityLevel: string, goal: string) => {
  // Basic macro calculations - these would need to be refined based on specific requirements
  let protein = weight * (goal === 'muscle-gain' ? 2.2 : 1.8); // g/kg
  let calories = weight * (activityLevel === 'high' ? 35 : activityLevel === 'medium' ? 30 : 25);
  
  // Adjust calories based on goal
  if (goal === 'weight-loss') calories *= 0.8;
  if (goal === 'muscle-gain') calories *= 1.1;
  
  let fat = (calories * 0.25) / 9; // 25% of calories from fat
  let carbs = (calories - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs

  return {
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
    calories: Math.round(calories),
  };
};

export const MacroTargets: React.FC<MacroTargetsProps> = ({ onNext, onBack }) => {
  const { user } = useAuth();
  const [weight, setWeight] = useState(70);
  const [activityLevel, setActivityLevel] = useState('medium');
  
  const macros = calculateMacros(
    weight,
    activityLevel,
    user?.healthGoals[0] || 'maintenance'
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            min="40"
            max="200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Activity Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setActivityLevel(level)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  activityLevel === level
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-gray-200 hover:border-emerald-200'
                }`}
              >
                <span className="capitalize">{level}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Your Recommended Daily Targets
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {macros.calories}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {macros.protein}g
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {macros.carbs}g
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {macros.fat}g
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              These targets are calculated based on your weight, activity level, and goals.
              {!user?.isPremium && " Upgrade to Premium for personalized adjustments and coaching support."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button 
          onClick={() => onNext({ macroTargets: macros })} 
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};
