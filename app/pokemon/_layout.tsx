import { Slot, Stack, useLocalSearchParams } from "expo-router"
import { useThemeStore } from "store/store"
import theme, { Text, darkTheme } from "theme/theme"

export default function PokemonLayout() {
	const params = useLocalSearchParams()
	const darkMode = useThemeStore((state) => state.darkMode)
	const backgroundColor = darkMode
		? darkTheme.colors.mainBackground
		: theme.colors.mainBackground
	const textColor = darkMode
		? darkTheme.colors.primaryCardText
		: theme.colors.primaryCardText

	return (
		<>
			<Stack.Screen
				options={{
					title: `Pokemon: ${params.id as string}`,
					headerShown: true,
					headerStyle: {
						backgroundColor: backgroundColor,
					},
					headerTitleStyle: {
						color: textColor,
					},
					headerBackground: () => <Text>teste</Text>,
				}}
			/>
			<Slot />
		</>
	)
}
