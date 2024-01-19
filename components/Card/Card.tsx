import { FC } from "react"
import { Text, View } from "../Themed"
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native"

interface CardProps extends TouchableOpacityProps {
	children: React.ReactNode
}

export const Card: FC<CardProps> = ({ children, onPress }) => {
	return <TouchableOpacity onPress={onPress} style={styles.card}>{children}</TouchableOpacity>
}

const styles = StyleSheet.create({
	card: {
		flexGrow: 1,
		margin: 15,
		padding: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#AFC8AD",
		backgroundColor: "#AFC8AD",
	},
})
