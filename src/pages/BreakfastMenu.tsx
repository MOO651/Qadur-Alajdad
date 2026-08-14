import { useState } from 'react';
import { 
  Utensils, 
  Flame, 
  Wheat, 
  Cake, 
  Plus 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BreakfastMenuProps {
  addToCart: (item: any) => void;
}

interface MenuCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: any;
  items: { ar: string; en: string }[];
}

const menuCategories: MenuCategory[] = [
  {
    id: 'hot',
    titleAr: 'الأطباق الساخنة',
    titleEn: 'Hot Dishes',
    icon: Flame,
    items: [
      { ar: 'كبدة غنم', en: 'Mutton Liver' },
      { ar: 'مقلقل غنمي', en: 'Mutton Magqlqel' },
      { ar: 'فول بالطريقة السعودية', en: 'Saudi Style Ful' },
      { ar: 'فول قلابة سعودي', en: 'Saudi Qallaba Ful' },
      { ar: 'بيض مسلوق', en: 'Boiled Eggs' },
      { ar: 'شكشوكة قدور الأجداد', en: 'Grandparents Pots Shakshouka' },
      { ar: 'کباب ميرو', en: 'Miro Kebab' },
      { ar: 'حمسة باذنجان مع الأجبان', en: 'Eggplant & Cheese Hamsa' },
      { ar: 'حمسة بليلة', en: 'Balila Hamsa' },
      { ar: 'مرق طماطم نجدية', en: 'Najdi Tomato Broth' },
      { ar: 'فتة فول أخضر', en: 'Green Bean Fatteh' },
      { ar: 'لحسة قدور الأجداد', en: 'Grandparents Pots Lahsa' }
    ]
  },
  {
    id: 'appetizers',
    titleAr: 'الأجبان والمخللات والمقبلات',
    titleEn: 'Cheeses, Pickles & Appetizers',
    icon: Utensils,
    items: [
      { ar: 'أجبان مشكلة', en: 'Assorted Cheeses' },
      { ar: 'زيتون بنكهات مختلفة', en: 'Flavored Olives' },
      { ar: 'مخللات حجازية', en: 'Hijazi Pickles' },
      { ar: 'مربيات بنكهات مختلفة', en: 'Assorted Jams' },
      { ar: 'حلاوة طحينية مشكلة', en: 'Assorted Halva' },
      { ar: 'حلاوة اللدو واللبنة والهريسة مشكلة', en: 'Ladoo, Labneh & Harissa Sweets' },
      { ar: 'لبنة قدور الأجداد', en: 'Grandparents Pots Labneh' },
      { ar: 'مش حجازي', en: 'Hijazi Mish' },
      { ar: 'كبيبة حائل', en: 'Hail Kubeba' },
      { ar: 'أشار', en: 'Achar' }
    ]
  },
  {
    id: 'bakery',
    titleAr: 'المعجنات والمخبوزات',
    titleEn: 'Bakery & Pastries',
    icon: Wheat,
    items: [
      { ar: 'مطبق حلو ومالح', en: 'Sweet & Savory Mutabbaq' },
      { ar: 'يغمش', en: 'Yammash' },
      { ar: 'منتو', en: 'Mantu' },
      { ar: 'فرموزة', en: 'Formoza' },
      { ar: 'عيش أبو اللحم', en: 'Aish Abu Al-Lahem' },
      { ar: 'بف حجازي', en: 'Hijazi Puff' },
      { ar: 'خلية النحل', en: 'Beehive Pastry' },
      { ar: 'قاضي القضاة المديني', en: 'Madani Qadi Al-Qudat' },
      { ar: 'كبة جبن', en: 'Cheese Kibbeh' },
      { ar: 'كبة حساوية', en: 'Hasaawi Kibbeh' },
      { ar: 'كبة شمندر', en: 'Beetroot Kibbeh' },
      { ar: 'بسطيلة (مستحدثة)', en: 'Modern Bastilla' },
      { ar: 'سمبوسك مشكلة', en: 'Assorted Samosa' }
    ]
  },
  {
    id: 'sweets',
    titleAr: 'الحلويات',
    titleEn: 'Sweets',
    icon: Cake,
    items: [
      { ar: 'عريكة', en: 'Areika' },
      { ar: 'معصوب', en: 'Masoub' }
    ]
  }
];

export default function BreakfastMenu({ addToCart }: BreakfastMenuProps) {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  const t = {
    ar: {
      badge: "قائمة التعتيمة والإفطار",
      title: "🍳 تعتيمة قدور الأجداد الأصيلة",
      subtitle: "أشهى أطباق الإفطار والتعتيمة الحجازية والنجدية التقليدية",
      desc: "يُقدم طازجاً وساخناً بأجود المكونات الشعبية الأصيلة.",
      priceLabel: "45 ر.س",
      addBtn: "إضافة للطلب",
      addedBtn: "✓ تمت الإضافة"
    },
    en: {
      badge: "Breakfast & Tatimah Menu",
      title: "🍳 Authentic Grandparents Pots Breakfast",
      subtitle: "Delicious traditional Hijazi and Najdi breakfast and tatimah dishes",
      desc: "Served fresh and hot with the finest authentic traditional ingredients.",
      priceLabel: "45 SAR",
      addBtn: "Add to Order",
      addedBtn: "✓ Added"
    }
  };

  const currentT = t[lang];

  const handleAddClick = (dishItem: any) => {
    addToCart(dishItem);
    setAddedId(dishItem.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#2c1e14] p-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center mb-8 bg-white py-10 px-4 rounded-3xl border border-[#d4af37]/30 shadow-sm">
          <span className="text-[#8c6239] text-xs font-bold tracking-widest uppercase mb-2 block bg-[#d4af37]/10 w-fit mx-auto px-4 py-1.5 rounded-full border border-[#d4af37]/30">
            {currentT.badge}
          </span>
          <h1 className="text-3xl font-extrabold text-[#2c1e14] mb-2">{currentT.title}</h1>
          <p className="text-[#6b5344] text-sm">{currentT.subtitle}</p>
        </header>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {menuCategories.map((cat, index) => {
            const IconComponent = cat.icon;
            const isActive = activeCategory === index;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm border ${
                  isActive
                    ? 'bg-[#d4af37] text-white border-[#d4af37] scale-105 shadow-md'
                    : 'bg-white text-[#4a3525] border-[#d4af37]/30 hover:border-[#d4af37]'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{lang === 'ar' ? cat.titleAr : cat.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display Box */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#d4af37]/30 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d4af37]/20">
            {(() => {
              const ActiveIcon = menuCategories[activeCategory].icon;
              return <ActiveIcon className="w-7 h-7 text-[#d4af37]" />;
            })()}
            <h3 className="text-2xl font-bold text-[#8c6239]">
              {lang === 'ar' ? menuCategories[activeCategory].titleAr : menuCategories[activeCategory].titleEn}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuCategories[activeCategory].items.map((itemObj, idx) => {
              const dishName = lang === 'ar' ? itemObj.ar : itemObj.en;
              const dishItem = {
                id: `bf-${activeCategory}-${idx}`,
                name: dishName,
                price: 45,
                description: currentT.desc,
                image: ''
              };

              const isAdded = addedId === dishItem.id;

              return (
                <div 
                  key={dishItem.id} 
                  className="bg-[#f5f1ea]/40 p-5 rounded-2xl border border-[#d4af37]/20 flex flex-col justify-between shadow-sm hover:border-[#d4af37] hover:bg-[#f5f1ea] transition-all"
                >
                  <div>
                    <h4 className="text-lg font-bold text-[#2c1e14] mb-2">{dishName}</h4>
                    <p className="text-[#6b5344] text-xs mb-4 leading-relaxed">
                      {currentT.desc}
                    </p>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between pt-3 border-t border-[#d4af37]/15">
                    <span className="text-sm font-bold text-[#8c6239] font-sans">{currentT.priceLabel}</span>
                    <button 
                      onClick={() => handleAddClick(dishItem)}
                      className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 text-xs shadow-sm border ${
                        isAdded
                          ? 'bg-green-600 text-white border-green-500 scale-95'
                          : 'bg-[#d4af37] text-white hover:bg-[#c49f27] border-[#d4af37]/40'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      {isAdded ? currentT.addedBtn : currentT.addBtn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}