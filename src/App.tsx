import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedMeals from './components/FeaturedMeals';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import OrderPage from './pages/OrderPage';
import CheckoutPage from './pages/CheckoutPage';
import FamilyMealsPage from './pages/FamilyMealsPage';
import MenuPage from './pages/MenuPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider>
      <div className="page-container">
        <Navbar onNavigate={navigate} />
        
        {currentPage === 'home' ? (
          <>
            <Hero onOrderNow={() => navigate('order')} />
            <FeaturedMeals />
            <HowItWorks />
            <About />
            <Testimonials />
          </>
        ) : currentPage === 'order' ? (
          <OrderPage onCheckout={() => navigate('checkout')} />
        ) : currentPage === 'checkout' ? (
          <CheckoutPage />
        ) : currentPage === 'family-meals' ? (
          <FamilyMealsPage />
        ) : currentPage === 'menu' ? (
          <MenuPage />
        ) : null}
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;