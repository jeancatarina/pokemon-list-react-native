import { FC } from "react"
import {
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native"

interface CardProps extends TouchableOpacityProps {
	children: React.ReactNode
}

export const Card: FC<CardProps> = ({ children, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.card}>
			{children}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	card: {
		flexGrow: 1,
		marginBottom: 12,
		marginLeft: 15,
		marginRight: 15,
		padding: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#AFC8AD",
		backgroundColor: "#AFC8AD",
	},
})
