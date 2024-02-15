import { ActivityIndicator, Button, FlatList } from "react-native"

import { FlashList } from "@shopify/flash-list"
import { Container } from "components/Container"
import { useCallback } from "react"
import { Box, Text } from "theme/theme"
import { Card } from "../../components/Card"
import usePokemonList from "./PokemonList.hooks"

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
				<Text color="primaryCardText">{`${item.id} - ${item.name}`}</Text>
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
		<Container>
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
		</Container>
	)
}
