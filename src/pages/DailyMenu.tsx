import React from 'react';

interface DailyMenuProps {
  addToCart: (item: any) => void;
}

export default function DailyMenu({ addToCart }: DailyMenuProps) {
  // مصفوفة الأصناف مباشرة داخل الصفحة لضمان ظهور الكرتات فورا
  const allDishes = [
    { id: 1, name: 'شوربة عدس', price: '17 ر.س', category: 'الشوربات', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=60' },
    { id: 2, name: 'شوربة حب', price: '19 ر.س', category: 'الشوربات', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=60' },
    { id: 3, name: 'شوربة مقيم', price: '26 ر.س', category: 'الشوربات', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=60' },
    { id: 4, name: 'سلطة جرجير البر', price: '14 ر.س', category: 'المقبلات', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60' },
    { id: 5, name: 'فتوش', price: '16 ر.س', category: 'المقبلات', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60' },
    { id: 6, name: 'تبولة', price: '14 ر.س', category: 'المقبلات', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* عنوان الصفحة */}
      <div className="text-center mb-10">
        <span className="text-amber-500 text-sm bg-amber-500/10 px-4 py-1 rounded-full border border-amber-500/20">أطباق طازجة يومياً</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2">المنيو اليومي والشعبيات</h1>
        <p className="text-gray-400 text-sm">اطلب أطباقك المفضلة واستمتع بمذاق لا ينسى</p>
      </div>

      {/* شبكة الكرتات المنفصلة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allDishes.map((item) => (
          <div 
            key={item.id} 
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* مكان الصورة */}
            <div className="h-44 bg-zinc-800 relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 bg-black/70 text-amber-400 text-xs px-2.5 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
                {item.category}
              </span>
            </div>

            {/* تفاصيل الصنف */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-amber-400 font-semibold text-base mb-4">{item.price}</p>
              </div>

              <button 
                onClick={() => addToCart(item)}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95"
              >
                إضافة للسلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}