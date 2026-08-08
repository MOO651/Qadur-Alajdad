export default function DailyMenu({ addToCart }: { addToCart: (item: any) => void }) {
  // قائمة الأطباق اليومية
  const dailyItems = [
    { name: "شوربة عدس", price: "17 ريال", details: "شوربة عدس دافئة ومتبلة على الطريقة الأصيلة", image: "" },
    { name: "شوربة حب", price: "19 ريال", details: "حب ملكي مطبوخ بمرقة اللحم والسمن البلدي", image: "" },
    { name: "جريش قمح", price: "26 ريال", details: "الجريش السعودي الأصيل باللبن والبصل المحمر", image: "" },
    { name: "سلطة جرجير", price: "13 ريال", details: "ورق جرجير طازج مع الجوز ودبس الرمان", image: "" },
    { name: "سلطة خضراء", price: "14 ريال", details: "خضار مشكلة طازجة مع زيت الزيتون والليمون", image: "" },
    { name: "تبولة", price: "16 ريال", details: "برغل ناعم وبقدونس طازج مع طماطم ونعناع", image: "" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">أطباق جانبية يومياً</span>
        <h2 className="text-3xl font-bold text-[#FFFDF9]">المنيو اليومي والشعبيات</h2>
        <p className="text-gray-400 text-xs sm:text-sm font-sans">نخبة أطباقنا المتاحة يومياً لتستمتع بمذاقها الأصيل</p>
      </div>

      {/* تصميم المربعات المنظمة (Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dailyItems.map((item, index) => (
          <div key={index} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition-all">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="text-[#FFFDF9] font-bold text-lg">{item.name}</h4>
                <span className="text-[#D4AF37] font-sans font-bold text-xs bg-[#D4AF37]/10 px-3 py-1 rounded-lg border border-[#D4AF37]/30">{item.price}</span>
              </div>
              <p className="text-gray-300 text-xs font-sans leading-relaxed">{item.details}</p>
            </div>
            
            <button 
              onClick={() => addToCart(item)}
              className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2.5 rounded-xl text-xs font-sans font-bold transition-all"
            >
              إضافة للسلة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}