export default function DailyMenu({ addToCart }: { addToCart: (item: any) => void }) {
  const items = [
    { name: "شوربة عدس", price: "17 ريال", details: "شوربة عدس دافئة ومتبلة على الطريقة الأصيلة" },
    { name: "شوربة حب", price: "19 ريال", details: "حب ملكي مطبوخ بمرقة اللحم والسمن البلدي" },
    { name: "جريش قمح", price: "26 ريال", details: "الجريش السعودي الأصيل باللبن والبصل المحمر" },
    { name: "سلطة جرجير", price: "13 ريال", details: "ورق جرجير طازج مع الجوز ودبس الرمان" },
    { name: "سلطة خضراء", price: "14 ريال", details: "خضار مشكلة طازجة مع زيت الزيتون والليمون" },
    { name: "تبولة", price: "16 ريال", details: "برغل ناعم وبقدونس طازج مع طماطم ونعناع" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-[#D4AF37]">المنيو اليومي والشعبيات</h2>
        <p className="text-gray-400 text-xs">نخبة أطباقنا المتاحة يومياً لتستمتع بمذاقها الأصيل</p>
      </div>

      {/* تصميم المربعات المنظمة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition-all">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="text-white font-bold text-lg">{item.name}</h4>
                <span className="text-[#D4AF37] font-bold text-xs bg-[#D4AF37]/10 px-3 py-1 rounded-lg border border-[#D4AF37]/30">{item.price}</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">{item.details}</p>
            </div>
            
            <button 
              onClick={() => addToCart(item)}
              className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2.5 rounded-xl text-xs font-bold transition-all"
            >
              إضافة للسلة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}