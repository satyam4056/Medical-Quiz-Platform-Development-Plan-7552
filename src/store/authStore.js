import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          const mockUser = {
            id: '1',
            email,
            name: email.split('@')[0],
            tier: 'free',
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
            joinDate: new Date().toISOString(),
            stats: {
              quizzesCreated: 0,
              questionsAnswered: 0,
              accuracy: 0,
              streak: 0
            }
          };
          set({ user: mockUser, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      register: async (email, password, name) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          const mockUser = {
            id: '1',
            email,
            name,
            tier: 'free',
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
            joinDate: new Date().toISOString(),
            stats: {
              quizzesCreated: 0,
              questionsAnswered: 0,
              accuracy: 0,
              streak: 0
            }
          };
          set({ user: mockUser, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({ user: null });
      },

      updateStats: (newStats) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              stats: { ...user.stats, ...newStats }
            }
          });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);