import { Card } from 'components/Card';
import React from 'react';
import { Image, ScrollView, Text } from 'react-native';

import { PokemonType } from 'components/PokemonType';
import usePokemonDetails from './PokemonDetails.hooks';
import { styles } from './styles';

const PokemonDetails = () => {
	const {
		data: {
			loading,
			error,
			pokemon,
			networkStatus,
			typeList,
			statsList,
			spriteUri,
		},
		handlers: {
			fetchMore,
		}
	} = usePokemonDetails();

	const getName = () => <Card>
		<Text>Nome: {pokemon?.name}</Text>
	</Card>

	const getImage = () => <Card>
		<Text>Foto: </Text>
		<Image style={styles.image} source={{ uri: spriteUri }} />
	</Card>

	const getTypes = () => <Card>
		<Text>Tipos: </Text>
		{typeList?.map((type) => (
			<PokemonType key={type.name} {...type} />
		))}
	</Card>

	const getStats = () => statsList?.map((stat, index) => (
		<Card key={index}>
			<Text>{`Nome status: ${stat.name}`}</Text>
			<Text>{`Status base: ${stat.baseStat}`}</Text>
			<Text>{`Esforço: ${stat.effort}`}</Text>
		</Card>
	))

	return (
		<ScrollView style={styles.container}>
			{getName()}
			{getImage()}
			{getTypes()}
			{getStats()}
		</ScrollView>
	);
};

export default PokemonDetails;