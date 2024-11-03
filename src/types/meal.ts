export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  ingredients: string[];
  customizationOptions?: {
    addons: {
      id: string;
      name: string;
      price: number;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }[];
  };
}
