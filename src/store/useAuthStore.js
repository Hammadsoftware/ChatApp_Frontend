import { create } from 'zustand';

const useAuthStore = create((set) => ({
  authUser: null,
  users: [],
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,

  setAuthUser: (user) => set({ authUser: user }),
  setUsers: (users) => set({ users }),
  logout: () => set({ authUser: null }),
}));

export default useAuthStore;