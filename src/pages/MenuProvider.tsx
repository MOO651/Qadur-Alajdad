import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Dish } from '../data/menuData';
import { menuDishes } from '../data/menuData';
import { supabase } from '../supabaseClient';

interface MenuContextType {
  dishes: Dish[];
  addDish: (dish: any) => Promise<void>;
  updateDish: (id: string, updatedDish: any) => Promise<void>;
  deleteDish: (id: string) => Promise<void>;
}

const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [dishes, setDishes] = useState<Dish[]>(menuDishes);

  useEffect(() => {
    fetchDishes();

    const channel = supabase
      .channel('public:dishes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'dishes' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            setDishes((prev) => [...prev, payload.new as Dish]);
          } else if (payload.eventType === 'UPDATE') {
            setDishes((prev) =>
              prev.map((d) => (d.id === payload.new.id ? (payload.new as Dish) : d))
            );
          } else if (payload.eventType === 'DELETE') {
            setDishes((prev) => prev.filter((d) => d.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDishes = async () => {
    const { data, error } = await supabase.from('dishes').select('*');
    if (error) {
      console.error('Error fetching dishes:', error);
    } else if (data && data.length > 0) {
      setDishes(data as Dish[]);
    }
  };

  const addDish = async (dish: any) => {
    // التأكد من دعم الحقول المزدوجة (عربي وإنجليزي) عند الإضافة
    const formattedDish = {
      name: dish.name,
      name_en: dish.nameEn || dish.name,
      description: dish.description,
      description_en: dish.descriptionEn || dish.description,
      price: dish.price,
      category: dish.category,
      image: dish.image,
      ...dish
    };

    const { data, error } = await supabase.from('dishes').insert([formattedDish]).select();
    
    if (error) {
      console.error('Error adding dish to Supabase:', error);
      alert('فشل الحفظ في قاعدة البيانات: ' + error.message);
      throw error;
    } else if (data) {
      setDishes((prev) => [...prev, data[0] as Dish]);
    }
  };

  const updateDish = async (id: string, updatedData: any) => {
    const formattedUpdate = {
      ...updatedData,
      ...(updatedData.nameEn && { name_en: updatedData.nameEn }),
      ...(updatedData.descriptionEn && { description_en: updatedData.descriptionEn })
    };

    const { error } = await supabase
      .from('dishes')
      .update(formattedUpdate)
      .eq('id', id);

    if (error) {
      console.error('Error updating dish in Supabase:', error);
      alert('فشل التعديل في قاعدة البيانات: ' + error.message);
      throw error;
    } else {
      setDishes((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...updatedData } : d))
      );
    }
  };

  const deleteDish = async (id: string) => {
    const { error } = await supabase.from('dishes').delete().eq('id', id);

    if (error) {
      console.error('Error deleting dish from Supabase:', error);
      alert('فشل الحذف من قاعدة البيانات: ' + error.message);
      throw error;
    } else {
      setDishes((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <MenuContext.Provider value={{ dishes, addDish, updateDish, deleteDish }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};