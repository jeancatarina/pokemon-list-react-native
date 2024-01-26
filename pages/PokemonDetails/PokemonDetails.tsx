import { Card } from '../../components/Card';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text } from 'react-native';

import { PokemonType } from '../../components/PokemonType';
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

	const getBody = () => {
		return loading ?
			<ActivityIndicator testID="loading-indicator" /> :
			<>
				{getName()}
				{getImage()}
				{getTypes()}
				{getStats()}
			</>
	}

	if (error) {
		return <Text>Ops, erro ao buscar esse pokemon</Text>;
	}

	return (
		<ScrollView style={styles.container}>
			{getBody()}
		</ScrollView>
	);
};

export default PokemonDetails;