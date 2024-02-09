import React from "react"
import { ActivityIndicator, Image, ScrollView } from "react-native"
import { Card } from "../../components/Card"

import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Text } from "theme/theme"
import { PokemonType } from "../../components/PokemonType"
import usePokemonDetails from "./PokemonDetails.hooks"
import { styles } from "./styles"

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
		handlers: { fetchMore },
	} = usePokemonDetails()

	const getName = () => (
		<Card>
			<Text color="primaryCardText">Nome: {pokemon?.name}</Text>
		</Card>
	)

	const getImage = () => (
		<Card>
			<Text color="primaryCardText">Foto: </Text>
			<Image style={styles.image} source={{ uri: spriteUri }} />
		</Card>
	)

	const getTypes = () => (
		<Card>
			<Text color="primaryCardText">Tipos: </Text>
			{typeList?.map((type) => (
				<PokemonType key={type.name} {...type} />
			))}
		</Card>
	)

	const getStats = () =>
		statsList?.map((stat) => (
			<Card key={stat.name}>
				<Text color="primaryCardText">{`Nome status: ${stat.name}`}</Text>
				<Text color="primaryCardText">{`Status base: ${stat.baseStat}`}</Text>
				<Text color="primaryCardText">{`Esforço: ${stat.effort}`}</Text>
			</Card>
		))

	const getBody = () => {
		return loading ? (
			<ActivityIndicator testID="loading-indicator" />
		) : (
			<>
				{getName()}
				{getImage()}
				{getTypes()}
				{getStats()}
			</>
		)
	}

	if (error) {
		return <Text color="primaryCardText">Ops, erro ao buscar esse pokemon</Text>
	}

	return (
		<Box backgroundColor="mainBackground" style={styles.container}>
			<ScrollView>{getBody()}</ScrollView>
		</Box>
	)
}

export default PokemonDetails
