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
    <div className="space-y-20 pb-20 bg-[#0f0b07] text-white min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0f0b07] z-10"></div>
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
          <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#d4af37] bg-[#1c140d] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.4)] flex items-center justify-center transform hover:scale-105 transition-transform">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] text-xs font-sans tracking-widest shadow-lg">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>عراقة المذاق وأصالة الضيافة السعودية</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            أصالة الطبخ السعودي <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa7c11]">
              ومن قدورنا تفوح أصالتنا
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed font-light">
            نحن في مطعم "قُدُور الأَجْدَاد" نأخذك في رحلة فريدة لاستعادة طعم الأكل الأصيل المحضر على أصوله القديمة وبأعلى معايير الجودة الفاخرة لتشريف مناسباتكم.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => navigateTo('daily')}
              className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-[#0f0b07] px-8 py-4 rounded-2xl font-bold text-sm tracking-wider shadow-xl hover:shadow-[#d4af37]/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Utensils className="w-5 h-5" />
              <span>تصفح المنيو اليومي</span>
            </button>
            <button 
              onClick={() => navigateTo('events')}
              className="w-full sm:w-auto bg-black/50 backdrop-blur-md border border-[#d4af37]/50 text-white px-8 py-4 rounded-2xl font-bold text-sm tracking-wider hover:bg-[#d4af37]/20 hover:border-[#d4af37] hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <CalendarHeart className="w-5 h-5 text-[#d4af37]" />
              <span>منيو الأفراح والولائم</span>
            </button>
          </div>
        </div>
      </section>

      {/* مميزاتنا */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[#d4af37] text-xs font-sans tracking-[0.3em] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20">لماذا نحن؟</span>
          <h2 className="text-3xl sm:text-4xl font-bold">مميزات قُدُور الأَجْدَاد</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-b from-[#1a130c] to-[#120c07] border border-[#d4af37]/20 p-8 rounded-3xl space-y-4 hover:border-[#d4af37]/60 transition-all shadow-xl group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0f0b07] transition-all">
              <ChefHat className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">وصفات الأجداد الأصلية</h3>
            <p className="text-gray-400 text-sm font-sans leading-relaxed">
              نحافظ على الوصفات التقليدية العريقة المطهوة ببطء في القدور النحاسية لضمان غنى النكهة والمذاق الأصيل.
            </p>
          </div>

          <div className="bg-gradient-to-b from-[#1a130c] to-[#120c07] border border-[#d4af37]/20 p-8 rounded-3xl space-y-4 hover:border-[#d4af37]/60 transition-all shadow-xl group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0f0b07] transition-all">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">ذبائح بلدي طازجة</h3>
            <p className="text-gray-400 text-sm font-sans leading-relaxed">
              نختار أجود أنواع الذبائح البلدية بعناية فائقة لتليق بمقام ضيوفكم وأفراحكم الكبرى في جميع المناسبات.
            </p>
          </div>

          <div className="bg-gradient-to-b from-[#1a130c] to-[#120c07] border border-[#d4af37]/20 p-8 rounded-3xl space-y-4 hover:border-[#d4af37]/60 transition-all shadow-xl group">
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0f0b07] transition-all">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">ضيافة ملكية فاخرة</h3>
            <p className="text-gray-400 text-sm font-sans leading-relaxed">
              فريق متخصص لتجهيز ولائم الأفراح الكبرى والاجتماعات الرسمية بأعلى معايير الإتقان والفخامة.
            </p>
          </div>
        </div>
      </section>

      {/* مختاراتنا */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-[#d4af37] text-xs font-sans tracking-[0.2em] uppercase">من مختاراتنا</span>
            <h2 className="text-3xl font-bold">أطباق نالت إعجاب ضيوفنا</h2>
          </div>
          <button 
            onClick={() => navigateTo('daily')}
            className="flex items-center gap-2 text-[#d4af37] hover:text-white font-sans text-sm font-bold transition-colors"
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
                <div key={dish.id} className="bg-[#16110b] border border-[#d4af37]/20 rounded-3xl overflow-hidden shadow-2xl hover:border-[#d4af37]/60 transition-all flex flex-col justify-between group">
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                      style={{ backgroundImage: `url('${dish.image}')` }}
                    ></div>
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/30 flex items-center gap-1 text-xs text-[#d4af37]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>مميز</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-white font-bold text-base mb-1">{dish.name}</h3>
                      <p className="text-gray-400 text-xs line-clamp-2 font-sans">{dish.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[#d4af37] font-sans font-bold text-sm">{dish.price} ريال</span>
                      <button 
                        onClick={() => handleAddToCartClick(dish)}
                        className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all border ${
                          isAdded
                            ? 'bg-green-600 text-white border-green-500 scale-95'
                            : 'bg-[#d4af37]/20 border-[#d4af37]/40 text-white hover:bg-[#d4af37] hover:text-[#0f0b07]'
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
            <div className="col-span-full py-12 text-center text-gray-400 text-sm">جاري تحميل الأطباق...</div>
          )}
        </div>
      </section>
    </div>
  );
}