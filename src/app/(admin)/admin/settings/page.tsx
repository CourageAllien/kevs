"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Store, 
  Clock, 
  Bell,
  CreditCard,
  Mail,
  Globe,
  Printer,
  Save
} from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    restaurantName: "La Bella Italia",
    address: "123 Main Street, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "info@labellaItalia.com",
    website: "www.labellaitalia.com",
    timezone: "America/New_York",
    currency: "USD",
    taxRate: "8.0",
    serviceCharge: "5.0",
    autoConfirmReservations: true,
    sendConfirmationEmails: true,
    sendReminderEmails: true,
    enableOnlineOrdering: true,
    enableWaitlist: true,
    maxPartySize: "12",
    reservationBuffer: "15",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Restaurant Settings</h1>
        <p className="text-muted-foreground">Configure your restaurant's settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Restaurant Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Restaurant Information
            </CardTitle>
            <CardDescription>Basic details about your restaurant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Restaurant Name</Label>
                <Input 
                  value={settings.restaurantName}
                  onChange={(e) => setSettings({...settings, restaurantName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input 
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input 
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input 
                  value={settings.website}
                  onChange={(e) => setSettings({...settings, website: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Business Settings
            </CardTitle>
            <CardDescription>Pricing and payment configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select 
                  value={settings.currency}
                  onValueChange={(v) => setSettings({...settings, currency: v})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tax Rate (%)</Label>
                <Input 
                  type="number"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) => setSettings({...settings, taxRate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Service Charge (%)</Label>
                <Input 
                  type="number"
                  step="0.1"
                  value={settings.serviceCharge}
                  onChange={(e) => setSettings({...settings, serviceCharge: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select 
                value={settings.timezone}
                onValueChange={(v) => setSettings({...settings, timezone: v})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reservation Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Reservation Settings
            </CardTitle>
            <CardDescription>Configure how reservations work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Max Party Size</Label>
                <Input 
                  type="number"
                  value={settings.maxPartySize}
                  onChange={(e) => setSettings({...settings, maxPartySize: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Reservation Buffer (minutes)</Label>
                <Input 
                  type="number"
                  value={settings.reservationBuffer}
                  onChange={(e) => setSettings({...settings, reservationBuffer: e.target.value})}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-confirm Reservations</Label>
                  <p className="text-sm text-muted-foreground">Automatically confirm new reservations</p>
                </div>
                <Switch 
                  checked={settings.autoConfirmReservations}
                  onCheckedChange={(v) => setSettings({...settings, autoConfirmReservations: v})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Waitlist</Label>
                  <p className="text-sm text-muted-foreground">Allow guests to join a waitlist</p>
                </div>
                <Switch 
                  checked={settings.enableWaitlist}
                  onCheckedChange={(v) => setSettings({...settings, enableWaitlist: v})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Online Ordering</Label>
                  <p className="text-sm text-muted-foreground">Enable ordering from the app</p>
                </div>
                <Switch 
                  checked={settings.enableOnlineOrdering}
                  onCheckedChange={(v) => setSettings({...settings, enableOnlineOrdering: v})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Email Notifications
            </CardTitle>
            <CardDescription>Configure automated emails</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Confirmation Emails</Label>
                <p className="text-sm text-muted-foreground">Send confirmation when reservation is made</p>
              </div>
              <Switch 
                checked={settings.sendConfirmationEmails}
                onCheckedChange={(v) => setSettings({...settings, sendConfirmationEmails: v})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Reminder Emails</Label>
                <p className="text-sm text-muted-foreground">Send reminder 24 hours before reservation</p>
              </div>
              <Switch 
                checked={settings.sendReminderEmails}
                onCheckedChange={(v) => setSettings({...settings, sendReminderEmails: v})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          className="w-full bg-wine hover:bg-wine/90"
          size="lg"
        >
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
