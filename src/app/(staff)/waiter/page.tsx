"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  UtensilsCrossed, 
  Clock, 
  Users,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ChefHat,
  Bell,
  DollarSign,
  Timer,
  Send,
  MapPin,
  TrendingUp,
  Coffee
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo data for orders
const demoOrders = [
  {
    id: "ORD-001",
    table: "Table 3",
    tableNumber: 3,
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
    tableNumber: 7,
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
    tableNumber: 12,
    customerName: "Emily Chen",
    items: [
      { name: "Truffle Risotto", quantity: 1, status: "PENDING", notes: "Gluten-free" },
      { name: "Bruschetta", quantity: 1, status: "PENDING", notes: "" },
    ],
    status: "NEW",
    orderTime: new Date(Date.now() - 1000 * 60 * 3),
    total: 42.50,
  },
];

// Demo data for tables
const demoTables = [
  { id: 1, number: "1", seats: 2, status: "AVAILABLE", section: "Window" },
  { id: 2, number: "2", seats: 4, status: "AVAILABLE", section: "Window" },
  { id: 3, number: "3", seats: 4, status: "OCCUPIED", section: "Window", customers: "John & Sarah", orderCount: 3 },
  { id: 4, number: "4", seats: 2, status: "RESERVED", section: "Main", reservation: "7:30 PM" },
  { id: 5, number: "5", seats: 6, status: "AVAILABLE", section: "Main" },
  { id: 6, number: "6", seats: 4, status: "CLEANING", section: "Main" },
  { id: 7, number: "7", seats: 2, status: "OCCUPIED", section: "Patio", customers: "Mike Wilson", orderCount: 2 },
  { id: 8, number: "8", seats: 8, status: "AVAILABLE", section: "Patio" },
  { id: 9, number: "9", seats: 4, status: "OCCUPIED", section: "Patio", customers: "Family Group", orderCount: 5 },
  { id: 10, number: "10", seats: 2, status: "RESERVED", section: "Bar", reservation: "8:00 PM" },
  { id: 11, number: "11", seats: 2, status: "AVAILABLE", section: "Bar" },
  { id: 12, number: "12", seats: 4, status: "OCCUPIED", section: "Main", customers: "Emily Chen", orderCount: 2 },
];

// Demo messages
const demoMessages = [
  { id: 1, table: "Table 3", customer: "John", message: "Could we get some more water please?", time: new Date(Date.now() - 1000 * 60 * 5), unread: true },
  { id: 2, table: "Table 7", customer: "Mike", message: "The pizza is ready?", time: new Date(Date.now() - 1000 * 60 * 2), unread: true },
  { id: 3, table: "Table 12", customer: "Emily", message: "Can I modify my order?", time: new Date(Date.now() - 1000 * 60 * 1), unread: true },
];

const statusColors: Record<string, string> = {
  AVAILABLE: "bg-green-500",
  OCCUPIED: "bg-blue-500",
  RESERVED: "bg-yellow-500",
  CLEANING: "bg-orange-500",
};

const orderStatusColors: Record<string, { bg: string; text: string }> = {
  NEW: { bg: "bg-red-100", text: "text-red-700" },
  IN_PROGRESS: { bg: "bg-yellow-100", text: "text-yellow-700" },
  READY: { bg: "bg-green-100", text: "text-green-700" },
  SERVED: { bg: "bg-gray-100", text: "text-gray-700" },
};

const itemStatusColors: Record<string, string> = {
  PENDING: "text-yellow-600",
  PREPARING: "text-orange-600",
  READY: "text-green-600",
  SERVED: "text-gray-500",
};

export default function WaiterDashboard() {
  const [orders, setOrders] = useState(demoOrders);
  const [messages, setMessages] = useState(demoMessages);
  const [selectedOrder, setSelectedOrder] = useState<typeof demoOrders[0] | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<typeof demoMessages[0] | null>(null);
  const [replyText, setReplyText] = useState("");

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    toast.success(`Reply sent to ${selectedMessage.customer}`);
    setMessages(messages.filter(m => m.id !== selectedMessage.id));
    setSelectedMessage(null);
    setReplyText("");
  };

  const unreadCount = messages.filter(m => m.unread).length;
  const activeOrders = orders.filter(o => o.status !== "SERVED");
  const readyOrders = orders.filter(o => o.status === "READY");

  return (
    <div className="min-h-screen bg-background">
      {/* Stats Bar */}
      <div className="bg-wine text-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-serif text-2xl font-bold">Waiter Dashboard</h1>
              <p className="text-white/80">Good evening! You have {activeOrders.length} active orders</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                <Coffee className="h-4 w-4 mr-1" />
                On Shift: 4h 32m
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <UtensilsCrossed className="h-4 w-4" />
                Active Orders
              </div>
              <p className="text-2xl font-bold">{activeOrders.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Ready to Serve
              </div>
              <p className="text-2xl font-bold">{readyOrders.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Users className="h-4 w-4" />
                My Tables
              </div>
              <p className="text-2xl font-bold">4</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <DollarSign className="h-4 w-4" />
                Today's Tips
              </div>
              <p className="text-2xl font-bold">$127</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="orders" className="gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              Orders
              {activeOrders.length > 0 && (
                <Badge className="ml-1 bg-wine">{activeOrders.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="tables" className="gap-2">
              <MapPin className="h-4 w-4" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Messages
              {unreadCount > 0 && (
                <Badge className="ml-1 bg-wine">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              My Stats
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No pending orders right now</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeOrders.map((order) => {
                  const statusStyle = orderStatusColors[order.status];
                  return (
                    <Card 
                      key={order.id} 
                      className={cn(
                        "cursor-pointer hover:shadow-md transition-shadow",
                        order.status === "READY" && "ring-2 ring-green-500"
                      )}
                      onClick={() => setSelectedOrder(order)}
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
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <span>{item.quantity}x {item.name}</span>
                              <span className={itemStatusColors[item.status]}>
                                {item.status === "READY" ? "✓ Ready" : item.status.toLowerCase()}
                              </span>
                            </div>
                          ))}
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
                })}
              </div>
            )}
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {demoTables.map((table) => (
                <Card 
                  key={table.id}
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-all",
                    table.status === "OCCUPIED" && "border-blue-300"
                  )}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className={cn("w-3 h-3 rounded-full", statusColors[table.status])} />
                      <span className="font-bold text-lg">T{table.number}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{table.section}</p>
                    <p className="text-xs text-muted-foreground">{table.seats} seats</p>
                    
                    {table.status === "OCCUPIED" && table.customers && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs font-medium truncate">{table.customers}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {table.orderCount} items
                        </Badge>
                      </div>
                    )}
                    
                    {table.status === "RESERVED" && (
                      <Badge variant="outline" className="text-xs mt-2">
                        {table.reservation}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              {Object.entries(statusColors).map(([status, color]) => (
                <div key={status} className="flex items-center gap-2 text-sm">
                  <div className={cn("w-3 h-3 rounded-full", color)} />
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            {messages.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No messages</h3>
                  <p className="text-muted-foreground">Customer messages will appear here</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <Card 
                    key={msg.id} 
                    className={cn(
                      "cursor-pointer hover:shadow-md transition-shadow",
                      msg.unread && "border-wine"
                    )}
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-wine text-white">
                              {msg.customer.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{msg.customer}</span>
                              <Badge variant="outline" className="text-xs">{msg.table}</Badge>
                              {msg.unread && <Badge className="bg-wine text-xs">New</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {getTimeSince(msg.time)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-wine">23</p>
                    <p className="text-sm text-muted-foreground mt-1">Orders Today</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">$127</p>
                    <p className="text-sm text-muted-foreground mt-1">Tips Earned</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gold">4.9</p>
                    <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold">12m</p>
                    <p className="text-sm text-muted-foreground mt-1">Avg Service Time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Today's Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Tables Served</span>
                    <span className="font-semibold">18 / 24</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-wine h-2 rounded-full" style={{ width: "75%" }} />
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span>Customer Satisfaction</span>
                    <span className="font-semibold">96%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

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
                    setSelectedOrder(null);
                  }}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Kitchen
                </Button>
                <Button 
                  className="flex-1 bg-wine hover:bg-wine/90"
                  onClick={() => handleMarkServed(selectedOrder.id)}
                  disabled={selectedOrder.status !== "READY"}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Served
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Reply Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {selectedMessage?.customer}</DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">{selectedMessage.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedMessage.table} · {getTimeSince(selectedMessage.time)}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
                />
                <Button onClick={handleSendReply} className="bg-wine hover:bg-wine/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => { setReplyText("I'll be right there!"); }}
                >
                  On my way!
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => { setReplyText("Coming right up!"); }}
                >
                  Coming right up
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => { setReplyText("Of course, give me just a moment."); }}
                >
                  One moment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
