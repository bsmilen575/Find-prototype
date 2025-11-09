import { SettingsScreen } from "@/components/SettingsScreen";

export default function Settings() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="w-full h-screen max-w-md mx-auto">
        <SettingsScreen />
      </div>
    </div>
  );
}
