import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Profile } from '@shared/schema';
import { isDemoMode } from '@/lib/demoMode';
import { syntheticUserGraph } from '@shared/synthetic-data';
import { fakeEncounters, type FakeEncounter } from '@shared/serendipity-data';
import { HomeHeader } from '@/components/HomeHeader';
import { HomeTabs, TabType } from '@/components/HomeTabs';
import { AboutTab } from '@/components/AboutTab';
import { GraphTab } from '@/components/GraphTab';
import { ConnectionsTab } from '@/components/ConnectionsTab';
import { InsightsTab } from '@/components/InsightsTab';
import { MatchNotificationModal } from '@/components/MatchNotificationModal';
import { SerendipityPopup } from '@/components/SerendipityPopup';
import { SignUpScreen } from '@/components/SignUpScreen';

interface Match {
  profileId: string;
  distance: number;
  sharedInterests: string[];
  matchCount: number;
  revealed: boolean;
}

type SerendipityStage = 'teaser' | 'revealed' | 'matched';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [isOpen, setIsOpen] = useState(true);
  const [showNearbyPulse, setShowNearbyPulse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [latestMatch, setLatestMatch] = useState<Match | null>(null);
  const [serendipityMatch, setSerendipityMatch] = useState<FakeEncounter | null>(null);
  const [serendipityStage, setSerendipityStage] = useState<SerendipityStage>('teaser');
  const previousMatchIdsRef = useRef<Set<string>>(new Set());
  const isInitialLoadRef = useRef(true);

  const demoProfile: Profile = {
    id: 'demo-profile-001',
    userId: 'demo-user-001',
    name: 'Demo User',
    interests: ['Artificial Intelligence', 'Film Production', 'Rock Climbing', 'Sourdough Baking', 'Product Design'],
    discoverable: true,
    latitude: null,
    longitude: null,
    graphData: null,
    lastActive: new Date(),
    signature: null,
    uploadedFiles: null,
  };

  // Check if user has a profile (skip in demo mode)
  const { data: profile, isLoading: isLoadingProfile } = useQuery<Profile | null>({
    queryKey: ['/api/profile/me'],
    enabled: !isDemoMode(),
  });

  const { data: matches = [] } = useQuery<Match[]>({
    queryKey: [`/api/profiles/${profile?.id}/matches`],
    enabled: !!profile?.id && isOpen && !isDemoMode(),
    refetchInterval: 30000,
  });

  // Use demo profile or real profile
  const activeProfile = isDemoMode() ? demoProfile : profile;

  useEffect(() => {
    const currentMatchIds = new Set(matches.map(m => m.profileId));
    
    if (isInitialLoadRef.current) {
      previousMatchIdsRef.current = currentMatchIds;
      isInitialLoadRef.current = false;
      return;
    }

    const newMatches = matches.filter(m => !previousMatchIdsRef.current.has(m.profileId));
    
    if (newMatches.length > 0) {
      setLatestMatch(newMatches[0]);
      setShowModal(true);
    }
    
    previousMatchIdsRef.current = currentMatchIds;
  }, [matches]);

  const handleViewMatch = () => {
    setShowModal(false);
    setActiveTab('connections');
  };

  const triggerSerendipity = () => {
    const randomMatch = fakeEncounters[Math.floor(Math.random() * fakeEncounters.length)];
    setSerendipityMatch(randomMatch);
    setSerendipityStage('teaser');
  };

  const handleFindOutWho = () => {
    if (serendipityMatch?.type === 'public') {
      setSerendipityStage('matched');
    } else {
      setSerendipityStage('revealed');
    }
  };

  const handleMatched = () => {
    setSerendipityStage('matched');
  };

  const handleDismissSerendipity = () => {
    setSerendipityMatch(null);
    setSerendipityStage('teaser');
  };

  useEffect(() => {
    if (serendipityMatch !== null) return;

    const timer = setTimeout(() => {
      triggerSerendipity();
    }, 12000);

    return () => clearTimeout(timer);
  }, [serendipityMatch]);

  // Show loading while checking for profile (skip in demo mode)
  if (isLoadingProfile && !isDemoMode()) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f3f0' }}>
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Show signup if no profile (skip in demo mode)
  if (!activeProfile && !isDemoMode()) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f3f0' }}>
        <div className="w-full h-screen max-w-md mx-auto">
          <SignUpScreen />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col" style={{ backgroundColor: '#f5f3f0' }}>
      <HomeHeader 
        isOpen={isOpen} 
        onToggleOpen={() => setIsOpen(!isOpen)}
        showNearbyPulse={showNearbyPulse}
        onToggleNearbyPulse={() => setShowNearbyPulse(!showNearbyPulse)}
        showNearbyPulseControl={activeTab === 'mine'}
        onSimulateSerendipity={triggerSerendipity}
        isDemoMode={isDemoMode()}
      />
      <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 relative overflow-hidden">
        {activeTab === 'about' && <AboutTab />}

        {activeTab === 'mine' && (
          <GraphTab graphData={syntheticUserGraph} tabKey="mine-tab" showNearbyPulse={showNearbyPulse} />
        )}

        {activeTab === 'insights' && <InsightsTab />}

        {activeTab === 'connections' && <ConnectionsTab />}
      </div>

      <MatchNotificationModal
        match={latestMatch}
        open={showModal}
        onClose={() => setShowModal(false)}
        onViewMatch={handleViewMatch}
      />

      <SerendipityPopup
        match={serendipityMatch}
        stage={serendipityStage}
        onFindOutWho={handleFindOutWho}
        onMatched={handleMatched}
        onDismiss={handleDismissSerendipity}
      />
    </div>
  );
}
