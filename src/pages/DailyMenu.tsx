import React from 'react';

// هذا هو الشكل الجديد للبطاقة
const MenuCard = ({ item, onAdd }: { item: any; onAdd: () => void }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg hover:border-amber-500/50 transition-all">
    <div className="w-full h-32 bg-zinc-800 rounded-xl mb-3 overflow-hidden">
      {/* هنا ستحط صورة كل صنف */}
      <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
    <p className="text-amber-500 font-semibold mb-3">{item.price}</p>
    <button 
      onClick={onAdd}
      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg transition-colors"
    >
      إضافة للسلة
    </button>
  </div>
);

export default function DailyMenu({ dailyMenu = [], addToCart }: any) {
  const items = dailyMenu.length > 0 ? dailyMenu : [
    { id: 1, name: 'سلطة جرجير', price: '13 ريال', image: '' },
    { id: 2, name: 'تبولة', price: '14 ريال', image: '' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl text-amber-500 font-bold mb-6 text-center">القائمة اليومية</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item: any) => (
          <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />
        ))}
      </div>
    </div>
  );
}