import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Activity, Scale, Target, AlertTriangle, Utensils, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateBMR, calculateTDEE, calculateMacroTargets } from '../../utils/macroCalculations';

interface AssessmentStep {
  id: string;
  title: string;
  description: string;
  component: React.FC<StepProps>;
}

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  currentData: any;
}

const BodyMetrics: React.FC<StepProps> = ({ onNext, onBack, currentData }) => {
  const [metrics, setMetrics] = useState({
    age: currentData.age || '',
    height: currentData.height || '',
    weight: currentData.weight || '',
    gender: currentData.gender || '',
    activityLevel: currentData.activityLevel || '',
  });

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
    { value: 'light', label: 'Lightly active (light exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)' },
    { value: 'very', label: 'Very active (hard exercise 6-7 days/week)' },
    { value: 'extra', label: 'Extra active (very hard exercise & physical job)' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            value={metrics.age}
            onChange={(e) => setMetrics({ ...metrics, age: e.target.value })}
            className="w-full p-2 border rounded-md"
            min="18"
            max="120"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            value={metrics.gender}
            onChange={(e) => setMetrics({ ...metrics, gender: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Height (cm)</label>
          <input
            type="number"
            value={metrics.height}
            onChange={(e) => setMetrics({ ...metrics, height: e.target.value })}
            className="w-full p-2 border rounded-md"
            min="100"
            max="250"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg)</label>
          <input
            type="number"
            value={metrics.weight}
            onChange={(e) => setMetrics({ ...metrics, weight: e.target.value })}
            className="w-full p-2 border rounded-md"
            min="30"
            max="300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Activity Level</label>
        <select
          value={metrics.activityLevel}
          onChange={(e) => setMetrics({ ...metrics, activityLevel: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select activity level</option>
          {activityLevels.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button 
          onClick={() => onNext(metrics)}
          className="btn-primary"
          disabled={!Object.values(metrics).every(Boolean)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const DietaryPreferences: React.FC<{ onNext: (data: any) => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const [preferences, setPreferences] = useState<string[]>([]);
  
  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Paleo',
    'Mediterranean',
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {dietaryOptions.map((option) => (
          <label key={option} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={preferences.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  setPreferences([...preferences, option]);
                } else {
                  setPreferences(preferences.filter(p => p !== option));
                }
              }}
              className="form-checkbox h-5 w-5 text-emerald-600"
            />
            <span className="text-gray-700 dark:text-gray-300">{option}</span>
          </label>
        ))}
      </div>
      
      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button 
          onClick={() => onNext({ dietaryPreferences: preferences })} 
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const HealthGoals: React.FC<StepProps> = ({ onNext, onBack, currentData }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(currentData.healthGoals || []);
  const [targetWeight, setTargetWeight] = useState(currentData.targetWeight || '');
  
  const goals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: Scale },
    { id: 'muscle-gain', label: 'Build Muscle', icon: Activity },
    { id: 'maintenance', label: 'Maintain Weight', icon: Target },
    { id: 'energy', label: 'Increase Energy', icon: Activity },
    { id: 'health', label: 'General Health', icon: Heart },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              if (selectedGoals.includes(id)) {
                setSelectedGoals(selectedGoals.filter(g => g !== id));
              } else {
                setSelectedGoals([...selectedGoals, id]);
              }
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedGoals.includes(id)
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                : 'border-gray-200 hover:border-emerald-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-6 h-6 text-emerald-600" />
              <span className="text-gray-900 dark:text-gray-100">{label}</span>
            </div>
          </button>
        ))}
      </div>

      {(selectedGoals.includes('weight-loss') || selectedGoals.includes('muscle-gain')) && (
        <div>
          <label className="block text-sm font-medium mb-2">Target Weight (kg)</label>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="w-full p-2 border rounded-md"
            min="30"
            max="300"
          />
        </div>
      )}
      
      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button 
          onClick={() => onNext({ 
            healthGoals: selectedGoals,
            targetWeight: targetWeight ? parseFloat(targetWeight) : undefined
          })} 
          className="btn-primary"
          disabled={selectedGoals.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Allergies: React.FC<{ onNext: (data: any) => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const [allergies, setAllergies] = useState<string[]>([]);
  
  const allergyOptions = [
    'Peanuts',
    'Tree Nuts',
    'Dairy',
    'Eggs',
    'Soy',
    'Wheat',
    'Fish',
    'Shellfish',
  ];

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Important</span>
        </div>
        <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
          Please note that while we take allergies seriously, our kitchen handles all listed allergens.
          Cross-contamination is possible.
        </p>
      </div>

      <div className="space-y-4">
        {allergyOptions.map((allergy) => (
          <label key={allergy} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={allergies.includes(allergy)}
              onChange={(e) => {
                if (e.target.checked) {
                  setAllergies([...allergies, allergy]);
                } else {
                  setAllergies(allergies.filter(a => a !== allergy));
                }
              }}
              className="form-checkbox h-5 w-5 text-emerald-600"
            />
            <span className="text-gray-700 dark:text-gray-300">{allergy}</span>
          </label>
        ))}
      </div>
      
      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button 
          onClick={() => onNext({ allergies })} 
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const MealPreferences: React.FC<StepProps> = ({ onNext, onBack, currentData }) => {
  const [preferences, setPreferences] = useState({
    mealSize: currentData.mealSize || 'regular',
    spiceLevel: currentData.spiceLevel || 'medium',
    mealTime: currentData.mealTime || [],
    cookingSkill: currentData.cookingSkill || 'intermediate',
  });

  const mealTimes = ['breakfast', 'lunch', 'dinner', 'snacks'];
  const spiceLevels = ['mild', 'medium', 'spicy', 'extra-spicy'];
  const cookingSkills = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Preferred Meal Size</label>
        <select
          value={preferences.mealSize}
          onChange={(e) => setPreferences({ ...preferences, mealSize: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          <option value="small">Small</option>
          <option value="regular">Regular</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Spice Level</label>
        <div className="flex space-x-4">
          {spiceLevels.map((level) => (
            <label key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                value={level}
                checked={preferences.spiceLevel === level}
                onChange={(e) => setPreferences({ ...preferences, spiceLevel: e.target.value })}
                className="form-radio text-emerald-600"
              />
              <span className="capitalize">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Meal Times</label>
        <div className="flex flex-wrap gap-4">
          {mealTimes.map((time) => (
            <label key={time} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.mealTime.includes(time)}
                onChange={(e) => {
                  const newMealTimes = e.target.checked
                    ? [...preferences.mealTime, time]
                    : preferences.mealTime.filter(t => t !== time);
                  setPreferences({ ...preferences, mealTime: newMealTimes });
                }}
                className="form-checkbox text-emerald-600"
              />
              <span className="capitalize">{time}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button 
          onClick={() => onNext(preferences)}
          className="btn-primary"
          disabled={!preferences.mealTime.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const AssessmentFlow = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [assessmentData, setAssessmentData] = useState({});
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const steps: AssessmentStep[] = [
    {
      id: 'body-metrics',
      title: 'Body Metrics',
      description: 'Help us understand your physical profile',
      component: BodyMetrics,
    },
    {
      id: 'dietary-preferences',
      title: 'Dietary Preferences',
      description: 'Tell us about your dietary preferences and restrictions',
      component: DietaryPreferences,
    },
    {
      id: 'health-goals',
      title: 'Health Goals',
      description: 'What are your primary health and nutrition goals?',
      component: HealthGoals,
    },
    {
      id: 'meal-preferences',
      title: 'Meal Preferences',
      description: 'Tell us how you like your meals prepared',
      component: MealPreferences,
    },
    {
      id: 'allergies',
      title: 'Allergies & Restrictions',
      description: 'Help us understand any allergies or foods to avoid',
      component: Allergies,
    },
  ];

  const handleNext = async (stepData: any) => {
    const newData = { ...assessmentData, ...stepData };
    setAssessmentData(newData);

    if (currentStepIndex === steps.length - 1) {
      const { age, weight, height, gender, activityLevel } = newData;
      
      try {
        // Calculate user's macro targets
        const bmr = calculateBMR(
          parseFloat(weight),
          parseFloat(height),
          parseInt(age),
          gender
        );
        const tdee = calculateTDEE(bmr, activityLevel);
        const macroTargets = calculateMacroTargets(tdee, newData.healthGoals);

        // Update user profile with assessment data and calculated targets
        await updateProfile({
          ...newData,
          assessmentCompleted: true,
          macroTargets,
          bodyMetrics: {
            height: parseFloat(height),
            weight: parseFloat(weight),
            age: parseInt(age),
          },
          activityLevel,
          lastAssessmentDate: new Date().toISOString(),
        });

        navigate('/dashboard');
      } catch (error) {
        console.error('Error completing assessment:', error);
        // Handle error appropriately
      }
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIndex(Math.max(0, currentStepIndex - 1));
  };

  const CurrentStepComponent = steps[currentStepIndex].component;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {steps[currentStepIndex].title}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {steps[currentStepIndex].description}
            </p>
          </div>

          <CurrentStepComponent 
            onNext={handleNext} 
            onBack={handleBack}
            currentData={assessmentData}
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;
