import { renderHook } from '@testing-library/react-native';
import { usePokemonList } from './PokemonList.hooks';
import * as ApolloClient from '@apollo/client'
import * as ExpoRouter from 'expo-router'

jest.mock('expo-router', () => {
	return {
		...jest.requireActual('expo-router'),
		useRouter: jest.fn().mockReturnValue({
			push: jest.fn(),
			replace: jest.fn(),
			back: jest.fn(),
			canGoBack: jest.fn(),
			setParams: jest.fn()
		} as ExpoRouter.Router)
	}
})

jest.mock('./PokemonList.query', () => ({
	GET_POKEMONS: '',
}));


const mockUseRouter = {
	push: jest.fn(),
	replace: jest.fn(),
	back: jest.fn(),
	canGoBack: jest.fn(),
	setParams: jest.fn()
} as ExpoRouter.Router;

describe('usePokemonList', () => {
	it('should fetch Pokémon data correctly', async () => {
		const mockData = {
			pokemon_v2_pokemon: [{ id: 1, name: 'Pikachu' }],
		};

		const mockUseQuery = {
			loading: false,
			error: null,
			data: mockData,
			fetchMore: jest.fn(),
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as unknown as ApolloClient.QueryResult<any, ApolloClient.OperationVariables>;

		jest.spyOn(ApolloClient, 'useQuery').mockReturnValueOnce(mockUseQuery);

		const { result } = renderHook(() => usePokemonList());

		expect(result.current.data.loading).toBe(false);
		expect(result.current.data.error).toBeNull();
		expect(result.current.data.pokemonData).toEqual(mockData.pokemon_v2_pokemon);
	});

	// it('should handle load more correctly', async () => {
	// 	const mockData = {
	// 		pokemon_v2_pokemon: [/* your mock data here */],
	// 	};

	// 	const mockUseQuery = {
	// 		loading: false,
	// 		error: null,
	// 		data: mockData,
	// 		fetchMore: jest.fn(),
	// 	};

	// 	const { result, waitForNextUpdate } = renderHook(() => usePokemonList());

	// 	// Mocking useQuery hook
	// 	jest.spyOn(require('@apollo/client'), 'useQuery').mockReturnValueOnce(mockUseQuery);

	// 	// Mocking useRouter hook
	// 	jest.spyOn(require('expo-router'), 'useRouter').mockReturnValueOnce(mockUseRouter);

	// 	// Wait for the initial data fetching to complete
	// 	await waitForNextUpdate();

	// 	// Trigger handleLoadMore
	// 	act(() => {
	// 		result.current.handlers.handleLoadMore();
	// 	});

	// 	// Expect fetchMore to be called with the correct variables
	// 	expect(mockUseQuery.fetchMore).toHaveBeenCalledWith({
	// 		variables: {
	// 			offset: mockData.pokemon_v2_pokemon.length,
	// 		},
	// 	});

	// 	// Expect setOffset to be called with the correct value
	// 	expect(result.current.data.pokemonData.length).toBeGreaterThan(0);
	// 	expect(result.current.data.pokemonData.length).toBe(mockData.pokemon_v2_pokemon.length);

	// 	// Ensure useRouter.push is called when navigating to Pokemon detail
	// 	act(() => {
	// 		result.current.handlers.navigateToPokemonDetail('pokemonId');
	// 	});

	// 	// Expect useRouter.push to be called with the correct parameters
	// 	expect(mockUseRouter.push).toHaveBeenCalledWith({
	// 		pathname: '/pokemon/[id]',
	// 		params: { id: 'pokemonId' },
	// 	});
	// });
});