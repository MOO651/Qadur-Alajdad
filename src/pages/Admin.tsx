import { useState, useEffect } from 'react';
import { Trash2, Lock, Edit2, Upload, Save, AlertCircle, ShoppingBag, CheckCircle2, Clock, Globe } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { subCategoriesMap, mainCategories, allergenLabels } from '../data/menuData';

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

  const updateOrderStatus = (index: number, newStatus: string) => {
    const updatedOrders = orders.map((order, i) => {
      if (i === index) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('restaurant_orders', JSON.stringify(updatedOrders));
  };

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
    nameEn: '',
    price: '', 
    description: '', 
    descriptionEn: '',
    image: '', 
    calories: '', 
    allergens: [] as string[],
    category: 'main',
    subCategory: 'rice-meat'
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
        alert("تم تحديث الصنف بنجاح وربطه بقاعدة البيانات!");
        setEditingId(null);
      } else {
        await addDish(formData);
        alert("تم إضافة الصنف بنجاح وربطه بقاعدة البيانات!");
      }

      setFormData({ 
        name: '', 
        nameEn: '',
        price: '', 
        description: '', 
        descriptionEn: '',
        image: '', 
        calories: '', 
        allergens: [],
        category: 'main',
        subCategory: 'rice-meat'
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
      nameEn: dish.name_en || dish.nameEn || '',
      price: dish.price || '', 
      description: dish.description || '', 
      descriptionEn: dish.description_en || dish.descriptionEn || '',
      image: dish.image || '', 
      calories: dish.calories || '', 
      allergens: Array.isArray(dish.allergens) ? dish.allergens : [],
      category: dish.category || 'main',
      subCategory: dish.subCategory || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من الحذف النهائي من قاعدة البيانات؟")) {
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
       <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#f5f1ea]" dir="rtl">
         <form onSubmit={(e) => { e.preventDefault(); if (password === "1234") setIsAuthenticated(true); else alert("كلمة المرور غير صحيحة"); }} className="bg-white border border-[#d4af37]/30 p-8 rounded-3xl w-full max-w-sm space-y-6 shadow-2xl">
           <Lock className="w-10 h-10 text-[#d4af37] mx-auto" />
           <div className="text-center">
             <h2 className="text-xl font-bold text-[#2c1e14]">لوحة التحكم الآمنة</h2>
             <p className="text-xs text-gray-500 mt-1">الرجاء إدخال كلمة المرور للمتابعة</p>
           </div>
           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل كلمة المرور" className="w-full bg-[#f5f1ea] border border-[#d4af37]/30 rounded-xl p-3 text-[#2c1e14] outline-none focus:border-[#d4af37]" />
           <button className="w-full bg-[#d4af37] text-white font-bold py-3 rounded-xl hover:bg-[#c49f27] transition shadow-md">دخول اللوحة</button>
         </form>
       </div>
     );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8 bg-[#f5f1ea] min-h-screen text-[#2c1e14]" dir="rtl">
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-[#d4af37]/30 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-[#2c1e14]">لوحة تحكم قُدُور الأَجْدَاد</h2>
          <p className="text-xs text-gray-500 mt-0.5">إدارة الأطباق، المنيو، وقاعدة بيانات الطلبات بـ Supabase و LocalStorage</p>
        </div>
        <button onClick={() => navigateTo('home')} className="bg-[#f5f1ea] border border-[#d4af37]/40 px-4 py-2 rounded-xl text-xs font-bold text-[#8c6239] hover:bg-[#d4af37] hover:text-white transition">الخروج للموقع</button>
      </div>

      {/* قسم الطلبات الواردة */}
      <div className="bg-white border border-[#d4af37]/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#8c6239]" />
            <h3 className="font-bold text-[#8c6239] text-lg">الطلبات الواردة للعملاء ({orders.length})</h3>
          </div>
          <span className="text-xs bg-[#d4af37]/10 text-[#8c6239] px-3 py-1 rounded-full font-bold border border-[#d4af37]/20">مربوط بـ LocalStorage</span>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-400 text-xs py-8 text-center">لا توجد طلبات جديدة حتى الآن.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-[#f5f1ea] border border-[#d4af37]/20 p-5 rounded-2xl space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-600 border-b border-[#d4af37]/15 pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#2c1e14]">طلب رقم: #{idx + 1}</span>
                    <span className="flex items-center gap-1 text-gray-500"><Clock className="w-3.5 h-3.5" /> {order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={order.status || 'قيد المعالجة'}
                      onChange={(e) => updateOrderStatus(idx, e.target.value)}
                      className="bg-white border border-[#d4af37]/30 rounded-lg px-2.5 py-1 text-xs font-bold text-[#2c1e14] outline-none"
                    >
                      <option value="قيد المعالجة">⏳ قيد المعالجة</option>
                      <option value="جاري التجهيز">👨‍🍳 جاري التجهيز</option>
                      <option value="تم التوصيل">✅ تم التوصيل</option>
                    </select>
                    <button onClick={() => deleteOrder(idx)} className="text-red-600 hover:text-red-700 flex items-center gap-1 font-bold transition">
                      <Trash2 className="w-3.5 h-3.5" /> حذف
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-700">تفاصيل العميل:</p>
                  <div className="bg-white p-3 rounded-xl border border-[#d4af37]/15 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div><span className="text-gray-400">الاسم:</span> <strong className="text-[#2c1e14]">{order.customerName || 'غير متوفر'}</strong></div>
                    <div><span className="text-gray-400">الجوال:</span> <strong className="text-[#2c1e14]">{order.phone || 'غير متوفر'}</strong></div>
                    <div><span className="text-gray-400">العنوان:</span> <strong className="text-[#2c1e14]">{order.address || 'غير متوفر'}</strong></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-gray-700">الأطباق المطلوبة:</p>
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-sm text-[#2c1e14] bg-white/60 px-3 py-1.5 rounded-lg">
                      <span>• {item.name} {item.quantity ? `(×${item.quantity})` : ''}</span>
                      <span className="text-[#8c6239] font-sans font-bold">{item.price} ريال</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#d4af37]/15 text-sm font-bold">
                  <span className="text-[#2c1e14]">الإجمالي الكلي:</span>
                  <span className="text-[#8c6239] font-sans text-base">{order.total} ريال</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* نموذج الإضافة والتعديل المربوط بـ Supabase */}
      <div className="bg-white border border-[#d4af37]/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
          <h3 className="font-bold text-[#8c6239] text-lg">{editingId ? "تعديل صنف حالي" : "إضافة صنف جديد لقاعدة البيانات (Supabase)"}</h3>
          {editingId && (
            <button 
              onClick={() => { setEditingId(null); setFormData({ name: '', nameEn: '', price: '', description: '', descriptionEn: '', image: '', calories: '', allergens: [], category: 'main', subCategory: 'rice-meat' }); }}
              className="text-xs text-red-600 font-bold hover:underline"
            >
              إلغاء التعديل
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">اسم الطبق بالعربي *</label>
            <input type="text" placeholder="مثال: مندي لحم بلدي" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#f5f1ea] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#2c1e14] outline-none focus:border-[#d4af37]" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700 flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> اسم الطبق بالإنجليزي (English)</label>
            <input type="text" placeholder="e.g. Local Meat Mandi" value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="w-full bg-[#f5f1ea] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#2c1e14] outline-none focus:border-[#d4af37]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">السعر (ريال) *</label>
            <input type="text" placeholder="مثال: 95" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#f5f1ea] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#2c1e14] outline-none focus:border-[#d4af37]" />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">السعرات الحرارية</label>
            <input type="text" placeholder="مثال: 650 سعرة حرارية" value={formData.calories} onChange={e => setFormData({...formData, calories: e.target.value})} className="w-full bg-[#f5f1ea] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#2c1e14] outline-none focus:border-[#d4af37]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">القسم الرئيسي</label>
            <select 
              value={formData.category} 
              onChange={e => handleCategoryChange(e.target.value)} 
              className="w-full bg-[#f5f1ea] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#2c1e14] outline-none focus:border-[#d4af37]"
            >
              {mainCategories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">القسم الفرعي</label>
            <select 
              value={formData.subCategory} 
              onChange={e => setFormData({...formData, subCategory: e.target.value})} 
              className="w-full bg-[#f5f1ea] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#2c1e14] outline-none focus:border-[#d4af37]"
            >
              {(subCategoriesMap[formData.category] || []).map((sub: any) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2 bg-[#f5f1ea] border border-[#d4af37]/30 p-4 rounded-2xl">
          <label className="block text-xs font-bold text-gray-700 mb-2">مسببات الحساسية المعتمدة:</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(allergenLabels).map(([key, labelObj]) => {
              const isSelected = formData.allergens.includes(key);

              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => {
                    let updated;
                    if (isSelected) {
                      updated = formData.allergens.filter((item) => item !== key);
                    } else {
                      updated = [...formData.allergens, key];
                    }
                    setFormData({ ...formData, allergens: updated });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs transition border flex items-center gap-1.5 ${
                    isSelected 
                      ? 'bg-[#d4af37] text-white border-[#d4af37] font-bold shadow-sm' 
                      : 'bg-white text-gray-700 border-[#d4af37]/30 hover:border-[#d4af37]'
                  }`}
                >
                  <span>{labelObj.icon}</span>
                  <span>{labelObj.name}</span>
                  <span className="text-[10px]">{isSelected ? '✓' : '+'}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">وصف الطبق بالعربي</label>
            <textarea placeholder="وصف تفصيلي لمكونات الطبق وطريقة طهيه..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#f5f1ea] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#2c1e14] h-24 outline-none focus:border-[#d4af37]"></textarea>
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700">وصف الطبق بالإنجليزية (English Description)</label>
            <textarea placeholder="Detailed description of the dish..." value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} className="w-full bg-[#f5f1ea] border border-[#d4af37]/30 rounded-xl p-3 text-sm text-[#2c1e14] h-24 outline-none focus:border-[#d4af37]"></textarea>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#f5f1ea] p-4 rounded-2xl border border-[#d4af37]/30">
          <label className="flex items-center gap-2 bg-white border border-[#d4af37]/40 px-4 py-3 rounded-xl cursor-pointer hover:border-[#d4af37] transition shadow-sm w-full sm:w-auto justify-center">
            <Upload className="w-4 h-4 text-[#8c6239]" />
            <span className="text-xs font-bold text-gray-700">رفع صورة الطبق</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
          {formData.image && (
            <div className="flex items-center gap-3">
              <img src={formData.image} className="w-14 h-14 rounded-xl object-cover border border-[#d4af37]" alt="preview" />
              <span className="text-xs text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> تم رفع الصورة بنجاح</span>
            </div>
          )}
        </div>
        
        <button onClick={handleSaveDish} className="w-full bg-[#d4af37] text-white font-bold py-3.5 rounded-2xl hover:bg-[#c49f27] transition flex justify-center items-center gap-2 shadow-lg text-base">
          <Save className="w-5 h-5" /> {editingId ? "حفظ التعديلات في قاعدة البيانات" : "حفظ وإضافة الطبق لقاعدة البيانات"}
        </button>
      </div>

      {/* قائمة الأطباق المرتبطة بـ Supabase */}
      <div className="bg-white border border-[#d4af37]/30 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
          <h3 className="font-bold text-[#2c1e14] text-lg">الأطباق الحالية المربوطة بـ Supabase ({dishes.length})</h3>
          <span className="text-xs text-gray-500 font-sans">تحديث لحظي (Realtime Sync)</span>
        </div>

        <div className="space-y-3">
          {dishes.map((dish: any) => (
            <div key={dish.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#d4af37]/20 bg-[#f5f1ea] p-4 rounded-2xl gap-4 hover:border-[#d4af37] transition">
              <div className="flex items-center gap-4">
                {dish.image && <img src={dish.image} className="w-16 h-16 rounded-xl object-cover border border-[#d4af37]/30 shadow-sm" alt={dish.name} />}
                <div className="space-y-1">
                  <p className="text-[#2c1e14] font-bold text-base">{dish.name} {dish.name_en ? <span className="text-gray-500 font-normal text-xs">({dish.name_en})</span> : ''}</p>
                  <p className="text-[#8c6239] text-xs font-bold font-sans">{dish.price} ريال <span className="text-gray-500 font-normal">({dish.category})</span></p>
                  {(dish.calories || (dish.allergens && dish.allergens.length > 0)) && (
                    <div className="flex flex-wrap gap-3 text-[11px] text-gray-600 items-center">
                      {dish.calories && <span>🔥 {dish.calories}</span>}
                      {dish.allergens && dish.allergens.length > 0 && (
                        <span className="text-[#8c6239] flex items-center gap-1 font-bold">
                          <AlertCircle className="w-3.5 h-3.5" /> الحساسية: 
                          {dish.allergens.map((k: string) => allergenLabels[k]?.name).filter(Boolean).join(', ')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button onClick={() => startEdit(dish)} className="bg-white border border-blue-300 text-blue-600 px-3 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition flex items-center gap-1 text-xs font-bold shadow-sm">
                  <Edit2 className="w-3.5 h-3.5" /> تعديل
                </button>
                <button onClick={() => handleDelete(dish.id)} className="bg-white border border-red-300 text-red-600 px-3 py-2 rounded-xl hover:bg-red-600 hover:text-white transition flex items-center gap-1 text-xs font-bold shadow-sm">
                  <Trash2 className="w-3.5 h-3.5" /> حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}