import React, { useState } from 'react';
import type { Dish } from '../data/menuData';
import { 
  mainCategories, 
  subCategoriesMap 
} from '../data/menuData';
import { useMenu } from '../context/MenuContext';

interface DailyMenuProps {
  onAddToCart?: (dish: Dish) => void;
}

export const DailyMenu: React.FC<DailyMenuProps> = ({ onAddToCart }) => {
  const { dishes } = useMenu();

  const [selectedMainCat, setSelectedMainCat] = useState<string>(mainCategories[0]?.id || 'general');
  const [selectedSubCat, setSelectedSubCat] = useState<string>(subCategoriesMap[mainCategories[0]?.id || 'general']?.[0]?.id || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // حالة لمعرفة الطبق الذي تتم إضافته حالياً لعرض تأثير بصري
  const [addingId, setAddingId] = useState<string | null>(null);

  const handleMainCatChange = (catId: string) => {
    setSelectedMainCat(catId);
    const subCats = subCategoriesMap[catId];
    if (subCats && subCats.length > 0) {
      setSelectedSubCat(subCats[0].id);
    } else {
      setSelectedSubCat('all');
    }
  };

  const handleAddToCartClick = (dish: Dish) => {
    if (onAddToCart) {
      onAddToCart(dish);
      setAddingId(dish.id);
      setTimeout(() => setAddingId(null), 1200); // إرجاع الزر لحالته الطبيعية بعد 1.2 ثانية
    }
  };

  const filteredDishes = dishes.filter((dish: Dish) => {
    const matchesMain = !selectedMainCat || dish.category === selectedMainCat;
    
    const currentSubCats = subCategoriesMap[selectedMainCat] || [];
    const isAllSub = selectedSubCat === 'all' || currentSubCats[0]?.id === selectedSubCat;
    const matchesSub = isAllSub || dish.subCategory === selectedSubCat;
    
    const matchesSearch = searchQuery.trim() === '' || 
                          dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMain && matchesSub && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-stone-100 font-sans pb-20" dir="rtl">
      {/* رأس الصفحة */}
      <header className="bg-obsidian-light border-b border-gold/20 py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-gold text-xs font-bold tracking-widest uppercase mb-2 block">المنيو اليومي الأصيل</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#FFFDF9]">ما تيسر من قدور الأجداد</h1>
          <p className="text-sm text-stone-400">تشكيلة طازجة ومحضرة يومياً بأجود المكونات المحلية</p>
        </div>
      </header>

      {/* شريط الأقسام الرئيسية */}
      <nav className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-gold/20 shadow-lg py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-start md:justify-center overflow-x-auto space-x-3 space-x-reverse scrollbar-hide">
          {mainCategories.map((cat) => {
            const isSelected = selectedMainCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleMainCatChange(cat.id)}
                className={`flex items-center space-x-2 space-x-reverse px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-gold text-obsidian shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105' 
                    : 'bg-obsidian-light text-stone-300 hover:bg-stone-800 border border-gold/20'
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
            placeholder="ابحث عن طبقك المفضل (مثل: المرقوق، سليق، كابلي)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl border border-gold/20 focus:outline-none focus:ring-2 focus:ring-gold bg-obsidian-light text-stone-100 placeholder-stone-500 shadow-inner text-center"
          />
        </div>

        {/* شريط التصنيفات الفرعية */}
        <div className="flex overflow-x-auto space-x-2 space-x-reverse pb-3 mb-10 scrollbar-hide justify-start md:justify-center">
          {subCategoriesMap[selectedMainCat]?.map((sub) => {
            const isSubSelected = selectedSubCat === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCat(sub.id)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                  isSubSelected
                    ? 'bg-gold text-obsidian border-gold font-bold shadow'
                    : 'bg-obsidian-light text-stone-300 border-gold/20 hover:border-gold'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* شبكة الأطباق */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish: Dish) => {
              const isAdded = addingId === dish.id;
              return (
                <div 
                  key={dish.id} 
                  className="bg-obsidian-light rounded-2xl overflow-hidden border border-gold/20 shadow-md hover:border-gold/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-black">
                      <img 
                        src={dish.image} 
                        alt={dish.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {dish.badge && (
                        <span className="absolute top-3 right-3 bg-gold text-obsidian text-xs px-3 py-1 rounded-full font-bold shadow">
                          {dish.badge}
                        </span>
                      )}
                      
                      {/* السعرات الحرارية */}
                      <div className="absolute bottom-3 left-3">
                        {dish.calories && String(dish.calories).trim() !== '' && (
                          <span className="bg-black/80 backdrop-blur-md text-stone-200 text-xs px-2.5 py-1 rounded-md font-sans border border-gold/20">
                            {dish.calories}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="text-xl font-bold text-stone-100">{dish.name}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{dish.description}</p>
                      
                      {/* مسببات الحساسية */}
                      {dish.allergens && String(dish.allergens).trim() !== '' && (
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-1.5 bg-amber-950/40 border border-gold/30 text-amber-300 text-xs px-3 py-1 rounded-lg font-medium">
                            ⚠️ مسببات الحساسية: {dish.allergens}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-gold/10 mt-2 pt-3">
                    <span className="text-lg font-bold text-gold font-sans">
                      {typeof dish.price === 'number' ? `${dish.price} ر.س` : dish.price}
                    </span>
                    <button 
                      onClick={() => handleAddToCartClick(dish)}
                      className={`${
                        isAdded 
                          ? 'bg-green-600 text-white scale-95' 
                          : 'bg-gold hover:bg-gold-dark text-obsidian'
                      } px-4 py-2 rounded-xl text-sm font-bold transition-all shadow`}
                    >
                      {isAdded ? '✓ تمت الإضافة' : 'أضف للسلة'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-obsidian-light rounded-2xl border border-gold/20">
            <p className="text-stone-400 text-base">عذراً، لم نجد أطباق مطابقة في هذا القسم حالياً.</p>
          </div>
        )}
      </main>
    </div>
  );
};