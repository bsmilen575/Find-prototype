import { SelfMapGraph } from './SelfMapGraph';
import { UserGraph } from '@shared/synthetic-data';

interface GraphTabProps {
  graphData: UserGraph;
  tabKey: string;
}

export function GraphTab({ graphData, tabKey }: GraphTabProps) {
  return (
    <div className="h-full w-full">
      <SelfMapGraph 
        key={tabKey}
        graphData={graphData}
      />
    </div>
  );
}
