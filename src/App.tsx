import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DailyMenu from './pages/DailyMenu';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import EventsMenu from './pages/EventsMenu';

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  
  // قراءة المسار المباشر من المتصفح (مثل /admin) عند فتح الصفحة لأول مرة
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

  const addToCart = (item: any) => {
    if (typeof item === 'string') {
      const price = arguments[1] || '0 ريال';
      setCart([...cart, { name: item, price }]);
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
        return <DailyMenu addToCart={addToCart} />;
      case 'events':
        return <EventsMenu addToCart={addToCart} />;
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
    <div className="min-h-screen bg-black text-white flex flex-col">
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