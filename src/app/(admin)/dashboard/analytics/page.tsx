"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Users, 
  TrendingUp,
  TrendingDown,
  UtensilsCrossed,
  Clock,
  Star,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo analytics data
const revenueData = {
  today: 4850,
  yesterday: 4312,
  thisWeek: 28450,
  lastWeek: 25800,
  thisMonth: 112500,
  lastMonth: 98000,
};

const topSellingItems = [
  { name: "Spaghetti Carbonara", orders: 234, revenue: 5382, trend: 12 },
  { name: "Margherita Pizza", orders: 198, revenue: 3364, trend: -3 },
  { name: "Truffle Risotto", orders: 156, revenue: 4524, trend: 8 },
  { name: "Tiramisu", orders: 189, revenue: 2078, trend: 15 },
  { name: "Caesar Salad", orders: 145, revenue: 1740, trend: 5 },
];

const peakHours = [
  { hour: "12:00", orders: 45 },
  { hour: "13:00", orders: 52 },
  { hour: "18:00", orders: 38 },
  { hour: "19:00", orders: 67 },
  { hour: "20:00", orders: 73 },
  { hour: "21:00", orders: 55 },
];

const staffMetrics = [
  { name: "Sarah M.", role: "Waiter", orders: 456, rating: 4.9, revenue: 12450 },
  { name: "Mike J.", role: "Waiter", orders: 423, rating: 4.8, revenue: 11230 },
  { name: "Emily C.", role: "Waiter", orders: 398, rating: 4.7, revenue: 10560 },
  { name: "Chef Antonio", role: "Chef", orders: 890, rating: 4.9, revenue: 0 },
];

export default function AnalyticsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Insights and performance metrics</p>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="menu">Menu Performance</TabsTrigger>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{formatCurrency(revenueData.today)}</span>
                  <Badge className={cn(
                    "flex items-center gap-1",
                    Number(calculateChange(revenueData.today, revenueData.yesterday)) > 0 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  )}>
                    {Number(calculateChange(revenueData.today, revenueData.yesterday)) > 0 
                      ? <ArrowUp className="h-3 w-3" /> 
                      : <ArrowDown className="h-3 w-3" />
                    }
                    {Math.abs(Number(calculateChange(revenueData.today, revenueData.yesterday)))}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">vs yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{formatCurrency(revenueData.thisWeek)}</span>
                  <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    {calculateChange(revenueData.thisWeek, revenueData.lastWeek)}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">vs last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{formatCurrency(revenueData.thisMonth)}</span>
                  <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    {calculateChange(revenueData.thisMonth, revenueData.lastMonth)}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">vs last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Peak Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Peak Hours</CardTitle>
              <CardDescription>Order volume by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-40">
                {peakHours.map((hour) => (
                  <div key={hour.hour} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-wine rounded-t"
                      style={{ height: `${(hour.orders / 80) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{hour.hour}</span>
                    <span className="text-xs font-medium">{hour.orders}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Menu Performance Tab */}
        <TabsContent value="menu" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
              <CardDescription>This month's best performers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSellingItems.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-wine text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.revenue)}</p>
                      <Badge className={cn(
                        "text-xs",
                        item.trend > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {item.trend > 0 ? "+" : ""}{item.trend}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff Performance Tab */}
        <TabsContent value="staff" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {staffMetrics.map((staff) => (
              <Card key={staff.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{staff.name}</h3>
                      <Badge variant="outline">{staff.role}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-gold text-gold" />
                      <span className="font-bold">{staff.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{staff.orders}</p>
                      <p className="text-sm text-muted-foreground">Orders</p>
                    </div>
                    {staff.revenue > 0 && (
                      <div>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(staff.revenue)}</p>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-wine" />
                <p className="text-2xl font-bold">12.5 min</p>
                <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <UtensilsCrossed className="h-8 w-8 mx-auto mb-2 text-wine" />
                <p className="text-2xl font-bold">18 min</p>
                <p className="text-sm text-muted-foreground">Avg. Prep Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-wine" />
                <p className="text-2xl font-bold">45 min</p>
                <p className="text-sm text-muted-foreground">Avg. Table Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">3.2x</p>
                <p className="text-sm text-muted-foreground">Table Turnover</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
