import React, { useState } from 'react';
import type { Dish } from '../data/menuData';
import { 
  mainCategories, 
  subCategoriesMap, 
  menuDishes 
} from '../data/menuData';

interface DailyMenuProps {
  onAddToCart?: (dish: Dish) => void;
}

export const DailyMenu: React.FC<DailyMenuProps> = ({ onAddToCart }) => {
  // تم تحديث القيمة الافتراضية لتتوافق مع القسم الجديد 'general'
  const [selectedMainCat, setSelectedMainCat] = useState<string>(mainCategories[0]?.id || 'general');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleMainCatChange = (catId: string) => {
    setSelectedMainCat(catId);
    const subCats = subCategoriesMap[catId];
    if (subCats && subCats.length > 0) {
      setSelectedSubCat(subCats[0].id);
    } else {
      setSelectedSubCat('all');
    }
  };

  // فلترة الأطباق بناءً على القسم الرئيسي والفرعي والبحث
  const filteredDishes = menuDishes.filter((dish) => {
    const matchesMain = !selectedMainCat || dish.category === selectedMainCat;
    const currentSubCats = subCategoriesMap[selectedMainCat] || [];
    const isAllSub = currentSubCats[0]?.id === selectedSubCat || selectedSubCat === 'all';
    const matchesSub = isAllSub || dish.subCategory === selectedSubCat;
    
    const matchesSearch = searchQuery.trim() === '' || 
                          dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMain && matchesSub && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-20" dir="rtl">
      {/* رأس الصفحة */}
      <header className="bg-stone-950 border-b border-stone-800 py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-2 block">المنيو اليومي الأصيل</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">ما تيسر من قدور الأجداد</h1>
          <p className="text-sm text-stone-400">تشكيلة طازجة ومحضرة يومياً بأجود المكونات المحلية</p>
        </div>
      </header>

      {/* شريط الأقسام الرئيسي الثابت في الأعلى للتنقل السريع */}
      <nav className="sticky top-0 z-30 bg-stone-950/90 backdrop-blur-md border-b border-stone-800 shadow-lg py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-start md:justify-center overflow-x-auto space-x-3 space-x-reverse scrollbar-hide">
          {mainCategories.map((cat) => {
            const isSelected = selectedMainCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleMainCatChange(cat.id)}
                className={`flex items-center space-x-2 space-x-reverse px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-amber-600 text-white shadow-md scale-105' 
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* شريط البحث */}
        <div className="mb-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="ابحث عن طبقك المفضلة (مثل: المرقوق، سليق، كابلي)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl border border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-800 text-stone-100 placeholder-stone-400 shadow-inner text-center"
          />
        </div>

        {/* شريط التصنيفات الفرعية (الفلاتر الداخلية للقسم الحالي) */}
        <div className="flex overflow-x-auto space-x-2 space-x-reverse pb-3 mb-10 scrollbar-hide justify-start md:justify-center">
          {subCategoriesMap[selectedMainCat]?.map((sub) => {
            const isSubSelected = selectedSubCat === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCat(sub.id)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                  isSubSelected
                    ? 'bg-amber-700 text-white border-amber-600 shadow'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* شبكة عرض الأطباق لكل قسم */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div 
                key={dish.id} 
                className="bg-stone-800 rounded-2xl overflow-hidden border border-stone-700 shadow-md hover:border-stone-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-900">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {dish.badge && (
                      <span className="absolute top-3 right-3 bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow">
                        {dish.badge}
                      </span>
                    )}
                    {dish.calories && (
                      <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-stone-200 text-xs px-2.5 py-1 rounded-md">
                        {dish.calories}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-stone-100 mb-2">{dish.name}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">{dish.description}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-stone-700/50 mt-2 pt-3">
                  <span className="text-lg font-bold text-amber-400">
                    {typeof dish.price === 'number' ? `${dish.price} ر.س` : dish.price}
                  </span>
                  <button 
                    onClick={() => onAddToCart && onAddToCart(dish)}
                    className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-800 rounded-2xl border border-stone-700">
            <p className="text-stone-400 text-base">عذراً، لم نجد أطباق مطابقة في هذا القسم حالياً.</p>
          </div>
        )}
      </main>
    </div>
  );
};