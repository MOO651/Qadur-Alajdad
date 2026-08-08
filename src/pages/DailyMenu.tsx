import { Utensils } from 'lucide-react';

interface DailyMenuProps {
  addToCart: (name: string, price: string) => void;
}

export default function DailyMenu({ addToCart }: DailyMenuProps) {
  // مصفوفة الأطباق مقسمة لتظهر بشكل مربعات فخمة
  const menuCategories = [
    {
      category: "الشوربات الساخنة",
      description: "شوربات دافئة ومتبلة على الطريقة الأصيلة",
      items: [
        { name: "شوربة عدس", price: "17 ريال", details: "شوربة عدس دافئة ومتبلة على الطريقة الأصيلة", image: "/png.jpeg" },
        { name: "شوربة حب", price: "19 ريال", details: "حب ملكي مطبوخ بمرقة اللحم والسمن البلدي", image: "/png (2).jpeg" },
        { name: "جريش قمح", price: "26 ريال", details: "الجريش السعودي الأصيل باللبن والبصل المحمر", image: "/png (3).jpeg" }
      ]
    },
    {
      category: "السلطات والمقبلات الباردة",
      description: "مقبلات طازجة ومنعشة لتكملة وجبتك",
      items: [
        { name: "سلطة جرجير", price: "13 ريال", details: "ورق جرجير طازج مع الجوز ودبس الرمان", image: "/png.jpeg" },
        { name: "سلطة خضراء", price: "14 ريال", details: "خضار مشكلة طازجة مع زيت الزيتون والليمون", image: "/png (2).jpeg" },
        { name: "تبولة", price: "16 ريال", details: "برغل ناعم وبقدونس طازج مع طماطم ونعناع", image: "/png (3).jpeg" },
        { name: "سلطة رمان", price: "18 ريال", details: "خضار طازجة مع حب الرمان ودبس الرمان الفاخر", image: "/appetizers.jpg" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16 animate-fadeIn">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">أطباق جانبية يومياً</span>
        <h2 className="text-3xl font-bold text-[#FFFDF9]">المنيو اليومي والشعبيات</h2>
        <p className="text-gray-400 text-xs sm:text-sm font-sans">نخبة أطباقنا المتاحة يومياً لتستمتع بمذاقها الأصيل</p>
      </div>

      <div className="space-y-16">
        {menuCategories.map((section, secIdx) => (
          <div key={secIdx} className="space-y-6">
            <div className="flex items-center gap-4 border-b border-[#D4AF37]/30 pb-3">
              <div>
                <h3 className="text-xl font-bold text-[#D4AF37]">{section.category}</h3>
                <p className="text-gray-400 text-xs font-sans">{section.description}</p>
              </div>
              <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/30 to-transparent"></div>
            </div>

            {/* تصميم المربعات (Grid) لكل قسم */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D4AF37] transition-all">
                  <div className="h-40 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${item.image}')` }}></div>
                  <div className="p-5 space-y-3 flex flex-col flex-grow justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[#FFFDF9] font-bold text-base">{item.name}</h4>
                        <span className="text-[#D4AF37] font-sans font-bold text-xs bg-[#D4AF37]/10 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">{item.price}</span>
                      </div>
                      <p className="text-gray-300 text-xs font-sans leading-relaxed">{item.details}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(item.name, item.price)}
                      className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2.5 rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Utensils className="w-3.5 h-3.5" /> أضف للسلة
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