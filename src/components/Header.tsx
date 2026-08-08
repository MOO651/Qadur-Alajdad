import { useState } from 'react';
import { Utensils, CalendarHeart, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  routePath: string;
  navigateTo: (path: string) => void;
  cartItemsCount: number;
}

export default function Header({ routePath, navigateTo, cartItemsCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0C0B0A]/95 backdrop-blur-3xl border-b border-[#D4AF37]/40 py-4 px-4 sm:px-8 md:px-16 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div onClick={() => navigateTo('/')} className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#D4AF37]/80 bg-[#1C1815] overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
            <img src="/logo.png" alt="شعار" className="w-full h-full object-cover" />
          </div>
          <div className="text-right">
            <h1 className="text-sm sm:text-lg font-bold tracking-[0.1em] sm:tracking-[0.15em] text-[#FFFDF9] leading-tight">قُدُور الأَجْدَاد</h1>
            <p className="text-[7px] sm:text-[8px] font-sans tracking-[0.2em] sm:tracking-[0.3em] text-[#D4AF37] uppercase">ROYAL HERITAGE</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-xs font-sans font-medium tracking-[0.2em] text-gray-200">
          <button onClick={() => navigateTo('/')} className={`transition-colors ${routePath === '/' || routePath === '' ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'}`}>الرئيسية</button>
          <button onClick={() => navigateTo('/daily')} className={`transition-colors flex items-center gap-1.5 ${routePath === '/daily' ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'}`}>
            <Utensils className="w-3.5 h-3.5" /> المنيو اليومي
          </button>
          <button onClick={() => navigateTo('/events')} className={`transition-colors flex items-center gap-1.5 ${routePath === '/events' ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'}`}>
            <CalendarHeart className="w-3.5 h-3.5" /> منيو الأفراح
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateTo('/cart')} 
            className="relative border border-[#D4AF37]/60 bg-[#181513] hover:bg-[#D4AF37]/20 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all flex items-center gap-2 text-[#D4AF37]"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black font-sans font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {cartItemsCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden border border-[#D4AF37]/60 bg-[#181513] text-[#D4AF37] p-2 rounded-xl text-xs font-sans"
          >
            القائمة
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0C0B0A]/95 border-b border-[#D4AF37]/30 py-4 px-6 flex flex-col gap-4 text-xs font-sans">
          <button onClick={() => { navigateTo('/'); setMobileMenuOpen(false); }} className={`text-right py-2 ${routePath === '/' ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}`}>الرئيسية</button>
          <button onClick={() => { navigateTo('/daily'); setMobileMenuOpen(false); }} className={`text-right py-2 ${routePath === '/daily' ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}`}>المنيو اليومي</button>
          <button onClick={() => { navigateTo('/events'); setMobileMenuOpen(false); }} className={`text-right py-2 ${routePath === '/events' ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}`}>منيو الأفراح والولائم</button>
        </div>
      )}
    </header>
  );
}