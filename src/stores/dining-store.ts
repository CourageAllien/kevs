"use client";

import { create } from 'zustand';

// Order item in the current dining session
interface SessionOrderItem {
  id: string;
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  specialInstructions?: string;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'SERVED';
  orderedAt: Date;
  course: number; // 1, 2, 3 for starters, mains, desserts
}

// Custom request made to waiter
interface CustomRequest {
  id: string;
  type: 'WATER_REFILL' | 'EXTRA_NAPKINS' | 'CONDIMENTS' | 'BILL_REQUEST' | 'SPEAK_TO_WAITER' | 'OTHER';
  message: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'COMPLETED';
  price?: number; // If it's a chargeable request
  createdAt: Date;
}

// Message between customer and waiter
interface Message {
  id: string;
  senderId: string;
  senderType: 'CUSTOMER' | 'WAITER';
  content: string;
  createdAt: Date;
  isRead: boolean;
}

// The active dining session
interface DiningSession {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantSlug: string;
  tableId: string;
  tableName: string;
  tableNumber: string;
  reservationId?: string;
  
  // Waiter info
  waiterId: string;
  waiterName: string;
  waiterImage?: string;
  waiterRating: number;
  
  // Session timing
  seatedAt: Date;
  
  // Orders
  orders: SessionOrderItem[];
  
  // Custom requests
  customRequests: CustomRequest[];
  
  // Messages
  messages: Message[];
  unreadMessages: number;
  
  // Bill
  subtotal: number;
  tax: number;
  serviceCharge: number;
  tip: number;
  total: number;
  billRequested: boolean;
  isPaid: boolean;
}

interface DiningState {
  // Current active session
  activeSession: DiningSession | null;
  
  // Actions
  startSession: (session: Omit<DiningSession, 'orders' | 'customRequests' | 'messages' | 'unreadMessages' | 'subtotal' | 'tax' | 'serviceCharge' | 'tip' | 'total' | 'billRequested' | 'isPaid'>) => void;
  endSession: () => void;
  
  // Order actions
  addToOrder: (item: Omit<SessionOrderItem, 'id' | 'status' | 'orderedAt' | 'course'>) => void;
  updateOrderItemStatus: (itemId: string, status: SessionOrderItem['status']) => void;
  removeFromOrder: (itemId: string) => void;
  
  // Request actions
  addCustomRequest: (request: Omit<CustomRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateRequestStatus: (requestId: string, status: CustomRequest['status']) => void;
  
  // Message actions
  sendMessage: (content: string) => void;
  receiveMessage: (message: Omit<Message, 'id' | 'createdAt' | 'isRead'>) => void;
  markMessagesRead: () => void;
  
  // Bill actions
  requestBill: () => void;
  setTip: (amount: number) => void;
  markAsPaid: () => void;
  
  // Computed
  getRunningTotal: () => number;
  getPendingOrders: () => SessionOrderItem[];
  getActiveOrders: () => SessionOrderItem[];
}

// Using simple store without persistence to avoid SSR hydration issues
// Session data will be lost on page refresh, but this is acceptable for demo
export const useDiningStore = create<DiningState>()(
  (set, get) => ({
    activeSession: null,
      
      startSession: (sessionData) => {
        set({
          activeSession: {
            ...sessionData,
            orders: [],
            customRequests: [],
            messages: [
              // Welcome message from waiter
              {
                id: 'welcome',
                senderId: sessionData.waiterId,
                senderType: 'WAITER',
                content: `Hi! I'm ${sessionData.waiterName}, and I'll be taking care of you today. Feel free to message me anytime if you need anything!`,
                createdAt: new Date(),
                isRead: false,
              }
            ],
            unreadMessages: 1,
            subtotal: 0,
            tax: 0,
            serviceCharge: 0,
            tip: 0,
            total: 0,
            billRequested: false,
            isPaid: false,
          },
        });
      },
      
      endSession: () => {
        set({ activeSession: null });
      },
      
      addToOrder: (item) => {
        const session = get().activeSession;
        if (!session) return;
        
        const newItem: SessionOrderItem = {
          ...item,
          id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          status: 'PENDING',
          orderedAt: new Date(),
          course: 1, // Default to first course
        };
        
        const newOrders = [...session.orders, newItem];
        const subtotal = newOrders.reduce((sum, o) => sum + o.price * o.quantity, 0);
        const tax = subtotal * 0.08;
        const serviceCharge = subtotal * 0.05; // 5% service charge
        
        set({
          activeSession: {
            ...session,
            orders: newOrders,
            subtotal,
            tax,
            serviceCharge,
            total: subtotal + tax + serviceCharge + session.tip,
          },
        });
      },
      
      updateOrderItemStatus: (itemId, status) => {
        const session = get().activeSession;
        if (!session) return;
        
        set({
          activeSession: {
            ...session,
            orders: session.orders.map(o =>
              o.id === itemId ? { ...o, status } : o
            ),
          },
        });
      },
      
      removeFromOrder: (itemId) => {
        const session = get().activeSession;
        if (!session) return;
        
        const item = session.orders.find(o => o.id === itemId);
        if (!item || item.status !== 'PENDING') return; // Can only remove pending orders
        
        const newOrders = session.orders.filter(o => o.id !== itemId);
        const subtotal = newOrders.reduce((sum, o) => sum + o.price * o.quantity, 0);
        const tax = subtotal * 0.08;
        const serviceCharge = subtotal * 0.05;
        
        set({
          activeSession: {
            ...session,
            orders: newOrders,
            subtotal,
            tax,
            serviceCharge,
            total: subtotal + tax + serviceCharge + session.tip,
          },
        });
      },
      
      addCustomRequest: (request) => {
        const session = get().activeSession;
        if (!session) return;
        
        const newRequest: CustomRequest = {
          ...request,
          id: `req-${Date.now()}`,
          status: 'PENDING',
          createdAt: new Date(),
        };
        
        // If it has a price, add to total
        let newSubtotal = session.subtotal;
        if (request.price) {
          newSubtotal += request.price;
        }
        const tax = newSubtotal * 0.08;
        const serviceCharge = newSubtotal * 0.05;
        
        set({
          activeSession: {
            ...session,
            customRequests: [...session.customRequests, newRequest],
            subtotal: newSubtotal,
            tax,
            serviceCharge,
            total: newSubtotal + tax + serviceCharge + session.tip,
          },
        });
      },
      
      updateRequestStatus: (requestId, status) => {
        const session = get().activeSession;
        if (!session) return;
        
        set({
          activeSession: {
            ...session,
            customRequests: session.customRequests.map(r =>
              r.id === requestId ? { ...r, status } : r
            ),
          },
        });
      },
      
      sendMessage: (content) => {
        const session = get().activeSession;
        if (!session) return;
        
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          senderId: 'customer',
          senderType: 'CUSTOMER',
          content,
          createdAt: new Date(),
          isRead: true,
        };
        
        set({
          activeSession: {
            ...session,
            messages: [...session.messages, newMessage],
          },
        });
        
        // Simulate waiter response after 2 seconds
        setTimeout(() => {
          const currentSession = get().activeSession;
          if (!currentSession) return;
          
          const responses = [
            "I'll be right there!",
            "Of course, I'll take care of that for you.",
            "Absolutely, give me just a moment.",
            "Thank you for letting me know. I'm on it!",
            "No problem at all, coming right up.",
          ];
          
          const response: Message = {
            id: `msg-${Date.now()}-reply`,
            senderId: currentSession.waiterId,
            senderType: 'WAITER',
            content: responses[Math.floor(Math.random() * responses.length)],
            createdAt: new Date(),
            isRead: false,
          };
          
          set({
            activeSession: {
              ...currentSession,
              messages: [...currentSession.messages, response],
              unreadMessages: currentSession.unreadMessages + 1,
            },
          });
        }, 2000);
      },
      
      receiveMessage: (message) => {
        const session = get().activeSession;
        if (!session) return;
        
        const newMessage: Message = {
          ...message,
          id: `msg-${Date.now()}`,
          createdAt: new Date(),
          isRead: false,
        };
        
        set({
          activeSession: {
            ...session,
            messages: [...session.messages, newMessage],
            unreadMessages: session.unreadMessages + 1,
          },
        });
      },
      
      markMessagesRead: () => {
        const session = get().activeSession;
        if (!session) return;
        
        set({
          activeSession: {
            ...session,
            messages: session.messages.map(m => ({ ...m, isRead: true })),
            unreadMessages: 0,
          },
        });
      },
      
      requestBill: () => {
        const session = get().activeSession;
        if (!session) return;
        
        set({
          activeSession: {
            ...session,
            billRequested: true,
          },
        });
        
        // Also add a message
        get().sendMessage("Could I please have the bill?");
      },
      
      setTip: (amount) => {
        const session = get().activeSession;
        if (!session) return;
        
        set({
          activeSession: {
            ...session,
            tip: amount,
            total: session.subtotal + session.tax + session.serviceCharge + amount,
          },
        });
      },
      
      markAsPaid: () => {
        const session = get().activeSession;
        if (!session) return;
        
        set({
          activeSession: {
            ...session,
            isPaid: true,
          },
        });
      },
      
      getRunningTotal: () => {
        const session = get().activeSession;
        if (!session) return 0;
        return session.total;
      },
      
      getPendingOrders: () => {
        const session = get().activeSession;
        if (!session) return [];
        return session.orders.filter(o => o.status === 'PENDING');
      },
      
      getActiveOrders: () => {
        const session = get().activeSession;
        if (!session) return [];
        return session.orders.filter(o => !['SERVED', 'CANCELLED'].includes(o.status));
      },
    })
);
