import { ActivityIndicator, Button, FlatList, StyleSheet } from "react-native"

import { Card } from "../../components/Card"
import { Text, View } from "../../components/Themed"
import { useQuery, gql, NetworkStatus } from "@apollo/client"
import { useState } from "react"
import { Link, useRouter } from "expo-router"

const GET_POKEMONS = gql`
	query GetPokemons($offset: Int, $limit: Int) {
	pokemon_v2_pokemon(offset: $offset, limit: $limit) {
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
	const [limit, setLimit] = useState(5);
	const [offset, setOffset] = useState(0);
	const router = useRouter();
	const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_POKEMONS, {
		variables: { limit, offset },
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true
	});
	console.log("🚀 ~ TabOneScreen ~ loading:", loading)
	const pokemonData = data?.pokemon_v2_pokemon

	// if (networkStatus !== NetworkStatus.ready) {
	// 	return <Text>loading...</Text>
	// }

	if (error) {
		return <Text>Ops, erro ao buscar pokemons</Text>
	}

	const handleLoadMore = () => {
		fetchMore({
			variables: {
				offset: data?.pokemon_v2_pokemon?.length
			},
		});

		setOffset(data?.pokemon_v2_pokemon?.length + limit);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={pokemonData}
				style={styles.view}
				renderItem={({ item }) => (
					<Card
						onPress={
							() => router.push({ pathname: "/pokemon/[id]", params: { id: item.id } })
						}
					>
						<Text>
							{`${item.id} - ${item.name}`}
						</Text>
					</Card>
				)}
				keyExtractor={(item) => item?.id?.toString()}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				contentContainerStyle={{ padding: 10 }}
				ListFooterComponent={
					loading ? (
						<ActivityIndicator />
					) : (
						<Button title="Carregar Mais" onPress={handleLoadMore} />
					)
				}
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
