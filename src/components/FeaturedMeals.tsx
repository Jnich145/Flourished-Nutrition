import React from 'react';
import { Clock, Leaf, Flame } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface MealCardProps {
  image: string;
  title: string;
  description: string;
  calories: number;
  time: string;
  isVegan?: boolean;
  delay?: number;
}

const MealCard: React.FC<MealCardProps> = ({ image, title, description, calories, time, isVegan, delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div 
      ref={ref}
      className={`card group transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isVegan && (
          <span className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Leaf className="w-4 h-4" />
            Vegan
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            {calories} kcal
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedMeals = () => {
  const { ref: sectionRef, isInView: sectionIsInView } = useInView({ threshold: 0.1 });
  
  const meals = [
    {
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
      title: 'Quinoa Buddha Bowl',
      description: 'Fresh vegetables, quinoa, and tahini dressing',
      calories: 450,
      time: '20 min',
      isVegan: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop',
      title: 'Grilled Salmon',
      description: 'Wild-caught salmon with roasted vegetables',
      calories: 520,
      time: '25 min',
    },
    {
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop',
      title: 'Mediterranean Bowl',
      description: 'Falafel, hummus, and fresh Mediterranean salad',
      calories: 480,
      time: '15 min',
      isVegan: true,
    },
  ];

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 transition-all duration-700 ${
            sectionIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-title">Featured Meals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our chef's selection of nutritious and delicious meals, 
            crafted with fresh ingredients and balanced nutrition.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal, index) => (
            <MealCard key={index} {...meal} delay={index * 200} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMeals;