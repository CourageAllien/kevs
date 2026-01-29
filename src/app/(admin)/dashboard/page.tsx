"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Users, 
  UtensilsCrossed, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  ChefHat,
  Star,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Receipt,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo stats
const todayStats = {
  revenue: 4850.00,
  revenueChange: 12.5,
  orders: 87,
  ordersChange: 8.2,
  customers: 156,
  customersChange: -2.4,
  avgTicket: 55.75,
  avgTicketChange: 4.1,
};

// Demo recent orders
const recentOrders = [
  { id: "ORD-1001", table: "Table 5", amount: 89.50, status: "COMPLETED", time: "10 min ago" },
  { id: "ORD-1000", table: "Table 3", amount: 124.00, status: "IN_PROGRESS", time: "15 min ago" },
  { id: "ORD-999", table: "Table 8", amount: 67.25, status: "COMPLETED", time: "22 min ago" },
  { id: "ORD-998", table: "Table 2", amount: 45.00, status: "COMPLETED", time: "35 min ago" },
  { id: "ORD-997", table: "Table 12", amount: 156.75, status: "IN_PROGRESS", time: "40 min ago" },
];

// Demo alerts
const alerts = [
  { id: 1, type: "warning", message: "Low stock: Truffle Oil (2 remaining)", time: "1h ago" },
  { id: 2, type: "info", message: "New reservation for 8 guests at 7:30 PM", time: "2h ago" },
  { id: 3, type: "success", message: "Staff member Sarah completed training", time: "3h ago" },
];

// Demo top items
const topItems = [
  { name: "Spaghetti Carbonara", orders: 34, revenue: 782.66 },
  { name: "Margherita Pizza", orders: 28, revenue: 475.72 },
  { name: "Truffle Risotto", orders: 22, revenue: 571.78 },
  { name: "Tiramisu", orders: 19, revenue: 208.81 },
  { name: "Caesar Salad", orders: 17, revenue: 203.83 },
];

// Demo staff performance
const staffPerformance = [
  { name: "Sarah M.", role: "Waiter", orders: 28, rating: 4.9, tips: 127 },
  { name: "Mike J.", role: "Waiter", orders: 24, rating: 4.8, tips: 98 },
  { name: "Emily C.", role: "Waiter", orders: 21, rating: 4.7, tips: 85 },
  { name: "Chef Antonio", role: "Chef", orders: 45, rating: 4.9, tips: 0 },
];

export default function AdminDashboard() {
  const now = new Date();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-wine text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
              <p className="text-white/80">
                {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
              Restaurant Open
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Revenue</p>
                  <p className="text-3xl font-bold">${todayStats.revenue.toLocaleString()}</p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm",
                  todayStats.revenueChange > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {todayStats.revenueChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {Math.abs(todayStats.revenueChange)}%
                </div>
              </div>
              <div className="mt-4">
                <Progress value={68} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">68% of daily goal</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="text-3xl font-bold">{todayStats.orders}</p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm",
                  todayStats.ordersChange > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {todayStats.ordersChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {Math.abs(todayStats.ordersChange)}%
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">12 in progress</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Customers</p>
                  <p className="text-3xl font-bold">{todayStats.customers}</p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm",
                  todayStats.customersChange > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {todayStats.customersChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {Math.abs(todayStats.customersChange)}%
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">42 currently seated</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Ticket</p>
                  <p className="text-3xl font-bold">${todayStats.avgTicket.toFixed(2)}</p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm",
                  todayStats.avgTicketChange > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {todayStats.avgTicketChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {Math.abs(todayStats.avgTicketChange)}%
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Receipt className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">vs $53.50 yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Alerts & Notifications</span>
              </div>
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between text-sm">
                    <span>{alert.message}</span>
                    <span className="text-muted-foreground">{alert.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from the floor</CardDescription>
              </div>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-muted">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.table} · {order.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={cn(
                        order.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      )}>
                        {order.status === "COMPLETED" ? "Completed" : "In Progress"}
                      </Badge>
                      <span className="font-semibold">${order.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Items */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
              <CardDescription>Most popular today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topItems.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-wine text-white text-sm flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                    </div>
                    <span className="font-semibold text-green-600">${item.revenue.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Performance */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Staff Performance</CardTitle>
              <CardDescription>Today's top performers</CardDescription>
            </div>
            <Link href="/admin/staff">
              <Button variant="outline" size="sm">
                Manage Staff
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {staffPerformance.map((staff) => (
                <div key={staff.name} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{staff.name}</span>
                    <Badge variant="outline">{staff.role}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mt-3">
                    <div>
                      <p className="text-lg font-bold">{staff.orders}</p>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        {staff.rating}
                      </p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">${staff.tips}</p>
                      <p className="text-xs text-muted-foreground">Tips</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          <Link href="/admin/menu">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 rounded-full bg-wine/10">
                  <UtensilsCrossed className="h-5 w-5 text-wine" />
                </div>
                <div>
                  <p className="font-semibold">Menu Management</p>
                  <p className="text-sm text-muted-foreground">Edit items & prices</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/staff">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Staff Management</p>
                  <p className="text-sm text-muted-foreground">Schedules & roles</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/reception">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-100">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Reservations</p>
                  <p className="text-sm text-muted-foreground">View & manage</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/kitchen">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-3 rounded-full bg-orange-100">
                  <ChefHat className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold">Kitchen Display</p>
                  <p className="text-sm text-muted-foreground">Live orders</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
