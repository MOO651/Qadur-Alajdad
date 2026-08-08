import React, { useState } from 'react';
import type { Dish } from '../data/menuData';
import { 
  brandInfo, 
  mainCategories, 
  subCategoriesMap, 
  menuDishes 
} from '../data/menuData';

interface DailyMenuProps {
  onAddToCart?: (dish: Dish) => void;
}

export const DailyMenu: React.FC<DailyMenuProps> = ({ onAddToCart }) => {
  const [selectedMainCat, setSelectedMainCat] = useState<string>('najd');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all-najd');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // تغيير التصنيف الرئيسي وإعادة ضبط التصنيف الفرعي لأول خيار متاح
  const handleMainCatChange = (catId: string) => {
    setSelectedMainCat(catId);
    const subCats = subCategoriesMap[catId];
    if (subCats && subCats.length > 0) {
      setSelectedSubCat(subCats[0].id);
    }
  };

  // تصفية الأطباق بناءً على التصنيف الرئيسي، التصنيف الفرعي، ونص البحث
  const filteredDishes = menuDishes.filter((dish) => {
    const matchesMain = dish.category === selectedMainCat;
    
    const currentSubCats = subCategoriesMap[selectedMainCat] || [];
    const isAllSub = currentSubCats[0]?.id === selectedSubCat; // هل هو خيار "الكل"

    const matchesSub = isAllSub || dish.subCategory === selectedSubCat;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMain && matchesSub && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-16" dir="rtl">
      {/* رأس الصفحة والهوية */}
      <header className="bg-amber-900 text-amber-50 py-10 px-4 text-center shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 tracking-wide">{brandInfo.name}</h1>
          <p className="text-lg text-amber-200 font-medium">{brandInfo.subtitle}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* شريط البحث */}
        <div className="mb-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="ابحث عن طبقك المفضلة (مثل: المرقوق، سليق، كابلي)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white shadow-sm text-stone-700"
          />
        </div>

        {/* أزرار التصنيفات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {mainCategories.map((cat) => {
            const isSelected = selectedMainCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleMainCatChange(cat.id)}
                className={`p-5 rounded-2xl text-right transition-all duration-300 flex items-start space-x-4 space-x-reverse border ${
                  isSelected 
                    ? 'bg-amber-900 text-white border-amber-900 shadow-lg transform -translate-y-1' 
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
                }`}
              >
                <span className="text-3xl p-2 bg-white/10 rounded-xl">{cat.icon}</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">{cat.name}</h3>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* أزرار التصنيفات الفرعية (Tabs) */}
        <div className="flex overflow-x-auto space-x-2 space-x-reverse pb-4 mb-8 scrollbar-hide">
          {subCategoriesMap[selectedMainCat]?.map((sub) => {
            const isSubSelected = selectedSubCat === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCat(sub.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  isSubSelected
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* شبكة عرض الأطباق */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div 
                key={dish.id} 
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {dish.badge && (
                      <span className="absolute top-3 right-3 bg-amber-800 text-amber-50 text-xs px-3 py-1 rounded-full font-medium shadow">
                        {dish.badge}
                      </span>
                    )}
                    {dish.calories && (
                      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md">
                        {dish.calories}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">{dish.name}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">{dish.description}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                  <span className="text-lg font-bold text-amber-900">
                    {typeof dish.price === 'number' ? `${dish.price} ر.س` : dish.price}
                  </span>
                  <button 
                    onClick={() => onAddToCart && onAddToCart(dish)}
                    className="bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <p className="text-stone-500 text-lg">عذراً، لم نجد أطباق مطابقة لبحثك في هذا القسم.</p>
          </div>
        )}
      </main>
    </div>
  );
};