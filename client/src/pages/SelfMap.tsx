import { useState } from 'react';
import { SelfMapGraph } from '@/components/SelfMapGraph';
import { syntheticUserGraph } from '@shared/synthetic-data';
import { nearbyPulseGraph } from '@shared/nearby-pulse-data';
import { MapPin } from 'lucide-react';

export default function SelfMap() {
  const [activeTab, setActiveTab] = useState<'mine' | 'nearby'>('mine');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen w-full flex flex-col" style={{ backgroundColor: '#f5f3f0' }}>
      <header className="flex flex-col px-4 pt-4 pb-3 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900" data-testid="heading-find">Find</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Open</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isOpen ? 'bg-black' : 'bg-gray-300'
              }`}
              data-testid="toggle-open"
              aria-label="Toggle discoverable"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isOpen ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('mine')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'mine'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500'
            }`}
            data-testid="tab-mine"
          >
            Mine
          </button>
          <button
            onClick={() => setActiveTab('nearby')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'nearby'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500'
            }`}
            data-testid="tab-nearby"
          >
            Nearby Pulse
          </button>
        </div>

        {activeTab === 'nearby' && (
          <div className="text-center space-y-2">
            <p className="text-gray-500 text-sm px-4">
              Live map of what people around you care about right now.
            </p>
            <div className="flex items-center justify-center gap-1 text-gray-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>San Francisco</span>
            </div>
          </div>
        )}
      </header>

      <div className="flex-1 relative overflow-hidden">
        <SelfMapGraph 
          key={activeTab}
          graphData={activeTab === 'mine' ? syntheticUserGraph : nearbyPulseGraph}
        />
      </div>
    </div>
  );
}
