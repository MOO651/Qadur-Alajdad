import { useState, useEffect } from 'react';
import { Utensils, CalendarHeart, Sparkles, ChefHat, Award, HeartHandshake } from 'lucide-react';

const heroImages = [
  '/png (3).jpeg',
  '/png.jpeg',
  '/png (2).jpeg'
];

interface HomeProps {
  navigateTo: (path: string) => void;
  addToCart: (name: string, price: string) => void;
}

export default function Home({ navigateTo, addToCart }: HomeProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/50 to-[#0C0B0A]/70 z-10"></div>
          {heroImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 bg-cover bg-center transform scale-105 filter brightness-[0.7] transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            ></div>
          ))}
        </div>

        <div className="relative z-20 max-w-4xl mx-auto space-y-6 sm:space-y-8 px-2">
          <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#D4AF37] bg-[#1C1815] overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.7)] flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-[#D4AF37]/50 text-[#D4AF37] text-[11px] sm:text-xs font-sans tracking-[0.2em] sm:tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>عراقة المذاق وأصالة الضيافة السعودية</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF9] leading-[1.3]">
            أصالة الطبخ السعودي <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11]">ومن قدورنا تفوح أصالتنا</span>
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
            نحن في مطعم "قدور الأجداد" نأخذك في رحلة فريدة لاستعادة طعم الأكل الأصيل المحضر على أصوله القديمة وبأعلى معايير الجودة الفاخرة لتشريف مناسباتكم.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
            <button onClick={() => navigateTo('/daily')} className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA7C11] text-[#0C0B0A] px-7 sm:px-9 py-3.5 rounded-2xl text-xs font-sans font-bold tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2">
              <Utensils className="w-4 h-4" /> تصفح المنيو اليومي
            </button>
            <button onClick={() => navigateTo('/events')} className="w-full sm:w-auto border border-[#D4AF37]/60 bg-black/40 hover:bg-[#D4AF37]/20 text-[#FFFDF9] px-7 sm:px-9 py-3.5 rounded-2xl text-xs font-sans font-bold tracking-widest transition-all flex items-center justify-center gap-2">
              <CalendarHeart className="w-4 h-4 text-[#D4AF37]" /> منيو الأفراح والولائم
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">تميزنا</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFDF9]">لماذا تختار قُدُور الأَجْدَاد؟</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <ChefHat className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#FFFDF9]">وصفات الأجداد الأصلية</h4>
            <p className="text-gray-400 text-xs font-sans leading-relaxed">
              نحافظ على الوصفات التقليدية العريقة المطهوة ببطء في القدور النحاسية لضمان غنى النكهة والمذاق الأصيل.
            </p>
          </div>

          <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Award className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#FFFDF9]">ذبائح بلدي طازجة</h4>
            <p className="text-gray-400 text-xs font-sans leading-relaxed">
              نختار أجود أنواع الذبائح البلدية بعناية فائقة لتليق بمقام ضيوفكم وأفراحكم الكبرى في جميع المناسبات.
            </p>
          </div>

          <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#FFFDF9]">ضيافة ملكية فاخرة</h4>
            <p className="text-gray-400 text-xs font-sans leading-relaxed">
              فريق متخصص لتجهيز ولائم الأفراح الكبرى والاجتماعات الرسمية بأعلى معايير الإتقان والفخامة.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#181513]/50 to-transparent py-12 rounded-3xl border border-[#D4AF37]/10">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4">
          <div>
            <span className="text-[#D4AF37] font-sans text-xs tracking-[0.2em] font-bold uppercase">من مختاراتنا</span>
            <h3 className="text-2xl font-bold text-[#FFFDF9]">أطباق نالت إعجاب ضيوفنا</h3>
          </div>
          <button onClick={() => navigateTo('/daily')} className="text-[#D4AF37] text-xs font-sans font-bold hover:underline">
            عرض المنيو كامل ←
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {[
            { name: "كابلي لحم بلدي", price: "78 ريال", img: "/png (2).jpeg" },
            { name: "جريش حائلي بالسمن", price: "24 ريال", img: "/png.jpeg" },
            { name: "سليق دجاج ملكي", price: "32 ريال", img: "/png (2).jpeg" },
            { name: "مهلبية ورد", price: "18 ريال", img: "/appetizers.jpg" }
          ].map((dish, i) => (
            <div key={i} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-lg group">
              <div className="h-36 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${dish.img}')` }}></div>
              <div className="p-4 space-y-2">
                <h4 className="text-white font-bold text-sm">{dish.name}</h4>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#D4AF37] font-sans font-bold text-xs">{dish.price}</span>
                  <button 
                    onClick={() => addToCart(dish.name, dish.price)}
                    className="bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-3 py-1.5 rounded-xl text-[10px] font-sans font-bold transition-all"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}