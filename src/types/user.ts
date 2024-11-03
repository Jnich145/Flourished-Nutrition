export interface UserProfile {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  dietaryPreferences: string[];
  allergies: string[];
  healthGoals: string[];
  macroTargets?: {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  };
  assessmentCompleted: boolean;
  activityLevel: string;
  bodyMetrics: {
    height: number;
    weight: number;
    age: number;
  };
  familyMembers?: FamilyMember[];
  mealPreferences: {
    portions: 'default' | 'custom';
    excludedIngredients: string[];
    additionalIngredients: string[];
  };
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
} 
