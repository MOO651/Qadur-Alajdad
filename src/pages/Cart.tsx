import { ShoppingBag } from 'lucide-react';

interface CartProps {
  cartItems: Array<{ name: string; price: string }>;
  removeFromCart: (index: number) => void;
  navigateTo: (path: string) => void;
  clearCart: () => void;
}

export default function Cart({ cartItems, removeFromCart, navigateTo, clearCart }: CartProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <ShoppingBag className="w-12 h-12 text-[#D4AF37] mx-auto" />
        <h2 className="text-2xl font-bold text-[#FFFDF9]">سلة الطلبات الخاصة بك</h2>
        <p className="text-gray-400 text-xs font-sans">راجع الأطباق المضافة وتأكد من طلباتك قبل إتمامها</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-12 text-center space-y-4">
          <p className="text-gray-400 text-sm font-sans">السلة فارغة حالياً.</p>
          <button 
            onClick={() => navigateTo('/daily')}
            className="bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black px-6 py-3 rounded-xl text-xs font-sans font-bold tracking-widest"
          >
            تصفح المنيو الآن
          </button>
        </div>
      ) : (
        <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="divide-y divide-[#D4AF37]/20">
            {cartItems.map((cartItem, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm">{cartItem.name}</h4>
                  <span className="text-[#D4AF37] font-sans text-xs">{cartItem.price}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(idx)}
                  className="text-red-400 hover:text-red-300 text-xs font-sans bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-[#D4AF37]/30 pt-4 flex items-center justify-between text-base font-bold text-white">
            <span>إجمالي الأصناف المضافة:</span>
            <span className="text-[#D4AF37] font-sans">{cartItems.length} أصناف</span>
          </div>

          <button 
            onClick={() => {
              alert('تم استلام طلبك بنجاح! سيتم التواصل معك قريباً لتأكيد التوصيل.');
              clearCart();
              navigateTo('/');
            }}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-4 rounded-xl font-sans font-bold text-xs tracking-widest shadow-xl hover:opacity-90 transition-all"
          >
            تأكيد وإرسال الطلب
          </button>
        </div>
      )}
    </div>
  );
}