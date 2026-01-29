"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  UtensilsCrossed,
  DollarSign,
  Eye,
  EyeOff,
  Flame,
  Leaf,
  Clock,
  MoreVertical
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo menu data
const menuCategories = [
  { id: "1", name: "Appetizers", itemCount: 8 },
  { id: "2", name: "Pasta", itemCount: 12 },
  { id: "3", name: "Pizza", itemCount: 10 },
  { id: "4", name: "Mains", itemCount: 15 },
  { id: "5", name: "Desserts", itemCount: 6 },
  { id: "6", name: "Beverages", itemCount: 14 },
];

const demoMenuItems = [
  { id: "1", name: "Bruschetta", category: "Appetizers", price: 12.99, description: "Grilled bread rubbed with garlic and topped with tomatoes", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=200&h=200&fit=crop", available: true, popular: true, dietary: ["VEGETARIAN"] },
  { id: "2", name: "Spaghetti Carbonara", category: "Pasta", price: 22.99, description: "Classic Roman pasta with eggs, cheese, pancetta", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&h=200&fit=crop", available: true, popular: true, dietary: [] },
  { id: "3", name: "Margherita Pizza", category: "Pizza", price: 16.99, description: "Fresh mozzarella, tomatoes, basil on crispy crust", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop", available: true, popular: false, dietary: ["VEGETARIAN"] },
  { id: "4", name: "Tiramisu", category: "Desserts", price: 10.99, description: "Coffee-soaked ladyfingers with mascarpone cream", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop", available: true, popular: true, dietary: ["VEGETARIAN"] },
  { id: "5", name: "Truffle Risotto", category: "Mains", price: 28.99, description: "Creamy arborio rice with black truffle shavings", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=200&h=200&fit=crop", available: false, popular: false, dietary: ["VEGETARIAN", "GLUTEN_FREE"] },
  { id: "6", name: "Caesar Salad", category: "Appetizers", price: 11.99, description: "Romaine lettuce, parmesan, croutons, caesar dressing", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop", available: true, popular: false, dietary: ["VEGETARIAN"] },
];

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
  popular: boolean;
  dietary: string[];
}

export default function MenuManagement() {
  const [items, setItems] = useState(demoMenuItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    prepTime: "15",
    description: "",
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const item = {
      id: Date.now().toString(),
      name: newItem.name,
      category: menuCategories.find(c => c.id === newItem.category)?.name || "Appetizers",
      price: parseFloat(newItem.price),
      description: newItem.description || "Delicious menu item",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
      available: true,
      popular: false,
      dietary: [] as string[],
    };

    setItems([...items, item]);
    setNewItem({ name: "", category: "", price: "", prepTime: "15", description: "" });
    setIsAddDialogOpen(false);
    toast.success(`${item.name} added to menu`);
  };

  const openEditDialog = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleEditItem = () => {
    if (!editingItem) return;
    
    setItems(items.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    setIsEditDialogOpen(false);
    setEditingItem(null);
    toast.success("Menu item updated");
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAvailability = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
    toast.success("Item availability updated");
  };

  const deleteItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
    toast.success("Item deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-wine text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold">Menu Management</h1>
              <p className="text-white/80">Manage your restaurant's menu items and categories</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Menu Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Item Name *</Label>
                    <Input 
                      placeholder="e.g., Spaghetti Carbonara"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(v) => setNewItem({...newItem, category: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {menuCategories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price ($) *</Label>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00"
                        value={newItem.price}
                        onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Prep Time (min)</Label>
                      <Input 
                        type="number" 
                        placeholder="15"
                        value={newItem.prepTime}
                        onChange={(e) => setNewItem({...newItem, prepTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Describe the dish..."
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    />
                  </div>
                  <Button 
                    className="w-full bg-wine hover:bg-wine/90"
                    onClick={handleAddItem}
                  >
                    Add Item
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
              <p className="text-3xl font-bold">{items.length}</p>
              <p className="text-sm text-muted-foreground">Total Items</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{menuCategories.length}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{items.filter(i => i.available).length}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">{items.filter(i => i.popular).length}</p>
              <p className="text-sm text-muted-foreground">Popular Items</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory || "all"} onValueChange={(v) => setSelectedCategory(v === "all" ? null : v)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {menuCategories.map(cat => (
                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className={cn(!item.available && "opacity-60")}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {!item.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <EyeOff className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold truncate">{item.name}</h3>
                      <span className="font-bold text-wine">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      {item.popular && (
                        <Badge className="bg-gold/20 text-gold-dark text-xs">Popular</Badge>
                      )}
                      {item.dietary.includes("VEGETARIAN") && (
                        <Leaf className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
                
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={item.available}
                      onCheckedChange={() => toggleAvailability(item.id)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.available ? "Available" : "Hidden"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Item Name *</Label>
                <Input 
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={menuCategories.find(c => c.name === editingItem.category)?.id || "1"}
                  onValueChange={(v) => setEditingItem({
                    ...editingItem, 
                    category: menuCategories.find(c => c.id === v)?.name || "Appetizers"
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {menuCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Price ($) *</Label>
                <Input 
                  type="number" 
                  step="0.01"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={editingItem.popular}
                  onCheckedChange={(checked) => setEditingItem({...editingItem, popular: checked})}
                />
                <Label>Mark as Popular</Label>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-wine hover:bg-wine/90"
                  onClick={handleEditItem}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
