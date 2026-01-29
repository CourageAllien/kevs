"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Users, 
  MapPin,
  Phone,
  Mail,
  Home,
  UtensilsCrossed
} from "lucide-react";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  
  const restaurant = searchParams.get("restaurant") || "La Bella Italia";
  const date = searchParams.get("date") || "Tomorrow";
  const time = searchParams.get("time") || "7:00 PM";
  const guests = searchParams.get("guests") || "2";
  const table = searchParams.get("table") || "Window Table";
  const name = searchParams.get("name") || "Guest";
  const confirmationNumber = `KK${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Reservation Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg">
            Thank you, {name}. We look forward to seeing you!
          </p>
        </div>

        {/* Confirmation details card */}
        <Card className="mb-6 overflow-hidden shadow-lg animate-slide-up">
          <div className="bg-wine text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5" />
                <span className="font-serif font-semibold">{restaurant}</span>
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                #{confirmationNumber}
              </span>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-wine" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-wine" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-wine" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Party Size</p>
                  <p className="font-medium">{guests} {parseInt(guests) === 1 ? "Guest" : "Guests"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-wine" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Table</p>
                  <p className="font-medium">{table}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                A confirmation email has been sent to your email address.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Email
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Restaurant
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important info */}
        <Card className="mb-6 bg-amber-50 border-amber-200 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardContent className="p-4">
            <h3 className="font-semibold text-amber-800 mb-2">Important Information</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Please arrive 10 minutes before your reservation time</li>
              <li>• Reservations are held for 15 minutes past the booking time</li>
              <li>• For cancellations, please notify us at least 2 hours in advance</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <Link href="/restaurants" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Browse More Restaurants
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full bg-wine hover:bg-wine/90" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
