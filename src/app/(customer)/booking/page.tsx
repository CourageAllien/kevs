"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin,
  Plus,
  Phone,
  CheckCircle2,
  XCircle,
  AlertCircle,
  LogIn
} from "lucide-react";
import { useDiningStore } from "@/stores/dining-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo reservations data
const demoReservations = [
  {
    id: "RES-000",
    restaurant: {
      name: "La Bella Italia",
      slug: "la-bella-italia",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, New York, NY",
    },
    date: new Date(), // Today!
    time: "19:00",
    partySize: 2,
    tableName: "Table 3 - Window Seat",
    status: "CONFIRMED",
    specialOccasion: "Date Night",
  },
  {
    id: "RES-001",
    restaurant: {
      name: "La Bella Italia",
      slug: "la-bella-italia",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, New York, NY",
    },
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    time: "19:00",
    partySize: 4,
    tableName: "Window Table 2",
    status: "CONFIRMED",
    specialOccasion: "Anniversary",
  },
  {
    id: "RES-002",
    restaurant: {
      name: "The French Quarter",
      slug: "the-french-quarter",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=200&h=200&fit=crop",
      phone: "+1 (555) 567-8901",
      address: "555 Bistro Street, New York, NY",
    },
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10 days from now
    time: "20:00",
    partySize: 2,
    tableName: "Private Room",
    status: "PENDING",
    specialOccasion: "Date Night",
  },
  {
    id: "RES-003",
    restaurant: {
      name: "El Mariachi",
      slug: "el-mariachi",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200&h=200&fit=crop",
      phone: "+1 (555) 345-6789",
      address: "789 Sunset Blvd, New York, NY",
    },
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    time: "18:30",
    partySize: 6,
    tableName: "Booth 1",
    status: "COMPLETED",
    specialOccasion: "Birthday",
  },
  {
    id: "RES-004",
    restaurant: {
      name: "Tokyo Ramen House",
      slug: "tokyo-ramen-house",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Avenue, New York, NY",
    },
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
    time: "12:00",
    partySize: 2,
    tableName: "Counter Seating",
    status: "CANCELLED",
  },
];

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  PENDING: { color: "bg-yellow-100 text-yellow-700", icon: <AlertCircle className="h-4 w-4" />, label: "Pending Confirmation" },
  CONFIRMED: { color: "bg-green-100 text-green-700", icon: <CheckCircle2 className="h-4 w-4" />, label: "Confirmed" },
  SEATED: { color: "bg-blue-100 text-blue-700", icon: <Users className="h-4 w-4" />, label: "Seated" },
  COMPLETED: { color: "bg-gray-100 text-gray-700", icon: <CheckCircle2 className="h-4 w-4" />, label: "Completed" },
  CANCELLED: { color: "bg-red-100 text-red-700", icon: <XCircle className="h-4 w-4" />, label: "Cancelled" },
  NO_SHOW: { color: "bg-red-100 text-red-700", icon: <XCircle className="h-4 w-4" />, label: "No Show" },
};

export default function BookingsPage() {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      weekday: "long",
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  const isUpcoming = (date: Date) => date > new Date();
  
  const upcomingReservations = demoReservations.filter(r => 
    isUpcoming(r.date) && !["CANCELLED", "NO_SHOW"].includes(r.status)
  );
  
  const pastReservations = demoReservations.filter(r => 
    !isUpcoming(r.date) || ["CANCELLED", "NO_SHOW", "COMPLETED"].includes(r.status)
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold">My Reservations</h1>
            <p className="text-muted-foreground mt-1">Manage your upcoming and past reservations</p>
          </div>
          <Link href="/restaurants">
            <Button className="bg-wine hover:bg-wine/90">
              <Plus className="h-4 w-4 mr-2" />
              New Reservation
            </Button>
          </Link>
        </div>

        {/* Upcoming reservations */}
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-wine" />
            Upcoming Reservations
          </h2>

          {upcomingReservations.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No upcoming reservations</p>
                <Link href="/restaurants">
                  <Button variant="outline">Browse Restaurants</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingReservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} formatDate={formatDate} />
              ))}
            </div>
          )}
        </div>

        {/* Past reservations */}
        <div>
          <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            Past Reservations
          </h2>

          {pastReservations.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No past reservations</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastReservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} formatDate={formatDate} isPast />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReservationCard({ 
  reservation, 
  formatDate,
  isPast = false
}: { 
  reservation: typeof demoReservations[0]; 
  formatDate: (date: Date) => string;
  isPast?: boolean;
}) {
  const router = useRouter();
  const activeSession = useDiningStore((state) => state.activeSession);
  const status = statusConfig[reservation.status];

  const handleCheckIn = () => {
    // Redirect to check-in page with waiter selection
    const params = new URLSearchParams({
      restaurant: reservation.restaurant.slug,
      table: reservation.tableName,
      id: reservation.id,
    });
    router.push(`/booking/checkin?${params.toString()}`);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const canCheckIn = reservation.status === "CONFIRMED" && isToday(reservation.date) && !activeSession;

  return (
    <Card className={cn(
      "overflow-hidden transition-shadow",
      isPast ? "opacity-75" : "hover:shadow-md"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src={reservation.restaurant.image}
                alt={reservation.restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <CardTitle className="font-serif text-lg">{reservation.restaurant.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{reservation.id}</p>
            </div>
          </div>
          <Badge className={cn("flex items-center gap-1", status.color)}>
            {status.icon}
            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Reservation details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(reservation.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{reservation.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{reservation.partySize} guests</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{reservation.tableName}</span>
          </div>
        </div>

        {reservation.specialOccasion && reservation.specialOccasion !== "None" && (
          <Badge variant="secondary" className="mb-4">
            {reservation.specialOccasion}
          </Badge>
        )}

        {/* Actions */}
        {!isPast && reservation.status !== "CANCELLED" && (
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            {/* Check-in button for today's reservations */}
            {canCheckIn && (
              <Button 
                size="sm" 
                className="bg-wine hover:bg-wine/90"
                onClick={handleCheckIn}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Check In & Start Ordering
              </Button>
            )}
            {activeSession && (
              <Link href="/dining">
                <Button size="sm" className="bg-wine hover:bg-wine/90">
                  Go to Active Session
                </Button>
              </Link>
            )}
            <a href={`tel:${reservation.restaurant.phone}`}>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Restaurant
              </Button>
            </a>
            <Link href={`/restaurants/${reservation.restaurant.slug}`}>
              <Button variant="outline" size="sm">
                View Menu
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              Cancel Reservation
            </Button>
          </div>
        )}

        {isPast && reservation.status === "COMPLETED" && (
          <div className="flex gap-2 pt-4 border-t">
            <Link href={`/restaurants/${reservation.restaurant.slug}/book`}>
              <Button variant="outline" size="sm">
                Book Again
              </Button>
            </Link>
            <Link href={`/restaurants/${reservation.restaurant.slug}`}>
              <Button size="sm" className="bg-wine hover:bg-wine/90">
                Order Online
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
