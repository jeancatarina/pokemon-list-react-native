import { useQuery } from "@apollo/client";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button } from "react-native";
import { Card } from "../../components/Card";
import { Text, View } from "../../components/Themed";
import { GET_POKEMONS } from "./query";

const usePokemonList = () => {
	const [limit, setLimit] = useState(5);
	const [offset, setOffset] = useState(0);
	const router = useRouter();
	const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
		variables: { limit, offset },
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
	});
	const pokemonData = data?.pokemon_v2_pokemon;

	useEffect(() => {
		if (error) {
			console.error("Error fetching Pokémon data:", error);
		}
	}, [error]);

	const handleLoadMore = () => {
		fetchMore({
			variables: {
				offset: data?.pokemon_v2_pokemon?.length,
			},
		});

		setOffset(data?.pokemon_v2_pokemon?.length + limit);
	};

	const navigateToPokemonDetail = (itemId) => {
		router.push({ pathname: "/pokemon/[id]", params: { id: itemId } });
	};

	return {
		loading,
		error,
		pokemonData,
		handleLoadMore,
		navigateToPokemonDetail,
	};
};

export default usePokemonList;
