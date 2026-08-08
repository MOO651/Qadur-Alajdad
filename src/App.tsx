import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import DailyMenu from './pages/DailyMenu';
import EventsMenu from './pages/EventsMenu';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <Header routePath={currentPage} navigateTo={setCurrentPage} cartItemsCount={cartItems.length} />
      
      <main className="flex-grow">
        {currentPage === 'home' && <Home navigateTo={setCurrentPage} addToCart={addToCart} />}
        {currentPage === 'daily' && <DailyMenu dailyMenu={[]} addToCart={addToCart} />}
        {currentPage === 'events' && <EventsMenu weddingMenu={[]} addToCart={addToCart} />}
        {currentPage === 'cart' && <Cart cartItems={cartItems} removeFromCart={removeFromCart} navigateTo={setCurrentPage} clearCart={clearCart} />}
        {currentPage === 'admin' && <Admin navigateTo={setCurrentPage} />}
      </main>

      <Footer navigateTo={setCurrentPage} />
    </div>
  );
}

export default App;