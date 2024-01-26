import * as ApolloClient from "@apollo/client"
import { renderHook } from "@testing-library/react-native"
import * as ExpoRouter from "expo-router"
import { usePokemonDetails } from "./PokemonDetails.hooks"
import { POKEMON_V2_POKEMON_BY_PK } from "./mocks/pokemon.mocks"

jest.mock("expo-router", () => {
	return {
		...jest.requireActual("expo-router"),
		useRouter: jest.fn().mockReturnValue({
			push: jest.fn(),
			replace: jest.fn(),
			back: jest.fn(),
			canGoBack: jest.fn(),
			setParams: jest.fn(),
		} as ExpoRouter.Router),
	}
})

jest.mock("./PokemonDetails.query", () => ({
	GET_POKEMONS: "",
}))

const mockData = {
	pokemon_v2_pokemon_by_pk: POKEMON_V2_POKEMON_BY_PK,
}

describe("usePokemonDetails", () => {
	it("should fetch Pokémon data correctly", async () => {
		const mockUseQuery = {
			loading: false,
			error: null,
			data: mockData,
			fetchMore: jest.fn(),
		} as unknown as ApolloClient.QueryResult<
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			any,
			ApolloClient.OperationVariables
		>

		jest.spyOn(ApolloClient, "useQuery").mockReturnValue(mockUseQuery)

		const { result } = renderHook(() => usePokemonDetails())

		expect(result.current.data.loading).toBe(false)
		expect(result.current.data.error).toBeNull()
		expect(result.current.data.pokemon).toEqual(
			mockData.pokemon_v2_pokemon_by_pk,
		)
	})

	it("should fetch Pokémon statsList correctly", async () => {
		const mockUseQuery = {
			loading: false,
			error: null,
			data: mockData,
			fetchMore: jest.fn(),
		} as unknown as ApolloClient.QueryResult<
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			any,
			ApolloClient.OperationVariables
		>

		jest.spyOn(ApolloClient, "useQuery").mockReturnValue(mockUseQuery)

		const { result } = renderHook(() => usePokemonDetails())

		expect(result.current.data.loading).toBe(false)
		expect(result.current.data.error).toBeNull()
		expect(result.current.data.statsList).toEqual([
			{
				baseStat: 45,
				effort: 0,
				name: "hp",
			},
			{
				baseStat: 49,
				effort: 0,
				name: "attack",
			},
		])
	})

	it("should fetch Pokémon typeList correctly", async () => {
		const mockUseQuery = {
			loading: false,
			error: null,
			data: mockData,
			fetchMore: jest.fn(),
		} as unknown as ApolloClient.QueryResult<
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			any,
			ApolloClient.OperationVariables
		>

		jest.spyOn(ApolloClient, "useQuery").mockReturnValue(mockUseQuery)

		const { result } = renderHook(() => usePokemonDetails())

		expect(result.current.data.loading).toBe(false)
		expect(result.current.data.error).toBeNull()
		expect(result.current.data.typeList).toEqual([
			{
				height: "50",
				name: "grass",
				width: "100",
			},
			{
				height: "50",
				name: "poison",
				width: "100",
			},
		])
	})
})
