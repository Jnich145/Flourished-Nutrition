import React from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  ClipboardList, 
  Apple, 
  ChefHat, 
  Truck, 
  Heart,
  Clock,
  Sparkles
} from 'lucide-react';

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
}

const HowItWorksPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const steps: ProcessStep[] = [
    {
      icon: ClipboardList,
      title: "1. Complete Your Assessment",
      description: "Take our comprehensive assessment to help us understand your dietary needs, preferences, and health goals."
    },
    {
      icon: Apple,
      title: "2. Get Your Personalized Plan",
      description: "Receive a customized meal plan tailored to your nutritional needs and preferences."
    },
    {
      icon: ChefHat,
      title: "3. Chef-Crafted Meals",
      description: "Our expert chefs prepare your meals using fresh, high-quality ingredients."
    },
    {
      icon: Truck,
      title: "4. Convenient Delivery",
      description: "Enjoy regular deliveries of your meals right to your doorstep."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Nutritionist-Approved",
      description: "All meals are designed by certified nutritionists to ensure optimal health benefits."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "No more meal planning or grocery shopping. We handle everything for you."
    },
    {
      icon: Sparkles,
      title: "Fresh & Quality",
      description: "We use only the freshest ingredients from trusted local suppliers."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            How Flourished Nutrition Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your journey to better health starts here. We've made it simple to get 
            nutritious, delicious meals tailored to your needs.
          </p>
        </div>

        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div 
              key={title}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Why Choose Flourished Nutrition?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their eating habits 
            with Flourished Nutrition.
          </p>
          <button className="btn-primary">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
