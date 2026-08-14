import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { DailyMenu } from './pages/DailyMenu';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import EventsMenu from './pages/EventsMenu';
import BuffetPackages from './pages/BuffetPackages';
import BreakfastMenu from './pages/BreakfastMenu'; // 1. استيراد صفحة الإفطار والتعتيمة
import type { Dish } from './data/menuData';
import { MenuProvider } from './context/MenuContext';

function AppContent() {
  const [cart, setCart] = useState<Dish[]>([]);
  
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.replace('/', '');
    return path || 'home';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '');
      setCurrentPage(path || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const addToCart = (item: Dish | string, ...args: (string | number)[]) => {
    if (typeof item === 'string') {
      const price = args[0] || '0 ريال';
      const newDish: Dish = {
        id: Date.now().toString(), 
        name: item,
        price: typeof price === 'number' ? price : parseFloat(price.toString().replace(/[^0-9.]/g, '')) || 0,
        description: '',
        category: 'daily',
        subCategory: '',
        image: ''
      };
      setCart([...cart, newDish]);
    } else {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const navigateTo = (page: string) => {
    const cleanPage = page.startsWith('/') ? page.substring(1) : page;
    setCurrentPage(cleanPage || 'home');
    window.history.pushState({}, '', `/${cleanPage === 'home' ? '' : cleanPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
      case '':
        return <Home navigateTo={navigateTo} addToCart={addToCart} />;
      case 'daily':
        return <DailyMenu onAddToCart={addToCart} />;
      case 'events':
        return <EventsMenu addToCart={addToCart} />;
      case 'breakfast':
        return <BreakfastMenu addToCart={addToCart} />; // 2. ربط مسار الإفطار والتعتيمة
      case 'buffet':
        return <BuffetPackages />;
      case 'cart':
        return (
          <Cart 
            cartItems={cart} 
            removeFromCart={removeFromCart} 
            navigateTo={navigateTo} 
            clearCart={clearCart} 
          />
        );
      case 'admin':
        return <Admin navigateTo={navigateTo} />;
      default:
        return <Home navigateTo={navigateTo} addToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#2c1e14] flex flex-col font-sans" dir="rtl">
      <Header 
        routePath={currentPage} 
        navigateTo={navigateTo} 
        cartItemsCount={cart.length} 
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <AppContent />
    </MenuProvider>
  );
}