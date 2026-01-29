"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Receipt,
  UtensilsCrossed,
  ChefHat,
  Clock,
  Check,
  Send,
  Bell,
  Droplets,
  FileText,
  HandPlatter,
  Plus,
  Star,
  MapPin,
  Loader2,
  CreditCard,
  X,
  ArrowRight
} from "lucide-react";
import { useDiningStore } from "@/stores/dining-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const quickRequests = [
  { type: 'WATER_REFILL', icon: Droplets, label: 'Water Refill', message: 'Could I get some more water please?' },
  { type: 'EXTRA_NAPKINS', icon: FileText, label: 'Extra Napkins', message: 'Could I have some extra napkins?' },
  { type: 'CONDIMENTS', icon: HandPlatter, label: 'Condiments', message: 'Could I get some condiments please?' },
  { type: 'SPEAK_TO_WAITER', icon: MessageCircle, label: 'Speak to Waiter', message: 'Could you come by our table when you have a moment?' },
] as const;

const orderStatusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  PENDING: { color: "bg-yellow-100 text-yellow-700", icon: <Clock className="h-3 w-3" />, label: "Pending" },
  CONFIRMED: { color: "bg-blue-100 text-blue-700", icon: <Check className="h-3 w-3" />, label: "Confirmed" },
  PREPARING: { color: "bg-orange-100 text-orange-700", icon: <ChefHat className="h-3 w-3" />, label: "Preparing" },
  READY: { color: "bg-green-100 text-green-700", icon: <UtensilsCrossed className="h-3 w-3" />, label: "Ready" },
  SERVED: { color: "bg-gray-100 text-gray-700", icon: <Check className="h-3 w-3" />, label: "Served" },
};

export default function DiningPage() {
  const router = useRouter();
  const { activeSession, sendMessage, markMessagesRead, addCustomRequest, requestBill, setTip, endSession } = useDiningStore();
  
  const [messageInput, setMessageInput] = useState("");
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [tipPercentage, setTipPercentage] = useState(0.18);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (isMessagingOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      markMessagesRead();
    }
  }, [isMessagingOpen, activeSession?.messages, markMessagesRead]);

  // Simulate order status updates
  useEffect(() => {
    if (!activeSession) return;
    
    const interval = setInterval(() => {
      const pendingOrders = activeSession.orders.filter(o => o.status === 'PENDING');
      if (pendingOrders.length > 0) {
        // Simulate order being confirmed
        const randomOrder = pendingOrders[Math.floor(Math.random() * pendingOrders.length)];
        useDiningStore.getState().updateOrderItemStatus(randomOrder.id, 'CONFIRMED');
        toast.info(`${randomOrder.name} has been confirmed!`);
      }
      
      const confirmedOrders = activeSession.orders.filter(o => o.status === 'CONFIRMED');
      if (confirmedOrders.length > 0 && Math.random() > 0.5) {
        const randomOrder = confirmedOrders[0];
        useDiningStore.getState().updateOrderItemStatus(randomOrder.id, 'PREPARING');
        toast.info(`${randomOrder.name} is now being prepared!`, { icon: <ChefHat className="h-4 w-4" /> });
      }
      
      const preparingOrders = activeSession.orders.filter(o => o.status === 'PREPARING');
      if (preparingOrders.length > 0 && Math.random() > 0.6) {
        const randomOrder = preparingOrders[0];
        useDiningStore.getState().updateOrderItemStatus(randomOrder.id, 'READY');
        toast.success(`${randomOrder.name} is ready!`, { icon: <UtensilsCrossed className="h-4 w-4" /> });
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeSession]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    sendMessage(messageInput);
    setMessageInput("");
  };

  const handleQuickRequest = (request: typeof quickRequests[number]) => {
    addCustomRequest({
      type: request.type,
      message: request.message,
    });
    sendMessage(request.message);
    toast.success(`Request sent: ${request.label}`);
  };

  const handlePayBill = async () => {
    if (!activeSession) return;
    
    setIsProcessingPayment(true);
    
    // Set tip
    const tipAmount = activeSession.subtotal * tipPercentage;
    setTip(tipAmount);
    
    // Simulate payment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    useDiningStore.getState().markAsPaid();
    setIsProcessingPayment(false);
    setIsBillOpen(false);
    
    toast.success("Payment successful! Thank you for dining with us.");
    
    // Show receipt option
    setTimeout(() => {
      endSession();
      router.push("/dining/receipt?success=true");
    }, 1500);
  };

  // No active session
  if (!activeSession) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <UtensilsCrossed className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">No Active Dining Session</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                You need to be seated at a restaurant to access dining features. 
                Book a table and check in when you arrive!
              </p>
              <div className="flex gap-3">
                <Link href="/restaurants">
                  <Button variant="outline">Browse Restaurants</Button>
                </Link>
                <Link href="/booking">
                  <Button className="bg-wine hover:bg-wine/90">View Reservations</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const tipAmount = activeSession.subtotal * tipPercentage;
  const finalTotal = activeSession.subtotal + activeSession.tax + activeSession.serviceCharge + tipAmount;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-wine text-white py-4 px-4 sticky top-16 z-40">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <div>
                <h1 className="font-serif text-lg font-semibold">{activeSession.restaurantName}</h1>
                <p className="text-sm text-white/80">Table {activeSession.tableNumber} · {activeSession.tableName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">Running Total</p>
              <p className="font-semibold text-lg">{formatPrice(activeSession.total)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-6">
        {/* Waiter Card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-wine">
                  <AvatarImage src={activeSession.waiterImage} />
                  <AvatarFallback className="bg-wine text-white">
                    {activeSession.waiterName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{activeSession.waiterName}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>Your Server</span>
                    <span>·</span>
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    <span>{activeSession.waiterRating}</span>
                  </div>
                </div>
              </div>
              
              {/* Message button */}
              <Sheet open={isMessagingOpen} onOpenChange={setIsMessagingOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                    {activeSession.unreadMessages > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-wine">
                        {activeSession.unreadMessages}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activeSession.waiterImage} />
                        <AvatarFallback className="bg-wine text-white text-sm">
                          {activeSession.waiterName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      Chat with {activeSession.waiterName}
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* Quick requests */}
                  <div className="p-3 border-b bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-2">Quick Requests</p>
                    <div className="flex gap-2 overflow-x-auto">
                      {quickRequests.map((req) => (
                        <Button
                          key={req.type}
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0 gap-1"
                          onClick={() => handleQuickRequest(req)}
                        >
                          <req.icon className="h-3 w-3" />
                          {req.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {activeSession.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex",
                            msg.senderType === 'CUSTOMER' ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] rounded-2xl px-4 py-2",
                              msg.senderType === 'CUSTOMER'
                                ? "bg-wine text-white rounded-br-md"
                                : "bg-muted rounded-bl-md"
                            )}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className={cn(
                              "text-[10px] mt-1",
                              msg.senderType === 'CUSTOMER' ? "text-white/70" : "text-muted-foreground"
                            )}>
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Message input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button size="icon" className="bg-wine hover:bg-wine/90" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Orders and Menu */}
        <Tabs defaultValue="orders" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="orders" className="flex-1">
              My Orders
              {activeSession.orders.length > 0 && (
                <Badge variant="secondary" className="ml-2">{activeSession.orders.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex-1">Add More</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-4">
            {activeSession.orders.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No orders yet</p>
                  <p className="text-sm text-muted-foreground">
                    Browse the menu to add items to your order
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {/* Active orders */}
                {activeSession.orders.filter(o => o.status !== 'SERVED').length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">In Progress</h3>
                    <div className="space-y-3">
                      {activeSession.orders.filter(o => o.status !== 'SERVED').map((order) => {
                        const status = orderStatusConfig[order.status];
                        return (
                          <Card key={order.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={order.image}
                                    alt={order.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className="font-medium line-clamp-1">{order.name}</h4>
                                    <Badge className={cn("flex-shrink-0 gap-1", status.color)}>
                                      {status.icon}
                                      {status.label}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">Qty: {order.quantity}</p>
                                  {order.specialInstructions && (
                                    <p className="text-xs text-muted-foreground italic mt-1">
                                      Note: {order.specialInstructions}
                                    </p>
                                  )}
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-muted-foreground">
                                      Ordered {new Date(order.orderedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span className="font-medium">{formatPrice(order.price * order.quantity)}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Progress bar for active orders */}
                              {order.status !== 'SERVED' && (
                                <div className="mt-3 pt-3 border-t">
                                  <div className="flex gap-1">
                                    {['CONFIRMED', 'PREPARING', 'READY', 'SERVED'].map((step, idx) => {
                                      const steps = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'SERVED'];
                                      const currentIdx = steps.indexOf(order.status);
                                      const stepIdx = steps.indexOf(step);
                                      const isActive = stepIdx <= currentIdx;
                                      
                                      return (
                                        <div
                                          key={step}
                                          className={cn(
                                            "flex-1 h-1.5 rounded-full transition-colors",
                                            isActive ? "bg-wine" : "bg-muted"
                                          )}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Served orders */}
                {activeSession.orders.filter(o => o.status === 'SERVED').length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Served</h3>
                    <div className="space-y-2">
                      {activeSession.orders.filter(o => o.status === 'SERVED').map((order) => (
                        <div key={order.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{order.quantity}x {order.name}</span>
                          </div>
                          <span className="text-sm font-medium">{formatPrice(order.price * order.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="menu" className="mt-4">
            <Card>
              <CardContent className="py-8 text-center">
                <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Ready to order more?</p>
                <Link href={`/restaurants/${activeSession.restaurantSlug}`}>
                  <Button className="bg-wine hover:bg-wine/90">
                    View Full Menu
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Custom Requests */}
        {activeSession.customRequests.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {activeSession.customRequests.slice(-3).map((req) => (
                  <div key={req.id} className="flex items-center justify-between text-sm">
                    <span>{req.message}</span>
                    <Badge variant={req.status === 'COMPLETED' ? 'secondary' : 'outline'} className="text-xs">
                      {req.status === 'PENDING' ? 'Pending' : req.status === 'ACKNOWLEDGED' ? 'On it!' : 'Done'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom bar with running bill */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your Bill</p>
              <p className="font-serif text-2xl font-bold">{formatPrice(activeSession.total)}</p>
            </div>
            
            <Dialog open={isBillOpen} onOpenChange={setIsBillOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-wine hover:bg-wine/90">
                  <Receipt className="h-4 w-4 mr-2" />
                  View & Pay Bill
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle className="font-serif text-xl">Your Bill</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Order items */}
                  <div className="space-y-2">
                    {activeSession.orders.map((order) => (
                      <div key={order.id} className="flex justify-between text-sm">
                        <span>{order.quantity}x {order.name}</span>
                        <span>{formatPrice(order.price * order.quantity)}</span>
                      </div>
                    ))}
                    
                    {/* Custom requests with charges */}
                    {activeSession.customRequests.filter(r => r.price).map((req) => (
                      <div key={req.id} className="flex justify-between text-sm text-muted-foreground">
                        <span>{req.message}</span>
                        <span>{formatPrice(req.price!)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Totals */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(activeSession.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>{formatPrice(activeSession.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Charge (5%)</span>
                      <span>{formatPrice(activeSession.serviceCharge)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Tip selection */}
                  <div>
                    <p className="text-sm font-medium mb-2">Add a Tip</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[0.15, 0.18, 0.20, 0.25].map((pct) => (
                        <Button
                          key={pct}
                          variant={tipPercentage === pct ? "default" : "outline"}
                          size="sm"
                          className={tipPercentage === pct ? "bg-wine hover:bg-wine/90" : ""}
                          onClick={() => setTipPercentage(pct)}
                        >
                          {(pct * 100).toFixed(0)}%
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Tip: {formatPrice(tipAmount)}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  {/* Final total */}
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                  
                  {/* Payment button */}
                  <Button
                    className="w-full bg-wine hover:bg-wine/90"
                    size="lg"
                    onClick={handlePayBill}
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay {formatPrice(finalTotal)}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment powered by Stripe
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
