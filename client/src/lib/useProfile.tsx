import { create } from 'zustand';

interface ProfileState {
  profileId: string | null;
  name: string | null;
  setProfile: (profileId: string, name: string) => void;
  clearProfile: () => void;
}

export const useProfile = create<ProfileState>((set) => ({
  profileId: null,
  name: null,
  setProfile: (profileId, name) => {
    set({ profileId, name });
    localStorage.setItem('find-profile', JSON.stringify({ profileId, name }));
  },
  clearProfile: () => {
    set({ profileId: null, name: null });
    localStorage.removeItem('find-profile');
  },
}));

// Initialize from localStorage
const stored = localStorage.getItem('find-profile');
if (stored) {
  try {
    const { profileId, name } = JSON.parse(stored);
    useProfile.getState().setProfile(profileId, name);
  } catch (e) {
    // ignore
  }
}
