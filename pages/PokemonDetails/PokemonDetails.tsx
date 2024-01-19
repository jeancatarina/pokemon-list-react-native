import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { GET_POKEMON_DETAIL } from './query';
import { useQuery } from '@apollo/client';
import { Card } from 'components/Card';
import { styles } from './styles';

const PokemonDetails = () => {
	const params = useLocalSearchParams();
	const { id } = params;
	const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_POKEMON_DETAIL, {
		variables: { id },
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true
	});
	const currentPokemon = data?.pokemon_v2_pokemon_by_pk
	const currentPokemonType = currentPokemon?.pokemon_v2_pokemontypes
	const currentPokemonStats = currentPokemon?.pokemon_v2_pokemonstats
	const currentPokemonSprites = currentPokemon?.pokemon_v2_pokemonsprites
	console.log("🚀 ~ PokemonDetails ~ currentPokemonSprites:", currentPokemonSprites?.[0].sprites?.other?.["official-artwork"].front_default)

	const typeList = currentPokemonType?.map(
		(pokemonType) => {
			return <Text>{pokemonType?.pokemon_v2_type?.name}</Text>
		}
	)

	const statsList = currentPokemonStats?.map(
		(pokemonType) => {
			return <Card>
				<Text>{`Nome status: ${pokemonType?.pokemon_v2_stat?.name}`}</Text>
				<Text>{`Status base: ${pokemonType?.base_stat}`}</Text>
				<Text>{`Esforço: ${pokemonType?.effort}`}</Text>
			</Card>
		}
	)


	return (
		<View>
			<Card>
				<Text>Nome: {currentPokemon?.name}</Text>
			</Card>
			<Card>
				<Text>Foto: </Text>
				<Image
					style={styles.image}
					source={{
						uri: currentPokemonSprites?.[0].sprites?.other?.["official-artwork"].front_default,
					}}
				/>
			</Card>
			<Card>
				<Text>Tipos: </Text>
				{typeList}
			</Card>
			{statsList}
		</View>
	);
};

export default PokemonDetails;