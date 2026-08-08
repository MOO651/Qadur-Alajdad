import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DailyMenu from './pages/DailyMenu';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import EventsMenu from './pages/EventsMenu';

export default function App() {
  const [cart, setCart] = useState<any[]>([]);
  // اجعل الصفحة الافتتاحية هي الرئيسية 'home'
  const [currentPage, setCurrentPage] = useState('home');

  const addToCart = (item: any) => {
    // دعم استقبال العناصر سواء ك كائن كامل أو (name, price)
    if (typeof item === 'string') {
      // لو تم إرسال الاسم والسعر كـ parameters منفصلة
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
    // تنظيف المسار لو جاي معاه سلاش
    const cleanPage = page.startsWith('/') ? page.substring(1) : page;
    setCurrentPage(cleanPage || 'home');
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
        return <EventsMenu weddingMenu={[]} addToCart={addToCart} />;
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