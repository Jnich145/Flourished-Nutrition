import React, { useState } from 'react';
import { Calendar, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { Meal } from '../../types/meal';

interface QuickMealPlanProps {
  onGeneratePlan: (preferences: PlanPreferences) => Promise<void>;
}

interface PlanPreferences {
  duration: 'day' | 'week';
  mealsPerDay: number;
  preferences: {
    calories: number;
    protein: number;
    excludedIngredients: string[];
  };
}

const QuickMealPlan: React.FC<QuickMealPlanProps> = ({ onGeneratePlan }) => {
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const [preferences, setPreferences] = useState<PlanPreferences>({
    duration: 'day',
    mealsPerDay: 3,
    preferences: {
      calories: 2000,
      protein: 150,
      excludedIngredients: [],
    },
  });

  if (!user?.isPremium) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold">Quick Plan Generator</h3>
        </div>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          {showOptions ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {showOptions && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Plan Duration</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setPreferences({ ...preferences, duration: 'day' })}
                className={`px-4 py-2 rounded-md ${
                  preferences.duration === 'day'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setPreferences({ ...preferences, duration: 'week' })}
                className={`px-4 py-2 rounded-md ${
                  preferences.duration === 'week'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Week
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Meals per Day</label>
            <input
              type="number"
              min="2"
              max="6"
              value={preferences.mealsPerDay}
              onChange={(e) => setPreferences({
                ...preferences,
                mealsPerDay: Number(e.target.value)
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            onClick={() => onGeneratePlan(preferences)}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>Generate Plan</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickMealPlan; 
