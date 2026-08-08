interface DailyMenuProps {
  dailyMenu: Array<{
    category: string;
    image: string;
    items: Array<{ name: string; price: string; image: string }>;
  }>;
  addToCart: (name: string, price: string) => void;
}

export default function DailyMenu({ dailyMenu, addToCart }: DailyMenuProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">المنيو اليومي</span>
        <h2 className="text-3xl font-bold text-[#FFFDF9]">قائمة الأطباق اليومية الطازجة</h2>
        <p className="text-gray-400 text-xs sm:text-sm font-sans">تشكيلة واسعة من أصالة المطبخ السعودي والمقبلات المحضرة يومياً بكل حب</p>
      </div>

      <div className="space-y-16">
        {dailyMenu.map((section, secIdx) => (
          <div key={secIdx} className="space-y-6">
            <div className="flex items-center gap-4 border-b border-[#D4AF37]/30 pb-3">
              <h3 className="text-xl font-bold text-[#D4AF37]">{section.category}</h3>
              <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/30 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-xl hover:border-[#D4AF37] transition-all flex flex-col justify-between group">
                  <div>
                    <div className="h-40 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${item.image}')` }}></div>
                    <div className="p-4 space-y-2">
                      <h4 className="text-[#FFFDF9] font-bold text-base">{item.name}</h4>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between">
                    <span className="text-[#D4AF37] font-sans font-bold text-sm">{item.price}</span>
                    <button 
                      onClick={() => addToCart(item.name, item.price)}
                      className="bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black px-4 py-2 rounded-xl text-xs font-sans font-bold shadow-md hover:opacity-90 transition-all"
                    >
                      أضف للسلة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}