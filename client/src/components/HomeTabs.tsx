import { User, Lightbulb, Users } from 'lucide-react';

export type TabType = 'mine' | 'insights' | 'connections';

interface HomeTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function HomeTabs({ activeTab, onTabChange }: HomeTabsProps) {
  return (
    <nav className="flex items-center justify-around px-4 py-3 border-b border-gray-200">
      <button
        onClick={() => onTabChange('mine')}
        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
          activeTab === 'mine' ? 'text-gray-900' : 'text-gray-400'
        }`}
        data-testid="tab-mine"
      >
        <User className={`w-6 h-6 ${activeTab === 'mine' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-xs font-medium">Mine</span>
      </button>
      
      <button
        onClick={() => onTabChange('insights')}
        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
          activeTab === 'insights' ? 'text-gray-900' : 'text-gray-400'
        }`}
        data-testid="tab-insights"
      >
        <Lightbulb className={`w-6 h-6 ${activeTab === 'insights' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-xs font-medium">Insights</span>
      </button>
      
      <button
        onClick={() => onTabChange('connections')}
        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
          activeTab === 'connections' ? 'text-gray-900' : 'text-gray-400'
        }`}
        data-testid="tab-connections"
      >
        <Users className={`w-6 h-6 ${activeTab === 'connections' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-xs font-medium">Connections</span>
      </button>
    </nav>
  );
}
