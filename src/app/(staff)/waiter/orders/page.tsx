"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Clock, 
  CheckCircle2,
  AlertCircle,
  ChefHat,
  Timer,
  Search,
  Filter,
  Bell,
  UtensilsCrossed
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo orders data
const allOrders = [
  {
    id: "ORD-001",
    table: "Table 3",
    customerName: "John & Sarah",
    items: [
      { name: "Spaghetti Carbonara", quantity: 2, status: "PREPARING", notes: "Extra cheese" },
      { name: "Caesar Salad", quantity: 1, status: "READY", notes: "" },
      { name: "Tiramisu", quantity: 2, status: "PENDING", notes: "" },
    ],
    status: "IN_PROGRESS",
    orderTime: new Date(Date.now() - 1000 * 60 * 25),
    total: 68.95,
  },
  {
    id: "ORD-002",
    table: "Table 7",
    customerName: "Mike Wilson",
    items: [
      { name: "Margherita Pizza", quantity: 1, status: "READY", notes: "" },
      { name: "Garlic Bread", quantity: 1, status: "READY", notes: "" },
    ],
    status: "READY",
    orderTime: new Date(Date.now() - 1000 * 60 * 15),
    total: 24.98,
  },
  {
    id: "ORD-003",
    table: "Table 12",
    customerName: "Emily Chen",
    items: [
      { name: "Truffle Risotto", quantity: 1, status: "PENDING", notes: "Gluten-free" },
      { name: "Bruschetta", quantity: 1, status: "PENDING", notes: "" },
    ],
    status: "NEW",
    orderTime: new Date(Date.now() - 1000 * 60 * 3),
    total: 42.50,
  },
  {
    id: "ORD-004",
    table: "Table 5",
    customerName: "David Brown",
    items: [
      { name: "Lobster Linguine", quantity: 1, status: "SERVED", notes: "" },
      { name: "House Salad", quantity: 1, status: "SERVED", notes: "" },
    ],
    status: "SERVED",
    orderTime: new Date(Date.now() - 1000 * 60 * 45),
    total: 52.00,
  },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  NEW: { bg: "bg-red-100", text: "text-red-700" },
  IN_PROGRESS: { bg: "bg-yellow-100", text: "text-yellow-700" },
  READY: { bg: "bg-green-100", text: "text-green-700" },
  SERVED: { bg: "bg-gray-100", text: "text-gray-700" },
};

export default function WaiterOrdersPage() {
  const [orders, setOrders] = useState(allOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof allOrders[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getTimeSince = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
  };

  const handleMarkServed = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: "SERVED" } : o));
    toast.success("Order marked as served!");
    setSelectedOrder(null);
  };

  const activeOrders = orders.filter(o => o.status !== "SERVED");
  const servedOrders = orders.filter(o => o.status === "SERVED");

  const filteredOrders = orders.filter(o => 
    o.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage all your table orders</p>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">
            Active Orders
            <Badge className="ml-2 bg-wine">{activeOrders.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="served">
            Served
            <Badge variant="secondary" className="ml-2">{servedOrders.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="font-semibold mb-2">All caught up!</h3>
                <p className="text-muted-foreground">No active orders</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {activeOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  getTimeSince={getTimeSince}
                  onClick={() => setSelectedOrder(order)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="served" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {servedOrders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                getTimeSince={getTimeSince}
                onClick={() => setSelectedOrder(order)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredOrders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                getTimeSince={getTimeSince}
                onClick={() => setSelectedOrder(order)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedOrder?.table} - {selectedOrder?.customerName}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="font-medium">{item.quantity}x {item.name}</span>
                      {item.notes && (
                        <p className="text-xs text-muted-foreground">Note: {item.notes}</p>
                      )}
                    </div>
                    <Badge className={cn(
                      item.status === "READY" ? "bg-green-100 text-green-700" :
                      item.status === "PREPARING" ? "bg-orange-100 text-orange-700" :
                      item.status === "SERVED" ? "bg-gray-100 text-gray-700" :
                      "bg-yellow-100 text-yellow-700"
                    )}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between pt-4 border-t">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${selectedOrder.total.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    toast.info("Notifying kitchen...");
                  }}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Kitchen
                </Button>
                {selectedOrder.status !== "SERVED" && (
                  <Button 
                    className="flex-1 bg-wine hover:bg-wine/90"
                    onClick={() => handleMarkServed(selectedOrder.id)}
                    disabled={selectedOrder.status !== "READY"}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark Served
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OrderCard({ 
  order, 
  getTimeSince, 
  onClick 
}: { 
  order: typeof allOrders[0]; 
  getTimeSince: (date: Date) => string;
  onClick: () => void;
}) {
  const statusStyle = statusColors[order.status];
  
  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-md transition-shadow",
        order.status === "READY" && "ring-2 ring-green-500"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{order.table}</CardTitle>
          <Badge className={cn(statusStyle.bg, statusStyle.text)}>
            {order.status === "NEW" && <AlertCircle className="h-3 w-3 mr-1" />}
            {order.status === "READY" && <CheckCircle2 className="h-3 w-3 mr-1" />}
            {order.status.replace("_", " ")}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{order.customerName}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
          {order.items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span>{item.quantity}x {item.name}</span>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className="text-muted-foreground">+{order.items.length - 3} more items</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Timer className="h-4 w-4" />
            {getTimeSince(order.orderTime)}
          </span>
          <span className="font-semibold">${order.total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
