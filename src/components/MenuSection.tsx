import { useState } from 'react';
import { menuDishes, subCategoriesMap } from '../data/menuData';

interface MenuSectionProps {
  selectedMainCat?: string;
}

export default function MenuSection({ selectedMainCat = 'najd' }: MenuSectionProps) {
  const [selectedSubCat, setSelectedSubCat] = useState('all-najd');

  const subCategories = subCategoriesMap[selectedMainCat] || [];
  
  const filteredDishes = menuDishes.filter(dish => {
    if (dish.category !== selectedMainCat) return false;
    if (selectedSubCat.startsWith('all')) return true;
    return dish.subCategory === selectedSubCat;
  });

  return (
    <div className="space-y-10">
      
      {/* تبويبات الأقسام الفرعية */}
      <div className="flex flex-wrap justify-center gap-2.5 bg-[#0f0c08] p-2 rounded-2xl border border-[#261e12] max-w-2xl mx-auto shadow-xl">
        {subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubCat(sub.id)}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
              selectedSubCat === sub.id
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black shadow-lg scale-105'
                : 'text-gray-400 hover:text-white hover:bg-[#1a140d]'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* شبكة الأطباق الملكية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <div 
              key={dish.id} 
              className="bg-[#0f0c08] rounded-3xl overflow-hidden border border-[#241c10] hover:border-[#d4af37]/60 transition-all duration-500 group shadow-xl flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(212,175,55,0.15)] hover:-translate-y-1.5"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c08] via-transparent to-black/30"></div>
                  
                  {dish.badge && (
                    <span className="absolute top-4 right-4 bg-[#14100c]/90 backdrop-blur-md text-[#f3e5ab] border border-[#d4af37]/50 px-3.5 py-1 rounded-full text-[11px] font-black shadow-lg">
                      {dish.badge}
                    </span>
                  )}

                  {dish.calories && (
                    <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-gray-300 px-3 py-1 rounded-xl text-[10px] font-medium border border-white/10">
                      ⚡ {dish.calories}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#f3e5ab] transition-colors">{dish.name}</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-light">{dish.description}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-[#1e170f] pt-4 mt-auto">
                <div>
                  <span className="text-[10px] text-gray-400 block">السعر شامل الضريبة</span>
                  <span className="text-xl font-black text-[#d4af37]">{dish.price} <span className="text-xs font-normal text-gray-300">ر.س</span></span>
                </div>
                <button className="bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-black font-black px-5 py-2.5 rounded-xl text-xs hover:scale-105 transition-all shadow-md shadow-[#d4af37]/20 border border-white/20">
                  إضافة للطلب +
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400 bg-[#0f0c08] rounded-3xl border border-[#241c10]">
            <p className="text-lg">عذراً، لا توجد أطباق متاحة في هذا القسم حالياً.</p>
          </div>
        )}
      </div>

    </div>
  );
}