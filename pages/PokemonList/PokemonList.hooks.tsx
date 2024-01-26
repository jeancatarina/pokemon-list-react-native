import { useQuery } from "@apollo/client"
import { useRouter } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { GET_POKEMONS } from "./PokemonList.query"

export const usePokemonList = () => {
	const [limit, setLimit] = useState(5)
	const [offset, setOffset] = useState(0)
	const router = useRouter()
	const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
		variables: { limit, offset },
		fetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	})
	const pokemonData = data?.pokemon_v2_pokemon

	useEffect(() => {
		if (error) {
			console.error("Error fetching Pokémon data:", error)
		}
	}, [error])

	const handleLoadMore = () => {
		fetchMore({
			variables: {
				offset: data?.pokemon_v2_pokemon?.length,
			},
		})

		setOffset(data?.pokemon_v2_pokemon?.length + limit)
	}

	const navigateToPokemonDetail = useCallback(
		(itemId) => {
			router.push({ pathname: "/pokemon/[id]", params: { id: itemId } })
		},
		[router],
	)

	return {
		data: {
			loading,
			error,
			pokemonData,
		},
		handlers: {
			handleLoadMore,
			navigateToPokemonDetail,
		},
	}
}

export default usePokemonList
