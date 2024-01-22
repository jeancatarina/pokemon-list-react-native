
import React from 'react';
import { create, act } from 'react-test-renderer';
import PokemonList from './PokemonList';
import Apollo from '@apollo/client';

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
		// jest.spyOn(Apollo, "useQuery").mockReturnValue(
		// 	{ loading: true }
		// );

		await act(async () => {
			const { component } = makeSUT()

			const tree = component.toJSON();

			expect(tree).toMatchSnapshot();
		});


	});

	// it('Should render error state', async () => {
	// 	jest.spyOn(Apollo, "useQuery").mockReturnValue({ loading: false, error: new Error('Failed to fetch data') });

	// 	let component;

	// 	await act(async () => {
	// 		component = create(<PokemonList />);
	// 	});

	// 	const tree = component.toJSON();

	// 	expect(tree).toMatchSnapshot();
	// });

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