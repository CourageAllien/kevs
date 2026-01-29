import { create } from 'zustand';

interface UIState {
  // Mobile sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Cart sheet
  isCartOpen: boolean;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  
  // Menu filters
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  dietaryFilters: string[];
  toggleDietaryFilter: (filter: string) => void;
  clearFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Table selection (for booking)
  selectedTableId: string | null;
  setSelectedTableId: (tableId: string | null) => void;
  
  // Real-time connection status
  isConnected: boolean;
  setConnected: (connected: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Sidebar
  isSidebarOpen: false,
  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  
  // Cart
  isCartOpen: false,
  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
  setCartOpen: (open) => set({ isCartOpen: open }),
  
  // Filters
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  dietaryFilters: [],
  toggleDietaryFilter: (filter) => set(state => ({
    dietaryFilters: state.dietaryFilters.includes(filter)
      ? state.dietaryFilters.filter(f => f !== filter)
      : [...state.dietaryFilters, filter],
  })),
  clearFilters: () => set({ dietaryFilters: [], searchQuery: '', selectedCategory: null }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Table selection
  selectedTableId: null,
  setSelectedTableId: (tableId) => set({ selectedTableId: tableId }),
  
  // Connection
  isConnected: false,
  setConnected: (connected) => set({ isConnected: connected }),
}));
