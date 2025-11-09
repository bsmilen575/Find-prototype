import { Header } from "@/components/Header";
import { MatchNotificationScreen } from "@/components/MatchNotificationScreen";

export default function MatchNotification() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MatchNotificationScreen />
    </div>
  );
}
