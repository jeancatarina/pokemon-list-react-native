import { ActivityIndicator, Button, FlatList } from "react-native"

import { useQuery } from "@apollo/client"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Card } from "../../components/Card"
import { Text, View } from "../../components/Themed"
import { GET_POKEMONS } from "./query"
import { styles } from "./styles"

export default function PokemonList() {
	const [limit, setLimit] = useState(5);
	const [offset, setOffset] = useState(0);
	const router = useRouter();
	const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_POKEMONS, {
		variables: { limit, offset },
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true
	});
	const pokemonData = data?.pokemon_v2_pokemon

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


