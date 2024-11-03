import { MacroTargets, NutritionGoals } from '../types/assessment';

// Calculate BMR using the Mifflin-St Jeor Equation
export const calculateBMR = (
  weight: number, // in kg
  height: number, // in cm
  age: number,
  gender: string
): number => {
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
};

// Calculate TDEE based on activity level
export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extra: 1.9,
  };

  return Math.round(bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]);
};

// Calculate macro targets based on goals
export const calculateMacroTargets = (tdee: number, goals: string[]): MacroTargets => {
  let proteinMultiplier = 1.6;
  let fatPercentage = 0.25;
  let calorieAdjustment = 0;

  // Adjust based on goals
  if (goals.includes('muscle-gain')) {
    proteinMultiplier = 2.0;
    fatPercentage = 0.25;
    calorieAdjustment = 500;
  } else if (goals.includes('weight-loss')) {
    proteinMultiplier = 2.2;
    fatPercentage = 0.3;
    calorieAdjustment = -500;
  }

  const adjustedTDEE = tdee + calorieAdjustment;
  
  // Calculate macros based on adjusted TDEE
  const proteinCalories = adjustedTDEE * 0.3; // 30% from protein
  const fatCalories = adjustedTDEE * fatPercentage;
  const carbCalories = adjustedTDEE - proteinCalories - fatCalories;

  return {
    calories: adjustedTDEE,
    protein: Math.round(proteinCalories / 4), // 4 calories per gram
    fat: Math.round(fatCalories / 9), // 9 calories per gram
    carbs: Math.round(carbCalories / 4), // 4 calories per gram
  };
};

// Calculate portion adjustments
export const calculatePortionSize = (
  baseMeal: BaseMeal,
  userMacros: MacroTargets,
  mealType: MealType
): AdjustedMeal => {
  const mealDistribution: Record<MealType, number> = {
    breakfast: 0.25,
    lunch: 0.35,
    dinner: 0.35,
    snack: 0.05,
  };

  const targetCalories = userMacros.calories * mealDistribution[mealType];
  const scaleFactor = targetCalories / baseMeal.calories;

  return {
    ...baseMeal,
    calories: Math.round(baseMeal.calories * scaleFactor),
    protein: Math.round(baseMeal.protein * scaleFactor),
    carbs: Math.round(baseMeal.carbs * scaleFactor),
    fat: Math.round(baseMeal.fat * scaleFactor),
    portionSize: scaleFactor,
  };
};

// Calculate weekly progress
export const calculateWeeklyProgress = (
  dailyLogs: DailyNutritionLog[],
  goals: NutritionGoals
): WeeklyProgress => {
  const averageCalories = dailyLogs.reduce((sum, log) => sum + log.totalCalories, 0) / dailyLogs.length;
  const averageProtein = dailyLogs.reduce((sum, log) => sum + log.protein, 0) / dailyLogs.length;
  const averageCarbs = dailyLogs.reduce((sum, log) => sum + log.carbs, 0) / dailyLogs.length;
  const averageFat = dailyLogs.reduce((sum, log) => sum + log.fat, 0) / dailyLogs.length;

  return {
    averageCalories,
    averageMacros: {
      protein: averageProtein,
      carbs: averageCarbs,
      fat: averageFat,
    },
    calorieGoalProgress: (averageCalories / goals.targetCalories) * 100,
    macroGoalProgress: {
      protein: (averageProtein / (goals.macroDistribution.protein * goals.targetCalories / 4)) * 100,
      carbs: (averageCarbs / (goals.macroDistribution.carbs * goals.targetCalories / 4)) * 100,
      fat: (averageFat / (goals.macroDistribution.fat * goals.targetCalories / 9)) * 100,
    },
  };
};

// Types
type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

interface BaseMeal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface AdjustedMeal extends BaseMeal {
  portionSize: number;
}

interface DailyNutritionLog {
  totalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

interface WeeklyProgress {
  averageCalories: number;
  averageMacros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  calorieGoalProgress: number;
  macroGoalProgress: {
    protein: number;
    carbs: number;
    fat: number;
  };
} 