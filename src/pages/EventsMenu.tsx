import { CalendarHeart } from 'lucide-react';

interface EventsMenuProps {
  addToCart: (item: any) => void;
}

export default function EventsMenu({ addToCart }: EventsMenuProps) {
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

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#2c1e14] p-6" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center mb-8 bg-white py-10 px-4 rounded-3xl border border-[#d4af37]/30 shadow-sm">
          <span className="text-[#8c6239] text-xs font-bold tracking-widest uppercase mb-2 block bg-[#d4af37]/10 w-fit mx-auto px-4 py-1.5 rounded-full border border-[#d4af37]/30">المناسبات والولائم</span>
          <h1 className="text-3xl font-extrabold text-[#2c1e14] mb-2">🎉 مناسبات وأفراح</h1>
          <p className="text-[#6b5344] text-sm">ولائم وأطباق خاصة لحفلاتكم ومناسباتكم السعيدة</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weddingItems && weddingItems.length > 0 ? (
            weddingItems.map((dish) => (
              <div key={dish.id} className="bg-white p-6 rounded-3xl border border-[#d4af37]/30 flex flex-col justify-between shadow-sm hover:border-[#d4af37] transition-all">
                <div>
                  <h3 className="text-xl font-bold text-[#2c1e14] mb-2">{dish.name}</h3>
                  <p className="text-[#6b5344] text-sm mb-4 leading-relaxed">{dish.description}</p>
                  <span className="text-lg font-bold text-[#8c6239] font-sans">{dish.price} ريال</span>
                </div>
                
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#d4af37]/15">
                  <button 
                    onClick={() => addToCart(dish)}
                    className="w-full bg-[#d4af37] hover:bg-[#c49f27] text-white px-4 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 text-xs shadow-sm"
                  >
                    <CalendarHeart className="w-4 h-4" />
                    إضافة للطلب
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-[#6b5344] bg-white rounded-3xl border border-[#d4af37]/30 shadow-sm">
              <p className="text-lg">لا توجد ولائم أو مناسبات متاحة حالياً</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}