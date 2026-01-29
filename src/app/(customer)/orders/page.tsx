"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  CheckCircle2,
  XCircle,
  MapPin,
  Receipt,
  ChefHat,
  UtensilsCrossed,
  RefreshCw,
  Star,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo order history
const orderHistory = [
  {
    id: "ORD-2001",
    restaurant: {
      name: "La Bella Italia",
      slug: "la-bella-italia",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
    },
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    items: [
      { name: "Spaghetti Carbonara", quantity: 2, price: 22.99 },
      { name: "Tiramisu", quantity: 1, price: 10.99 },
      { name: "Sparkling Water", quantity: 2, price: 4.99 },
    ],
    total: 66.95,
    status: "COMPLETED",
    waiter: "Sarah M.",
    rating: 5,
  },
  {
    id: "ORD-1998",
    restaurant: {
      name: "Tokyo Ramen House",
      slug: "tokyo-ramen-house",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop",
    },
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    items: [
      { name: "Tonkotsu Ramen", quantity: 2, price: 16.99 },
      { name: "Gyoza (6 pcs)", quantity: 1, price: 8.99 },
      { name: "Green Tea", quantity: 2, price: 3.50 },
    ],
    total: 49.97,
    status: "COMPLETED",
    waiter: "Mike J.",
    rating: 4,
  },
  {
    id: "ORD-1985",
    restaurant: {
      name: "El Mariachi",
      slug: "el-mariachi",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200&h=200&fit=crop",
    },
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    items: [
      { name: "Tacos Al Pastor", quantity: 3, price: 4.99 },
      { name: "Guacamole", quantity: 1, price: 9.99 },
      { name: "Margarita", quantity: 2, price: 12.99 },
    ],
    total: 50.93,
    status: "COMPLETED",
    waiter: "Emily C.",
    rating: null,
  },
  {
    id: "ORD-1972",
    restaurant: {
      name: "La Bella Italia",
      slug: "la-bella-italia",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
    },
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 16.99 },
      { name: "Bruschetta", quantity: 1, price: 12.99 },
    ],
    total: 29.98,
    status: "CANCELLED",
    waiter: null,
    rating: null,
  },
];

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  COMPLETED: { color: "bg-green-100 text-green-700", icon: <CheckCircle2 className="h-4 w-4" />, label: "Completed" },
  CANCELLED: { color: "bg-red-100 text-red-700", icon: <XCircle className="h-4 w-4" />, label: "Cancelled" },
  IN_PROGRESS: { color: "bg-yellow-100 text-yellow-700", icon: <ChefHat className="h-4 w-4" />, label: "In Progress" },
};

export default function OrdersPage() {
  const [orders] = useState(orderHistory);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      weekday: "short",
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const completedOrders = orders.filter(o => o.status === "COMPLETED");
  const cancelledOrders = orders.filter(o => o.status === "CANCELLED");

  const totalSpent = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const avgOrder = completedOrders.length > 0 ? totalSpent / completedOrders.length : 0;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold">Order History</h1>
          <p className="text-muted-foreground mt-1">View your past orders and receipts</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{completedOrders.length}</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{formatPrice(totalSpent)}</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{formatPrice(avgOrder)}</p>
              <p className="text-sm text-muted-foreground">Avg Order</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} formatDate={formatDate} formatPrice={formatPrice} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No completed orders yet</p>
                </CardContent>
              </Card>
            ) : (
              completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} formatDate={formatDate} formatPrice={formatPrice} />
              ))
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledOrders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <p className="text-muted-foreground">No cancelled orders</p>
                </CardContent>
              </Card>
            ) : (
              cancelledOrders.map((order) => (
                <OrderCard key={order.id} order={order} formatDate={formatDate} formatPrice={formatPrice} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrderCard({ 
  order, 
  formatDate, 
  formatPrice 
}: { 
  order: typeof orderHistory[0]; 
  formatDate: (date: Date) => string;
  formatPrice: (price: number) => string;
}) {
  const status = statusConfig[order.status];
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src={order.restaurant.image}
                alt={order.restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <CardTitle className="font-serif text-lg">{order.restaurant.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(order.date)}
              </div>
            </div>
          </div>
          <Badge className={cn("flex items-center gap-1", status.color)}>
            {status.icon}
            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Order items */}
        <div className="space-y-2 mb-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span className="text-muted-foreground">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Total and info */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Order #{order.id}
            {order.waiter && <span> · Served by {order.waiter}</span>}
          </div>
          <div className="text-right">
            <p className="font-semibold">{formatPrice(order.total)}</p>
          </div>
        </div>

        {/* Rating or Rate button */}
        {order.status === "COMPLETED" && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            {order.rating ? (
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">Your rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={cn(
                      "h-4 w-4",
                      star <= order.rating! ? "fill-gold text-gold" : "text-muted-foreground"
                    )} 
                  />
                ))}
              </div>
            ) : (
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Rate Order
              </Button>
            )}
            <div className="flex gap-2">
              <Link href={`/restaurants/${order.restaurant.slug}`}>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Order Again
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Receipt className="h-4 w-4 mr-2" />
                Receipt
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
