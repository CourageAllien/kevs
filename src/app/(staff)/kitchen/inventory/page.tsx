"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search,
  AlertTriangle,
  Package,
  TrendingDown,
  Plus,
  Minus
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo inventory data
const inventoryItems = [
  { id: 1, name: "Spaghetti", category: "Pasta", current: 45, minimum: 20, unit: "lbs", status: "OK" },
  { id: 2, name: "Truffle Oil", category: "Oils", current: 2, minimum: 5, unit: "bottles", status: "LOW" },
  { id: 3, name: "Parmesan Cheese", category: "Dairy", current: 8, minimum: 10, unit: "lbs", status: "LOW" },
  { id: 4, name: "Fresh Basil", category: "Herbs", current: 15, minimum: 10, unit: "bunches", status: "OK" },
  { id: 5, name: "Tomato Sauce", category: "Sauces", current: 25, minimum: 15, unit: "cans", status: "OK" },
  { id: 6, name: "Mozzarella", category: "Dairy", current: 0, minimum: 8, unit: "lbs", status: "OUT" },
  { id: 7, name: "Olive Oil", category: "Oils", current: 12, minimum: 10, unit: "liters", status: "OK" },
  { id: 8, name: "Pancetta", category: "Meats", current: 3, minimum: 5, unit: "lbs", status: "LOW" },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  OK: { bg: "bg-green-100", text: "text-green-700" },
  LOW: { bg: "bg-yellow-100", text: "text-yellow-700" },
  OUT: { bg: "bg-red-100", text: "text-red-700" },
};

export default function KitchenInventoryPage() {
  const [items, setItems] = useState(inventoryItems);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = items.filter(i => i.status === "LOW").length;
  const outOfStockCount = items.filter(i => i.status === "OUT").length;

  const adjustStock = (itemId: number, amount: number) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newCurrent = Math.max(0, item.current + amount);
        let newStatus = "OK";
        if (newCurrent === 0) newStatus = "OUT";
        else if (newCurrent < item.minimum) newStatus = "LOW";
        return { ...item, current: newCurrent, status: newStatus };
      }
      return item;
    }));
    toast.success("Stock updated");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">Track and manage kitchen stock levels</p>
      </div>

      {/* Alerts */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">
                {outOfStockCount > 0 && `${outOfStockCount} items out of stock. `}
                {lowStockCount > 0 && `${lowStockCount} items running low.`}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">{items.length}</p>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">
              {items.filter(i => i.status === "OK").length}
            </p>
            <p className="text-sm text-muted-foreground">In Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-yellow-600">{lowStockCount}</p>
            <p className="text-sm text-muted-foreground">Low Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-red-600">{outOfStockCount}</p>
            <p className="text-sm text-muted-foreground">Out of Stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Inventory List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const status = statusColors[item.status];
          const stockPercent = Math.min(100, (item.current / item.minimum) * 100);
          
          return (
            <Card key={item.id} className={cn(
              item.status === "OUT" && "border-red-200",
              item.status === "LOW" && "border-yellow-200"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      <Badge className={cn(status.bg, status.text, "text-xs")}>
                        {item.status === "OUT" ? "Out of Stock" : item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Current: {item.current} {item.unit}</span>
                      <span>Minimum: {item.minimum} {item.unit}</span>
                    </div>
                    <Progress 
                      value={stockPercent} 
                      className={cn(
                        "h-2 mt-2",
                        item.status === "OUT" && "[&>div]:bg-red-500",
                        item.status === "LOW" && "[&>div]:bg-yellow-500"
                      )} 
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => adjustStock(item.id, -1)}
                      disabled={item.current === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-bold">{item.current}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => adjustStock(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
