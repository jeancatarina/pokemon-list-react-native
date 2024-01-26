import { useQuery } from '@apollo/client';
import { useLocalSearchParams } from 'expo-router';

import { GET_POKEMON_DETAIL } from './PokemonDetails.query';

export const usePokemonDetails = () => {
	const params = useLocalSearchParams();
	const { id } = params;
	const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_POKEMON_DETAIL, {
		variables: { id },
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
	});
	const currentPokemon = data?.pokemon_v2_pokemon_by_pk;
	const currentPokemonType = currentPokemon?.pokemon_v2_pokemontypes;
	const currentPokemonStats = currentPokemon?.pokemon_v2_pokemonstats;
	const currentPokemonSprites = currentPokemon?.pokemon_v2_pokemonsprites;

	const getTypeList = () => {
		return currentPokemonType?.map((pokemonType) => {
			const name = pokemonType?.pokemon_v2_type?.name;
			return { name, width: '100', height: '50' };
		});
	};

	const getStatsList = () => {
		return currentPokemonStats?.map((pokemonType) => {
			return {
				name: pokemonType?.pokemon_v2_stat?.name,
				baseStat: pokemonType?.base_stat,
				effort: pokemonType?.effort,
			};
		});
	};

	const getSpriteUri = () => {
		return currentPokemonSprites?.[0].sprites?.other?.['official-artwork'].front_default;
	};

	return {
		data: {
			loading,
			error,
			pokemon: currentPokemon,
			networkStatus,
			typeList: getTypeList(),
			statsList: getStatsList(),
			spriteUri: getSpriteUri(),
		},
		handlers: {
			fetchMore,
		}
	};
};

export default usePokemonDetails;
