"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar,
  Clock, 
  Users,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserPlus,
  Search,
  MapPin,
  Star,
  MessageSquare,
  Bell,
  ArrowRight,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo reservations for today
const todayReservations = [
  { id: 1, name: "John Smith", phone: "+1 555-123-4567", email: "john@email.com", time: "12:00", partySize: 4, table: "Table 5", status: "CONFIRMED", notes: "Anniversary", isVip: true },
  { id: 2, name: "Sarah Johnson", phone: "+1 555-234-5678", email: "sarah@email.com", time: "12:30", partySize: 2, table: "Table 2", status: "CONFIRMED", notes: "", isVip: false },
  { id: 3, name: "Mike Wilson", phone: "+1 555-345-6789", email: "mike@email.com", time: "13:00", partySize: 6, table: "Table 8", status: "SEATED", notes: "Birthday party", isVip: false },
  { id: 4, name: "Emily Chen", phone: "+1 555-456-7890", email: "emily@email.com", time: "13:30", partySize: 3, table: "Table 3", status: "CONFIRMED", notes: "", isVip: true },
  { id: 5, name: "David Brown", phone: "+1 555-567-8901", email: "david@email.com", time: "14:00", partySize: 2, table: "Table 1", status: "NO_SHOW", notes: "", isVip: false },
  { id: 6, name: "Lisa Anderson", phone: "+1 555-678-9012", email: "lisa@email.com", time: "18:00", partySize: 4, table: "Table 6", status: "CONFIRMED", notes: "Allergies: nuts", isVip: false },
  { id: 7, name: "James Taylor", phone: "+1 555-789-0123", email: "james@email.com", time: "18:30", partySize: 8, table: "Table 10", status: "CONFIRMED", notes: "Business dinner", isVip: true },
  { id: 8, name: "Amanda White", phone: "+1 555-890-1234", email: "amanda@email.com", time: "19:00", partySize: 2, table: "Table 4", status: "CONFIRMED", notes: "", isVip: false },
];

// Demo waitlist
const waitlistGuests = [
  { id: 1, name: "Tom Harris", phone: "+1 555-111-2222", partySize: 4, waitTime: 15, addedAt: new Date(Date.now() - 1000 * 60 * 15) },
  { id: 2, name: "Rachel Green", phone: "+1 555-222-3333", partySize: 2, waitTime: 25, addedAt: new Date(Date.now() - 1000 * 60 * 8) },
  { id: 3, name: "Chris Evans", phone: "+1 555-333-4444", partySize: 6, waitTime: 35, addedAt: new Date(Date.now() - 1000 * 60 * 3) },
];

// Demo tables
const tables = [
  { id: 1, number: "1", seats: 2, status: "AVAILABLE", section: "Window" },
  { id: 2, number: "2", seats: 2, status: "OCCUPIED", section: "Window" },
  { id: 3, number: "3", seats: 4, status: "RESERVED", section: "Window", time: "13:30" },
  { id: 4, number: "4", seats: 2, status: "AVAILABLE", section: "Main" },
  { id: 5, number: "5", seats: 4, status: "OCCUPIED", section: "Main" },
  { id: 6, number: "6", seats: 4, status: "RESERVED", section: "Main", time: "18:00" },
  { id: 7, number: "7", seats: 6, status: "AVAILABLE", section: "Patio" },
  { id: 8, number: "8", seats: 6, status: "OCCUPIED", section: "Patio" },
  { id: 9, number: "9", seats: 4, status: "CLEANING", section: "Patio" },
  { id: 10, number: "10", seats: 8, status: "RESERVED", section: "Private", time: "18:30" },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  CONFIRMED: { bg: "bg-blue-100", text: "text-blue-700" },
  SEATED: { bg: "bg-green-100", text: "text-green-700" },
  COMPLETED: { bg: "bg-gray-100", text: "text-gray-700" },
  CANCELLED: { bg: "bg-red-100", text: "text-red-700" },
  NO_SHOW: { bg: "bg-orange-100", text: "text-orange-700" },
};

const tableStatusColors: Record<string, string> = {
  AVAILABLE: "bg-green-500",
  OCCUPIED: "bg-blue-500",
  RESERVED: "bg-yellow-500",
  CLEANING: "bg-orange-500",
};

export default function ReceptionDashboard() {
  const [reservations, setReservations] = useState(todayReservations);
  const [waitlist, setWaitlist] = useState(waitlistGuests);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWalkInOpen, setIsWalkInOpen] = useState(false);
  const [walkInData, setWalkInData] = useState({ name: "", phone: "", partySize: "2" });

  const now = new Date();
  const currentHour = now.getHours();

  const upcomingReservations = reservations.filter(r => 
    r.status === "CONFIRMED" && 
    parseInt(r.time.split(":")[0]) >= currentHour
  );
  
  const seatedCount = reservations.filter(r => r.status === "SEATED").length;
  const availableTables = tables.filter(t => t.status === "AVAILABLE").length;

  const handleSeatGuest = (reservationId: number) => {
    setReservations(reservations.map(r => 
      r.id === reservationId ? { ...r, status: "SEATED" } : r
    ));
    toast.success("Guest has been seated!");
  };

  const handleMarkNoShow = (reservationId: number) => {
    setReservations(reservations.map(r => 
      r.id === reservationId ? { ...r, status: "NO_SHOW" } : r
    ));
    toast.info("Marked as no-show");
  };

  const handleSeatWaitlist = (guestId: number) => {
    const guest = waitlist.find(g => g.id === guestId);
    if (guest) {
      setWaitlist(waitlist.filter(g => g.id !== guestId));
      toast.success(`${guest.name} has been seated!`);
    }
  };

  const handleAddWalkIn = () => {
    if (!walkInData.name) return;
    toast.success(`Walk-in added: ${walkInData.name}, party of ${walkInData.partySize}`);
    setIsWalkInOpen(false);
    setWalkInData({ name: "", phone: "", partySize: "2" });
  };

  const filteredReservations = reservations.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-wine text-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-serif text-2xl font-bold">Reception Dashboard</h1>
              <p className="text-white/80">
                {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>
            
            <Dialog open={isWalkInOpen} onOpenChange={setIsWalkInOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Walk-In
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Walk-In Guest</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Guest Name</Label>
                    <Input 
                      value={walkInData.name}
                      onChange={(e) => setWalkInData({...walkInData, name: e.target.value})}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input 
                      value={walkInData.phone}
                      onChange={(e) => setWalkInData({...walkInData, phone: e.target.value})}
                      placeholder="+1 555-000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Party Size</Label>
                    <Select 
                      value={walkInData.partySize}
                      onValueChange={(v) => setWalkInData({...walkInData, partySize: v})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <SelectItem key={n} value={n.toString()}>{n} {n === 1 ? "guest" : "guests"}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddWalkIn} className="w-full bg-wine hover:bg-wine/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Waitlist
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Calendar className="h-4 w-4" />
                Today's Reservations
              </div>
              <p className="text-2xl font-bold">{reservations.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Clock className="h-4 w-4" />
                Upcoming
              </div>
              <p className="text-2xl font-bold">{upcomingReservations.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Users className="h-4 w-4" />
                Currently Seated
              </div>
              <p className="text-2xl font-bold">{seatedCount}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="h-4 w-4" />
                Tables Available
              </div>
              <p className="text-2xl font-bold">{availableTables}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs defaultValue="reservations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reservations">
              Reservations
              <Badge variant="secondary" className="ml-2">{reservations.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="waitlist">
              Waitlist
              {waitlist.length > 0 && (
                <Badge className="ml-2 bg-wine">{waitlist.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="tables">Floor Plan</TabsTrigger>
          </TabsList>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredReservations.map((reservation) => {
                const status = statusColors[reservation.status];
                return (
                  <Card key={reservation.id} className={cn(
                    reservation.isVip && "border-gold"
                  )}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className={cn(
                              "text-white",
                              reservation.isVip ? "bg-gold" : "bg-wine"
                            )}>
                              {reservation.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{reservation.name}</h3>
                              {reservation.isVip && (
                                <Badge className="bg-gold/20 text-gold-dark text-xs">
                                  <Star className="h-3 w-3 mr-1 fill-gold" />
                                  VIP
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {reservation.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {reservation.partySize}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {reservation.table}
                              </span>
                            </div>
                            {reservation.notes && (
                              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {reservation.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={cn(status.bg, status.text)}>
                            {reservation.status === "CONFIRMED" && <AlertCircle className="h-3 w-3 mr-1" />}
                            {reservation.status === "SEATED" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {reservation.status === "NO_SHOW" && <XCircle className="h-3 w-3 mr-1" />}
                            {reservation.status.replace("_", " ")}
                          </Badge>
                          
                          {reservation.status === "CONFIRMED" && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                className="bg-wine hover:bg-wine/90"
                                onClick={() => handleSeatGuest(reservation.id)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Seat
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkNoShow(reservation.id)}
                              >
                                No Show
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Waitlist Tab */}
          <TabsContent value="waitlist">
            {waitlist.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No one on the waitlist</h3>
                  <p className="text-muted-foreground">Walk-in guests will appear here</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {waitlist.map((guest, index) => (
                  <Card key={guest.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-wine text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold">{guest.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Party of {guest.partySize}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {guest.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">~{guest.waitTime} min</p>
                            <p className="text-xs text-muted-foreground">Est. wait</p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toast.info(`Notified ${guest.name}`)}
                            >
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-wine hover:bg-wine/90"
                              onClick={() => handleSeatWaitlist(guest.id)}
                            >
                              <ArrowRight className="h-4 w-4 mr-1" />
                              Seat Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tables.map((table) => (
                <Card 
                  key={table.id}
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-all",
                    table.status === "AVAILABLE" && "border-green-300 bg-green-50/50",
                    table.status === "OCCUPIED" && "border-blue-300 bg-blue-50/50",
                    table.status === "RESERVED" && "border-yellow-300 bg-yellow-50/50",
                    table.status === "CLEANING" && "border-orange-300 bg-orange-50/50"
                  )}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className={cn("w-3 h-3 rounded-full", tableStatusColors[table.status])} />
                      <span className="font-bold text-xl">T{table.number}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{table.section}</p>
                    <p className="text-sm text-muted-foreground">{table.seats} seats</p>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "mt-2",
                        table.status === "AVAILABLE" && "border-green-500 text-green-700",
                        table.status === "OCCUPIED" && "border-blue-500 text-blue-700",
                        table.status === "RESERVED" && "border-yellow-500 text-yellow-700",
                        table.status === "CLEANING" && "border-orange-500 text-orange-700"
                      )}
                    >
                      {table.status === "RESERVED" ? `Reserved ${table.time}` : table.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-6 p-4 bg-muted rounded-lg">
              {Object.entries(tableStatusColors).map(([status, color]) => (
                <div key={status} className="flex items-center gap-2 text-sm">
                  <div className={cn("w-3 h-3 rounded-full", color)} />
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
