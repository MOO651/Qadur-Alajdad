import { useState } from 'react';
import { ShoppingBag, Trash2, CheckCircle2, ArrowRight, User, Phone, MapPin, FileText } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';

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
  const { lang } = useLanguage();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const t = {
    ar: {
      successTitle: "تم إرسال طلبك بنجاح!",
      successDesc: "جاري تجهيز طلبك الآن في المطعم وسيصلك في أقرب وقت.",
      backToMenu: "العودة للمنيو",
      cartTitle: "سلة الطلبات وإتمام الشراء",
      cartSubtitle: "أكمل بياناتك لتأكيد الطلب عبر السيستم فوراً",
      continueShopping: "متابعة التسوق",
      emptyCartTitle: "سلة المشتريات فارغة",
      emptyCartDesc: "لم تقم بإضافة أي أطباق للسلة بعد.",
      browseMenu: "تصفح المنيو الآن",
      availableItems: (count: number) => `الأطباق المتاحة في السلة (${count})`,
      deleteItem: "حذف الصنف",
      sar: "ريال",
      deliveryInfo: "معلومات التوصيل والاتصال",
      namePlaceholder: "الاسم الكامل *",
      phonePlaceholder: "رقم الهاتف / الجوال *",
      addressPlaceholder: "عنوان التوصيل بالتفصيل (المدينة، الحي، الشارع)",
      notesPlaceholder: "ملاحظات إضافية للطلب (اختياري)...",
      invoiceSummary: "ملخص الفاتورة",
      itemsTotal: "قيمة الأطباق:",
      deliveryFee: "رسوم التوصيل:",
      free: "مجاني",
      grandTotal: "الإجمالي الكلي:",
      confirmOrder: "تأكيد وإرسال الطلب للسيستم",
      sendingOrder: "جاري إرسال الطلب...",
      clearCartBtn: "إفراغ السلة",
      alertNamePhone: "الرجاء إدخال الاسم ورقم الهاتف على الأقل لتأكيد الطلب.",
      errorPrefix: "حدث خطأ أثناء إرسال الطلب: ",
      defaultAddress: "لم يتم تحديد عنوان",
      defaultNotes: "لا توجد ملاحظات"
    },
    en: {
      successTitle: "Order Placed Successfully!",
      successDesc: "Your order is now being prepared at the restaurant and will reach you soon.",
      backToMenu: "Back to Menu",
      cartTitle: "Shopping Cart & Checkout",
      cartSubtitle: "Complete your details to instantly confirm your order through the system",
      continueShopping: "Continue Shopping",
      emptyCartTitle: "Your Cart is Empty",
      emptyCartDesc: "You haven't added any dishes to your cart yet.",
      browseMenu: "Browse Menu Now",
      availableItems: (count: number) => `Items in Cart (${count})`,
      deleteItem: "Delete Item",
      sar: "SAR",
      deliveryInfo: "Delivery & Contact Information",
      namePlaceholder: "Full Name *",
      phonePlaceholder: "Phone / Mobile Number *",
      addressPlaceholder: "Detailed Delivery Address (City, District, Street)",
      notesPlaceholder: "Additional order notes (optional)...",
      invoiceSummary: "Invoice Summary",
      itemsTotal: "Items Total:",
      deliveryFee: "Delivery Fee:",
      free: "Free",
      grandTotal: "Grand Total:",
      confirmOrder: "Confirm & Send Order to System",
      sendingOrder: "Sending Order...",
      clearCartBtn: "Clear Cart",
      alertNamePhone: "Please enter at least your name and phone number to confirm the order.",
      errorPrefix: "Error sending order: ",
      defaultAddress: "No address specified",
      defaultNotes: "No notes"
    }
  };

  const currentT = t[lang];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceNum = typeof item.price === 'number' 
        ? item.price 
        : parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) || 0;
      return total + priceNum;
    }, 0);
  };

  const totalPrice = calculateTotal();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customerName || !customerPhone) {
      alert(currentT.alertNamePhone);
      return;
    }

    setLoading(true);

    const newOrder = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: customerAddress || currentT.defaultAddress,
      notes: orderNotes || currentT.defaultNotes,
      items: cartItems,
      total_price: totalPrice,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('orders').insert([newOrder]);

    setLoading(false);

    if (error) {
      alert(currentT.errorPrefix + error.message);
    } else {
      setOrderPlaced(true);
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center p-8 bg-white border border-[#d4af37]/30 rounded-3xl space-y-6 shadow-xl" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-[#2c1e14]">{currentT.successTitle}</h2>
        <p className="text-[#6b5344] text-xs font-sans">{currentT.successDesc}</p>
        <button 
          onClick={() => { setOrderPlaced(false); navigateTo('daily'); }}
          className="w-full bg-[#d4af37] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#c49f27] hover:shadow-md transition-all"
        >
          {currentT.backToMenu}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between border-b border-[#d4af37]/25 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#8c6239]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2c1e14]">{currentT.cartTitle}</h2>
            <p className="text-[#6b5344] text-xs font-sans">{currentT.cartSubtitle}</p>
          </div>
        </div>
        <button 
          onClick={() => navigateTo('daily')}
          className="text-xs text-[#8c6239] hover:underline flex items-center gap-1 font-bold"
        >
          {currentT.continueShopping} <ArrowRight className={`w-4 h-4 ${lang === 'en' ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#d4af37]/30 rounded-3xl space-y-4 shadow-sm">
          <ShoppingBag className="w-16 h-16 text-[#8c6239]/40 mx-auto" />
          <h3 className="text-lg font-bold text-[#2c1e14]">{currentT.emptyCartTitle}</h3>
          <p className="text-[#6b5344] text-xs font-sans">{currentT.emptyCartDesc}</p>
          <button 
            onClick={() => navigateTo('daily')}
            className="bg-[#d4af37] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#c49f27] hover:shadow-md transition-all"
          >
            {currentT.browseMenu}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* تفاصيل المنتجات في السلة */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-[#8c6239]">{currentT.availableItems(cartItems.length)}</h3>
            <div className="bg-white border border-[#d4af37]/30 rounded-3xl divide-y divide-[#d4af37]/15 overflow-hidden shadow-sm">
              {cartItems.map((item, index) => (
                <div key={index} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-[#d4af37]/20" />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#f5f1ea] flex items-center justify-center text-[#8c6239] border border-[#d4af37]/20">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-[#2c1e14] font-bold text-sm sm:text-base">{item.name}</h4>
                      <span className="text-[#8c6239] text-xs font-sans font-bold">{item.price} {currentT.sar}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title={currentT.deleteItem}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleCheckout} id="checkout-form" className="bg-white border border-[#d4af37]/30 rounded-3xl p-6 space-y-4 mt-6 shadow-sm">
              <h3 className="text-base font-bold text-[#8c6239]">{currentT.deliveryInfo}</h3>
              
              <div className="space-y-3">
                <div className="relative">
                  <User className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3.5 w-4 h-4 text-[#8c6239]`} />
                  <input 
                    type="text" 
                    placeholder={currentT.namePlaceholder} 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className={`w-full bg-[#f5f1ea] border border-[#d4af37]/20 rounded-xl py-3 ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-[#2c1e14] outline-none focus:border-[#d4af37]`}
                  />
                </div>

                <div className="relative">
                  <Phone className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3.5 w-4 h-4 text-[#8c6239]`} />
                  <input 
                    type="tel" 
                    placeholder={currentT.phonePlaceholder} 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className={`w-full bg-[#f5f1ea] border border-[#d4af37]/20 rounded-xl py-3 ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-[#2c1e14] outline-none focus:border-[#d4af37]`}
                  />
                </div>

                <div className="relative">
                  <MapPin className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3.5 w-4 h-4 text-[#8c6239]`} />
                  <input 
                    type="text" 
                    placeholder={currentT.addressPlaceholder} 
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className={`w-full bg-[#f5f1ea] border border-[#d4af37]/20 rounded-xl py-3 ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-[#2c1e14] outline-none focus:border-[#d4af37]`}
                  />
                </div>

                <div className="relative">
                  <FileText className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3.5 w-4 h-4 text-[#8c6239]`} />
                  <textarea 
                    placeholder={currentT.notesPlaceholder} 
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className={`w-full bg-[#f5f1ea] border border-[#d4af37]/20 rounded-xl py-3 ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-[#2c1e14] h-20 outline-none focus:border-[#d4af37]`}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          {/* ملخص الطلب الجانبي */}
          <div className="space-y-6">
            <div className="bg-white border border-[#d4af37]/40 rounded-3xl p-6 space-y-6 shadow-md sticky top-6">
              <h3 className="text-base font-bold text-[#8c6239] border-b border-[#d4af37]/20 pb-3">{currentT.invoiceSummary}</h3>
              
              <div className="space-y-2 text-sm text-[#6b5344]">
                <div className="flex justify-between">
                  <span>{currentT.itemsTotal}</span>
                  <span className="font-sans font-semibold text-[#2c1e14]">{totalPrice} {currentT.sar}</span>
                </div>
                <div className="flex justify-between">
                  <span>{currentT.deliveryFee}</span>
                  <span className="text-green-600 font-sans font-semibold">{currentT.free}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-lg font-bold border-t border-[#d4af37]/20 pt-4">
                <span className="text-[#2c1e14]">{currentT.grandTotal}</span>
                <span className="text-[#8c6239] text-xl font-sans">{totalPrice} {currentT.sar}</span>
              </div>

              <div className="space-y-3">
                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="w-full bg-[#d4af37] hover:bg-[#c49f27] text-white font-bold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? currentT.sendingOrder : currentT.confirmOrder}
                </button>

                <button 
                  type="button"
                  onClick={clearCart}
                  className="w-full border border-red-500/40 text-red-500 hover:bg-red-50 py-2.5 rounded-2xl text-xs font-bold transition-all"
                >
                  {currentT.clearCartBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}