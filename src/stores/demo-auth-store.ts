"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";
import type { UserRole } from "@/types";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  restaurantId?: string;
}

// Demo users for testing
export const demoUsers: Record<string, DemoUser> = {
  customer: {
    id: "demo-customer-1",
    name: "John Customer",
    email: "demo@customer.com",
    role: "CUSTOMER",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  waiter: {
    id: "demo-waiter-1",
    name: "Sarah Waiter",
    email: "demo@waiter.com",
    role: "WAITER",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    restaurantId: "rest-1",
  },
  chef: {
    id: "demo-chef-1",
    name: "Marcus Chef",
    email: "demo@chef.com",
    role: "CHEF",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop",
    restaurantId: "rest-1",
  },
  receptionist: {
    id: "demo-receptionist-1",
    name: "Emily Receptionist",
    email: "demo@reception.com",
    role: "RECEPTIONIST",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    restaurantId: "rest-1",
  },
  manager: {
    id: "demo-manager-1",
    name: "Alex Manager",
    email: "demo@manager.com",
    role: "MANAGER",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    restaurantId: "rest-1",
  },
  admin: {
    id: "demo-admin-1",
    name: "Admin User",
    email: "demo@admin.com",
    role: "ADMIN",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
};

interface DemoAuthState {
  user: DemoUser | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  login: (userType: keyof typeof demoUsers) => void;
  loginAsUser: (user: DemoUser) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useDemoAuthStore = create<DemoAuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      login: (userType) => {
        const user = demoUsers[userType];
        if (user) {
          set({ user, isAuthenticated: true });
        }
      },
      loginAsUser: (user) => {
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: "kevs-kitchen-demo-auth",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Hook that waits for hydration to avoid SSR mismatches
export function useDemoAuth() {
  const store = useDemoAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Return default values during SSR/hydration
  if (!isHydrated) {
    return {
      user: null,
      isAuthenticated: false,
      login: store.login,
      loginAsUser: store.loginAsUser,
      logout: store.logout,
    };
  }

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    login: store.login,
    loginAsUser: store.loginAsUser,
    logout: store.logout,
  };
}

// Helper to get redirect URL based on role
export function getRoleRedirectUrl(role: UserRole): string {
  switch (role) {
    case "ADMIN":
    case "MANAGER":
      return "/dashboard";
    case "WAITER":
      return "/waiter";
    case "CHEF":
      return "/kitchen";
    case "RECEPTIONIST":
      return "/reception";
    case "OPERATIONS":
      return "/dashboard";
    default:
      return "/restaurants";
  }
}
