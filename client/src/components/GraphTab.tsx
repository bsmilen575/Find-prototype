import { SelfMapGraph } from './SelfMapGraph';
import { UserGraph } from '@shared/synthetic-data';

interface GraphTabProps {
  graphData: UserGraph;
  tabKey: string;
  showNearbyPulse?: boolean;
}

export function GraphTab({ graphData, tabKey, showNearbyPulse = false }: GraphTabProps) {
  return (
    <SelfMapGraph 
      key={tabKey}
      graphData={graphData}
      showNearbyPulse={showNearbyPulse}
    />
  );
}
