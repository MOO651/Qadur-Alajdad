import { ShoppingBag, Trash2, Send, ArrowRight } from 'lucide-react';

interface CartItem {
  name: string;
  price: string | number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (index: number) => void;
  navigateTo: (path: string) => void;
  clearCart: () => void;
}

export default function Cart({ cartItems, removeFromCart, navigateTo, clearCart }: CartProps) {
  // حساب المجموع الكلي تلقائياً
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceNum = typeof item.price === 'number' 
        ? item.price 
        : parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) || 0;
      return total + priceNum;
    }, 0);
  };

  const totalPrice = calculateTotal();

  // إرسال الطلب عبر واتساب
  const sendToWhatsApp = () => {
    if (cartItems.length === 0) return;
    
    let message = "السلام عليكم، أود طلب الأطباق التالية من مطعم قدور الأجداد:%0A%0A";
    cartItems.forEach((item, index) => {
      message += `${index + 1}- ${item.name} (${item.price})%0A`;
    });
    message += `%0A*الإجمالي الكلي:* ${totalPrice} ريال`;
    
    // استبدل الرقم أدناه برقم الواتساب الخاص بك (مثلاً: 9665xxxxxxxx)
    const phoneNumber = "966500000000"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#FFFDF9]">سلة الطلبات</h2>
            <p className="text-gray-400 text-xs font-sans">راجع أطباقك المختارة قبل تأكيد الطلب</p>
          </div>
        </div>
        <button 
          onClick={() => navigateTo('daily')}
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
        >
          متابعة التسوق <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-[#181513] border border-[#D4AF37]/20 rounded-3xl space-y-4">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto" />
          <h3 className="text-lg font-bold text-gray-300">سلة المشتريات فارغة</h3>
          <p className="text-gray-500 text-xs font-sans">لم تقم بإضافة أي أطباق للسلة بعد.</p>
          <button 
            onClick={() => navigateTo('daily')}
            className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all"
          >
            تصفح المنيو الآن
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl divide-y divide-[#D4AF37]/10 overflow-hidden">
            {cartItems.map((item, index) => (
              <div key={index} className="p-4 sm:p-6 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-[#FFFDF9] font-bold text-sm sm:text-base">{item.name}</h4>
                  <span className="text-[#D4AF37] text-xs font-sans font-bold">{item.price}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                  title="حذف الصنف"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* صندوق الحساب الكلي والواتساب */}
          <div className="bg-[#181513] border border-[#D4AF37]/40 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-gray-300">الإجمالي الكلي:</span>
              <span className="text-[#D4AF37] text-xl font-sans">{totalPrice} ريال</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={clearCart}
                className="w-full sm:w-1/3 border border-red-500/40 text-red-400 hover:bg-red-500/10 py-3 rounded-2xl text-xs font-bold transition-all"
              >
                إفراغ السلة
              </button>
              <button 
                onClick={sendToWhatsApp}
                className="w-full sm:w-2/3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                <Send className="w-4 h-4" /> إرسال الطلب عبر واتساب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}