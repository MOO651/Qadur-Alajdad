import { useState, useEffect } from 'react';
import { Trash2, Lock, Edit2, Upload, Save, AlertCircle, ShoppingBag } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { subCategoriesMap, mainCategories } from '../data/menuData';

interface AdminProps {
  navigateTo: (path: string) => void;
}

export default function Admin({ navigateTo }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const { dishes, addDish, updateDish, deleteDish } = useMenu();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('restaurant_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const deleteOrder = (index: number) => {
    if (confirm("هل تريد حذف هذا الطلب من السجل؟")) {
      const updatedOrders = orders.filter((_, i) => i !== index);
      setOrders(updatedOrders);
      localStorage.setItem('restaurant_orders', JSON.stringify(updatedOrders));
    }
  };
  
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    image: '', 
    calories: '', 
    allergens: '',
    category: 'general',
    subCategory: 'all-general'
  });

  const handleCategoryChange = (newCat: string) => {
    const subCats = subCategoriesMap[newCat] || [];
    setFormData({
      ...formData,
      category: newCat,
      subCategory: subCats[0]?.id || ''
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDish = async () => {
    if (!formData.name || !formData.price) {
      alert("الرجاء إدخال الاسم والسعر على الأقل");
      return;
    }

    try {
      if (editingId) {
        await updateDish(editingId, formData);
        alert("تم تحديث الصنف بنجاح!");
        setEditingId(null);
      } else {
        await addDish(formData);
        alert("تم إضافة الصنف بنجاح!");
      }

      setFormData({ 
        name: '', 
        price: '', 
        description: '', 
        image: '', 
        calories: '', 
        allergens: '',
        category: 'general',
        subCategory: 'all-general'
      });
    } catch (err) {
      console.error("Error saving dish:", err);
      alert("حدث خطأ أثناء الحفظ، تأكد من الاتصال بقاعدة البيانات.");
    }
  };

  const startEdit = (dish: any) => {
    setEditingId(dish.id);
    setFormData({ 
      name: dish.name || '', 
      price: dish.price || '', 
      description: dish.description || '', 
      image: dish.image || '', 
      calories: dish.calories || '', 
      allergens: dish.allergens || '',
      category: dish.category || 'general',
      subCategory: dish.subCategory || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من الحذف؟")) {
      try {
        await deleteDish(id);
        alert("تم الحذف بنجاح!");
      } catch (err) {
        console.error("Error deleting dish:", err);
        alert("فشل حذف الصنف.");
      }
    }
  };

  if (!isAuthenticated) {
     return (
       <div className="min-h-[60vh] flex items-center justify-center px-4" dir="rtl">
         <form onSubmit={(e) => { e.preventDefault(); if (password === "1234") setIsAuthenticated(true); else alert("كلمة المرور غير صحيحة"); }} className="bg-obsidian-light border border-gold/30 p-8 rounded-3xl w-full max-w-sm space-y-6 shadow-2xl">
           <Lock className="w-10 h-10 text-gold mx-auto" />
           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل كلمة المرور" className="w-full bg-black border border-gold/30 rounded-xl p-3 text-white outline-none focus:border-gold" />
           <button className="w-full bg-gold text-obsidian font-bold py-3 rounded-xl hover:bg-gold-dark transition shadow-[0_0_20px_rgba(212,175,55,0.4)]">دخول اللوحة</button>
         </form>
       </div>
     );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#FFFDF9]">لوحة تحكم المطعم</h2>
        <button onClick={() => navigateTo('home')} className="text-xs text-gray-400 hover:text-white transition">الخروج للموقع</button>
      </div>

      {/* قسم الطلبات الواردة */}
      <div className="bg-obsidian-light border border-gold/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-3 border-b border-gold/20 pb-4">
          <ShoppingBag className="w-6 h-6 text-gold" />
          <h3 className="font-bold text-gold text-lg">الطلبات الواردة للعملاء ({orders.length})</h3>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-xs py-4 text-center">لا توجد طلبات جديدة حتى الآن.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-black/40 border border-gold/10 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/5 pb-2">
                  <span>طلب رقم: #{idx + 1}</span>
                  <span>التاريخ والوقت: {order.date}</span>
                  <button onClick={() => deleteOrder(idx)} className="text-red-400 hover:text-red-300 flex items-center gap-1 transition">
                    <Trash2 className="w-3.5 h-3.5" /> حذف الطلب
                  </button>
                </div>
                <div className="space-y-1">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm text-gray-200">
                      <span>- {item.name}</span>
                      <span className="text-gold font-sans">{item.price} ريال</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5 text-sm font-bold">
                  <span className="text-gray-300">الإجمالي الكلي:</span>
                  <span className="text-gold font-sans">{order.total} ريال</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* نموذج الإضافة والتعديل */}
      <div className="bg-obsidian-light border border-gold/20 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="font-bold text-gold">{editingId ? "تعديل صنف" : "إضافة صنف جديد"}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم الطبق" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-black border border-gold/20 rounded-xl p-3 text-sm text-white outline-none focus:border-gold" />
          <input type="text" placeholder="السعر" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="bg-black border border-gold/20 rounded-xl p-3 text-sm text-white outline-none focus:border-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs text-gray-400">القسم الرئيسي</label>
            <select 
              value={formData.category} 
              onChange={e => handleCategoryChange(e.target.value)} 
              className="w-full bg-black border border-gold/20 rounded-xl p-3 text-sm text-white outline-none focus:border-gold"
            >
              {mainCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs text-gray-400">القسم الفرعي</label>
            <select 
              value={formData.subCategory} 
              onChange={e => setFormData({...formData, subCategory: e.target.value})} 
              className="w-full bg-black border border-gold/20 rounded-xl p-3 text-sm text-white outline-none focus:border-gold"
            >
              {(subCategoriesMap[formData.category] || []).map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="السعرات الحرارية (مثال: 450 سعرة)" value={formData.calories} onChange={e => setFormData({...formData, calories: e.target.value})} className="bg-black border border-gold/20 rounded-xl p-3 text-sm text-white outline-none focus:border-gold" />
          
          <div className="space-y-2 bg-black/40 border border-gold/20 p-3 rounded-xl md:col-span-2">
            <label className="block text-xs text-gray-300 mb-2">مسببات الحساسية (اختر من القائمة أو اكتب بالأسفل):</label>
            <div className="flex flex-wrap gap-2">
              {['جلوتين', 'منتجات ألبان', 'مكسرات', 'سمسم', 'بيض', 'قشريات', 'كرفس'].map((allergen) => {
                const currentList = formData.allergens ? formData.allergens.split('، ').map((s: string) => s.trim()) : [];
                const isSelected = currentList.includes(allergen);

                return (
                  <button
                    type="button"
                    key={allergen}
                    onClick={() => {
                      let updated;
                      if (isSelected) {
                        updated = currentList.filter((item: string) => item !== allergen).join('، ');
                      } else {
                        updated = [...currentList, allergen].filter(Boolean).join('، ');
                      }
                      setFormData({ ...formData, allergens: updated });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs transition border ${
                      isSelected 
                        ? 'bg-gold text-obsidian border-gold font-bold' 
                        : 'bg-black text-gray-300 border-gold/20 hover:border-gold'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {allergen}
                  </button>
                );
              })}
            </div>
            <input 
              type="text" 
              placeholder="مسببات الحساسية (مثال: مكسرات، ألبان، جلوتين)" 
              value={formData.allergens} 
              onChange={e => setFormData({...formData, allergens: e.target.value})} 
              className="w-full mt-3 bg-black border border-gold/20 rounded-xl p-3 text-xs text-white outline-none focus:border-gold" 
            />
          </div>
        </div>

        <textarea placeholder="وصف الطبق..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-gold/20 rounded-xl p-3 text-sm text-white h-20 outline-none focus:border-gold"></textarea>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 bg-black border border-gold/20 p-3 rounded-xl cursor-pointer hover:border-gold transition">
            <Upload className="w-4 h-4 text-gold" />
            <span className="text-xs text-gray-400">تغيير الصورة</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
          {formData.image && <img src={formData.image} className="w-12 h-12 rounded-lg object-cover" alt="preview" />}
        </div>
        
        <button onClick={handleSaveDish} className="w-full bg-gold text-obsidian font-bold py-3 rounded-xl hover:bg-gold-dark transition flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
          <Save className="w-4 h-4" /> {editingId ? "حفظ التعديلات" : "إضافة الطبق"}
        </button>
      </div>

      {/* قائمة الأطباق */}
      <div className="bg-obsidian-light border border-gold/20 rounded-3xl p-6 shadow-xl">
        <h3 className="font-bold text-[#FFFDF9] mb-4">الأطباق الحالية</h3>
        <div className="space-y-4">
          {dishes.map((dish: any) => (
            <div key={dish.id} className="flex items-center justify-between border-b border-gold/10 pb-4">
              <div className="flex items-center gap-3">
                {dish.image && <img src={dish.image} className="w-12 h-12 rounded-lg object-cover" alt={dish.name} />}
                <div>
                  <p className="text-white font-bold text-sm">{dish.name}</p>
                  <p className="text-gold text-xs">{dish.price} ريال <span className="text-gray-500">({dish.category})</span></p>
                  {(dish.calories || dish.allergens) && (
                    <div className="flex gap-3 text-[11px] text-gray-400 mt-1">
                      {dish.calories && <span>🔥 {dish.calories}</span>}
                      {dish.allergens && <span className="text-amber-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> الحساسية: {dish.allergens}</span>}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => startEdit(dish)} className="text-blue-400 hover:text-blue-300 transition"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(dish.id)} className="text-red-400 hover:text-red-300 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}