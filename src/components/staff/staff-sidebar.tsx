"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  UtensilsCrossed, 
  Menu,
  LayoutDashboard,
  ClipboardList,
  Users,
  ChefHat,
  CalendarDays,
  MessageSquare,
  Settings,
  LogOut,
  Clock,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemoAuth } from "@/stores/demo-auth-store";

const waiterLinks = [
  { href: "/waiter", label: "Dashboard", icon: LayoutDashboard },
  { href: "/waiter/orders", label: "Orders", icon: ClipboardList, badge: 3 },
  { href: "/waiter/tables", label: "My Tables", icon: Users },
  { href: "/waiter/messages", label: "Messages", icon: MessageSquare, badge: 2 },
];

const kitchenLinks = [
  { href: "/kitchen", label: "Kitchen Display", icon: ChefHat },
  { href: "/kitchen/orders", label: "Order Queue", icon: ClipboardList },
  { href: "/kitchen/inventory", label: "Inventory", icon: ClipboardList },
];

const receptionLinks = [
  { href: "/reception", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reception/reservations", label: "Reservations", icon: CalendarDays },
  { href: "/reception/waitlist", label: "Waitlist", icon: Clock },
  { href: "/reception/floor-plan", label: "Floor Plan", icon: Users },
];

export function StaffSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useDemoAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  // Determine which links to show based on the current path
  let links = waiterLinks;
  let title = "Waiter Portal";
  
  if (pathname.startsWith("/kitchen")) {
    links = kitchenLinks;
    title = "Kitchen Portal";
  } else if (pathname.startsWith("/reception")) {
    links = receptionLinks;
    title = "Reception Portal";
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-wine flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-cream" />
          </div>
          <div>
            <span className="font-serif text-xl font-semibold text-foreground block">
              Kevs
            </span>
            <span className="text-xs text-muted-foreground">{title}</span>
          </div>
        </Link>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || 
            (link.href !== "/waiter" && link.href !== "/kitchen" && link.href !== "/reception" && pathname.startsWith(link.href));
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-wine text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{link.label}</span>
              {link.badge && (
                <Badge className={cn(
                  "h-5 min-w-5 flex items-center justify-center p-0 text-xs",
                  isActive ? "bg-white text-wine" : "bg-wine text-white"
                )}>
                  {link.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User section */}
      <div className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback className="bg-wine text-cream">
              {user?.name?.charAt(0).toUpperCase() || "S"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.name || "Staff Member"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.role || "Staff"}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 border-r bg-card flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile header with hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-wine flex items-center justify-center">
            <UtensilsCrossed className="w-4 h-4 text-cream" />
          </div>
          <span className="font-serif text-lg font-semibold">{title}</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Spacer for mobile */}
      <div className="lg:hidden h-16" />
    </>
  );
}
