import { useState } from 'react';
import { 
  Utensils, 
  Salad, 
  Soup, 
  Cake, 
  Flame, 
  Layers, 
  Wheat, 
  Fish, 
  ChefHat,
  Plus,
  Image as ImageIcon 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EventsMenuProps {
  addToCart: (item: any) => void;
}

interface MenuItem {
  ar: string;
  en: string;
  image?: string;
}

interface MenuCategory {
  title: string;
  titleEn: string;
  icon: any;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    title: 'السلطات',
    titleEn: 'Salads',
    icon: Salad,
    items: [
      { ar: 'سلطة سعودية', en: 'Saudi Salad', image: '' },
      { ar: 'سلطة جرجير وشمندر', en: 'Arugula & Beetroot Salad', image: '' },
      { ar: 'سلطة جرجير ولحم ناشف', en: 'Arugula & Dried Meat Salad', image: '' },
      { ar: 'سلطة فتوش قدور الأجداد', en: 'Ancestors Pot Fattoush Salad', image: '' },
      { ar: 'بامية ناشفة', en: 'Dried Okra Salad', image: '' },
      { ar: 'سلطة شاورما', en: 'Shawarma Salad', image: '' },
      { ar: 'سلطة رقاق الكوسة المشوية', en: 'Grilled Zucchini Sheets Salad', image: '' },
      { ar: 'تبولة قدور الأجداد', en: 'Ancestors Pot Tabbouleh', image: '' },
      { ar: 'سلطة البامية مع اللبنة', en: 'Okra with Labneh Salad', image: '' },
      { ar: 'سلطة البحر الأحمر', en: 'Red Sea Salad', image: '' },
      { ar: 'سلطة الكرنب والماش', en: 'Cabbage & Mung Bean Salad', image: '' },
      { ar: 'سلطة الطبقات', en: 'Layered Salad', image: '' },
      { ar: 'سلطة حمام البر', en: 'Wild Pigeon Salad', image: '' },
      { ar: 'سلطة الجرجير بالقرع والمكسرات ورقائق الكوسة', en: 'Arugula Salad with Pumpkin, Nuts & Zucchini Chips', image: '' },
      { ar: 'سلطة الفلافل', en: 'Falafel Salad', image: '' },
      { ar: 'سلطة التبولة بالبنجر', en: 'Beetroot Tabbouleh', image: '' },
      { ar: 'سلطة الكرنب الملونة بالدجاج المشوي', en: 'Colorful Cabbage Salad with Grilled Chicken', image: '' },
      { ar: 'سلطة متبل الشمندر', en: 'Beetroot Mutabal Salad', image: '' },
      { ar: 'سلطة نجد', en: 'Najd Salad', image: '' },
      { ar: 'سلطة الرمان باللبنة', en: 'Pomegranate & Labneh Salad', image: '' },
      { ar: 'سلطة الكينوا', en: 'Quinoa Salad', image: '' },
      { ar: 'سلطة سيزر', en: 'Caesar Salad', image: '' }
    ]
  },
  {
    title: 'المقبلات',
    titleEn: 'Appetizers',
    icon: Utensils,
    items: [
      { ar: 'حمص بلحم الحميس', en: 'Hummus with Hamees Meat', image: '' },
      { ar: 'حمص', en: 'Hummus', image: '' },
      { ar: 'حمص حبق مديني', en: 'Medini Habak Hummus', image: '' },
      { ar: 'لبنة الشمندر مع اللحم', en: 'Beetroot Labneh with Meat', image: '' },
      { ar: 'متبل', en: 'Mutabal', image: '' },
      { ar: 'حراق إصبع', en: 'Harraq Osbao', image: '' },
      { ar: 'كباب السبانخ المديني', en: 'Medini Spinach Kebab', image: '' },
      { ar: 'ورق عنب', en: 'Stuffed Vine Leaves', image: '' },
      { ar: 'بابا غنوج', en: 'Baba Ghanoush', image: '' },
      { ar: 'لبنة مع البصل والثوم', en: 'Labneh with Onion & Garlic', image: '' },
      { ar: 'متبل سعودي', en: 'Saudi Mutabal', image: '' },
      { ar: 'متبل خضار', en: 'Vegetable Mutabal', image: '' },
      { ar: 'مقليات', en: 'Fried Appetizers', image: '' },
      { ar: 'كبة بطاطس', en: 'Potato Kibbeh', image: '' },
      { ar: 'كبة شبت', en: 'Dill Kibbeh', image: '' },
      { ar: 'كبة شمندر', en: 'Beetroot Kibbeh', image: '' },
      { ar: 'كبة محشية بالجبن والمكسرات', en: 'Kibbeh Stuffed with Cheese & Nuts', image: '' }
    ]
  },
  {
    title: 'المعجنات والمخبوزات',
    titleEn: 'Pastries & Breads',
    icon: Wheat,
    items: [
      { ar: 'سمبوسك دجاج', en: 'Chicken Sambusa', image: '' },
      { ar: 'سمبوسك لحم', en: 'Meat Sambusa', image: '' },
      { ar: 'سمبوسك جبن', en: 'Cheese Sambusa', image: '' },
      { ar: 'سمبوسك عدس', en: 'Lentil Sambusa', image: '' },
      { ar: 'سمبوسك خضار', en: 'Vegetable Sambusa', image: '' },
      { ar: 'منتو', en: 'Mantu', image: '' },
      { ar: 'فطائر بالزيتون', en: 'Olive Pastries', image: '' },
      { ar: 'بف حجازي', en: 'Hijazi Puff', image: '' },
      { ar: 'يغمش حجازي', en: 'Hijazi Yaghmish', image: '' },
      { ar: 'فرموزة حجازية', en: 'Hijazi Formosa', image: '' },
      { ar: 'عيش أبو اللحم حجازي', en: 'Hijazi Aish Abu Al-Lahm', image: '' },
      { ar: 'كبة حجازية', en: 'Hijazi Kibbeh', image: '' },
      { ar: 'فطائر بالسبانخ', en: 'Spinach Pastries', image: '' },
      { ar: 'خلية النحل', en: 'Beehive Pastry', image: '' },
      { ar: 'رول المندي', en: 'Mandi Roll', image: '' },
      { ar: 'مطبق مالح (جبن - لحم)', en: 'Salty Mutabbaq (Cheese - Meat)', image: '' },
      { ar: 'تاكو', en: 'Tacos', image: '' },
      { ar: 'مراصيع مبصل', en: 'Onion Maraseea', image: '' },
      { ar: 'خبز التمر الحساوي', en: 'Hasa Date Bread', image: '' },
      { ar: 'خبز التنور', en: 'Tanoor Bread', image: '' },
      { ar: 'خبز شريك', en: 'Shareek Bread', image: '' },
      { ar: 'شابورة قدور الأجداد', en: 'Ancestors Pot Rusks', image: '' }
    ]
  },
  {
    title: 'الشوربات والفتات',
    titleEn: 'Soups & Fattah',
    icon: Soup,
    items: [
      { ar: 'شوربة كوارع', en: 'Trotters Soup', image: '' },
      { ar: 'شوربة عدس', en: 'Lentil Soup', image: '' },
      { ar: 'شوربة كويكر', en: 'Quaker Soup', image: '' },
      { ar: 'شوربة جريش', en: 'Jareesh Soup', image: '' },
      { ar: 'شوربة حب', en: 'Hab Soup', image: '' },
      { ar: 'شوربة خضار', en: 'Vegetable Soup', image: '' },
      { ar: 'فتة ورق عنب', en: 'Vine Leaves Fattah', image: '' },
      { ar: 'فتة حمص', en: 'Hummus Fattah', image: '' },
      { ar: 'فتة شاورما', en: 'Shawarma Fattah', image: '' },
      { ar: 'فتة باذنجان', en: 'Eggplant Fattah', image: '' },
      { ar: 'فتة المانتو', en: 'Mantu Fattah', image: '' },
      { ar: 'فتة كبة', en: 'Kibbeh Fattah', image: '' },
      { ar: 'فتة كوارع', en: 'Trotters Fattah', image: '' },
      { ar: 'فتة الفول الأخضر', en: 'Green Fava Bean Fattah', image: '' },
      { ar: 'فتة حمسة', en: 'Hamees Fattah', image: '' }
    ]
  },
  {
    title: 'الشعبيات',
    titleEn: 'Traditional Dishes',
    icon: Flame,
    items: [
      { ar: 'مرقوق نجدي باللحم', en: 'Najdi Marqooq with Meat', image: '' },
      { ar: 'مرقوق بالخضار', en: 'Marqooq with Vegetables', image: '' },
      { ar: 'جريش أحمر حائلي', en: 'Haili Red Jareesh', image: '' },
      { ar: 'جريش أبيض قصيمي بالدجاج والكشنة', en: 'Qassimi White Jareesh with Chicken', image: '' },
      { ar: 'جريش نجدي باللبن', en: 'Najdi Jareesh with Laban', image: '' },
      { ar: 'هريس حساوي باللحم', en: 'Hasa Harees with Meat', image: '' },
      { ar: 'هريس حساوي بالدجاج', en: 'Hasa Harees with Chicken', image: '' },
      { ar: 'مطازيز قصيمية', en: 'Qassimi Matazeez', image: '' },
      { ar: 'مضروبة حساوية باللحم', en: 'Hasa Modrouba with Meat', image: '' },
      { ar: 'مضروبة حساوية بالدجاج', en: 'Hasa Modrouba with Chicken', image: '' },
      { ar: 'سليق مكاوي باللحم', en: 'Makkawi Saleeg with Meat', image: '' },
      { ar: 'سليق مكاوي بالدجاج', en: 'Makkawi Saleeg with Chicken', image: '' },
      { ar: 'مفلق روبيان', en: 'Miflaq with Shrimp', image: '' },
      { ar: 'مفلق لحم', en: 'Miflaq with Meat', image: '' },
      { ar: 'تمن حائلي بالدجاج', en: 'Haili Tuman with Chicken', image: '' },
      { ar: 'قرصان', en: 'Qorsan', image: '' },
      { ar: 'مثلوثة نجدية', en: 'Najdi Mathlouthah', image: '' },
      { ar: 'دغابيس غامدية', en: 'Ghamidi Dghabeis', image: '' },
      { ar: 'مقلقل لحم', en: 'Maqlqal Meat', image: '' }
    ]
  },
  {
    title: 'المحاشي والإيدامات',
    titleEn: 'Stuffed Vegetables & Stews',
    icon: ChefHat,
    items: [
      { ar: 'محشي كرنب', en: 'Stuffed Cabbage', image: '' },
      { ar: 'محشي بصل', en: 'Stuffed Onion', image: '' },
      { ar: 'محشي كوسا', en: 'Stuffed Zucchini', image: '' },
      { ar: 'محشي ورق عنب', en: 'Stuffed Vine Leaves', image: '' },
      { ar: 'كبيبة حائل', en: 'Hail Kubaybah', image: '' },
      { ar: 'محشي فلفل حار', en: 'Stuffed Chili Pepper', image: '' },
      { ar: 'محاشي سعودية', en: 'Saudi Stuffed Vegetables', image: '' },
      { ar: 'محاشي مشكل', en: 'Mixed Stuffed Vegetables', image: '' },
      { ar: 'خضار مشكل صالونة', en: 'Mixed Vegetable Saloona', image: '' },
      { ar: 'قرع بلدي أهل أول', en: 'Traditional Country Pumpkin', image: '' },
      { ar: 'بامية أهل المدينة', en: 'Madinah Okra', image: '' },
      { ar: 'قرع أخضر باللحم', en: 'Green Pumpkin with Meat', image: '' },
      { ar: 'قرع أخضر بالدجاج', en: 'Green Pumpkin with Chicken', image: '' },
      { ar: 'مرق شبزي حساوي', en: 'Hasa Shabzi Stew', image: '' },
      { ar: 'مرق رجلة لحم', en: 'Purslane Stew with Meat', image: '' },
      { ar: 'مرق رجلة دجاج', en: 'Purslane Stew with Chicken', image: '' },
      { ar: 'ملوخية حجازية', en: 'Hijazi Molokhia', image: '' },
      { ar: 'ملوخية ورق اللحم', en: 'Molokhia Leaves with Meat', image: '' },
      { ar: 'ملوخية ورق الدجاج', en: 'Molokhia Leaves with Chicken', image: '' },
      { ar: 'مختوم بامية', en: 'Okra Makhtoom', image: '' },
      { ar: 'مرقة هواء', en: 'Air Broth', image: '' }
    ]
  },
  {
    title: 'الأرز',
    titleEn: 'Rice Dishes',
    icon: Layers,
    items: [
      { ar: 'أرز حساوي باللحم', en: 'Hasa Rice with Meat', image: '' },
      { ar: 'أرز حساوي بالدجاج', en: 'Hasa Rice with Chicken', image: '' },
      { ar: 'أرز الشمندر', en: 'Beetroot Rice', image: '' },
      { ar: 'أرز بخلطة الليمون', en: 'Lemon Mixed Rice', image: '' },
      { ar: 'أرز الشبت', en: 'Dill Rice', image: '' },
      { ar: 'أرز مشخول بالروبيان', en: 'Mashkoul Rice with Shrimp', image: '' },
      { ar: 'أرز مشخول بالدجاج', en: 'Mashkoul Rice with Chicken', image: '' },
      { ar: 'أرز مشخول باللحم', en: 'Mashkoul Rice with Meat', image: '' },
      { ar: 'أرز مشخول بالسمك', en: 'Mashkoul Rice with Fish', image: '' },
      { ar: 'أرز مشخول بالخضار', en: 'Mashkoul Rice with Vegetables', image: '' },
      { ar: 'أرز مندي بالدجاج', en: 'Mandi Rice with Chicken', image: '' },
      { ar: 'مقلوبة طبقات', en: 'Layered Maklouba', image: '' },
      { ar: 'كبسة فقع', en: 'Trufalls Kabsa', image: '' },
      { ar: 'أرز بخاري بالدجاج', en: 'Bukhari Rice with Chicken', image: '' },
      { ar: 'أرز بخاري باللحم', en: 'Bukhari Rice with Meat', image: '' },
      { ar: 'أرز كابلي باللحم', en: 'Kabli Rice with Meat', image: '' },
      { ar: 'أرز كابلي بالدجاج', en: 'Kabli Rice with Chicken', image: '' },
      { ar: 'أرز زربيان باللحم', en: 'Zurbian Rice with Meat', image: '' },
      { ar: 'أرز زربيان بالدجاج', en: 'Zurbian Rice with Chicken', image: '' },
      { ar: 'قرع بلدي محشي بالأرز', en: 'Country Pumpkin Stuffed with Rice', image: '' },
      { ar: 'أرز صيادية بالسمك', en: 'Sayadieh Fish Rice', image: '' },
      { ar: 'أرز طبقات مع الكريمة واللبن', en: 'Layered Rice with Cream & Laban', image: '' },
      { ar: 'أرز كشري', en: 'Koshari Rice', image: '' },
      { ar: 'أرز معدوس', en: 'Madoos Rice', image: '' },
      { ar: 'أرز الشبت مع الفول', en: 'Dill Rice with Fava Beans', image: '' },
      { ar: 'أرز المحموص', en: 'Mahmoos Rice', image: '' },
      { ar: 'السلقية', en: 'Alsulqiya Rice', image: '' },
      { ar: 'أرز معمر سعودي', en: 'Saudi Moamar Rice', image: '' },
      { ar: 'أرز قفر', en: 'Qafar Rice', image: '' },
      { ar: 'كبسة سعودية بأرز شعبي ولحم', en: 'Saudi Kabsa with Traditional Rice & Meat', image: '' },
      { ar: 'كبسة سعودية بأرز بخاري ودجاج', en: 'Saudi Kabsa with Bukhari Rice & Chicken', image: '' },
      { ar: 'كبسة روبيان ناشف', en: 'Dried Shrimp Kabsa', image: '' },
      { ar: 'أرز شعبي سادة', en: 'Plain Traditional Rice', image: '' },
      { ar: 'أرز خوالي باللحم والقرع', en: 'Khawali Rice with Meat & Pumpkin', image: '' },
      { ar: 'أرز دجاج خوال', en: 'Khawali Chicken Rice', image: '' },
      { ar: 'برياني بالدجاج', en: 'Chicken Biryani', image: '' },
      { ar: 'ريزوتو طوفرية', en: 'Tofareya Risotto', image: '' },
      { ar: 'أرز بايل', en: 'Paella Rice', image: '' },
      { ar: 'أرز مندي باللحم', en: 'Mandi Rice with Meat', image: '' },
      { ar: 'مقلوبة باللحم', en: 'Maklouba with Meat', image: '' },
      { ar: 'مقلوبة بالدجاج', en: 'Maklouba with Chicken', image: '' }
    ]
  },
  {
    title: 'المكرونات والأطباق المالحة',
    titleEn: 'Pastas & Savory Dishes',
    icon: Fish,
    items: [
      { ar: 'مكرونة بالصوص الأبيض والمشروم', en: 'White Sauce & Mushroom Pasta', image: '' },
      { ar: 'مكرونة بالبيستو', en: 'Pesto Pasta', image: '' },
      { ar: 'مكرونة بالروبيان والكريمة', en: 'Shrimp & Cream Pasta', image: '' },
      { ar: 'مكرونة سباغيتي', en: 'Spaghetti Pasta', image: '' },
      { ar: 'مكرونة بالسبانخ', en: 'Spinach Pasta', image: '' },
      { ar: 'مكرونة بشاميل', en: 'Bechamel Pasta', image: '' },
      { ar: 'مكرونة بحرية', en: 'Seafood Pasta', image: '' },
      { ar: 'مكرونة مرقوق', en: 'Marqooq Pasta', image: '' },
      { ar: 'مراصيع محشية', en: 'Stuffed Maraseea', image: '' },
      { ar: 'دجاج مع السبانخ والكريمة', en: 'Chicken with Spinach & Cream', image: '' },
      { ar: 'كوسا باللبن', en: 'Zucchini with Laban', image: '' },
      { ar: 'شيش برك', en: 'Shish Barak', image: '' },
      { ar: 'لفائف الباذنجان المحشية بالمكرونة', en: 'Eggplant Rolls Stuffed with Pasta', image: '' },
      { ar: 'كباب ميرو', en: 'Miro Kebab', image: '' },
      { ar: 'كباب بالصوص الأحمر', en: 'Kebab in Red Sauce', image: '' },
      { ar: 'صينية بطاطس بالأجبان', en: 'Cheesy Potato Tray', image: '' },
      { ar: 'داوود باشا', en: 'Dawood Basha', image: '' },
      { ar: 'قاضي القضاة المديني', en: 'Medini Qadi Al-Qudat', image: '' },
      { ar: 'مسقعة حجازية', en: 'Hijazi Mussaaka', image: '' },
      { ar: 'مسخن سعودي', en: 'Saudi Musakhan', image: '' },
      { ar: 'سمك بالبهارات السعودية', en: 'Fish with Saudi Spices', image: '' },
      { ar: 'كفتة مدخنة', en: 'Smoked Kofta', image: '' },
      { ar: 'دجاج بالكريمة', en: 'Creamy Chicken', image: '' }
    ]
  },
  {
    title: 'الذبائح والخرفان المحشية',
    titleEn: 'Stuffed Carcasses & Feasts',
    icon: Utensils,
    items: [
      { ar: 'خروف شعبي', en: 'Traditional Whole Lamb', image: '' },
      { ar: 'خروف غوزي', en: 'Ghouzi Whole Lamb', image: '' },
      { ar: 'خروف مندي', en: 'Mandi Whole Lamb', image: '' },
      { ar: 'خروف عبيلة', en: 'Abeela Whole Lamb', image: '' },
      { ar: 'خروف كابلي', en: 'Kabli Whole Lamb', image: '' },
      { ar: 'خروف زربيان', en: 'Zurbian Whole Lamb', image: '' },
      { ar: 'خروف بخاري', en: 'Bukhari Whole Lamb', image: '' },
      { ar: 'خروف سليق', en: 'Saleeg Whole Lamb', image: '' },
      { ar: 'خروف مثلوثة', en: 'Mathlouthah Whole Lamb', image: '' },
      { ar: 'خروف محشي مسقع', en: 'Lamb Stuffed with Mussaaka', image: '' },
      { ar: 'خروف محشي كبيبة', en: 'Lamb Stuffed with Kubaybah', image: '' },
      { ar: 'خروف محشي ورق عنب', en: 'Lamb Stuffed with Vine Leaves', image: '' },
      { ar: 'خروف محشي فقع', en: 'Lamb Stuffed with Truffles', image: '' },
      { ar: 'خروف محشي حمام', en: 'Lamb Stuffed with Pigeons', image: '' },
      { ar: 'خروف مع المحاشي', en: 'Lamb with Stuffed Vegetables', image: '' },
      { ar: 'خروف محشي بالمكرونة', en: 'Lamb Stuffed with Pasta', image: '' },
      { ar: 'خروف محشي بالفريك', en: 'Lamb Stuffed with Freekeh', image: '' }
    ]
  },
  {
    title: 'الحلويات',
    titleEn: 'Desserts',
    icon: Cake,
    items: [
      { ar: 'لقيمات', en: 'Luqaimat', image: '' },
      { ar: 'تاوا', en: 'Tawa', image: '' },
      { ar: 'كريمة قدر', en: 'Qader Cream (Crème Caramel)', image: '' },
      { ar: 'كريمة أول', en: 'Traditional Cream', image: '' },
      { ar: 'شعيرية بالهيل والزعفران', en: 'Vermicelli with Cardamom & Saffron', image: '' },
      { ar: 'بقلوة تمر', en: 'Date Baklava', image: '' },
      { ar: 'سمبوسك تمر وقرفة', en: 'Date & Cinnamon Sambusa', image: '' },
      { ar: 'أم علي بالهيل والزعفران', en: 'Umm Ali with Cardamom & Saffron', image: '' },
      { ar: 'بسبوسة مكة', en: 'Makkah Basbousa', image: '' },
      { ar: 'مهلبية رمان', en: 'Pomegranate Muhallebi', image: '' },
      { ar: 'مهلبية مانجو', en: 'Mango Muhallebi', image: '' },
      { ar: 'كنافة قشطة', en: 'Ashta Kunafa', image: '' },
      { ar: 'كنافة خربز', en: 'Melon Kunafa', image: '' },
      { ar: 'كنافة تمر', en: 'Date Kunafa', image: '' },
      { ar: 'طرمبة سادة', en: 'Plain Tulumba', image: '' },
      { ar: 'طرمبة محشية', en: 'Stuffed Tulumba', image: '' },
      { ar: 'مراصيع بالعسل', en: 'Maraseea with Honey', image: '' },
      { ar: 'مراصيع معصوب', en: 'Maraseea Masoub', image: '' },
      { ar: 'كيكة التمر', en: 'Date Cake', image: '' },
      { ar: 'مراصيع بالقشطة والقطايف', en: 'Maraseea with Ashta & Qatayef', image: '' },
      { ar: 'حنيني', en: 'Haneini', image: '' },
      { ar: 'قشد ملكي', en: 'Royal Qashd', image: '' },
      { ar: 'عيش السرايا بالحلقوم', en: 'Aish Al-Saraya with Turkish Delight', image: '' },
      { ar: 'حلى أوريو بالشوكولاتة', en: 'Chocolate Oreo Dessert', image: '' },
      { ar: 'حلى الطبقات', en: 'Layered Dessert', image: '' },
      { ar: 'كاسترد', en: 'Custard', image: '' },
      { ar: 'سقدانة', en: 'Sagdana', image: '' },
      { ar: 'عريكة جنوبية', en: 'Southern Areeka', image: '' },
      { ar: 'فخار طبقات', en: 'Clay Pot Layered Dessert', image: '' },
      { ar: 'حيسة مدينية', en: 'Medini Haisah', image: '' },
      { ar: 'ماسية سادة', en: 'Plain Masia', image: '' },
      { ar: 'ماسية بالرمان', en: 'Masia with Pomegranate', image: '' },
      { ar: 'شعيرية حمسة', en: 'Hamees Vermicelli', image: '' },
      { ar: 'دبيازة', en: 'Dabyaza', image: '' },
      { ar: 'خنفروش', en: 'Khangaroosh', image: '' },
      { ar: 'عاشورية', en: 'Ashoora', image: '' },
      { ar: 'ساقو (رمان - مانجو - ورد)', en: 'Sago (Pomegranate - Mango - Rose)', image: '' },
      { ar: 'مقشوش', en: 'Maqshoosh', image: '' }
    ]
  }
];

export default function EventsMenu({ addToCart }: EventsMenuProps) {
  const { lang: contextLang } = useLanguage() || { lang: 'ar' };
  const lang = contextLang === 'en' ? 'en' : 'ar';
  
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const t = {
    ar: {
      badge: "منيو الحفلات والأفراح",
      title: "أصناف قدور الأجداد الفاخرة",
      description: "تصفح قائمة الأطباق العريقة والمميزة الخاصة بالحفلات، الولائم الكبرى، والمناسبات السعيدة.",
      customOrder: "حسب الطلب",
      addButton: "إضافة",
      footerNote: "📌 لطلبات الحفلات الكبرى والمناسبات الخاصة، يمكنك اختيار ما يناسب ضيوفك من القائمة أعلاه للتنسيق المسبق."
    },
    en: {
      badge: "Events & Weddings Menu",
      title: "Ancestors Pot Luxury Dishes",
      description: "Browse the authentic and special dishes menu for parties, grand banquets, and happy occasions.",
      customOrder: "Upon Request",
      addButton: "Add",
      footerNote: "📌 For large catering and special events orders, you can choose what suits your guests from the menu above for advance coordination."
    }
  };

  const currentT = t[lang];

  return (
    <section className="py-12 px-4 bg-[#f5f1ea] text-[#2c1e14] min-h-screen font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <span className="text-[#8c6239] text-xs font-bold tracking-[0.3em] uppercase bg-white px-4 py-1.5 rounded-full border border-[#d4af37]/30 inline-block shadow-sm">
            {currentT.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c1e14] flex items-center justify-center gap-2">
            <Utensils className="w-8 h-8 text-[#d4af37]" /> {currentT.title}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base font-normal">
            {currentT.description}
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {menuCategories.map((cat, index) => {
            const IconComponent = cat.icon;
            const isActive = activeCategory === index;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 shadow-sm border ${
                  isActive
                    ? 'bg-[#d4af37] text-white border-[#d4af37] scale-105 shadow-md'
                    : 'bg-white text-[#2c1e14] border-[#d4af37]/30 hover:border-[#d4af37]'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{lang === 'ar' ? cat.title : cat.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Items Grid */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#d4af37]/30 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#d4af37]/20 pb-4">
            {(() => {
              const ActiveIcon = menuCategories[activeCategory].icon;
              return <ActiveIcon className="w-7 h-7 text-[#d4af37]" />;
            })()}
            <h3 className="text-2xl font-bold text-[#8c6239]">
              {lang === 'ar' ? menuCategories[activeCategory].title : menuCategories[activeCategory].titleEn}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuCategories[activeCategory].items.map((dish, idx) => {
              const dishName = lang === 'ar' ? dish.ar : dish.en;
              const dishItem = {
                id: `events-${activeCategory}-${idx}`,
                name: dishName,
                price: 150, 
                description: lang === 'ar' ? `طبق فاخر مخصص للحفلات والولائم من قدور الأجداد.` : `Luxury dish dedicated for events and banquets from Ancestors Pot.`,
                image: dish.image || ''
              };

              return (
                <div 
                  key={idx}
                  className="bg-[#f5f1ea] border border-[#d4af37]/20 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-[#d4af37] shadow-sm hover:shadow-md"
                >
                  {/* Image Placeholder Box */}
                  <div className="w-full h-36 bg-[#e8e2d5] flex items-center justify-center relative border-b border-[#d4af37]/20">
                    {dish.image ? (
                      <img src={dish.image} alt={dishName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-[#8c6239]/60">
                        <ImageIcon className="w-7 h-7" />
                        <span className="text-[11px] font-bold">{lang === 'ar' ? 'صورة الطبق قريباً' : 'Image Soon'}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#d4af37] shrink-0 mt-1.5"></span>
                      <span className="leading-relaxed font-bold text-[#2c1e14] text-sm">{dishName}</span>
                    </div>

                    <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8c6239]">{currentT.customOrder}</span>
                      <button
                        onClick={() => addToCart(dishItem)}
                        className="bg-[#d4af37] hover:bg-[#c49f27] text-white px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1 text-xs shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {currentT.addButton}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-white border border-[#d4af37]/30 rounded-2xl p-4 text-center text-xs text-gray-600 shadow-sm">
          <p className="font-medium">{currentT.footerNote}</p>
        </div>

      </div>
    </section>
  );
}