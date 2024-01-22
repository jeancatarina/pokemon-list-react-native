import { ActivityIndicator, Button, FlatList } from "react-native"

import { Text, View } from "../../components/Themed"
import usePokemonList from "./PokemonList.hooks"
import { styles } from "./styles"
import { Card } from "components/Card";

export default function PokemonList() {
	const {
		data: {
			loading,
			error,
			pokemonData,
		},
		handlers: {
			handleLoadMore,
			navigateToPokemonDetail,
		}
	} = usePokemonList();

	if (error) {
		return <Text>Ops, erro ao buscar pokemons</Text>;
	}

	const getlistItem = ({ item }) => (
		<Card onPress={() => navigateToPokemonDetail(item.id)}>
			<Text>{`${item.id} - ${item.name}`}</Text>
		</Card>
	)

	const getListFooter = () =>
		loading ? <ActivityIndicator /> : <Button title="Carregar Mais" onPress={handleLoadMore} />

	return (
		<View style={styles.container}>
			<FlatList
				data={pokemonData}
				style={styles.view}
				renderItem={getlistItem}
				keyExtractor={(item) => item?.id?.toString()}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				contentContainerStyle={{ padding: 10 }}
				ListFooterComponent={getListFooter}
			/>
		</View>
	);
}

