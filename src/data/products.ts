
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'men' | 'women' | 'kids';
  colors: string[];
  sizes: number[];
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Air Max Pulse',
    price: 149.99,
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8e40f1f5-0bea-4c94-94ff-473514e2cb6f/air-max-pulse-shoes-QShhG8.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d3e7883a-21c9-4d99-9499-40ded7d3591f/air-max-pulse-shoes-QShhG8.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/20994486-c950-4c9f-a097-69c23b48d504/air-max-pulse-shoes-QShhG8.png'
    ],
    category: 'men',
    colors: ['#000000', '#FFFFFF', '#FF0000'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    description: "Inspired by London's music scene, the Air Max Pulse brings a fresh beat to the iconic Air Max family. Its textile-wrapped midsole and vacuum-sealed accents give off a modern techwear vibe that's impossible to ignore.",
    features: [
      'Vacuum-sealed accents add techwear style',
      'Air-Sole unit in the heel provides cushioned comfort',
      'Textile-wrapped midsole gives a handcrafted look',
      'Rubber outsole delivers durable traction'
    ],
    rating: 4.8,
    reviewCount: 120,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'React Infinity Run',
    price: 129.99,
    originalPrice: 159.99,
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cc3a56fa-3c89-420d-a84c-37f024a90555/react-infinity-3-road-running-shoes-fX3Tp1.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e1e327c8-c3af-4b6c-933c-de44e94d3ab9/react-infinity-3-road-running-shoes-fX3Tp1.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/aa1b3b95-5640-4125-b261-26199444be66/react-infinity-3-road-running-shoes-fX3Tp1.png'
    ],
    category: 'men',
    colors: ['#0000FF', '#00FF00', '#808080'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    description: 'Made for those who need a little extra support, the Nike React Infinity Run delivers a smooth ride every time with added foam and improved upper details to keep your foot secure.',
    features: [
      'Nike React foam delivers a soft, responsive ride',
      'Wider forefoot gives your foot stability',
      'Rocker shape provides smooth heel-to-toe transitions',
      'Higher foam stack heights reduce stress on your leg'
    ],
    rating: 4.5,
    reviewCount: 85,
    isOnSale: true
  },
  {
    id: '3',
    name: 'Air Zoom Pegasus',
    price: 119.99,
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/10fa2396-184e-479c-9d0a-11b9eac660e2/pegasus-40-road-running-shoes-JMjZ1F.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bf34f27e-613b-445d-a8f4-6824eb536a54/pegasus-40-road-running-shoes-JMjZ1F.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/55c90329-ddd1-4db2-bf69-ed254747e2f6/pegasus-40-road-running-shoes-JMjZ1F.png'
    ],
    category: 'women',
    colors: ['#FFC0CB', '#000000', '#FFFFFF'],
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5],
    description: 'Your workhorse with wings is back with the Nike Air Zoom Pegasus. More lightweight mesh in the upper combines the comfort and durability you want with a fit that nods to the first Pegasus.',
    features: [
      'Nike Zoom Air unit provides responsive cushioning',
      'Lightweight mesh upper enhances breathability',
      'Midfoot webbing locks your foot in place',
      'Rubber outsole offers durable traction'
    ],
    rating: 4.7,
    reviewCount: 132,
    isFeatured: true
  },
  {
    id: '4',
    name: 'ZoomX Vaporfly',
    price: 249.99,
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5efa6f22-9bce-4220-99a0-07a8be30d560/zoomx-vaporfly-3-road-racing-shoes-xsDgvM.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9c5c7836-0bd2-4efe-9cda-869217e69e4e/zoomx-vaporfly-3-road-racing-shoes-xsDgvM.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/60bbe63d-01cc-4d07-8067-81e4a17dd178/zoomx-vaporfly-3-road-racing-shoes-xsDgvM.png'
    ],
    category: 'women',
    colors: ['#FF0000', '#0000FF', '#FFFF00'],
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5],
    description: 'Continue the next evolution of speed with a racing shoe made to help you chase new goals and records. The Nike ZoomX Vaporfly is lighter than its predecessor and features a redesigned upper that helps minimize drag.',
    features: [
      'Full-length, articulated carbon fiber plate for a propulsive feel',
      'Nike ZoomX foam provides a responsive, lightweight feel',
      'Engineered mesh upper for lightweight breathability',
      'Contoured heel for Achilles comfort'
    ],
    rating: 4.9,
    reviewCount: 78,
    isNew: true
  },
  {
    id: '5',
    name: 'Force 1 LE',
    price: 79.99,
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ae88e208-9231-4681-99d3-2c23a225233e/force-1-le-younger-shoes-kxcbnD.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/40b02764-a975-4c1a-a0c6-e4a486a3ed83/force-1-le-younger-shoes-kxcbnD.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/84f250be-632a-431a-a1bb-7be97a4a5bb7/force-1-le-younger-shoes-kxcbnD.png'
    ],
    category: 'kids',
    colors: ['#FFFFFF', '#000000'],
    sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5],
    description: "The Nike Force 1 LE brings back the '80s b-ball icon in a classic all-white or all-black look. The soft leather on the upper breaks in easily and is easy to clean. And just like on the adult version, the Nike Air unit in the sole adds lightweight cushioning.",
    features: [
      'Leather upper is durable and easy to clean',
      'Nike Air cushioning provides all-day comfort',
      'Rubber outsole offers durable traction',
      'Padded collar for a comfortable fit'
    ],
    rating: 4.6,
    reviewCount: 95,
    isFeatured: true
  },
  {
    id: '6',
    name: 'Dunk Low',
    price: 89.99,
    originalPrice: 109.99,
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1d4eb332-6d0a-4f28-b5b5-bc62e1d271e1/dunk-low-next-nature-younger-shoes-xjTrwz.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5f49303e-dfff-4d14-b343-ebaffd5cdd9c/dunk-low-next-nature-younger-shoes-xjTrwz.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3c57e81e-fe0e-44f7-9fc7-32af4080976d/dunk-low-next-nature-younger-shoes-xjTrwz.png'
    ],
    category: 'kids',
    colors: ['#000000', '#FFFFFF', '#FF0000'],
    sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5],
    description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low Next Nature returns with classic colors and crisp leather made with at least 20% recycled materials. The rubber outsole made from at least 5% recycled material redefines the playground-inspired court favorite.',
    features: [
      'Made with at least 20% recycled materials by weight',
      'Rubber outsole with at least 5% recycled content',
      'Low-cut padded collar for comfort',
      'Perforations on the toe for breathability'
    ],
    rating: 4.3,
    reviewCount: 67,
    isOnSale: true
  }
];

export const getProducts = (category?: string): Product[] => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getOnSaleProducts = (): Product[] => {
  return products.filter(product => product.isOnSale);
};
