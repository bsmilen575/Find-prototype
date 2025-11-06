import { Header } from "@/components/Header";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Card } from "@/components/ui/card";
import heroImage from "@assets/generated_images/Retro_future_collaboration_scene_9d415cc4.png";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <img 
              src={heroImage} 
              alt="Find" 
              className="w-full rounded-xl mb-8"
            />
            <h1 className="text-4xl font-semibold mb-4 text-center">
              Find people worth meeting
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Real-time location matching based on deep compatibility across interests, 
              values, and opportunities—without compromising privacy.
            </p>
          </div>

          <FlowDiagram />

          <div className="mt-16 space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Privacy First</h3>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-3">Private Set Intersection</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your profile data is encrypted using cryptographic techniques. When checking for matches, 
                the system uses Private Set Intersection (PSI) to find common interests without revealing 
                your full profile. You only see compatibility scores until you choose to connect.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-3">Decentralized Storage</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your data can be stored in your own Solid Pod—a personal data store you control. 
                Find never owns your information; it only processes matches with your permission.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-3">How Matching Works</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Find uses a multi-stage orchestration engine:
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                <li><span className="font-medium">1. Retrieval:</span> Quickly scan nearby users based on location and basic filters</li>
                <li><span className="font-medium">2. Embedding:</span> AI converts your interests into mathematical vectors for similarity matching</li>
                <li><span className="font-medium">3. Ranking:</span> Score potential matches across three dimensions (niche, whole person, opportunities)</li>
                <li><span className="font-medium">4. Privacy Filter:</span> Show compatibility scores without revealing identity</li>
              </ol>
            </Card>
          </div>

          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p>Find is a network. It works when people use it, or it doesn't work at all.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
