export default function DailyMenu({ addToCart }: { addToCart: (item: any) => void }) {
  // مثال للبيانات (تأكد من مطابقتها لهيكل بياناتك)
  const menuItems = [
    { name: "كبسة دجاج", price: "25 ريال", image: "/path-to-image.jpg" },
    { name: "مندي لحم", price: "45 ريال", image: "/path-to-image.jpg" },
    // أضف باقي الأصناف هنا...
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-[#D4AF37] text-center mb-10">المنيو اليومي</h2>
      
      {/* هنا التغيير: تصميم المربعات (Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 group">
            {/* مكان الصورة */}
            <div className="h-40 bg-[#050505] flex items-center justify-center">
              <span className="text-gray-600 text-xs">صورة الصنف</span>
            </div>
            
            {/* تفاصيل المربع */}
            <div className="p-4 space-y-2">
              <h4 className="text-white font-bold text-sm">{item.name}</h4>
              <p className="text-[#D4AF37] font-bold text-lg">{item.price}</p>
              
              <button 
                onClick={() => addToCart(item)}
                className="w-full mt-2 bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2 rounded-lg text-xs font-bold transition-all"
              >
                إضافة للسلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}