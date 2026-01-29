"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Users, 
  CalendarDays, 
  Clock, 
  MapPin,
  Check,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo tables for floor plan
const demoTables = [
  { id: "1", number: 1, name: "Window Table 1", type: "STANDARD", capacity: 2, positionX: 50, positionY: 50, width: 60, height: 60 },
  { id: "2", number: 2, name: "Window Table 2", type: "STANDARD", capacity: 2, positionX: 130, positionY: 50, width: 60, height: 60 },
  { id: "3", number: 3, name: "Center Table 1", type: "STANDARD", capacity: 4, positionX: 90, positionY: 150, width: 80, height: 80 },
  { id: "4", number: 4, name: "Center Table 2", type: "STANDARD", capacity: 4, positionX: 200, positionY: 150, width: 80, height: 80 },
  { id: "5", number: 5, name: "Booth 1", type: "BOOTH", capacity: 6, positionX: 50, positionY: 260, width: 100, height: 60 },
  { id: "6", number: 6, name: "Booth 2", type: "BOOTH", capacity: 6, positionX: 180, positionY: 260, width: 100, height: 60 },
  { id: "7", number: 7, name: "Private Room", type: "PRIVATE", capacity: 8, positionX: 320, positionY: 100, width: 120, height: 100 },
  { id: "8", number: 8, name: "Bar Seating", type: "BAR", capacity: 2, positionX: 320, positionY: 250, width: 120, height: 40 },
];

// Available time slots
const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
];

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

const specialOccasions = [
  "None",
  "Birthday",
  "Anniversary",
  "Business Meeting",
  "Date Night",
  "Celebration",
  "Other"
];

// Restaurant names by slug
const restaurantNames: Record<string, string> = {
  "la-bella-italia": "La Bella Italia",
  "tokyo-ramen-house": "Tokyo Ramen House",
  "el-mariachi": "El Mariachi",
  "spice-garden": "Spice Garden",
  "the-french-quarter": "The French Quarter",
  "bangkok-street": "Bangkok Street",
};

export default function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const restaurantName = restaurantNames[slug] || "Restaurant";
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Booking details
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [time, setTime] = useState<string>("");
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string>("None");
  const [notes, setNotes] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  // Filter tables by capacity
  const availableTables = demoTables.filter(table => table.capacity >= partySize);

  const handleSubmit = async () => {
    if (!date || !time || !partySize || !guestName || !guestEmail || !guestPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Build confirmation URL with booking details
    const confirmationParams = new URLSearchParams({
      restaurant: restaurantName,
      date: format(date, "EEEE, MMMM d, yyyy"),
      time: time,
      guests: partySize.toString(),
      table: selectedTable ? demoTables.find(t => t.id === selectedTable)?.name || "Assigned at arrival" : "Assigned at arrival",
      name: guestName,
    });
    
    router.push(`/booking/confirmation?${confirmationParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/restaurants/${slug}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Restaurant
            </Button>
          </Link>
          <h1 className="font-serif text-3xl font-bold">Book a Table</h1>
          <p className="text-muted-foreground mt-1">{restaurantName}</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= s
                    ? "bg-wine text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "w-16 h-1 mx-2",
                    step > s ? "bg-wine" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Date, Time, Party Size */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Select Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div>
                  <Label className="mb-2 block">Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => isBefore(date, startOfDay(new Date()))}
                    className="rounded-md border"
                  />
                </div>

                {/* Time and party size */}
                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block">Party Size</Label>
                    <Select
                      value={partySize.toString()}
                      onValueChange={(v) => setPartySize(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {partySizes.map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {size} {size === 1 ? "Guest" : "Guests"}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Time</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={time === slot ? "default" : "outline"}
                          size="sm"
                          className={time === slot ? "bg-wine hover:bg-wine/90" : ""}
                          onClick={() => setTime(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!date || !time}
                  className="bg-wine hover:bg-wine/90"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Table Selection (Floor Plan) */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Choose Your Table</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select a table that fits your party of {partySize}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-200 border border-green-400" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-wine" />
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-muted" />
                  <span>Too Small</span>
                </div>
              </div>

              {/* Floor plan */}
              <div className="relative bg-muted/30 rounded-xl border-2 border-dashed border-muted p-4 overflow-x-auto">
                <div className="relative min-w-[500px] h-[350px]">
                  {/* Restaurant features */}
                  <div className="absolute top-2 left-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 inline mr-1" />
                    Window Side
                  </div>
                  <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                    Private Area
                  </div>
                  <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
                    Main Floor
                  </div>

                  {/* Tables */}
                  {demoTables.map((table) => {
                    const isAvailable = table.capacity >= partySize;
                    const isSelected = selectedTable === table.id;

                    return (
                      <button
                        key={table.id}
                        className={cn(
                          "absolute rounded-lg border-2 flex flex-col items-center justify-center text-xs transition-all",
                          isSelected && "bg-wine text-white border-wine scale-105 shadow-lg",
                          isAvailable && !isSelected && "bg-green-100 border-green-400 hover:bg-green-200 hover:scale-105",
                          !isAvailable && "bg-muted border-muted-foreground/20 cursor-not-allowed opacity-50"
                        )}
                        style={{
                          left: table.positionX,
                          top: table.positionY,
                          width: table.width,
                          height: table.height,
                        }}
                        onClick={() => isAvailable && setSelectedTable(table.id)}
                        disabled={!isAvailable}
                      >
                        <span className="font-medium">T{table.number}</span>
                        <span className="text-[10px] opacity-80">
                          {table.capacity} seats
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected table info */}
              {selectedTable && (
                <div className="p-4 rounded-lg bg-wine/5 border border-wine/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-wine">
                        {demoTables.find(t => t.id === selectedTable)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Capacity: {demoTables.find(t => t.id === selectedTable)?.capacity} guests •
                        Type: {demoTables.find(t => t.id === selectedTable)?.type}
                      </p>
                    </div>
                    <Badge className="bg-wine">Selected</Badge>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="bg-wine hover:bg-wine/90"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Guest Details & Confirmation */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Complete Your Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Booking summary */}
              <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                <h3 className="font-medium">Booking Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>{date && format(date, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{partySize} {partySize === 1 ? "Guest" : "Guests"}</span>
                  </div>
                  {selectedTable && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{demoTables.find(t => t.id === selectedTable)?.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Guest details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occasion">Special Occasion</Label>
                  <Select value={occasion} onValueChange={setOccasion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {specialOccasions.map((occ) => (
                        <SelectItem key={occ} value={occ}>{occ}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Requests</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                  rows={3}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !guestName || !guestEmail || !guestPhone}
                  className="bg-wine hover:bg-wine/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    "Confirm Reservation"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
