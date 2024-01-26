
import * as Apollo from '@apollo/client';
import { render, screen, waitFor } from "@testing-library/react-native";
import React from 'react';
import PokemonDetails from './PokemonDetails';
import * as PokemonHooks from "./PokemonDetails.hooks";

jest.mock('./PokemonDetails.hooks');

afterEach(() => jest.clearAllMocks())

const makeSUT = () => {
	const ComponentToRender = () => (
		<PokemonDetails />
	)

	return {
		component: render(<ComponentToRender />),
	}
}

describe('PokemonDetails', () => {
	it('Should render loading state', async () => {
		jest.spyOn(PokemonHooks, "usePokemonDetails").mockReturnValue(
			{
				data: {
					loading: true,
					error: undefined,
					pokemon: {
						id: 1,
						name: 'Pikachu'
					},
					networkStatus: 1,
					typeList: [],
					statsList: [],
					spriteUri: '',
				},
				handlers: {
					fetchMore: jest.fn(),
				}
			}
		);

		const { component } = makeSUT()

		const loading = screen.getByTestId('loading-indicator');

		await waitFor(() => {
			expect(loading).toBeTruthy()
		})

	});

	it('Should render error state', async () => {
		jest.spyOn(PokemonHooks, "usePokemonDetails").mockReturnValue(
			{
				data: {
					loading: false,
					error: new Error('Failed to fetch data') as unknown as Apollo.ApolloError,
					pokemon: {
						id: 1,
						name: 'Pikachu'
					},
					networkStatus: 1,
					typeList: [],
					statsList: [],
					spriteUri: '',
				},
				handlers: {
					fetchMore: jest.fn(),
				}
			}
		);

		makeSUT()

		const text = screen.getByText(/Ops, erro ao buscar esse pokemon/i)

		await waitFor(() => {
			expect(text).toBeTruthy()
		})
	});

	it('Should render with data', async () => {
		jest.spyOn(PokemonHooks, "usePokemonDetails").mockReturnValue(
			{
				data: {
					loading: false,
					error: undefined,
					pokemon: {
						id: 1,
						name: 'Pikachu'
					},
					networkStatus: 1,
					typeList: [],
					statsList: [],
					spriteUri: '',
				},
				handlers: {
					fetchMore: jest.fn(),
				}
			}
		);

		makeSUT()

		const text = screen.getByText(/pikachu/i)

		await waitFor(() => {
			expect(text).toBeTruthy()
		})
	});
})