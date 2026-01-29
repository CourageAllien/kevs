"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  Gift, 
  Star, 
  TrendingUp,
  Clock,
  Check,
  Sparkles,
  Users,
  Percent,
  UtensilsCrossed,
  Trophy,
  ArrowRight,
  Copy
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Tier configuration
const tiers = [
  { name: "Bronze", minPoints: 0, color: "bg-amber-700", textColor: "text-amber-700" },
  { name: "Silver", minPoints: 500, color: "bg-gray-400", textColor: "text-gray-500" },
  { name: "Gold", minPoints: 1500, color: "bg-gold", textColor: "text-gold-dark" },
  { name: "Platinum", minPoints: 5000, color: "bg-slate-700", textColor: "text-slate-700" },
];

// Demo rewards
const availableRewards = [
  {
    id: "1",
    name: "Free Appetizer",
    description: "Get any appetizer free with your meal",
    points: 200,
    icon: UtensilsCrossed,
    category: "Food",
  },
  {
    id: "2",
    name: "15% Off Your Bill",
    description: "Valid on orders over $50",
    points: 350,
    icon: Percent,
    category: "Discount",
  },
  {
    id: "3",
    name: "Free Dessert",
    description: "Choose any dessert from the menu",
    points: 150,
    icon: Gift,
    category: "Food",
  },
  {
    id: "4",
    name: "Priority Reservations",
    description: "Skip the waitlist for 1 month",
    points: 500,
    icon: Crown,
    category: "Perk",
  },
  {
    id: "5",
    name: "Bring a Friend",
    description: "50% off for a guest on your next visit",
    points: 400,
    icon: Users,
    category: "Discount",
  },
  {
    id: "6",
    name: "$25 Credit",
    description: "Use towards any purchase",
    points: 600,
    icon: Sparkles,
    category: "Credit",
  },
];

// Demo history
const pointsHistory = [
  { id: "1", description: "Dinner at La Bella Italia", points: 120, type: "earned", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
  { id: "2", description: "Free Appetizer Redeemed", points: -200, type: "redeemed", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
  { id: "3", description: "Lunch at Tokyo Ramen House", points: 65, type: "earned", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8) },
  { id: "4", description: "Birthday Bonus", points: 100, type: "bonus", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15) },
  { id: "5", description: "Referral Bonus - John D.", points: 250, type: "bonus", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20) },
  { id: "6", description: "Dinner at El Mariachi", points: 85, type: "earned", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25) },
];

export default function RewardsPage() {
  const [currentPoints] = useState(1250);
  const [totalEarned] = useState(2450);
  const referralCode = "KEVS-JOHN-2024";
  
  // Calculate current tier
  const currentTier = tiers.reduce((acc, tier) => 
    currentPoints >= tier.minPoints ? tier : acc, tiers[0]
  );
  
  const nextTier = tiers.find(t => t.minPoints > currentPoints);
  const progressToNext = nextTier 
    ? ((currentPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleRedeem = (reward: typeof availableRewards[0]) => {
    if (currentPoints < reward.points) {
      toast.error("Not enough points", {
        description: `You need ${reward.points - currentPoints} more points`,
      });
      return;
    }
    toast.success(`${reward.name} redeemed!`, {
      description: "Check your email for the reward code",
    });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied!");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-gold/20">
              <Crown className="h-6 w-6 text-gold" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Rewards</h1>
          </div>
          <p className="text-muted-foreground">
            Earn points with every order and unlock exclusive rewards
          </p>
        </div>

        {/* Points Overview Card */}
        <Card className="mb-8 overflow-hidden">
          <div className={cn("h-2", currentTier.color)} />
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={cn("gap-1", currentTier.color, "text-white")}>
                    <Crown className="h-3 w-3" />
                    {currentTier.name} Member
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold">{currentPoints.toLocaleString()}</span>
                  <span className="text-muted-foreground">points</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Lifetime Earnings</p>
                <p className="font-semibold">{totalEarned.toLocaleString()} points</p>
              </div>
            </div>

            {/* Progress to next tier */}
            {nextTier && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className={currentTier.textColor}>{currentTier.name}</span>
                  <span className="text-muted-foreground">
                    {nextTier.minPoints - currentPoints} points to {nextTier.name}
                  </span>
                </div>
                <Progress value={progressToNext} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Earn {nextTier.minPoints - currentPoints} more points to unlock {nextTier.name} benefits
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-gold" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Rewards Redeemed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">+185</p>
              <p className="text-xs text-muted-foreground">Points This Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Friends Referred</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 mx-auto mb-2 text-wine" />
              <p className="text-2xl font-bold">47</p>
              <p className="text-xs text-muted-foreground">Orders Made</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="rewards" className="space-y-6">
          <TabsList>
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="history">Points History</TabsTrigger>
            <TabsTrigger value="referral">Refer Friends</TabsTrigger>
          </TabsList>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <div className="grid gap-4 sm:grid-cols-2">
              {availableRewards.map((reward) => {
                const canAfford = currentPoints >= reward.points;
                return (
                  <Card key={reward.id} className={cn(!canAfford && "opacity-60")}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          canAfford ? "bg-wine/10 text-wine" : "bg-muted text-muted-foreground"
                        )}>
                          <reward.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{reward.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="gap-1">
                              <Star className="h-3 w-3" />
                              {reward.points} points
                            </Badge>
                            <Button
                              size="sm"
                              className={cn(
                                canAfford ? "bg-wine hover:bg-wine/90" : ""
                              )}
                              variant={canAfford ? "default" : "secondary"}
                              disabled={!canAfford}
                              onClick={() => handleRedeem(reward)}
                            >
                              {canAfford ? "Redeem" : "Not Enough Points"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Points Activity</CardTitle>
                <CardDescription>Your recent points transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pointsHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-full",
                          item.type === "earned" ? "bg-green-100 text-green-600" :
                          item.type === "bonus" ? "bg-gold/20 text-gold-dark" :
                          "bg-wine/10 text-wine"
                        )}>
                          {item.type === "earned" ? <TrendingUp className="h-4 w-4" /> :
                           item.type === "bonus" ? <Gift className="h-4 w-4" /> :
                           <Check className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{item.description}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(item.date)}
                          </p>
                        </div>
                      </div>
                      <span className={cn(
                        "font-semibold",
                        item.points > 0 ? "text-green-600" : "text-wine"
                      )}>
                        {item.points > 0 ? "+" : ""}{item.points}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referral Tab */}
          <TabsContent value="referral">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Refer Friends, Earn Points
                </CardTitle>
                <CardDescription>
                  Share your referral code and earn 250 points for each friend who signs up and places their first order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-3 rounded bg-background font-mono text-lg tracking-wider">
                      {referralCode}
                    </code>
                    <Button variant="outline" size="icon" onClick={copyReferralCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-wine">1</span>
                    </div>
                    <p className="font-medium">Share Code</p>
                    <p className="text-xs text-muted-foreground">Send to friends</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-wine">2</span>
                    </div>
                    <p className="font-medium">They Sign Up</p>
                    <p className="text-xs text-muted-foreground">Using your code</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-wine">3</span>
                    </div>
                    <p className="font-medium">You Both Earn</p>
                    <p className="text-xs text-muted-foreground">250 points each</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-wine hover:bg-wine/90">
                    Share via Email
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Share on Social
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
