import React, { useState } from 'react';

interface DailyMenuProps {
  addToCart?: (dish: any) => void;
}

export default function DailyMenu({ addToCart }: DailyMenuProps) {
  const [selectedSubCat, setSelectedSubCat] = useState('all');

  // الأصناف المباشرة كبطاقات (Cards) مرتبة ومنفصلة
  const dishes = [
    { id: 1, name: 'شوربة عدس', price: 17, category: 'الشوربات', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=60', badge: 'طازج يومياً' },
    { id: 2, name: 'شوربة حب', price: 19, category: 'الشوربات', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=60', badge: 'مميز' },
    { id: 3, name: 'شوربة مقيم', price: 26, category: 'الشوربات', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=60', badge: 'شعبية' },
    { id: 4, name: 'سلطة جرجير البر', price: 14, category: 'المقبلات', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60', badge: 'صحي' },
    { id: 5, name: 'فتوش', price: 16, category: 'المقبلات', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60', badge: 'مفضل' },
    { id: 6, name: 'تبولة', price: 14, category: 'المقبلات', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60', badge: 'منعش' },
  ];

  const filteredDishes = selectedSubCat === 'all' 
    ? dishes 
    : dishes.filter(d => d.category === selectedSubCat);

  const handleAdd = (dish: any) => {
    if (addToCart) {
      addToCart(dish);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* عنوان الصفحة */}
      <div className="text-center">
        <span className="text-amber-500 text-sm bg-amber-500/10 px-4 py-1 rounded-full border border-amber-500/20">أطباق طازجة يومياً</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2">المنيو اليومي والشعبيات</h1>
        <p className="text-gray-400 text-sm">اطلب أطباقك المفضلة واستمتع بمذاق لا ينسى</p>
      </div>

      {/* أزرار الفلترة */}
      <div className="flex justify-center gap-3">
        <button 
          onClick={() => setSelectedSubCat('all')}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${selectedSubCat === 'all' ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-gray-400 border border-zinc-800'}`}
        >
          الكل
        </button>
        <button 
          onClick={() => setSelectedSubCat('الشوربات')}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${selectedSubCat === 'الشوربات' ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-gray-400 border border-zinc-800'}`}
        >
          الشوربات
        </button>
        <button 
          onClick={() => setSelectedSubCat('المقبلات')}
          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${selectedSubCat === 'المقبلات' ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-gray-400 border border-zinc-800'}`}
        >
          المقبلات
        </button>
      </div>

      {/* شبكة الكرتات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDishes.map((dish) => (
          <div 
            key={dish.id} 
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="h-44 bg-zinc-800 relative overflow-hidden">
              <img 
                src={dish.image} 
                alt={dish.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 bg-black/70 text-amber-400 text-xs px-2.5 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
                {dish.badge}
              </span>
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{dish.name}</h3>
                <span className="text-[10px] text-gray-400 block">السعر شامل الضريبة</span>
                <p className="text-amber-400 font-semibold text-base mb-4">{dish.price} ر.س</p>
              </div>

              <button 
                onClick={() => handleAdd(dish)}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90 text-black font-bold py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95"
              >
                + إضافة للطلب
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}