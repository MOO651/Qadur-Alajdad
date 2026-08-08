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

  const handleMainCatChange = (catId: string) => {
    setSelectedMainCat(catId);
    const subCats = subCategoriesMap[catId];
    if (subCats && subCats.length > 0) {
      setSelectedSubCat(subCats[0].id);
    }
  };

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
      {/* Container رئيسي بعرض محدود لضمان عدم تمدد العناصر بشكل سيء */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* شريط البحث الموحد */}
        <div className="mb-10 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="ابحث عن طبقك المفضلة (مثل: المرقوق، سليق، كابلي)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white shadow-sm text-stone-700 text-center text-sm md:text-base"
          />
        </div>

        {/* أزرار التصنيفات الرئيسية (Grid متناسق) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {mainCategories.map((cat) => {
            const isSelected = selectedMainCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleMainCatChange(cat.id)}
                className={`p-6 rounded-2xl text-right transition-all duration-300 flex flex-row-reverse items-center justify-between border ${
                  isSelected 
                    ? 'bg-[#8c3a2f] text-white border-[#8c3a2f] shadow-md' 
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 shadow-sm'
                }`}
              >
                <div className="flex-1 ml-4">
                  <h3 className={`font-bold text-lg mb-1 ${isSelected ? 'text-white' : 'text-stone-800'}`}>
                    {cat.name}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-stone-200' : 'text-stone-500'}`}>
                    {cat.description}
                  </p>
                </div>
                <div className={`text-3xl p-3 rounded-xl flex-shrink-0 ${isSelected ? 'bg-white/10' : 'bg-stone-100'}`}>
                  {cat.icon}
                </div>
              </button>
            );
          })}
        </div>

        {/* أزرار التصنيفات الفرعية (Tabs) - تتوسط الشاشة */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {subCategoriesMap[selectedMainCat]?.map((sub) => {
            const isSubSelected = selectedSubCat === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCat(sub.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${
                  isSubSelected
                    ? 'bg-[#8c3a2f] text-white shadow'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100 shadow-sm'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* شبكة عرض الأطباق والمنتجات */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredDishes.map((dish) => (
              <div 
                key={dish.id} 
                className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover"
                    />
                    {dish.badge && (
                      <span className="absolute top-4 right-4 bg-[#8c3a2f] text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                        {dish.badge}
                      </span>
                    )}
                    {dish.calories && (
                      <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg font-medium">
                        {dish.calories}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{dish.name}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6">{dish.description}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between">
                  <span className="text-lg font-bold text-stone-800">
                    {typeof dish.price === 'number' ? `${dish.price} ر.س` : dish.price}
                  </span>
                  <button 
                    onClick={() => onAddToCart && onAddToCart(dish)}
                    className="bg-[#8c3a2f] hover:bg-[#7a3127] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors shadow-sm"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm">
            <p className="text-stone-500 text-lg">عذراً، لم نجد أطباق مطابقة لبحثك في هذا القسم.</p>
          </div>
        )}
      </main>
    </div>
  );
};