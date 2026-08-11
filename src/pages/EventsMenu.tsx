import React from 'react';
import { CalendarHeart } from 'lucide-react';

interface EventsMenuProps {
  addToCart: (item: any) => void;
  // أضف أي Props إضافية هنا لو محتاجها مثل حالة الحجز
}

export default function EventsMenu({ addToCart }: EventsMenuProps) {
  // بيانات ولائم المناسبات والأفراح
  const weddingItems = [
    {
      id: 'w1',
      name: 'وليمة أفراح كبرى (خروف كامل)',
      price: 3500,
      description: 'مع الأرز البسمتي الفاخر والمكسرات والمقبلات والسلطات',
      image: ''
    },
    {
      id: 'w2',
      name: 'صينية مندي عائلية',
      price: 1200,
      description: 'تكفي حتى 8 أشخاص مع اللحم الطازج والمرق والدقوس',
      image: ''
    }
  ];

  const isBooked = false; // مثال لحالة الحجز

  return (
    <div className="min-h-screen bg-[#121212] text-[#FFFDF9] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">🎉 مناسبات وأفراح</h1>
          <p className="text-gray-400">ولائم وأطباق خاصة لحفلاتكم ومناسباتكم السعيدة</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weddingItems && weddingItems.length > 0 ? (
            weddingItems.map((dish) => (
              <div key={dish.id} className="bg-[#181513] p-5 rounded-2xl border border-[#D4AF37]/20 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-2">{dish.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{dish.description}</p>
                  <span className="text-lg font-semibold text-white">{dish.price} ريال</span>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <button 
                    onClick={() => addToCart(dish)}
                    className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-bold hover:bg-[#c29b30] transition flex items-center gap-2"
                  >
                    <CalendarHeart className="w-4 h-4" />
                    إضافة للطلب
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400">
              <p className="text-lg">لا توجد ولائم أو مناسبات متاحة حالياً</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}