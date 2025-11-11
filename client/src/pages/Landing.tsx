import { Button } from "@/components/ui/button";
import { Info, MapPin, Shield, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f3f0] to-[#e8e6e1] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Find
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Hyper-local connections within 100 meters.
              <br />
              Meet people nearby who share your curiosities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">Hyper-Local</h3>
              <p className="text-sm text-gray-600">
                Connect with people within 100m. Coffee shop encounters, not endless scrolling.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">Privacy-First</h3>
              <p className="text-sm text-gray-600">
                Double-blind reveal. Control exactly when and what you share.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">Serendipity</h3>
              <p className="text-sm text-gray-600">
                Real-time notifications when interesting people enter your radius.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Button
              size="lg"
              className="w-full max-w-sm text-lg h-12"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-login"
            >
              Get Started
            </Button>
            <p className="text-sm text-gray-500">
              Sign in with Google, GitHub, or email to continue
            </p>
          </div>

          <div className="pt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Info className="w-4 h-4" />
            <p>
              Find uses location only when active. You control your discoverability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
