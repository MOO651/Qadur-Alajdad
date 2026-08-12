import { useState, useEffect } from 'react';
import { Utensils, CalendarHeart, Sparkles, ChefHat, Award, HeartHandshake, ArrowLeft, Star } from 'lucide-react';
import { type Dish } from '../data/menuData';
import { useMenu } from '../context/MenuContext';

const heroImages = [
  '/png (3).jpeg',
  '/png.jpeg',
  '/png (2).jpeg'
];

interface HomeProps {
  navigateTo: (path: string) => void;
  addToCart: (item: Dish) => void;
}

export default function Home({ navigateTo, addToCart }: HomeProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { dishes } = useMenu();
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredDishes = dishes.slice(0, 4);

  const handleAddToCartClick = (dish: Dish) => {
    addToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="space-y-20 pb-20 bg-[#f5f1ea] text-[#2c1e14] min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* تعديل طبقة التعتيم لزيادة تباين ووضوح النصوص فوق الصور */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#f5f1ea] z-10"></div>
          {heroImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 transform scale-105 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            ></div>
          ))}
        </div>

        <div className="relative z-20 max-w-4xl mx-auto space-y-6 pt-10">
          {/* تم تكبير اللوجو ليكون بارزاً ومناسباً لشاشات اللابتوب والكبيره */}
          <div className="mx-auto w-40 h-40 sm:w-56 sm:h-56 rounded-full border-4 border-[#d4af37] bg-white overflow-hidden shadow-2xl flex items-center justify-center p-2 transform hover:scale-105 transition-transform">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/60 text-white text-xs font-sans tracking-widest shadow-lg">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>عراقة المذاق وأصالة الضيافة السعودية</span>
          </div>

          {/* تحسين وضوح النصوص عبر استخدام اللون الأبيض والظلال العميقة */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
            أصالة الطبخ السعودي <br />
            <span className="text-[#f3e5ab] drop-shadow-[0_2px_8px_rgba(212,175,55,0.6)]">
              ومن قدورنا تفوح أصالتنا
            </span>
          </h1>

          <p className="text-white/95 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            نحن في مطعم "قُدُور الأَجْدَاد" نأخذك في رحلة فريدة لاستعادة طعم الأكل الأصيل المحضر على أصوله القديمة وبأعلى معايير الجودة الفاخرة لتشريف مناسباتكم.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => navigateTo('daily')}
              className="w-full sm:w-auto bg-[#d4af37] text-white px-8 py-4 rounded-2xl font-bold text-sm tracking-wider shadow-xl hover:bg-[#c49f27] hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Utensils className="w-5 h-5" />
              <span>تصفح المنيو اليومي</span>
            </button>
            <button 
              onClick={() => navigateTo('events')}
              className="w-full sm:w-auto bg-black/50 backdrop-blur-md border border-[#d4af37]/60 text-white px-8 py-4 rounded-2xl font-bold text-sm tracking-wider hover:bg-black/70 hover:border-[#d4af37] hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <CalendarHeart className="w-5 h-5 text-[#f3e5ab]" />
              <span>منيو الأفراح والولائم</span>
            </button>
          </div>
        </div>
      </section>

      {/* مميزاتنا */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[#8c6239] text-xs font-sans tracking-[0.3em] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30">لماذا نحن؟</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2c1e14]">مميزات قُدُور الأَجْدَاد</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-[#d4af37]/30 p-8 rounded-3xl space-y-4 hover:border-[#d4af37] transition-all shadow-sm group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#8c6239] group-hover:bg-[#d4af37] group-hover:text-white transition-all">
              <ChefHat className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#2c1e14]">وصفات الأجداد الأصلية</h3>
            <p className="text-[#6b5344] text-sm font-sans leading-relaxed">
              نحافظ على الوصفات التقليدية العريقة المطهوة ببطء في القدور النحاسية لضمان غنى النكهة والمذاق الأصيل.
            </p>
          </div>

          <div className="bg-white border border-[#d4af37]/30 p-8 rounded-3xl space-y-4 hover:border-[#d4af37] transition-all shadow-sm group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#8c6239] group-hover:bg-[#d4af37] group-hover:text-white transition-all">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#2c1e14]">ذبائح بلدي طازجة</h3>
            <p className="text-[#6b5344] text-sm font-sans leading-relaxed">
              نختار أجود أنواع الذبائح البلدية بعناية فائقة لتليق بمقام ضيوفكم وأفراحكم الكبرى في جميع المناسبات.
            </p>
          </div>

          <div className="bg-white border border-[#d4af37]/30 p-8 rounded-3xl space-y-4 hover:border-[#d4af37] transition-all shadow-sm group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#8c6239] group-hover:bg-[#d4af37] group-hover:text-white transition-all">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#2c1e14]">ضيافة ملكية فاخرة</h3>
            <p className="text-[#6b5344] text-sm font-sans leading-relaxed">
              فريق متخصص لتجهيز ولائم الأفراح الكبرى والاجتماعات الرسمية بأعلى معايير الإتقان والفخامة.
            </p>
          </div>
        </div>
      </section>

      {/* مختاراتنا */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-[#8c6239] text-xs font-sans tracking-[0.2em] uppercase">من مختاراتنا</span>
            <h2 className="text-3xl font-bold text-[#2c1e14]">أطباق نالت إعجاب ضيوفنا</h2>
          </div>
          <button 
            onClick={() => navigateTo('daily')}
            className="flex items-center gap-2 text-[#8c6239] hover:text-[#2c1e14] font-sans text-sm font-bold transition-colors"
          >
            <span>عرض المنيو كامل</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredDishes.length > 0 ? (
            featuredDishes.map((dish) => {
              const isAdded = addedId === dish.id;
              return (
                <div key={dish.id} className="bg-white border border-[#d4af37]/30 rounded-3xl overflow-hidden shadow-md hover:border-[#d4af37] transition-all flex flex-col justify-between group">
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                      style={{ backgroundImage: `url('${dish.image}')` }}
                    ></div>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/40 flex items-center gap-1 text-xs text-[#8c6239] font-bold shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>مميز</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-[#2c1e14] font-bold text-base mb-1">{dish.name}</h3>
                      <p className="text-[#6b5344] text-xs line-clamp-2 font-sans">{dish.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#d4af37]/15">
                      <span className="text-[#8c6239] font-sans font-bold text-sm">{dish.price} ريال</span>
                      <button 
                        onClick={() => handleAddToCartClick(dish)}
                        className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all border ${
                          isAdded
                            ? 'bg-green-600 text-white border-green-500 scale-95'
                            : 'bg-[#d4af37] text-white hover:bg-[#c49f27] border-[#d4af37]/40 shadow-sm'
                        }`}
                      >
                        {isAdded ? '✓ تمت الإضافة' : 'أضف للسلة'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-[#6b5344] text-sm">جاري تحميل الأطباق...</div>
          )}
        </div>
      </section>
    </div>
  );
}