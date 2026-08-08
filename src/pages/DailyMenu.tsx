import { useState } from 'react';
import { menuDishes } from '../data/menuData';
import type { Dish } from '../data/menuData';
import { Search } from 'lucide-react';

interface DailyMenuProps {
  addToCart: (item: Dish) => void;
}

export default function DailyMenu({ addToCart }: DailyMenuProps) {
  const [selectedSubTab, setSelectedSubTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // استخراج عناصر المنيو اليومي فقط
  const dailyDishes = menuDishes.filter(dish => dish.category === 'daily');

  // الأقسام المتاحة للتبديل (يمكنك تعديلها حسب رغبتك)
  const subTabs = [
    { id: 'all', name: 'الكل' },
    { id: 'main', name: 'الأطباق الرئيسية' },
    { id: 'appetizers', name: 'المقبلات' },
    { id: 'drinks', name: 'المشروبات' },
    { id: 'desserts', name: 'الحلويات' },
  ];

  // تصفية الأطباق بناءً على التبويب المختار ونص البحث
  const filteredDishes = dailyDishes.filter(dish => {
    // تصفية حسب التبويب
    const matchesTab = 
      selectedSubTab === 'all' || 
      dish.subCategory === selectedSubTab || 
      (selectedSubTab === 'drinks' && dish.name.toLowerCase().includes('مشروب')) || // أو حسب تصنيفك
      (selectedSubTab === 'main' && (!dish.subCategory || dish.subCategory === 'main'));

    // تصفية حسب البحث
    const matchesSearch = 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* العنوان */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">المنيو اليومي الأصيل</span>
        <h2 className="text-3xl font-bold text-[#FFFDF9]">ما تيسر من قدور الأجداد اليوم</h2>
        <p className="text-gray-400 text-xs sm:text-sm font-sans">تشكيلة طازجة ومحضرة يومياً بأجود المكونات المحلية</p>
      </div>

      {/* شريط البحث والتبويبات */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* شريط البحث */}
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن طبقك المفضلة أو المشروب..."
            className="w-full bg-[#181513] border border-[#D4AF37]/30 rounded-2xl py-3.5 pr-12 pl-4 text-white text-sm focus:border-[#D4AF37] outline-none shadow-lg placeholder:text-gray-500"
          />
        </div>

        {/* أزرار التنقل بين الأقسام (التبويبات) */}
        <div className="flex flex-wrap justify-center gap-2 bg-[#181513] p-2 rounded-2xl border border-[#D4AF37]/20 shadow-xl">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedSubTab === tab.id
                  ? 'bg-[#D4AF37] text-black shadow-md scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-black/40'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* عرض الأطباق */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <div key={dish.id} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D4AF37] transition-all">
              <div className="relative h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${dish.image}')` }}>
                {dish.badge && (
                  <span className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] px-2.5 py-1 rounded-full font-bold">
                    {dish.badge}
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-[#FFFDF9] font-bold text-base leading-snug">{dish.name}</h4>
                    <span className="text-[#D4AF37] font-sans font-bold text-sm whitespace-nowrap bg-[#D4AF37]/10 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                      {dish.price} ريال
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs font-sans leading-relaxed">{dish.description}</p>
                </div>

                <button 
                  onClick={() => addToCart(dish)}
                  className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2.5 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-2 mt-4"
                >
                  إضافة للسلة +
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-400 bg-[#181513] rounded-2xl border border-[#D4AF37]/20">
            <p className="text-base">عذراً، لم نجد نتائج مطابقة لبحثك في هذا القسم.</p>
          </div>
        )}
      </div>
    </div>
  );
}