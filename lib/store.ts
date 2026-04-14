/**
 * lib/store.ts
 * localStorage-based "database" + all business logic for the Shared Logistics Platform.
 * No React imports — pure TypeScript utility.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = 'shopkeeper' | 'vendor' | 'partner';
export type OrderStatus = 'pending' | 'pickup_scheduled' | 'picked_up' | 'in_transit' | 'delivered';
export type BatchStatus = 'open' | 'accepted' | 'in_progress' | 'completed';
export type StopStatus = 'pending' | 'arrived' | 'completed';

export interface UserLocation {
  lat: number;
  lng: number;
  address: string;
  px: number;
  py: number;
}

export interface DbUser {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  displayName: string;
  storeName: string;
  location: UserLocation;
  phone: string;
  avatarInitials: string;
  vehicle?: string;
  vehicleNumber?: string;
  rating?: number;
  completedDeliveries?: number;
}

export interface DbOrder {
  id: string;
  shopkeeperId: string;
  vendorId: string;
  batchId: string | null;
  productName: string;
  quantity: number;
  weight: number;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
}

export interface RouteStop {
  stopNumber: number;
  type: 'pickup' | 'drop';
  userId: string;
  displayName: string;
  address: string;
  lat: number;
  lng: number;
  px: number;
  py: number;
  orderIds: string[];
  status: StopStatus;
  eta: string;
  completedAt?: number;
}

export interface DbBatch {
  id: string;
  label: string;
  orderIds: string[];
  vendorIds: string[];
  shopkeeperIds: string[];
  partnerId: string | null;
  status: BatchStatus;
  route: RouteStop[];
  createdAt: number;
  acceptedAt: number | null;
  totalWeight: number;
  earnings: number;
}

export interface AppDB {
  orders: DbOrder[];
  batches: DbBatch[];
  version: number;
  lastUpdated: number;
}

// ─── Demo User Accounts ───────────────────────────────────────────────────────

export const DEMO_USERS: DbUser[] = [
  // ── Shopkeepers ──────────────────────────────────────────────────────────
  {
    id: 'SK1', username: 'anil', password: 'pass123', role: 'shopkeeper',
    displayName: 'Anil Sharma', storeName: 'Sharma General Store',
    location: { lat: 19.0596, lng: 72.8295, address: '12 Hill Road, Bandra West', px: 198, py: 290 },
    phone: '+91 99876 11111', avatarInitials: 'AS',
  },
  {
    id: 'SK2', username: 'sunita', password: 'pass123', role: 'shopkeeper',
    displayName: 'Sunita Joshi', storeName: 'Quick Mart',
    location: { lat: 19.1035, lng: 72.8262, address: 'Plot 4, Juhu Tara Road, Juhu', px: 185, py: 232 },
    phone: '+91 98700 22222', avatarInitials: 'SJ',
  },
  {
    id: 'SK3', username: 'farhan', password: 'pass123', role: 'shopkeeper',
    displayName: 'Farhan Sheikh', storeName: 'City Electronics',
    location: { lat: 19.0990, lng: 72.8446, address: 'Shopping Complex, Vile Parle East', px: 258, py: 238 },
    phone: '+91 97664 33333', avatarInitials: 'FS',
  },
  {
    id: 'SK4', username: 'pooja', password: 'pass123', role: 'shopkeeper',
    displayName: 'Pooja Nair', storeName: 'Daily Needs',
    location: { lat: 19.1612, lng: 72.8527, address: 'Aarey Road, Goregaon West', px: 291, py: 156 },
    phone: '+91 98500 44444', avatarInitials: 'PN',
  },
  {
    id: 'SK5', username: 'ritu', password: 'pass123', role: 'shopkeeper',
    displayName: 'Ritu Kapoor', storeName: 'Fashion Hub',
    location: { lat: 19.2053, lng: 72.8503, address: 'Mahavir Nagar, Kandivali West', px: 281, py: 98 },
    phone: '+91 99301 55555', avatarInitials: 'RK',
  },
  // ── Vendors ───────────────────────────────────────────────────────────────
  {
    id: 'VD1', username: 'ravi', password: 'pass123', role: 'vendor',
    displayName: 'Ravi Sharma', storeName: 'Ravi Traders',
    location: { lat: 19.0176, lng: 72.8424, address: 'Shop 14, Dadar Market, Dadar West', px: 250, py: 345 },
    phone: '+91 98201 12345', avatarInitials: 'RS',
  },
  {
    id: 'VD2', username: 'mehul', password: 'pass123', role: 'vendor',
    displayName: 'Mehul Desai', storeName: 'Metro Distributors',
    location: { lat: 19.1194, lng: 72.8468, address: '7 Veera Desai Road, Andheri West', px: 267, py: 211 },
    phone: '+91 99204 56789', avatarInitials: 'MD',
  },
  {
    id: 'VD3', username: 'bhavesh', password: 'pass123', role: 'vendor',
    displayName: 'Bhavesh Patel', storeName: 'Patel & Sons',
    location: { lat: 19.2307, lng: 72.8561, address: '3 IC Colony Cross Rd, Borivali West', px: 304, py: 65 },
    phone: '+91 98765 43210', avatarInitials: 'BP',
  },
  // ── Delivery Partners ─────────────────────────────────────────────────────
  {
    id: 'DP1', username: 'ramesh', password: 'pass123', role: 'partner',
    displayName: 'Ramesh Yadav', storeName: 'Mahindra Bolero Pickup',
    location: { lat: 19.07, lng: 72.84, address: 'Mumbai Central Depot', px: 240, py: 320 },
    phone: '+91 98450 66666', avatarInitials: 'RY',
    vehicle: 'Mahindra Bolero Pickup', vehicleNumber: 'MH-04-AZ-7821', rating: 4.8, completedDeliveries: 342,
  },
  {
    id: 'DP2', username: 'suresh', password: 'pass123', role: 'partner',
    displayName: 'Suresh Mehta', storeName: 'Tata Ace',
    location: { lat: 19.12, lng: 72.85, address: 'Andheri Depot', px: 260, py: 200 },
    phone: '+91 86750 77777', avatarInitials: 'SM',
    vehicle: 'Tata Ace', vehicleNumber: 'MH-02-BT-4412', rating: 4.6, completedDeliveries: 218,
  },
];

// ─── Storage Layer ────────────────────────────────────────────────────────────

const DB_KEY = 'slp_db_v3';
const SESSION_KEY = 'slp_session_v2';

function emptyDB(): AppDB {
  return { orders: [], batches: [], version: 0, lastUpdated: Date.now() };
}

export function getDB(): AppDB {
  if (typeof window === 'undefined') return emptyDB();
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? (JSON.parse(raw) as AppDB) : emptyDB();
  } catch {
    return emptyDB();
  }
}

export function setDB(db: AppDB): void {
  if (typeof window === 'undefined') return;
  const next: AppDB = { ...db, version: db.version + 1, lastUpdated: Date.now() };
  localStorage.setItem(DB_KEY, JSON.stringify(next));
  try { window.dispatchEvent(new Event('slp_update')); } catch { /* noop */ }
}

export function clearDB(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DB_KEY);
  try { window.dispatchEvent(new Event('slp_update')); } catch { /* noop */ }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export function login(username: string, password: string): DbUser | null {
  return DEMO_USERS.find(
    u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  ) ?? null;
}

export function getSession(): DbUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { userId } = JSON.parse(raw) as { userId: string };
    return DEMO_USERS.find(u => u.id === userId) ?? null;
  } catch { return null; }
}

export function saveSession(user: DbUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id }));
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatEta(minutesFromNow: number): string {
  const d = new Date(Date.now() + minutesFromNow * 60_000);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function nextOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function nextBatchId(): string {
  return `B-${Date.now().toString(36).toUpperCase().slice(-5)}`;
}

// ─── Route Builder ────────────────────────────────────────────────────────────

function buildRoute(pendingOrders: DbOrder[]): RouteStop[] {
  const route: RouteStop[] = [];
  let num = 1;
  let eta = 20;

  // One pickup stop per vendor (combined orders)
  const vendorIds = [...new Set(pendingOrders.map(o => o.vendorId))];
  for (const vId of vendorIds) {
    const v = DEMO_USERS.find(u => u.id === vId);
    if (!v) continue;
    route.push({
      stopNumber: num++,
      type: 'pickup',
      userId: v.id,
      displayName: v.storeName,
      address: v.location.address,
      lat: v.location.lat, lng: v.location.lng,
      px: v.location.px, py: v.location.py,
      orderIds: pendingOrders.filter(o => o.vendorId === vId).map(o => o.id),
      status: 'pending',
      eta: formatEta(eta),
    });
    eta += 25;
  }

  // One drop stop per shopkeeper
  const skIds = [...new Set(pendingOrders.map(o => o.shopkeeperId))];
  for (const skId of skIds) {
    const sk = DEMO_USERS.find(u => u.id === skId);
    if (!sk) continue;
    route.push({
      stopNumber: num++,
      type: 'drop',
      userId: sk.id,
      displayName: sk.storeName,
      address: sk.location.address,
      lat: sk.location.lat, lng: sk.location.lng,
      px: sk.location.px, py: sk.location.py,
      orderIds: pendingOrders.filter(o => o.shopkeeperId === skId).map(o => o.id),
      status: 'pending',
      eta: formatEta(eta),
    });
    eta += 20;
  }

  return route;
}

// ─── Order Operations ─────────────────────────────────────────────────────────

export function placeOrder(
  shopkeeperId: string,
  vendorId: string,
  productName: string,
  quantity: number,
  weight: number,
): DbOrder {
  const db = getDB();
  const order: DbOrder = {
    id: nextOrderId(),
    shopkeeperId, vendorId,
    batchId: null,
    productName, quantity, weight,
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  // Add order and attempt grouping
  const newDB = tryGroupOrders({ ...db, orders: [...db.orders, order] });
  setDB(newDB);
  return order;
}

// ─── Grouping Engine ──────────────────────────────────────────────────────────

export function tryGroupOrders(db: AppDB): AppDB {
  const unbatched = db.orders.filter(o => o.status === 'pending' && !o.batchId);
  if (unbatched.length < 2) return db;   // Need ≥2 to form a batch

  const toGroup = unbatched.slice(0, 5); // Max 5 orders per batch
  const batchId = nextBatchId();
  const route = buildRoute(toGroup);
  const totalWeight = toGroup.reduce((s, o) => s + o.weight, 0);
  const vendorIds = [...new Set(toGroup.map(o => o.vendorId))];
  const shopkeeperIds = [...new Set(toGroup.map(o => o.shopkeeperId))];

  const batch: DbBatch = {
    id: batchId,
    label: `${vendorIds.length} Pickup${vendorIds.length > 1 ? 's' : ''} → ${shopkeeperIds.length} Drop${shopkeeperIds.length > 1 ? 's' : ''}`,
    orderIds: toGroup.map(o => o.id),
    vendorIds, shopkeeperIds,
    partnerId: null,
    status: 'open',
    route,
    createdAt: Date.now(),
    acceptedAt: null,
    totalWeight,
    earnings: Math.round(totalWeight * 7 + route.length * 45),
  };

  const updatedOrders = db.orders.map(o =>
    toGroup.some(g => g.id === o.id)
      ? { ...o, batchId, status: 'pickup_scheduled' as OrderStatus, updatedAt: Date.now() }
      : o
  );

  return { ...db, orders: updatedOrders, batches: [...db.batches, batch] };
}

// ─── Batch Acceptance (Race Condition) ───────────────────────────────────────

export function acceptBatch(
  batchId: string,
  partnerId: string,
): { success: boolean; message: string } {
  // Re-read fresh state to minimise race window
  const db = getDB();
  const batch = db.batches.find(b => b.id === batchId);

  if (!batch) return { success: false, message: 'Batch not found.' };
  if (batch.status !== 'open' || batch.partnerId !== null) {
    const other = DEMO_USERS.find(u => u.id === batch.partnerId);
    return {
      success: false,
      message: `Already taken by ${other?.displayName ?? 'another partner'}! 🏎️`,
    };
  }

  const updatedBatches = db.batches.map(b =>
    b.id === batchId
      ? { ...b, partnerId, status: 'accepted' as BatchStatus, acceptedAt: Date.now() }
      : b
  );

  const updatedOrders = db.orders.map(o =>
    batch.orderIds.includes(o.id)
      ? { ...o, status: 'picked_up' as OrderStatus, updatedAt: Date.now() }
      : o
  );

  setDB({ ...db, batches: updatedBatches, orders: updatedOrders });
  return { success: true, message: '✅ Batch accepted! Head to first pickup.' };
}

// ─── Stop Status Updates ──────────────────────────────────────────────────────

export function markStopCompleted(batchId: string, stopIndex: number): void {
  const db = getDB();
  const bIdx = db.batches.findIndex(b => b.id === batchId);
  if (bIdx < 0) return;

  const batch = db.batches[bIdx];
  const stop = batch.route[stopIndex];
  if (!stop) return;

  const updatedRoute = batch.route.map((s, i) =>
    i === stopIndex ? { ...s, status: 'completed' as StopStatus, completedAt: Date.now() } : s
  );

  const newOrderStatus: OrderStatus =
    stop.type === 'pickup' ? 'in_transit' : 'delivered';

  const allDropsDone = updatedRoute.filter(s => s.type === 'drop').every(s => s.status === 'completed');
  const batchStatus: BatchStatus = allDropsDone ? 'completed' : 'in_progress';

  const updatedBatches = db.batches.map((b, i) =>
    i === bIdx ? { ...b, route: updatedRoute, status: batchStatus } : b
  );

  const updatedOrders = db.orders.map(o =>
    stop.orderIds.includes(o.id)
      ? { ...o, status: newOrderStatus, updatedAt: Date.now() }
      : o
  );

  setDB({ ...db, batches: updatedBatches, orders: updatedOrders });
}

// ─── Query Helpers ────────────────────────────────────────────────────────────

export const getVendors = () => DEMO_USERS.filter(u => u.role === 'vendor');
export const getUserById = (id: string) => DEMO_USERS.find(u => u.id === id);

export const getOrdersForShopkeeper = (skId: string) =>
  getDB().orders.filter(o => o.shopkeeperId === skId);

export const getOrdersForVendor = (vId: string) =>
  getDB().orders.filter(o => o.vendorId === vId);

export const getOpenBatches = () =>
  getDB().batches.filter(b => b.status === 'open');

export const getBatchesForShopkeeper = (skId: string) =>
  getDB().batches.filter(b => b.shopkeeperIds.includes(skId));

export const getBatchesForVendor = (vId: string) =>
  getDB().batches.filter(b => b.vendorIds.includes(vId));

export const getActiveBatchForPartner = (partnerId: string) =>
  getDB().batches.find(b => b.partnerId === partnerId && b.status !== 'completed') ?? null;

export const getDBVersion = () => getDB().version;
