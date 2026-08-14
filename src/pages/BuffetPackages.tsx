import { useState } from 'react';
import { Users, CheckCircle, XCircle, Utensils } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BuffetPackage {
  nameAr: string;
  nameEn: string;
  price: number;
  color: string;
  badgeColor: string;
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
      { nameAr: 'الباقة الفضية', nameEn: 'Silver Package', price: 175, color: 'border-slate-300', badgeColor: 'bg-slate-100 text-slate-800', items: { appetizers: 3, pastries: 2, popular: 2, main: 3, desserts: 3 } },
      { nameAr: 'الباقة الذهبية', nameEn: 'Gold Package', price: 200, color: 'border-[#d4af37]', badgeColor: 'bg-amber-50 text-[#8c6239]', items: { appetizers: 3, pastries: 2, popular: 3, main: 3, desserts: 3 } },
      { nameAr: 'الباقة الماسية', nameEn: 'Diamond Package', price: 225, color: 'border-cyan-500', badgeColor: 'bg-cyan-50 text-cyan-800', items: { appetizers: 4, pastries: 3, popular: 3, main: 3, desserts: 3 } },
    ]
  },
  75: {
    count: 75,
    packages: [
      { nameAr: 'الباقة الفضية', nameEn: 'Silver Package', price: 115, color: 'border-slate-300', badgeColor: 'bg-slate-100 text-slate-800', items: { appetizers: 8, pastries: 6, popular: 5, main: 5, desserts: 6 } },
      { nameAr: 'الباقة الذهبية', nameEn: 'Gold Package', price: 125, color: 'border-[#d4af37]', badgeColor: 'bg-amber-50 text-[#8c6239]', items: { appetizers: 8, pastries: 6, popular: 6, main: 6, desserts: 5 } },
      { nameAr: 'الباقة الماسية', nameEn: 'Diamond Package', price: 140, color: 'border-cyan-500', badgeColor: 'bg-cyan-50 text-cyan-800', items: { appetizers: 9, pastries: 7, popular: 6, main: 6, desserts: 7 } },
    ]
  },
  100: {
    count: 100,
    packages: [
      { nameAr: 'الباقة الفضية', nameEn: 'Silver Package', price: 95, color: 'border-slate-300', badgeColor: 'bg-slate-100 text-slate-800', items: { appetizers: 10, pastries: 6, popular: 6, main: 6, desserts: 7 } },
      { nameAr: 'الباقة الذهبية', nameEn: 'Gold Package', price: 105, color: 'border-[#d4af37]', badgeColor: 'bg-amber-50 text-[#8c6239]', items: { appetizers: 10, pastries: 6, popular: 7, main: 7, desserts: 5 } },
      { nameAr: 'الباقة الماسية', nameEn: 'Diamond Package', price: 115, color: 'border-cyan-500', badgeColor: 'bg-cyan-50 text-cyan-800', items: { appetizers: 11, pastries: 8, popular: 7, main: 7, desserts: 7 } },
    ]
  },
  150: {
    count: 150,
    packages: [
      { nameAr: 'الباقة الفضية', nameEn: 'Silver Package', price: 75, color: 'border-slate-300', badgeColor: 'bg-slate-100 text-slate-800', items: { appetizers: 12, pastries: 7, popular: 7, main: 7, desserts: 7 } },
      { nameAr: 'الباقة الذهبية', nameEn: 'Gold Package', price: 85, color: 'border-[#d4af37]', badgeColor: 'bg-amber-50 text-[#8c6239]', items: { appetizers: 13, pastries: 8, popular: 8, main: 8, desserts: 8 } },
      { nameAr: 'الباقة الماسية', nameEn: 'Diamond Package', price: 95, color: 'border-cyan-500', badgeColor: 'bg-cyan-50 text-cyan-800', items: { appetizers: 14, pastries: 8, popular: 8, main: 9, desserts: 8 } },
    ]
  }
};

export default function BuffetPackages() {
  const { lang } = useLanguage();
  const [selectedCount, setSelectedCount] = useState<number>(30);
  const currentGroup = buffetData[selectedCount];

  const t = {
    ar: {
      badge: "باقات الضيافة الفاخرة",
      title: "ضوابط وباقات المنيو والحفلات",
      subtitle: "اختر عدد الحضور لمعرفة الباقات المتاحة، الأسعار، وعدد الأصناف المخصصة لكل قسم بكل باقة.",
      btnText: (c: number) => `بوفيه لعدد ${c} شخصاً`,
      priceUnit: "ريال / الفرد",
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
      note: "📌 ملاحظات تنظيمية: الأسعار الموضحة هي سعر الفرد بالريال السعودي للعدد المحدد، وتحتسب المقبلات والسلطات فئة موحدة ضمن عدد الاختيارات."
    },
    en: {
      badge: "Luxury Hospitality Packages",
      title: "Menu & Event Buffet Packages",
      subtitle: "Select guest count to view available packages, pricing, and item counts per section.",
      btnText: (c: number) => `Buffet for ${c} Guests`,
      priceUnit: "SAR / Person",
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
      note: "📌 Note: Prices are per person in SAR for the specified guest count. Appetizers and salads are counted together."
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
              className={`bg-white rounded-3xl p-6 border-2 ${pkg.color} flex flex-col justify-between shadow-lg relative overflow-hidden transition-transform hover:-translate-y-1`}
            >
              <div>
                {/* Package Header */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${pkg.badgeColor}`}>
                    {lang === 'ar' ? pkg.nameAr : pkg.nameEn}
                  </span>
                  <div className="text-left">
                    <span className="text-2xl font-black text-[#8c6239] font-sans">{pkg.price}</span>
                    <span className="text-xs text-[#6b5344] mx-1">{currentT.priceUnit}</span>
                  </div>
                </div>

                <hr className="border-[#d4af37]/20 my-4" />

                {/* Items List */}
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

              {/* Includes & Excludes */}
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
          ))}
        </div>

        {/* Notes Footer */}
        <div className="mt-10 bg-white border border-[#d4af37]/30 rounded-2xl p-4 text-center text-xs text-[#6b5344] shadow-sm font-sans">
          <p>{currentT.note}</p>
        </div>

      </div>
    </section>
  );
}