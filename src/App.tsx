import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import DailyMenu from './pages/DailyMenu';
import EventsMenu from './pages/EventsMenu';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

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
  const [cartItems, setCartItems] = useState<{name: string, price: string}[]>([]);
  const [dailyMenu, setDailyMenu] = useState(initialDailyMenuSections);
  const [weddingMenu, setWeddingMenu] = useState(initialWeddingMenuSections);

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

  const addToCart = (name: string, price: string) => {
    setCartItems((prev) => [...prev, { name, price }]);
    alert(`تمت إضافة "${name}" إلى السلة بنجاح!`);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const isExplicitAdminRoute = routePath.includes('/admin') || routePath === '/admin';

  return (
    <div className="min-h-screen bg-[#0C0B0A] text-[#F5F2EC] font-serif selection:bg-[#D4AF37] selection:text-black overflow-x-hidden w-full flex flex-col justify-between" dir="rtl">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-b from-[#D4AF37]/15 via-[#AA7C11]/5 to-transparent blur-[150px] pointer-events-none"></div>

      {isExplicitAdminRoute ? (
        <Admin navigateTo={navigateTo} />
      ) : (
        <>
          <Header routePath={routePath} navigateTo={navigateTo} cartItemsCount={cartItems.length} />

          <main className="pt-24 sm:pt-28 w-full overflow-hidden flex-grow">
            {(routePath === '/' || routePath === '') && <Home navigateTo={navigateTo} addToCart={addToCart} />}
            {routePath === '/daily' && <DailyMenu dailyMenu={dailyMenu} addToCart={addToCart} />}
            {routePath === '/events' && <EventsMenu weddingMenu={weddingMenu} addToCart={addToCart} />}
            {routePath === '/cart' && (
              <Cart 
                cartItems={cartItems} 
                removeFromCart={removeFromCart} 
                navigateTo={navigateTo} 
                clearCart={() => setCartItems([])} 
              />
            )}
          </main>

          <Footer navigateTo={navigateTo} />
        </>
      )}
    </div>
  );
}