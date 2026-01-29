"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Plus, 
  Users, 
  Edit,
  Trash2,
  Table2,
  MapPin,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo tables data
const initialTables = [
  { id: "1", number: "1", name: "Window Booth", capacity: 4, section: "Main Floor", status: "AVAILABLE", type: "BOOTH" },
  { id: "2", number: "2", name: "Romantic Corner", capacity: 2, section: "Main Floor", status: "OCCUPIED", type: "STANDARD" },
  { id: "3", number: "3", name: "Family Table", capacity: 6, section: "Main Floor", status: "RESERVED", type: "STANDARD" },
  { id: "4", number: "4", name: "Bar Seat 1", capacity: 2, section: "Bar", status: "AVAILABLE", type: "BAR" },
  { id: "5", number: "5", name: "Patio Table 1", capacity: 4, section: "Patio", status: "AVAILABLE", type: "OUTDOOR" },
  { id: "6", number: "6", name: "Patio Table 2", capacity: 4, section: "Patio", status: "OCCUPIED", type: "OUTDOOR" },
  { id: "7", number: "7", name: "VIP Booth", capacity: 8, section: "VIP", status: "RESERVED", type: "VIP" },
  { id: "8", number: "8", name: "Chef's Table", capacity: 6, section: "VIP", status: "AVAILABLE", type: "VIP" },
  { id: "9", number: "9", name: "Standard 1", capacity: 4, section: "Main Floor", status: "CLEANING", type: "STANDARD" },
  { id: "10", number: "10", name: "Standard 2", capacity: 4, section: "Main Floor", status: "AVAILABLE", type: "STANDARD" },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  AVAILABLE: { label: "Available", color: "bg-green-100 text-green-700", icon: <CheckCircle className="h-4 w-4" /> },
  OCCUPIED: { label: "Occupied", color: "bg-red-100 text-red-700", icon: <Users className="h-4 w-4" /> },
  RESERVED: { label: "Reserved", color: "bg-blue-100 text-blue-700", icon: <Clock className="h-4 w-4" /> },
  CLEANING: { label: "Cleaning", color: "bg-yellow-100 text-yellow-700", icon: <Clock className="h-4 w-4" /> },
};

const sections = ["Main Floor", "Bar", "Patio", "VIP"];
const tableTypes = ["STANDARD", "BOOTH", "BAR", "OUTDOOR", "VIP"];

export default function AdminTablesPage() {
  const [tables, setTables] = useState(initialTables);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTable, setNewTable] = useState({
    number: "",
    name: "",
    capacity: "4",
    section: "Main Floor",
    type: "STANDARD",
  });

  const filteredTables = selectedSection 
    ? tables.filter(t => t.section === selectedSection)
    : tables;

  const handleAddTable = () => {
    if (!newTable.number || !newTable.name) {
      toast.error("Please fill in all required fields");
      return;
    }

    const table = {
      id: Date.now().toString(),
      number: newTable.number,
      name: newTable.name,
      capacity: parseInt(newTable.capacity),
      section: newTable.section,
      type: newTable.type,
      status: "AVAILABLE",
    };

    setTables([...tables, table]);
    setNewTable({ number: "", name: "", capacity: "4", section: "Main Floor", type: "STANDARD" });
    setIsAddDialogOpen(false);
    toast.success(`Table ${table.number} added successfully`);
  };

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter(t => t.id !== tableId));
    toast.success("Table deleted");
  };

  const handleStatusChange = (tableId: string, newStatus: string) => {
    setTables(tables.map(t => 
      t.id === tableId ? { ...t, status: newStatus } : t
    ));
    toast.success("Table status updated");
  };

  const stats = {
    total: tables.length,
    available: tables.filter(t => t.status === "AVAILABLE").length,
    occupied: tables.filter(t => t.status === "OCCUPIED").length,
    reserved: tables.filter(t => t.status === "RESERVED").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-wine text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold">Tables & Floor Plan</h1>
              <p className="text-white/80">Manage your restaurant's seating layout</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Table
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Table</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Table Number *</Label>
                      <Input 
                        placeholder="e.g., 11"
                        value={newTable.number}
                        onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Capacity</Label>
                      <Input 
                        type="number"
                        value={newTable.capacity}
                        onChange={(e) => setNewTable({...newTable, capacity: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Table Name *</Label>
                    <Input 
                      placeholder="e.g., Window Table"
                      value={newTable.name}
                      onChange={(e) => setNewTable({...newTable, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Section</Label>
                      <Select 
                        value={newTable.section}
                        onValueChange={(v) => setNewTable({...newTable, section: v})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sections.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select 
                        value={newTable.type}
                        onValueChange={(v) => setNewTable({...newTable, type: v})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {tableTypes.map(t => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-wine hover:bg-wine/90"
                    onClick={handleAddTable}
                  >
                    Add Table
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Tables</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.available}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-red-600">{stats.occupied}</p>
              <p className="text-sm text-muted-foreground">Occupied</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.reserved}</p>
              <p className="text-sm text-muted-foreground">Reserved</p>
            </CardContent>
          </Card>
        </div>

        {/* Section Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={selectedSection === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSection(null)}
          >
            All Sections
          </Button>
          {sections.map(section => (
            <Button
              key={section}
              variant={selectedSection === section ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </Button>
          ))}
        </div>

        {/* Tables Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTables.map((table) => {
            const status = statusConfig[table.status];
            
            return (
              <Card key={table.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                        <Table2 className="h-5 w-5 text-wine" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Table {table.number}</h3>
                        <p className="text-sm text-muted-foreground">{table.name}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteTable(table.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      {table.capacity} seats
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {table.section}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <Badge className={cn(status.color, "gap-1")}>
                      {status.icon}
                      {status.label}
                    </Badge>
                    <Select 
                      value={table.status}
                      onValueChange={(v) => handleStatusChange(table.id, v)}
                    >
                      <SelectTrigger className="w-28 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AVAILABLE">Available</SelectItem>
                        <SelectItem value="OCCUPIED">Occupied</SelectItem>
                        <SelectItem value="RESERVED">Reserved</SelectItem>
                        <SelectItem value="CLEANING">Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTables.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Table2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No tables found</h3>
              <p className="text-muted-foreground">Add tables to get started</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
