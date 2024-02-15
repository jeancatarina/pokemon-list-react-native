import { useEffect } from "react"
import { useColorScheme } from "react-native"
import { useThemeStore } from "store/store"

export const useLoadGlobalData = () => {
	const { darkMode, changeThemeColor } = useThemeStore((state) => state)
	const colorScheme = useColorScheme()

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		console.log("init")
		if (colorScheme === 'dark' && !darkMode) {
			changeThemeColor()
		}
	}, [])
}
