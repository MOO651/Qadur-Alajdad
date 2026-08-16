import React, { useState } from 'react';
import type { Dish } from '../data/menuData';
import { 
  mainCategories, 
  subCategoriesMap,
  menuDishes,
  allergenLabels 
} from '../data/menuData';

interface DailyMenuProps {
  onAddToCart?: (dish: Dish) => void;
  lang?: 'ar' | 'en'; // إضافة خاصية اللغة
  onToggleLang?: () => void; // دالة اختيارية لتبديل اللغة من الخارج
}

export const DailyMenu: React.FC<DailyMenuProps> = ({ onAddToCart, lang = 'ar', onToggleLang }) => {
  const dishes = menuDishes;

  const [selectedMainCat, setSelectedMainCat] = useState<string>(mainCategories[0]?.id || 'general');
  const [selectedSubCat, setSelectedSubCat] = useState<string>(subCategoriesMap[mainCategories[0]?.id || 'general']?.[0]?.id || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [internalLang, setInternalLang] = useState<'ar' | 'en'>(lang);
  
  const [addingId, setAddingId] = useState<string | null>(null);

  // استخدام اللغة القادمة من البراوبس أو الداخلية
  const currentLang = lang || internalLang;
  const toggleLanguage = onToggleLang || (() => setInternalLang(prev => prev === 'ar' ? 'en' : 'ar'));

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
      setTimeout(() => setAddingId(null), 1200);
    }
  };

  const filteredDishes = dishes.filter((dish: Dish) => {
    const matchesMain = !selectedMainCat || dish.category === selectedMainCat;
    
    const currentSubCats = subCategoriesMap[selectedMainCat] || [];
    const isFirstSubAll = currentSubCats.length > 0 && currentSubCats[0].id === selectedSubCat;
    const matchesSub = isFirstSubAll || selectedSubCat === 'all' || dish.subCategory === selectedSubCat;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
                          dish.name.toLowerCase().includes(query) ||
                          (dish.name_en && dish.name_en.toLowerCase().includes(query)) ||
                          dish.description.toLowerCase().includes(query) ||
                          (dish.description_en && dish.description_en.toLowerCase().includes(query));

    return matchesMain && matchesSub && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#2c1e14] font-sans pb-20" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      {/* رأس الصفحة مع زر تغيير اللغة */}
      <header className="bg-white border-b border-[#d4af37]/30 py-10 px-4 text-center shadow-sm relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center max-w-4xl mx-auto">
          <div></div>
          <button 
            onClick={toggleLanguage}
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#d4af37]/10 text-[#8c6239] border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-white transition-all shadow-2xs"
          >
            {currentLang === 'ar' ? 'English 🌐' : 'عربي 🌐'}
          </button>
        </div>

        <div className="max-w-4xl mx-auto mt-4">
          <span className="text-[#8c6239] text-xs font-bold tracking-widest uppercase mb-2 block bg-[#d4af37]/10 w-fit mx-auto px-4 py-1.5 rounded-full border border-[#d4af37]/30">
            {currentLang === 'ar' ? 'المنيو اليومي الأصيل' : 'Authentic Daily Menu'}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#2c1e14]">
            {currentLang === 'ar' ? 'ما تيسر من قدور الأجداد' : 'Ancestors Pots Selections'}
          </h1>
          <p className="text-sm text-[#6b5344]">
            {currentLang === 'ar' ? 'تشكيلة طازجة ومحضرة يومياً بأجود المكونات المحلية' : 'Fresh selection prepared daily with the finest local ingredients'}
          </p>
        </div>
      </header>

      {/* شريط الأقسام الرئيسية */}
      <nav className="sticky top-0 z-30 bg-[#f5f1ea]/95 backdrop-blur-md border-b border-[#d4af37]/30 shadow-sm py-3 px-4">
        <div className={`max-w-6xl mx-auto flex items-center justify-start md:justify-center overflow-x-auto space-x-3 ${currentLang === 'ar' ? 'space-x-reverse' : ''} scrollbar-hide`}>
          {mainCategories.map((cat) => {
            const isSelected = selectedMainCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleMainCatChange(cat.id)}
                className={`flex items-center space-x-2 ${currentLang === 'ar' ? 'space-x-reverse' : ''} px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-[#d4af37] text-white shadow-md scale-105' 
                    : 'bg-white text-[#6b5344] hover:bg-[#d4af37]/10 border border-[#d4af37]/30'
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
            placeholder={currentLang === 'ar' ? 'ابحث عن طبقك المفضل (مثل: المرقوق، سليق، كابلي)...' : 'Search your favorite dish...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl border border-[#d4af37]/40 focus:outline-none focus:ring-2 focus:ring-[#d4af37] bg-white text-[#2c1e14] placeholder-[#8c6239]/60 shadow-sm text-center text-sm transition-all"
          />
        </div>

        {/* شريط التصنيفات الفرعية */}
        <div className={`flex overflow-x-auto space-x-2 ${currentLang === 'ar' ? 'space-x-reverse' : ''} pb-3 mb-10 scrollbar-hide justify-start md:justify-center`}>
          {subCategoriesMap[selectedMainCat]?.map((sub) => {
            const isSubSelected = selectedSubCat === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCat(sub.id)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                  isSubSelected
                    ? 'bg-[#d4af37] text-white border-[#d4af37] font-bold shadow-sm'
                    : 'bg-white text-[#6b5344] border-[#d4af37]/30 hover:border-[#d4af37]'
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
              const displayName = currentLang === 'en' && dish.name_en ? dish.name_en : dish.name;
              const displayDescription = currentLang === 'en' && dish.description_en ? dish.description_en : dish.description;

              return (
                <div 
                  key={dish.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-sm hover:border-[#d4af37] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-[#f5f1ea]">
                      <img 
                        src={dish.image} 
                        alt={displayName} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {dish.badge && (
                        <span className={`absolute top-3 ${currentLang === 'ar' ? 'right-3' : 'left-3'} bg-[#d4af37] text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm`}>
                          {dish.badge}
                        </span>
                      )}
                      
                      {/* السعرات الحرارية */}
                      <div className={`absolute bottom-3 ${currentLang === 'ar' ? 'left-3' : 'right-3'}`}>
                        {dish.calories && String(dish.calories).trim() !== '' && (
                          <span className="bg-white/90 backdrop-blur-md text-[#2c1e14] text-xs px-2.5 py-1 rounded-md font-sans border border-[#d4af37]/30 shadow-sm font-medium">
                            {dish.calories}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="text-xl font-bold text-[#2c1e14]">{displayName}</h3>
                      <p className="text-[#6b5344] text-sm leading-relaxed">{displayDescription}</p>
                      
                      {/* مسببات الحساسية */}
                      {dish.allergens && Array.isArray(dish.allergens) && dish.allergens.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[11px] font-semibold text-[#8c6239] block mb-1.5">
                            {currentLang === 'ar' ? 'مسببات الحساسية:' : 'Allergens:'}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {dish.allergens.map((allergenKey) => {
                              const allergen = allergenLabels[allergenKey];
                              return allergen ? (
                                <div
                                  key={allergenKey}
                                  title={allergen.name}
                                  className={`flex items-center gap-1.5 bg-amber-50/90 border border-amber-200/80 px-2.5 py-1 rounded-lg shadow-2xs`}
                                >
                                  <span className="text-sm">{allergen.icon}</span>
                                  <span className="text-[11px] font-medium text-amber-900">{allergen.name}</span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-[#d4af37]/15 mt-2 pt-3">
                    <span className="text-lg font-bold text-[#8c6239] font-sans">
                      {typeof dish.price === 'number' ? `${dish.price} ${currentLang === 'ar' ? 'ر.س' : 'SAR'}` : dish.price}
                    </span>
                    <button 
                      onClick={() => handleAddToCartClick(dish)}
                      className={`${
                        isAdded 
                          ? 'bg-green-600 text-white scale-95' 
                          : 'bg-[#d4af37] hover:bg-[#c49f27] text-white'
                      } px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm`}
                    >
                      {isAdded ? (currentLang === 'ar' ? '✓ تمت الإضافة' : '✓ Added') : (currentLang === 'ar' ? 'أضف للسلة' : 'Add to Cart')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#d4af37]/30 shadow-sm">
            <p className="text-[#6b5344] text-base">
              {currentLang === 'ar' ? 'عذراً، لم نجد أطباق مطابقة في هذا القسم حالياً.' : 'Sorry, no matching dishes found in this category.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};