import { MaterialCommunityIcons } from "@expo/vector-icons"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { useThemeStore } from "store/store"
import theme, { darkTheme } from "theme/theme"

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"]
	color: string
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
	const colorScheme = useColorScheme()
	const insets = useSafeAreaInsets()
	const darkMode = useThemeStore((state) => state.darkMode)
	const backgroundColor = darkMode
		? darkTheme.colors.mainBackground
		: theme.colors.mainBackground
	const textColor = darkMode
		? darkTheme.colors.primaryCardText
		: theme.colors.primaryCardText

	return (
		<Tabs
			safeAreaInsets={{
				bottom: 0,
			}}
			screenOptions={{
				headerStyle: {
					backgroundColor: backgroundColor,
				},
				headerTitleStyle: {
					color: textColor,
				},
				tabBarActiveTintColor: textColor,
				tabBarStyle: {
					height: 50 + insets.bottom,
					backgroundColor: backgroundColor,
					paddingBottom: insets.bottom,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Pokemons",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="dog" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="configuration"
				options={{
					title: "Configurações",
					tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
				}}
			/>
		</Tabs>
	)
}
