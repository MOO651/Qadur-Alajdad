import { useState, useEffect } from 'react';
import { Utensils, CalendarHeart, Sparkles, ShoppingBag, ShieldCheck, Lock, LogOut, Upload, Star, Award, HeartHandshake, ChefHat, MapPin, Phone, Mail, Clock } from 'lucide-react';

const heroImages = [
  '/png (3).jpeg',
  '/png.jpeg',
  '/png (2).jpeg'
];

const initialDailyMenuSections = [
  {
    category: "الشوربات",
    image: "/appetizers.jpg",
    items: [
      { name: "عدس", price: "17 ريال", image: "/appetizers.jpg" },
      { name: "حب", price: "19 ريال", image: "/appetizers.jpg" },
      { name: "مقادم", price: "26 ريال", image: "/appetizers.jpg" }
    ]
  },
  {
    category: "السلاطات والمقبلات الباردة",
    image: "/appetizers.jpg",
    items: [
      { name: "سلطة البر", price: "14 ريال", image: "/appetizers.jpg" },
      { name: "فتوش", price: "16 ريال", image: "/appetizers.jpg" },
      { name: "تبولة", price: "14 ريال", image: "/appetizers.jpg" },
      { name: "جرجير شمندر", price: "13 ريال", image: "/appetizers.jpg" },
      { name: "بامية رمان", price: "18 ريال", image: "/appetizers.jpg" },
      { name: "سلطة لبن", price: "12 ريال", image: "/appetizers.jpg" },
      { name: "سلطة أقط", price: "18 ريال", image: "/appetizers.jpg" },
      { name: "حمص", price: "13 ريال", image: "/appetizers.jpg" },
      { name: "متبل", price: "13 ريال", image: "/appetizers.jpg" },
      { name: "كبيبة حائل", price: "23 ريال", image: "/appetizers.jpg" }
    ]
  },
  {
    category: "المقبلات الحارة والمعجنات",
    image: "/appetizers.jpg",
    items: [
      { name: "سمبوسة لحم", price: "12 ريال", image: "/appetizers.jpg" },
      { name: "سمبوسة دجاج", price: "12 ريال", image: "/appetizers.jpg" },
      { name: "سمبوسة جبن", price: "9 ريال", image: "/appetizers.jpg" },
      { name: "عيش أبو اللحم", price: "14 ريال", image: "/appetizers.jpg" },
      { name: "فرموزة", price: "14 ريال", image: "/appetizers.jpg" },
      { name: "بف حجازي", price: "12 ريال", image: "/appetizers.jpg" },
      { name: "مطبق مالح", price: "12 ريال", image: "/appetizers.jpg" },
      { name: "بطاطا حارة", price: "12 ريال", image: "/appetizers.jpg" },
      { name: "بطاطس مقلى", price: "8 ريال", image: "/appetizers.jpg" }
    ]
  },
  {
    category: "الإدامات",
    image: "/png.jpeg",
    items: [
      { name: "بامية", price: "16 ريال", image: "/png.jpeg" },
      { name: "ملوخية", price: "14 ريال", image: "/png.jpeg" },
      { name: "مسقعة", price: "16 ريال", image: "/png.jpeg" },
      { name: "قرع", price: "14 ريال", image: "/png.jpeg" }
    ]
  },
  {
    category: "الشعبيات والاطباق الجانبية",
    image: "/png.jpeg",
    items: [
      { name: "مرقوق", price: "24 ريال", image: "/png.jpeg" },
      { name: "قرصان", price: "23 ريال", image: "/png.jpeg" },
      { name: "جريش حائلي", price: "24 ريال", image: "/png.jpeg" },
      { name: "جريش نجدي", price: "22 ريال", image: "/png.jpeg" },
      { name: "مكرونة بشاميل", price: "21 ريال", image: "/png.jpeg" }
    ]
  },
  {
    category: "الاطباق الرئيسية",
    image: "/png (2).jpeg",
    items: [
      { name: "سليق دجاج", price: "32 ريال", image: "/png (2).jpeg" },
      { name: "زروبيان دجاج", price: "28 ريال", image: "/png (2).jpeg" },
      { name: "برياني دجاج", price: "27 ريال", image: "/png (2).jpeg" },
      { name: "مقلوبة دجاج", price: "31 ريال", image: "/png (2).jpeg" },
      { name: "دجاج فحم", price: "24 ريال", image: "/png (2).jpeg" },
      { name: "دجاج شواية", price: "24 ريال", image: "/png (2).jpeg" },
      { name: "مشخول روبيان", price: "32 ريال", image: "/png (2).jpeg" },
      { name: "مشخول لحم", price: "78 ريال", image: "/png (2).jpeg" },
      { name: "كابلي لحم", price: "78 ريال", image: "/png (2).jpeg" },
      { name: "مثلوثة دجاج", price: "34 ريال", image: "/png (2).jpeg" },
      { name: "مثلوثة لحم", price: "86 ريال", image: "/png (2).jpeg" }
    ]
  },
  {
    category: "الحلا",
    image: "/appetizers.jpg",
    items: [
      { name: "كريم كراميل", price: "17 ريال", image: "/appetizers.jpg" },
      { name: "مهلبية ورد", price: "18 ريال", image: "/appetizers.jpg" },
      { name: "ساكو", price: "15 ريال", image: "/appetizers.jpg" },
      { name: "بسبوسة قشطة", price: "14 ريال", image: "/appetizers.jpg" },
      { name: "كنافة قشطة", price: "14 ريال", image: "/appetizers.jpg" },
      { name: "حنيني", price: "16 ريال", image: "/appetizers.jpg" },
      { name: "لقيمات", price: "14 ريال", image: "/appetizers.jpg" },
      { name: "مراصيع عسل", price: "14 ريال", image: "/appetizers.jpg" }
    ]
  },
  {
    category: "المشروبات",
    image: "/png (3).jpeg",
    items: [
      { name: "كركديه ورد", price: "12 ريال", image: "/png (3).jpeg" },
      { name: "ليمون نعناع", price: "15 ريال", image: "/png (3).jpeg" },
      { name: "برتقال", price: "18 ريال", image: "/png (3).jpeg" },
      { name: "بطيخ", price: "18 ريال", image: "/png (3).jpeg" },
      { name: "لبن القرية", price: "5 ريال", image: "/png (3).jpeg" },
      { name: "لبن اسم المطعم", price: "9 ريال", image: "/png (3).jpeg" },
      { name: "مشروبات غازية", price: "5 ريال", image: "/png (3).jpeg" }
    ]
  }
];

const initialWeddingMenuSections = [
  {
    category: "[أفراح] الذبائح والذبائح المحشية",
    image: "/stuffed-lamb.jpg",
    description: "أجود أنواع الذبائح البلدية المحضرة لأفخم المناسبات",
    items: [
      { name: "الذبائح الشعبية", price: "حسب الطلب", details: "شعبي، غوزي، مندي، عييلة، كابلي، زييان، بخاري، سليق، ومثلوثة." },
      { name: "الذبائح المحشية", price: "حسب الطلب", details: "خروف مع المحاشي، محشي ورق عنب، محشي مكرونة، محشي بالفريك، محشي مسقعة، ومحشي كبيبة." }
    ]
  },
  {
    category: "[أفراح] الأرزاز (الأرز الفاخر)",
    image: "/banquet.jpg",
    description: "تخضيرة أرز ملكية مفلفلة بأرقى البهارات",
    items: [
      { name: "تشكيلة الأرز", price: "حسب الطلب", details: "المعمر، الصيادية، المشخول، الحساوي، المندي، والكليبي." }
    ]
  },
  {
    category: "[أفراح] الشعبيات الأصيلة",
    image: "/png.jpeg",
    description: "طعم الأصالة العريقة المطهوة بالسمن البري",
    items: [
      { name: "الأطباق الشعبية", price: "حسب الطلب", details: "المرقوق، الجريش (حائل، قصيمي، نجدي)، هريس حساوي، سليق مكاوي، وقرصان." }
    ]
  },
  {
    category: "[أفراح] الإدامات والأصناف الرئيسية",
    image: "/png (2).jpeg",
    description: "نكهات أهل أول المميزة",
    items: [
      { name: "الأصناف المتفرقة", price: "حسب الطلب", details: "قرع بلدي أهل أول، بامية أهل المدينة، مسقعة حجازية، وكبسة." }
    ]
  },
  {
    category: "[أفراح] الحلويات والمقشوش",
    image: "/appetizers.jpg",
    description: "مسك الختام لأفخم الولائم",
    items: [
      { name: "حلويات المناسبات", price: "حسب الطلب", details: "مقشوش، حنيني، عريكة، حسية، كيكة، ساقو، وأم علي زعفران." }
    ]
  },
  {
    category: "[أفراح] المشروبات المنعشة",
    image: "/png (3).jpeg",
    description: "تشكيلة من العصائر الطبيعية والمياه",
    items: [
      { name: "المشروبات", price: "حسب الطلب", details: "ليمون حبق، برتقال، أناناس، ومياه نوفا غازية." }
    ]
  }
];

export default function App() {
  const [routePath, setRoutePath] = useState<string>(window.location.hash || window.location.pathname);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartItems, setCartItems] = useState<{name: string, price: string}[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dailyMenu, setDailyMenu] = useState(initialDailyMenuSections);
  const [weddingMenu, setWeddingMenu] = useState(initialWeddingMenuSections);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const ADMIN_SECRET_CODE = "1234";

  const [menuType, setMenuType] = useState<'daily' | 'wedding'>('daily');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDetails, setNewItemDetails] = useState('');
  const [newItemImage, setNewItemImage] = useState('/png.jpeg');

  useEffect(() => {
    const handleHashOrPathChange = () => {
      const path = window.location.hash ? window.location.hash.replace('#', '') : window.location.pathname;
      setRoutePath(path);
    };

    window.addEventListener('popstate', handleHashOrPathChange);
    window.addEventListener('hashchange', handleHashOrPathChange);
    
    return () => {
      window.removeEventListener('popstate', handleHashOrPathChange);
      window.removeEventListener('hashchange', handleHashOrPathChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setRoutePath(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (name: string, price: string) => {
    setCartItems((prev) => [...prev, { name, price }]);
    alert(`تمت إضافة "${name}" إلى السلة بنجاح!`);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

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

    if (menuType === 'daily') {
      if (!newItemPrice) {
        alert('الرجاء إدخال السعر!');
        return;
      }
      const updatedMenu = [...dailyMenu];
      updatedMenu[selectedCategoryIndex].items.push({
        name: newItemName,
        price: newItemPrice,
        image: newItemImage
      });
      setDailyMenu(updatedMenu);
    } else {
      const updatedWedding = [...weddingMenu];
      updatedWedding[selectedCategoryIndex].items.push({
        name: newItemName,
        price: newItemPrice || "حسب الطلب",
        details: newItemDetails || "مخصص للمناسبات والأفراح"
      });
      setWeddingMenu(updatedWedding);
    }

    setNewItemName('');
    setNewItemPrice('');
    setNewItemDetails('');
    setNewItemImage('/png.jpeg');
    alert('تم إضافة الصنف بنجاح إلى المنيو المختار!');
  };

  const isExplicitAdminRoute = routePath.includes('/admin') || routePath === '/admin';

  return (
    <div className="min-h-screen bg-[#0C0B0A] text-[#F5F2EC] font-serif selection:bg-[#D4AF37] selection:text-black overflow-x-hidden w-full flex flex-col justify-between" dir="rtl">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-b from-[#D4AF37]/15 via-[#AA7C11]/5 to-transparent blur-[150px] pointer-events-none"></div>

      {isExplicitAdminRoute ? (
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
                  <label className="text-xs font-sans text-gray-300 block">اختر القسم</label>
                  <select 
                    value={selectedCategoryIndex} 
                    onChange={(e) => setSelectedCategoryIndex(Number(e.target.value))}
                    className="w-full bg-[#181513] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#D4AF37] font-bold text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    {menuType === 'daily' ? (
                      dailyMenu.map((sec, idx) => (
                        <option key={idx} value={idx} className="bg-[#181513] text-[#D4AF37] py-2">
                          {sec.category}
                        </option>
                      ))
                    ) : (
                      weddingMenu.map((sec, idx) => (
                        <option key={idx} value={idx} className="bg-[#181513] text-[#D4AF37] py-2">
                          {sec.category}
                        </option>
                      ))
                    )}
                  </select>
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
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-3.5 rounded-xl font-sans font-bold text-xs tracking-widest shadow-xl hover:opacity-90 transition-all mt-4"
                >
                  إضافة الصنف للمنيو فوراً
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <>
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
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black font-sans font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                      {cartItems.length}
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
                <button onClick={() => { navigateTo('/events'); setMobileMenuOpen(false); }} className={`text-right py-2 ${routePath === '/events' ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}`}>منيو الأفراح</button>
              </div>
            )}
          </header>

          <main className="pt-24 sm:pt-28 w-full overflow-hidden flex-grow">

            {(routePath === '/' || routePath === '') && (
              <div className="space-y-20 pb-20">
                {/* Hero Section */}
                <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/50 to-[#0C0B0A]/70 z-10"></div>
                    {heroImages.map((img, index) => (
                      <div
                        key={img}
                        className={`absolute inset-0 bg-cover bg-center transform scale-105 filter brightness-[0.7] transition-opacity duration-1000 ${
                          index === currentImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                        }`}
                        style={{ backgroundImage: `url('${img}')` }}
                      ></div>
                    ))}
                  </div>

                  <div className="relative z-20 max-w-4xl mx-auto space-y-6 sm:space-y-8 px-2">
                    <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#D4AF37] bg-[#1C1815] overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.7)] flex items-center justify-center">
                      <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-[#D4AF37]/50 text-[#D4AF37] text-[11px] sm:text-xs font-sans tracking-[0.2em] sm:tracking-[0.25em]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>عراقة المذاق وأصالة الضيافة السعودية</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#FFFDF9] leading-[1.3]">
                      أصالة الطبخ السعودي <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11]">ومن قدورنا تفوح أصالتنا</span>
                    </h2>

                    <p className="text-gray-300 text-xs sm:text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
                      نحن في مطعم "قدور الأجداد" نأخذك في رحلة فريدة لاستعادة طعم الأكل الأصيل المحضر على أصوله القديمة وبأعلى معايير الجودة الفاخرة لتشريف مناسباتكم.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
                      <button onClick={() => navigateTo('/daily')} className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA7C11] text-[#0C0B0A] px-7 sm:px-9 py-3.5 rounded-2xl text-xs font-sans font-bold tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2">
                        <Utensils className="w-4 h-4" /> تصفح المنيو اليومي
                      </button>
                      <button onClick={() => navigateTo('/events')} className="w-full sm:w-auto border border-[#D4AF37]/60 bg-black/40 hover:bg-[#D4AF37]/20 text-[#FFFDF9] px-7 sm:px-9 py-3.5 rounded-2xl text-xs font-sans font-bold tracking-widest transition-all flex items-center justify-center gap-2">
                        <CalendarHeart className="w-4 h-4 text-[#D4AF37]" /> منيو الأفراح والولائم
                      </button>
                    </div>
                  </div>
                </section>

                {/* Features / Why Us Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="text-center space-y-3 mb-12">
                    <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">تميزنا</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFDF9]">لماذا تختار قُدُور الأَجْدَاد؟</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
                        <ChefHat className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-bold text-[#FFFDF9]">وصفات الأجداد الأصلية</h4>
                      <p className="text-gray-400 text-xs font-sans leading-relaxed">
                        نحافظ على الوصفات التقليدية العريقة المطهوة ببطء في القدور النحاسية لضمان غنى النكهة والمذاق الأصيل.
                      </p>
                    </div>

                    <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
                        <Award className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-bold text-[#FFFDF9]">ذبائح بلدي طازجة</h4>
                      <p className="text-gray-400 text-xs font-sans leading-relaxed">
                        نختار أجود أنواع الذبائح البلدية بعناية فائقة لتليق بمقام ضيوفكم وأفراحكم الكبرى في جميع المناسبات.
                      </p>
                    </div>

                    <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
                        <HeartHandshake className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-bold text-[#FFFDF9]">ضيافة ملكية فاخرة</h4>
                      <p className="text-gray-400 text-xs font-sans leading-relaxed">
                        فريق متخصص لتجهيز ولائم الأفراح الكبرى والاجتماعات الرسمية بأعلى معايير الإتقان والفخامة.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Quick Highlights / Featured Dishes */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#181513]/50 to-transparent py-12 rounded-3xl border border-[#D4AF37]/10">
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4">
                    <div>
                      <span className="text-[#D4AF37] font-sans text-xs tracking-[0.2em] font-bold uppercase">من مختاراتنا</span>
                      <h3 className="text-2xl font-bold text-[#FFFDF9]">أطباق نالت إعجاب ضيوفنا</h3>
                    </div>
                    <button onClick={() => navigateTo('/daily')} className="text-[#D4AF37] text-xs font-sans font-bold hover:underline">
                      عرض المنيو كامل ←
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
                    {[
                      { name: "كابلي لحم بلدي", price: "78 ريال", img: "/png (2).jpeg" },
                      { name: "جريش حائلي بالسمن", price: "24 ريال", img: "/png.jpeg" },
                      { name: "سليق دجاج ملكي", price: "32 ريال", img: "/png (2).jpeg" },
                      { name: "مهلبية ورد", price: "18 ريال", img: "/appetizers.jpg" }
                    ].map((dish, i) => (
                      <div key={i} className="bg-[#181513] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-lg group">
                        <div className="h-36 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${dish.img}')` }}></div>
                        <div className="p-4 space-y-2">
                          <h4 className="text-white font-bold text-sm">{dish.name}</h4>
                          <div className="flex justify-between items-center">
                            <span className="text-[#D4AF37] font-sans font-bold text-xs">{dish.price}</span>
                            <button onClick={() => addToCart(dish.name, dish.price)} className="bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all">
                              أضف للسلة
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Testimonials */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
                  <div className="space-y-3">
                    <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">آراء العملاء</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFDF9]">ماذا يقول ضيوفنا عنا؟</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 text-right space-y-4">
                      <div className="flex text-[#D4AF37] gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm font-sans italic leading-relaxed">
                        "أخذنا منيو الأفراح لمناسبة زواج، صراحة الوليمة كانت تبيض الوجه والذبائح مستوية على أصولها والأرز مفلفل وطعم ولا أروع. شكراً قدور الأجداد."
                      </p>
                      <span className="text-[#D4AF37] text-xs font-sans font-bold block">- أبو تراب الرياضي</span>
                    </div>

                    <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 text-right space-y-4">
                      <div className="flex text-[#D4AF37] gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm font-sans italic leading-relaxed">
                        "الجريش والمرقوق عندهم يذكرونك بأكل الوالدة ربي يحفظها. المنيو اليومي ثابت عندي للغداء بشكل دائم. أنصح بالتعامل معهم بقوة."
                      </p>
                      <span className="text-[#D4AF37] text-xs font-sans font-bold block">- م. خالد الدوسري</span>
                    </div>
                  </div>
                </section>

              </div>
            )}

            {routePath === '/daily' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-fadeIn">
                <div className="text-center space-y-4">
                  <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">أطباق طازجة يومياً</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFDF9]">المنيو اليومي والشعبيات</h2>
                  <p className="text-gray-300 text-xs font-sans font-light">اطلب أطباقك المفضلة واستمتع بمذاق لا يُنسى</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {dailyMenu.map((section, idx) => (
                    <div key={idx} className="bg-gradient-to-b from-[#181513] via-[#12100E] to-[#0A0908] border border-[#D4AF37]/30 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 space-y-6 shadow-2xl">
                      <div className="h-40 sm:h-44 bg-cover bg-center rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${section.image}')` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-transparent to-transparent"></div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#FFFDF9]">{section.category}</h3>
                      <div className="space-y-3">
                        {section.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center justify-between bg-black/30 px-4 sm:px-5 py-3.5 rounded-xl border border-[#D4AF37]/10 gap-3">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0" />
                              )}
                              <div>
                                <span className="text-[#FFFDF9] font-medium text-xs sm:text-sm block">{item.name}</span>
                                <span className="text-[#D4AF37] font-sans font-bold text-xs">{item.price}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => addToCart(item.name, item.price)}
                              className="bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black px-3 sm:px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all border border-[#D4AF37]/40 shrink-0"
                            >
                              إضافة للسلة
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {routePath === '/events' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-fadeIn">
                <div className="text-center space-y-4">
                  <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">ولائم تشرف الضيوف</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFDF9]">قسم الأفراح والمناسبات الكبرى</h2>
                  <p className="text-gray-300 text-xs font-sans font-light">تجهيزات كاملة للذبائح، الولائم، والأفراح بأعلى معايير الفخامة</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {weddingMenu.map((section, idx) => (
                    <div key={idx} className="bg-gradient-to-b from-[#181513] via-[#12100E] to-[#0A0908] border border-[#D4AF37]/40 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 space-y-6 shadow-2xl">
                      <div className="h-44 sm:h-52 bg-cover bg-center rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${section.image}')` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-transparent to-transparent"></div>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#FFFDF9] mb-1">{section.category}</h3>
                        <p className="text-[#D4AF37]/80 text-xs font-sans italic">{section.description}</p>
                      </div>
                      <div className="space-y-3">
                        {section.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="bg-black/30 p-4 rounded-xl border border-[#D4AF37]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div>
                              <h4 className="text-[#FFFDF9] font-bold text-sm mb-1">{item.name}</h4>
                              <p className="text-gray-300 text-xs font-sans font-light leading-relaxed">{item.details}</p>
                            </div>
                            <button 
                              onClick={() => addToCart(item.name, item.price)}
                              className="bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black px-3 py-2 rounded-xl text-xs font-sans font-bold transition-all border border-[#D4AF37]/40 whitespace-nowrap self-end sm:self-center"
                            >
                              طلب استفسار
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {routePath === '/cart' && (
              <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-8 animate-fadeIn">
                <div className="text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[#D4AF37] mx-auto" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFDF9]">سلة الطلبات الخاصة بك</h2>
                  <p className="text-gray-400 text-xs font-sans">راجع الأطباق المختارة وأكد طلبك بكل سهولة</p>
                </div>

                {cartItems.length === 0 ? (
                  <div className="bg-[#181513] border border-[#D4AF37]/20 rounded-3xl p-8 sm:p-12 text-center space-y-4">
                    <p className="text-gray-400 text-sm font-sans">السلة فارغة حالياً..</p>
                    <button onClick={() => navigateTo('/daily')} className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl text-xs font-sans font-bold">
                      تصفح المنيو اليومي الآن
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-5 sm:p-6 space-y-6">
                    <div className="space-y-3">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-xl border border-[#D4AF37]/10 gap-2">
                          <div>
                            <span className="text-white font-medium text-xs sm:text-sm block">{item.name}</span>
                            <span className="text-[#D4AF37] font-sans font-bold text-xs">{item.price}</span>
                          </div>
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-red-400 hover:text-red-300 text-xs font-sans px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/20 shrink-0"
                          >
                            حذف
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-[#D4AF37]/20 flex justify-between items-center">
                      <span className="text-[#FFFDF9] font-bold text-sm">إجمالي الأصناف:</span>
                      <span className="text-[#D4AF37] font-sans font-bold text-base sm:text-lg">{cartItems.length} أصناف</span>
                    </div>
                    <button 
                      onClick={() => {
                        alert('تم إرسال طلبك بنجاح إلى المطعم، سنتواصل معك قريباً!');
                        setCartItems([]);
                      }} 
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-4 rounded-xl font-sans font-bold text-sm tracking-widest shadow-xl hover:opacity-90 transition-all"
                    >
                      تأكيد الطلب وإرساله
                    </button>
                  </div>
                )}
              </div>
            )}

          </main>

          {/* Footer Section (تم تعديل العنوان إلى الرياض) */}
          <footer className="bg-[#080706] border-t border-[#D4AF37]/30 pt-16 pb-8 px-4 sm:px-8 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#D4AF37]/20 text-right">
              
              {/* Column 1: Brand / About */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-[#1C1815] overflow-hidden flex items-center justify-center shrink-0">
                    <img src="/logo.png" alt="شعار" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#FFFDF9]">قُدُور الأَجْدَاد</h3>
                    <p className="text-[7px] font-sans tracking-[0.2em] text-[#D4AF37] uppercase">ROYAL HERITAGE</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs font-sans leading-relaxed">
                  الوجهة الأولى لتناول ألذ الأطباق السعودية الشعبية وتجهيز ولائم الأفراح الكبرى بأصولها العريقة ونكهاتها الفاخرة.
                </p>
              </div>

              {/* Column 2: Quick Links */}
              <div className="space-y-4">
                <h4 className="text-[#D4AF37] font-bold text-sm tracking-wider">روابط سريعة</h4>
                <ul className="space-y-2.5 text-xs font-sans text-gray-300">
                  <li><button onClick={() => navigateTo('/')} className="hover:text-[#D4AF37] transition-colors">الصفحة الرئيسية</button></li>
                  <li><button onClick={() => navigateTo('/daily')} className="hover:text-[#D4AF37] transition-colors">المنيو اليومي والشعبيات</button></li>
                  <li><button onClick={() => navigateTo('/events')} className="hover:text-[#D4AF37] transition-colors">قسم الأفراح والولائم</button></li>
                  <li><button onClick={() => navigateTo('/cart')} className="hover:text-[#D4AF37] transition-colors">سلة الطلبات</button></li>
                </ul>
              </div>

              {/* Column 3: Contact Info */}
              <div className="space-y-4">
                <h4 className="text-[#D4AF37] font-bold text-sm tracking-wider">تواصل معنا</h4>
                <div className="space-y-3 text-xs font-sans text-gray-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>المملكة العربية السعودية - الرياض</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span dir="ltr">+966 55 123 4567</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>info@qadur-alajdad.com</span>
                  </div>
                </div>
              </div>

              {/* Column 4: Working Hours */}
              <div className="space-y-4">
                <h4 className="text-[#D4AF37] font-bold text-sm tracking-wider">أوقات العمل</h4>
                <div className="space-y-3 text-xs font-sans text-gray-300">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">طوال أيام الأسبوع</p>
                      <p className="text-gray-400">من الساعة 11:00 صباحاً وحتى 12:00 منتصف الليل</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 rounded-lg text-[10px] font-bold">
                      مستعدون لتجهيز ولائم الأفراح على مدار الساعة
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[11px] font-sans gap-4">
              <p>جميع الحقوق محفوظة © 2026 مطعم قُدُور الأَجْدَاد (Royal Heritage)</p>
              <div className="flex gap-4">
                <span className="hover:text-[#D4AF37] cursor-pointer">سياسة الاستخدام</span>
                <span>•</span>
                <span className="hover:text-[#D4AF37] cursor-pointer">الشروط والأحكام</span>
              </div>
            </div>
          </footer>
        </>
      )}

    </div>
  );
}