import React from 'react';
import Hero from '../components/Hero';
import FeaturedMeals from '../components/FeaturedMeals';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const HomePage = () => {
  const handleOrderNow = () => {
    // Navigate to order page or open modal
    window.location.href = '/order';
  };

  return (
    <div className="min-h-screen">
      <Hero onOrderNow={handleOrderNow} />
      <FeaturedMeals />
      <HowItWorks />
      <About />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage; 
