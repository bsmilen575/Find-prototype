import { useState } from 'react';
import { syntheticUserGraph } from '@shared/synthetic-data';
import { nearbyPulseGraph } from '@shared/nearby-pulse-data';
import { HomeHeader } from '@/components/HomeHeader';
import { HomeTabs, TabType } from '@/components/HomeTabs';
import { GraphTab } from '@/components/GraphTab';
import { ConnectionsTab } from '@/components/ConnectionsTab';
import { InsightsTab } from '@/components/InsightsTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('mine');
  const [isOpen, setIsOpen] = useState(true);

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
    </div>
  );
}
