import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const PokemonDetails = () => {
	const params = useLocalSearchParams();
	const { id } = params;

	return (
		<View>
			<Text>Pokemon Details for ID: {id}</Text>
		</View>
	);
};

export default PokemonDetails;