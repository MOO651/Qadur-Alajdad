export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subCategory: string;
  badge?: string;
  calories?: string;
}

export const brandInfo = {
  name: 'قدور الأجداد',
  subtitle: 'أصالة الطبخ السعودي',
  // المسار الصحيح المباشر من مجلد public حيث يوجد logo.png
  logoUrl: '/logo.png', 
};

export const mainCategories = [
  { id: 'najd', name: 'منيو نجد العريق', icon: '🏜️', description: 'أصالة المطبخ النجدي العريق على أصوله في قدور الأجداد.' },
  { id: 'weddings', name: 'منيو الأفراح والمناسبات', icon: '🐑', description: 'ولائم كبار الشخصيات والذبائح الكاملة لأفراحكم ومناسباتكم.' },
  { id: 'general', name: 'الأقسام العامة', icon: '🍲', description: 'الأرزاز، الأكلات الشعبية، المشروبات، والحلى الملكي.' },
];

export const subCategoriesMap: Record<string, { id: string; name: string }[]> = {
  najd: [
    { id: 'all-najd', name: 'كل أطباق نجد' },
    { id: 'najd-main', name: 'الأطباق الرئيسية والقرصان' },
    { id: 'najd-sweets-bakes', name: 'المقشوش والمعجنات النجدية' },
  ],
  weddings: [
    { id: 'all-weddings', name: 'كل ولائم الأفراح' },
    { id: 'whole-sheep', name: 'الذبائح والمفطحات الكاملة' },
    { id: 'vip-trays', name: 'صواني وبوفيهات VIP' },
  ],
  general: [
    { id: 'rice-meat', name: 'الأرزاز واللحوم' },
    { id: 'traditional', name: 'الأكلات الشعبية' },
    { id: 'drinks', name: 'المشروبات التراثية' },
    { id: 'desserts', name: 'الحلى التراثي الملكي' },
  ]
};

export const menuDishes: Dish[] = [
  {
    id: 'n1',
    name: 'المرقوق النجدي الأصيل - قدور الأجداد',
    description: 'رقائق العجين البر الرقيقة المطبوخة بمرق اللحم البلدي والخضار الطازجة على أصول أهل نجد في قدر الأجداد الخاص.',
    price: 55,
    image: 'https://images.unsplash.com/photo-1604908176997-125f2596f378?auto=format&fit=crop&w=800&q=80',
    category: 'najd',
    subCategory: 'najd-main',
    badge: 'توقيع قدور الأجداد',
    calories: '650 سعرة'
  },
  {
    id: 'n2',
    name: 'المقشوش النجدي بالسمن والعسل - قدور الأجداد',
    description: 'فطائر دائرية صغيرة طرية تُخبز على الصاج وتُقدم مغمورة بالسمن البري والعسل الطبيعي بنكهة الزمن الجميل.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    category: 'najd',
    subCategory: 'najd-sweets-bakes',
    badge: 'طعم زمان',
    calories: '480 سعرة'
  },
  {
    id: 'w1',
    name: 'ذبحة الأفراح الكاملة (مفطح ملكي) - قدور الأجداد',
    description: 'خروف حري طازج كامل مطهو على أصول الضيافة السعودية بقدور الأجداد الكبرى، مع الأرز البشاور والمكسرات الفاخرة.',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    category: 'weddings',
    subCategory: 'whole-sheep',
    badge: 'ولائم الأفراح الكبرى',
    calories: 'للشخص ~950 سعرة'
  },
  {
    id: 'r1',
    name: 'مندي لحم البلدي التراثي',
    description: 'لحم طازج مطهو على حطب الحرمان بالدفن التقليدي مع الأرز البشاور الفاخر.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    category: 'general',
    subCategory: 'rice-meat',
    badge: 'الأكثر طلباً',
    calories: '850 سعرة'
  },
  {
    id: 't1',
    name: 'جريش الأجداد باللحم',
    description: 'حب القمح المجروش المطبوع على الشوربة المركزة والسمن البري والبصل المكرمل.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
    category: 'general',
    subCategory: 'traditional',
    badge: 'تراثي أصيل',
    calories: '550 سعرة'
  },
  {
    id: 'd1',
    name: 'القهوة السعودية الفاخرة (دلة)',
    description: 'قهوة خولاني محمصة بعناية مع الهيل الفاخر والزعفران الأصلي.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    category: 'general',
    subCategory: 'drinks',
    badge: 'دلة فاخرة',
    calories: '15 سعرة'
  }
];