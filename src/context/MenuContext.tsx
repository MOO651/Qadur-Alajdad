import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { menuDishes, type Dish } from '../data/menuData';

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
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [dailyMenu, setDailyMenu] = useState<any[]>([]);
  const [weddingMenu, setWeddingMenu] = useState<any[]>([]);
  // ابدأ بالداتا المحلية فوراً عشان المنيو يظهر على طول
  const [dishes, setDishes] = useState<Dish[]>(menuDishes);
  const [loading, setLoading] = useState<boolean>(false);

  // جلب الأطباق من Supabase في الخلفية (اختياري لو الجدول جاهز)
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const { data, error } = await supabase.from('dishes').select('*');
      if (error) throw error;
      // لو فيه داتا جاية من Supabase ابدلها، لو مفيش أو حصل خطأ هيفضل شغال بالداتا المحلية
      if (data && data.length > 0) {
        setDishes(data);
      }
    } catch (err) {
      console.error('Notice: Using local menuData as fallback', err);
    }
  };

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