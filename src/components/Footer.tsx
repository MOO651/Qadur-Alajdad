import { ChefHat, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  navigateTo: (path: string) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="bg-[#0C0B0A] border-t border-[#D4AF37]/20 pt-16 pb-12 text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* العمود الأول: عن المطعم */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center">
              <ChefHat className="text-[#D4AF37] w-6 h-6" />
            </div>
            <span className="text-[#FFFDF9] font-bold text-lg">قدور الأجداد</span>
          </div>
          <p className="text-xs leading-relaxed text-gray-400">
            نقدم أصالة الطبخ السعودي العريق وولائم الأفراح بأعلى معايير الجودة والضيافة الملكية الأصيلة.
          </p>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div className="space-y-4">
          <h4 className="text-[#FFFDF9] font-bold text-sm tracking-widest uppercase">روابط سريعة</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-[#D4AF37] transition-colors">الرئيسية</button>
            </li>
            <li>
              <button onClick={() => navigateTo('daily')} className="hover:text-[#D4AF37] transition-colors">المنيو اليومي</button>
            </li>
            <li>
              <button onClick={() => navigateTo('events')} className="hover:text-[#D4AF37] transition-colors">منيو الأفراح والولائم</button>
            </li>
            <li>
              <button onClick={() => navigateTo('cart')} className="hover:text-[#D4AF37] transition-colors">سلة المشتريات</button>
            </li>
          </ul>
        </div>

        {/* العمود الثالث: معلومات التواصل */}
        <div className="space-y-4">
          <h4 className="text-[#FFFDF9] font-bold text-sm tracking-widest uppercase">تواصل معنا والخدمة</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>المملكة العربية السعودية</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span dir="ltr">+966 50 000 0000</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>يومياً من 11:00 صباحاً حتى 12:00 منتصف الليل</span>
            </li>
          </ul>
        </div>
      </div>

      {/* خط الحفظ وحقوق النشر */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© 2026 مطعم قدور الأجداد. جميع الحقوق محفوظة.</p>
        <button 
          onClick={() => navigateTo('admin')}
          className="flex items-center gap-1.5 text-gray-500 hover:text-[#D4AF37] transition-colors"
        >
          <ShieldCheck className="w-4 h-4" /> لوحة التحكم (الأدمن)
        </button>
      </div>
    </footer>
  );
}