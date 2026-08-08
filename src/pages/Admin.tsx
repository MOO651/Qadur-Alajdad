import { useState } from 'react';
import { LayoutDashboard, Plus, Trash2, Save, Lock } from 'lucide-react';

interface AdminProps {
  navigateTo: (path: string) => void;
}

export default function Admin({ navigateTo }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // باسورد حماية بسيط للوحة التحكم
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") { // غيره للباسورد اللي تحبه
      setIsAuthenticated(true);
    } else {
      alert("كلمة المرور غير صحيحة");
    }
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
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#FFFDF9] flex items-center gap-2">
          <LayoutDashboard className="text-[#D4AF37]" /> لوحة تحكم المطعم
        </h2>
        <button onClick={() => navigateTo('home')} className="text-xs text-gray-400 hover:text-white">الخروج للموقع</button>
      </div>

      <div className="bg-[#181513] border border-[#D4AF37]/20 rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#D4AF37]">إضافة صنف جديد</h3>
          <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <Plus className="w-4 h-4" /> إضافة
          </button>
        </div>
        
        {/* نموذج مبسط */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم الطبق" className="bg-black border border-[#D4AF37]/20 rounded-xl p-3 text-sm text-white" />
          <input type="number" placeholder="السعر" className="bg-black border border-[#D4AF37]/20 rounded-xl p-3 text-sm text-white" />
        </div>
        <textarea placeholder="وصف الطبق..." className="w-full bg-black border border-[#D4AF37]/20 rounded-xl p-3 text-sm text-white h-24"></textarea>
      </div>

      <div className="bg-[#181513] border border-[#D4AF37]/20 rounded-3xl p-6">
        <h3 className="font-bold text-[#FFFDF9] mb-4">الأطباق الحالية</h3>
        <div className="space-y-4">
          {/* مثال لصف صنف */}
          <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">
            <div>
              <p className="text-white font-bold text-sm">المرقوق النجدي</p>
              <p className="text-[#D4AF37] text-xs">55 ريال</p>
            </div>
            <button className="text-red-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}