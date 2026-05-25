import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      toggleTheme: () => set((state) => {
        const newDark = !state.isDark
        if (newDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return { isDark: newDark }
      }),
      initTheme: () => set((state) => {
        if (state.isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return state
      }),
    }),
    { name: 'theme-storage' }
  )
)

export const usePortfolioStore = create((set) => ({
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  projectFilter: 'all',
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
}))
