import { Header } from "@/components/Header";
import { HomeScreen } from "@/components/HomeScreen";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeScreen />
    </div>
  );
}
