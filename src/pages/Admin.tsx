import { useState } from 'react';
import { Lock, ShieldCheck, LogOut, Upload } from 'lucide-react';

interface AdminProps {
  navigateTo: (path: string) => void;
}

export default function Admin({ navigateTo }: AdminProps) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const ADMIN_SECRET_CODE = "1234";

  const [menuType, setMenuType] = useState<'daily' | 'wedding'>('daily');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDetails, setNewItemDetails] = useState('');
  const [newItemImage, setNewItemImage] = useState('/png.jpeg');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === ADMIN_SECRET_CODE) {
      setIsAdminLoggedIn(true);
      setAdminPasswordInput('');
    } else {
      alert('كلمة المرور غير صحيحة!');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewItemImage(imageUrl);
    }
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) {
      alert('الرجاء إدخال اسم الطبق أو الصنف!');
      return;
    }
    alert('تم إضافة الصنف بنجاح إلى المنيو المختار!');
    setNewItemName('');
    setNewItemPrice('');
    setNewItemDetails('');
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-20 space-y-8 animate-fadeIn min-h-screen flex flex-col justify-center w-full">
      <div className="text-center mb-4">
        <button 
          onClick={() => navigateTo('/')} 
          className="text-[#D4AF37] text-xs font-sans hover:underline mb-4 inline-block"
        >
          ← العودة إلى الموقع الرئيسي
        </button>
      </div>

      {!isAdminLoggedIn ? (
        <form onSubmit={handleAdminLogin} className="bg-[#181513] border border-[#D4AF37]/40 rounded-3xl p-8 space-y-6 shadow-2xl text-center">
          <Lock className="w-12 h-12 text-[#D4AF37] mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#FFFDF9]">لوحة التحكم (مسار سري)</h2>
            <p className="text-gray-400 text-xs font-sans">هذه الصفحة خاصة بإدارة مطعم قدور الأجداد فقط</p>
          </div>
          
          <div className="space-y-2 text-right">
            <label className="text-xs font-sans text-gray-300 block">أدخل الرقم السري للأدمن</label>
            <input 
              type="password" 
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
              placeholder="****" 
              className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-center tracking-widest text-lg focus:outline-none focus:border-[#D4AF37]" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-3.5 rounded-xl font-sans font-bold text-xs tracking-widest shadow-xl hover:opacity-90 transition-all"
          >
            تسجيل الدخول
          </button>
        </form>
      ) : (
        <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-lg font-bold text-[#FFFDF9]">لوحة التحكم المعتمدة</h2>
            </div>
            <button 
              onClick={() => setIsAdminLoggedIn(false)} 
              className="text-red-400 hover:text-red-300 text-xs font-sans flex items-center gap-1 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"
            >
              <LogOut className="w-3.5 h-3.5" /> خروج
            </button>
          </div>

          <form onSubmit={handleAddNewItem} className="space-y-4">
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-sans text-gray-300 block">اختر نوع القائمة</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setMenuType('daily'); setSelectedCategoryIndex(0); }}
                  className={`py-2.5 rounded-xl text-xs font-sans font-bold transition-all border ${menuType === 'daily' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-black/40 text-gray-300 border-[#D4AF37]/30'}`}
                >
                  المنيو اليومي
                </button>
                <button
                  type="button"
                  onClick={() => { setMenuType('wedding'); setSelectedCategoryIndex(0); }}
                  className={`py-2.5 rounded-xl text-xs font-sans font-bold transition-all border ${menuType === 'wedding' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-black/40 text-gray-300 border-[#D4AF37]/30'}`}
                >
                  منيو الأفراح
                </button>
              </div>
            </div>

            <div className="space-y-1.5 text-right">
              <label className="text-xs font-sans text-gray-300 block">اسم الصنف أو الطبق الجديد</label>
              <input 
                type="text" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="مثال: ذبيحة مندي / كبسة خاصة" 
                className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#D4AF37]" 
              />
            </div>

            {menuType === 'daily' ? (
              <>
                <div className="space-y-1.5 text-right">
                  <label className="text-xs font-sans text-gray-300 block">السعر (مع العملة)</label>
                  <input 
                    type="text" 
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="مثال: 35 ريال" 
                    className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#D4AF37]" 
                  />
                </div>

                <div className="space-y-1.5 text-right">
                  <label className="text-xs font-sans text-gray-300 block">اختر صورة الطبق من الجهاز</label>
                  <label className="flex items-center justify-center gap-2 w-full bg-black/50 border border-dashed border-[#D4AF37]/50 rounded-xl px-4 py-3 text-[#D4AF37] text-xs cursor-pointer hover:bg-[#D4AF37]/10 transition-all">
                    <Upload className="w-4 h-4" />
                    <span>{newItemImage.startsWith('blob:') ? 'تم اختيار الصورة بنجاح' : 'اختر صورة من الاستوديو'}</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </>
            ) : (
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-sans text-gray-300 block">تفاصيل الصنف / المكونات</label>
                <input 
                  type="text" 
                  value={newItemDetails}
                  onChange={(e) => setNewItemDetails(e.target.value)}
                  placeholder="مثال: يقدم مع السمن البري والمكسرات" 
                  className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#D4AF37]" 
                />
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-3.5 rounded-xl font-sans font-bold text-xs tracking-widest shadow-xl hover:opacity-90 transition-all"
            >
              إضافة الصنف للمنيو فوراً
            </button>
          </form>
        </div>
      )}
    </div>
  );
}