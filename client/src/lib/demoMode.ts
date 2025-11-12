export function isDemoMode(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  const modeFromUrl = urlParams.get('mode');
  const modeFromStorage = localStorage.getItem('findMode');
  return modeFromUrl === 'demo' || modeFromStorage === 'demo';
}

export function setDemoMode(demo: boolean) {
  if (demo) {
    localStorage.setItem('findMode', 'demo');
    // Reset onboarding when entering demo mode
    clearDemoOnboarding();
  } else {
    localStorage.removeItem('findMode');
    clearDemoOnboarding();
  }
}

export function setPrototypeMode() {
  localStorage.setItem('findMode', 'prototype');
}

// Demo onboarding state management
export function isDemoOnboardingComplete(): boolean {
  return localStorage.getItem('demoOnboardingComplete') === 'true';
}

export function setDemoOnboardingComplete() {
  localStorage.setItem('demoOnboardingComplete', 'true');
}

export function clearDemoOnboarding() {
  localStorage.removeItem('demoOnboardingComplete');
}

// Demo profile data (captured from onboarding)
export function setDemoProfileData(data: { name: string; interests: string[] }) {
  localStorage.setItem('demoProfileData', JSON.stringify(data));
}

export function getDemoProfileData(): { name: string; interests: string[] } | null {
  const data = localStorage.getItem('demoProfileData');
  return data ? JSON.parse(data) : null;
}

export function clearDemoProfileData() {
  localStorage.removeItem('demoProfileData');
}
