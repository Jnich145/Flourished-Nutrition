export interface AssessmentData {
  // Body Metrics
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';

  // Dietary Preferences
  dietaryPreferences: string[];
  
  // Health Goals
  healthGoals: string[];
  targetWeight?: number;
  weeklyGoal?: 'maintain' | 'lose' | 'gain';
  
  // Meal Preferences
  mealPreferences: {
    mealSize: 'small' | 'regular' | 'large';
    spiceLevel: 'mild' | 'medium' | 'spicy' | 'extra-spicy';
    mealTime: string[];
    cookingSkill: 'beginner' | 'intermediate' | 'advanced';
  };
  
  // Allergies and Restrictions
  allergies: string[];
  excludedIngredients: string[];
  
  // Assessment Metadata
  lastAssessmentDate: string;
  assessmentCompleted: boolean;
}

export interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionGoals {
  targetCalories: number;
  macroDistribution: {
    protein: number; // percentage
    carbs: number; // percentage
    fat: number; // percentage
  };
  weeklyWeightGoal?: number; // in kg
} 