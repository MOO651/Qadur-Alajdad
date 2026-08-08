interface EventsMenuProps {
  weddingMenu: Array<{
    category: string;
    image: string;
    description: string;
    items: Array<{ name: string; price: string; details: string }>;
  }>;
  addToCart: (name: string, price: string) => void;
}

export default function EventsMenu({ weddingMenu, addToCart }: EventsMenuProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">الأفراح والولائم</span>
        <h2 className="text-3xl font-bold text-[#FFFDF9]">مفخرة الولائم والمناسبات الكبرى</h2>
        <p className="text-gray-400 text-xs sm:text-sm font-sans">تجهيز كامل للذبائح البلدية والولائم الفاخرة لتشريف ضيوفكم في الأعراس والمناسبات الخاصة</p>
      </div>

      <div className="space-y-16">
        {weddingMenu.map((section, secIdx) => (
          <div key={secIdx} className="space-y-6">
            <div className="flex items-center gap-4 border-b border-[#D4AF37]/30 pb-3">
              <div>
                <h3 className="text-xl font-bold text-[#D4AF37]">{section.category}</h3>
                <p className="text-gray-400 text-xs font-sans">{section.description}</p>
              </div>
              <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/30 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[#FFFDF9] font-bold text-lg">{item.name}</h4>
                      <span className="text-[#D4AF37] font-sans font-bold text-xs bg-[#D4AF37]/10 px-3 py-1 rounded-lg border border-[#D4AF37]/30">{item.price}</span>
                    </div>
                    <p className="text-gray-300 text-xs font-sans leading-relaxed">{item.details}</p>
                  </div>
                  <button 
                    onClick={() => addToCart(item.name, item.price)}
                    className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2.5 rounded-xl text-xs font-sans font-bold transition-all"
                  >
                    طلب استفسار أو حجز الصنف
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}