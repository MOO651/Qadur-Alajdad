import { useState } from 'react';
import { LayoutDashboard, Trash2, Lock, Edit2, Upload } from 'lucide-react';
import { menuDishes } from '../data/menuData'; 

interface AdminProps {
  navigateTo: (path: string) => void;
}

export default function Admin({ navigateTo }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [dishes, setDishes] = useState(menuDishes);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });

  // دالة التعامل مع رفع الصور من اللابتوب أو الجوال
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") setIsAuthenticated(true);
    else alert("كلمة المرور غير صحيحة");
  };

  const addDish = () => {
    if (!formData.name || !formData.price) return alert("الرجاء إدخال الاسم والسعر");
    setDishes([...dishes, { ...formData, id: Date.now().toString() } as any]);
    setFormData({ name: '', price: '', description: '', image: '' });
  };

  const deleteDish = (id: string) => {
    setDishes(dishes.filter(d => d.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-[#181513] border border-[#D4AF37]/30 p-8 rounded-3xl w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <Lock className="w-10 h-10 text-[#D4AF37] mx-auto" />
            <h2 className="text-xl font-bold text-[#FFFDF9]">دخول الأدمن</h2>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل كلمة المرور"
            className="w-full bg-black border border-[#D4AF37]/30 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none"
          />
          <button className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-xl hover:bg-[#AA7C11] transition-all">
            دخول اللوحة
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#FFFDF9] flex items-center gap-2">
          <LayoutDashboard className="text-[#D4AF37]" /> لوحة تحكم المطعم
        </h2>
        <button onClick={() => navigateTo('home')} className="text-xs text-gray-400 hover:text-white">الخروج للموقع</button>
      </div>

      {/* نموذج إضافة صنف */}
      <div className="bg-[#181513] border border-[#D4AF37]/20 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-[#D4AF37]">إضافة صنف جديد</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم الطبق" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-black border border-[#D4AF37]/20 rounded-xl p-3 text-sm text-white" />
          <input type="number" placeholder="السعر" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="bg-black border border-[#D4AF37]/20 rounded-xl p-3 text-sm text-white" />
        </div>
        <textarea placeholder="وصف الطبق..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-[#D4AF37]/20 rounded-xl p-3 text-sm text-white h-20"></textarea>
        
        {/* زر رفع الصورة */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 bg-black border border-[#D4AF37]/20 p-3 rounded-xl cursor-pointer hover:border-[#D4AF37] transition">
            <Upload className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs text-gray-400">اختر صورة من الجهاز</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
          {formData.image && <img src={formData.image} className="w-12 h-12 rounded-lg object-cover" alt="preview" />}
        </div>
        
        <button onClick={addDish} className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-xl hover:bg-[#AA7C11] transition">
          إضافة الطبق للقائمة
        </button>
      </div>

      {/* قائمة الأطباق */}
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
              <div className="flex gap-2">
                <button className="text-blue-400"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => deleteDish(dish.id)} className="text-red-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}