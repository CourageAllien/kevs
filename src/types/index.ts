// User roles in the system
export type UserRole = 
  | 'CUSTOMER'
  | 'WAITER'
  | 'CHEF'
  | 'RECEPTIONIST'
  | 'OPERATIONS'
  | 'ADMIN'
  | 'MANAGER';

// Order status flow
export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'SERVED'
  | 'COMPLETED'
  | 'CANCELLED';

// Table status
export type TableStatus = 
  | 'AVAILABLE'
  | 'RESERVED'
  | 'OCCUPIED'
  | 'ORDERING'
  | 'EATING'
  | 'BILL_REQUESTED'
  | 'CLEANING';

// Reservation status
export type ReservationStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'SEATED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

// Dietary filters
export type DietaryTag = 
  | 'VEGETARIAN'
  | 'VEGAN'
  | 'GLUTEN_FREE'
  | 'HALAL'
  | 'KOSHER'
  | 'NUT_FREE'
  | 'DAIRY_FREE';

// Allergens
export type Allergen = 
  | 'GLUTEN'
  | 'CRUSTACEANS'
  | 'EGGS'
  | 'FISH'
  | 'PEANUTS'
  | 'SOYBEANS'
  | 'MILK'
  | 'NUTS'
  | 'CELERY'
  | 'MUSTARD'
  | 'SESAME'
  | 'SULPHITES'
  | 'LUPIN'
  | 'MOLLUSCS';

// Spice levels
export type SpiceLevel = 'MILD' | 'MEDIUM' | 'HOT' | 'EXTRA_HOT';

// Portion sizes
export type PortionSize = 'SMALL' | 'REGULAR' | 'LARGE';

// Payment methods
export type PaymentMethod = 
  | 'CARD'
  | 'APPLE_PAY'
  | 'GOOGLE_PAY'
  | 'GIFT_CARD'
  | 'LOYALTY_POINTS'
  | 'CASH';

// Table types
export type TableType = 
  | 'STANDARD'
  | 'BOOTH'
  | 'BAR'
  | 'OUTDOOR'
  | 'PRIVATE';

// Staff shift status
export type ShiftStatus = 'SCHEDULED' | 'CLOCKED_IN' | 'ON_BREAK' | 'CLOCKED_OUT';

// Message priority
export type MessagePriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

// Quick message types for customers
export type QuickMessage = 
  | 'NEED_ASSISTANCE'
  | 'READY_TO_ORDER'
  | 'NEED_BILL'
  | 'WATER_REFILL'
  | 'EXTRA_NAPKINS'
  | 'SPEAK_TO_MANAGER';

// Loyalty tiers
export type LoyaltyTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

// Kitchen order priority
export type KitchenPriority = 'NORMAL' | 'RUSH' | 'VIP';

// Common interfaces
export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  cuisine: string[];
  address: string;
  phone: string;
  email: string;
  image: string;
  logo: string;
  rating: number;
  reviewCount: number;
  priceRange: number; // 1-4 ($, $$, $$$, $$$$)
  openingHours: OpeningHours[];
  isOpen: boolean;
  features: string[];
}

export interface OpeningHours {
  dayOfWeek: number; // 0-6, Sunday = 0
  openTime: string; // HH:MM format
  closeTime: string;
  isClosed: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  image?: string;
  role: UserRole;
  restaurantId?: string; // For staff members
  loyaltyTier: LoyaltyTier;
  loyaltyPoints: number;
  createdAt: Date;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietaryTags: DietaryTag[];
  allergens: Allergen[];
  spiceLevel?: SpiceLevel;
  portionSizes?: { size: PortionSize; price: number }[];
  customizations?: MenuCustomization[];
  calories?: number;
  prepTime: number; // in minutes
  isAvailable: boolean;
  isPopular: boolean;
  isNew: boolean;
}

export interface MenuCustomization {
  id: string;
  name: string;
  type: 'ADD_ON' | 'REMOVE' | 'PREFERENCE';
  options: { name: string; price: number }[];
  required: boolean;
  maxSelections?: number;
}

export interface MenuCategory {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Table {
  id: string;
  restaurantId: string;
  number: number;
  name: string;
  type: TableType;
  capacity: number;
  status: TableStatus;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  currentOrderId?: string;
  assignedWaiterId?: string;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  userId: string;
  tableId: string;
  date: Date;
  time: string;
  partySize: number;
  status: ReservationStatus;
  specialOccasion?: string;
  notes?: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  restaurantId: string;
  tableId: string;
  userId: string;
  waiterId?: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  paymentMethod?: PaymentMethod;
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  menuItem: MenuItem;
  quantity: number;
  portionSize?: PortionSize;
  customizations: { name: string; option: string; price: number }[];
  specialInstructions?: string;
  status: OrderStatus;
  prepStartedAt?: Date;
  prepCompletedAt?: Date;
}

export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  orderId?: string;
  waiterId?: string;
  rating: number;
  comment?: string;
  foodRating: number;
  serviceRating: number;
  ambianceRating: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  tableId: string;
  content: string;
  quickMessageType?: QuickMessage;
  priority: MessagePriority;
  isRead: boolean;
  createdAt: Date;
}

export interface Staff {
  id: string;
  userId: string;
  restaurantId: string;
  role: UserRole;
  bio?: string;
  languages: string[];
  specialties: string[];
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  currentOrderCount: number;
}

// Cart types
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  portionSize?: PortionSize;
  customizations: { name: string; option: string; price: number }[];
  specialInstructions?: string;
}

export interface Cart {
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
}

// Analytics types
export interface DashboardStats {
  todayRevenue: number;
  todayOrders: number;
  currentOccupancy: number;
  totalTables: number;
  activeOrders: number;
  averageOrderValue: number;
  topSellingItems: { name: string; count: number }[];
}

export interface WaiterStats {
  tablesServed: number;
  ordersProcessed: number;
  averageServiceTime: number;
  tipsEarned: number;
  rating: number;
}

export interface KitchenStats {
  ordersInQueue: number;
  averagePrepTime: number;
  completedOrders: number;
  rushOrders: number;
}
