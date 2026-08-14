import React, { createContext, useContext, useState } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // الأقسام والواجهة العامة
    heroBadge: "المنيو اليومي الأصيل",
    heroTitle: "ما تيسر من قدور الأجداد",
    heroSubtitle: "تشكيلة طازجة ومحضرة يومياً بأجود المكونات المحلية",
    searchPlaceholder: "ابحث عن طبقك المفضل (مثل: المرقوق، سليق، كابلي)...",
    addToCart: "أضف للسلة",
    added: "✓ تمت الإضافة",
    allergens: "مسببات الحساسية:",
    noResults: "عذراً، لم نجد أطباق مطابقة في هذا القسم حالياً.",
    currency: "ر.س",
    home: "الرئيسية",
    menu: "قائمة الطعام",
    cart: "السلة",
    about: "عن المطعم",
    contact: "اتصل بنا",
    
    // أقسام المنيو الرئيسية
    cat_main: "الأطباق الرئيسية",
    cat_breakfast: "التعتيمة والإفطار",
    cat_buffet: "باقات البوفيه",
    cat_events: "منيو الأفراح",
  },
  en: {
    // General UI & Hero
    heroBadge: "Authentic Daily Menu",
    heroTitle: "Godoor Al-Ajdad Specialties",
    heroSubtitle: "Fresh daily selections prepared with the finest local ingredients",
    searchPlaceholder: "Search for your favorite dish (e.g., Marqooq, Saleeq)...",
    addToCart: "Add to Cart",
    added: "✓ Added",
    allergens: "Allergens:",
    noResults: "Sorry, no matching dishes found in this section currently.",
    currency: "SAR",
    home: "Home",
    menu: "Menu",
    cart: "Cart",
    about: "About Us",
    contact: "Contact Us",

    // Main Categories
    cat_main: "Main Dishes",
    cat_breakfast: "Breakfast",
    cat_buffet: "Buffet Packages",
    cat_events: "Events Menu",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('ar');

  const toggleLang = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={lang === 'en' ? 'font-sans' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};