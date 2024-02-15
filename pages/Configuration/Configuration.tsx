import { Container } from "components/Container"
import { Switch } from "react-native"
import { useThemeStore } from "store/store"
import { Box, Text, palette } from "theme/theme"

export const Configuration = () => {
	const { darkMode, changeThemeColor } = useThemeStore((state) => state)

	return (
		<Container>
			<Box flexDirection="row" justifyContent="space-between" backgroundColor="mainBackground">
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
