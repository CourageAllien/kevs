"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChefHat, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Timer,
  Flame,
  Bell,
  UtensilsCrossed,
  TrendingUp,
  Pause,
  Play
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo kitchen orders
const initialOrders = [
  {
    id: "KIT-001",
    orderNumber: "ORD-001",
    table: "Table 3",
    waiter: "Sarah M.",
    items: [
      { id: 1, name: "Spaghetti Carbonara", quantity: 2, status: "PREPARING", startTime: Date.now() - 1000 * 60 * 8, estimatedTime: 15, notes: "Extra cheese", course: 1 },
      { id: 2, name: "Tiramisu", quantity: 2, status: "PENDING", startTime: null, estimatedTime: 5, notes: "", course: 3 },
    ],
    priority: "NORMAL",
    orderTime: new Date(Date.now() - 1000 * 60 * 12),
  },
  {
    id: "KIT-002",
    orderNumber: "ORD-002",
    table: "Table 7",
    waiter: "Mike J.",
    items: [
      { id: 3, name: "Margherita Pizza", quantity: 1, status: "READY", startTime: Date.now() - 1000 * 60 * 10, estimatedTime: 12, notes: "", course: 1 },
      { id: 4, name: "Garlic Bread", quantity: 1, status: "READY", startTime: Date.now() - 1000 * 60 * 5, estimatedTime: 5, notes: "", course: 1 },
    ],
    priority: "NORMAL",
    orderTime: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "KIT-003",
    orderNumber: "ORD-003",
    table: "Table 12",
    waiter: "Emily C.",
    items: [
      { id: 5, name: "Truffle Risotto", quantity: 1, status: "PENDING", startTime: null, estimatedTime: 18, notes: "Gluten-free", course: 1 },
      { id: 6, name: "Bruschetta", quantity: 1, status: "PENDING", startTime: null, estimatedTime: 8, notes: "", course: 1 },
    ],
    priority: "RUSH",
    orderTime: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: "KIT-004",
    orderNumber: "ORD-004",
    table: "Table 5",
    waiter: "Sarah M.",
    items: [
      { id: 7, name: "Lobster Linguine", quantity: 1, status: "PREPARING", startTime: Date.now() - 1000 * 60 * 5, estimatedTime: 20, notes: "No shellfish allergy confirmed", course: 1 },
      { id: 8, name: "Caesar Salad", quantity: 2, status: "PENDING", startTime: null, estimatedTime: 5, notes: "Dressing on side", course: 1 },
    ],
    priority: "NORMAL",
    orderTime: new Date(Date.now() - 1000 * 60 * 8),
  },
];

const priorityColors: Record<string, { bg: string; text: string; border: string }> = {
  NORMAL: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  RUSH: { bg: "bg-red-50", text: "text-red-700", border: "border-red-300" },
  VIP: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-300" },
};

const itemStatusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PREPARING: "bg-orange-100 text-orange-700",
  READY: "bg-green-100 text-green-700",
};

export default function KitchenDisplay() {
  const [orders, setOrders] = useState(initialOrders);
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (startTime: number | null, estimatedTime: number) => {
    if (!startTime) return `${estimatedTime}m`;
    const elapsed = Math.floor((currentTime - startTime) / 60000);
    const remaining = estimatedTime - elapsed;
    if (remaining <= 0) return "OVERDUE";
    return `${remaining}m`;
  };

  const getTimerColor = (startTime: number | null, estimatedTime: number) => {
    if (!startTime) return "text-muted-foreground";
    const elapsed = Math.floor((currentTime - startTime) / 60000);
    const remaining = estimatedTime - elapsed;
    if (remaining <= 0) return "text-red-600";
    if (remaining <= 2) return "text-orange-600";
    return "text-green-600";
  };

  const handleStartItem = (orderId: string, itemId: number) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map(item => 
            item.id === itemId 
              ? { ...item, status: "PREPARING", startTime: Date.now() }
              : item
          ),
        };
      }
      return order;
    }));
    toast.info("Started preparing item");
  };

  const handleCompleteItem = (orderId: string, itemId: number) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map(item => 
            item.id === itemId 
              ? { ...item, status: "READY" }
              : item
          ),
        };
      }
      return order;
    }));
    toast.success("Item ready!");
  };

  const handleBumpOrder = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
    toast.success("Order bumped - waiter notified!");
  };

  const pendingItems = orders.reduce((acc, o) => 
    acc + o.items.filter(i => i.status === "PENDING").length, 0
  );
  const preparingItems = orders.reduce((acc, o) => 
    acc + o.items.filter(i => i.status === "PREPARING").length, 0
  );
  const readyItems = orders.reduce((acc, o) => 
    acc + o.items.filter(i => i.status === "READY").length, 0
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold">Kitchen Display System</h1>
                <p className="text-gray-400">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · 
                  {orders.length} active orders
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-500">{pendingItems}</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{preparingItems}</p>
                <p className="text-xs text-gray-400">Preparing</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{readyItems}</p>
                <p className="text-xs text-gray-400">Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="max-w-7xl mx-auto p-4">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">All Orders Complete!</h2>
            <p className="text-gray-400">Great work! New orders will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {orders.map((order) => {
              const priorityStyle = priorityColors[order.priority];
              const allReady = order.items.every(i => i.status === "READY");
              const orderAge = Math.floor((currentTime - order.orderTime.getTime()) / 60000);
              
              return (
                <Card 
                  key={order.id} 
                  className={cn(
                    "bg-gray-800 border-gray-700",
                    order.priority === "RUSH" && "border-red-500 border-2",
                    allReady && "border-green-500 border-2"
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-white">{order.table}</CardTitle>
                        {order.priority === "RUSH" && (
                          <Badge className="bg-red-500 animate-pulse">
                            <Flame className="h-3 w-3 mr-1" />
                            RUSH
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-gray-400 border-gray-600">
                        {orderAge}m
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      {order.waiter} · #{order.orderNumber.slice(-3)}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    {order.items.map((item) => {
                      const timerText = formatTimer(item.startTime, item.estimatedTime);
                      const timerColor = getTimerColor(item.startTime, item.estimatedTime);
                      
                      return (
                        <div 
                          key={item.id}
                          className={cn(
                            "p-3 rounded-lg border",
                            item.status === "READY" ? "bg-green-900/30 border-green-700" :
                            item.status === "PREPARING" ? "bg-orange-900/30 border-orange-700" :
                            "bg-gray-700/50 border-gray-600"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg">{item.quantity}x</span>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              {item.notes && (
                                <p className="text-sm text-yellow-400 mt-1 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {item.notes}
                                </p>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <span className={cn("font-mono font-bold", timerColor)}>
                                {timerText}
                              </span>
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="mt-2 flex gap-2">
                            {item.status === "PENDING" && (
                              <Button
                                size="sm"
                                className="flex-1 bg-orange-600 hover:bg-orange-700"
                                onClick={() => handleStartItem(order.id, item.id)}
                              >
                                <Play className="h-4 w-4 mr-1" />
                                Start
                              </Button>
                            )}
                            {item.status === "PREPARING" && (
                              <Button
                                size="sm"
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                onClick={() => handleCompleteItem(order.id, item.id)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Done
                              </Button>
                            )}
                            {item.status === "READY" && (
                              <Badge className="flex-1 justify-center bg-green-600 py-1">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Ready
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Bump order button when all ready */}
                    {allReady && (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 mt-2"
                        onClick={() => handleBumpOrder(order.id)}
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Bump Order (Notify Waiter)
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm text-gray-400">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm text-gray-400">Preparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-400">Ready</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Avg Prep Time</p>
              <p className="font-bold">12m 34s</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Orders/Hour</p>
              <p className="font-bold">18</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
