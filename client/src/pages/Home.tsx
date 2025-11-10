import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { syntheticUserGraph } from '@shared/synthetic-data';
import { nearbyPulseGraph } from '@shared/nearby-pulse-data';
import { HomeHeader } from '@/components/HomeHeader';
import { HomeTabs, TabType } from '@/components/HomeTabs';
import { GraphTab } from '@/components/GraphTab';
import { ConnectionsTab } from '@/components/ConnectionsTab';
import { InsightsTab } from '@/components/InsightsTab';
import { MatchNotificationModal } from '@/components/MatchNotificationModal';
import { useProfile } from '@/lib/useProfile';

interface Match {
  profileId: string;
  distance: number;
  sharedInterests: string[];
  matchCount: number;
  revealed: boolean;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('mine');
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [latestMatch, setLatestMatch] = useState<Match | null>(null);
  const { profileId } = useProfile();
  const previousMatchIdsRef = useRef<Set<string>>(new Set());
  const isInitialLoadRef = useRef(true);

  const { data: matches = [] } = useQuery<Match[]>({
    queryKey: [`/api/profiles/${profileId}/matches`],
    enabled: !!profileId && isOpen,
    refetchInterval: 30000,
  });

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

  return (
    <div className="h-screen w-full flex flex-col" style={{ backgroundColor: '#f5f3f0' }}>
      <HomeHeader isOpen={isOpen} onToggleOpen={() => setIsOpen(!isOpen)} />
      <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 relative overflow-hidden">
        {activeTab === 'mine' && (
          <GraphTab graphData={syntheticUserGraph} tabKey="mine-tab" />
        )}

        {activeTab === 'nearby' && (
          <GraphTab graphData={nearbyPulseGraph} tabKey="nearby-tab" />
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
    </div>
  );
}
