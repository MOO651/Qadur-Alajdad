import { useState } from 'react';

export default function Admin() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const addDish = () => {
    const newDish = { name, price, image };
    console.log("الطبق الجديد اللي عاوز تضيفه:", newDish);
    alert("تم تجهيز البيانات! افتح الـ Console في المتصفح عشان تشوف الكود اللي هتحطه في ملف البيانات.");
  };

  return (
    <div style={{ padding: '20px', direction: 'rtl', fontFamily: 'Arial' }}>
      <h1>لوحة تحكم قدور الأجداد</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input placeholder="اسم الطبق" onChange={(e) => setName(e.target.value)} />
        <input placeholder="السعر" onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="مسار الصورة (مثلاً /image.jpg)" onChange={(e) => setImage(e.target.value)} />
        <button onClick={addDish} style={{ backgroundColor: '#D4AF37', border: 'none', padding: '10px' }}>
          إضافة الطبق
        </button>
      </div>
    </div>
  );
}