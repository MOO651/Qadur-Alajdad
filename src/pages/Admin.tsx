import { useState } from 'react';
import { Trash2, Lock, Edit2, Upload, Save } from 'lucide-react';
import { menuDishes } from '../data/menuData';

interface AdminProps {
  navigateTo: (path: string) => void;
}

export default function Admin({ navigateTo }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [dishes, setDishes] = useState(menuDishes);
  
  // حالة الطبق الحالي (للتعديل أو الإضافة)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const addOrUpdateDish = () => {
    if (!formData.name || !formData.price) return alert("الرجاء إدخال الاسم والسعر");

    if (editingId) {
      // وضع التعديل
      setDishes(dishes.map(d => d.id === editingId ? { ...d, ...formData } : d));
      setEditingId(null);
    } else {
      // وضع الإضافة
      setDishes([...dishes, { ...formData, id: Date.now().toString() } as any]);
    }
    setFormData({ name: '', price: '', description: '', image: '' });
  };

  const startEdit = (dish: any) => {
    setEditingId(dish.id);
    setFormData({ name: dish.name, price: dish.price, description: dish.description, image: dish.image });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteDish = (id: string) => {
    if (confirm("هل أنت متأكد من الحذف؟")) setDishes(dishes.filter(d => d.id !== id));
  };

  if (!isAuthenticated) {
     return (
       <div className="min-h-[60vh] flex items-center justify-center px-4" dir="rtl">
         <form onSubmit={(e) => { e.preventDefault(); if (password === "1234") setIsAuthenticated(true); else alert("كلمة المرور غير صحيحة"); }} className="bg-[#181513] border border-[#D4AF37]/30 p-8 rounded-3xl w-full max-w-sm space-y-6">
           <Lock className="w-10 h-10 text-[#D4AF37] mx-auto" />
           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل كلمة المرور" className="w-full bg-black border border-[#D4AF37]/30 rounded-xl p-3 text-white outline-none focus:border-[#D4AF37]" />
           <button className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-xl hover:bg-[#AA7C11] transition">دخول اللوحة</button>
         </form>
       </div>
     );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#FFFDF9]">لوحة تحكم المطعم</h2>
        <button onClick={() => navigateTo('home')} className="text-xs text-gray-400 hover:text-white">الخروج للموقع</button>
      </div>

      {/* النموذج */}
      <div className="bg-[#181513] border border-[#D4AF37]/20 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-[#D4AF37]">{editingId ? "تعديل صنف" : "إضافة صنف جديد"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم الطبق" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-black border border-[#D4AF37]/20 rounded-xl p-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
          <input type="number" placeholder="السعر" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="bg-black border border-[#D4AF37]/20 rounded-xl p-3 text-sm text-white outline-none focus:border-[#D4AF37]" />
        </div>
        <textarea placeholder="وصف الطبق..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-[#D4AF37]/20 rounded-xl p-3 text-sm text-white h-20 outline-none focus:border-[#D4AF37]"></textarea>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 bg-black border border-[#D4AF37]/20 p-3 rounded-xl cursor-pointer hover:border-[#D4AF37] transition">
            <Upload className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs text-gray-400">تغيير الصورة</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
          {formData.image && <img src={formData.image} className="w-12 h-12 rounded-lg object-cover" alt="preview" />}
        </div>
        
        <button onClick={addOrUpdateDish} className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-xl hover:bg-[#AA7C11] transition flex justify-center items-center gap-2">
          <Save className="w-4 h-4" /> {editingId ? "حفظ التعديلات" : "إضافة الطبق"}
        </button>
      </div>

      {/* القائمة */}
      <div className="bg-[#181513] border border-[#D4AF37]/20 rounded-3xl p-6">
        <h3 className="font-bold text-[#FFFDF9] mb-4">الأطباق الحالية</h3>
        <div className="space-y-4">
          {dishes.map((dish) => (
            <div key={dish.id} className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">
              <div className="flex items-center gap-3">
                {dish.image && <img src={dish.image} className="w-12 h-12 rounded-lg object-cover" alt={dish.name} />}
                <div>
                  <p className="text-white font-bold text-sm">{dish.name}</p>
                  <p className="text-[#D4AF37] text-xs">{dish.price} ريال</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => startEdit(dish)} className="text-blue-400 hover:text-blue-300"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => deleteDish(dish.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}