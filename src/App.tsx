import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DailyMenu from './pages/DailyMenu';

export default function App() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  // وظيفة للتنقل بين الصفحات
  const navigateTo = (page: string) => {
    console.log("Navigating to:", page);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* تمرير الخصائص المطلوبة للـ Header */}
      <Header 
        routePath="/" 
        navigateTo={navigateTo} 
        cartItemsCount={cart.length} 
      />
      
      <main className="flex-grow">
        <DailyMenu addToCart={addToCart} />
      </main>

      {/* تمرير الخاصية المطلوبة للـ Footer */}
      <Footer navigateTo={navigateTo} />
    </div>
  );
}