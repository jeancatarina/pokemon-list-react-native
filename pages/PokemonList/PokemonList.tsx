import { ActivityIndicator, Button, FlatList } from "react-native"

import { Text, View } from "../../components/Themed"
import usePokemonList from "./PokemonList.hooks"
import { styles } from "./styles"
import { Card } from "components/Card";

export default function PokemonList() {
	const {
		loading,
		error,
		pokemonData,
		handleLoadMore,
		navigateToPokemonDetail,
	} = usePokemonList();

	if (error) {
		return <Text>Ops, erro ao buscar pokemons</Text>;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={pokemonData}
				style={styles.view}
				renderItem={({ item }) => (
					<Card onPress={() => navigateToPokemonDetail(item.id)}>
						<Text>{`${item.id} - ${item.name}`}</Text>
					</Card>
				)}
				keyExtractor={(item) => item?.id?.toString()}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				contentContainerStyle={{ padding: 10 }}
				ListFooterComponent={() =>
					loading ? <ActivityIndicator /> : <Button title="Carregar Mais" onPress={handleLoadMore} />
				}
			/>
		</View>
	);
}

