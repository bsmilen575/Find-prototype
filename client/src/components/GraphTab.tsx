import { SelfMapGraph } from './SelfMapGraph';
import { UserGraph } from '@shared/synthetic-data';

interface GraphTabProps {
  graphData: UserGraph;
  tabKey: string;
  showNearbyPulse?: boolean;
}

export function GraphTab({ graphData, tabKey, showNearbyPulse = false }: GraphTabProps) {
  return (
    <div className="h-full w-full">
      <SelfMapGraph 
        key={tabKey}
        graphData={graphData}
        showNearbyPulse={showNearbyPulse}
      />
    </div>
  );
}
