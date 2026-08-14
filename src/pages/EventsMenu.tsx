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
  Plus 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EventsMenuProps {
  addToCart: (item: any) => void;
}

interface MenuCategory {
  title: string;
  titleEn: string;
  icon: any;
  items: { ar: string; en: string }[];
}

const menuCategories: MenuCategory[] = [
  {
    title: 'السلطات',
    titleEn: 'Salads',
    icon: Salad,
    items: [
      { ar: 'سلطة سعودية', en: 'Saudi Salad' },
      { ar: 'سلطة جرجير وشمندر', en: 'Arugula & Beetroot Salad' },
      { ar: 'سلطة جرجير ولحم ناشف', en: 'Arugula & Dried Meat Salad' },
      { ar: 'سلطة فتوش قدور الأجداد', en: 'Ancestors Pot Fattoush Salad' },
      { ar: 'بامية ناشفة', en: 'Dried Okra Salad' },
      { ar: 'سلطة شاورما', en: 'Shawarma Salad' },
      { ar: 'سلطة رقاق الكوسة المشوية', en: 'Grilled Zucchini Sheets Salad' },
      { ar: 'تبولة قدور الأجداد', en: 'Ancestors Pot Tabbouleh' },
      { ar: 'سلطة البامية مع اللبنة', en: 'Okra with Labneh Salad' },
      { ar: 'سلطة البحر الأحمر', en: 'Red Sea Salad' },
      { ar: 'سلطة الكرنب والماش', en: 'Cabbage & Mung Bean Salad' },
      { ar: 'سلطة الطبقات', en: 'Layered Salad' },
      { ar: 'سلطة حمام البر', en: 'Wild Pigeon Salad' },
      { ar: 'سلطة الجرجير بالقرع والمكسرات ورقائق الكوسة', en: 'Arugula Salad with Pumpkin, Nuts & Zucchini Chips' },
      { ar: 'سلطة الفلافل', en: 'Falafel Salad' },
      { ar: 'سلطة التبولة بالبنجر', en: 'Beetroot Tabbouleh' },
      { ar: 'سلطة الكرنب الملونة بالدجاج المشوي', en: 'Colorful Cabbage Salad with Grilled Chicken' },
      { ar: 'سلطة متبل الشمندر', en: 'Beetroot Mutabal Salad' },
      { ar: 'سلطة نجد', en: 'Najd Salad' },
      { ar: 'سلطة الرمان باللبنة', en: 'Pomegranate & Labneh Salad' },
      { ar: 'سلطة الكينوا', en: 'Quinoa Salad' },
      { ar: 'سلطة سيزر', en: 'Caesar Salad' }
    ]
  },
  {
    title: 'المقبلات',
    titleEn: 'Appetizers',
    icon: Utensils,
    items: [
      { ar: 'حمص بلحم الحميس', en: 'Hummus with Hamees Meat' },
      { ar: 'حمص', en: 'Hummus' },
      { ar: 'حمص حبق مديني', en: 'Medini Habak Hummus' },
      { ar: 'لبنة الشمندر مع اللحم', en: 'Beetroot Labneh with Meat' },
      { ar: 'متبل', en: 'Mutabal' },
      { ar: 'حراق إصبع', en: 'Harraq Osbao' },
      { ar: 'كباب السبانخ المديني', en: 'Medini Spinach Kebab' },
      { ar: 'ورق عنب', en: 'Stuffed Vine Leaves' },
      { ar: 'بابا غنوج', en: 'Baba Ghanoush' },
      { ar: 'لبنة مع البصل والثوم', en: 'Labneh with Onion & Garlic' },
      { ar: 'متبل سعودي', en: 'Saudi Mutabal' },
      { ar: 'متبل خضار', en: 'Vegetable Mutabal' },
      { ar: 'مقليات', en: 'Fried Appetizers' },
      { ar: 'كبة بطاطس', en: 'Potato Kibbeh' },
      { ar: 'كبة شبت', en: 'Dill Kibbeh' },
      { ar: 'كبة شمندر', en: 'Beetroot Kibbeh' },
      { ar: 'كبة محشية بالجبن والمكسرات', en: 'Kibbeh Stuffed with Cheese & Nuts' }
    ]
  },
  {
    title: 'المعجنات والمخبوزات',
    titleEn: 'Pastries & Breads',
    icon: Wheat,
    items: [
      { ar: 'سمبوسك دجاج', en: 'Chicken Sambusa' },
      { ar: 'سمبوسك لحم', en: 'Meat Sambusa' },
      { ar: 'سمبوسك جبن', en: 'Cheese Sambusa' },
      { ar: 'سمبوسك عدس', en: 'Lentil Sambusa' },
      { ar: 'سمبوسك خضار', en: 'Vegetable Sambusa' },
      { ar: 'منتو', en: 'Mantu' },
      { ar: 'فطائر بالزيتون', en: 'Olive Pastries' },
      { ar: 'بف حجازي', en: 'Hijazi Puff' },
      { ar: 'يغمش حجازي', en: 'Hijazi Yaghmish' },
      { ar: 'فرموزة حجازية', en: 'Hijazi Formosa' },
      { ar: 'عيش أبو اللحم حجازي', en: 'Hijazi Aish Abu Al-Lahm' },
      { ar: 'كبة حجازية', en: 'Hijazi Kibbeh' },
      { ar: 'فطائر بالسبانخ', en: 'Spinach Pastries' },
      { ar: 'خلية النحل', en: 'Beehive Pastry' },
      { ar: 'رول المندي', en: 'Mandi Roll' },
      { ar: 'مطبق مالح (جبن - لحم)', en: 'Salty Mutabbaq (Cheese - Meat)' },
      { ar: 'تاكو', en: 'Tacos' },
      { ar: 'مراصيع مبصل', en: 'Onion Maraseea' },
      { ar: 'خبز التمر الحساوي', en: 'Hasa Date Bread' },
      { ar: 'خبز التنور', en: 'Tanoor Bread' },
      { ar: 'خبز شريك', en: 'Shareek Bread' },
      { ar: 'شابورة قدور الأجداد', en: 'Ancestors Pot Rusks' }
    ]
  },
  {
    title: 'الشوربات والفتات',
    titleEn: 'Soups & Fattah',
    icon: Soup,
    items: [
      { ar: 'شوربة كوارع', en: 'Trotters Soup' },
      { ar: 'شوربة عدس', en: 'Lentil Soup' },
      { ar: 'شوربة كويكر', en: 'Quaker Soup' },
      { ar: 'شوربة جريش', en: 'Jareesh Soup' },
      { ar: 'شوربة حب', en: 'Hab Soup' },
      { ar: 'شوربة خضار', en: 'Vegetable Soup' },
      { ar: 'فتة ورق عنب', en: 'Vine Leaves Fattah' },
      { ar: 'فتة حمص', en: 'Hummus Fattah' },
      { ar: 'فتة شاورما', en: 'Shawarma Fattah' },
      { ar: 'فتة باذنجان', en: 'Eggplant Fattah' },
      { ar: 'فتة المانتو', en: 'Mantu Fattah' },
      { ar: 'فتة كبة', en: 'Kibbeh Fattah' },
      { ar: 'فتة كوارع', en: 'Trotters Fattah' },
      { ar: 'فتة الفول الأخضر', en: 'Green Fava Bean Fattah' },
      { ar: 'فتة حمسة', en: 'Hamees Fattah' }
    ]
  },
  {
    title: 'الشعبيات',
    titleEn: 'Traditional Dishes',
    icon: Flame,
    items: [
      { ar: 'مرقوق نجدي باللحم', en: 'Najdi Marqooq with Meat' },
      { ar: 'مرقوق بالخضار', en: 'Marqooq with Vegetables' },
      { ar: 'جريش أحمر حائلي', en: 'Haili Red Jareesh' },
      { ar: 'جريش أبيض قصيمي بالدجاج والكشنة', en: 'Qassimi White Jareesh with Chicken' },
      { ar: 'جريش نجدي باللبن', en: 'Najdi Jareesh with Laban' },
      { ar: 'هريس حساوي باللحم', en: 'Hasa Harees with Meat' },
      { ar: 'هريس حساوي بالدجاج', en: 'Hasa Harees with Chicken' },
      { ar: 'مطازيز قصيمية', en: 'Qassimi Matazeez' },
      { ar: 'مضروبة حساوية باللحم', en: 'Hasa Modrouba with Meat' },
      { ar: 'مضروبة حساوية بالدجاج', en: 'Hasa Modrouba with Chicken' },
      { ar: 'سليق مكاوي باللحم', en: 'Makkawi Saleeg with Meat' },
      { ar: 'سليق مكاوي بالدجاج', en: 'Makkawi Saleeg with Chicken' },
      { ar: 'مفلق روبيان', en: 'Miflaq with Shrimp' },
      { ar: 'مفلق لحم', en: 'Miflaq with Meat' },
      { ar: 'تمن حائلي بالدجاج', en: 'Haili Tuman with Chicken' },
      { ar: 'قرصان', en: 'Qorsan' },
      { ar: 'مثلوثة نجدية', en: 'Najdi Mathlouthah' },
      { ar: 'دغابيس غامدية', en: 'Ghamidi Dghabeis' },
      { ar: 'مقلقل لحم', en: 'Maqlqal Meat' }
    ]
  },
  {
    title: 'المحاشي والإيدامات',
    titleEn: 'Stuffed Vegetables & Stews',
    icon: ChefHat,
    items: [
      { ar: 'محشي كرنب', en: 'Stuffed Cabbage' },
      { ar: 'محشي بصل', en: 'Stuffed Onion' },
      { ar: 'محشي كوسا', en: 'Stuffed Zucchini' },
      { ar: 'محشي ورق عنب', en: 'Stuffed Vine Leaves' },
      { ar: 'كبيبة حائل', en: 'Hail Kubaybah' },
      { ar: 'محشي فلفل حار', en: 'Stuffed Chili Pepper' },
      { ar: 'محاشي سعودية', en: 'Saudi Stuffed Vegetables' },
      { ar: 'محاشي مشكل', en: 'Mixed Stuffed Vegetables' },
      { ar: 'خضار مشكل صالونة', en: 'Mixed Vegetable Saloona' },
      { ar: 'قرع بلدي أهل أول', en: 'Traditional Country Pumpkin' },
      { ar: 'بامية أهل المدينة', en: 'Madinah Okra' },
      { ar: 'قرع أخضر باللحم', en: 'Green Pumpkin with Meat' },
      { ar: 'قرع أخضر بالدجاج', en: 'Green Pumpkin with Chicken' },
      { ar: 'مرق شبزي حساوي', en: 'Hasa Shabzi Stew' },
      { ar: 'مرق رجلة لحم', en: 'Purslane Stew with Meat' },
      { ar: 'مرق رجلة دجاج', en: 'Purslane Stew with Chicken' },
      { ar: 'ملوخية حجازية', en: 'Hijazi Molokhia' },
      { ar: 'ملوخية ورق اللحم', en: 'Molokhia Leaves with Meat' },
      { ar: 'ملوخية ورق الدجاج', en: 'Molokhia Leaves with Chicken' },
      { ar: 'مختوم بامية', en: 'Okra Makhtoom' },
      { ar: 'مرقة هواء', en: 'Air Broth' }
    ]
  },
  {
    title: 'الأرز',
    titleEn: 'Rice Dishes',
    icon: Layers,
    items: [
      { ar: 'أرز حساوي باللحم', en: 'Hasa Rice with Meat' },
      { ar: 'أرز حساوي بالدجاج', en: 'Hasa Rice with Chicken' },
      { ar: 'أرز الشمندر', en: 'Beetroot Rice' },
      { ar: 'أرز بخلطة الليمون', en: 'Lemon Mixed Rice' },
      { ar: 'أرز الشبت', en: 'Dill Rice' },
      { ar: 'أرز مشخول بالروبيان', en: 'Mashkoul Rice with Shrimp' },
      { ar: 'أرز مشخول بالدجاج', en: 'Mashkoul Rice with Chicken' },
      { ar: 'أرز مشخول باللحم', en: 'Mashkoul Rice with Meat' },
      { ar: 'أرز مشخول بالسمك', en: 'Mashkoul Rice with Fish' },
      { ar: 'أرز مشخول بالخضار', en: 'Mashkoul Rice with Vegetables' },
      { ar: 'أرز مندي بالدجاج', en: 'Mandi Rice with Chicken' },
      { ar: 'مقلوبة طبقات', en: 'Layered Maklouba' },
      { ar: 'كبسة فقع', en: 'Trufalls Kabsa' },
      { ar: 'أرز بخاري بالدجاج', en: 'Bukhari Rice with Chicken' },
      { ar: 'أرز بخاري باللحم', en: 'Bukhari Rice with Meat' },
      { ar: 'أرز كابلي باللحم', en: 'Kabli Rice with Meat' },
      { ar: 'أرز كابلي بالدجاج', en: 'Kabli Rice with Chicken' },
      { ar: 'أرز زربيان باللحم', en: 'Zurbian Rice with Meat' },
      { ar: 'أرز زربيان بالدجاج', en: 'Zurbian Rice with Chicken' },
      { ar: 'قرع بلدي محشي بالأرز', en: 'Country Pumpkin Stuffed with Rice' },
      { ar: 'أرز صيادية بالسمك', en: 'Sayadieh Fish Rice' },
      { ar: 'أرز طبقات مع الكريمة واللبن', en: 'Layered Rice with Cream & Laban' },
      { ar: 'أرز كشري', en: 'Koshari Rice' },
      { ar: 'أرز معدوس', en: 'Madoos Rice' },
      { ar: 'أرز الشبت مع الفول', en: 'Dill Rice with Fava Beans' },
      { ar: 'أرز المحموص', en: 'Mahmoos Rice' },
      { ar: 'السلقية', en: 'Alsulqiya Rice' },
      { ar: 'أرز معمر سعودي', en: 'Saudi Moamar Rice' },
      { ar: 'أرز قفر', en: 'Qafar Rice' },
      { ar: 'كبسة سعودية بأرز شعبي ولحم', en: 'Saudi Kabsa with Traditional Rice & Meat' },
      { ar: 'كبسة سعودية بأرز بخاري ودجاج', en: 'Saudi Kabsa with Bukhari Rice & Chicken' },
      { ar: 'كبسة روبيان ناشف', en: 'Dried Shrimp Kabsa' },
      { ar: 'أرز شعبي سادة', en: 'Plain Traditional Rice' },
      { ar: 'أرز خوالي باللحم والقرع', en: 'Khawali Rice with Meat & Pumpkin' },
      { ar: 'أرز دجاج خوال', en: 'Khawali Chicken Rice' },
      { ar: 'برياني بالدجاج', en: 'Chicken Biryani' },
      { ar: 'ريزوتو طوفرية', en: 'Tofareya Risotto' },
      { ar: 'أرز بايل', en: 'Paella Rice' },
      { ar: 'أرز مندي باللحم', en: 'Mandi Rice with Meat' },
      { ar: 'مقلوبة باللحم', en: 'Maklouba with Meat' },
      { ar: 'مقلوبة بالدجاج', en: 'Maklouba with Chicken' }
    ]
  },
  {
    title: 'المكرونات والأطباق المالحة',
    titleEn: 'Pastas & Savory Dishes',
    icon: Fish,
    items: [
      { ar: 'مكرونة بالصوص الأبيض والمشروم', en: 'White Sauce & Mushroom Pasta' },
      { ar: 'مكرونة بالبيستو', en: 'Pesto Pasta' },
      { ar: 'مكرونة بالروبيان والكريمة', en: 'Shrimp & Cream Pasta' },
      { ar: 'مكرونة سباغيتي', en: 'Spaghetti Pasta' },
      { ar: 'مكرونة بالسبانخ', en: 'Spinach Pasta' },
      { ar: 'مكرونة بشاميل', en: 'Bechamel Pasta' },
      { ar: 'مكرونة بحرية', en: 'Seafood Pasta' },
      { ar: 'مكرونة مرقوق', en: 'Marqooq Pasta' },
      { ar: 'مراصيع محشية', en: 'Stuffed Maraseea' },
      { ar: 'دجاج مع السبانخ والكريمة', en: 'Chicken with Spinach & Cream' },
      { ar: 'كوسا باللبن', en: 'Zucchini with Laban' },
      { ar: 'شيش برك', en: 'Shish Barak' },
      { ar: 'لفائف الباذنجان المحشية بالمكرونة', en: 'Eggplant Rolls Stuffed with Pasta' },
      { ar: 'كباب ميرو', en: 'Miro Kebab' },
      { ar: 'كباب بالصوص الأحمر', en: 'Kebab in Red Sauce' },
      { ar: 'صينية بطاطس بالأجبان', en: 'Cheesy Potato Tray' },
      { ar: 'داوود باشا', en: 'Dawood Basha' },
      { ar: 'قاضي القضاة المديني', en: 'Medini Qadi Al-Qudat' },
      { ar: 'مسقعة حجازية', en: 'Hijazi Mussaaka' },
      { ar: 'مسخن سعودي', en: 'Saudi Musakhan' },
      { ar: 'سمك بالبهارات السعودية', en: 'Fish with Saudi Spices' },
      { ar: 'كفتة مدخنة', en: 'Smoked Kofta' },
      { ar: 'دجاج بالكريمة', en: 'Creamy Chicken' }
    ]
  },
  {
    title: 'الذبائح والخرفان المحشية',
    titleEn: 'Stuffed Carcasses & Feasts',
    icon: Utensils,
    items: [
      { ar: 'خروف شعبي', en: 'Traditional Whole Lamb' },
      { ar: 'خروف غوزي', en: 'Ghouzi Whole Lamb' },
      { ar: 'خروف مندي', en: 'Mandi Whole Lamb' },
      { ar: 'خروف عبيلة', en: 'Abeela Whole Lamb' },
      { ar: 'خروف كابلي', en: 'Kabli Whole Lamb' },
      { ar: 'خروف زربيان', en: 'Zurbian Whole Lamb' },
      { ar: 'خروف بخاري', en: 'Bukhari Whole Lamb' },
      { ar: 'خروف سليق', en: 'Saleeg Whole Lamb' },
      { ar: 'خروف مثلوثة', en: 'Mathlouthah Whole Lamb' },
      { ar: 'خروف محشي مسقع', en: 'Lamb Stuffed with Mussaaka' },
      { ar: 'خروف محشي كبيبة', en: 'Lamb Stuffed with Kubaybah' },
      { ar: 'خروف محشي ورق عنب', en: 'Lamb Stuffed with Vine Leaves' },
      { ar: 'خروف محشي فقع', en: 'Lamb Stuffed with Truffles' },
      { ar: 'خروف محشي حمام', en: 'Lamb Stuffed with Pigeons' },
      { ar: 'خروف مع المحاشي', en: 'Lamb with Stuffed Vegetables' },
      { ar: 'خروف محشي بالمكرونة', en: 'Lamb Stuffed with Pasta' },
      { ar: 'خروف محشي بالفريك', en: 'Lamb Stuffed with Freekeh' }
    ]
  },
  {
    title: 'الحلويات',
    titleEn: 'Desserts',
    icon: Cake,
    items: [
      { ar: 'لقيمات', en: 'Luqaimat' },
      { ar: 'تاوا', en: 'Tawa' },
      { ar: 'كريمة قدر', en: 'Qader Cream (Crème Caramel)' },
      { ar: 'كريمة أول', en: 'Traditional Cream' },
      { ar: 'شعيرية بالهيل والزعفران', en: 'Vermicelli with Cardamom & Saffron' },
      { ar: 'بقلوة تمر', en: 'Date Baklava' },
      { ar: 'سمبوسك تمر وقرفة', en: 'Date & Cinnamon Sambusa' },
      { ar: 'أم علي بالهيل والزعفران', en: 'Umm Ali with Cardamom & Saffron' },
      { ar: 'بسبوسة مكة', en: 'Makkah Basbousa' },
      { ar: 'مهلبية رمان', en: 'Pomegranate Muhallebi' },
      { ar: 'مهلبية مانجو', en: 'Mango Muhallebi' },
      { ar: 'كنافة قشطة', en: 'Ashta Kunafa' },
      { ar: 'كنافة خربز', en: 'Melon Kunafa' },
      { ar: 'كنافة تمر', en: 'Date Kunafa' },
      { ar: 'طرمبة سادة', en: 'Plain Tulumba' },
      { ar: 'طرمبة محشية', en: 'Stuffed Tulumba' },
      { ar: 'مراصيع بالعسل', en: 'Maraseea with Honey' },
      { ar: 'مراصيع معصوب', en: 'Maraseea Masoub' },
      { ar: 'كيكة التمر', en: 'Date Cake' },
      { ar: 'مراصيع بالقشطة والقطايف', en: 'Maraseea with Ashta & Qatayef' },
      { ar: 'حنيني', en: 'Haneini' },
      { ar: 'قشد ملكي', en: 'Royal Qashd' },
      { ar: 'عيش السرايا بالحلقوم', en: 'Aish Al-Saraya with Turkish Delight' },
      { ar: 'حلى أوريو بالشوكولاتة', en: 'Chocolate Oreo Dessert' },
      { ar: 'حلى الطبقات', en: 'Layered Dessert' },
      { ar: 'كاسترد', en: 'Custard' },
      { ar: 'سقدانة', en: 'Sagdana' },
      { ar: 'عريكة جنوبية', en: 'Southern Areeka' },
      { ar: 'فخار طبقات', en: 'Clay Pot Layered Dessert' },
      { ar: 'حيسة مدينية', en: 'Medini Haisah' },
      { ar: 'ماسية سادة', en: 'Plain Masia' },
      { ar: 'ماسية بالرمان', en: 'Masia with Pomegranate' },
      { ar: 'شعيرية حمسة', en: 'Hamees Vermicelli' },
      { ar: 'دبيازة', en: 'Dabyaza' },
      { ar: 'خنفروش', en: 'Khangaroosh' },
      { ar: 'عاشورية', en: 'Ashoora' },
      { ar: 'ساقو (رمان - مانجو - ورد)', en: 'Sago (Pomegranate - Mango - Rose)' },
      { ar: 'مقشوش', en: 'Maqshoosh' }
    ]
  }
];

export default function EventsMenu({ addToCart }: EventsMenuProps) {
  const { lang } = useLanguage();
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
    <section className="py-16 px-4 bg-[#f5f1ea] text-[#2c1e14] min-h-screen" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="text-[#8c6239] text-xs font-sans tracking-[0.3em] uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/30 inline-block mb-3">
            {currentT.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c1e14] mb-3 flex items-center justify-center gap-2">
            <Utensils className="w-8 h-8 text-[#d4af37]" /> {currentT.title}
          </h2>
          <p className="text-[#6b5344] max-w-xl mx-auto text-sm md:text-base font-sans">
            {currentT.description}
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {menuCategories.map((cat, index) => {
            const IconComponent = cat.icon;
            const isActive = activeCategory === index;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm border ${
                  isActive
                    ? 'bg-[#d4af37] text-white border-[#d4af37] scale-105 shadow-md'
                    : 'bg-white text-[#4a3525] border-[#d4af37]/30 hover:border-[#d4af37]'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{lang === 'ar' ? cat.title : cat.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Items Grid */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border-2 border-[#d4af37]/30 shadow-lg">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d4af37]/20">
            {(() => {
              const ActiveIcon = menuCategories[activeCategory].icon;
              return <ActiveIcon className="w-7 h-7 text-[#d4af37]" />;
            })()}
            <h3 className="text-2xl font-bold text-[#8c6239]">
              {lang === 'ar' ? menuCategories[activeCategory].title : menuCategories[activeCategory].titleEn}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {menuCategories[activeCategory].items.map((dish, idx) => {
              const dishName = lang === 'ar' ? dish.ar : dish.en;
              const dishItem = {
                id: `events-${activeCategory}-${idx}`,
                name: dishName,
                price: 150, // سعر افتراضي لأطباق الحفلات
                description: lang === 'ar' ? `طبق فاخر مخصص للحفلات والولائم من قدور الأجداد.` : `Luxury dish dedicated for events and banquets from Ancestors Pot.`,
                image: ''
              };

              return (
                <div 
                  key={idx}
                  className="bg-[#f5f1ea]/60 border border-[#d4af37]/20 rounded-xl p-4 text-[#4a3525] font-sans text-sm flex flex-col justify-between transition-all hover:border-[#d4af37] hover:bg-[#f5f1ea] shadow-sm"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37] shrink-0"></span>
                    <span className="leading-relaxed font-bold text-[#2c1e14]">{dishName}</span>
                  </div>

                  <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8c6239]">{currentT.customOrder}</span>
                    <button
                      onClick={() => addToCart(dishItem)}
                      className="bg-[#d4af37] hover:bg-[#c49f27] text-white px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 text-xs shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {currentT.addButton}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 bg-white border border-[#d4af37]/30 rounded-2xl p-4 text-center text-xs text-[#6b5344] shadow-sm font-sans">
          <p>{currentT.footerNote}</p>
        </div>

      </div>
    </section>
  );
}