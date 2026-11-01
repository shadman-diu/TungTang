// ===================================================
//  TungTang -- Product & Collection Data
// ===================================================

const COLLECTIONS = [
  { id:'handmade', name:'\u09b9\u09be\u09a4\u09c7\u09b0 \u09a4\u09c8\u09b0\u09c0 \u099a\u09c1\u09dc\u09bf', slug:'handmade-churi', desc:'\u201c\u09a8\u09bf\u09b6\u09c0\u09a5\u201d, \u201c\u09b2\u09c0\u09b2\u09be\u201d, \u201c\u09a8\u09c0\u09b2\u09be\u099e\u09cd\u099c\u09a8\u09be\u201d \u0993 \u201c\u0985\u0999\u09cd\u0997\u09a8\u09be\u201d \u09b8\u09b9 \u09a8\u09bf\u099c\u09b8\u09cd\u09ac \u09b9\u09be\u09a4\u09c7 \u09a4\u09c8\u09b0\u09bf \u099f\u09cd\u09b0\u09c7\u09a8\u09cd\u09a1\u09bf \u0993 \u09b8\u09cd\u099f\u09c7\u099f\u09ae\u09c7\u09a8\u09cd\u099f \u099a\u09c1\u09dc\u09bf\u09b0 \u098f\u0995\u09cd\u09b8\u0995\u09cd\u09b2\u09c1\u09b8\u09bf\u09ad \u0995\u09be\u09b2\u09c7\u0995\u09b6\u09a8\u0964', image:'images/leela-1.jpg', count:7, badge:'Bestseller \u2728' },
  { id:'earrings', name:'\u0995\u09be\u09a8\u09c7\u09b0 \u09a6\u09c1\u09b2', slug:'earrings', desc:'\u099a\u09c1\u09dc\u09bf\u09b0 \u09b8\u09be\u09a5\u09c7 \u09aa\u09be\u09b0\u09ab\u09c7\u0995\u09cd\u099f \u09ae\u09cd\u09af\u09be\u099a\u09bf\u0982 \u099f\u09cd\u09b0\u09c7\u09a8\u09cd\u09a1\u09bf \u09b9\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u09ae\u09c7\u09a1 \u0995\u09be\u09a8\u09c7\u09b0 \u09a6\u09c1\u09b2 \u0993 \u099d\u09c1\u09ae\u0995\u09be\u0964', image:'images/earrings-collection.jpg', count:0, badge:'Dropping Soon \ud83c\udf38' },
  { id:'combo', name:'\u099a\u09c1\u09dc\u09bf \u09a6\u09c1\u09b2 \u0995\u09ae\u09cd\u09ac\u09cb', slug:'combo-sets', desc:'\u09b9\u09be\u09a4\u09c7\u09b0 \u099a\u09c1\u09dc\u09bf \u0993 \u0995\u09be\u09a8\u09c7\u09b0 \u09a6\u09c1\u09b2\u09c7\u09b0 \u0986\u0995\u09b0\u09cd\u09b7\u09a3\u09c0\u09af\u09bc \u0995\u09bf\u0989\u09b0\u09c7\u099f\u09c7\u09a1 \u0995\u09ae\u09cd\u09ac\u09cb \u09b8\u09c7\u099f\u0964', image:'images/combo-collection.jpg', count:0, badge:'Special Combo \ud83c\udf81' },
];

const OCCASIONS = [
  { name:'Wedding',   emoji:'💍', color:'#7B1C3A', image:'https://lh3.googleusercontent.com/d/1_0tTNUA1gEhLUm8uooYEHGSy352Mx1d7', bn:'বিয়ে ও ব্রাইডাল'},
  { name:'Party',     emoji:'✨', color:'#9E2748', image:'images/angona-1.jpg', bn:'পার্টি ও উৎসব'},
  { name:'Eid',       emoji:'🌙', color:'#C9A84C', image:'images/leela-1.jpg', bn:'ঈদ স্পেশাল'},
  { name:'Everyday',  emoji:'🌸', color:'#2D6A4F', image:'https://lh3.googleusercontent.com/d/1ckfqmEkp8NCkJ6zroCBHa0v92SGNOlXd', bn:'প্রতিদিনের সাজ'},
  { name:'Gift',      emoji:'🎁', color:'#4A90E2', image:'https://lh3.googleusercontent.com/d/1Xqkw9p0im-Hn_3dW8BzUneGzvShIjySl', bn:'উপহার'},
];

const PRODUCTS = [
  {
    id: 1,
    name: '\u201c\u09a8\u09bf\u09b6\u09c0\u09a5\u201d \ud83d\udda4',
    slug: 'nishith-handmade-bangles',
    category: 'churi',
    categoryLabel: '\u09b9\u09be\u09a4\u09c7\u09b0 \u099a\u09c1\u09dc\u09bf (Churi)',
    price: 650,
    originalPrice: 850,
    discount: 24,
    images: [
      'images/nishith-1.jpg',
      'images/nishith-2.jpg',
      'images/nishith-3.jpg',
      'images/nishith-4.jpg'
    ],
    sizes: ['2.2', '2.4', '2.6', '2.8', '2.10'],
    colors: ['#0A0A0A', '#C9A84C'],
    colorNames: ['\u09a8\u09bf\u09b6\u09c0\u09a5 \u0995\u09be\u09b2\u09cb \u0993 \u09b8\u09cb\u09a8\u09be\u09b2\u09bf (Black & Gold)'],
    rating: 5.0,
    reviewCount: 36,
    stock: 25,
    description: `\u201c\u09a8\u09bf\u09b6\u09c0\u09a5\u201d \ud83d\udda4
\u09b0\u09be\u09a4\u09c7\u09b0 \u09a8\u09c0\u09b0\u09ac\u09a4\u09be\u09af\u09bc, \u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u098f\u0995 \u0986\u09ad\u09be\u0964

\u2728 \u09aa\u09cd\u09b0\u09a4\u09bf\u099f\u09bf \u099a\u09c1\u09dc\u09bf \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09bf\u099c\u09c7\u09b0 \u09b9\u09be\u09a4\u09c7 \u09a4\u09c8\u09b0\u09bf\u0964
\u2728 \u0989\u09aa\u09be\u09a6\u09be\u09a8: \u09aa\u09cd\u09b0\u09bf\u09ae\u09bf\u09af\u09bc\u09be\u09ae \u09b0\u09c7\u09b6\u09ae \u09b8\u09c1\u09a4\u09be (Silk Thread), \u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u099c\u09b0\u09bf \u0993 \u099f\u09cd\u09b0\u09be\u09af\u09bc\u09be\u0999\u09cd\u0997\u09c7\u09b2 \u0995\u09c1\u09a8\u09cd\u09a6\u09a8 \u09b8\u09cd\u099f\u09cb\u09a8\u0964
\u2728 \u09b8\u09be\u0987\u099c: \u09b8\u09ac \u09b8\u09be\u0987\u099c \u098f\u09ad\u09c7\u0987\u09b2\u09c7\u09ac\u09b2 (2.2, 2.4, 2.6, 2.8, 2.10)\u0964
\u2728 \u09b8\u09be\u09b0\u09be\u09a6\u09c7\u09b6\u09c7 \u0995\u09cd\u09af\u09be\u09b6 \u0985\u09a8 \u09a1\u09c7\u09b2\u09bf\u09ad\u09be\u09b0\u09bf (Cash on Delivery) \u09b8\u09c1\u09ac\u09bf\u09a7\u09be\u0964`,
    material: '\u09aa\u09cd\u09b0\u09bf\u09ae\u09bf\u09af\u09bc\u09be\u09ae \u09b0\u09c7\u09b6\u09ae \u09b8\u09c1\u09a4\u09be, \u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u099c\u09b0\u09bf \u0993 \u099f\u09cd\u09b0\u09be\u09af\u09bc\u09be\u0999\u09cd\u0997\u09c7\u09b2 \u0995\u09c1\u09a8\u09cd\u09a6\u09a8 \u0997\u09cd\u09b2\u09be\u09b8 \u09b8\u09cd\u099f\u09cb\u09a8',
    occasion: ['party', 'wedding', 'eid', 'everyday', 'gift'],
    featured: true,
    bestseller: true,
    newArrival: true,
    tags: ['nishith', '\u09a8\u09bf\u09b6\u09c0\u09a5', 'churi', 'black', 'gold', 'silk', 'kundan', 'bridal', 'glass', 'metal', 'gift', 'handmade'],
  },
  {
    id: 2,
    name: '\u201c\u09b2\u09c0\u09b2\u09be\u201d \u2764\ufe0f',
    slug: 'leela-handmade-bangles',
    category: 'churi',
    categoryLabel: '\u09b9\u09be\u09a4\u09c7\u09b0 \u099a\u09c1\u09dc\u09bf (Churi)',
    price: 650,
    originalPrice: 850,
    discount: 24,
    images: [
      'images/leela-1.jpg',
      'images/leela-2.jpg'
    ],
    sizes: ['2.2', '2.4', '2.6', '2.8', '2.10'],
    colors: ['#C41E3A', '#D4AF37'],
    colorNames: ['\u09b0\u09c1\u09ac\u09bf \u09b0\u09c7\u09a1 \u0993 \u0997\u09cb\u09b2\u09cd\u09a1 (Ruby Red & Gold)'],
    rating: 5.0,
    reviewCount: 28,
    stock: 20,
    description: `\u201c\u09b2\u09c0\u09b2\u09be\u201d \u2764\ufe0f
\u0995\u0996\u09a8\u09cb \u09b0\u0999\u09c7, \u0995\u0996\u09a8\u09cb \u0986\u09b2\u09cb\u09af\u09bc,
\u0995\u0996\u09a8\u09cb \u09ac\u09be \u09a8\u09bf\u0983\u09b6\u09ac\u09cd\u09a6 \u09b8\u09cc\u09a8\u09cd\u09a6\u09b0\u09cd\u09af\u09c7\u2014
\u09b2\u09c0\u09b2\u09be \u09a8\u09bf\u099c\u09c7\u09b0 \u09ae\u09a4\u09cb \u0995\u09b0\u09c7\u0987 \u09ae\u09c1\u0997\u09cd\u09a7 \u0995\u09b0\u09c7\u0964

\u2728 \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09bf\u099c\u09c7\u09b0 \u09b9\u09be\u09a4\u09c7 \u09a8\u09bf\u0996\u09c1\u0981\u09a4 \u09ab\u09bf\u09a8\u09bf\u09b6\u09bf\u0982\u09af\u09bc\u09c7 \u09a4\u09c8\u09b0\u09bf \u09b0\u09c7\u09b6\u09ae \u09b8\u09c1\u09a4\u09be\u09b0 \u099a\u09c1\u09dc\u09bf\u0964
\u2728 \u0989\u09aa\u09be\u09a6\u09be\u09a8: \u0989\u099c\u09cd\u099c\u09cd\u09ac\u09b2 \u09b2\u09be\u09b2 \u09b0\u09c7\u09b6\u09ae \u09b8\u09c1\u09a4\u09be (Crimson Silk Thread) \u0993 \u0997\u09cb\u09b2\u09cd\u09a1\u09c7\u09a8 \u09ab\u09cd\u09b0\u09c7\u09ae\u09c7 \u09ac\u09be\u0981\u09a7\u09be\u09a8\u09cb \u09b0\u09c1\u09ac\u09bf \u09b8\u09cd\u099f\u09cb\u09a8\u0964
\u2728 \u09b8\u09be\u0987\u099c: \u09b8\u09ac \u09b8\u09be\u0987\u099c \u098f\u09ad\u09c7\u0987\u09b2\u09c7\u09ac\u09b2 (2.2, 2.4, 2.6, 2.8, 2.10)\u0964
\u2728 \u09b8\u09be\u09b0\u09be\u09a6\u09c7\u09b6\u09c7 \u0995\u09cd\u09af\u09be\u09b6 \u0985\u09a8 \u09a1\u09c7\u09b2\u09bf\u09ad\u09be\u09b0\u09bf (Cash on Delivery) \u09b8\u09c1\u09ac\u09bf\u09a7\u09be\u0964`,
    material: '\u09b2\u09be\u09b2 \u09b0\u09c7\u09b6\u09ae \u09b8\u09c1\u09a4\u09be \u0993 \u0997\u09cb\u09b2\u09cd\u09a1\u09c7\u09a8 \u09ab\u09cd\u09b0\u09c7\u09ae\u09c7 \u09ac\u09be\u0981\u09a7\u09be\u09a8\u09cb \u09b0\u09c1\u09ac\u09bf \u0997\u09cd\u09b2\u09be\u09b8 \u09b8\u09cd\u099f\u09cb\u09a8',
    occasion: ['wedding', 'party', 'eid', 'everyday', 'gift'],
    featured: true,
    bestseller: true,
    newArrival: true,
    tags: ['leela', '\u09b2\u09c0\u09b2\u09be', 'churi', 'red', 'ruby', 'gold', 'silk', 'bridal', 'gift', 'handmade'],
  },
  {
    id: 3,
    name: '\u201c\u09a8\u09c0\u09b2\u09be\u099e\u09cd\u099c\u09a8\u09be\u201d \ud83d\udc99',
    slug: 'nilanjana-handmade-bangles',
    category: 'churi',
    categoryLabel: '\u09b9\u09be\u09a4\u09c7\u09b0 \u099a\u09c1\u09dc\u09bf (Churi)',
    price: 650,
    originalPrice: 850,
    discount: 24,
    images: [
      'images/nilanjana-1.jpg'
    ],
    sizes: ['2.2', '2.4', '2.6', '2.8', '2.10'],
    colors: ['#1A3A6B', '#C9A84C'],
    colorNames: ['\u09a8\u09c0\u09b2 \u0993 \u09b8\u09cb\u09a8\u09be\u09b2\u09bf (Blue & Gold)'],
    rating: 5.0,
    reviewCount: 18,
    stock: 20,
    description: `'\u09a8\u09c0\u09b2\u09be\u099e\u09cd\u099c\u09a8\u09be' \ud83d\udc99
\u09b0\u0999\u09c7 \u09a8\u09c0\u09b2, \u099b\u09cb\u0981\u09af\u09bc\u09be\u09af\u09bc \u09b8\u09cb\u09a8\u09be\u09b2\u09bf,
\u09b8\u09cc\u09a8\u09cd\u09a6\u09b0\u09cd\u09af\u09c7 \u098f\u0995\u09c7\u09ac\u09be\u09b0\u09c7\u0987 \u0985\u09a8\u09a8\u09cd\u09af\u0964
\u0990\u09a4\u09bf\u09b9\u09cd\u09af \u0986\u09b0 \u0986\u09ad\u09bf\u099c\u09be\u09a4\u09cd\u09af\u09c7\u09b0 \u09ae\u09c7\u09b2\u09ac\u09a8\u09cd\u09a7\u09a8\u09c7
\u09a8\u09c0\u09b2\u09be\u099e\u09cd\u099c\u09a8\u09be, \u09a4\u09cb\u09ae\u09be\u09b0 \u099c\u09a8\u09cd\u09af\u0964 \ud83d\udc99\u2728

\u2728 \u09aa\u09cd\u09b0\u09a4\u09bf\u099f\u09bf \u099a\u09c1\u09dc\u09bf \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09bf\u099c\u09c7\u09b0 \u09b9\u09be\u09a4\u09c7 \u09a4\u09c8\u09b0\u09bf\u0964
\u2728 \u0989\u09aa\u09be\u09a6\u09be\u09a8: \u09b0\u09af\u09bc\u09cd\u09af\u09be\u09b2 \u09ac\u09cd\u09b2\u09c1 \u09b0\u09c7\u09b6\u09ae \u09b8\u09c1\u09a4\u09be (Royal Blue Silk Thread), \u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u099c\u09b0\u09bf \u0993 \u09a8\u09c0\u09b2 \u0995\u09c1\u09a8\u09cd\u09a6\u09a8 \u09b8\u09cd\u099f\u09cb\u09a8\u0964
\u2728 \u09b8\u09be\u0987\u099c: \u09b8\u09ac \u09b8\u09be\u0987\u099c \u098f\u09ad\u09c7\u0987\u09b2\u09c7\u09ac\u09b2 (2.2, 2.4, 2.6, 2.8, 2.10)\u0964
\u2728 \u09b8\u09be\u09b0\u09be\u09a6\u09c7\u09b6\u09c7 \u0995\u09cd\u09af\u09be\u09b6 \u0985\u09a8 \u09a1\u09c7\u09b2\u09bf\u09ad\u09be\u09b0\u09bf (Cash on Delivery) \u09b8\u09c1\u09ac\u09bf\u09a7\u09be\u0964`,
    material: '\u09b0\u09af\u09bc\u09cd\u09af\u09be\u09b2 \u09ac\u09cd\u09b2\u09c1 \u09b0\u09c7\u09b6\u09ae \u09b8\u09c1\u09a4\u09be, \u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u099c\u09b0\u09bf \u0993 \u09a8\u09c0\u09b2 \u0995\u09c1\u09a8\u09cd\u09a6\u09a8 \u0997\u09cd\u09b2\u09be\u09b8 \u09b8\u09cd\u099f\u09cb\u09a8',
    occasion: ['wedding', 'party', 'eid', 'everyday', 'gift'],
    featured: true,
    bestseller: false,
    newArrival: true,
    tags: ['nilanjana', '\u09a8\u09c0\u09b2\u09be\u099e\u09cd\u099c\u09a8\u09be', 'churi', 'blue', 'gold', 'silk', 'kundan', 'royal', 'handmade'],
  },
  {
    id: 4,
    name: "''\u0985\u0999\u09cd\u0997\u09a8\u09be'' \u2728",
    slug: 'angona-handmade-bangles',
    category: 'churi',
    categoryLabel: '\u09b9\u09be\u09a4\u09c7\u09b0 \u099a\u09c1\u09dc\u09bf (Churi)',
    price: 650,
    originalPrice: 850,
    discount: 24,
    images: [
      'images/angona-1.jpg',
      'images/angona-2.jpg',
      'images/angona-3.jpg'
    ],
    sizes: ['2.2', '2.4', '2.6', '2.8', '2.10'],
    colors: ['#C41E3A', '#C9A84C'],
    colorNames: ['\u09b0\u09be\u0999\u09be \u09b2\u09be\u09b2 \u0993 \u09b8\u09cb\u09a8\u09be\u09b2\u09bf (Red & Gold)'],
    rating: 5.0,
    reviewCount: 16,
    stock: 20,
    description: `''\u0985\u0999\u09cd\u0997\u09a8\u09be'' \u2728
\u0985\u0999\u09cd\u0997\u09a8\u09be\u09b0 \u09b9\u09be\u09a4\u09c7 \u09b0\u09be\u0999\u09be \u09b0\u0999\u09c7\u09b0 \u09ae\u09be\u09af\u09bc\u09be,
\u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u099b\u09cb\u0981\u09af\u09bc\u09be\u09af\u09bc \u09b8\u09be\u099c\u09c1\u0995 \u099a\u09c1\u09dc\u09bf\u09b0 \u099b\u09be\u09af\u09bc\u09be\u0964 \u2764\ufe0f

\u2728 \u09aa\u09cd\u09b0\u09a4\u09bf\u099f\u09bf \u099a\u09c1\u09dc\u09bf \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09bf\u099c\u09c7\u09b0 \u09b9\u09be\u09a4\u09c7 \u09a4\u09c8\u09b0\u09bf\u0964
\u2728 \u0989\u09aa\u09be\u09a6\u09be\u09a8: \u09aa\u09cd\u09b0\u09bf\u09ae\u09bf\u09af\u09bc\u09be\u09ae \u09b0\u09c7\u09b6\u09ae \u09b8\u09c1\u09a4\u09be, \u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u099c\u09b0\u09bf \u0993 \u09b0\u09be\u0999\u09be \u0995\u09c1\u09a8\u09cd\u09a6\u09a8 \u09b8\u09cd\u099f\u09cb\u09a8\u0964
\u2728 \u09b8\u09be\u0987\u099c: \u09b8\u09ac \u09b8\u09be\u0987\u099c \u098f\u09ad\u09c7\u0987\u09b2\u09c7\u09ac\u09b2 (2.2, 2.4, 2.6, 2.8, 2.10)\u0964
\u2728 \u09b8\u09be\u09b0\u09be\u09a6\u09c7\u09b6\u09c7 \u0995\u09cd\u09af\u09be\u09b6 \u0985\u09a8 \u09a1\u09c7\u09b2\u09bf\u09ad\u09be\u09b0\u09bf (Cash on Delivery) \u09b8\u09c1\u09ac\u09bf\u09a7\u09be\u0964`,
    material: '\u09aa\u09cd\u09b0\u09bf\u09ae\u09bf\u09af\u09bc\u09be\u09ae \u09b0\u09c7\u09b6\u09ae \u09b8\u09c1\u09a4\u09be, \u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u099c\u09b0\u09bf \u0993 \u09b0\u09be\u0999\u09be \u0995\u09c1\u09a8\u09cd\u09a6\u09a8 \u09b8\u09cd\u099f\u09cb\u09a8',
    occasion: ['wedding', 'party', 'eid', 'everyday', 'gift'],
    featured: true,
    bestseller: false,
    newArrival: true,
    tags: ['angona', '\u0985\u0999\u09cd\u0997\u09a8\u09be', 'churi', 'red', 'gold', 'silk', 'kundan', 'bridal', 'handmade'],
  },
  {
    id: 5,
    name: "''পল্লবী'' 💚",
    slug: 'pallabi-handmade-bangles',
    category: 'churi',
    categoryLabel: 'হাতের চুড়ি (Churi)',
    price: 650,
    originalPrice: 850,
    discount: 24,
    images: [
      'https://lh3.googleusercontent.com/d/1351dhPBGYIhv0414g_iEhLzL_0boOPPd',
      'https://lh3.googleusercontent.com/d/1ckfqmEkp8NCkJ6zroCBHa0v92SGNOlXd',
      'https://lh3.googleusercontent.com/d/1LX-uILRTnJpF4AZoXIQZzT88acLk-77v',
    ],
    sizes: ['2.2', '2.4', '2.6', '2.8', '2.10'],
    colors: ['#2D6A4F', '#C9A84C'],
    colorNames: ['সবুজ ও সোনালি (Green & Gold)'],
    rating: 5.0,
    reviewCount: 12,
    stock: 20,
    description: `''পল্লবী'' 💚
একটু শখ, একটু ভালোবাসা, একটু মনের কথা,
হাতে পরলেই পল্লবী হয়ে উঠুক পূর্ণতা। 🌿💫

✨ প্রতিটি চুড়ি সম্পূর্ণ নিজের হাতে তৈরি।
✨ উপাদান: তাজা সবুজ রেশম সুতা (Forest Green Silk Thread), সোনালি জরি ও সবুজ কুন্দন স্টোন।
✨ সাইজ: সব সাইজ এভেইলেবল (2.2, 2.4, 2.6, 2.8, 2.10)।
✨ সারাদেশে ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা।`,
    material: 'সবুজ রেশম সুতা, সোনালি জরি ও সবুজ কুন্দন গ্লাস স্টোন',
    occasion: ['everyday', 'party', 'eid', 'gift', 'wedding'],
    featured: true,
    bestseller: false,
    newArrival: true,
    tags: ['pallabi', 'পল্লবী', 'churi', 'green', 'gold', 'silk', 'kundan', 'nature', 'handmade'],
  },
  {
    id: 6,
    name: "''রাজনন্দিনী'' 💜",
    slug: 'rajnandini-handmade-bangles',
    category: 'churi',
    categoryLabel: 'হাতের চুড়ি (Churi)',
    price: 650,
    originalPrice: 850,
    discount: 24,
    images: [
      'https://lh3.googleusercontent.com/d/1_0tTNUA1gEhLUm8uooYEHGSy352Mx1d7',
    ],
    sizes: ['2.2', '2.4', '2.6', '2.8', '2.10'],
    colors: ['#6B2D82', '#C9A84C'],
    colorNames: ['বেগুনি ও সোনালি (Purple & Gold)'],
    rating: 5.0,
    reviewCount: 14,
    stock: 20,
    description: `''রাজনন্দিনী'' 💜
বেগুনির আবেশে রাজকীয় এক মায়াবী সাজ,
সোনালি ঝিলিকে ফুটে ওঠে সৌন্দর্যের নীরব লাজ। 💜✨

✨ প্রতিটি চুড়ি সম্পূর্ণ নিজের হাতে তৈরি।
✨ উপাদান: প্রিমিয়াম রেশম সুতা (Royal Purple Silk Thread), সোনালি জরি ও উজ্জ্বল কুন্দন স্টোন।
✨ সাইজ: সব সাইজ এভেইলেবল (2.2, 2.4, 2.6, 2.8, 2.10)।
✨ সারাদেশে ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা।`,
    material: 'রয়্যাল বেগুনি রেশম সুতা, সোনালি জরি ও গ্লাস কুন্দন স্টোন',
    occasion: ['party', 'wedding', 'eid', 'gift', 'everyday'],
    featured: true,
    bestseller: false,
    newArrival: true,
    tags: ['rajnandini', 'রাজনন্দিনী', 'churi', 'purple', 'gold', 'silk', 'kundan', 'royal', 'handmade'],
  },
  {
    id: 7,
    name: "''মেঘবতী'' ☁️💙",
    slug: 'meghbati-handmade-bangles',
    category: 'churi',
    categoryLabel: 'হাতের চুড়ি (Churi)',
    price: 650,
    originalPrice: 850,
    discount: 24,
    images: [
      'https://lh3.googleusercontent.com/d/1Xqkw9p0im-Hn_3dW8BzUneGzvShIjySl',
    ],
    sizes: ['2.2', '2.4', '2.6', '2.8', '2.10'],
    colors: ['#4A90E2', '#C9A84C'],
    colorNames: ['মেঘের নীল ও সোনালি (Sky Blue & Gold)'],
    rating: 5.0,
    reviewCount: 15,
    stock: 20,
    description: `''মেঘবতী'' ☁️💙
মেঘের নীলে জড়িয়ে থাকুক নরম মায়ার ছোঁয়া,
ঝিলমিল পাথরে ফুটুক স্বপ্ন, নীরব ভালোবাসা। 💙

✨ প্রতিটি চুড়ি সম্পূর্ণ নিজের হাতে তৈরি।
✨ উপাদান: প্রিমিয়াম স্কাই ব্লু রেশম সুতা (Sky Blue Silk Thread), সোনালি জরি ও ঝিলমিল কুন্দন স্টোন।
✨ সাইজ: সব সাইজ এভেইলেবল (2.2, 2.4, 2.6, 2.8, 2.10)।
✨ সারাদেশে ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা।`,
    material: 'আকাশি নীল রেশম সুতা, সোনালি জরি ও ঝিলমিল কুন্দন স্টোন',
    occasion: ['everyday', 'party', 'eid', 'gift', 'wedding'],
    featured: true,
    bestseller: false,
    newArrival: true,
    tags: ['meghbati', 'মেঘবতী', 'churi', 'blue', 'sky', 'gold', 'silk', 'kundan', 'cloud', 'handmade'],
  },
];

const REVIEWS = [
  {
    name: '\u09a8\u09c1\u09b8\u09b0\u09be\u09a4 \u099c\u09be\u09b9\u09be\u09a8',
    initial: 'N',
    color: '#C41E3A',
    rating: 5,
    text: '\u201c\u0985\u0999\u09cd\u0997\u09a8\u09be\u201d \u099a\u09c1\u09dc\u09bf\u09b0 \u09b0\u09be\u0999\u09be \u09b0\u0999 \u0986\u09b0 \u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u0995\u09be\u099c\u09c7\u09b0 \u0995\u09ae\u09cd\u09ac\u09bf\u09a8\u09c7\u09b6\u09a8\u099f\u09be \u0985\u09b8\u09be\u09a7\u09be\u09b0\u09a3! \u09b9\u09be\u09a4\u09c7 \u09aa\u09b0\u09b2\u09c7 \u09b9\u09be\u09a4 \u09aa\u09c1\u09b0\u09cb \u099d\u09b2\u09ae\u09b2 \u0995\u09b0\u09c7\u0964 \u09ab\u09bf\u09a8\u09bf\u09b6\u09bf\u0982 \u0996\u09c1\u09ac \u09a8\u09bf\u0996\u09c1\u0981\u09a4 \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964',
    product: '\'\'\u0985\u0999\u09cd\u0997\u09a8\u09be\'\' \u2728',
    date: '\u09e7 \u09a6\u09bf\u09a8 \u0986\u0997\u09c7',
  },
  {
    name: '\u09a4\u09be\u09a8\u099c\u09bf\u09b2\u09be \u09b9\u0995',
    initial: 'T',
    color: '#7B1C3A',
    rating: 5,
    text: '\u201c\u09a8\u09bf\u09b6\u09c0\u09a5\u201d \u099a\u09c1\u09dc\u09bf \u099c\u09cb\u09dc\u09be \u09b9\u09be\u09a4\u09c7 \u09aa\u09c7\u09af\u09bc\u09c7 \u0986\u09ae\u09bf \u09ae\u09c1\u0997\u09cd\u09a7! \u099b\u09ac\u09bf\u09a4\u09c7 \u09af\u09c7\u09ae\u09a8 \u09b8\u09c1\u09a8\u09cd\u09a6\u09b0, \u09ac\u09be\u09b8\u09cd\u09a4\u09ac\u09c7 \u09a4\u09be\u09b0 \u099a\u09c7\u09af\u09bc\u09c7\u0993 \u0985\u09a8\u09c7\u0995 \u09ac\u09c7\u09b6\u09bf \u0997\u09cd\u09b2\u09b8\u09bf \u0993 \u09aa\u09cd\u09b0\u09bf\u09ae\u09bf\u09af\u09bc\u09be\u09ae\u0964 \u09ab\u09bf\u09a8\u09bf\u09b6\u09bf\u0982 \u0985\u09b8\u09be\u09a7\u09be\u09b0\u09a3!',
    product: '\u201c\u09a8\u09bf\u09b6\u09c0\u09a5\u201d \ud83d\udda4',
    date: '\u09e8 \u09a6\u09bf\u09a8 \u0986\u0997\u09c7',
  },
  {
    name: '\u09ae\u09ae\u09bf\u09a4\u09be \u09ae\u099c\u09c1\u09ae\u09a6\u09be\u09b0',
    initial: 'M',
    color: '#C41E3A',
    rating: 5,
    text: '\u201c\u09b2\u09c0\u09b2\u09be\u201d \u099a\u09c1\u09dc\u09bf\u09b0 \u09b2\u09be\u09b2 \u09b0\u0982\u099f\u09be \u0995\u09c0 \u09af\u09c7 \u0985\u09aa\u09b0\u09c2\u09aa! \u09b0\u09c1\u09ac\u09bf \u09aa\u09be\u09a5\u09b0\u09c7\u09b0 \u09b8\u09c7\u099f\u09bf\u0982 \u0986\u09b0 \u09b0\u09c7\u09b6\u09ae\u09c7\u09b0 \u09a8\u09bf\u0996\u09c1\u0981\u09a4 \u0995\u09be\u099c \u09a6\u09c7\u0996\u09c7 \u09ac\u09be\u09a8\u09cd\u09a7\u09ac\u09c0\u09b0\u09be \u09b8\u09ac\u09be\u0987 \u09aa\u09cd\u09b0\u09b6\u0982\u09b8\u09be \u0995\u09b0\u09c7\u099b\u09c7\u0964',
    product: '\u201c\u09b2\u09c0\u09b2\u09be\u201d \u2764\ufe0f',
    date: '\u09ea \u09a6\u09bf\u09a8 \u0986\u0997\u09c7',
  },
  {
    name: '\u09ab\u09be\u09b0\u09b9\u09be\u09a8\u09be \u0987\u09b8\u09b2\u09be\u09ae',
    initial: 'F',
    color: '#C9A84C',
    rating: 5,
    text: '\u0995\u09be\u09b2\u09cb \u0993 \u09b2\u09be\u09b2 \u09a6\u09c1\u099f\u09bf \u0995\u09be\u09b2\u09c7\u0995\u09b6\u09a8\u0987 \u09a8\u09bf\u09af\u09bc\u09c7\u099b\u09bf\u0964 \u09b8\u09be\u0987\u099c \u098f\u0995\u09a6\u09ae \u09aa\u09be\u09b0\u09ab\u09c7\u0995\u09cd\u099f \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964 \u09a8\u09bf\u099c\u09c7\u09b0 \u09b9\u09be\u09a4\u09c7 \u09a4\u09c8\u09b0\u09bf \u098f\u09a4 \u09b8\u09c1\u09a8\u09cd\u09a6\u09b0 \u0995\u09be\u099c\u09c7\u09b0 \u099c\u09a8\u09cd\u09af \u0995\u09be\u09b0\u09bf\u0997\u09b0\u0995\u09c7 \u0985\u09a8\u09c7\u0995 \u09a7\u09a8\u09cd\u09af\u09ac\u09be\u09a6!',
    product: '\u201c\u09a8\u09bf\u09b6\u09c0\u09a5\u201d \ud83d\udda4 & \u201c\u09b2\u09c0\u09b2\u09be\u201d \u2764\ufe0f',
    date: '\u09e7 \u09b8\u09aa\u09cd\u09a4\u09be\u09b9 \u0986\u0997\u09c7',
  },
  {
    name: '\u09b8\u09c1\u09ae\u09be\u0987\u09af\u09bc\u09be \u0986\u0995\u09cd\u09a4\u09be\u09b0',
    initial: 'S',
    color: '#1A3A6B',
    rating: 5,
    text: '\u201c\u09a8\u09c0\u09b2\u09be\u099e\u09cd\u099c\u09a8\u09be\u201d \u099a\u09c1\u09dc\u09bf\u09b0 \u09a8\u09c0\u09b2 \u09b0\u0982\u099f\u09be \u09a6\u09c7\u0996\u09c7 \u09aa\u09cd\u09b0\u09a5\u09ae\u09c7\u0987 \u09ae\u09a8 \u09ad\u09b0\u09c7 \u0997\u09c7\u09b2! \u09b8\u09cb\u09a8\u09be\u09b2\u09bf \u099c\u09b0\u09bf\u09b0 \u0995\u09be\u099c \u098f\u09ac\u0982 \u09a8\u09c0\u09b2 \u0995\u09c1\u09a8\u09cd\u09a6\u09a8 \u09b8\u09cd\u099f\u09cb\u09a8\u09c7\u09b0 \u0995\u09ae\u09cd\u09ac\u09bf\u09a8\u09c7\u09b6\u09a8 \u0985\u09a4\u09c1\u09b2\u09a8\u09c0\u09af\u09bc\u0964 \u098f\u0995\u099f\u09be \u09b0\u09be\u099c\u0995\u09c0\u09af\u09bc \u0985\u09a8\u09c1\u09ad\u09c2\u09a4\u09bf \u09a6\u09c5\u09af\u09bc \u09aa\u09b0\u09b2\u09c7!',
    product: '\u201c\u09a8\u09c0\u09b2\u09be\u099e\u09cd\u099c\u09a8\u09be\u201d \ud83d\udc99',
    date: '\u09e9 \u09a6\u09bf\u09a8 \u0986\u0997\u09c7',
  },
  {
    name: 'ফারজানা আক্তার রুহি',
    initial: 'R',
    color: '#2D6A4F',
    rating: 5,
    text: '“পল্লবী” চুড়ি হাতে পাওয়ার পর মুগ্ধ হয়ে গেছি! সবুজ সিল্ক সুতো আর কুন্দনের কাজ এত নিখুঁত আর সুন্দর, যেকোনো শাড়ির সাথে দারুণ মানায়। শুভকামনা রইল!',
    product: "''পল্লবী'' 💚",
    date: '১ দিন আগে',
  },
  {
    name: 'শারমিন জাহান নিপা',
    initial: 'S',
    color: '#6B2D82',
    rating: 5,
    text: '“রাজনন্দিনী” চুড়ির বেগুনি আর সোনালি রঙের কম্বিনেশনটা সত্যিই রাজকীয়! হাতে পরলে অসম্ভব এলিগেন্ট লাগে। ফিনিশিং ও কোয়ালিটি ১০০ তে ১০০!',
    product: "''রাজনন্দিনী'' 💜",
    date: '২ দিন আগে',
  },
  {
    name: 'আনিকা তাবাসসুম',
    initial: 'A',
    color: '#4A90E2',
    rating: 5,
    text: '“মেঘবতী” চুড়ির আকাশি নীল রঙটা অসম্ভব মায়াবী! সোনালি জরি আর কুন্দনের পাথরগুলো এত সুন্দর আলো ছড়ায়, পরলেই একটা স্নিগ্ধ অনুভূতি হয়। ভীষণ পছন্দ হয়েছে!',
    product: "''মেঘবতী'' ☁️💙",
    date: '১ দিন আগে',
  },
];
