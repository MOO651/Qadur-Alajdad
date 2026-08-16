import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { Dish } from '../data/menuData';
import { useLanguage } from './LanguageContext';

interface MenuContextType {
  dailyMenu: any[];
  weddingMenu: any[];
  dishes: Dish[];
  loading: boolean;
  addDish: (dish: any) => Promise<void>;
  updateDish: (id: string, updatedDish: any) => Promise<void>;
  deleteDish: (id: string) => Promise<void>;
  addMenuItem: (sectionIndex: number, item: any, type: 'daily' | 'wedding') => void;
  updateMenuItem: (sectionIndex: number, itemIndex: number, updatedItem: any, type: 'daily' | 'wedding') => void;
  deleteMenuItem: (sectionIndex: number, itemIndex: number, type: 'daily' | 'wedding') => void;
  refreshDishes: () => Promise<void>;
  formatText: (arText: string, enText: string) => string;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const [dailyMenu, setDailyMenu] = useState<any[]>([]);
  const [weddingMenu, setWeddingMenu] = useState<any[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // جلب الأطباق من Supabase عند التحميل
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('dishes').select('*');
      if (error) throw error;
      if (data) setDishes(data);
    } catch (err) {
      console.error('Error fetching dishes from Supabase:', err);
    } finally {
      setLoading(false);
    }
  };

  // إضافة طبق جديد لقاعدة البيانات
  const addDish = async (newDish: any) => {
    try {
      const { data, error } = await supabase.from('dishes').insert([newDish]).select();
      if (error) throw error;
      if (data && data.length > 0) {
        setDishes((prev) => [...prev, data[0]]);
      }
    } catch (err) {
      console.error('Error adding dish:', err);
      throw err;
    }
  };

  // تحديث طبق موجود في قاعدة البيانات
  const updateDish = async (id: string, updatedFields: any) => {
    try {
      const { error } = await supabase.from('dishes').update(updatedFields).eq('id', id);
      if (error) throw error;
      setDishes((prev) => prev.map((dish) => (dish.id === id ? { ...dish, ...updatedFields } : dish)));
    } catch (err) {
      console.error('Error updating dish:', err);
      throw err;
    }
  };

  // حذف طبق من قاعدة البيانات
  const deleteDish = async (id: string) => {
    try {
      const { error } = await supabase.from('dishes').delete().eq('id', id);
      if (error) throw error;
      setDishes((prev) => prev.filter((dish) => dish.id !== id));
    } catch (err) {
      console.error('Error deleting dish:', err);
      throw err;
    }
  };

  // دوال إدارة القوائم المحلية (اليومية والأفراح)
  const addMenuItem = (sectionIndex: number, item: any, type: 'daily' | 'wedding') => {
    if (type === 'daily') {
      const updated = [...dailyMenu];
      if (updated[sectionIndex]) {
        updated[sectionIndex].items.push(item);
        setDailyMenu(updated);
      }
    } else {
      const updated = [...weddingMenu];
      if (updated[sectionIndex]) {
        updated[sectionIndex].items.push(item);
        setWeddingMenu(updated);
      }
    }
  };

  const updateMenuItem = (sectionIndex: number, itemIndex: number, updatedItem: any, type: 'daily' | 'wedding') => {
    if (type === 'daily') {
      const updated = [...dailyMenu];
      if (updated[sectionIndex]?.items[itemIndex]) {
        updated[sectionIndex].items[itemIndex] = updatedItem;
        setDailyMenu(updated);
      }
    } else {
      const updated = [...weddingMenu];
      if (updated[sectionIndex]?.items[itemIndex]) {
        updated[sectionIndex].items[itemIndex] = updatedItem;
        setWeddingMenu(updated);
      }
    }
  };

  const deleteMenuItem = (sectionIndex: number, itemIndex: number, type: 'daily' | 'wedding') => {
    if (type === 'daily') {
      const updated = [...dailyMenu];
      if (updated[sectionIndex]) {
        updated[sectionIndex].items = updated[sectionIndex].items.filter((_: any, idx: number) => idx !== itemIndex);
        setDailyMenu(updated);
      }
    } else {
      const updated = [...weddingMenu];
      if (updated[sectionIndex]) {
        updated[sectionIndex].items = updated[sectionIndex].items.filter((_: any, idx: number) => idx !== itemIndex);
        setWeddingMenu(updated);
      }
    }
  };

  // دالة مساعدة لارجاع النص المناسب حسب اللغة الحالية للموقع
  const formatText = (arText: string, enText: string) => {
    return lang === 'en' ? (enText || arText) : arText;
  };

  return (
    <MenuContext.Provider
      value={{
        dailyMenu,
        weddingMenu,
        dishes,
        loading,
        addDish,
        updateDish,
        deleteDish,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        refreshDishes: fetchDishes,
        formatText,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}