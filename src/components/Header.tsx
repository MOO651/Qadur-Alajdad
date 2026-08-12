import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  navigateTo: (path: string) => void;
  cartItemsCount: number;
  routePath?: string;
}

export default function Header({ navigateTo, cartItemsCount }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', path: 'home' },
    { name: 'قائمة الطعام', path: 'daily' },
    { name: 'منيو الأفراح', path: 'events' },
    { name: 'عن المطعم', path: 'about' },
    { name: 'اتصل بنا', path: 'contact' },
  ];

  return (
    <header className="bg-[#f5f1ea]/95 backdrop-blur-md border-b border-[#d4af37]/30 sticky top-0 z-50 shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* الشعار */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-white overflow-hidden flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-[#2c1e14] font-extrabold text-lg sm:text-xl tracking-tight group-hover:text-[#8c6239] transition-colors">
              قُدُور الأَجْدَاد
            </span>
          </div>

          {/* الروابط (للشاشات الكبيرة) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className="text-[#4a3525] hover:text-[#8c6239] font-bold transition-colors text-sm tracking-wide"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* زر طلب الآن والسلة (للشاشات الكبيرة) */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigateTo('cart')}
              className="relative p-2.5 rounded-xl bg-white border border-[#d4af37]/30 text-[#4a3525] hover:text-[#8c6239] hover:border-[#d4af37] transition-all shadow-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#8c6239] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigateTo('cart')}
              className="bg-[#d4af37] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#c49f27] transition-all shadow-md hover:scale-105"
            >
              طلب الآن
            </button>
          </div>

          {/* أزرار الموبايل (السلة والقائمة) */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={() => navigateTo('cart')}
              className="relative p-2 rounded-xl bg-white border border-[#d4af37]/30 text-[#4a3525]"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8c6239] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-xl bg-white border border-[#d4af37]/30 text-[#4a3525]"
            >
              {isOpen ? <X className="w-6 h-6 text-[#8c6239]" /> : <Menu className="w-6 h-6 text-[#8c6239]" />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#d4af37]/30 p-5 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => { navigateTo(link.path); setIsOpen(false); }}
              className="block w-full text-right text-[#4a3525] hover:text-[#8c6239] py-2.5 px-4 rounded-xl hover:bg-[#f5f1ea] transition-colors font-bold text-sm border border-transparent hover:border-[#d4af37]/20"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2">
            <button 
              onClick={() => { navigateTo('cart'); setIsOpen(false); }}
              className="w-full bg-[#d4af37] text-white py-3 rounded-xl font-bold text-sm text-center shadow-md"
            >
              سلة المشتريات والطلب ({cartItemsCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}