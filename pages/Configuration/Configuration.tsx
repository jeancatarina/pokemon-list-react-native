import { Container } from "components/Container"
import { Switch } from "react-native"
import { useThemeStore } from "store/store"
import theme, { Box, Text, palette } from "theme/theme"

export const Configuration = () => {
	const { darkMode, changeThemeColor } = useThemeStore((state) => state)

	return (
		<Container>
			<Box flexDirection="row" justifyContent="space-between">
				<Text color="primaryCardText" marginRight="s">
					Dark Mode
				</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={palette.white}
					onValueChange={changeThemeColor}
					value={darkMode}
				/>
			</Box>
		</Container>
	)
}
