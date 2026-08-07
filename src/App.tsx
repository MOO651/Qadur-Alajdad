import { useState, useEffect } from 'react';
import { Utensils, CalendarHeart, Sparkles, MapPin, ShoppingBag, ShieldCheck, Lock, LogOut } from 'lucide-react';

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
      { name: "عدس", price: "17 ريال" },
      { name: "حب", price: "19 ريال" },
      { name: "مقادم", price: "26 ريال" }
    ]
  },
  {
    category: "السلاطات والمقبلات الباردة",
    image: "/appetizers.jpg",
    items: [
      { name: "سلطة البر", price: "14 ريال" },
      { name: "فتوش", price: "16 ريال" },
      { name: "تبولة", price: "14 ريال" },
      { name: "جرجير شمندر", price: "13 ريال" },
      { name: "بامية رمان", price: "18 ريال" },
      { name: "سلطة لبن", price: "12 ريال" },
      { name: "سلطة أقط", price: "18 ريال" },
      { name: "حمص", price: "13 ريال" },
      { name: "متبل", price: "13 ريال" },
      { name: "كبيبة حائل", price: "23 ريال" }
    ]
  },
  {
    category: "المقبلات الحارة والمعجنات",
    image: "/appetizers.jpg",
    items: [
      { name: "سمبوسة لحم", price: "12 ريال" },
      { name: "سمبوسة دجاج", price: "12 ريال" },
      { name: "سمبوسة جبن", price: "9 ريال" },
      { name: "عيش أبو اللحم", price: "14 ريال" },
      { name: "فرموزة", price: "14 ريال" },
      { name: "بف حجازي", price: "12 ريال" },
      { name: "مطبق مالح", price: "12 ريال" },
      { name: "بطاطا حارة", price: "12 ريال" },
      { name: "بطاطس مقلى", price: "8 ريال" }
    ]
  },
  {
    category: "الإدامات",
    image: "/png.jpeg",
    items: [
      { name: "بامية", price: "16 ريال" },
      { name: "ملوخية", price: "14 ريال" },
      { name: "مسقعة", price: "16 ريال" },
      { name: "قرع", price: "14 ريال" }
    ]
  },
  {
    category: "الشعبيات والاطباق الجانبية",
    image: "/png.jpeg",
    items: [
      { name: "مرقوق", price: "24 ريال" },
      { name: "قرصان", price: "23 ريال" },
      { name: "جريش حائلي", price: "24 ريال" },
      { name: "جريش نجدي", price: "22 ريال" },
      { name: "مكرونة بشاميل", price: "21 ريال" }
    ]
  },
  {
    category: "الاطباق الرئيسية",
    image: "/png (2).jpeg",
    items: [
      { name: "سليق دجاج", price: "32 ريال" },
      { name: "زروبيان دجاج", price: "28 ريال" },
      { name: "برياني دجاج", price: "27 ريال" },
      { name: "مقلوبة دجاج", price: "31 ريال" },
      { name: "دجاج فحم", price: "24 ريال" },
      { name: "دجاج شواية", price: "24 ريال" },
      { name: "مشخول روبيان", price: "32 ريال" },
      { name: "مشخول لحم", price: "78 ريال" },
      { name: "كابلي لحم", price: "78 ريال" },
      { name: "مثلوثة دجاج", price: "34 ريال" },
      { name: "مثلوثة لحم", price: "86 ريال" }
    ]
  },
  {
    category: "الحلا",
    image: "/appetizers.jpg",
    items: [
      { name: "كريم كراميل", price: "17 ريال" },
      { name: "مهلبية ورد", price: "18 ريال" },
      { name: "ساكو", price: "15 ريال" },
      { name: "بسبوسة قشطة", price: "14 ريال" },
      { name: "كنافة قشطة", price: "14 ريال" },
      { name: "حنيني", price: "16 ريال" },
      { name: "لقيمات", price: "14 ريال" },
      { name: "مراصيع عسل", price: "14 ريال" }
    ]
  },
  {
    category: "المشروبات",
    image: "/png (3).jpeg",
    items: [
      { name: "كركديه ورد", price: "12 ريال" },
      { name: "ليمون نعناع", price: "15 ريال" },
      { name: "برتقال", price: "18 ريال" },
      { name: "بطيخ", price: "18 ريال" },
      { name: "لبن القرية", price: "5 ريال" },
      { name: "لبن اسم المطعم", price: "9 ريال" },
      { name: "مشروبات غازية", price: "5 ريال" }
    ]
  }
];

const weddingMenuSections = [
  {
    category: "الذبائح والذبائح المحشية",
    image: "/stuffed-lamb.jpg",
    description: "أجود أنواع الذبائح البلدية المحضرة لأفخم المناسبات",
    items: [
      { name: "الذبائح الشعبية", details: "شعبي، غوزي، مندي، عييلة، كابلي، زييان، بخاري، سليق، ومثلوثة." },
      { name: "الذبائح المحشية", details: "خروف مع المحاشي، محشي ورق عنب، محشي مكرونة، محشي بالفريك، محشي مسقعة، محشي كبيبة، ومحشي فقع." }
    ]
  },
  {
    category: "الأرزاز (الأرز الفاخر)",
    image: "/banquet.jpg",
    description: "تخضيرة أرز ملكية مفلفلة بأرقى البهارات",
    items: [
      { name: "تشكيلة الأرز", details: "المعمر، الصيادية، المشخول، الحساوي، المندي، الكليبي، الزييان، وبخاري." }
    ]
  },
  {
    category: "الشعبيات الأصيلة",
    image: "/png.jpeg",
    description: "طعم الأصالة العريقة المطهوة بالسمن البري",
    items: [
      { name: "الأطباق الشعبية", details: "المرقوق، الجريش (حائل، قصيمي، نجدي)، هريس حساوي، سليق مكاوي، مفلق حساوي، وقرصان." }
    ]
  },
  {
    category: "الإدامات والأصناف الرئيسية",
    image: "/png (2).jpeg",
    description: "نكهات أهل أول المميزة",
    items: [
      { name: "الأصناف المتفرقة", details: "قرع بلدي أهل أول، بامية أهل المدينة، مسقعة حجازية، كبسة، شعبي مكسرات، ريزتو، ومكرونة (مشروم، بشاميل، مرقوق، بيستو)." }
    ]
  },
  {
    category: "الأطباق الجانبية والمقبلات السخنة",
    image: "/appetizers.jpg",
    description: "أصناف متكاملة لتشريف ضيوفك",
    items: [
      { name: "الجانبيات", details: "لفائف الباذنجان، دجاج بالكريمة، صينية بطاطس بالأجبان، مراصيع منصلة، شيش برك، وداوود باشا." }
    ]
  },
  {
    category: "المحاشي والفتات الملكية",
    image: "/stuffed-lamb.jpg",
    description: "تشكيلة غنية ومميزة للمناسبات",
    items: [
      { name: "المحاشي", details: "محشي مشكلة، كوسة ورق عنب، كبيبة حائل، وملفوف." },
      { name: "الفتات", details: "فته ورق عنب، فته كبة، فته كوارع، وفته شاورما." }
    ]
  },
  {
    category: "الشوربات والمقبلات والسلطات",
    image: "/appetizers.jpg",
    description: "مقبلات طازجة ومنعشة تفتح النفس",
    items: [
      { name: "الشوربات", details: "كويكر، كوارع، عدس، وجريش." },
      { name: "المقبلات الباردة", details: "متبل سعودي، لبنة شمندر، متبل خضار، ورق عنب، حمص، وكبة." },
      { name: "السلطات المتنوعة", details: "جرجير بالقرع، رقائق الكوسة، بروكلي، جرجير أقط، جرجير شمندر، تبولة سعودية، متبل شمندر، سلطة فلافل، فتوش، تبولة باللبنة، تبولة، البحر الأحمر، يامية الذفة، رجله، حمام البر، الكينواه، سيزر، وزهرة." }
    ]
  },
  {
    category: "المعجنات والمخبوزات",
    image: "/banquet.jpg",
    description: "مخبوزات طازجة وساخنة يومياً",
    items: [
      { name: "المعجنات", details: "يغمش حجازي، عيش أبو اللحم، فرمزة حجازية، خلية نحل، سمبوسة، فطور، منتو، ومطبق (مالح - حلو)." }
    ]
  },
  {
    category: "الحلويات والمقشوش",
    image: "/appetizers.jpg",
    description: "مسك الختام لأفخم الولائم",
    items: [
      { name: "حلويات المناسبات", details: "مقشوش، حنيني، عريكة، حسية، كيكة، ساقو، أم علي زعفران، شعبرية الأولين، كريمة، قلاوة تمر، ميني سمبوسة، بسبوسة مكة، كنافة قشطة، باناكوتا، كنافة تمر، طرمية، ومراصيع." }
    ]
  },
  {
    category: "المشروبات المنعشة",
    image: "/png (3).jpeg",
    description: "تشكيلة من العصائر الطبيعية والمياه",
    items: [
      { name: "المشروبات", details: "ليمون حبق، برتقال، أناناس، مياه برين، مياه نوفا، مياه غازية، وتشكيلة من المشروبات الباردة." }
    ]
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'daily' | 'events' | 'cart' | 'booking' | 'admin'>('home');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartItems, setCartItems] = useState<{name: string, price: string}[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dailyMenu, setDailyMenu] = useState(initialDailyMenuSections);

  // حالات تسجيل دخول الأدمن
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const ADMIN_SECRET_CODE = "1234"; // تقدر تغيّر الرقم السري هنا لأي كلمة سر تبيها

  // حقول نموذج إضافة صنف للأدمن
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

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

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) {
      alert('الرجاء إدخال اسم الطبق والسعر!');
      return;
    }

    const updatedMenu = [...dailyMenu];
    updatedMenu[selectedCategoryIndex].items.push({
      name: newItemName,
      price: newItemPrice
    });

    setDailyMenu(updatedMenu);
    setNewItemName('');
    setNewItemPrice('');
    alert('تم إضافة الطبق بنجاح إلى المنيو اليومي!');
  };

  return (
    <div className="min-h-screen bg-[#0C0B0A] text-[#F5F2EC] font-serif selection:bg-[#D4AF37] selection:text-black overflow-x-hidden w-full" dir="rtl">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-b from-[#D4AF37]/15 via-[#AA7C11]/5 to-transparent blur-[150px] pointer-events-none"></div>

      {/* الهيدر المتجاوب */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0C0B0A]/95 backdrop-blur-3xl border-b border-[#D4AF37]/40 py-4 px-4 sm:px-8 md:px-16 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* الشعار */}
          <div onClick={() => setCurrentPage('home')} className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#D4AF37]/80 bg-[#1C1815] overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <img src="/logo.png" alt="شعار" className="w-full h-full object-cover" />
            </div>
            <div className="text-right">
              <h1 className="text-sm sm:text-lg font-bold tracking-[0.1em] sm:tracking-[0.15em] text-[#FFFDF9] leading-tight">قُدُور الأَجْدَاد</h1>
              <p className="text-[7px] sm:text-[8px] font-sans tracking-[0.2em] sm:tracking-[0.3em] text-[#D4AF37] uppercase">ROYAL HERITAGE</p>
            </div>
          </div>

          {/* التنقل لشاشات الديسكتوب */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-sans font-medium tracking-[0.2em] text-gray-200">
            <button onClick={() => setCurrentPage('home')} className={`transition-colors ${currentPage === 'home' ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'}`}>الرئيسية</button>
            <button onClick={() => setCurrentPage('daily')} className={`transition-colors flex items-center gap-1.5 ${currentPage === 'daily' ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'}`}>
              <Utensils className="w-3.5 h-3.5" /> المنيو اليومي
            </button>
            <button onClick={() => setCurrentPage('events')} className={`transition-colors flex items-center gap-1.5 ${currentPage === 'events' ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'}`}>
              <CalendarHeart className="w-3.5 h-3.5" /> منيو الأفراح
            </button>
            <button onClick={() => setCurrentPage('booking')} className={`transition-colors ${currentPage === 'booking' ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'}`}>حجز مأدبة</button>
            <button onClick={() => setCurrentPage('admin')} className={`transition-colors flex items-center gap-1 text-[#D4AF37] font-bold ${currentPage === 'admin' ? 'underline' : 'hover:opacity-80'}`}>
              <ShieldCheck className="w-4 h-4" /> لوحة التحكم
            </button>
          </nav>

          {/* زر السلة وقائمة الجوال */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentPage('cart')} 
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

        {/* القائمة المنسدلة لشاشات الجوال */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0C0B0A]/95 border-b border-[#D4AF37]/30 py-4 px-6 flex flex-col gap-4 text-xs font-sans">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className={`text-right py-2 ${currentPage === 'home' ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}`}>الرئيسية</button>
            <button onClick={() => { setCurrentPage('daily'); setMobileMenuOpen(false); }} className={`text-right py-2 ${currentPage === 'daily' ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}`}>المنيو اليومي</button>
            <button onClick={() => { setCurrentPage('events'); setMobileMenuOpen(false); }} className={`text-right py-2 ${currentPage === 'events' ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}`}>منيو الأفراح</button>
            <button onClick={() => { setCurrentPage('booking'); setMobileMenuOpen(false); }} className={`text-right py-2 ${currentPage === 'booking' ? 'text-[#D4AF37] font-bold' : 'text-gray-300'}`}>حجز مأدبة</button>
            <button onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }} className={`text-right py-2 text-[#D4AF37] font-bold`}>لوحة التحكم (الأدمن)</button>
          </div>
        )}
      </header>

      <main className="pt-24 sm:pt-28 w-full overflow-hidden">

        {currentPage === 'home' && (
          <div className="space-y-16 sm:space-y-24 pb-20">
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
                  <button onClick={() => setCurrentPage('daily')} className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#AA7C11] text-[#0C0B0A] px-7 sm:px-9 py-3.5 rounded-2xl text-xs font-sans font-bold tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2">
                    <Utensils className="w-4 h-4" /> تصفح المنيو اليومي
                  </button>
                  <button onClick={() => setCurrentPage('events')} className="w-full sm:w-auto border border-[#D4AF37]/60 bg-black/40 hover:bg-[#D4AF37]/20 text-[#FFFDF9] px-7 sm:px-9 py-3.5 rounded-2xl text-xs font-sans font-bold tracking-widest transition-all flex items-center justify-center gap-2">
                    <CalendarHeart className="w-4 h-4 text-[#D4AF37]" /> منيو الأفراح والولائم
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* المنيو اليومي */}
        {currentPage === 'daily' && (
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
                      <div key={itemIdx} className="flex items-center justify-between bg-black/30 px-4 sm:px-5 py-3.5 rounded-xl border border-[#D4AF37]/10 gap-2">
                        <div>
                          <span className="text-[#FFFDF9] font-medium text-xs sm:text-sm block">{item.name}</span>
                          <span className="text-[#D4AF37] font-sans font-bold text-xs">{item.price}</span>
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

        {/* منيو الأفراح */}
        {currentPage === 'events' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-fadeIn">
            <div className="text-center space-y-4">
              <span className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] font-bold uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block">ولائم تشرف الضيوف</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFDF9]">قسم الأفراح والمناسبات الكبرى</h2>
              <p className="text-gray-300 text-xs font-sans font-light">تجهيزات كاملة للذبائح، الولائم، والأفراح بأعلى معايير الفخامة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {weddingMenuSections.map((section, idx) => (
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
                          onClick={() => addToCart(item.name, "حسب الطلب")}
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

        {/* صفحة الأدمن المحمية */}
        {currentPage === 'admin' && (
          <div className="max-w-md mx-auto px-4 sm:px-6 py-20 space-y-8 animate-fadeIn">
            {!isAdminLoggedIn ? (
              <form onSubmit={handleAdminLogin} className="bg-[#181513] border border-[#D4AF37]/40 rounded-3xl p-8 space-y-6 shadow-2xl text-center">
                <Lock className="w-12 h-12 text-[#D4AF37] mx-auto" />
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#FFFDF9]">دخول لوحة التحكم</h2>
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
                    <label className="text-xs font-sans text-gray-300 block">اختر القسم في المنيو</label>
                    <select 
                      value={selectedCategoryIndex} 
                      onChange={(e) => setSelectedCategoryIndex(Number(e.target.value))}
                      className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      {dailyMenu.map((sec, idx) => (
                        <option key={idx} value={idx}>{sec.category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 text-right">
                    <label className="text-xs font-sans text-gray-300 block">اسم الطبق الجديد</label>
                    <input 
                      type="text" 
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="مثال: كبسة دجاج خاصة" 
                      className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#D4AF37]" 
                    />
                  </div>

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

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-3.5 rounded-xl font-sans font-bold text-xs tracking-widest shadow-xl hover:opacity-90 transition-all mt-4"
                  >
                    إضافة الطبق للمنيو فوراً
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* سلة الطلبات */}
        {currentPage === 'cart' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-8 animate-fadeIn">
            <div className="text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#D4AF37] mx-auto" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFDF9]">سلة الطلبات الخاصة بك</h2>
              <p className="text-gray-400 text-xs font-sans">راجع الأطباق المختارة وأكد طلبك بكل سهولة</p>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-[#181513] border border-[#D4AF37]/20 rounded-3xl p-8 sm:p-12 text-center space-y-4">
                <p className="text-gray-400 text-sm font-sans">السلة فارغة حالياً..</p>
                <button onClick={() => setCurrentPage('daily')} className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl text-xs font-sans font-bold">
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
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-4 rounded-xl font-sans font-bold text-xs sm:text-sm tracking-widest shadow-xl"
                >
                  تأكيد وإرسال الطلب
                </button>
              </div>
            )}
          </div>
        )}

        {/* حجز مأدبة */}
        {currentPage === 'booking' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-10 animate-fadeIn">
            <div className="text-center space-y-3">
              <CalendarHeart className="w-12 h-12 text-[#D4AF37] mx-auto" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFDF9]">حجز مأدبة أو طاولة</h2>
              <p className="text-gray-400 text-xs font-sans">املأ البيانات أدناه وسنقوم بتأكيد حجزك فوراً</p>
            </div>

            <div className="bg-[#181513] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-right">
                  <label className="text-xs font-sans text-gray-300">الاسم الكريم</label>
                  <input type="text" placeholder="أدخل اسمك الكامل" className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-xs font-sans text-gray-300">رقم الجوال</label>
                  <input type="text" placeholder="05xxxxxxxx" className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-xs font-sans text-gray-300">تاريخ الحجز</label>
                  <input type="date" className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="text-xs font-sans text-gray-300">نوع المناسبة / الطلب</label>
                  <input type="text" placeholder="مثال: غداء عمل، عشاء عائلي، ذبيحة مناسبة" className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>
              <button onClick={() => alert('تم استلام طلب حجزك بنجاح! نتشرف بزيارتك.')} className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-4 rounded-xl font-sans font-bold text-xs sm:text-sm tracking-widest shadow-xl">
                تأكيد الحجز الآن
              </button>
            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-[#D4AF37]/30 bg-[#080706] py-12 sm:py-16 px-4 sm:px-6 text-center space-y-4 font-sans relative z-20 mt-12">
        <p className="text-[#FFFDF9] font-serif font-bold tracking-[0.25em] sm:tracking-[0.35em] text-base sm:text-lg">قُدُور الأَجْدَاد</p>
        <p className="text-[#D4AF37] text-[11px] sm:text-xs tracking-wider flex items-center justify-center gap-2 flex-wrap">
          <MapPin className="w-4 h-4 text-[#D4AF37]" /> الرياض ✦ حي المونسية، طريق الثمامة، مجمع كريزي بلازا
        </p>
        <p className="text-gray-400 text-[10px] tracking-wider">جميع الحقوق محفوظة لمطعم قدور الأجداد © 2026</p>
      </footer>

    </div>
  );
}