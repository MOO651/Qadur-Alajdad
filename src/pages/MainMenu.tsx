import { useState } from 'react';
import { Plus, Flame } from 'lucide-react';

const menuSections = [
  {
    id: "soups",
    category: "الشوربات",
    items: [
      { name: "عدس", price: 17, calories: "180", image: "/png.jpeg" },
      { name: "حب", price: 19, calories: "210", image: "/png (2).jpeg" },
      { name: "مقادم", price: 26, calories: "320", image: "/png (3).jpeg" },
    ]
  },
  {
    id: "cold-appetizers",
    category: "السلطات والمقبلات الباردة",
    items: [
      { name: "سلطة البر", price: 14, calories: "90", image: "/png.jpeg" },
      { name: "فتوش", price: 14, calories: "150", image: "/png (2).jpeg" },
      { name: "تبولة", price: 14, calories: "120", image: "/png (3).jpeg" },
      { name: "جرجير شمندر", price: 14, calories: "80", image: "/png.jpeg" },
      { name: "بامية رمان", price: 18, calories: "140", image: "/png (2).jpeg" },
      { name: "سلطة لبن", price: 12, calories: "90", image: "/png (3).jpeg" },
      { name: "سلطة أقط", price: 18, calories: "160", image: "/png.jpeg" },
      { name: "حمص", price: 13, calories: "180", image: "/png (2).jpeg" },
      { name: "متبل", price: 13, calories: "170", image: "/png (3).jpeg" },
      { name: "كبيبة حائل", price: 23, calories: "320", image: "/png.jpeg" },
    ]
  },
  {
    id: "hot-appetizers",
    category: "مقبلات حارة",
    items: [
      { name: "سمبوسة لحم", price: 12, calories: "250", image: "/png (2).jpeg" },
      { name: "سمبوسة دجاج", price: 12, calories: "230", image: "/png (3).jpeg" },
      { name: "سمبوسة جبن", price: 9, calories: "240", image: "/png.jpeg" },
      { name: "عيش أبو اللحم", price: 14, calories: "280", image: "/png (2).jpeg" },
      { name: "فرموزة", price: 14, calories: "260", image: "/png (3).jpeg" },
      { name: "بف حجازي", price: 12, calories: "290", image: "/png.jpeg" },
      { name: "مطبق مالح", price: 12, calories: "270", image: "/png (2).jpeg" },
      { name: "بطاطا حارة", price: 12, calories: "220", image: "/png (3).jpeg" },
      { name: "بطاطس مقلي", price: 8, calories: "320", image: "/png.jpeg" },
    ]
  },
  {
    id: "stews",
    category: "الإدامات",
    items: [
      { name: "بامية", price: 16, calories: "180", image: "/png (2).jpeg" },
      { name: "ملوخية", price: 14, calories: "160", image: "/png (3).jpeg" },
      { name: "مسقعة", price: 16, calories: "200", image: "/png.jpeg" },
      { name: "قرع", price: 14, calories: "150", image: "/png (2).jpeg" },
    ]
  },
  {
    id: "traditionals",
    category: "الشعبيات والأطباق الجانبية",
    items: [
      { name: "مرقوق", price: 24, calories: "380", image: "/png (3).jpeg" },
      { name: "قرصان", price: 23, calories: "360", image: "/png.jpeg" },
      { name: "جريش حائلي", price: 24, calories: "340", image: "/png (2).jpeg" },
      { name: "جريش نجدي", price: 22, calories: "330", image: "/png (3).jpeg" },
      { name: "مكرونة بشاميل", price: 21, calories: "420", image: "/png.jpeg" },
    ]
  },
  {
    id: "mains",
    category: "الأطباق الرئيسية",
    items: [
      { name: "سليق دجاج", price: 32, calories: "520", image: "/png (2).jpeg" },
      { name: "زروبيان دجاج", price: 28, calories: "600", image: "/png (3).jpeg" },
      { name: "برياني دجاج", price: 27, calories: "580", image: "/png.jpeg" },
      { name: "مقلوبة دجاج", price: 31, calories: "610", image: "/png (2).jpeg" },
      { name: "دجاج فحم", price: 24, calories: "450", image: "/png (3).jpeg" },
      { name: "دجاج شواية", price: 24, calories: "430", image: "/png.jpeg" },
      { name: "مشخول روبيان", price: 32, calories: "480", image: "/png (2).jpeg" },
      { name: "مشخول لحم", price: 78, calories: "650", image: "/png (3).jpeg" },
      { name: "كابلي لحم", price: 78, calories: "700", image: "/png.jpeg" },
      { name: "مثلوثة دجاج", price: 34, calories: "520", image: "/png (2).jpeg" },
      { name: "مثلوثة لحم", price: 86, calories: "750", image: "/png (3).jpeg" },
    ]
  },
  {
    id: "desserts",
    category: "الحلا",
    items: [
      { name: "كريم كراميل", price: 19, calories: "280", image: "/png.jpeg" },
      { name: "ملبية ورد", price: 17, calories: "250", image: "/png (2).jpeg" },
      { name: "ساكو", price: 18, calories: "260", image: "/png (3).jpeg" },
      { name: "بسبوسة قشطة", price: 15, calories: "320", image: "/png.jpeg" },
      { name: "كنافة قشطة", price: 14, calories: "350", image: "/png (2).jpeg" },
      { name: "حنيني", price: 16, calories: "380", image: "/png (3).jpeg" },
      { name: "لقيمات", price: 14, calories: "300", image: "/png.jpeg" },
      { name: "مراصيع عسل", price: 14, calories: "290", image: "/png (2).jpeg" },
    ]
  },
  {
    id: "drinks",
    category: "المشروبات",
    items: [
      { name: "كركديه ورد", price: 12, calories: "60", image: "/png (3).jpeg" },
      { name: "ليمون نعناع", price: 15, calories: "70", image: "/png.jpeg" },
      { name: "برتقال", price: 18, calories: "110", image: "/png (2).jpeg" },
      { name: "بطيخ", price: 18, calories: "90", image: "/png (3).jpeg" },
      { name: "لبن القرية", price: 5, calories: "120", image: "/png.jpeg" },
      { name: "لبن قدور الأجداد", price: 9, calories: "130", image: "/png (2).jpeg" },
      { name: "مشروبات غازية", price: 5, calories: "140", image: "/png (3).jpeg" },
    ]
  }
];

export default function MainMenu({ addToCart }: { addToCart: (item: any, price: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (item: any) => {
    addToCart(item.name, `${item.price} ريال`);
    setAddedId(item.name);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filteredSections = selectedCategory === "all" 
    ? menuSections 
    : menuSections.filter(section => section.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12" dir="rtl">
      {/* الهيدر */}
      <div className="text-center space-y-3">
        <span className="text-[#8c6239] text-xs font-sans tracking-[0.3em] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30">قائمة الطعام</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2c1e14]">المنيو الرئيسي</h1>
      </div>

      {/* شريط التصنيفات العلوي (Tabs) */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
            selectedCategory === "all"
              ? "bg-[#d4af37] text-white border-[#d4af37] shadow-md scale-105"
              : "bg-white text-[#6b5344] border-[#d4af37]/30 hover:border-[#d4af37]"
          }`}
        >
          ✨ الكل
        </button>
        {menuSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setSelectedCategory(section.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
              selectedCategory === section.id
                ? "bg-[#d4af37] text-white border-[#d4af37] shadow-md scale-105"
                : "bg-white text-[#6b5344] border-[#d4af37]/30 hover:border-[#d4af37]"
            }`}
          >
            {section.category}
          </button>
        ))}
      </div>

      {/* عرض الأقسام والأصناف حسب الاختيار */}
      {filteredSections.map((section, idx) => (
        <div key={idx} className="space-y-6">
          <h2 className="text-2xl font-bold text-[#2c1e14] border-r-4 border-[#d4af37] pr-4">{section.category}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item, i) => {
              const isAdded = addedId === item.name;
              return (
                <div key={i} className="bg-white border border-[#d4af37]/30 rounded-3xl overflow-hidden shadow-md hover:border-[#d4af37] transition-all flex flex-col group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('${item.image}')` }}></div>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/40 text-xs text-[#8c6239] font-bold shadow-sm">
                      {item.price} ريال
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div className="space-y-2">
                      <h3 className="text-[#2c1e14] font-bold text-lg">{item.name}</h3>
                      <div className="flex items-center gap-2 text-[#8c6239] bg-[#d4af37]/5 px-2 py-1 rounded-lg w-fit">
                        <Flame className="w-3.5 h-3.5" />
                        <span className="text-xs font-sans">{item.calories} سعرة حرارية</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleAdd(item)}
                      className={`mt-4 w-full py-2.5 rounded-xl text-xs font-sans font-bold transition-all border flex items-center justify-center gap-2 ${
                        isAdded ? 'bg-green-600 text-white border-green-500' : 'bg-[#d4af37] text-white hover:bg-[#c49f27] border-[#d4af37]/40'
                      }`}
                    >
                      {isAdded ? 'تمت الإضافة ✓' : <><Plus className="w-4 h-4" /> أضف للسلة</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* قسم الذبيحة الكاملة */}
      <div className="bg-[#2c1e14] text-white text-center p-8 rounded-3xl border border-[#d4af37]/40 shadow-xl space-y-2">
        <h3 className="text-2xl font-bold">طلب ذبيحة كاملة</h3>
        <p className="text-sm font-sans text-white/70">(كابلي - زروبيان - مندي - شعبي مقمر)</p>
        <div className="pt-2">
          <span className="text-[#d4af37] font-bold">السعر: حسب السعر اليومي</span>
        </div>
      </div>
    </div>
  );
}