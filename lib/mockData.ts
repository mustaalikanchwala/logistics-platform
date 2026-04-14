import type {
  Vendor,
  Shopkeeper,
  DeliveryPartner,
  Order,
  Batch,
} from './types';

// ─── SVG Map Config ───────────────────────────────────────────────────────────
// Mumbai region: lat 18.90–19.28, lng 72.78–72.98
// SVG viewport: 800 × 500
const MAP_W = 800;
const MAP_H = 500;
const LAT_MIN = 18.90;
const LAT_MAX = 19.28;
const LNG_MIN = 72.78;
const LNG_MAX = 72.98;

export function toPx(lat: number, lng: number) {
  const px = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * MAP_W;
  const py = (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * MAP_H;
  return { px: Math.round(px), py: Math.round(py) };
}

// ─── Vendors ──────────────────────────────────────────────────────────────────
export const vendors: Vendor[] = [
  {
    id: 'V1',
    storeName: 'Ravi Traders',
    ownerName: 'Ravi Sharma',
    productType: 'Groceries & FMCG',
    phone: '+91 98201 12345',
    email: 'ravi.traders@gmail.com',
    avatarInitials: 'RS',
    location: {
      name: 'Ravi Traders — Dadar',
      address: 'Shop 14, Dadar Market, Dadar West, Mumbai 400028',
      lat: 19.0176,
      lng: 72.8424,
      ...toPx(19.0176, 72.8424),
    },
  },
  {
    id: 'V2',
    storeName: 'Metro Distributors',
    ownerName: 'Mehul Desai',
    productType: 'Electronics & Appliances',
    phone: '+91 99204 56789',
    email: 'metro.dist@metro.in',
    avatarInitials: 'MD',
    location: {
      name: 'Metro Distributors — Andheri',
      address: '7 Veera Desai Road, Andheri West, Mumbai 400053',
      lat: 19.1194,
      lng: 72.8468,
      ...toPx(19.1194, 72.8468),
    },
  },
  {
    id: 'V3',
    storeName: 'Patel & Sons',
    ownerName: 'Bhavesh Patel',
    productType: 'Textiles & Garments',
    phone: '+91 98765 43210',
    email: 'patel.sons@textile.co',
    avatarInitials: 'BP',
    location: {
      name: 'Patel & Sons — Borivali',
      address: '3 IC Colony Cross Rd, Borivali West, Mumbai 400092',
      lat: 19.2307,
      lng: 72.8561,
      ...toPx(19.2307, 72.8561),
    },
  },
];

// ─── Shopkeepers ──────────────────────────────────────────────────────────────
export const shopkeepers: Shopkeeper[] = [
  {
    id: 'S1',
    storeName: 'Sharma General Store',
    ownerName: 'Anil Sharma',
    phone: '+91 99876 11111',
    email: 'sharma.store@gmail.com',
    avatarInitials: 'AS',
    location: {
      name: 'Sharma General Store — Bandra',
      address: '12 Hill Road, Bandra West, Mumbai 400050',
      lat: 19.0596,
      lng: 72.8295,
      ...toPx(19.0596, 72.8295),
    },
  },
  {
    id: 'S2',
    storeName: 'Quick Mart',
    ownerName: 'Sunita Joshi',
    phone: '+91 98700 22222',
    email: 'quickmart.juhu@gmail.com',
    avatarInitials: 'SJ',
    location: {
      name: 'Quick Mart — Juhu',
      address: 'Plot 4, Juhu Tara Road, Juhu, Mumbai 400049',
      lat: 19.1035,
      lng: 72.8262,
      ...toPx(19.1035, 72.8262),
    },
  },
  {
    id: 'S3',
    storeName: 'City Electronics',
    ownerName: 'Farhan Sheikh',
    phone: '+91 97664 33333',
    email: 'cityelectro@vileparle.com',
    avatarInitials: 'FS',
    location: {
      name: 'City Electronics — Vile Parle',
      address: 'Shopping Complex, Vile Parle East, Mumbai 400057',
      lat: 19.0990,
      lng: 72.8446,
      ...toPx(19.0990, 72.8446),
    },
  },
  {
    id: 'S4',
    storeName: 'Daily Needs',
    ownerName: 'Pooja Nair',
    phone: '+91 98500 44444',
    email: 'dailyneeds.goregaon@gmail.com',
    avatarInitials: 'PN',
    location: {
      name: 'Daily Needs — Goregaon',
      address: 'Aarey Road, Goregaon West, Mumbai 400104',
      lat: 19.1612,
      lng: 72.8527,
      ...toPx(19.1612, 72.8527),
    },
  },
  {
    id: 'S5',
    storeName: 'Fashion Hub',
    ownerName: 'Ritu Kapoor',
    phone: '+91 99301 55555',
    email: 'fashionhub.kandivali@gmail.com',
    avatarInitials: 'RK',
    location: {
      name: 'Fashion Hub — Kandivali',
      address: 'Mahavir Nagar, Kandivali West, Mumbai 400067',
      lat: 19.2053,
      lng: 72.8503,
      ...toPx(19.2053, 72.8503),
    },
  },
];

// ─── Delivery Partners ────────────────────────────────────────────────────────
export const deliveryPartners: DeliveryPartner[] = [
  {
    id: 'P1',
    name: 'Ramesh Yadav',
    vehicle: 'Mahindra Bolero Pickup',
    vehicleNumber: 'MH-04-AZ-7821',
    phone: '+91 98450 66666',
    rating: 4.8,
    completedDeliveries: 342,
    avatarInitials: 'RY',
    currentLat: 19.0176,
    currentLng: 72.8424,
    currentPx: toPx(19.0176, 72.8424).px,
    currentPy: toPx(19.0176, 72.8424).py,
  },
  {
    id: 'P2',
    name: 'Suresh Mehta',
    vehicle: 'Tata Ace',
    vehicleNumber: 'MH-02-BT-4412',
    phone: '+91 86750 77777',
    rating: 4.6,
    completedDeliveries: 218,
    avatarInitials: 'SM',
    currentLat: 19.2307,
    currentLng: 72.8561,
    currentPx: toPx(19.2307, 72.8561).px,
    currentPy: toPx(19.2307, 72.8561).py,
  },
];

// ─── Orders ───────────────────────────────────────────────────────────────────
export const orders: Order[] = [
  // BATCH-001 orders
  {
    id: 'ORD-001',
    vendorId: 'V1',
    shopkeeperId: 'S1',
    batchId: 'BATCH-001',
    productName: 'Assorted Grocery Pack',
    quantity: 10,
    weight: 28,
    status: 'in_transit',
    createdAt: '2026-04-14T07:00:00+05:30',
    estimatedDelivery: '2026-04-14T14:30:00+05:30',
  },
  {
    id: 'ORD-002',
    vendorId: 'V1',
    shopkeeperId: 'S2',
    batchId: 'BATCH-001',
    productName: 'FMCG Household Items',
    quantity: 8,
    weight: 18,
    status: 'in_transit',
    createdAt: '2026-04-14T07:15:00+05:30',
    estimatedDelivery: '2026-04-14T14:50:00+05:30',
  },
  {
    id: 'ORD-003',
    vendorId: 'V2',
    shopkeeperId: 'S3',
    batchId: 'BATCH-001',
    productName: 'LED Televisions (32") × 3',
    quantity: 3,
    weight: 24,
    status: 'picked_up',
    createdAt: '2026-04-14T07:30:00+05:30',
    estimatedDelivery: '2026-04-14T14:15:00+05:30',
  },
  // BATCH-002 orders
  {
    id: 'ORD-004',
    vendorId: 'V3',
    shopkeeperId: 'S5',
    batchId: 'BATCH-002',
    productName: 'Cotton Kurta Set (Assorted)',
    quantity: 50,
    weight: 22,
    status: 'pickup_scheduled',
    createdAt: '2026-04-14T09:00:00+05:30',
    estimatedDelivery: '2026-04-14T16:00:00+05:30',
  },
  {
    id: 'ORD-005',
    vendorId: 'V3',
    shopkeeperId: 'S4',
    batchId: 'BATCH-002',
    productName: 'Home Furnishing Rolls',
    quantity: 12,
    weight: 34,
    status: 'pickup_scheduled',
    createdAt: '2026-04-14T09:10:00+05:30',
    estimatedDelivery: '2026-04-14T16:30:00+05:30',
  },
  // Standalone pending orders (not yet batched)
  {
    id: 'ORD-006',
    vendorId: 'V1',
    shopkeeperId: 'S4',
    batchId: null,
    productName: 'Spices & Condiments Pack',
    quantity: 5,
    weight: 10,
    status: 'pending',
    createdAt: '2026-04-14T10:00:00+05:30',
    estimatedDelivery: '2026-04-15T12:00:00+05:30',
  },
  {
    id: 'ORD-007',
    vendorId: 'V2',
    shopkeeperId: 'S5',
    batchId: null,
    productName: 'Bluetooth Speakers × 6',
    quantity: 6,
    weight: 8,
    status: 'pending',
    createdAt: '2026-04-14T10:20:00+05:30',
    estimatedDelivery: '2026-04-15T12:30:00+05:30',
  },
];

// ─── Batches ──────────────────────────────────────────────────────────────────

// Route waypoints (SVG pixel coords) for animation
// BATCH-001: Dadar depot → Andheri pickup → Vile Parle drop → Juhu drop → Bandra drop
export const BATCH_001_WAYPOINTS: { px: number; py: number }[] = [
  toPx(19.0176, 72.8424), // Dadar (start/depot)
  toPx(19.1194, 72.8468), // Andheri (pickup V2)
  toPx(19.0990, 72.8446), // Vile Parle (drop S3)
  toPx(19.1035, 72.8262), // Juhu (drop S2)
  toPx(19.0596, 72.8295), // Bandra (drop S1)
];

// BATCH-002: Borivali pickup → Kandivali drop → Goregaon drop
export const BATCH_002_WAYPOINTS: { px: number; py: number }[] = [
  toPx(19.2307, 72.8561), // Borivali (pickup V3)
  toPx(19.2053, 72.8503), // Kandivali (drop S5)
  toPx(19.1612, 72.8527), // Goregaon (drop S4)
];

export const batches: Batch[] = [
  {
    id: 'BATCH-001',
    label: 'Dadar→Bandra Route',
    partnerId: 'P1',
    orderIds: ['ORD-001', 'ORD-002', 'ORD-003'],
    vendorIds: ['V1', 'V2'],
    shopkeeperIds: ['S1', 'S2', 'S3'],
    status: 'in_progress',
    estimatedCompletion: '2026-04-14T15:00:00+05:30',
    totalWeight: 70,
    createdAt: '2026-04-14T08:00:00+05:30',
    activeStopIndex: 1, // heading towards Vile Parle (stop index 1 = 3rd waypoint)
    route: [
      {
        stopNumber: 1,
        type: 'pickup',
        entityId: 'V1',
        entityName: 'Ravi Traders',
        location: {
          name: 'Ravi Traders — Dadar',
          address: 'Dadar Market, Dadar West',
          lat: 19.0176,
          lng: 72.8424,
          ...toPx(19.0176, 72.8424),
        },
        orderIds: ['ORD-001', 'ORD-002'],
        status: 'completed',
        eta: '10:30 AM',
      },
      {
        stopNumber: 2,
        type: 'pickup',
        entityId: 'V2',
        entityName: 'Metro Distributors',
        location: {
          name: 'Metro Distributors — Andheri',
          address: 'Veera Desai Road, Andheri West',
          lat: 19.1194,
          lng: 72.8468,
          ...toPx(19.1194, 72.8468),
        },
        orderIds: ['ORD-003'],
        status: 'completed',
        eta: '11:15 AM',
      },
      {
        stopNumber: 3,
        type: 'drop',
        entityId: 'S3',
        entityName: 'City Electronics',
        location: {
          name: 'City Electronics — Vile Parle',
          address: 'Shopping Complex, Vile Parle East',
          lat: 19.0990,
          lng: 72.8446,
          ...toPx(19.0990, 72.8446),
        },
        orderIds: ['ORD-003'],
        status: 'en_route',
        eta: '12:30 PM',
      },
      {
        stopNumber: 4,
        type: 'drop',
        entityId: 'S2',
        entityName: 'Quick Mart',
        location: {
          name: 'Quick Mart — Juhu',
          address: 'Juhu Tara Road, Juhu',
          lat: 19.1035,
          lng: 72.8262,
          ...toPx(19.1035, 72.8262),
        },
        orderIds: ['ORD-002'],
        status: 'pending',
        eta: '1:15 PM',
      },
      {
        stopNumber: 5,
        type: 'drop',
        entityId: 'S1',
        entityName: 'Sharma General Store',
        location: {
          name: 'Sharma General Store — Bandra',
          address: 'Hill Road, Bandra West',
          lat: 19.0596,
          lng: 72.8295,
          ...toPx(19.0596, 72.8295),
        },
        orderIds: ['ORD-001'],
        status: 'pending',
        eta: '2:00 PM',
      },
    ],
  },
  {
    id: 'BATCH-002',
    label: 'Borivali→Goregaon Route',
    partnerId: null,
    orderIds: ['ORD-004', 'ORD-005'],
    vendorIds: ['V3'],
    shopkeeperIds: ['S4', 'S5'],
    status: 'available',
    estimatedCompletion: '2026-04-14T17:00:00+05:30',
    totalWeight: 56,
    createdAt: '2026-04-14T09:00:00+05:30',
    activeStopIndex: 0,
    route: [
      {
        stopNumber: 1,
        type: 'pickup',
        entityId: 'V3',
        entityName: 'Patel & Sons',
        location: {
          name: 'Patel & Sons — Borivali',
          address: 'IC Colony Cross Rd, Borivali West',
          lat: 19.2307,
          lng: 72.8561,
          ...toPx(19.2307, 72.8561),
        },
        orderIds: ['ORD-004', 'ORD-005'],
        status: 'pending',
        eta: '3:30 PM',
      },
      {
        stopNumber: 2,
        type: 'drop',
        entityId: 'S5',
        entityName: 'Fashion Hub',
        location: {
          name: 'Fashion Hub — Kandivali',
          address: 'Mahavir Nagar, Kandivali West',
          lat: 19.2053,
          lng: 72.8503,
          ...toPx(19.2053, 72.8503),
        },
        orderIds: ['ORD-004'],
        status: 'pending',
        eta: '4:15 PM',
      },
      {
        stopNumber: 3,
        type: 'drop',
        entityId: 'S4',
        entityName: 'Daily Needs',
        location: {
          name: 'Daily Needs — Goregaon',
          address: 'Aarey Road, Goregaon West',
          lat: 19.1612,
          lng: 72.8527,
          ...toPx(19.1612, 72.8527),
        },
        orderIds: ['ORD-005'],
        status: 'pending',
        eta: '5:00 PM',
      },
    ],
  },
];

// ─── Existing chart data (keep for compatibility) ─────────────────────────────
export const deliveryChartData = [
  { month: 'Jan', deliveries: 245, optimized: 180 },
  { month: 'Feb', deliveries: 280, optimized: 220 },
  { month: 'Mar', deliveries: 310, optimized: 260 },
  { month: 'Apr', deliveries: 295, optimized: 245 },
  { month: 'May', deliveries: 340, optimized: 290 },
  { month: 'Jun', deliveries: 380, optimized: 330 },
];

export const emissionsChartData = [
  { month: 'Jan', before: 450, after: 360 },
  { month: 'Feb', before: 480, after: 370 },
  { month: 'Mar', before: 520, after: 400 },
  { month: 'Apr', before: 490, after: 380 },
  { month: 'May', before: 550, after: 420 },
  { month: 'Jun', before: 600, after: 460 },
];

export const dashboardStats = [
  { title: 'Active Deliveries', value: '124', change: '+12%', trend: 'up', icon: 'Package' },
  { title: 'Optimized Routes', value: '89', change: '+8%', trend: 'up', icon: 'Route' },
  { title: 'Fleet Utilization', value: '87%', change: '+15%', trend: 'up', icon: 'Truck' },
  { title: 'CO₂ Saved', value: '2.4T', change: '-18%', trend: 'down', icon: 'Leaf' },
];

export const recentDeliveries = [
  { id: 'DEL-001', supplier: 'ABC Suppliers', destination: 'Retail Store A', status: 'In Transit', eta: '2:30 PM', driver: 'Rajesh Kumar' },
  { id: 'DEL-002', supplier: 'XYZ Distributors', destination: 'Retail Store B', status: 'Delivered', eta: '1:15 PM', driver: 'Priya Sharma' },
  { id: 'DEL-003', supplier: 'Global Goods', destination: 'Warehouse C', status: 'In Transit', eta: '3:45 PM', driver: 'Amit Patel' },
  { id: 'DEL-004', supplier: 'Local Suppliers', destination: 'Retail Store D', status: 'Scheduled', eta: '4:00 PM', driver: 'Sunita Desai' },
  { id: 'DEL-005', supplier: 'Metro Distributors', destination: 'Retail Store E', status: 'In Transit', eta: '2:00 PM', driver: 'Vikram Singh' },
];
