import { Header } from "@/components/Header";
import { MapView } from "@/components/MapView";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MapView />
    </div>
  );
}
