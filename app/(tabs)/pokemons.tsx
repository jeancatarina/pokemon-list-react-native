import { FlatList, StyleSheet } from "react-native"

import { Card } from "../components/Card"
import { Text, View } from "../components/Themed"
import { useQuery, gql } from "@apollo/client"

const GET_POKEMONS = gql`
	query Pokemon_v2_pokemon($limit: Int) {
	pokemon_v2_pokemon(limit: $limit) {
	  name
	  id
	  height
	  base_experience
	  weight
	  order
	}
  }
`

export default function TabOneScreen() {
	const pokemonData = [
		{ id: 1, title: "pikachu" },
		{ id: 2, title: "charmander" },
	]

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Lista de Pokemons</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<FlatList
				data={pokemonData}
				style={styles.view}
				renderItem={({ item }) => (
					<Card>
						<Text>{item.title}</Text>
					</Card>
				)}
				keyExtractor={(item) => item?.id?.toString()}
				// onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				contentContainerStyle={{ padding: 10 }}
			// ListFooterComponent={isLoading && hasMore ? <ActivityIndicator /> : null}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	view: {
		flex: 1,
		flexGrow: 1,
		width: "100%",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
})
