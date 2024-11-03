import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import MacroDisplay from '../components/meals/MacroDisplay';
import { ChevronRight, Target, Calendar, Utensils } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();

  const renderMacroSummary = () => {
    if (!user?.macroTargets) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Daily Macro Targets</h2>
        <MacroDisplay 
          meal={{
            id: 'targets',
            name: 'Daily Targets',
            ...user.macroTargets,
            ingredients: []
          }}
          userProfile={user}
        />
      </div>
    );
  };

  const renderQuickActions = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <button className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-3">
          <Utensils className="w-5 h-5 text-emerald-600" />
          <span>Order Meals</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <button className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-3">
          <Target className="w-5 h-5 text-emerald-600" />
          <span>Update Goals</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <button className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span>Meal Planner</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );

  const renderUpgradePrompt = () => {
    if (user?.isPremium) return null;

    return (
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Upgrade to Premium</h3>
        <p className="mb-4">Get personalized meal plans and advanced nutrition tracking.</p>
        <button className="bg-white text-emerald-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
          Learn More
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, {user?.firstName || user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's your nutrition summary and meal planning overview.
          </p>
        </div>

        {renderQuickActions()}
        {user?.isPremium && renderMacroSummary()}
        {renderUpgradePrompt()}
      </div>
    </div>
  );
};

export default DashboardPage; 