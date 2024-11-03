import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, AlertCircle, Plus, Minus } from 'lucide-react';

interface FamilyMealCustomizationProps {
  mealId: string;
  baseServings: number;
  onUpdateServings: (servings: number) => void;
  onUpdatePreferences: (preferences: FamilyMemberPreference[]) => void;
}

interface FamilyMemberPreference {
  id: string;
  name: string;
  portion: 'regular' | 'large' | 'small';
  excludedIngredients: string[];
}

const FamilyMealCustomization: React.FC<FamilyMealCustomizationProps> = ({
  mealId,
  baseServings,
  onUpdateServings,
  onUpdatePreferences
}) => {
  const { user } = useAuth();
  const [servings, setServings] = useState(baseServings);
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberPreference[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);

  const handleServingChange = (newServings: number) => {
    if (newServings >= 2 && newServings <= 8) {
      setServings(newServings);
      onUpdateServings(newServings);
    }
  };

  const handleAddMember = (name: string) => {
    const newMember: FamilyMemberPreference = {
      id: Date.now().toString(),
      name,
      portion: 'regular',
      excludedIngredients: []
    };
    const updatedMembers = [...familyMembers, newMember];
    setFamilyMembers(updatedMembers);
    onUpdatePreferences(updatedMembers);
    setShowAddMember(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold">Family Size</h3>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleServingChange(servings - 1)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={servings <= 2}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{servings}</span>
            <button
              onClick={() => handleServingChange(servings + 1)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={servings >= 8}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {user?.isPremium ? (
          <>
            <div className="space-y-4 mt-6">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <span>{member.name}</span>
                  <select
                    value={member.portion}
                    onChange={(e) => {
                      const updatedMembers = familyMembers.map(m =>
                        m.id === member.id
                          ? { ...m, portion: e.target.value as 'regular' | 'large' | 'small' }
                          : m
                      );
                      setFamilyMembers(updatedMembers);
                      onUpdatePreferences(updatedMembers);
                    }}
                    className="ml-4 rounded-md border-gray-300"
                  >
                    <option value="small">Small Portion</option>
                    <option value="regular">Regular Portion</option>
                    <option value="large">Large Portion</option>
                  </select>
                </div>
              ))}
            </div>

            {showAddMember ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Family member name"
                  className="w-full px-3 py-2 border rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      handleAddMember(input.value);
                      input.value = '';
                    }
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowAddMember(true)}
                className="mt-4 text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Family Member</span>
              </button>
            )}
          </>
        ) : (
          <div className="mt-4 flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Upgrade to Premium for personalized portion control and family member preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyMealCustomization; 
