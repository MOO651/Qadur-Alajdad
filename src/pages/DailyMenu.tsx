import React, { useState } from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface DailyMenuProps {
  dailyMenu?: MenuItem[];
  addToCart: (item: any) => void;
}

export default function DailyMenu({ dailyMenu = [], addToCart }: DailyMenuProps) {
  // عينات تجريبية افتراضية في حال كانت القائمة فارغة ليظهر التصميم بأفضل شكل
  const defaultItems: MenuItem[] = [
    {
      id: 1,
      name: 'كبسة لحم ضاني على اصولها',
      description: 'لحم طازج مطبوخ مع أجود أنواع البهارات السعودية والمعصورة على السمن البري والمكسرات',
      price: '65 ر.س',
      image: 'https://images.unsplash.com/photo-1545247389-dc3a897bfd44?w=500&auto=format&fit=crop&q=60',
      category: 'رئيسي'
    },
    {
      id: 2,
      name: 'جريش بالدجاج الفاخر',
      description: 'حب الجريش المطبوخ بعناية مع اللبن البلدي والبصل المكرمل ولمسة الليمون الأسود',
      price: '45 ر.س',
      image: 'https://images.unsplash.com/photo-1545247389-dc3a897bfd44?w=500&auto=format&fit=crop&q=60',
      category: 'شعبيات'
    },
    {
      id: 3,
      name: 'قرصان باللحم والخضار',
      description: 'رقاق القمح الرقيق مطبوخ بمرقة اللحم الغنية والخضار الطازجة على طريقة الأجداد',
      price: '50 ر.س',
      image: 'https://images.unsplash.com/photo-1545247389-dc3a897bfd44?w=500&auto=format&fit=crop&q=60',
      category: 'شعبيات'
    },
  ];

  const itemsToDisplay = dailyMenu.length > 0 ? dailyMenu : defaultItems;
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* عنوان الصفحة */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">منيو قدور الأجداد اليومي</h1>
        <p className="text-gray-400 text-sm md:text-base">أصالة الطعم الكويتي والسعودي الأصيل، مطبوخ بكل حب وعناية</p>
      </div>

      {/* شبكة الأطباق */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemsToDisplay.map((item) => (
          <div 
            key={item.id} 
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-black/70 text-amber-400 text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
                  {item.category || 'أطباقنا'}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between mt-auto">
              <span className="text-lg font-bold text-amber-400">{item.price}</span>
              <button 
                onClick={() => addToCart(item)}
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md active:scale-95"
              >
                إضافة للسلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}