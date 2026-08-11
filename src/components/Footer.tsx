import { ChefHat, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  navigateTo: (path: string) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="bg-obsidian border-t border-gold/30 pt-16 pb-12 text-gray-300 font-sans shadow-inner" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* العمود الأول: عن المطعم */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 rounded-full border border-gold bg-obsidian-light flex items-center justify-center shadow-sm">
              <ChefHat className="text-gold w-6 h-6" />
            </div>
            <span className="text-[#FFFDF9] font-bold text-lg">قدور الأجداد</span>
          </div>
          <p className="text-xs leading-relaxed text-gray-400 font-sans">
            نقدم أصالة الطبخ السعودي العريق وولائم الأفراح بأعلى معايير الجودة والضيافة الملكية الأصيلة.
          </p>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div className="space-y-4">
          <h4 className="text-gold font-bold text-sm tracking-widest uppercase">روابط سريعة</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => navigateTo('home')} className="text-gray-300 hover:text-gold transition-colors font-medium">الرئيسية</button>
            </li>
            <li>
              <button onClick={() => navigateTo('daily')} className="text-gray-300 hover:text-gold transition-colors font-medium">المنيو اليومي</button>
            </li>
            <li>
              <button onClick={() => navigateTo('events')} className="text-gray-300 hover:text-gold transition-colors font-medium">منيو الأفراح والولائم</button>
            </li>
            <li>
              <button onClick={() => navigateTo('cart')} className="text-gray-300 hover:text-gold transition-colors font-medium">سلة المشتريات</button>
            </li>
          </ul>
        </div>

        {/* العمود الثالث: معلومات التواصل */}
        <div className="space-y-4">
          <h4 className="text-gold font-bold text-sm tracking-widest uppercase">تواصل معنا والخدمة</h4>
          <ul className="space-y-3 text-xs text-gray-300">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-gold" />
              <span>المملكة العربية السعودية</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gold" />
              <span dir="ltr" className="font-sans">+966 50 000 0000</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-gold" />
              <span className="font-sans">يومياً من 11:00 صباحاً حتى 12:00 منتصف الليل</span>
            </li>
          </ul>
        </div>
      </div>

      {/* خط الحفظ وحقوق النشر */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p>© 2026 مطعم قدور الأجداد. جميع الحقوق محفوظة.</p>
        <button 
          onClick={() => navigateTo('admin')}
          className="flex items-center gap-1.5 text-gray-400 hover:text-gold transition-colors font-medium"
        >
          <ShieldCheck className="w-4 h-4 text-gold" /> لوحة التحكم (الأدمن)
        </button>
      </div>
    </footer>
  );
}