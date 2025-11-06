import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Privacy You Can Trust</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Built on cryptographic principles that keep your data encrypted and secure
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Private Set Intersection</h3>
              <p className="text-sm text-muted-foreground">
                Mathematical proofs ensure data privacy
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-sm text-muted-foreground">
                Your profile stays encrypted at all times
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Controlled Reveal</h3>
              <p className="text-sm text-muted-foreground">
                You decide what to share and when
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your People?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join Find and discover meaningful connections based on who you really are
          </p>
          <Button size="lg" className="px-8" data-testid="button-get-started-footer">
            Get Started Now
          </Button>
        </div>
      </section>

      <footer className="border-t py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Find. Privacy-preserving location-based matching.</p>
        </div>
      </footer>
    </div>
  );
}
