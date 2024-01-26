import { ActivityIndicator, Button, FlatList } from "react-native"

import { Text, View } from "../../components/Themed"
import usePokemonList from "./PokemonList.hooks"
import { styles } from "./styles"
import { Card } from "../../components/Card"
import { useCallback } from "react"
import { FlashList } from "@shopify/flash-list"

export default function PokemonList() {
	const {
		data: { loading, error, pokemonData },
		handlers: { handleLoadMore, navigateToPokemonDetail },
	} = usePokemonList()

	if (error) {
		return <Text>Ops, erro ao buscar pokemons</Text>
	}

	const getlistItem = useCallback(
		({ item }) => (
			<Card onPress={() => navigateToPokemonDetail(item.id)}>
				<Text>{`${item.id} - ${item.name}`}</Text>
			</Card>
		),
		[navigateToPokemonDetail],
	)

	const getListFooter = () =>
		loading ? (
			<ActivityIndicator testID="loading-indicator" />
		) : (
			<Button title="Carregar Mais" onPress={handleLoadMore} />
		)

	return (
		<View style={styles.container}>
			<View style={styles.view}>
				<FlashList
					estimatedItemSize={64}
					data={pokemonData}
					renderItem={getlistItem}
					keyExtractor={(item) => item?.id?.toString()}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
					contentContainerStyle={{ padding: 10 }}
					ListFooterComponent={getListFooter}
				/>
			</View>
		</View>
	)
}
