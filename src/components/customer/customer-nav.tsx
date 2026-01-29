"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  UtensilsCrossed, 
  Menu, 
  User, 
  Calendar, 
  History,
  LogOut,
  Heart,
  Settings,
  Star,
  Receipt
} from "lucide-react";
import { useDiningStore } from "@/stores/dining-store";
import { useUIStore } from "@/stores/ui-store";
import { useDemoAuth } from "@/stores/demo-auth-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/restaurants", label: "Restaurants" },
  { href: "/dining", label: "Dining" },
  { href: "/booking", label: "Reservations" },
];

export function CustomerNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useDemoAuth();
  const activeSession = useDiningStore((state) => state.activeSession);
  const orderCount = activeSession?.orders.length || 0;
  const { isSidebarOpen, setSidebarOpen } = useUIStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-wine flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-cream" />
          </div>
          <span className="font-serif text-2xl font-semibold text-foreground">
            Kevs
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith(link.href)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Active dining session button */}
          {activeSession && (
            <Link href="/dining">
              <Button
                variant="ghost"
                size="sm"
                className="relative gap-2 text-wine"
              >
                <Receipt className="h-4 w-4" />
                <span className="hidden sm:inline">Dining</span>
                {orderCount > 0 && (
                  <Badge 
                    className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-wine"
                  >
                    {orderCount}
                  </Badge>
                )}
              </Button>
            </Link>
          )}

          {/* User menu */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback className="bg-wine text-cream text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center gap-2 cursor-pointer">
                    <History className="h-4 w-4" />
                    Order History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/booking" className="flex items-center gap-2 cursor-pointer">
                    <Calendar className="h-4 w-4" />
                    Reservations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favorites" className="flex items-center gap-2 cursor-pointer">
                    <Heart className="h-4 w-4" />
                    Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/rewards" className="flex items-center gap-2 cursor-pointer">
                    <Star className="h-4 w-4" />
                    Rewards
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-6">
                {/* Navigation links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname.startsWith(link.href)
                          ? "bg-wine/10 text-wine"
                          : "hover:bg-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Auth buttons for mobile */}
                {!isAuthenticated && (
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Link href="/login" onClick={() => setSidebarOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={() => setSidebarOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                    </Link>
                  </div>
                )}
                {/* Logout for mobile */}
                {isAuthenticated && (
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full text-destructive"
                      onClick={() => {
                        handleLogout();
                        setSidebarOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
