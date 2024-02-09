import { create } from "zustand"

interface ThemeState {
	darkMode: boolean
	changeThemeColor: () => void
}

export const useThemeStore = create<ThemeState>((set) => ({
	darkMode: false,
	changeThemeColor: () => set((state) => ({ darkMode: !state.darkMode })),
}))
