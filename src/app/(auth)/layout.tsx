import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Branding */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-wine text-cream relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-20" />
        
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-wine-dark/50 rounded-full blur-3xl" />
        
        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-gold" />
            </div>
            <span className="font-serif text-3xl font-bold">Kevs</span>
          </Link>
        </div>
        
        {/* Quote */}
        <div className="relative z-10 max-w-md">
          <blockquote className="text-2xl font-serif leading-relaxed mb-4">
            &ldquo;The future of dining is digital, personal, and delightful.&rdquo;
          </blockquote>
          <p className="text-cream/70">— The Kevs Kitchen Team</p>
        </div>
        
        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          <div>
            <div className="text-3xl font-serif font-bold text-gold">150+</div>
            <div className="text-sm text-cream/70">Restaurants</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-gold">50K+</div>
            <div className="text-sm text-cream/70">Happy Diners</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-gold">99%</div>
            <div className="text-sm text-cream/70">Satisfaction</div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-wine flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-cream" />
              </div>
              <span className="font-serif text-2xl font-semibold text-foreground">Kevs</span>
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
