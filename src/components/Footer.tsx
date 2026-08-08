import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  navigateTo: (path: string) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="bg-[#12100E] border-t border-[#D4AF37]/30 pt-16 pb-8 px-4 sm:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#D4AF37]/20">
        <div className="space-y-4 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-[#1C1815] overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="شعار" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-[#FFFDF9]">قُدُور الأَجْدَاد</h3>
          </div>
          <p className="text-gray-400 text-xs font-sans leading-relaxed">
            نقدم أشهى الأطباق الشعبية والولائم الفاخرة بأصالة المذاق السعودي العريق لتناسب جميع مناسباتكم وأوقاتكم اليومية.
          </p>
        </div>

        <div className="space-y-4 text-right">
          <h4 className="text-[#D4AF37] font-bold text-sm tracking-widest">روابط سريعة</h4>
          <ul className="space-y-2 text-xs font-sans text-gray-300">
            <li><button onClick={() => navigateTo('/')} className="hover:text-[#D4AF37]">الرئيسية</button></li>
            <li><button onClick={() => navigateTo('/daily')} className="hover:text-[#D4AF37]">المنيو اليومي</button></li>
            <li><button onClick={() => navigateTo('/events')} className="hover:text-[#D4AF37]">منيو الأفراح والولائم</button></li>
            <li><button onClick={() => navigateTo('/admin')} className="text-[#D4AF37]/70 hover:text-[#D4AF37]">لوحة التحكم (الإدارة)</button></li>
          </ul>
        </div>

        <div className="space-y-4 text-right">
          <h4 className="text-[#D4AF37] font-bold text-sm tracking-widest">تواصل معنا</h4>
          <ul className="space-y-2.5 text-xs font-sans text-gray-300">
            <li className="flex items-center gap-2 justify-end"><span dir="ltr">+966 50 000 0000</span> <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /></li>
            <li className="flex items-center gap-2 justify-end"><span>info@qudur-alajdad.com</span> <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /></li>
            <li className="flex items-center gap-2 justify-end"><span>المملكة العربية السعودية</span> <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /></li>
            <li className="flex items-center gap-2 justify-end"><span>يومياً من 12 ظهراً وحتى 12 صباحاً</span> <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 text-center text-gray-500 text-[11px] font-sans">
        جميع الحقوق محفوظة © 2026 مطعم قُدُور الأَجْدَاد
      </div>
    </footer>
  );
}