import { useState } from 'react';
import { ShoppingBag, Trash2, CheckCircle2, ArrowRight, User, Phone, MapPin, FileText } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface CartItem {
  name: string;
  price: string | number;
  image?: string;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (index: number) => void;
  navigateTo: (path: string) => void;
  clearCart: () => void;
}

export default function Cart({ cartItems, removeFromCart, navigateTo, clearCart }: CartProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceNum = typeof item.price === 'number' 
        ? item.price 
        : parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) || 0;
      return total + priceNum;
    }, 0);
  };

  const totalPrice = calculateTotal();

  // إرسال الطلب وحفظه في جدول Supabase لتراه شاشة الكاشير فوراً
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customerName || !customerPhone) {
      alert("الرجاء إدخال الاسم ورقم الهاتف على الأقل لتأكيد الطلب.");
      return;
    }

    setLoading(true);

    const newOrder = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: customerAddress || "لم يتم تحديد عنوان",
      notes: orderNotes || "لا توجد ملاحظات",
      items: cartItems,
      total_price: totalPrice,
      status: 'pending', // حالة الطلب جديدة لتظهر عند الكاشير
      created_at: new Date().toISOString()
    };

    // إرسال البيانات إلى جدول orders في Supabase
    const { error } = await supabase.from('orders').insert([newOrder]);

    setLoading(false);

    if (error) {
      alert('حدث خطأ أثناء إرسال الطلب: ' + error.message);
    } else {
      setOrderPlaced(true);
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center p-8 bg-[#181513] border border-[#D4AF37]/40 rounded-3xl space-y-6 shadow-2xl" dir="rtl">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-[#FFFDF9]">تم إرسال طلبك بنجاح!</h2>
        <p className="text-gray-400 text-xs font-sans">جاري تجهيز طلبك الآن في المطعم وسيصلك في أقرب وقت.</p>
        <button 
          onClick={() => { setOrderPlaced(false); navigateTo('daily'); }}
          className="w-full bg-[#D4AF37] text-black py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all"
        >
          العودة للمنيو
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8" dir="rtl">
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#FFFDF9]">سلة الطلبات وإتمام الشراء</h2>
            <p className="text-gray-400 text-xs font-sans">أكمل بياناتك لتأكيد الطلب عبر السيستم فوراً</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* تفاصيل المنتجات في السلة */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-[#D4AF37]">الأطباق المتاحة في السلة ({cartItems.length})</h3>
            <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl divide-y divide-[#D4AF37]/10 overflow-hidden">
              {cartItems.map((item, index) => (
                <div key={index} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-[#D4AF37]/20" />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-[#FFFDF9] font-bold text-sm sm:text-base">{item.name}</h4>
                      <span className="text-[#D4AF37] text-xs font-sans font-bold">{item.price} ريال</span>
                    </div>
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

            <form onSubmit={handleCheckout} id="checkout-form" className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 space-y-4 mt-6">
              <h3 className="text-base font-bold text-[#D4AF37]">معلومات التوصيل والاتصال</h3>
              
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="الاسم الكامل *" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-black border border-[#D4AF37]/20 rounded-xl py-3 pr-10 pl-4 text-sm text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="tel" 
                    placeholder="رقم الهاتف / الجوال *" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full bg-black border border-[#D4AF37]/20 rounded-xl py-3 pr-10 pl-4 text-sm text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="عنوان التوصيل بالتفصيل (المدينة، الحي، الشارع)" 
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-black border border-[#D4AF37]/20 rounded-xl py-3 pr-10 pl-4 text-sm text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="relative">
                  <FileText className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
                  <textarea 
                    placeholder="ملاحظات إضافية للطلب (اختياري)..." 
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full bg-black border border-[#D4AF37]/20 rounded-xl py-3 pr-10 pl-4 text-sm text-white h-20 outline-none focus:border-[#D4AF37]"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          {/* ملخص الطلب الجانبي */}
          <div className="space-y-6">
            <div className="bg-[#181513] border border-[#D4AF37]/40 rounded-3xl p-6 space-y-6 shadow-2xl sticky top-6">
              <h3 className="text-base font-bold text-[#D4AF37] border-b border-[#D4AF37]/20 pb-3">ملخص الفاتورة</h3>
              
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>قيمة الأطباق:</span>
                  <span className="font-sans">{totalPrice} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم التوصيل:</span>
                  <span className="text-green-400 font-sans">مجاني</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-lg font-bold border-t border-[#D4AF37]/20 pt-4">
                <span className="text-gray-200">الإجمالي الكلي:</span>
                <span className="text-[#D4AF37] text-xl font-sans">{totalPrice} ريال</span>
              </div>

              <div className="space-y-3">
                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90 text-black font-bold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  {loading ? 'جاري إرسال الطلب...' : 'تأكيد وإرسال الطلب للسيستم'}
                </button>

                <button 
                  type="button"
                  onClick={clearCart}
                  className="w-full border border-red-500/40 text-red-400 hover:bg-red-500/10 py-2.5 rounded-2xl text-xs font-bold transition-all"
                >
                  إفراغ السلة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}