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
  allergens?: string; 
}

export const brandInfo = {
  name: 'قدور الأجداد',
  subtitle: 'أصالة الطبخ السعودي',
  logoUrl: '/logo.png', 
};

export const mainCategories = [
  { id: 'general', name: 'الأقسام العامة واليومية', icon: '🍲', description: 'الشوربات، المقبلات الباردة والحارة، الإدامات، الأطباق الرئيسية، الحلا والمشروبات.' },
  { id: 'weddings', name: 'منيو الأفراح والمناسبات', icon: '🐑', description: 'ولائم كبار الشخصيات والذبائح الكاملة لأفراحكم ومناسباتكم.' },
];

export const subCategoriesMap: Record<string, { id: string; name: string }[]> = {
  general: [
    { id: 'all-general', name: 'كل الأطباق العامة' },
    { id: 'soup', name: 'الشوربات' },
    { id: 'cold-appetizers', name: 'السلطات والمقبلات الباردة' },
    { id: 'hot-appetizers', name: 'المقبلات الحارة' },
    { id: 'stews', name: 'الإدامات' },
    { id: 'side-traditional', name: 'الشعبيات والأطباق الجانبية' },
    { id: 'main-dishes', name: 'الأطباق الرئيسية' },
    { id: 'desserts', name: 'الحلا والمقشوش' },
    { id: 'drinks', name: 'المشروبات التراثية' },
  ],
  weddings: [
    { id: 'all-weddings', name: 'كل ولائم الأفراح' },
    { id: 'whole-sheep', name: 'الذبائح والمفطحات الكاملة' },
    { id: 'vip-trays', name: 'صواني وبوفيهات VIP' },
  ]
};

export const menuDishes: Dish[] = [
  // --- الشوربات ---
  { id: 's1', name: 'عدس', description: 'شوربة عدس دافئة ومغذية على الطريقة التقليدية.', price: 17, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'soup', badge: 'شوربة يومية', calories: '220 سعرة', allergens: 'بدون' },
  { id: 's2', name: 'شوربة الحب السعودية', description: 'شوربة الحب السعودية الأصيلة بمرق اللحم والبهارات الفاخرة.', price: 19, image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'soup', badge: 'تقليدي', calories: '280 سعرة', allergens: 'قمح، جلوتين' },
  { id: 's3', name: 'مقادم', description: 'شوربة المقادم الغنية والمرق الصافي المنكه بالبهارات العطرية.', price: 26, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'soup', badge: 'خاص الأجداد', calories: '350 سعرة', allergens: 'منتجات ألبان' },

  // --- السلطات والمقبلات الباردة ---
  { id: 'ca1', name: 'سلطة البر', description: 'خضار ورقية منتقاة عناية مع التتبيلة الخاصة.', price: 14, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', calories: '120 سعرة', allergens: 'خضار طازجة' },
  { id: 'ca2', name: 'فتوش', description: 'قطع الخضار المقرمشة مع الخبز المحمص ودبس الرمان.', price: 16, image: 'https://images.unsplash.com/photo-1529042410759-befb1205b468?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', calories: '150 سعرة', allergens: 'جلوتين (الخبز)' },
  { id: 'ca3', name: 'تبولة', description: 'بقدونس طازج مفروم مع البرغل والطماطم والنعناع وزيت الزيتون.', price: 14, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', calories: '120 سعرة', allergens: 'برغل (قمح)' },
  { id: 'ca4', name: 'جرجير شمندر', description: 'أوراق جرجير طازجة مع قطع الشمندر الحلو والجوز.', price: 13, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', calories: '130 سعرة', allergens: 'مكسرات (جوز)' },
  { id: 'ca5', name: 'بامية رمان', description: 'طبق جانبي مميز بنكهة الرمان الحامضة.', price: 18, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', calories: '0', allergens: 'بدون' },
  { id: 'ca6', name: 'سلطة ليم', description: 'سلطة منعشة بنكهة الليمون الخاصة.', price: 12, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', calories: '1000 سعرة', allergens: 'بدون' },
  { id: 'ca7', name: 'سلطة الخضار المشكلة', description: 'تشكيلة خضار طازجة ومقطعة بعناية.', price: 18, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', calories: '170 سعرة', allergens: 'بدون' },
  { id: 'ca8', name: 'حمص', description: 'حمص ناعم مع زيت الزيتون البكر.', price: 13, image: 'https://images.unsplash.com/photo-1577805947697-89e182f9d7c7?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', calories: '200 سعرة', allergens: 'سمسم (طحينة)' },
  { id: 'ca9', name: 'متبل', description: 'باذنجان مشوي ومهروس مع الطحينة والثوم.', price: 13, image: 'https://images.unsplash.com/photo-1577805947697-89e182f9d7c7?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', calories: '130 سعرة', allergens: 'سمسم (طحينة)' },
  { id: 'ca10', name: 'كبيبة حائل', description: 'كبيبة شهيرة ومميزة من تراث حائل العريق.', price: 23, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'cold-appetizers', badge: 'تراثي', calories: '310 سعرة', allergens: 'قمح' },

  // --- المقبلات الحارة ---
  { id: 'ha1', name: 'سمبوسة لحم', description: 'عجين مقرمش محشو باللحم المفروم والبهارات الطازجة.', price: 12, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'hot-appetizers', calories: '250 سعرة', allergens: 'جلوتين (العجين)' },
  { id: 'ha2', name: 'سمبوسة دجاج', description: 'محشوة بالدجاج المتبل والخضار.', price: 12, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'hot-appetizers', calories: '230 سعرة', allergens: 'جلوتين (العجين)' },
  { id: 'ha3', name: 'سمبوسة جبن', description: 'مشكلة أجبان غنية وساخنة.', price: 12, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'hot-appetizers', calories: '240 سعرة', allergens: 'منتجات ألبان، جلوتين' },
  { id: 'ha4', name: 'عيش أبو اللحم', description: 'فطيرة تقليدية باللحم والكراث والطحينة.', price: 14, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'hot-appetizers', badge: 'مفضل', calories: '320 سعرة', allergens: 'سمسم، جلوتين' },
  { id: 'ha5', name: 'فرموزة', description: 'فرموزة مخبوزة باللحم على الطريقة التقليدية.', price: 14, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'hot-appetizers', calories: '290 سعرة', allergens: 'جلوتين' },
  { id: 'ha6', name: 'بف حجازي', description: 'عجين مقلي مقرمش بحشوة الحجاز الأصلية.', price: 12, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'hot-appetizers', calories: '200 سعرة', allergens: 'جلوتين، بيض' },
  { id: 'ha7', name: 'مطبق مالح', description: 'مطبق مقرمش محشو باللحم والبيض.', price: 12, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'hot-appetizers', calories: '340 سعرة', allergens: 'بيض، جلوتين' },
  { id: 'ha8', name: 'بطاطا حارة', description: 'مكعبات بطاطا مقلية ومتبلة بالكزبرة والثوم والفلفل الحار.', price: 12, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'hot-appetizers', calories: '280 سعرة', allergens: 'بدون' },
  { id: 'ha9', name: 'بطاطس مقلي', description: 'أصابع بطاطس مقلية ذهبية ومقرمشة.', price: 8, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'hot-appetizers', calories: '260 سعرة', allergens: 'بدون' },

  // --- الإدامات ---
  { id: 'st1', name: 'بامية', description: 'إدام بامية طازجة بمرق الطماطم واللحم.', price: 16, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'stews', calories: '210 سعرة', allergens: 'لحم' },
  { id: 'st2', name: 'ملوخية', description: 'ملوخية خضراء طازجة ومطبوخة على الطريقة التقليدية.', price: 14, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'stews', calories: '180 سعرة', allergens: 'ثوم' },
  { id: 'st3', name: 'مسقعة', description: 'شرائح باذنجان باللحم المفروم وصلصة الطماطم بالفرن.', price: 16, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'stews', calories: '300 سعرة', allergens: 'لحم' },
  { id: 'st4', name: 'قرع', description: 'إدام القرع الغني والمغذي.', price: 14, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'stews', calories: '190 سعرة', allergens: 'بدون' },

  // --- الشعبيات والأطباق الجانبية ---
  { id: 'n1', name: 'المرقوق النجدي الأصيل', description: 'رقائق العجين البر الرقيقة المطبوخة بمرق اللحم البلدي والخضار الطازجة.', price: 24, image: 'https://images.unsplash.com/photo-1604908176997-125f2596f378?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'side-traditional', badge: 'توقيع قدور الأجداد', calories: '650 سعرة', allergens: 'قمح (جلوتين)' },
  { id: 'sd1', name: 'قرصان', description: 'طبق شعبي أصيل محضر بعناية فائقة.', price: 23, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'side-traditional', calories: '520 سعرة', allergens: 'قمح' },
  { id: 'sd2', name: 'جريش حائلي', description: 'جريش على الطريقة الحائلية الأصيلة بالسمن والبهارات.', price: 24, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'side-traditional', badge: 'مميز', calories: '560 سعرة', allergens: 'قمح، منتجات ألبان' },
  { id: 'sd3', name: 'جريش نجدي', description: 'حب القمح المجروش المطبوخ على الشوربة المركزة والبصل المكرمل.', price: 22, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'side-traditional', calories: '540 سعرة', allergens: 'قمح، منتجات ألبان' },
  { id: 'sd4', name: 'مكرونة بشاميل', description: 'مكرونة بالبشاميل واللحم المفروم المحمرة بالفرن.', price: 21, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'side-traditional', calories: '600 سعرة', allergens: 'جلوتين، منتجات ألبان' },

  // --- الأطباق الرئيسية ---
  { id: 'm1', name: 'سليق دجاج', description: 'أرز مصري مطهو بالحليب الطازج والمرق الأصلي مع الدجاج الطري.', price: 32, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', calories: '720 سعرة', allergens: 'منتجات ألبان (حليب)' },
  { id: 'm2', name: 'زروبيان دجاج', description: 'دجاج متبل بالبهارات الخاصة مطهو مع الأرز البشاور.', price: 28, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', calories: '750 سعرة', allergens: 'بهارات حارة' },
  { id: 'm3', name: 'برياني دجاج', description: 'أرز برياني مع قطع الدجاج الطرية والبصل المقلي والزعفران.', price: 27, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', calories: '700 سعرة', allergens: 'مكسرات' },
  { id: 'm4', name: 'مقلوبة دجاج', description: 'أرز بالخضار المقلية والدجاج مطهوة ومقلوبة بعناية.', price: 31, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', calories: '690 سعرة', allergens: 'خضار مقلية' },
  { id: 'm5', name: 'دجاج فحم', description: 'دجاج مشوي على الفحم الحقيقي بتتبيلة مميزة.', price: 24, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', calories: '580 سعرة', allergens: 'دجاج مشوي' },
  { id: 'm6', name: 'دجاج شواية', description: 'دجاج مشوي طري على السيخ بالطريقة التقليدية.', price: 24, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', calories: '550 سعرة', allergens: 'دجاج' },
  { id: 'm7', name: 'مشغول روبيان', description: 'روبيان طازج مطهو مع الأرز المشخول والبهارات البحرية.', price: 32, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', calories: '610 سعرة', allergens: 'قشريات (روبيان)' },
  { id: 'm8', name: 'مشغول لحم', description: 'لحم بلدي فاخر مطهو مع الأرز المشخول والبصل والزبيب.', price: 78, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', badge: 'فاخر', calories: '890 سعرة', allergens: 'لحم بلدي' },
  { id: 'm9', name: 'كابلي لحم', description: 'لحم بلدي طازج مطهو مع أرز الكابلي وقشر البرتقال والبهارات الخاصة.', price: 78, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', badge: 'الأكثر طلباً', calories: '910 سعرة', allergens: 'لحم بلدي' },
  { id: 'm10', name: 'متلوثة دجاج', description: 'وجبة متلوثة أصيلة بدجاج طري ومرق ثقيل.', price: 34, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', calories: '760 سعرة', allergens: 'قمح، دجاج' },
  { id: 'm11', name: 'متلوثة لحم', description: 'وجبة متلوثة ملكية بلحم بلدي طازج.', price: 86, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', badge: 'ملكي', calories: '980 سعرة', allergens: 'قمح، لحم بلدي' },
  { id: 'm12', name: 'ولائم الطلبات الخاصة', description: 'كابلي - زروبيان - مندي - شعبي مقمر (حسب السعر اليومي).', price: 0, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'main-dishes', badge: 'ولائم', allergens: 'حسب الطلب' },

  // --- الحلا ---
  { id: 'ds1', name: 'كريم كراميل', description: 'حلا كلاسيكي ناعم بصوص الكراميل المحمص.', price: 19, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'desserts', calories: '310 سعرة', allergens: 'منتجات ألبان، بيض' },
  { id: 'ds2', name: 'مهلبية ورد', description: 'مهلبية تقليدية منكهة بماء الورد والفستق.', price: 17, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'desserts', calories: '260 سعرة', allergens: 'منتجات ألبان، مكسرات (فستق)' },
  { id: 'ds3', name: 'ساكو', description: 'حلا شعبي تقليدي غني ومميز.', price: 18, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'desserts', calories: '290 سعرة', allergens: 'نشا' },
  { id: 'ds4', name: 'بسبوسة قشطة', description: 'بسبوسة طرية محشوة بالقشطة الطازجة ومسقية بالشيرة.', price: 15, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'desserts', calories: '380 سعرة', allergens: 'سميد (قمح)، منتجات ألبان' },
  { id: 'ds5', name: 'كنافة قشطة', description: 'كنافة مقرمشة محشوة بالقشطة الفاخرة.', price: 14, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'desserts', calories: '410 سعرة', allergens: 'جلوتين، منتجات ألبان' },
  { id: 'ds6', name: 'حنييني', description: 'تمر منقوع ومعجون بالبر والسمن البري.', price: 16, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'desserts', badge: 'تراثي دافئ', calories: '450 سعرة', allergens: 'قمح، منتجات ألبان (سمن)' },
  { id: 'ds7', name: 'لقيمات', description: 'كرات العجين المقرمشة مغمورة بدبس التمر أو العسل.', price: 14, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'desserts', calories: '340 سعرة', allergens: 'جلوتين' },
  { id: 'ds8', name: 'مراصيع عسل', description: 'فطائر دائرية صغيرة تقدم مع العسل البري.', price: 14, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'desserts', calories: '320 سعرة', allergens: 'جلوتين، بيض' },
  { id: 'n2', name: 'المقشوش النجدي', description: 'فطائر دائرية صغيرة طرية تُقدم مغمورة بالسمن البري والعسل الطبيعي.', price: 35, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'desserts', badge: 'طعم زمان', calories: '480 سعرة', allergens: 'قمح، منتجات ألبان' },

  // --- المشروبات ---
  { id: 'dr1', name: 'كركديه ورد', description: 'مشروب كركديه بارد ومنعش بنكهة الورد.', price: 12, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'drinks', calories: '90 سعرة', allergens: 'بدون' },
  { id: 'dr2', name: 'ليمون نعناع', description: 'عصير ليمون طازج مع أوراق النعناع الأخضر.', price: 15, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'drinks', calories: '110 سعرة', allergens: 'بدون' },
  { id: 'dr3', name: 'برتقال', description: 'عصير برتقال طازج ومعصور عصراً كاملاً.', price: 18, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'drinks', calories: '120 سعرة', allergens: 'بدون' },
  { id: 'dr4', name: 'بطيخ', description: 'عصير بطيخ بارد ومروي في الصيف.', price: 18, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'drinks', calories: '80 سعرة', allergens: 'بدون' },
  { id: 'dr5', name: 'لبن القرية', description: 'لبن طازج وبلدي.', price: 5, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'drinks', calories: '100 سعرة', allergens: 'منتجات ألبان' },
  { id: 'dr6', name: 'لبن قدور الأجداد', description: 'لبن خاص محضر خصيصاً لمطعم قدور الأجداد.', price: 9, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'drinks', badge: 'خاص', calories: '110 سعرة', allergens: 'منتجات ألبان' },
  { id: 'dr7', name: 'مشروبات غازية', description: 'تشكيلة مشروبات غازية باردة.', price: 5, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'general', subCategory: 'drinks', calories: '140 سعرة', allergens: 'غازية' },

  // --- منيو الأفراح والمناسبات ---
  { id: 'w1', name: 'ذبحة الأفراح الكاملة', description: 'خروف حري طازج كامل مطهو على أصول الضيافة السعودية.', price: 1850, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'weddings', subCategory: 'whole-sheep', badge: 'ولائم الأفراح الكبرى', calories: '950 سعرة', allergens: 'مكسرات، لحم' },
  { id: 'w2', name: 'صينية ضيافة VIP', description: 'تشكيلة ملكية من لحم الحري مع الأرز الفاخر والجريش والمخللات.', price: 950, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', category: 'weddings', subCategory: 'vip-trays', badge: 'كبار الشخصيات', calories: 'تكفي 10 أشخاص', allergens: 'قمح، مكسرات، لحم' }
];