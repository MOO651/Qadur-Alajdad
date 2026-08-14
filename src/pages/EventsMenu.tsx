import { useState } from 'react';
import { 
  Utensils, 
  Salad, 
  Soup, 
  Cake, 
  Flame, 
  Layers, 
  Wheat, 
  Fish, 
  ChefHat,
  Plus 
} from 'lucide-react';

interface EventsMenuProps {
  addToCart: (item: any) => void;
}

interface MenuCategory {
  title: string;
  icon: any;
  items: string[];
}

const menuCategories: MenuCategory[] = [
  {
    title: 'السلطات',
    icon: Salad,
    items: [
      'سلطة سعودية', 'سلطة جرجير وشمندر', 'سلطة جرجير ولحم ناشف', 'سلطة فتوش قدور الأجداد',
      'بامية ناشفة', 'سلطة شاورما', 'سلطة رقاق الكوسة المشوية', 'تبولة قدور الأجداد',
      'سلطة البامية مع اللبنة', 'سلطة البحر الأحمر', 'سلطة الكرنب والماش', 'سلطة الطبقات',
      'سلطة حمام البر', 'سلطة الجرجير بالقرع والمكسرات ورقائق الكوسة', 'سلطة الفلافل',
      'سلطة التبولة بالبنجر', 'سلطة الكرنب الملونة بالدجاج المشوي', 'سلطة متبل الشمندر',
      'سلطة نجد', 'سلطة الرمان باللبنة', 'سلطة الكينوا', 'سلطة سيزر'
    ]
  },
  {
    title: 'المقبلات',
    icon: Utensils,
    items: [
      'حمص بلحم الحميس', 'حمص', 'حمص حبق مديني', 'لبنة الشمندر مع اللحم', 'متبل',
      'حراق إصبع', 'كباب السبانخ المديني', 'ورق عنب', 'بابا غنوج', 'لبنة مع البصل والثوم',
      'متبل سعودي', 'متبل خضار', 'مقليات', 'كبة بطاطس', 'كبة شبت', 'كبة شمندر',
      'كبة محشية بالجبن والمكسرات'
    ]
  },
  {
    title: 'المعجنات والمخبوزات',
    icon: Wheat,
    items: [
      'سمبوسك دجاج', 'سمبوسك لحم', 'سمبوسك جبن', 'سمبوسك عدس', 'سمبوسك خضار',
      'منتو', 'فطائر بالزيتون', 'بف حجازي', 'يغمش حجازي', 'فرموزة حجازية',
      'عيش أبو اللحم حجازي', 'كبة حجازية', 'فطائر بالسبانخ', 'خلية النحل',
      'رول المندي', 'مطبق مالح (جبن - لحم)', 'تاكو', 'مراصيع مبصل',
      'خبز التمر الحساوي', 'خبز التنور', 'خبز شريك', 'شابورة قدور الأجداد'
    ]
  },
  {
    title: 'الشوربات والفتات',
    icon: Soup,
    items: [
      'شوربة كوارع', 'شوربة عدس', 'شوربة كويكر', 'شوربة جريش', 'شوربة حب', 'شوربة خضار',
      'فتة ورق عنب', 'فتة حمص', 'فتة شاورما', 'فتة باذنجان', 'فتة المانتو',
      'فتة كبة', 'فتة كوارع', 'فتة الفول الأخضر', 'فتة حمسة'
    ]
  },
  {
    title: 'الشعبيات',
    icon: Flame,
    items: [
      'مرقوق نجدي باللحم', 'مرقوق بالخضار', 'جريش أحمر حائلي', 'جريش أبيض قصيمي بالدجاج والكشنة',
      'جريش نجدي باللبن', 'هريس حساوي باللحم', 'هريس حساوي بالدجاج', 'مطازيز قصيمية',
      'مضروبة حساوية باللحم', 'مضروبة حساوية بالدجاج', 'سليق مكاوي باللحم', 'سليق مكاوي بالدجاج',
      'مفلق روبيان', 'مفلق لحم', 'تمن حائلي بالدجاج', 'قرصان', 'مثلوثة نجدية',
      'دغابيس غامدية', 'مقلقل لحم'
    ]
  },
  {
    title: 'المحاشي والإيدامات',
    icon: ChefHat,
    items: [
      'محشي كرنب', 'محشي بصل', 'محشي كوسا', 'محشي ورق عنب', 'كبيبة حائل',
      'محشي فلفل حار', 'محاشي سعودية', 'محاشي مشكل',
      'خضار مشكل صالونة', 'قرع بلدي أهل أول', 'بامية أهل المدينة', 'قرع أخضر باللحم',
      'قرع أخضر بالدجاج', 'مرق شبزي حساوي', 'مرق رجلة لحم', 'مرق رجلة دجاج',
      'ملوخية حجازية', 'ملوخية ورق اللحم', 'ملوخية ورق الدجاج', 'مختوم بامية', 'مرقة هواء'
    ]
  },
  {
    title: 'الأرز',
    icon: Layers,
    items: [
      'أرز حساوي باللحم', 'أرز حساوي بالدجاج', 'أرز الشمندر', 'أرز بخلطة الليمون',
      'أرز الشبت', 'أرز مشخول بالروبيان', 'أرز مشخول بالدجاج', 'أرز مشخول باللحم',
      'أرز مشخول بالسمك', 'أرز مشخول بالخضار', 'أرز مندي بالدجاج', 'مقلوبة طبقات',
      'كبسة فقع', 'أرز بخاري بالدجاج', 'أرز بخاري باللحم', 'أرز كابلي باللحم',
      'أرز كابلي بالدجاج', 'أرز زربيان باللحم', 'أرز زربيان بالدجاج', 'قرع بلدي محشي بالأرز',
      'أرز صيادية بالسمك', 'أرز طبقات مع الكريمة واللبن', 'أرز كشري', 'أرز معدوس',
      'أرز الشبت مع الفول', 'أرز المحموص', 'السلقية', 'أرز معمر سعودي', 'أرز قفر',
      'كبسة سعودية بأرز شعبي ولحم', 'كبسة سعودية بأرز بخاري ودجاج', 'كبسة روبيان ناشف',
      'أرز شعبي سادة', 'أرز خوالي باللحم والقرع', 'أرز دجاج خوال', 'برياني بالدجاج',
      'ريزوتو طوفرية', 'أرز بايل', 'أرز مندي باللحم', 'مقلوبة باللحم', 'مقلوبة بالدجاج'
    ]
  },
  {
    title: 'المكرونات والأطباق المالحة',
    icon: Fish,
    items: [
      'مكرونة بالصوص الأبيض والمشروم', 'مكرونة بالبيستو', 'مكرونة بالروبيان والكريمة',
      'مكرونة سباغيتي', 'مكرونة بالسبانخ', 'مكرونة بشاميل', 'مكرونة بحرية', 'مكرونة مرقوق',
      'مراصيع محشية', 'دجاج مع السبانخ والكريمة', 'كوسا باللبن', 'شيش برك',
      'لفائف الباذنجان المحشية بالمكرونة', 'كباب ميرو', 'كباب بالصوص الأحمر',
      'صينية بطاطس بالأجبان', 'داوود باشا', 'قاضي القضاة المديني', 'مسقعة حجازية',
      'مسخن سعودي', 'سمك بالبهارات السعودية', 'كفتة مدخنة', 'دجاج بالكريمة'
    ]
  },
  {
    title: 'الذبائح والخرفان المحشية',
    icon: Utensils,
    items: [
      'خروف شعبي', 'خروف غوزي', 'خروف مندي', 'خروف عبيلة', 'خروف كابلي',
      'خروف زربيان', 'خروف بخاري', 'خروف سليق', 'خروف مثلوثة',
      'خروف محشي مسقع', 'خروف محشي كبيبة', 'خروف محشي ورق عنب', 'خروف محشي فقع',
      'خروف محشي حمام', 'خروف مع المحاشي', 'خروف محشي بالمكرونة', 'خروف محشي بالفريك'
    ]
  },
  {
    title: 'الحلويات',
    icon: Cake,
    items: [
      'لقيمات', 'تاوا', 'كريمة قدر', 'كريمة أول', 'شعيرية بالهيل والزعفران',
      'بقلوة تمر', 'سمبوسك تمر وقرفة', 'أم علي بالهيل والزعفران', 'بسبوسة مكة',
      'مهلبية رمان', 'مهلبية مانجو', 'كنافة قشطة', 'كنافة خربز', 'كنافة تمر',
      'طرمبة سادة', 'طرمبة محشية', 'مراصيع بالعسل', 'مراصيع معصوب', 'كيكة التمر',
      'مراصيع بالقشطة والقطايف', 'حنيني', 'قشد ملكي', 'عيش السرايا بالحلقوم',
      'حلى أوريو بالشوكولاتة', 'حلى الطبقات', 'كاسترد', 'سقدانة', 'عريكة جنوبية',
      'فخار طبقات', 'حيسة مدينية', 'ماسية سادة', 'ماسية بالرمان', 'شعيرية حمسة',
      'دبيازة', 'خنفروش', 'عاشورية', 'ساقو (رمان - مانجو - ورد)', 'مقشوش'
    ]
  }
];

export default function EventsMenu({ addToCart }: EventsMenuProps) {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section className="py-16 px-4 bg-[#f5f1ea] text-[#2c1e14] min-h-screen" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="text-[#8c6239] text-xs font-sans tracking-[0.3em] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30 inline-block mb-3">
            منيو الحفلات والأفراح
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c1e14] mb-3 flex items-center justify-center gap-2">
            <Utensils className="w-8 h-8 text-[#d4af37]" /> أصناف قدور الأجداد الفاخرة
          </h2>
          <p className="text-[#6b5344] max-w-xl mx-auto text-sm md:text-base font-sans">
            تصفح قائمة الأطباق العريقة والمميزة الخاصة بالحفلات، الولائم الكبرى، والمناسبات السعيدة.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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

        {/* Active Category Items Grid */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border-2 border-[#d4af37]/30 shadow-lg">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d4af37]/20">
            {(() => {
              const ActiveIcon = menuCategories[activeCategory].icon;
              return <ActiveIcon className="w-7 h-7 text-[#d4af37]" />;
            })()}
            <h3 className="text-2xl font-bold text-[#8c6239]">
              {menuCategories[activeCategory].title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {menuCategories[activeCategory].items.map((dishName, idx) => {
              const dishItem = {
                id: `events-${activeCategory}-${idx}`,
                name: dishName,
                price: 150, // سعر افتراضي لأطباق الحفلات
                description: `طبق فاخر مخصص للحفلات والولائم من قدور الأجداد.`,
                image: ''
              };

              return (
                <div 
                  key={idx}
                  className="bg-[#f5f1ea]/60 border border-[#d4af37]/20 rounded-xl p-4 text-[#4a3525] font-sans text-sm flex flex-col justify-between transition-all hover:border-[#d4af37] hover:bg-[#f5f1ea] shadow-sm"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37] shrink-0"></span>
                    <span className="leading-relaxed font-bold text-[#2c1e14]">{dishName}</span>
                  </div>

                  <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8c6239]">حسب الطلب</span>
                    <button
                      onClick={() => addToCart(dishItem)}
                      className="bg-[#d4af37] hover:bg-[#c49f27] text-white px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 text-xs shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      إضافة
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 bg-white border border-[#d4af37]/30 rounded-2xl p-4 text-center text-xs text-[#6b5344] shadow-sm font-sans">
          <p>📌 لطلبات الحفلات الكبرى والمناسبات الخاصة، يمكنك اختيار ما يناسب ضيوفك من القائمة أعلاه للتنسيق المسبق.</p>
        </div>

      </div>
    </section>
  );
}