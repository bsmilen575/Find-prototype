import { Button } from "@/components/ui/button";
import { MapPin, Shield, Users } from "lucide-react";
import heroImage from "@assets/generated_images/Urban_coffee_shop_connection_moment_5cec9bf6.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="h-6 w-6 text-white/90" />
          <span className="text-white/90 font-medium text-sm tracking-wide">Privacy-First Matching</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Find Your People,
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Right Where You Are
          </span>
        </h1>
        
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Connect with compatible people nearby based on deep interests, shared passions, and complementary opportunities—without compromising your privacy.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="default"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 text-lg min-h-12"
            data-testid="button-get-started"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/5 backdrop-blur-md border border-white/30 text-white hover:bg-white/15 px-8 text-lg min-h-12"
            data-testid="button-learn-more"
          >
            <Users className="mr-2 h-5 w-5" />
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">3 Types</div>
            <div className="text-white/70">of Compatibility</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">Real-Time</div>
            <div className="text-white/70">Location Matching</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-white/70">Privacy Protected</div>
          </div>
        </div>
      </div>
    </section>
  );
}
