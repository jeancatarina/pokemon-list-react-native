
import React from 'react';
import { create, act } from 'react-test-renderer';
import PokemonList from './PokemonList';
import * as Apollo from '@apollo/client';
import { ActivityIndicator } from 'react-native';

jest.mock('expo-router', () => ({
	useRouter: () => ({ push: jest.fn() }),
}));

afterEach(() => jest.clearAllMocks())

const makeSUT = () => {
	const ComponentToRender = () => (
		<PokemonList />
	)

	return {
		component: create(<ComponentToRender />),
	}
}

describe('PokemonList', () => {
	it('Should render loading state', async () => {
		jest.spyOn(Apollo, "useQuery").mockReturnValue(
			{
				data: null,
				loading: true,
				error: undefined,
				fetchMore: jest.fn(),
				networkStatus: 1,
			} as unknown as Apollo.QueryResult<unknown, Apollo.OperationVariables>
		);

		await act(async () => {
			const { component } = await makeSUT()

			const instance = component?.root
			const activityIndicator = instance.findByType(ActivityIndicator);

			expect(activityIndicator).toBeDefined();
		});

	});

	it('Should render error state', async () => {
		jest.spyOn(Apollo, "useQuery").mockReturnValue({
			data: null,
			loading: true,
			error: new Error('Failed to fetch data'),
			fetchMore: jest.fn(),
			networkStatus: 1,
		} as unknown as Apollo.QueryResult<unknown, Apollo.OperationVariables>
		);

		await act(async () => {
			const { component } = await makeSUT()

			const tree = component.toJSON();
			const instance = component?.root
			const textComponents = instance.findAllByProps({ children: 'Ops, erro ao buscar pokemons' });
			console.log(tree)
			expect(textComponents.length).toBeGreaterThan(0);
		});
	});

	// it('Should render with data', async () => {
	// 	const mockData = {
	// 		loading: false,
	// 		error: null,
	// 		data: {
	// 			pokemon_v2_pokemon: [
	// 			],
	// 		},
	// 		fetchMore: jest.fn(),
	// 	};

	// 	jest.spyOn(Apollo, "useQuery").mockReturnValue(mockData);

	// 	let component;

	// 	await act(async () => {
	// 		component = create(<PokemonList />);
	// 	});

	// 	const tree = component.toJSON();

	// 	expect(tree).toMatchSnapshot();
	// });
})