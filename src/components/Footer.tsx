import { ChefHat, Phone, MapPin, Clock, ShieldCheck, Share2, Globe, MessageCircle } from 'lucide-react';

interface FooterProps {
  navigateTo: (path: string) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="bg-[#f5f1ea] border-t border-[#d4af37]/30 pt-16 pb-12 text-[#4a3525] font-sans shadow-inner" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* العمود الأول: عن المطعم */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 rounded-full border border-[#d4af37] bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ChefHat className="text-[#d4af37] w-6 h-6" />
            </div>
            <span className="text-[#2c1e14] font-extrabold text-lg tracking-wide">قدور الأجداد</span>
          </div>
          <p className="text-xs leading-relaxed text-[#6b5344] font-sans">
            نقدم أصالة الطبخ السعودي العريق وولائم الأفراح بأعلى معايير الجودة والضيافة الملكية الأصيلة.
          </p>
          
          {/* أيقونات التواصل */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all cursor-pointer shadow-sm">
              <Globe className="w-4 h-4" />
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
          <h4 className="text-[#8c6239] font-bold text-sm tracking-widest uppercase">روابط سريعة</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => navigateTo('home')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">الرئيسية</button>
            </li>
            <li>
              <button onClick={() => navigateTo('daily')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">المنيو اليومي</button>
            </li>
            <li>
              <button onClick={() => navigateTo('events')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">منيو الأفراح والولائم</button>
            </li>
            <li>
              <button onClick={() => navigateTo('cart')} className="text-[#4a3525] hover:text-[#8c6239] transition-colors font-semibold">سلة المشتريات</button>
            </li>
          </ul>
        </div>

        {/* العمود الثالث: معلومات التواصل */}
        <div className="space-y-4">
          <h4 className="text-[#8c6239] font-bold text-sm tracking-widest uppercase">تواصل معنا والخدمة</h4>
          <ul className="space-y-3 text-xs text-[#4a3525]">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#8c6239] flex-shrink-0" />
              <span>المملكة العربية السعودية</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#8c6239] flex-shrink-0" />
              <span dir="ltr" className="font-sans font-semibold">+966 50 000 0000</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#8c6239] flex-shrink-0" />
              <span className="font-sans leading-relaxed">يومياً من 11:00 صباحاً حتى 12:00 منتصف الليل</span>
            </li>
          </ul>
        </div>

        {/* العمود الرابع: تنزيل التطبيق */}
        <div className="space-y-4">
          <h4 className="text-[#8c6239] font-bold text-sm tracking-widest uppercase">حمل التطبيق الآن</h4>
          <p className="text-xs text-[#6b5344]">استمتع بتجربة طلب أسرع ومتابعة حية لطلباتك عبر تطبيقنا الرسمي.</p>
          <div className="inline-block bg-white border border-[#d4af37]/40 px-4 py-2.5 rounded-xl text-center text-xs text-[#8c6239] font-bold tracking-wide shadow-sm">
            قريباً على Google Play & App Store
          </div>
        </div>

      </div>

      {/* خط الحفظ وحقوق النشر */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-[#d4af37]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b5344]">
        <p>© 2026 مطعم قدور الأجداد. جميع الحقوق محفوظة.</p>
        <button 
          onClick={() => navigateTo('admin')}
          className="flex items-center gap-1.5 text-[#4a3525] hover:text-[#8c6239] transition-colors font-bold"
        >
          <ShieldCheck className="w-4 h-4 text-[#8c6239]" /> لوحة التحكم (الأدمن)
        </button>
      </div>
    </footer>
  );
}