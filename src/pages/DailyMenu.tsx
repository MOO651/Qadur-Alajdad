import { Utensils } from 'lucide-react';
import { menuDishes } from '../data/menuData'; // تأكد من مسار ملف البيانات لديك

interface DailyMenuProps {
  addToCart: (item: any) => void;
}

export default function DailyMenu({ addToCart }: DailyMenuProps) {
  // تصفية الأطباق الخاصة بالمنيو اليومي والأقسام العامة أو نجد
  const dailyItems = menuDishes.filter(dish => dish.category === 'najd' || dish.category === 'general');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">أطباق قدور الأجداد</span>
        <h2 className="text-3xl font-bold text-[#FFFDF9]">المنيو اليومي والشعبيات</h2>
        <p className="text-gray-400 text-xs sm:text-sm font-sans">نخبة أطباقنا المتاحة يومياً لتستمتع بمذاقها الأصيل</p>
      </div>

      {/* تصميم المربعات المنظمة (Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {dailyItems.map((dish) => (
          <div key={dish.id} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D4AF37] transition-all">
            {/* صورة الصنف مع الشارة (Badge) */}
            <div className="relative h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${dish.image}')` }}>
              {dish.badge && (
                <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] px-2.5 py-1 rounded-full font-bold">
                  {dish.badge}
                </span>
              )}
            </div>

            {/* تفاصيل الصنف */}
            <div className="p-5 space-y-3 flex flex-col flex-grow justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-[#FFFDF9] font-bold text-base leading-snug">{dish.name}</h4>
                  <span className="text-[#D4AF37] font-sans font-bold text-sm whitespace-nowrap bg-[#D4AF37]/10 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                    {dish.price} ريال
                  </span>
                </div>
                <p className="text-gray-300 text-xs font-sans leading-relaxed line-clamp-2">{dish.description}</p>
                {dish.calories && (
                  <span className="text-gray-500 text-[11px] block">{dish.calories}</span>
                )}
              </div>

              {/* زر الإضافة للسلة */}
              <button 
                onClick={() => addToCart(dish)}
                className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2.5 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Utensils className="w-3.5 h-3.5" /> أضف للسلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}