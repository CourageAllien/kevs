"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle2, 
  Download, 
  Mail, 
  Star, 
  Home,
  UtensilsCrossed,
  Receipt
} from "lucide-react";
import { toast } from "sonner";

function ReceiptContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  
  // Demo receipt data
  const receiptData = {
    receiptNumber: `RCP-${Date.now().toString().slice(-8)}`,
    restaurant: "La Bella Italia",
    date: new Date().toLocaleDateString("en-US", { 
      weekday: "long",
      year: "numeric",
      month: "long", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    table: "Table 3 - Window Table",
    server: "Sarah Mitchell",
    items: [
      { name: "Spaghetti Carbonara", quantity: 2, price: 22.99 },
      { name: "Margherita Pizza", quantity: 1, price: 16.99 },
      { name: "Tiramisu", quantity: 2, price: 10.99 },
      { name: "Sparkling Water", quantity: 2, price: 4.99 },
    ],
    subtotal: 93.93,
    tax: 7.51,
    serviceCharge: 4.70,
    tip: 16.91,
    total: 123.05,
    paymentMethod: "Visa •••• 4242",
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleDownload = () => {
    toast.success("Receipt downloaded to your device");
  };

  const handleEmail = () => {
    toast.success("Receipt sent to your email");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-background py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Success header */}
        {isSuccess && (
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Thank you for dining with us
            </p>
          </div>
        )}

        {/* Receipt Card */}
        <Card className="mb-6 overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-wine text-white p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-xl font-semibold">{receiptData.restaurant}</h2>
            <p className="text-white/80 text-sm mt-1">{receiptData.date}</p>
          </div>

          <CardContent className="p-6">
            {/* Receipt details */}
            <div className="text-center mb-4 text-sm text-muted-foreground">
              <p>Receipt #{receiptData.receiptNumber}</p>
              <p>{receiptData.table}</p>
              <p>Server: {receiptData.server}</p>
            </div>

            <Separator className="my-4" />

            {/* Items */}
            <div className="space-y-2">
              {receiptData.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(receiptData.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>{formatPrice(receiptData.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Charge</span>
                <span>{formatPrice(receiptData.serviceCharge)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tip</span>
                <span>{formatPrice(receiptData.tip)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total Paid</span>
              <span>{formatPrice(receiptData.total)}</span>
            </div>

            <div className="mt-4 pt-4 border-t text-center text-sm text-muted-foreground">
              <p>Paid with {receiptData.paymentMethod}</p>
            </div>

            {/* Dashed border bottom (receipt style) */}
            <div className="mt-6 border-t-2 border-dashed border-muted pt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Thank you for visiting!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                We hope to see you again soon.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handleEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Email Receipt
            </Button>
          </div>
        </div>

        {/* Rate experience */}
        <Card className="mb-6">
          <CardContent className="p-4 text-center">
            <p className="font-medium mb-3">How was your experience?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-gold/20"
                  onClick={() => toast.success(`Thank you for rating us ${rating} stars!`)}
                >
                  <Star className="h-6 w-6 text-muted-foreground hover:fill-gold hover:text-gold transition-colors" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <Link href="/restaurants">
            <Button variant="outline" className="w-full">
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              Browse More Restaurants
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full bg-wine hover:bg-wine/90">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Receipt className="h-8 w-8 animate-pulse text-muted-foreground" />
      </div>
    }>
      <ReceiptContent />
    </Suspense>
  );
}
