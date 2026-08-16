import { useState, useMemo } from 'react';
import { 
  Utensils, 
  Flame, 
  Wheat, 
  Cake, 
  Plus,
  Search,
  Image as ImageIcon 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BreakfastMenuProps {
  addToCart: (item: any) => void;
}

interface MenuItemData {
  ar: string;
  en: string;
  price: number;
  image?: string;
}

interface MenuCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: any;
  items: MenuItemData[];
}

const menuCategories: MenuCategory[] = [
  {
    id: 'hot',
    titleAr: 'الأطباق الساخنة',
    titleEn: 'Hot Dishes',
    icon: Flame,
    items: [
      { ar: 'كبدة غنم', en: 'Mutton Liver', price: 28, image: '' },
      { ar: 'مقلقل غنمي', en: 'Mutton Magqlqel', price: 32, image: '' },
      { ar: 'فول بالطريقة السعودية', en: 'Saudi Style Ful', price: 16, image: '' },
      { ar: 'فول قلابة سعودي', en: 'Saudi Qallaba Ful', price: 18, image: '' },
      { ar: 'بيض مسلوق', en: 'Boiled Eggs', price: 10, image: '' },
      { ar: 'شكشوكة قدور الأجداد', en: 'Grandparents Pots Shakshouka', price: 22, image: '' },
      { ar: 'کباب ميرو', en: 'Miro Kebab', price: 24, image: '' },
      { ar: 'حمسة باذنجان مع الأجبان', en: 'Eggplant & Cheese Hamsa', price: 20, image: '' },
      { ar: 'حمسة بليلة', en: 'Balila Hamsa', price: 15, image: '' },
      { ar: 'مرق طماطم نجدية', en: 'Najdi Tomato Broth', price: 14, image: '' },
      { ar: 'فتة فول أخضر', en: 'Green Bean Fatteh', price: 22, image: '' },
      { ar: 'لحسة قدور الأجداد', en: 'Grandparents Pots Lahsa', price: 25, image: '' }
    ]
  },
  {
    id: 'appetizers',
    titleAr: 'الأجبان والمخللات والمقبلات',
    titleEn: 'Cheeses, Pickles & Appetizers',
    icon: Utensils,
    items: [
      { ar: 'أجبان مشكلة', en: 'Assorted Cheeses', price: 30, image: '' },
      { ar: 'زيتون بنكهات مختلفة', en: 'Flavored Olives', price: 12, image: '' },
      { ar: 'مخللات حجازية', en: 'Hijazi Pickles', price: 10, image: '' },
      { ar: 'مربيات بنكهات مختلفة', en: 'Assorted Jams', price: 14, image: '' },
      { ar: 'حلاوة طحينية مشكلة', en: 'Assorted Halva', price: 15, image: '' },
      { ar: 'حلاوة اللدو واللبنة والهريسة مشكلة', en: 'Ladoo, Labneh & Harissa Sweets', price: 25, image: '' },
      { ar: 'لبنة قدور الأجداد', en: 'Grandparents Pots Labneh', price: 18, image: '' },
      { ar: 'مش حجازي', en: 'Hijazi Mish', price: 16, image: '' },
      { ar: 'كبيبة حائل', en: 'Hail Kubeba', price: 22, image: '' },
      { ar: 'أشار', en: 'Achar', price: 10, image: '' }
    ]
  },
  {
    id: 'bakery',
    titleAr: 'المعجنات والمخبوزات',
    titleEn: 'Bakery & Pastries',
    icon: Wheat,
    items: [
      { ar: 'مطبق حلو ومالح', en: 'Sweet & Savory Mutabbaq', price: 18, image: '' },
      { ar: 'يغمش', en: 'Yammash', price: 8, image: '' },
      { ar: 'منتو', en: 'Mantu', price: 9, image: '' },
      { ar: 'فرموزة', en: 'Formoza', price: 8, image: '' },
      { ar: 'عيش أبو اللحم', en: 'Aish Abu Al-Lahem', price: 20, image: '' },
      { ar: 'بف حجازي', en: 'Hijazi Puff', price: 6, image: '' },
      { ar: 'خلية النحل', en: 'Beehive Pastry', price: 22, image: '' },
      { ar: 'قاضي القضاة المديني', en: 'Madani Qadi Al-Qudat', price: 15, image: '' },
      { ar: 'كبة جبن', en: 'Cheese Kibbeh', price: 12, image: '' },
      { ar: 'كبة حساوية', en: 'Hasaawi Kibbeh', price: 14, image: '' },
      { ar: 'كبة شمندر', en: 'Beetroot Kibbeh', price: 14, image: '' },
      { ar: 'بسطيلة (مستحدثة)', en: 'Modern Bastilla', price: 35, image: '' },
      { ar: 'سمبوسك مشكلة', en: 'Assorted Samosa', price: 15, image: '' }
    ]
  },
  {
    id: 'sweets',
    titleAr: 'الحلويات',
    titleEn: 'Sweets',
    icon: Cake,
    items: [
      { ar: 'عريكة', en: 'Areika', price: 25, image: '' },
      { ar: 'معصوب', en: 'Masoub', price: 22, image: '' }
    ]
  }
];

export default function BreakfastMenu({ addToCart }: BreakfastMenuProps) {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const t = {
    ar: {
      badge: "منيو التعتيمة",
      title: "🍳 تعتيمة قدور الأجداد الأصيلة",
      subtitle: "أشهى أطباق الإفطار والتعتيمة الحجازية والنجدية التقليدية",
      desc: "يُقدم طازجاً وساخناً بأجود المكونات الشعبية الأصيلة.",
      searchPlaceholder: "ابحث عن طبق في القسم الحالي...",
      addBtn: "إضافة للطلب",
      addedBtn: "✓ تمت الإضافة",
      currency: "ر.س",
      noResults: "عذراً، لم نجد أطباق مطابقة للبحث."
    },
    en: {
      badge: "Tatimah Menu",
      title: "🍳 Authentic Grandparents Pots Breakfast",
      subtitle: "Delicious traditional Hijazi and Najdi breakfast and tatimah dishes",
      desc: "Served fresh and hot with the finest authentic traditional ingredients.",
      searchPlaceholder: "Search for a dish in this category...",
      addBtn: "Add to Order",
      addedBtn: "✓ Added",
      currency: "SAR",
      noResults: "Sorry, no dishes match your search."
    }
  };

  const currentT = t[lang];

  // تصفية الأطباق بناءً على البحث داخل الفئة النشطة
  const filteredItems = useMemo(() => {
    const currentItems = menuCategories[activeCategory].items;
    if (!searchQuery.trim()) return currentItems;
    
    return currentItems.filter(item => 
      item.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.en.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, searchQuery]);

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
                onClick={() => {
                  setActiveCategory(index);
                  setSearchQuery(''); // إعادة تعيين البحث عند تغيير القسم
                }}
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
          
          {/* Section Title & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-[#d4af37]/20">
            <div className="flex items-center gap-3 w-full md:w-auto">
              {(() => {
                const ActiveIcon = menuCategories[activeCategory].icon;
                return <ActiveIcon className="w-7 h-7 text-[#d4af37]" />;
              })()}
              <h3 className="text-2xl font-bold text-[#8c6239]">
                {lang === 'ar' ? menuCategories[activeCategory].titleAr : menuCategories[activeCategory].titleEn}
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <span className={`absolute inset-y-0 ${lang === 'ar' ? 'right-3' : 'left-3'} flex items-center pointer-events-none text-[#8c6239]/60`}>
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentT.searchPlaceholder}
                className={`w-full py-2 bg-[#f5f1ea]/50 border border-[#d4af37]/30 rounded-xl text-xs text-[#2c1e14] focus:outline-none focus:border-[#d4af37] transition ${
                  lang === 'ar' ? 'pr-9 pl-4' : 'pl-9 pr-4'
                }`}
              />
            </div>
          </div>

          {/* Grid Items */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((itemObj, idx) => {
                const dishName = lang === 'ar' ? itemObj.ar : itemObj.en;
                const dishItem = {
                  id: `bf-${activeCategory}-${idx}`,
                  name: dishName,
                  price: itemObj.price,
                  description: currentT.desc,
                  image: itemObj.image || ''
                };

                const isAdded = addedId === dishItem.id;

                return (
                  <div 
                    key={dishItem.id} 
                    className="bg-[#f5f1ea]/40 rounded-2xl border border-[#d4af37]/20 flex flex-col justify-between shadow-sm hover:border-[#d4af37] hover:bg-[#f5f1ea] transition-all overflow-hidden group"
                  >
                    {/* Image Container */}
                    <div className="w-full h-40 bg-[#e8e2d5] flex items-center justify-center relative border-b border-[#d4af37]/20 overflow-hidden">
                      {dishItem.image ? (
                        <img src={dishItem.image} alt={dishName} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-[#8c6239]/60">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-[11px] font-medium">{lang === 'ar' ? 'صورة الطبق قريباً' : 'Image Coming Soon'}</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#8c6239] font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-sm border border-[#d4af37]/30">
                        {itemObj.price} {currentT.currency}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="text-lg font-bold text-[#2c1e14] mb-2">{dishName}</h4>
                        <p className="text-[#6b5344] text-xs mb-4 leading-relaxed">
                          {currentT.desc}
                        </p>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-end pt-3 border-t border-[#d4af37]/15">
                        <button 
                          onClick={() => handleAddClick(dishItem)}
                          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 text-xs shadow-sm border ${
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
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-[#6b5344] text-sm">
              {currentT.noResults}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}