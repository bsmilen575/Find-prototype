import { Header } from "@/components/Header";
import { SettingsScreen } from "@/components/SettingsScreen";

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SettingsScreen />
    </div>
  );
}
