import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UtensilsCrossed, 
  Calendar, 
  MessageSquare, 
  Star,
  ChefHat,
  Clock,
  CreditCard,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-wine flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-cream" />
            </div>
            <span className="font-serif text-2xl font-semibold text-foreground">
              Kevs
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/restaurants" className="text-muted-foreground hover:text-foreground transition-colors">
              Restaurants
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pattern-dots">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-cream-dark" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-wine/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wine/10 text-wine mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">The Future of Restaurant Management</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 animate-slide-up">
              Elevate Your
              <span className="block text-gradient-wine">Dining Experience</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-100">
              Discover exceptional restaurants, book tables effortlessly, order with ease, 
              and enjoy personalized service—all from one elegant platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-200">
              <Link href="/restaurants">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  Explore Restaurants
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Join as Restaurant
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-slide-up animation-delay-300">
              <div className="text-center">
                <div className="font-serif text-4xl font-bold text-foreground">150+</div>
                <div className="text-sm text-muted-foreground mt-1">Partner Restaurants</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Diners</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl font-bold text-foreground">4.9</div>
                <div className="text-sm text-muted-foreground mt-1">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed for modern dining experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<UtensilsCrossed className="w-6 h-6" />}
              title="Digital Menus"
              description="Beautiful, interactive menus with dietary filters, allergen info, and real-time availability"
            />
            <FeatureCard
              icon={<Calendar className="w-6 h-6" />}
              title="Table Booking"
              description="Easy reservations with floor plan views, table preferences, and instant confirmation"
            />
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Direct Chat"
              description="Communicate with your waiter instantly for requests, questions, or assistance"
            />
            <FeatureCard
              icon={<CreditCard className="w-6 h-6" />}
              title="Seamless Payments"
              description="Pay at your table, split bills easily, and leave tips—all from your phone"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background bg-pattern-dots">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From discovery to dessert, we make every step delightful
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="01"
              title="Browse"
              description="Explore curated restaurants and their menus"
            />
            <StepCard
              number="02"
              title="Book"
              description="Reserve your perfect table with a few taps"
            />
            <StepCard
              number="03"
              title="Order"
              description="Customize and place your order digitally"
            />
            <StepCard
              number="04"
              title="Enjoy"
              description="Savor your meal and pay seamlessly"
            />
          </div>
        </div>
      </section>

      {/* For Restaurants Section */}
      <section className="py-24 bg-gradient-wine text-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-6">
                Powerful Tools for Restaurant Owners
              </h2>
              <p className="text-cream/80 text-lg mb-8">
                Streamline operations, boost efficiency, and delight customers with our 
                comprehensive restaurant management platform.
              </p>
              
              <div className="space-y-4">
                <FeatureItem icon={<ChefHat />} text="Kitchen Display System with real-time order tracking" />
                <FeatureItem icon={<Clock />} text="Smart scheduling and shift management" />
                <FeatureItem icon={<Star />} text="Customer insights and analytics dashboard" />
                <FeatureItem icon={<MessageSquare />} text="Staff communication and table management" />
              </div>
              
              <Link href="/register" className="inline-block mt-8">
                <Button size="lg" variant="secondary" className="bg-cream text-wine hover:bg-cream/90">
                  Partner With Us
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-wine-dark/50 backdrop-blur border border-cream/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-cream/10 flex items-center justify-center mx-auto mb-6">
                    <ChefHat className="w-12 h-12 text-gold" />
                  </div>
                  <div className="font-serif text-2xl font-bold mb-2">Manager Dashboard</div>
                  <p className="text-cream/60">Real-time analytics & control</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Dining Experience?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of diners and restaurants already enjoying the Kevs Kitchen platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/restaurants">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Find a Restaurant
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-serif text-2xl font-semibold">Kevs</span>
              </div>
              <p className="text-background/60 text-sm">
                The modern restaurant management platform for exceptional dining experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Diners</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li><Link href="/restaurants" className="hover:text-background">Find Restaurants</Link></li>
                <li><Link href="/register" className="hover:text-background">Create Account</Link></li>
                <li><Link href="/rewards" className="hover:text-background">Loyalty Rewards</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Restaurants</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li><Link href="/partner" className="hover:text-background">Partner With Us</Link></li>
                <li><Link href="/pricing" className="hover:text-background">Pricing</Link></li>
                <li><Link href="/features" className="hover:text-background">Features</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li><Link href="/about" className="hover:text-background">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-background">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-background">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/10 pt-8 text-center text-sm text-background/60">
            <p>&copy; {new Date().getFullYear()} Kevs Kitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 border-border/50">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-xl bg-wine/10 text-wine flex items-center justify-center mb-4 group-hover:bg-wine group-hover:text-cream transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wine/10 text-wine font-serif text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-cream/90">{text}</span>
    </div>
  );
}
