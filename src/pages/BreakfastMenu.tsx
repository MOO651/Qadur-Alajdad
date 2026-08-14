import { useState } from 'react';
import { 
  Coffee, 
  Utensils, 
  Flame, 
  Wheat, 
  Cake, 
  Plus 
} from 'lucide-react';

interface BreakfastMenuProps {
  addToCart: (item: any) => void;
}

interface MenuCategory {
  title: string;
  icon: any;
  items: string[];
}

const menuCategories: MenuCategory[] = [
  {
    title: 'الأطباق الساخنة',
    icon: Flame,
    items: [
      'كبدة غنم', 'مقلقل غنمي', 'فول بالطريقة السعودية', 'فول قلابة سعودي',
      'بيض مسلوق', 'شكشوكة قدور الأجداد', 'کباب ميرو', 'حمسة باذنجان مع الأجبان',
      'حمسة بليلة', 'مرق طماطم نجدية', 'فتة فول أخضر', 'لحسة قدور الأجداد'
    ]
  },
  {
    title: 'الأجبان والمخللات والمقبلات',
    icon: Utensils,
    items: [
      'أجبان مشكلة', 'زيتون بنكهات مختلفة', 'مخللات حجازية', 'مربيات بنكهات مختلفة',
      'حلاوة طحينية مشكلة', 'حلاوة اللدو واللبنة والهريسة مشكلة', 'لبنة قدور الأجداد',
      'مش حجازي', 'كبيبة حائل', 'أشار'
    ]
  },
  {
    title: 'المعجنات والمخبوزات',
    icon: Wheat,
    items: [
      'مطبق حلو ومالح', 'يغمش', 'منتو', 'فرموزة', 'عيش أبو اللحم', 'بف حجازي',
      'خلية النحل', 'قاضي القضاة المديني', 'كبة جبن', 'كبة حساوية', 'كبة شمندر',
      'بسطيلة (مستحدثة)', 'سمبوسك مشكلة'
    ]
  },
  {
    title: 'الحلويات',
    icon: Cake,
    items: [
      'عريكة', 'معصوب'
    ]
  }
];

export default function BreakfastMenu({ addToCart }: BreakfastMenuProps) {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#2c1e14] p-6" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center mb-8 bg-white py-10 px-4 rounded-3xl border border-[#d4af37]/30 shadow-sm">
          <span className="text-[#8c6239] text-xs font-bold tracking-widest uppercase mb-2 block bg-[#d4af37]/10 w-fit mx-auto px-4 py-1.5 rounded-full border border-[#d4af37]/30">
            قائمة التعتيمة والإفطار
          </span>
          <h1 className="text-3xl font-extrabold text-[#2c1e14] mb-2">🍳 تعتيمة قدور الأجداد الأصيلة</h1>
          <p className="text-[#6b5344] text-sm">أشهى أطباق الإفطار والتعتيمة الحجازية والنجدية التقليدية</p>
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
                <span>{cat.title}</span>
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
              {menuCategories[activeCategory].title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuCategories[activeCategory].items.map((dishName, idx) => {
              const dishItem = {
                id: `bf-${activeCategory}-${idx}`,
                name: dishName,
                price: 45, // سعر افتراضي قابل للتعديل
                description: `صنف إفطار وتعتيمة فاخر من مطاعم قدور الأجداد.`,
                image: ''
              };

              return (
                <div 
                  key={dishItem.id} 
                  className="bg-[#f5f1ea]/40 p-5 rounded-2xl border border-[#d4af37]/20 flex flex-col justify-between shadow-sm hover:border-[#d4af37] hover:bg-[#f5f1ea] transition-all"
                >
                  <div>
                    <h4 className="text-lg font-bold text-[#2c1e14] mb-2">{dishName}</h4>
                    <p className="text-[#6b5344] text-xs mb-4 leading-relaxed">
                      يُقدم طازجاً وساخناً بأجود المكونات الشعبية الأصيلة.
                    </p>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between pt-3 border-t border-[#d4af37]/15">
                    <span className="text-sm font-bold text-[#8c6239] font-sans">حسب الطلب</span>
                    <button 
                      onClick={() => addToCart(dishItem)}
                      className="bg-[#d4af37] hover:bg-[#c49f27] text-white px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 text-xs shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة للطلب
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