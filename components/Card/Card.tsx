import { FC } from "react"
import {
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native"
import { Box } from "theme/theme"

interface CardProps extends TouchableOpacityProps {
	children: React.ReactNode
}

export const Card: FC<CardProps> = ({ children, onPress }) => {
	return (
		<Box
			padding="m"
			backgroundColor="primaryCardBackground"
			flexGrow={1}
			borderRadius={10}
			borderWidth={1}
			marginBottom="s"
		>
			<TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
		</Box>
	)
}