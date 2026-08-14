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
  allergens?: string[]; // تم تعديلها لتكون مصفوفة تحتوي على المسببات عشان نقدر نعرض الأيقونات بسهولة
}

export const brandInfo = {
  name: 'قدور الأجداد',
  subtitle: 'أصالة الطبخ السعودي',
  logoUrl: '/logo.png', 
};

// قائمة المبررات أو الـ 14 مسبباً للحساسية مع رموزها أو أسمائها للاستخدام في الأيقونات
export const allergenLabels: Record<string, { name: string; icon: string }> = {
  dairy: { name: 'منتجات ألبان', icon: '🥛' },
  gluten: { name: 'غلوتين (قمح)', icon: '🌾' },
  nuts: { name: 'مكسرات', icon: '🥜' },
  seafood: { name: 'أسماك', icon: '🐟' },
  crustaceans: { name: 'قشريات (روبيان)', icon: '🦐' },
  eggs: { name: 'بيض', icon: '🥚' },
  sesame: { name: 'سمسم', icon: '⚪' },
  soy: { name: 'صويا', icon: '🌱' },
};

export const mainCategories = [
  { id: 'main', name: 'الأطباق الرئيسية والولائم', icon: '🍲', description: 'كبسة، سليق، مشاوي، وألذ الأطباق السعودية.' },
  { id: 'seafood', name: 'المأكولات البحرية', icon: '🦐', description: 'أسماك طازجة وروبيان مشهي.' },
  { id: 'appetizers', name: 'الشوربات والمقبلات', icon: '🥗', description: 'شوربات دافئة، مقبلات باردة، ومقبلات حارة.' },
  { id: 'traditional', name: 'الشعبيات والأطباق الجانبية', icon: '🥘', description: 'المرقوق، الجريش، القرصان والمقشوش.' },
  { id: 'desserts', name: 'الحلويات', icon: '🍯', description: 'حلا شعبي والكلاسيكي يطيب الخاطر.' },
  { id: 'drinks', name: 'المشروبات', icon: '🥤', description: 'عصائر طازجة ومشروبات تراثية باردة.' },
];

export const subCategoriesMap: Record<string, { id: string; name: string }[]> = {
  main: [
    { id: 'all-main', name: 'الكل' },
    { id: 'rice-meat', name: 'أطباق الأرز واللحوم والدجاج' },
    { id: 'grills', name: 'المشاوي' },
    { id: 'stews', name: 'الإدامات' },
  ],
  seafood: [
    { id: 'all-seafood', name: 'الكل' },
    { id: 'fish', name: 'أسماك طازجة' },
    { id: 'shrimp', name: 'روبيان وصدفيات' },
  ],
  appetizers: [
    { id: 'all-appetizers', name: 'الكل' },
    { id: 'soup', name: 'الشوربات' },
    { id: 'cold-appetizers', name: 'المقبلات الباردة والسلطات' },
    { id: 'hot-appetizers', name: 'المقبلات الحارة والمعجنات' },
  ],
  traditional: [
    { id: 'all-traditional', name: 'الكل' },
    { id: 'side-traditional', name: 'الشعبيات الكبرى' },
  ],
  desserts: [
    { id: 'all-desserts', name: 'الكل' },
    { id: 'oriental', name: 'حلويات شرقية وتراثية' },
  ],
  drinks: [
    { id: 'all-drinks', name: 'الكل' },
    { id: 'juices', name: 'عصائر طازجة ومشروبات' },
  ],
};

export const menuDishes: Dish[] = [
  // --- الأطباق الرئيسية والولائم ---
  { id: 'm1', name: 'سليق دجاج', description: 'أرز مصري مطهو بالحليب الطازج والمرق الأصلي مع الدجاج الطري.', price: 32, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'rice-meat', calories: '720 سعرة', allergens: ['dairy'] },
  { id: 'm2', name: 'زروبيان دجاج', description: 'دجاج متبل بالبهارات الخاصة مطهو مع الأرز البشاور.', price: 28, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'rice-meat', calories: '750 سعرة' },
  { id: 'm3', name: 'برياني دجاج', description: 'أرز برياني مع قطع الدجاج الطرية والبصل المقلي والزعفران.', price: 27, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'rice-meat', calories: '700 سعرة', allergens: ['nuts'] },
  { id: 'm4', name: 'مقلوبة دجاج', description: 'أرز بالخضار المقلية والدجاج مطهوة ومقلوبة بعناية.', price: 31, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'rice-meat', calories: '690 سعرة' },
  { id: 'm5', name: 'دجاج فحم', description: 'دجاج مشوي على الفحم الحقيقي بتتبيلة مميزة.', price: 24, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'grills', calories: '580 سعرة' },
  { id: 'm6', name: 'دجاج شواية', description: 'دجاج مشوي طري على السيخ بالطريقة التقليدية.', price: 24, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'grills', calories: '550 سعرة' },
  { id: 'main-2', name: 'مشاوي مشكلة قدور الأجداد', description: 'تشكيلة فاخرة من الكباب، الشيش طاووق، وقطع اللحم المشوية على الفحم.', price: 95, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'grills', calories: '750 سعرة' },
  { id: 'm7', name: 'مشغول روبيان', description: 'روبيان طازج مطهو مع الأرز المشخول والبهارات البحرية.', price: 32, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'rice-meat', calories: '610 سعرة', allergens: ['crustaceans'] },
  { id: 'm8', name: 'مشغول لحم', description: 'لحم بلدي فاخر مطهو مع الأرز المشخول والبصل والزبيب.', price: 78, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'rice-meat', badge: 'فاخر', calories: '890 سعرة', allergens: ['nuts'] },
  { id: 'main-1', name: 'كبسة لحم حاشي فاخرة', description: 'لحم حاشي طازج مطهو مع أرز البسمتي المعطر بأجود البهارات النجدية واللوز المقلي.', price: 75, image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&q=80&w=500', category: 'main', subCategory: 'rice-meat', calories: '680 سعرة', allergens: ['nuts'] },
  { id: 'm9', name: 'كابلي لحم', description: 'لحم بلدي طازج مطهو مع أرز الكابلي وقشر البرتقال والبهارات الخاصة.', price: 78, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'rice-meat', badge: 'الأكثر طلباً', calories: '910 سعرة', allergens: ['nuts'] },
  { id: 'm10', name: 'متلوثة دجاج', description: 'وجبة متلوثة أصيلة بدجاج طري ومرق ثقيل.', price: 34, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'rice-meat', calories: '760 سعرة', allergens: ['gluten'] },
  { id: 'm11', name: 'متلوثة لحم', description: 'وجبة متلوثة ملكية بلحم بلدي طازج.', price: 86, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'rice-meat', badge: 'ملكي', calories: '980 سعرة', allergens: ['gluten'] },
  { id: 'st1', name: 'بامية', description: 'إدام بامية طازجة بمرق الطماطم واللحم.', price: 16, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'stews', calories: '210 سعرة' },
  { id: 'st2', name: 'ملوخية', description: 'ملوخية خضراء طازجة ومطبوخة على الطريقة التقليدية.', price: 14, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'stews', calories: '180 سعرة' },
  { id: 'st3', name: 'مسقعة', description: 'شرائح باذنجان باللحم المفروم وصلصة الطماطم بالفرن.', price: 16, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'stews', calories: '300 سعرة' },
  { id: 'st4', name: 'قرع', description: 'إدام القرع الغني والمغذي.', price: 14, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'main', subCategory: 'stews', calories: '190 سعرة' },

  // --- المأكولات البحرية ---
  { id: 'sea-1', name: 'سمك سي باس مشوي على الفحم', description: 'سمك سي باس طازج مشوي على الفحم بالخلطة الحجازية والأعشاب والليمون.', price: 120, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500', category: 'seafood', subCategory: 'fish', calories: '550 سعرة', allergens: ['seafood'] },
  { id: 'sea-2', name: 'طواجن ربيان بالجبنة', description: 'ربيان طازج مطهو في صوص الكريمة الخاص ومغطى بطبقة من الجبن المذاب.', price: 85, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=500', category: 'seafood', subCategory: 'shrimp', calories: '620 سعرة', allergens: ['crustaceans', 'dairy'] },

  // --- الشوربات والمقبلات ---
  { id: 's1', name: 'عدس', description: 'شوربة عدس دافئة ومغذية على الطريقة التقليدية.', price: 17, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'soup', badge: 'شوربة يومية', calories: '220 سعرة' },
  { id: 's2', name: 'شوربة الحب السعودية', description: 'شوربة الحب السعودية الأصيلة بمرق اللحم والبهارات الفاخرة.', price: 19, image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'soup', badge: 'تقليدي', calories: '280 سعرة', allergens: ['gluten'] },
  { id: 's3', name: 'مقادم', description: 'شوربة المقادم الغنية والمرق الصافي المنكه بالبهارات العطرية.', price: 26, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'soup', badge: 'خاص الأجداد', calories: '350 سعرة' },
  { id: 'ca1', name: 'سلطة البر', description: 'خضار ورقية منتقاة بعناية مع التتبيلة الخاصة.', price: 14, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers', calories: '120 سعرة' },
  { id: 'ca2', name: 'فتوش', description: 'قطع الخضار المقرمشة مع الخبز المحمص ودبس الرمان.', price: 16, image: 'https://images.unsplash.com/photo-1529042410759-befb1205b468?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers', calories: '150 سعرة', allergens: ['gluten'] },
  { id: 'ca3', name: 'تبولة', description: 'بقدونس طازج مفروم مع البرغل والطماطم والنعناع وزيت الزيتون.', price: 14, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers', calories: '120 سعرة', allergens: ['gluten'] },
  { id: 'ca4', name: 'جرجير شمندر', description: 'أوراق جرجير طازجة مع قطع الشمندر الحلو والجوز.', price: 13, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers', calories: '130 سعرة', allergens: ['nuts'] },
  { id: 'ca5', name: 'بامية رمان', description: 'طبق جانبي مميز بنكهة الرمان الحامضة.', price: 18, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers' },
  { id: 'ca6', name: 'سلطة ليم', description: 'سلطة منعشة بنكهة الليمون الخاصة.', price: 12, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers' },
  { id: 'ca7', name: 'سلطة الخضار المشكلة', description: 'تشكيلة خضار طازجة ومقطعة بعناية.', price: 18, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers', calories: '170 سعرة' },
  { id: 'ca8', name: 'حمص', description: 'حمص ناعم مع زيت الزيتون البكر.', price: 13, image: 'https://images.unsplash.com/photo-1577805947697-89e182f9d7c7?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers', calories: '200 سعرة', allergens: ['sesame'] },
  { id: 'ca9', name: 'متبل', description: 'باذنجان مشوي ومهروس مع الطحينة والثوم.', price: 13, image: 'https://images.unsplash.com/photo-1577805947697-89e182f9d7c7?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers', calories: '130 سعرة', allergens: ['sesame', 'dairy'] },
  { id: 'ca10', name: 'كبيبة حائل', description: 'كبيبة شهيرة ومميزة من تراث حائل العريق.', price: 23, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'cold-appetizers', badge: 'تراثي', calories: '310 سعرة', allergens: ['gluten'] },
  { id: 'ha1', name: 'سمبوسة لحم', description: 'عجين مقرمش محشو باللحم المفروم والبهارات الطازجة.', price: 12, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'hot-appetizers', calories: '250 سعرة', allergens: ['gluten'] },
  { id: 'ha2', name: 'سمبوسة دجاج', description: 'محشوة بالدجاج المتبل والخضار.', price: 12, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'hot-appetizers', calories: '230 سعرة', allergens: ['gluten'] },
  { id: 'ha3', name: 'سمبوسة جبن', description: 'مشكلة أجبان غنية وساخنة.', price: 12, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'hot-appetizers', calories: '240 سعرة', allergens: ['gluten', 'dairy'] },
  { id: 'ha4', name: 'عيش أبو اللحم', description: 'فطيرة تقليدية باللحم والكراث والطحينة.', price: 14, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'hot-appetizers', badge: 'مفضل', calories: '320 سعرة', allergens: ['gluten', 'sesame'] },
  { id: 'ha5', name: 'فرموزة', description: 'فرموزة مخبوزة باللحم على الطريقة التقليدية.', price: 14, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'hot-appetizers', calories: '290 سعرة', allergens: ['gluten'] },
  { id: 'ha6', name: 'بف حجازي', description: 'عجين مقلي مقرمش بحشوة الحجاز الأصلية.', price: 12, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'hot-appetizers', calories: '200 سعرة', allergens: ['gluten', 'eggs'] },
  { id: 'ha7', name: 'مطبق مالح', description: 'مطبق مقرمش محشو باللحم والبيض.', price: 12, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'hot-appetizers', calories: '340 سعرة', allergens: ['gluten', 'eggs'] },
  { id: 'ha8', name: 'بطاطا حارة', description: 'مكعبات بطاطا مقلية ومتبلة بالكزبرة والثوم والفلفل الحار.', price: 12, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'hot-appetizers', calories: '280 سعرة' },
  { id: 'ha9', name: 'بطاطس مقلي', description: 'أصابع بطاطس مقلية ذهبية ومقرمشة.', price: 8, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80', category: 'appetizers', subCategory: 'hot-appetizers', calories: '260 سعرة' },

  // --- الشعبيات والأطباق الجانبية ---
  { id: 'n1', name: 'المرقوق النجدي الأصيل', description: 'رقائق العجين البر الرقيقة المطبوخة بمرق اللحم البلدي والخضار الطازجة.', price: 24, image: 'https://images.unsplash.com/photo-1604908176997-125f2596f378?auto=format&fit=crop&w=800&q=80', category: 'traditional', subCategory: 'side-traditional', badge: 'توقيع قدور الأجداد', calories: '650 سعرة', allergens: ['gluten'] },
  { id: 'sd1', name: 'قرصان', description: 'طبق شعبي أصيل محضر بعناية فائقة.', price: 23, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'traditional', subCategory: 'side-traditional', calories: '520 سعرة', allergens: ['gluten'] },
  { id: 'sd2', name: 'جريش حائلي', description: 'جريش على الطريقة الحائلية الأصيلة بالسمن والبهارات.', price: 24, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'traditional', subCategory: 'side-traditional', badge: 'مميز', calories: '560 سعرة', allergens: ['dairy', 'gluten'] },
  { id: 'sd3', name: 'جريش نجدي', description: 'حب القمح المجروش المطبوخ على الشوربة المركزة والبصل المكرمل.', price: 22, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', category: 'traditional', subCategory: 'side-traditional', calories: '540 سعرة', allergens: ['dairy', 'gluten'] },
  { id: 'sd4', name: 'مكرونة بشاميل', description: 'مكرونة بالبشاميل واللحم المفروم المحمرة بالفرن.', price: 21, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', category: 'traditional', subCategory: 'side-traditional', calories: '600 سعرة', allergens: ['gluten', 'dairy'] },

  // --- الحلويات ---
  { id: 'ds1', name: 'كريم كراميل', description: 'حلا كلاسيكي ناعم بصوص الكراميل المحمص.', price: 19, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'desserts', subCategory: 'oriental', calories: '310 سعرة', allergens: ['dairy', 'eggs'] },
  { id: 'ds2', name: 'مهلبية ورد', description: 'مهلبية تقليدية منكهة بماء الورد والفستق.', price: 17, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'desserts', subCategory: 'oriental', calories: '260 سعرة', allergens: ['dairy', 'nuts'] },
  { id: 'ds3', name: 'ساكو', description: 'حلا شعبي تقليدي غني ومميز.', price: 18, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'desserts', subCategory: 'oriental', calories: '290 سعرة' },
  { id: 'ds4', name: 'بسبوسة قشطة', description: 'بسبوسة طرية محشوة بالقشطة الطازجة ومسقية بالشيرة.', price: 15, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'desserts', subCategory: 'oriental', calories: '380 سعرة', allergens: ['gluten', 'dairy'] },
  { id: 'ds5', name: 'كنافة قشطة', description: 'كنافة مقرمشة محشوة بالقشطة الفاخرة.', price: 14, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', category: 'desserts', subCategory: 'oriental', calories: '410 سعرة', allergens: ['gluten', 'dairy', 'nuts'] },
  { id: 'ds6', name: 'حنييني', description: 'تمر منقوع ومعجون بالبر والسمن البري.', price: 16, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'desserts', subCategory: 'oriental', badge: 'تراثي دافئ', calories: '450 سعرة', allergens: ['gluten', 'dairy'] },
  { id: 'ds7', name: 'لقيمات', description: 'كرات العجين المقرمشة مغمورة بدبس التمر أو العسل.', price: 14, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'desserts', subCategory: 'oriental', calories: '340 سعرة', allergens: ['gluten'] },
  { id: 'ds8', name: 'مراصيع عسل', description: 'فطائر دائرية صغيرة تقدم مع العسل البري.', price: 14, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'desserts', subCategory: 'oriental', calories: '320 سعرة', allergens: ['gluten', 'dairy'] },
  { id: 'n2', name: 'المقشوش النجدي', description: 'فطائر دائرية صغيرة طرية تُقدم مغمورة بالسمن البري والعسل الطبيعي.', price: 35, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', category: 'desserts', subCategory: 'oriental', badge: 'طعم زمان', calories: '480 سعرة', allergens: ['gluten', 'dairy'] },

  // --- المشروبات ---
  { id: 'dr1', name: 'كركديه ورد', description: 'مشروب كركديه بارد ومنعش بنكهة الورد.', price: 12, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'drinks', subCategory: 'juices', calories: '90 سعرة' },
  { id: 'dr2', name: 'ليمون نعناع', description: 'عصير ليمون طازج مع أوراق النعناع الأخضر.', price: 15, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'drinks', subCategory: 'juices', calories: '110 سعرة' },
  { id: 'dr3', name: 'برتقال', description: 'عصير برتقال طازج ومعصور عصراً كاملاً.', price: 18, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'drinks', subCategory: 'juices', calories: '120 سعرة' },
  { id: 'dr4', name: 'بطيخ', description: 'عصير بطيخ بارد ومروي في الصيف.', price: 18, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'drinks', subCategory: 'juices', calories: '80 سعرة' },
  { id: 'dr5', name: 'لبن القرية', description: 'لبن طازج وبلدي.', price: 5, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'drinks', subCategory: 'juices', calories: '100 سعرة', allergens: ['dairy'] },
  { id: 'dr6', name: 'لبن قدور الأجداد', description: 'لبن خاص محضر خصيصاً لمطعم قدور الأجداد.', price: 9, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'drinks', subCategory: 'juices', badge: 'خاص', calories: '110 سعرة', allergens: ['dairy'] },
  { id: 'dr7', name: 'مشروبات غازية', description: 'تشكيلة مشروبات غازية باردة.', price: 5, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', category: 'drinks', subCategory: 'juices', calories: '140 سعرة' }
];