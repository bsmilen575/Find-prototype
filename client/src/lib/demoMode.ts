export function isDemoMode(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  const modeFromUrl = urlParams.get('mode');
  const modeFromStorage = localStorage.getItem('findMode');
  return modeFromUrl === 'demo' || modeFromStorage === 'demo';
}

export function setDemoMode(demo: boolean) {
  if (demo) {
    localStorage.setItem('findMode', 'demo');
  } else {
    localStorage.removeItem('findMode');
  }
}

export function setPrototypeMode() {
  localStorage.setItem('findMode', 'prototype');
}
