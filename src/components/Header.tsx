import { ShoppingBag, Menu, X, ChefHat } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  routePath: string;
  navigateTo: (path: string) => void;
  cartItemsCount: number;
}

export default function Header({ routePath, navigateTo, cartItemsCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', path: 'home' },
    { name: 'المنيو اليومي', path: 'daily' },
    { name: 'منيو الأفراح', path: 'events' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0C0B0A]/80 backdrop-blur-xl border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* اللوجو */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center">
            <ChefHat className="text-[#D4AF37] w-6 h-6" />
          </div>
          <span className="text-[#FFFDF9] font-bold text-lg">قدور الأجداد</span>
        </div>

        {/* القائمة للديسكتوب */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigateTo(link.path)}
              className={`text-sm font-sans font-bold transition-all ${
                routePath === link.path ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-[#FFFDF9]'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* أيقونات الأكشن */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigateTo('cart')}
            className="relative p-2 text-[#FFFDF9] hover:text-[#D4AF37] transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartItemsCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 text-[#FFFDF9]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* القائمة للموبايل */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#181513] border-b border-[#D4AF37]/20 p-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => { navigateTo(link.path); setIsMenuOpen(false); }}
              className="block w-full text-right text-[#FFFDF9] py-2 font-bold"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}