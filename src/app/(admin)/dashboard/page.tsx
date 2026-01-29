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
  MapPin,
  Lightbulb,
  PiggyBank,
  Wallet,
  CreditCard,
  Target,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Utensils
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemoAuth } from "@/stores/demo-auth-store";

// Demo financial stats
const financialStats = {
  // Revenue
  todayRevenue: 4850.00,
  weekRevenue: 28450.00,
  monthRevenue: 112500.00,
  yearRevenue: 1245000.00,
  
  // Profits
  todayProfit: 1940.00,
  weekProfit: 11380.00,
  monthProfit: 45000.00,
  yearProfit: 498000.00,
  profitMargin: 40,
  
  // Expenses
  monthExpenses: 67500.00,
  rentExpense: 15000.00,
  laborExpense: 35000.00,
  foodCostExpense: 12000.00,
  utilitiesExpense: 3500.00,
  marketingExpense: 2000.00,
  
  // Growth
  revenueGrowth: 12.5,
  customerGrowth: 8.2,
  orderGrowth: 15.4,
};

// Demo investments
const investments = [
  { 
    id: 1, 
    name: "Kitchen Equipment Upgrade", 
    amount: 45000, 
    date: "Jan 2026", 
    roi: 28, 
    status: "COMPLETED",
    description: "New commercial ovens and prep stations"
  },
  { 
    id: 2, 
    name: "Outdoor Patio Expansion", 
    amount: 85000, 
    date: "Dec 2025", 
    roi: 35, 
    status: "COMPLETED",
    description: "Added 40 more seats outdoors"
  },
  { 
    id: 3, 
    name: "POS System Upgrade", 
    amount: 12000, 
    date: "Nov 2025", 
    roi: 45, 
    status: "COMPLETED",
    description: "Modern tablet-based ordering"
  },
  { 
    id: 4, 
    name: "Marketing Campaign", 
    amount: 25000, 
    date: "Feb 2026", 
    roi: null, 
    status: "IN_PROGRESS",
    description: "Social media and local advertising"
  },
];

// Demo suggestions
const suggestions = [
  {
    id: 1,
    title: "Increase Weekend Staffing",
    description: "Data shows 32% more customers on weekends but current staff struggles. Adding 2 waiters on Sat/Sun could increase revenue by $2,500/week.",
    impact: "high",
    category: "staffing",
    potentialRevenue: 2500,
  },
  {
    id: 2,
    title: "Add Lunch Specials",
    description: "Lunch traffic is 45% below dinner. A $12.99 lunch special menu could capture the business crowd nearby.",
    impact: "high",
    category: "menu",
    potentialRevenue: 4200,
  },
  {
    id: 3,
    title: "Implement Happy Hour",
    description: "4-6 PM sees the lowest traffic. Happy hour drinks and appetizers could fill this gap and increase bar revenue.",
    impact: "medium",
    category: "promotion",
    potentialRevenue: 1800,
  },
  {
    id: 4,
    title: "Partner with Delivery Apps",
    description: "30% of similar restaurants see 20%+ revenue increase from delivery partnerships. Consider DoorDash/UberEats.",
    impact: "medium",
    category: "expansion",
    potentialRevenue: 8500,
  },
  {
    id: 5,
    title: "Loyalty Program Enhancement",
    description: "Current loyalty redemption is low. Push notifications and birthday rewards could increase repeat visits by 25%.",
    impact: "low",
    category: "marketing",
    potentialRevenue: 1200,
  },
];

// Demo alerts
const alerts = [
  { id: 1, type: "warning", message: "Low stock: Truffle Oil (2 remaining)", time: "1h ago" },
  { id: 2, type: "info", message: "New reservation for 8 guests at 7:30 PM", time: "2h ago" },
  { id: 3, type: "success", message: "Monthly revenue target achieved!", time: "3h ago" },
];

// Demo recent orders
const recentOrders = [
  { id: "ORD-1001", table: "Table 5", amount: 89.50, status: "COMPLETED", time: "10 min ago" },
  { id: "ORD-1000", table: "Table 3", amount: 124.00, status: "IN_PROGRESS", time: "15 min ago" },
  { id: "ORD-999", table: "Table 8", amount: 67.25, status: "COMPLETED", time: "22 min ago" },
  { id: "ORD-998", table: "Table 2", amount: 45.00, status: "COMPLETED", time: "35 min ago" },
];

// Demo staff performance
const staffPerformance = [
  { name: "Sarah M.", role: "Waiter", orders: 28, rating: 4.9, tips: 127 },
  { name: "Mike J.", role: "Waiter", orders: 24, rating: 4.8, tips: 98 },
  { name: "Emily C.", role: "Waiter", orders: 21, rating: 4.7, tips: 85 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useDemoAuth();
  const now = new Date();
  
  // Check if user is admin (owner) - only admin sees finances and investments
  const isAdmin = user?.role === "ADMIN";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const avgROI = investments.filter(i => i.roi).reduce((sum, i) => sum + (i.roi || 0), 0) / investments.filter(i => i.roi).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-wine text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="font-serif text-3xl font-bold">{isAdmin ? "Owner Dashboard" : "Manager Dashboard"}</h1>
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
        {/* Tabs - Finances and Investments only visible to Admin (Owner) */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className={cn("grid w-full max-w-lg", isAdmin ? "grid-cols-4" : "grid-cols-2")}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {isAdmin && <TabsTrigger value="finances">Finances</TabsTrigger>}
            {isAdmin && <TabsTrigger value="investments">Investments</TabsTrigger>}
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Key Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 font-medium">Today's Revenue</p>
                      <p className="text-3xl font-bold text-green-800">{formatCurrency(financialStats.todayRevenue)}</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-200">
                      <DollarSign className="h-6 w-6 text-green-700" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-sm text-green-700">
                    <ArrowUpRight className="h-4 w-4" />
                    {financialStats.revenueGrowth}% vs yesterday
                  </div>
                </CardContent>
              </Card>

              {isAdmin ? (
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-700 font-medium">Today's Profit</p>
                        <p className="text-3xl font-bold text-blue-800">{formatCurrency(financialStats.todayProfit)}</p>
                      </div>
                      <div className="p-3 rounded-full bg-blue-200">
                        <PiggyBank className="h-6 w-6 text-blue-700" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-sm text-blue-700">
                      <span>{financialStats.profitMargin}% profit margin</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-700 font-medium">Orders Today</p>
                        <p className="text-3xl font-bold text-blue-800">87</p>
                      </div>
                      <div className="p-3 rounded-full bg-blue-200">
                        <UtensilsCrossed className="h-6 w-6 text-blue-700" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-sm text-blue-700">
                      <ArrowUpRight className="h-4 w-4" />
                      8.2% vs yesterday
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700 font-medium">Monthly Revenue</p>
                      <p className="text-3xl font-bold text-purple-800">{formatCurrency(financialStats.monthRevenue)}</p>
                    </div>
                    <div className="p-3 rounded-full bg-purple-200">
                      <BarChart3 className="h-6 w-6 text-purple-700" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Progress value={75} className="h-2 bg-purple-200" />
                    <p className="text-xs text-purple-600 mt-1">75% of monthly target</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-700 font-medium">{isAdmin ? "Year to Date" : "Customers Today"}</p>
                      <p className="text-3xl font-bold text-orange-800">{isAdmin ? formatCurrency(financialStats.yearRevenue) : "156"}</p>
                    </div>
                    <div className="p-3 rounded-full bg-orange-200">
                      {isAdmin ? <TrendingUp className="h-6 w-6 text-orange-700" /> : <Users className="h-6 w-6 text-orange-700" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-sm text-orange-700">
                    {isAdmin ? (
                      <span>Profit: {formatCurrency(financialStats.yearProfit)}</span>
                    ) : (
                      <>
                        <ArrowUpRight className="h-4 w-4" />
                        42 currently seated
                      </>
                    )}
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

            {/* Quick Suggestions */}
            <Card className="mb-6 border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg text-blue-800">Top Opportunity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{suggestions[0].title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{suggestions[0].description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">+{formatCurrency(suggestions[0].potentialRevenue)}/wk</p>
                    <p className="text-xs text-muted-foreground">potential revenue</p>
                  </div>
                </div>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700" size="sm" onClick={() => setActiveTab("insights")}>
                  View All Insights
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Orders */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest orders from the floor</CardDescription>
                  </div>
                  <Link href="/dashboard/reservations">
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

              {/* Staff Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Staff Today</CardTitle>
                  <CardDescription>Best performers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffPerformance.map((staff, idx) => (
                      <div key={staff.name} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-wine text-white text-sm flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">{staff.orders} orders · <Star className="h-3 w-3 inline fill-gold text-gold" /> {staff.rating}</p>
                        </div>
                        <span className="font-semibold text-green-600">${staff.tips}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/admin/staff">
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      Manage Staff
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

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
              
              <Link href="/dashboard/reservations">
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
              
              <Link href="/dashboard/analytics">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-3 rounded-full bg-purple-100">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Analytics</p>
                      <p className="text-sm text-muted-foreground">Deep insights</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </>
        )}

        {/* Finances Tab - Admin Only */}
        {activeTab === "finances" && isAdmin && (
          <>
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Revenue Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Today</p>
                        <p className="text-2xl font-bold">{formatCurrency(financialStats.todayRevenue)}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        {financialStats.revenueGrowth}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">This Week</p>
                        <p className="text-lg font-bold">{formatCurrency(financialStats.weekRevenue)}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">This Month</p>
                        <p className="text-lg font-bold">{formatCurrency(financialStats.monthRevenue)}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Year to Date</p>
                        <p className="text-lg font-bold">{formatCurrency(financialStats.yearRevenue)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profit Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-blue-600" />
                    Profit Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Profit</p>
                        <p className="text-2xl font-bold">{formatCurrency(financialStats.monthProfit)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-blue-600">{financialStats.profitMargin}%</p>
                        <p className="text-xs text-muted-foreground">margin</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Weekly Profit</p>
                        <p className="text-lg font-bold">{formatCurrency(financialStats.weekProfit)}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Yearly Profit</p>
                        <p className="text-lg font-bold">{formatCurrency(financialStats.yearProfit)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-red-600" />
                  Monthly Expenses Breakdown
                </CardTitle>
                <CardDescription>Total: {formatCurrency(financialStats.monthExpenses)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="p-4 border rounded-lg text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">{formatCurrency(financialStats.rentExpense)}</p>
                    <p className="text-sm text-muted-foreground">Rent</p>
                    <Progress value={(financialStats.rentExpense / financialStats.monthExpenses) * 100} className="h-1 mt-2" />
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">{formatCurrency(financialStats.laborExpense)}</p>
                    <p className="text-sm text-muted-foreground">Labor</p>
                    <Progress value={(financialStats.laborExpense / financialStats.monthExpenses) * 100} className="h-1 mt-2" />
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Utensils className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">{formatCurrency(financialStats.foodCostExpense)}</p>
                    <p className="text-sm text-muted-foreground">Food Cost</p>
                    <Progress value={(financialStats.foodCostExpense / financialStats.monthExpenses) * 100} className="h-1 mt-2" />
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Lightbulb className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">{formatCurrency(financialStats.utilitiesExpense)}</p>
                    <p className="text-sm text-muted-foreground">Utilities</p>
                    <Progress value={(financialStats.utilitiesExpense / financialStats.monthExpenses) * 100} className="h-1 mt-2" />
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Target className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-2xl font-bold">{formatCurrency(financialStats.marketingExpense)}</p>
                    <p className="text-sm text-muted-foreground">Marketing</p>
                    <Progress value={(financialStats.marketingExpense / financialStats.monthExpenses) * 100} className="h-1 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Investments Tab - Admin Only */}
        {activeTab === "investments" && isAdmin && (
          <>
            {/* Investment Summary */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-10 w-10 mx-auto mb-3 text-indigo-600" />
                  <p className="text-sm text-indigo-700 font-medium">Total Invested</p>
                  <p className="text-3xl font-bold text-indigo-800">{formatCurrency(totalInvestments)}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-10 w-10 mx-auto mb-3 text-green-600" />
                  <p className="text-sm text-green-700 font-medium">Average ROI</p>
                  <p className="text-3xl font-bold text-green-800">{avgROI.toFixed(1)}%</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                  <p className="text-sm text-blue-700 font-medium">Completed</p>
                  <p className="text-3xl font-bold text-blue-800">{investments.filter(i => i.status === "COMPLETED").length}/{investments.length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Investment List */}
            <Card>
              <CardHeader>
                <CardTitle>Investment History</CardTitle>
                <CardDescription>Track your business investments and their returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{inv.name}</h3>
                          <Badge className={cn(
                            inv.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          )}>
                            {inv.status === "COMPLETED" ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{inv.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{inv.date}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-xl font-bold">{formatCurrency(inv.amount)}</p>
                        {inv.roi ? (
                          <p className="text-sm text-green-600 font-medium">
                            <ArrowUpRight className="h-3 w-3 inline" />
                            {inv.roi}% ROI
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">ROI pending</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Insights Tab */}
        {activeTab === "insights" && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  AI-Powered Business Suggestions
                </CardTitle>
                <CardDescription>Data-driven recommendations to grow your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{suggestion.title}</h3>
                            <Badge className={cn(
                              suggestion.impact === "high" ? "bg-red-100 text-red-700" :
                              suggestion.impact === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-gray-100 text-gray-700"
                            )}>
                              {suggestion.impact} impact
                            </Badge>
                            <Badge variant="outline">{suggestion.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xl font-bold text-green-600">+{formatCurrency(suggestion.potentialRevenue)}</p>
                          <p className="text-xs text-muted-foreground">per week</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">Learn More</Button>
                        <Button size="sm" className="bg-wine hover:bg-wine/90">Implement</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Potential Impact Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Total Potential Impact</h3>
                    <p className="text-muted-foreground">If all high-impact suggestions are implemented</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">
                      +{formatCurrency(suggestions.filter(s => s.impact === "high").reduce((sum, s) => sum + s.potentialRevenue, 0) * 4)}
                    </p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
