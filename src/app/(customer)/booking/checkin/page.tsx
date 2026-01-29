"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Star, 
  MessageCircle,
  Award,
  Clock,
  Users,
  MapPin,
  ChefHat,
  ArrowRight,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useDiningStore } from "@/stores/dining-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo waiters
const availableWaiters = [
  { 
    id: "w1", 
    name: "Sarah Mitchell", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4.9, 
    reviews: 234,
    specialty: "Wine Pairing",
    experience: "5 years",
    languages: ["English", "Spanish"],
    available: true,
  },
  { 
    id: "w2", 
    name: "Michael Johnson", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4.8, 
    reviews: 189,
    specialty: "Italian Cuisine",
    experience: "7 years",
    languages: ["English", "Italian"],
    available: true,
  },
  { 
    id: "w3", 
    name: "Emily Chen", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4.7, 
    reviews: 156,
    specialty: "Dietary Accommodations",
    experience: "3 years",
    languages: ["English", "Mandarin"],
    available: true,
  },
  { 
    id: "w4", 
    name: "David Brown", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4.9, 
    reviews: 312,
    specialty: "Fine Dining",
    experience: "10 years",
    languages: ["English", "French"],
    available: false,
  },
];

function CheckInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantSlug = searchParams.get("restaurant") || "la-bella-italia";
  const tableName = searchParams.get("table") || "Table 3 - Window Seat";
  const reservationId = searchParams.get("id") || "RES-000";
  
  const startSession = useDiningStore((state) => state.startSession);
  
  const [selectedWaiter, setSelectedWaiter] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckIn = async () => {
    if (!selectedWaiter) {
      toast.error("Please select a waiter");
      return;
    }

    setIsChecking(true);
    
    // Simulate check-in process
    await new Promise(resolve => setTimeout(resolve, 1500));

    const waiter = availableWaiters.find(w => w.id === selectedWaiter)!;

    startSession({
      id: `session-${Date.now()}`,
      restaurantId: "rest-1",
      restaurantName: "La Bella Italia",
      restaurantSlug: restaurantSlug,
      tableId: "table-3",
      tableName: tableName,
      tableNumber: tableName.match(/\d+/)?.[0] || "3",
      reservationId: reservationId,
      waiterId: waiter.id,
      waiterName: waiter.name,
      waiterImage: waiter.image,
      waiterRating: waiter.rating,
      seatedAt: new Date(),
    });

    toast.success("You're checked in!", {
      description: `${waiter.name} will be your server today.`,
    });

    router.push("/dining");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-green-100 text-green-700 mb-4">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Reservation Confirmed
          </Badge>
          <h1 className="font-serif text-3xl font-bold mb-2">Welcome!</h1>
          <p className="text-muted-foreground">
            Select your preferred waiter to begin your dining experience
          </p>
        </div>

        {/* Reservation Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop"
                  alt="Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold">La Bella Italia</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {tableName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    2 guests
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Waiter Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Choose Your Server
            </CardTitle>
            <CardDescription>
              Select who you'd like to take care of you today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedWaiter || ""} onValueChange={setSelectedWaiter}>
              <div className="space-y-3">
                {availableWaiters.map((waiter) => (
                  <Label
                    key={waiter.id}
                    htmlFor={waiter.id}
                    className={cn(
                      "flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all",
                      selectedWaiter === waiter.id 
                        ? "border-wine bg-wine/5" 
                        : "hover:bg-muted/50",
                      !waiter.available && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <RadioGroupItem 
                      value={waiter.id} 
                      id={waiter.id} 
                      disabled={!waiter.available}
                      className="mt-1"
                    />
                    <Avatar className="h-14 w-14 border-2 border-background shadow">
                      <AvatarImage src={waiter.image} />
                      <AvatarFallback className="bg-wine text-white">
                        {waiter.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{waiter.name}</span>
                          {!waiter.available && (
                            <Badge variant="secondary" className="text-xs">Unavailable</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-gold text-gold" />
                          <span className="font-semibold">{waiter.rating}</span>
                          <span className="text-xs text-muted-foreground">({waiter.reviews})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {waiter.specialty}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {waiter.experience}
                        </span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {waiter.languages.map(lang => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Quick note about messaging */}
        <Card className="mb-6 border-wine/20 bg-wine/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-wine mt-0.5" />
              <div>
                <p className="font-medium text-sm">Direct Messaging Available</p>
                <p className="text-sm text-muted-foreground">
                  Once seated, you can message your waiter directly for requests, questions, or to customize your order.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Check In Button */}
        <Button
          className="w-full bg-wine hover:bg-wine/90"
          size="lg"
          onClick={handleCheckIn}
          disabled={!selectedWaiter || isChecking}
        >
          {isChecking ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Checking In...
            </>
          ) : (
            <>
              Check In & Start Ordering
              <ArrowRight className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Your waiter will be notified and ready to assist you
        </p>
      </div>
    </div>
  );
}

export default function CheckInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-wine" />
      </div>
    }>
      <CheckInContent />
    </Suspense>
  );
}
