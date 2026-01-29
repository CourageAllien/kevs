"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronLeft, 
  CreditCard,
  Wallet,
  DollarSign,
  Loader2,
  Check,
  ShoppingBag
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const tipOptions = [
  { value: 0.15, label: "15%" },
  { value: 0.18, label: "18%" },
  { value: 0.20, label: "20%" },
  { value: 0.25, label: "25%" },
  { value: "custom", label: "Custom" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [tipPercentage, setTipPercentage] = useState<number | "custom">(0.18);
  const [customTip, setCustomTip] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  const subtotal = getSubtotal();
  const tax = subtotal * 0.08;
  const tipAmount = tipPercentage === "custom" 
    ? parseFloat(customTip) || 0 
    : subtotal * (tipPercentage as number);
  const total = subtotal + tax + tipAmount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In production, this would:
    // 1. Create a Stripe payment intent
    // 2. Process the payment
    // 3. Create the order in the database
    // 4. Emit real-time notification to kitchen/waiter

    toast.success("Order placed successfully!", {
      description: "Your order is being prepared",
    });

    clearCart();
    router.push("/orders?placed=true");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Add items to your cart to checkout
              </p>
              <Link href="/restaurants">
                <Button className="bg-wine hover:bg-wine/90">
                  Browse Restaurants
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/restaurants">
            <Button variant="ghost" size="sm" className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="font-serif text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order items */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={`${item.menuItem.id}-${index}`} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium line-clamp-1">{item.menuItem.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        {item.specialInstructions && (
                          <p className="text-xs text-muted-foreground italic">
                            {item.specialInstructions}
                          </p>
                        )}
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.menuItem.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions for Kitchen</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any special requests for your order..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tip selection */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Add a Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {tipOptions.map((option) => (
                    <Button
                      key={option.label}
                      variant={tipPercentage === option.value ? "default" : "outline"}
                      className={cn(
                        tipPercentage === option.value && "bg-wine hover:bg-wine/90"
                      )}
                      onClick={() => setTipPercentage(option.value as number | "custom")}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>

                {tipPercentage === "custom" && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      className="max-w-32"
                    />
                  </div>
                )}

                {tipPercentage !== "custom" && (
                  <p className="text-sm text-muted-foreground">
                    {(tipPercentage as number * 100).toFixed(0)}% tip = {formatPrice(tipAmount)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Payment method */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-muted/50"
                      onClick={() => setPaymentMethod("card")}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or Amex</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-muted/50"
                      onClick={() => setPaymentMethod("wallet")}
                    >
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Wallet className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Digital Wallet</p>
                          <p className="text-sm text-muted-foreground">Apple Pay, Google Pay</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-muted/50"
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                        <DollarSign className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Pay at Table</p>
                          <p className="text-sm text-muted-foreground">Pay with cash or card when served</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tip</span>
                    <span>{formatPrice(tipAmount)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <Button
                  className="w-full bg-wine hover:bg-wine/90"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Place Order · {formatPrice(total)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing this order, you agree to our Terms of Service
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
