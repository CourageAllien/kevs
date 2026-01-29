"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users,
  Clock,
  Utensils
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo floor plan tables
const floorTables = [
  // Window Section
  { id: 1, number: "1", x: 5, y: 10, seats: 2, status: "AVAILABLE", section: "Window" },
  { id: 2, number: "2", x: 5, y: 25, seats: 2, status: "OCCUPIED", section: "Window", customer: "John S.", time: "45m" },
  { id: 3, number: "3", x: 5, y: 40, seats: 4, status: "OCCUPIED", section: "Window", customer: "Sarah M.", time: "30m" },
  { id: 4, number: "4", x: 5, y: 55, seats: 2, status: "RESERVED", section: "Window", reservation: "7:30 PM" },
  
  // Main Section
  { id: 5, number: "5", x: 35, y: 15, seats: 4, status: "OCCUPIED", section: "Main", customer: "Mike W.", time: "20m" },
  { id: 6, number: "6", x: 35, y: 35, seats: 4, status: "AVAILABLE", section: "Main" },
  { id: 7, number: "7", x: 35, y: 55, seats: 6, status: "CLEANING", section: "Main" },
  { id: 8, number: "8", x: 55, y: 15, seats: 4, status: "AVAILABLE", section: "Main" },
  { id: 9, number: "9", x: 55, y: 35, seats: 4, status: "RESERVED", section: "Main", reservation: "8:00 PM" },
  { id: 10, number: "10", x: 55, y: 55, seats: 8, status: "OCCUPIED", section: "Main", customer: "Party of 8", time: "1h 15m" },
  
  // Patio Section
  { id: 11, number: "11", x: 80, y: 15, seats: 2, status: "AVAILABLE", section: "Patio" },
  { id: 12, number: "12", x: 80, y: 35, seats: 4, status: "OCCUPIED", section: "Patio", customer: "Emily C.", time: "10m" },
  { id: 13, number: "13", x: 80, y: 55, seats: 4, status: "AVAILABLE", section: "Patio" },
];

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  AVAILABLE: { bg: "bg-green-100", border: "border-green-500", text: "text-green-700" },
  OCCUPIED: { bg: "bg-blue-100", border: "border-blue-500", text: "text-blue-700" },
  RESERVED: { bg: "bg-yellow-100", border: "border-yellow-500", text: "text-yellow-700" },
  CLEANING: { bg: "bg-orange-100", border: "border-orange-500", text: "text-orange-700" },
};

export default function FloorPlanPage() {
  const [tables, setTables] = useState(floorTables);
  const [selectedTable, setSelectedTable] = useState<typeof floorTables[0] | null>(null);

  const handleTableAction = (tableId: number, newStatus: string) => {
    setTables(tables.map(t => 
      t.id === tableId ? { ...t, status: newStatus } : t
    ));
    toast.success(`Table ${selectedTable?.number} updated`);
    setSelectedTable(null);
  };

  const availableCount = tables.filter(t => t.status === "AVAILABLE").length;
  const occupiedCount = tables.filter(t => t.status === "OCCUPIED").length;
  const reservedCount = tables.filter(t => t.status === "RESERVED").length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Floor Plan</h1>
        <p className="text-muted-foreground">Interactive view of restaurant tables</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{availableCount}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{occupiedCount}</p>
            <p className="text-xs text-muted-foreground">Occupied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-yellow-600">{reservedCount}</p>
            <p className="text-xs text-muted-foreground">Reserved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold">{tables.length}</p>
            <p className="text-xs text-muted-foreground">Total Tables</p>
          </CardContent>
        </Card>
      </div>

      {/* Floor Plan */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Restaurant Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[500px] bg-muted/30 rounded-lg border">
            {/* Section Labels */}
            <div className="absolute top-2 left-4 text-xs font-medium text-muted-foreground">Window</div>
            <div className="absolute top-2 left-1/3 text-xs font-medium text-muted-foreground">Main</div>
            <div className="absolute top-2 right-4 text-xs font-medium text-muted-foreground">Patio</div>
            
            {/* Dividers */}
            <div className="absolute top-0 left-[28%] w-px h-full bg-border" />
            <div className="absolute top-0 left-[72%] w-px h-full bg-border" />
            
            {/* Tables */}
            {tables.map((table) => {
              const status = statusColors[table.status];
              const size = table.seats <= 2 ? "w-12 h-12" : table.seats <= 4 ? "w-16 h-16" : "w-20 h-20";
              
              return (
                <div
                  key={table.id}
                  className={cn(
                    "absolute rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105",
                    status.bg,
                    status.border,
                    size,
                    selectedTable?.id === table.id && "ring-2 ring-wine"
                  )}
                  style={{ left: `${table.x}%`, top: `${table.y}%` }}
                  onClick={() => setSelectedTable(table)}
                >
                  <span className="font-bold text-sm">{table.number}</span>
                  <span className="text-[10px] text-muted-foreground">{table.seats} seats</span>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4">
            {Object.entries(statusColors).map(([status, colors]) => (
              <div key={status} className="flex items-center gap-2 text-sm">
                <div className={cn("w-4 h-4 rounded border-2", colors.bg, colors.border)} />
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Table Details */}
      {selectedTable && (
        <Card>
          <CardHeader>
            <CardTitle>Table {selectedTable.number}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Section</p>
                <p className="font-medium">{selectedTable.section}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="font-medium">{selectedTable.seats} seats</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={cn(statusColors[selectedTable.status].bg, statusColors[selectedTable.status].text)}>
                  {selectedTable.status}
                </Badge>
              </div>
              {selectedTable.customer && (
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedTable.customer} ({selectedTable.time})</p>
                </div>
              )}
              {selectedTable.reservation && (
                <div>
                  <p className="text-sm text-muted-foreground">Reserved for</p>
                  <p className="font-medium">{selectedTable.reservation}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {selectedTable.status === "AVAILABLE" && (
                <Button 
                  className="bg-wine hover:bg-wine/90"
                  onClick={() => handleTableAction(selectedTable.id, "OCCUPIED")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Seat Guests
                </Button>
              )}
              {selectedTable.status === "OCCUPIED" && (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => handleTableAction(selectedTable.id, "CLEANING")}
                  >
                    Mark Complete
                  </Button>
                </>
              )}
              {selectedTable.status === "CLEANING" && (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleTableAction(selectedTable.id, "AVAILABLE")}
                >
                  Mark Clean
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={() => setSelectedTable(null)}
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
