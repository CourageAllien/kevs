"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
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
  Search, 
  Users, 
  Star,
  Clock,
  DollarSign,
  Phone,
  Mail,
  MoreVertical,
  Calendar,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo staff data
const staffMembers = [
  { 
    id: "1", 
    name: "Sarah Mitchell", 
    role: "WAITER", 
    email: "sarah@kevskitchen.com", 
    phone: "+1 555-111-2222",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    status: "ON_SHIFT",
    hireDate: "2023-03-15",
    rating: 4.9,
    ordersToday: 28,
    tipsToday: 127,
  },
  { 
    id: "2", 
    name: "Michael Johnson", 
    role: "WAITER", 
    email: "michael@kevskitchen.com", 
    phone: "+1 555-222-3333",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    status: "ON_SHIFT",
    hireDate: "2022-08-20",
    rating: 4.8,
    ordersToday: 24,
    tipsToday: 98,
  },
  { 
    id: "3", 
    name: "Emily Chen", 
    role: "WAITER", 
    email: "emily@kevskitchen.com", 
    phone: "+1 555-333-4444",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    status: "OFF_DUTY",
    hireDate: "2023-06-01",
    rating: 4.7,
    ordersToday: 0,
    tipsToday: 0,
  },
  { 
    id: "4", 
    name: "Chef Antonio", 
    role: "CHEF", 
    email: "antonio@kevskitchen.com", 
    phone: "+1 555-444-5555",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop",
    status: "ON_SHIFT",
    hireDate: "2021-01-10",
    rating: 4.9,
    ordersToday: 45,
    tipsToday: 0,
  },
  { 
    id: "5", 
    name: "Lisa Park", 
    role: "RECEPTIONIST", 
    email: "lisa@kevskitchen.com", 
    phone: "+1 555-555-6666",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
    status: "ON_SHIFT",
    hireDate: "2022-11-15",
    rating: 4.8,
    ordersToday: 0,
    tipsToday: 0,
  },
  { 
    id: "6", 
    name: "James Rodriguez", 
    role: "CHEF", 
    email: "james@kevskitchen.com", 
    phone: "+1 555-666-7777",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    status: "OFF_DUTY",
    hireDate: "2023-02-28",
    rating: 4.6,
    ordersToday: 0,
    tipsToday: 0,
  },
];

const roleColors: Record<string, { bg: string; text: string }> = {
  WAITER: { bg: "bg-blue-100", text: "text-blue-700" },
  CHEF: { bg: "bg-orange-100", text: "text-orange-700" },
  RECEPTIONIST: { bg: "bg-purple-100", text: "text-purple-700" },
  MANAGER: { bg: "bg-green-100", text: "text-green-700" },
  ADMIN: { bg: "bg-red-100", text: "text-red-700" },
};

const statusColors: Record<string, { bg: string; text: string }> = {
  ON_SHIFT: { bg: "bg-green-100", text: "text-green-700" },
  OFF_DUTY: { bg: "bg-gray-100", text: "text-gray-700" },
  ON_BREAK: { bg: "bg-yellow-100", text: "text-yellow-700" },
};

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
  status: string;
  hireDate: string;
  rating: number;
  ordersToday: number;
  tipsToday: number;
}

// Demo schedule data
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StaffManagement() {
  const [staff, setStaff] = useState(staffMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);
  const [schedule, setSchedule] = useState<Record<string, { start: string; end: string; off: boolean }>>({
    Monday: { start: "09:00", end: "17:00", off: false },
    Tuesday: { start: "09:00", end: "17:00", off: false },
    Wednesday: { start: "09:00", end: "17:00", off: false },
    Thursday: { start: "09:00", end: "17:00", off: false },
    Friday: { start: "09:00", end: "17:00", off: false },
    Saturday: { start: "10:00", end: "18:00", off: false },
    Sunday: { start: "10:00", end: "18:00", off: true },
  });
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const openProfileDialog = (member: StaffMember) => {
    setSelectedMember(member);
    setIsProfileDialogOpen(true);
  };

  const openScheduleDialog = (member: StaffMember) => {
    setSelectedMember(member);
    setIsScheduleDialogOpen(true);
  };

  const handleSaveSchedule = () => {
    toast.success(`Schedule updated for ${selectedMember?.name}`);
    setIsScheduleDialogOpen(false);
  };

  const updateStaffStatus = (memberId: string, status: string) => {
    setStaff(staff.map(m => m.id === memberId ? { ...m, status } : m));
    toast.success("Status updated");
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    const member = {
      id: Date.now().toString(),
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone || "+1 555-000-0000",
      role: newStaff.role,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      status: "OFF_DUTY",
      hireDate: new Date().toISOString().split("T")[0],
      rating: 0,
      ordersToday: 0,
      tipsToday: 0,
    };

    setStaff([...staff, member]);
    setNewStaff({ name: "", email: "", phone: "", role: "" });
    setIsAddDialogOpen(false);
    toast.success(`${member.name} added to staff`);
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !selectedRole || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const onShiftCount = staff.filter(s => s.status === "ON_SHIFT").length;
  const totalTipsToday = staff.reduce((sum, s) => sum + s.tipsToday, 0);
  const totalOrdersToday = staff.reduce((sum, s) => sum + s.ordersToday, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-wine text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold">Staff Management</h1>
              <p className="text-white/80">Manage your team members and schedules</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Staff Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Staff Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input 
                      placeholder="e.g., John Smith"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input 
                      type="email" 
                      placeholder="john@kevskitchen.com"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      placeholder="+1 555-000-0000"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role *</Label>
                    <Select
                      value={newStaff.role}
                      onValueChange={(v) => setNewStaff({...newStaff, role: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WAITER">Waiter</SelectItem>
                        <SelectItem value="CHEF">Chef</SelectItem>
                        <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full bg-wine hover:bg-wine/90"
                    onClick={handleAddStaff}
                  >
                    Add Staff Member
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
              <p className="text-3xl font-bold">{staff.length}</p>
              <p className="text-sm text-muted-foreground">Total Staff</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{onShiftCount}</p>
              <p className="text-sm text-muted-foreground">On Shift Now</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{totalOrdersToday}</p>
              <p className="text-sm text-muted-foreground">Orders Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">${totalTipsToday}</p>
              <p className="text-sm text-muted-foreground">Tips Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedRole || "all"} onValueChange={(v) => setSelectedRole(v === "all" ? null : v)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="WAITER">Waiters</SelectItem>
              <SelectItem value="CHEF">Chefs</SelectItem>
              <SelectItem value="RECEPTIONIST">Receptionists</SelectItem>
              <SelectItem value="MANAGER">Managers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Staff Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStaff.map((member) => {
            const roleStyle = roleColors[member.role] || roleColors.WAITER;
            const statusStyle = statusColors[member.status];
            
            return (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14 border-2 border-background shadow">
                      <AvatarImage src={member.image} />
                      <AvatarFallback className="bg-wine text-white">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold truncate">{member.name}</h3>
                        <Badge className={cn(statusStyle.bg, statusStyle.text, "text-xs")}>
                          {member.status === "ON_SHIFT" ? "On Shift" : member.status === "OFF_DUTY" ? "Off" : "Break"}
                        </Badge>
                      </div>
                      <Badge className={cn(roleStyle.bg, roleStyle.text, "text-xs mt-1")}>
                        {member.role}
                      </Badge>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          <span>{member.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t text-center">
                    <div>
                      <p className="font-semibold flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        {member.rating}
                      </p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div>
                      <p className="font-semibold">{member.ordersToday}</p>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-600">${member.tipsToday}</p>
                      <p className="text-xs text-muted-foreground">Tips</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => openProfileDialog(member)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => openScheduleDialog(member)}
                    >
                      Edit Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredStaff.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No staff found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* View Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Staff Profile</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-background shadow">
                  <AvatarImage src={selectedMember.image} />
                  <AvatarFallback className="bg-wine text-white text-xl">
                    {selectedMember.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedMember.name}</h3>
                  <Badge className={cn(roleColors[selectedMember.role]?.bg, roleColors[selectedMember.role]?.text)}>
                    {selectedMember.role}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedMember.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedMember.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Hire Date</p>
                    <p className="font-medium">{new Date(selectedMember.hireDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    {selectedMember.rating}
                  </p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{selectedMember.ordersToday}</p>
                  <p className="text-xs text-muted-foreground">Orders Today</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-green-600">${selectedMember.tipsToday}</p>
                  <p className="text-xs text-muted-foreground">Tips Today</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Current Status</Label>
                <Select 
                  value={selectedMember.status} 
                  onValueChange={(v) => {
                    updateStaffStatus(selectedMember.id, v);
                    setSelectedMember({ ...selectedMember, status: v });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ON_SHIFT">On Shift</SelectItem>
                    <SelectItem value="OFF_DUTY">Off Duty</SelectItem>
                    <SelectItem value="ON_BREAK">On Break</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full"
                variant="outline"
                onClick={() => setIsProfileDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Schedule - {selectedMember?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Set the weekly schedule for this staff member.</p>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {weekDays.map((day) => (
                <div key={day} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-24 font-medium">{day}</div>
                  <div className="flex items-center gap-2 flex-1">
                    <Input 
                      type="time"
                      value={schedule[day].start}
                      onChange={(e) => setSchedule({
                        ...schedule,
                        [day]: { ...schedule[day], start: e.target.value }
                      })}
                      disabled={schedule[day].off}
                      className="w-28"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input 
                      type="time"
                      value={schedule[day].end}
                      onChange={(e) => setSchedule({
                        ...schedule,
                        [day]: { ...schedule[day], end: e.target.value }
                      })}
                      disabled={schedule[day].off}
                      className="w-28"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={schedule[day].off}
                      onCheckedChange={(checked) => setSchedule({
                        ...schedule,
                        [day]: { ...schedule[day], off: checked }
                      })}
                    />
                    <span className="text-sm text-muted-foreground w-8">Off</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setIsScheduleDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-wine hover:bg-wine/90"
                onClick={handleSaveSchedule}
              >
                Save Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
