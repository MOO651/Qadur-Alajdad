import { useState } from 'react';
import { menuDishes, subCategoriesMap, allergenLabels, type Dish } from '../data/menuData';
import { useLanguage } from '../context/LanguageContext';

interface MenuSectionProps {
  selectedMainCat?: string;
  onAddToCart: (dish: Dish) => void;
}

// مكون فرعي لعرض أيقونات مسببات الحساسية مع تلميحات الأسماء
const AllergenIcons = ({ allergens }: { allergens?: string[] }) => {
  if (!allergens || allergens.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1 mb-2" title="مسببات الحساسية">
      {allergens.map((key) => {
        const allergen = allergenLabels[key];
        return allergen ? (
          <span 
            key={key} 
            title={allergen.name} 
            className="cursor-help text-sm bg-[#f5f1ea] px-2 py-0.5 rounded-lg border border-[#d4af37]/20"
          >
            {allergen.icon}
          </span>
        ) : null;
      })}
    </div>
  );
};

export default function MenuSection({ selectedMainCat = 'najd', onAddToCart }: MenuSectionProps) {
  const { lang } = useLanguage();
  const [selectedSubCat, setSelectedSubCat] = useState('all-najd');
  const [addedId, setAddedId] = useState<string | null>(null);

  // نصوص الترجمة الخاصة بالقسم
  const t = {
    ar: {
      taxIncluded: "السعر شامل الضريبة",
      currency: "ر.س",
      addBtn: "إضافة للطلب +",
      addedBtn: "✓ تمت الإضافة",
      noDishes: "عذراً، لا توجد أطباق متاحة في هذا القسم حالياً."
    },
    en: {
      taxIncluded: "Tax included",
      currency: "SAR",
      addBtn: "Add to Order +",
      addedBtn: "✓ Added",
      noDishes: "Sorry, no dishes available in this section currently."
    }
  };

  const currentT = t[lang];
  const subCategories = subCategoriesMap[selectedMainCat] || [];
  
  const filteredDishes = menuDishes.filter(dish => {
    if (dish.category !== selectedMainCat) return false;
    if (selectedSubCat.startsWith('all')) return true;
    return dish.subCategory === selectedSubCat;
  });

  const handleAddClick = (dish: Dish) => {
    onAddToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="space-y-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* تبويبات الأقسام الفرعية */}
      <div className="flex flex-wrap justify-center gap-2.5 bg-white p-2.5 rounded-2xl border border-[#d4af37]/30 max-w-2xl mx-auto shadow-md">
        {subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubCat(sub.id)}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
              selectedSubCat === sub.id
                ? 'bg-[#d4af37] text-white shadow-md scale-105'
                : 'text-[#6b5344] hover:text-[#2c1e14] hover:bg-[#f5f1ea]'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* شبكة الأطباق الملكية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => {
            const isAdded = addedId === dish.id;
            return (
              <div 
                key={dish.id} 
                className="bg-white rounded-3xl overflow-hidden border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-500 group shadow-lg flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {dish.badge && (
                      <span className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-md text-[#8c6239] border border-[#d4af37]/50 px-3.5 py-1 rounded-full text-[11px] font-extrabold shadow-sm`}>
                        {dish.badge}
                      </span>
                    )}

                    {dish.calories && (
                      <span className={`absolute bottom-4 ${lang === 'ar' ? 'left-4' : 'right-4'} bg-black/60 backdrop-blur-md text-stone-200 px-3 py-1 rounded-xl text-[10px] font-medium border border-white/20`}>
                        ⚡ {dish.calories}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#2c1e14] mb-2 group-hover:text-[#8c6239] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-[#6b5344] text-xs md:text-sm leading-relaxed mb-3 font-light">
                      {dish.description}
                    </p>
                    
                    {/* عرض أيقونات مسببات الحساسية تحت الوصف */}
                    <AllergenIcons allergens={dish.allergens} />
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-[#d4af37]/15 pt-4 mt-auto">
                  <div>
                    <span className="text-[10px] text-[#8c6239] block">{currentT.taxIncluded}</span>
                    <span className="text-xl font-black text-[#2c1e14]">
                      {dish.price} <span className="text-xs font-normal text-[#6b5344]">{currentT.currency}</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => handleAddClick(dish)}
                    className={`font-black px-5 py-2.5 rounded-xl text-xs transition-all shadow-md border ${
                      isAdded
                        ? 'bg-green-600 text-white border-green-500 scale-95'
                        : 'bg-[#d4af37] text-white hover:scale-105 hover:bg-[#c49f27] border-[#d4af37]/40 shadow-sm'
                    }`}
                  >
                    {isAdded ? currentT.addedBtn : currentT.addBtn}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center text-[#6b5344] bg-white rounded-3xl border border-[#d4af37]/30 shadow-sm">
            <p className="text-lg font-medium">{currentT.noDishes}</p>
          </div>
        )}
      </div>

    </div>
  );
}