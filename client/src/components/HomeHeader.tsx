interface HomeHeaderProps {
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function HomeHeader({ isOpen, onToggleOpen }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-2">
      <h1 className="text-2xl font-semibold text-gray-900" data-testid="heading-find">Find</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Open</span>
        <button
          onClick={onToggleOpen}
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
    </header>
  );
}
