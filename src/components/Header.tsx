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
    <header className="bg-[#1c140d]/90 backdrop-blur-md border-b border-[#d4af37]/30 sticky top-0 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* الشعار */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            <span className="text-[#d4af37] font-bold text-xl tracking-tight">قُدُور الأَجْدَاد</span>
          </div>

          {/* الروابط (للشاشات الكبيرة) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className="text-white hover:text-[#d4af37] font-medium transition-colors text-sm"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* زر طلب الآن والسلة */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigateTo('cart')}
              className="relative p-2 text-white hover:text-[#d4af37] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#0f0b07] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigateTo('cart')}
              className="bg-[#d4af37] text-[#0f0b07] px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#aa7c11] transition-all"
            >
              طلب الآن
            </button>
          </div>

          {/* زر القائمة للموبايل */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {isOpen && (
        <div className="md:hidden bg-[#1c140d] border-b border-[#d4af37]/20 p-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => { navigateTo(link.path); setIsOpen(false); }}
              className="block w-full text-right text-white hover:text-[#d4af37] py-2"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}