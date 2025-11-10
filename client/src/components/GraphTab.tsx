import { SelfMapGraph } from './SelfMapGraph';
import { UserGraph } from '@shared/synthetic-data';

interface GraphTabProps {
  graphData: UserGraph;
  tabKey: string;
}

export function GraphTab({ graphData, tabKey }: GraphTabProps) {
  const mode = tabKey === 'nearby-tab' ? 'nearbyPulse' : 'mine';
  
  return (
    <div className="h-full w-full">
      <SelfMapGraph 
        key={tabKey}
        graphData={graphData}
        mode={mode}
      />
    </div>
  );
}
