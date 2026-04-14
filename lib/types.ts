// ─── Core Types ───────────────────────────────────────────────────────────────

export type UserRole = 'shopkeeper' | 'vendor' | 'partner';

export type OrderStatus =
  | 'pending'
  | 'pickup_scheduled'
  | 'picked_up'
  | 'in_transit'
  | 'delivered';

export type BatchStatus = 'available' | 'accepted' | 'in_progress' | 'completed';

export type StopStatus = 'pending' | 'en_route' | 'arrived' | 'completed';

// ─── Entities ────────────────────────────────────────────────────────────────

export interface GeoLocation {
  name: string;
  address: string;
  lat: number;
  lng: number;
  /** Pre-calculated SVG pixel position */
  px: number;
  py: number;
}

export interface Vendor {
  id: string;
  storeName: string;
  ownerName: string;
  productType: string;
  location: GeoLocation;
  phone: string;
  email: string;
  avatarInitials: string;
}

export interface Shopkeeper {
  id: string;
  storeName: string;
  ownerName: string;
  location: GeoLocation;
  phone: string;
  email: string;
  avatarInitials: string;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  vehicle: string;
  vehicleNumber: string;
  phone: string;
  rating: number;
  completedDeliveries: number;
  currentLat: number;
  currentLng: number;
  currentPx: number;
  currentPy: number;
  avatarInitials: string;
}

// ─── Orders & Batches ────────────────────────────────────────────────────────

export interface Order {
  id: string;
  vendorId: string;
  shopkeeperId: string;
  batchId: string | null;
  productName: string;
  quantity: number;
  weight: number; // kg
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  actualDelivery?: string;
}

export interface RouteStop {
  stopNumber: number;
  type: 'pickup' | 'drop';
  entityId: string;     // vendorId or shopkeeperId
  entityName: string;
  location: GeoLocation;
  orderIds: string[];
  status: StopStatus;
  eta: string;
}

export interface Batch {
  id: string;
  label: string;
  partnerId: string | null;
  orderIds: string[];
  vendorIds: string[];
  shopkeeperIds: string[];
  route: RouteStop[];
  status: BatchStatus;
  estimatedCompletion: string;
  totalWeight: number;
  createdAt: string;
  /** Index (0..route.length-1) of stop the partner is heading toward */
  activeStopIndex: number;
}

// ─── Simulation ───────────────────────────────────────────────────────────────

export interface SimPosition {
  px: number;
  py: number;
  lat: number;
  lng: number;
}

export interface SimulationState {
  position: SimPosition;
  progress: number;        // 0-1 along current segment
  currentSegment: number;  // 0 = depot→stop[0], 1 = stop[0]→stop[1] …
  totalProgress: number;   // 0-1 across full route
  completedStopIds: string[];
  isRunning: boolean;
}
