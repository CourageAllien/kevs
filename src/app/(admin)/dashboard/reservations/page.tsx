"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Users, 
  Clock,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Demo reservations data
const initialReservations = [
  { 
    id: "1", 
    guestName: "John Smith", 
    guestPhone: "+1 555-123-4567",
    guestEmail: "john@email.com",
    partySize: 4, 
    date: new Date(), 
    time: "19:00", 
    status: "CONFIRMED",
    table: "Table 3",
    specialRequests: "Anniversary dinner, champagne on arrival",
    createdAt: new Date(Date.now() - 86400000 * 2),
  },
  { 
    id: "2", 
    guestName: "Sarah Johnson", 
    guestPhone: "+1 555-234-5678",
    guestEmail: "sarah@email.com",
    partySize: 2, 
    date: new Date(), 
    time: "20:00", 
    status: "PENDING",
    table: null,
    specialRequests: "",
    createdAt: new Date(Date.now() - 3600000),
  },
  { 
    id: "3", 
    guestName: "Mike Brown", 
    guestPhone: "+1 555-345-6789",
    guestEmail: "mike@email.com",
    partySize: 6, 
    date: new Date(), 
    time: "18:30", 
    status: "SEATED",
    table: "Table 7",
    specialRequests: "Birthday celebration",
    createdAt: new Date(Date.now() - 86400000),
  },
  { 
    id: "4", 
    guestName: "Emily Davis", 
    guestPhone: "+1 555-456-7890",
    guestEmail: "emily@email.com",
    partySize: 3, 
    date: new Date(Date.now() + 86400000), 
    time: "19:30", 
    status: "CONFIRMED",
    table: "Table 5",
    specialRequests: "Vegetarian menu preferred",
    createdAt: new Date(Date.now() - 172800000),
  },
  { 
    id: "5", 
    guestName: "David Wilson", 
    guestPhone: "+1 555-567-8901",
    guestEmail: "david@email.com",
    partySize: 8, 
    date: new Date(Date.now() - 86400000), 
    time: "20:00", 
    status: "COMPLETED",
    table: "Table 8",
    specialRequests: "",
    createdAt: new Date(Date.now() - 259200000),
  },
  { 
    id: "6", 
    guestName: "Lisa Anderson", 
    guestPhone: "+1 555-678-9012",
    guestEmail: "lisa@email.com",
    partySize: 2, 
    date: new Date(Date.now() - 86400000 * 2), 
    time: "19:00", 
    status: "CANCELLED",
    table: null,
    specialRequests: "",
    createdAt: new Date(Date.now() - 345600000),
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: <AlertCircle className="h-4 w-4" /> },
  CONFIRMED: { label: "Confirmed", color: "bg-green-100 text-green-700", icon: <CheckCircle className="h-4 w-4" /> },
  SEATED: { label: "Seated", color: "bg-blue-100 text-blue-700", icon: <Users className="h-4 w-4" /> },
  COMPLETED: { label: "Completed", color: "bg-gray-100 text-gray-700", icon: <CheckCircle className="h-4 w-4" /> },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: <XCircle className="h-4 w-4" /> },
  NO_SHOW: { label: "No Show", color: "bg-red-100 text-red-700", icon: <XCircle className="h-4 w-4" /> },
};

export default function DashboardReservationsPage() {
  const [reservations, setReservations] = useState(initialReservations);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("today");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filterByTab = (res: typeof initialReservations[0]) => {
    const resDate = new Date(res.date);
    resDate.setHours(0, 0, 0, 0);
    
    switch (activeTab) {
      case "today":
        return resDate.getTime() === today.getTime();
      case "upcoming":
        return resDate.getTime() > today.getTime();
      case "past":
        return resDate.getTime() < today.getTime();
      default:
        return true;
    }
  };

  const filteredReservations = reservations
    .filter(filterByTab)
    .filter(r => 
      r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.guestPhone.includes(searchQuery) ||
      r.guestEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleStatusChange = (resId: string, newStatus: string) => {
    setReservations(reservations.map(r => 
      r.id === resId ? { ...r, status: newStatus } : r
    ));
    toast.success("Reservation status updated");
  };

  const stats = {
    todayTotal: reservations.filter(r => {
      const d = new Date(r.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    }).length,
    pending: reservations.filter(r => r.status === "PENDING").length,
    confirmed: reservations.filter(r => r.status === "CONFIRMED").length,
    seated: reservations.filter(r => r.status === "SEATED").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-wine text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-3xl font-bold">Reservations</h1>
          <p className="text-white/80">View and manage all restaurant reservations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{stats.todayTotal}</p>
              <p className="text-sm text-muted-foreground">Today's Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.seated}</p>
              <p className="text-sm text-muted-foreground">Currently Seated</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reservations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.map((reservation) => {
            const status = statusConfig[reservation.status];
            
            return (
              <Card key={reservation.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Guest Info */}
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-wine text-white">
                          {reservation.guestName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{reservation.guestName}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {reservation.guestPhone}
                          </span>
                          <span className="hidden sm:flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {reservation.guestEmail}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className="gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(reservation.date), "MMM d, yyyy")}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {reservation.time}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Users className="h-3 w-3" />
                        {reservation.partySize} guests
                      </Badge>
                      {reservation.table && (
                        <Badge variant="secondary">{reservation.table}</Badge>
                      )}
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-2">
                      <Badge className={cn(status.color, "gap-1")}>
                        {status.icon}
                        {status.label}
                      </Badge>
                      <Select 
                        value={reservation.status}
                        onValueChange={(v) => handleStatusChange(reservation.id, v)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="CONFIRMED">Confirm</SelectItem>
                          <SelectItem value="SEATED">Seat</SelectItem>
                          <SelectItem value="COMPLETED">Complete</SelectItem>
                          <SelectItem value="CANCELLED">Cancel</SelectItem>
                          <SelectItem value="NO_SHOW">No Show</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {reservation.specialRequests && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Special Requests: </span>
                        {reservation.specialRequests}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredReservations.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No reservations found</h3>
              <p className="text-muted-foreground">
                {activeTab === "today" ? "No reservations for today" : "Try adjusting your search"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
