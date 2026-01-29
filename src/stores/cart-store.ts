import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, MenuItem, PortionSize } from '@/types';

interface CartState {
  restaurantId: string | null;
  items: CartItem[];
  
  // Actions
  addItem: (menuItem: MenuItem, quantity?: number, portionSize?: PortionSize, customizations?: CartItem['customizations'], specialInstructions?: string) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  setRestaurant: (restaurantId: string) => void;
  
  // Computed
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      restaurantId: null,
      items: [],
      
      addItem: (menuItem, quantity = 1, portionSize, customizations = [], specialInstructions) => {
        const state = get();
        
        // Check if switching restaurants
        if (state.restaurantId && state.restaurantId !== menuItem.restaurantId && state.items.length > 0) {
          // Clear cart if different restaurant
          set({ items: [], restaurantId: menuItem.restaurantId });
        }
        
        // Check if item already exists (same item, same portion, same customizations)
        const existingIndex = state.items.findIndex(
          item => 
            item.menuItem.id === menuItem.id &&
            item.portionSize === portionSize &&
            JSON.stringify(item.customizations) === JSON.stringify(customizations)
        );
        
        if (existingIndex > -1) {
          // Update quantity
          const newItems = [...state.items];
          newItems[existingIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          // Add new item
          set({
            restaurantId: menuItem.restaurantId,
            items: [
              ...state.items,
              {
                menuItem,
                quantity,
                portionSize,
                customizations,
                specialInstructions,
              },
            ],
          });
        }
      },
      
      removeItem: (menuItemId) => {
        set(state => ({
          items: state.items.filter(item => item.menuItem.id !== menuItemId),
        }));
      },
      
      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.menuItem.id === menuItemId
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [], restaurantId: null });
      },
      
      setRestaurant: (restaurantId) => {
        const state = get();
        if (state.restaurantId !== restaurantId) {
          set({ restaurantId, items: [] });
        }
      },
      
      getSubtotal: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          let itemPrice = item.menuItem.price;
          
          // Add portion size price difference if applicable
          if (item.portionSize && item.menuItem.portionSizes) {
            const sizeOption = item.menuItem.portionSizes.find(
              s => s.size === item.portionSize
            );
            if (sizeOption) {
              itemPrice = sizeOption.price;
            }
          }
          
          // Add customization prices
          const customizationTotal = item.customizations.reduce(
            (sum, c) => sum + c.price,
            0
          );
          
          return total + (itemPrice + customizationTotal) * item.quantity;
        }, 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'kevs-kitchen-cart',
    }
  )
);
