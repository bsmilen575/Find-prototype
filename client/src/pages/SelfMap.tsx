import { SelfMapGraph } from '@/components/SelfMapGraph';

export default function SelfMap() {
  return (
    <div className="h-screen w-full flex flex-col" style={{ backgroundColor: '#f5f3f0' }}>
      <header className="h-14 flex items-center justify-between px-6 border-b border-gray-300">
        <h1 className="text-lg font-medium text-gray-900">Self Map</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Demo User</span>
        </div>
      </header>
      <div className="flex-1 relative">
        <SelfMapGraph />
      </div>
    </div>
  );
}
