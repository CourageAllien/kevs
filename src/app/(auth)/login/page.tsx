"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  ChefHat, 
  Users, 
  ClipboardList, 
  LayoutDashboard,
  Shield,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { useDemoAuth, demoUsers, getRoleRedirectUrl } from "@/stores/demo-auth-store";

// Demo login buttons configuration
const loginOptions = [
  {
    key: "customer" as const,
    label: "Customer",
    description: "Browse restaurants & order",
    icon: User,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    key: "waiter" as const,
    label: "Waiter",
    description: "Manage tables & orders",
    icon: ClipboardList,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    key: "chef" as const,
    label: "Kitchen Staff",
    description: "Kitchen display system",
    icon: ChefHat,
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    key: "receptionist" as const,
    label: "Receptionist",
    description: "Reservations & floor plan",
    icon: Users,
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    key: "manager" as const,
    label: "Manager",
    description: "Dashboard & analytics",
    icon: LayoutDashboard,
    color: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    key: "admin" as const,
    label: "Admin",
    description: "Full system access",
    icon: Shield,
    color: "bg-red-500 hover:bg-red-600",
  },
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const { login } = useDemoAuth();

  const handleQuickLogin = async (userKey: keyof typeof demoUsers) => {
    setLoadingKey(userKey);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Log in with demo user
    login(userKey);
    
    const user = demoUsers[userKey];
    toast.success(`Welcome, ${user.name}!`);
    
    // Redirect based on role or callback URL
    const redirectUrl = callbackUrl || getRoleRedirectUrl(user.role);
    router.push(redirectUrl);
  };

  return (
    <Card className="border-0 shadow-none lg:border lg:shadow-sm max-w-md mx-auto">
      <CardHeader className="text-center pb-2">
        <Badge variant="secondary" className="w-fit mx-auto mb-2">
          Demo Mode
        </Badge>
        <CardTitle className="font-serif text-3xl">Quick Login</CardTitle>
        <CardDescription className="text-base">
          Select a role to explore the app
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="grid gap-3">
          {loginOptions.map((option) => {
            const Icon = option.icon;
            const isLoading = loadingKey === option.key;
            
            return (
              <Button
                key={option.key}
                onClick={() => handleQuickLogin(option.key)}
                disabled={loadingKey !== null}
                className={`w-full h-auto py-4 ${option.color} text-white justify-start`}
              >
                <div className="flex items-center gap-3 w-full">
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                  <div className="text-left">
                    <p className="font-medium">{option.label}</p>
                    <p className="text-xs opacity-80">{option.description}</p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-xs text-muted-foreground">
            testing mode active
          </span>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          New to Kevs Kitchen?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Learn more
          </Link>
        </p>

        {/* Info box */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            Authentication is disabled for testing. Click any role above to instantly access that part of the app.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function LoginSkeleton() {
  return (
    <Card className="border-0 shadow-none lg:border lg:shadow-sm max-w-md mx-auto">
      <CardHeader className="text-center pb-2">
        <Skeleton className="h-6 w-24 mx-auto mb-2" />
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-56 mx-auto mt-2" />
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="animate-fade-in">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
