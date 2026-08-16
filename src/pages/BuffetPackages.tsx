import { useState } from 'react';
import { Users, CheckCircle, XCircle, Utensils, Image as ImageIcon, PartyPopper } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BuffetPackage {
  nameAr: string;
  nameEn: string;
  color: string;
  badgeColor: string;
  image?: string;
  items: {
    appetizers: number;
    pastries: number;
    popular: number;
    main: number;
    desserts: number;
  };
}

interface GroupData {
  count: number;
  packages: BuffetPackage[];
}

const buffetData: Record<number, GroupData> = {
  30: {
    count: 30,
    packages: [
      { nameAr: 'الباقة الفضية', nameEn: 'Silver Package', color: 'border-slate-300', badgeColor: 'bg-slate-100 text-slate-800', image: '', items: { appetizers: 3, pastries: 2, popular: 2, main: 3, desserts: 3 } },
      { nameAr: 'الباقة الذهبية', nameEn: 'Gold Package', color: 'border-[#d4af37]', badgeColor: 'bg-amber-50 text-[#8c6239]', image: '', items: { appetizers: 3, pastries: 2, popular: 3, main: 3, desserts: 3 } },
      { nameAr: 'الباقة الماسية', nameEn: 'Diamond Package', color: 'border-cyan-500', badgeColor: 'bg-cyan-50 text-cyan-800', image: '', items: { appetizers: 4, pastries: 3, popular: 3, main: 3, desserts: 3 } },
    ]
  },
  75: {
    count: 75,
    packages: [
      { nameAr: 'الباقة الفضية', nameEn: 'Silver Package', color: 'border-slate-300', badgeColor: 'bg-slate-100 text-slate-800', image: '', items: { appetizers: 8, pastries: 6, popular: 5, main: 5, desserts: 6 } },
      { nameAr: 'الباقة الذهبية', nameEn: 'Gold Package', color: 'border-[#d4af37]', badgeColor: 'bg-amber-50 text-[#8c6239]', image: '', items: { appetizers: 8, pastries: 6, popular: 6, main: 6, desserts: 5 } },
      { nameAr: 'الباقة الماسية', nameEn: 'Diamond Package', color: 'border-cyan-500', badgeColor: 'bg-cyan-50 text-cyan-800', image: '', items: { appetizers: 9, pastries: 7, popular: 6, main: 6, desserts: 7 } },
    ]
  },
  100: {
    count: 100,
    packages: [
      { nameAr: 'الباقة الفضية', nameEn: 'Silver Package', color: 'border-slate-300', badgeColor: 'bg-slate-100 text-slate-800', image: '', items: { appetizers: 10, pastries: 6, popular: 6, main: 6, desserts: 7 } },
      { nameAr: 'الباقة الذهبية', nameEn: 'Gold Package', color: 'border-[#d4af37]', badgeColor: 'bg-amber-50 text-[#8c6239]', image: '', items: { appetizers: 10, pastries: 6, popular: 7, main: 7, desserts: 5 } },
      { nameAr: 'الباقة الماسية', nameEn: 'Diamond Package', color: 'border-cyan-500', badgeColor: 'bg-cyan-50 text-cyan-800', image: '', items: { appetizers: 11, pastries: 8, popular: 7, main: 7, desserts: 7 } },
    ]
  },
  150: {
    count: 150,
    packages: [
      { nameAr: 'الباقة الفضية', nameEn: 'Silver Package', color: 'border-slate-300', badgeColor: 'bg-slate-100 text-slate-800', image: '', items: { appetizers: 12, pastries: 7, popular: 7, main: 7, desserts: 7 } },
      { nameAr: 'الباقة الذهبية', nameEn: 'Gold Package', color: 'border-[#d4af37]', badgeColor: 'bg-amber-50 text-[#8c6239]', image: '', items: { appetizers: 13, pastries: 8, popular: 8, main: 8, desserts: 8 } },
      { nameAr: 'الباقة الماسية', nameEn: 'Diamond Package', color: 'border-cyan-500', badgeColor: 'bg-cyan-50 text-cyan-800', image: '', items: { appetizers: 14, pastries: 8, popular: 8, main: 9, desserts: 8 } },
    ]
  }
};

interface BuffetPackagesProps {
  navigateTo?: (page: string) => void;
}

export default function BuffetPackages({ navigateTo }: BuffetPackagesProps) {
  const { lang } = useLanguage();
  const [selectedCount, setSelectedCount] = useState<number>(30);
  const currentGroup = buffetData[selectedCount];

  const t = {
    ar: {
      badge: "باقات الضيافة الفاخرة",
      title: "ضوابط وباقات المنيو والحفلات",
      subtitle: "اختر عدد الحضور لمعرفة الباقات المتاحة وعدد الأصناف المخصصة لكل قسم بكل باقة.",
      btnText: (c: number) => `بوفيه لعدد ${c} شخصاً`,
      itemsLabels: {
        appetizers: "المقبلات والسلطات:",
        pastries: "المعجنات:",
        popular: "الأطباق الشعبية:",
        main: "الأطباق الرئيسية:",
        desserts: "الحلويات:",
        itemsCount: "أصناف"
      },
      includes: "يشمل المشروبات الغازية، المياه المعدنية، وأدوات الطعام.",
      excludes: "لا يشمل الطاولات، الكراسي، أو خدمة التقديم.",
      note: "📌 ملاحظات تنظيمية: تحتسب المقبلات والسلطات فئة موحدة ضمن عدد الاختيارات المحددة لكل باقة."
    },
    en: {
      badge: "Luxury Hospitality Packages",
      title: "Menu & Event Buffet Packages",
      subtitle: "Select guest count to view available packages and item counts per section.",
      btnText: (c: number) => `Buffet for ${c} Guests`,
      itemsLabels: {
        appetizers: "Appetizers & Salads:",
        pastries: "Pastries:",
        popular: "Traditional Dishes:",
        main: "Main Courses:",
        desserts: "Desserts:",
        itemsCount: "items"
      },
      includes: "Includes soft drinks, bottled water, and cutlery.",
      excludes: "Does not include tables, chairs, or catering staff.",
      note: "📌 Note: Appetizers and salads are counted together within the specified selections."
    }
  };

  const currentT = t[lang];

  return (
    <section className="py-16 px-4 bg-[#f5f1ea] text-[#2c1e14] min-h-screen" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="text-[#8c6239] text-xs font-sans tracking-[0.3em] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30 inline-block mb-3">
            {currentT.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c1e14] mb-3 flex items-center justify-center gap-2">
            <Utensils className="w-8 h-8 text-[#d4af37]" /> {currentT.title}
          </h2>
          <p className="text-[#6b5344] max-w-xl mx-auto text-sm md:text-base font-sans">
            {currentT.subtitle}
          </p>
        </div>

        {/* Guest Count Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[30, 75, 100, 150].map((count) => (
            <button
              key={count}
              onClick={() => setSelectedCount(count)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-sm border ${
                selectedCount === count
                  ? 'bg-[#d4af37] text-white border-[#d4af37] scale-105 shadow-md'
                  : 'bg-white text-[#4a3525] border-[#d4af37]/30 hover:border-[#d4af37]'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>{currentT.btnText(count)}</span>
            </button>
          ))}
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentGroup.packages.map((pkg, idx) => (
            <div 
              key={idx}
              className={`bg-white rounded-3xl border-2 ${pkg.color} flex flex-col justify-between shadow-lg relative overflow-hidden transition-transform hover:-translate-y-1`}
            >
              <div className="w-full h-44 bg-[#e8e2d5] flex items-center justify-center relative border-b border-[#d4af37]/20">
                {pkg.image ? (
                  <img src={pkg.image} alt={lang === 'ar' ? pkg.nameAr : pkg.nameEn} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-[#8c6239]/60">
                    <ImageIcon className="w-9 h-9" />
                    <span className="text-xs font-medium">صورة الباقة قريباً</span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${pkg.badgeColor}`}>
                    {lang === 'ar' ? pkg.nameAr : pkg.nameEn}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="space-y-3 text-sm font-sans">
                    <div className="flex justify-between items-center text-[#4a3525]">
                      <span>{currentT.itemsLabels.appetizers}</span>
                      <span className="font-bold text-[#8c6239] bg-[#f5f1ea] px-2.5 py-1 rounded-lg border border-[#d4af37]/20">{pkg.items.appetizers} {currentT.itemsLabels.itemsCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#4a3525]">
                      <span>{currentT.itemsLabels.pastries}</span>
                      <span className="font-bold text-[#8c6239] bg-[#f5f1ea] px-2.5 py-1 rounded-lg border border-[#d4af37]/20">{pkg.items.pastries} {currentT.itemsLabels.itemsCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#4a3525]">
                      <span>{currentT.itemsLabels.popular}</span>
                      <span className="font-bold text-[#8c6239] bg-[#f5f1ea] px-2.5 py-1 rounded-lg border border-[#d4af37]/20">{pkg.items.popular} {currentT.itemsLabels.itemsCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#4a3525]">
                      <span>{currentT.itemsLabels.main}</span>
                      <span className="font-bold text-[#8c6239] bg-[#f5f1ea] px-2.5 py-1 rounded-lg border border-[#d4af37]/20">{pkg.items.main} {currentT.itemsLabels.itemsCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#4a3525]">
                      <span>{currentT.itemsLabels.desserts}</span>
                      <span className="font-bold text-[#8c6239] bg-[#f5f1ea] px-2.5 py-1 rounded-lg border border-[#d4af37]/20">{pkg.items.desserts} {currentT.itemsLabels.itemsCount}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#d4af37]/20 space-y-2 text-xs font-sans">
                  <div className="flex items-start gap-2 text-emerald-700">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span>{currentT.includes}</span>
                  </div>
                  <div className="flex items-start gap-2 text-rose-700">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{currentT.excludes}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Notes Footer */}
        <div className="mt-10 bg-white border border-[#d4af37]/30 rounded-2xl p-4 text-center text-xs text-[#6b5344] shadow-sm font-sans">
          <p>{currentT.note}</p>
        </div>

        {/* Navigation Section */}
        <div className="mt-16 bg-white border border-[#d4af37]/30 rounded-3xl p-8 shadow-sm">
          <h3 className="text-center text-xl font-bold text-[#2c1e14] mb-6">
            {lang === 'ar' ? 'هل تبحث عن باقات أو قوائم أخرى؟' : 'Looking for other packages or menus?'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            
            {/* زر الانتقال لباقات الأفراح */}
            <button 
              onClick={() => navigateTo && navigateTo('events')}
              className="flex items-center justify-center gap-3 p-4 rounded-xl border border-[#d4af37]/30 bg-[#f5f1ea] hover:bg-[#d4af37] hover:text-white transition-all text-[#2c1e14] font-bold"
            >
              <PartyPopper className="w-5 h-5" />
              <span>{lang === 'ar' ? 'باقات الأفراح' : 'Events Packages'}</span>
            </button>

            {/* زر الانتقال لمنيو التعتيمة */}
            <button 
              onClick={() => navigateTo && navigateTo('breakfast')}
              className="flex items-center justify-center gap-3 p-4 rounded-xl border border-[#d4af37]/30 bg-[#f5f1ea] hover:bg-[#d4af37] hover:text-white transition-all text-[#2c1e14] font-bold"
            >
              <Utensils className="w-5 h-5" />
              <span>{lang === 'ar' ? 'منيو التعتيمة' : 'Breakfast Menu'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}