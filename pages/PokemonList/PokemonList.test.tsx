import * as Apollo from "@apollo/client"
import { render, screen, waitFor } from "@testing-library/react-native"
import React from "react"
import PokemonList from "./PokemonList"
import * as PokemonHooks from "./PokemonList.hooks"

jest.mock("expo-router", () => ({
	useRouter: () => ({ push: jest.fn() }),
}))

jest.mock("./PokemonList.hooks")

afterEach(() => jest.clearAllMocks())

const makeSUT = () => {
	const ComponentToRender = () => <PokemonList />

	return {
		component: render(<ComponentToRender />),
	}
}

describe("PokemonList", () => {
	it("Should render loading state", async () => {
		jest.spyOn(PokemonHooks, "usePokemonList").mockReturnValue({
			data: {
				loading: true,
				error: undefined,
				pokemonData: null,
			},
			handlers: {
				handleLoadMore: jest.fn(),
				navigateToPokemonDetail: jest.fn(),
			},
		})

		const { component } = makeSUT()

		screen.debug()
		console.log("🚀 ~ it ~ root:", component.toJSON())

		const loading = screen.getByTestId("loading-indicator")

		await waitFor(() => {
			expect(loading).toBeTruthy()
		})
	})

	it("Should render error state", async () => {
		jest.spyOn(PokemonHooks, "usePokemonList").mockReturnValue({
			data: {
				loading: false,
				error: new Error(
					"Failed to fetch data",
				) as unknown as Apollo.ApolloError,
				pokemonData: null,
			},
			handlers: {
				handleLoadMore: jest.fn(),
				navigateToPokemonDetail: jest.fn(),
			},
		})

		makeSUT()

		const text = screen.getByText(/Ops, erro ao buscar pokemons/i)

		await waitFor(() => {
			expect(text).toBeTruthy()
		})
	})

	it("Should render with data", async () => {
		jest.spyOn(PokemonHooks, "usePokemonList").mockReturnValue({
			data: {
				loading: false,
				error: undefined,
				pokemonData: [{ id: 1, name: "Pikachu" }],
			},
			handlers: {
				handleLoadMore: jest.fn(),
				navigateToPokemonDetail: jest.fn(),
			},
		})

		makeSUT()

		const text = screen.getByText(/pikachu/i)

		await waitFor(() => {
			expect(text).toBeTruthy()
		})
	})
})
