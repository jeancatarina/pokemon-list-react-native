import { FC } from 'react'
import { Text, View } from '../Themed'
import { StyleSheet } from 'react-native'

interface CardProps {
	children: React.ReactNode
}

export const Card: FC<CardProps> = ({ children }) => {
	return (
		<View style={styles.card}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flexGrow: 1,
		margin: 15,
		padding: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#AFC8AD',
		backgroundColor: '#AFC8AD'
	},
});