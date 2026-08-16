import { ChefHat, Phone, MapPin, Clock, ShieldCheck, Share2, Globe, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  navigateTo: (path: string) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <footer className="bg-[#f5f1ea] border-t border-[#d4af37]/30 pt-16 pb-12 text-[#4a3525] font-sans shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* العمود الأول: عن المطعم */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 rounded-full border border-[#d4af37] bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ChefHat className="text-[#d4af37] w-6 h-6" />
            </div>
            <span className="text-[#2c1e14] font-extrabold text-lg tracking-wide">
              {lang === 'ar' ? 'قدور الأجداد' : 'Qodoor Al-Ajdad'}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[#6b5344] font-sans">
            {lang === 'ar' 
              ? "نقدم أصالة الطبخ السعودي العريق وولائم الأفراح بأعلى معايير الجودة والضيافة الملكية الأصيلة."
              : "Offering the authenticity of traditional Saudi cuisine and wedding banquets with the highest standards of quality and royal hospitality."}
          </p>
          
          {/* أيقونات التواصل وزر تبديل اللغة */}
          <div className="flex items-center gap-3 pt-2">
            <div 
              onClick={toggleLang}
              title="Change Language / تغيير اللغة"
              className="h-8 px-3 rounded-lg bg-white border border-[#d4af37]/30 flex items-center justify-center text-[#8c6239] hover:bg-[#d4af37] hover:text-white transition-all cursor-pointer shadow-sm text-xs font-bold gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'English 🇬🇧' : 'العربية 🇸🇦'}</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all cursor-pointer shadow-sm">
              <Share2 className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-white border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all cursor-pointer shadow-sm">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div className="space-y-4">
          <h4 className="text-[#8c6239] font-bold text-sm tracking-widest uppercase">
            {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => navigateTo('home')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">{t('home')}</button>
            </li>
            <li>
              <button onClick={() => navigateTo('daily')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">{t('menu')}</button>
            </li>
            <li>
              <button onClick={() => navigateTo('breakfast')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">{t('cat_breakfast')}</button>
            </li>
            <li>
              <button onClick={() => navigateTo('events')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">{t('cat_events')}</button>
            </li>
            <li>
              <button onClick={() => navigateTo('buffet')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">{t('cat_buffet')}</button>
            </li>
            <li>
              <button onClick={() => navigateTo('cart')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">{t('cart')}</button>
            </li>
          </ul>
        </div>

        {/* العمود الثالث: معلومات التواصل */}
        <div className="space-y-4">
          <h4 className="text-[#8c6239] font-bold text-sm tracking-widest uppercase">
            {lang === 'ar' ? 'تواصل معنا والخدمة' : 'Contact & Service'}
          </h4>
          <ul className="space-y-3 text-xs text-[#4a3525]">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#8c6239] flex-shrink-0" />
              <span>{lang === 'ar' ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#8c6239] flex-shrink-0" />
              <span dir="ltr" className="font-sans font-semibold">+966 53 319 0997</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#8c6239] flex-shrink-0" />
              <span className="font-sans leading-relaxed">
                {lang === 'ar' ? 'يومياً من 11:00 صباحاً حتى 12:00 منتصف الليل' : 'Daily from 11:00 AM to 12:00 Midnight'}
              </span>
            </li>
          </ul>
        </div>

        {/* العمود الرابع: تنزيل التطبيق */}
        <div className="space-y-4">
          <h4 className="text-[#8c6239] font-bold text-sm tracking-widest uppercase">
            {lang === 'ar' ? 'حمل التطبيق الآن' : 'Download App Now'}
          </h4>
          <p className="text-xs text-[#6b5344]">
            {lang === 'ar' ? 'استمتع بتجربة طلب أسرع ومتابعة حية لطلباتك عبر تطبيقنا الرسمي.' : 'Enjoy a faster ordering experience and live tracking of your orders through our official app.'}
          </p>
          <div className="inline-block bg-white border border-[#d4af37]/40 px-4 py-2.5 rounded-xl text-center text-xs text-[#8c6239] font-bold tracking-wide shadow-sm">
            {lang === 'ar' ? 'قريباً على Google Play & App Store' : 'Coming soon on Google Play & App Store'}
          </div>
        </div>

      </div>

      {/* خط الحفظ وحقوق النشر */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-[#d4af37]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b5344]">
        <p>
          {lang === 'ar' ? '© 2026 مطعم قدور الأجداد. جميع الحقوق محفوظة.' : '© 2026 Qodoor Al-Ajdad Restaurant. All rights reserved.'}
        </p>
        <button 
          onClick={() => navigateTo('admin')}
          className="flex items-center gap-1.5 text-[#4a3525] hover:text-[#8c6239] transition-colors font-bold"
        >
          <ShieldCheck className="w-4 h-4 text-[#8c6239]" /> 
          {lang === 'ar' ? 'لوحة التحكم (الأدمن)' : 'Admin Dashboard'}
        </button>
      </div>
    </footer>
  );
}