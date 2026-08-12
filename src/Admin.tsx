import React, { useState } from 'react';

interface AdminProps {
  onAddDish: (category: string, name: string, price: string, image: string) => void;
  onClose: () => void;
}

export const Admin: React.FC<AdminProps> = ({ onAddDish, onClose }) => {
  const [category, setCategory] = useState('المشورات'); // أو حسب الأقسام عندك
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    
    // إرسال البيانات للـ App الرئيسي
    onAddDish(category, name, price, image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c');
    
    // تفريغ الحقول بعد الإضافة
    setName('');
    setPrice('');
    setImage('');
    alert('تم إضافة الطبق بنجاح للمنيو!');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md text-right shadow-2xl">
        
        {/* زر الخروج والـ Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
          <button
            onClick={onClose}
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition"
          >
            خروج 🚪
          </button>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            لوحة التحكم المعتمدة 🛡️
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* اختار القسم */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              اختر القسم في المنيو
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
            >
              <option value="المشورات">المشورات</option>
              <option value="الشوربات">الشوربات</option>
              <option value="الأطباق الرئيسية">الأطباق الرئيسية</option>
              <option value="المقبلات">المقبلات</option>
              <option value="المشروبات">المشروبات</option>
            </select>
          </div>

          {/* اسم الطبق الجديد */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              اسم الطبق الجديد
            </label>
            <input
              type="text"
              placeholder="مثال: كبسة دجاج خاصة"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
              required
            />
          </div>

          {/* السعر */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              السعر (مع العملة)
            </label>
            <input
              type="text"
              placeholder="مثال: 35 ريال"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
              required
            />
          </div>

          {/* رابط الصورة */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              رابط صورة الطبق (URL)
            </label>
            <input
              type="text"
              placeholder="حط رابط الصورة هنا (اختياري)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
            />
          </div>

          {/* زر الإضافة */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-bold py-3 rounded-lg transition shadow-lg"
          >
            إضافة الطبق للمنيو فوراً 🚀
          </button>
        </form>

      </div>
    </div>
  );
};