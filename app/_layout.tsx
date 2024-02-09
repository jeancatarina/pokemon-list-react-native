import { ApolloProvider } from "@apollo/client"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { client } from "../config/Apollo"
import { useLoadGlobalData } from "../services/hooks/useLoadGlobalData"

import { ThemeProvider, backgroundColor } from "@shopify/restyle"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useThemeStore } from "store/store"
import { darkTheme, theme } from "theme/theme"

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	useLoadGlobalData()
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return <RootLayoutNav />
}

function RootLayoutNav() {
	const darkMode = useThemeStore((state) => state.darkMode)

	return (
		<SafeAreaProvider>
			<ApolloProvider client={client}>
				<ThemeProvider theme={darkMode ? darkTheme : theme}>
					<Stack
						screenOptions={{
							contentStyle: {
								backgroundColor: darkMode
									? darkTheme.colors.mainBackground
									: theme.colors.mainBackground,
							},
						}}
					>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
				</ThemeProvider>
			</ApolloProvider>
		</SafeAreaProvider>
	)
}
