"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Users, 
  Clock,
  UtensilsCrossed,
  MessageCircle,
  Receipt,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo tables assigned to this waiter
const myTables = [
  { 
    id: 1, 
    number: "3", 
    seats: 4, 
    status: "OCCUPIED", 
    section: "Window",
    customers: "John & Sarah",
    partySize: 2,
    seatedAt: new Date(Date.now() - 1000 * 60 * 45),
    orderCount: 3,
    orderTotal: 68.95,
    lastActivity: "Dessert ordered",
  },
  { 
    id: 2, 
    number: "7", 
    seats: 2, 
    status: "OCCUPIED", 
    section: "Patio",
    customers: "Mike Wilson",
    partySize: 1,
    seatedAt: new Date(Date.now() - 1000 * 60 * 30),
    orderCount: 2,
    orderTotal: 24.98,
    lastActivity: "Food ready to serve",
  },
  { 
    id: 3, 
    number: "12", 
    seats: 4, 
    status: "OCCUPIED", 
    section: "Main",
    customers: "Emily Chen",
    partySize: 3,
    seatedAt: new Date(Date.now() - 1000 * 60 * 15),
    orderCount: 2,
    orderTotal: 42.50,
    lastActivity: "Order placed",
  },
  { 
    id: 4, 
    number: "5", 
    seats: 4, 
    status: "BILL_REQUESTED", 
    section: "Window",
    customers: "David Brown",
    partySize: 4,
    seatedAt: new Date(Date.now() - 1000 * 60 * 75),
    orderCount: 5,
    orderTotal: 156.75,
    lastActivity: "Bill requested",
  },
];

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  OCCUPIED: { bg: "bg-blue-100", text: "text-blue-700", label: "Dining" },
  BILL_REQUESTED: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Bill Requested" },
  AVAILABLE: { bg: "bg-green-100", text: "text-green-700", label: "Available" },
  CLEANING: { bg: "bg-orange-100", text: "text-orange-700", label: "Cleaning" },
};

export default function WaiterTablesPage() {
  const [tables] = useState(myTables);
  const [selectedTable, setSelectedTable] = useState<typeof myTables[0] | null>(null);

  const getTimeSince = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 60) return `${mins}m`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  };

  const handlePrintBill = (tableId: number) => {
    toast.success("Bill printed!");
    setSelectedTable(null);
  };

  const handleMarkComplete = (tableId: number) => {
    toast.success("Table marked as complete!");
    setSelectedTable(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Tables</h1>
        <p className="text-muted-foreground">Manage your assigned tables</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">{tables.length}</p>
            <p className="text-sm text-muted-foreground">Active Tables</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">
              {tables.reduce((sum, t) => sum + t.partySize, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Guests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">
              {tables.filter(t => t.status === "BILL_REQUESTED").length}
            </p>
            <p className="text-sm text-muted-foreground">Bills Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">
              ${tables.reduce((sum, t) => sum + t.orderTotal, 0).toFixed(0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => {
          const status = statusColors[table.status];
          return (
            <Card 
              key={table.id}
              className={cn(
                "cursor-pointer hover:shadow-md transition-all",
                table.status === "BILL_REQUESTED" && "ring-2 ring-yellow-500"
              )}
              onClick={() => setSelectedTable(table)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Table {table.number}</CardTitle>
                  <Badge className={cn(status.bg, status.text)}>
                    {status.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{table.section}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{table.customers}</span>
                    <span className="text-muted-foreground">({table.partySize} guests)</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {getTimeSince(table.seatedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                      {table.orderCount} items
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-1">Last activity:</p>
                    <p className="text-sm font-medium">{table.lastActivity}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-muted-foreground">Current Total</span>
                    <span className="font-bold text-lg">${table.orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Table Detail Dialog */}
      <Dialog open={!!selectedTable} onOpenChange={() => setSelectedTable(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Table {selectedTable?.number} - {selectedTable?.customers}</DialogTitle>
          </DialogHeader>
          
          {selectedTable && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Party Size</p>
                  <p className="font-medium">{selectedTable.partySize} guests</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Seated</p>
                  <p className="font-medium">{getTimeSince(selectedTable.seatedAt)} ago</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Items Ordered</p>
                  <p className="font-medium">{selectedTable.orderCount} items</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-medium text-lg">${selectedTable.orderTotal.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline">
                  <UtensilsCrossed className="h-4 w-4 mr-2" />
                  View Order
                </Button>
              </div>
              
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => handlePrintBill(selectedTable.id)}
                >
                  <Receipt className="h-4 w-4 mr-2" />
                  Print Bill
                </Button>
                <Button 
                  className="flex-1 bg-wine hover:bg-wine/90"
                  onClick={() => handleMarkComplete(selectedTable.id)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Close Table
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
