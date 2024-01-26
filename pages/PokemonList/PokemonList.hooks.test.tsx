import { act, renderHook } from '@testing-library/react-native';
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

const mockData = {
	pokemon_v2_pokemon: [{ id: 1, name: 'Pikachu' }],
};

describe('usePokemonList', () => {
	it('should fetch Pokémon data correctly', async () => {
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

	it('should handle load more correctly', async () => {
		const mockUseQuery = {
			loading: false,
			error: null,
			data: mockData,
			fetchMore: jest.fn(),
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as unknown as ApolloClient.QueryResult<any, ApolloClient.OperationVariables>;

		jest.spyOn(ApolloClient, 'useQuery').mockReturnValue(mockUseQuery);

		const { result } = renderHook(() => usePokemonList());

		act(() => {
			result.current.handlers.handleLoadMore();
		});

		expect(mockUseQuery.fetchMore).toHaveBeenCalledWith({
			variables: {
				offset: mockData.pokemon_v2_pokemon.length,
			},
		});

		expect(result.current.data.pokemonData.length).toBeGreaterThan(0);
		expect(result.current.data.pokemonData.length).toBe(mockData.pokemon_v2_pokemon.length);
	});

	it('should handle navigateToPokemonDetail correctly', async () => {
		const mockUseQuery = {
			loading: false,
			error: null,
			data: mockData,
			fetchMore: jest.fn(),
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as unknown as ApolloClient.QueryResult<any, ApolloClient.OperationVariables>;

		jest.spyOn(ApolloClient, 'useQuery').mockReturnValue(mockUseQuery);

		const { result } = renderHook(() => usePokemonList());

		act(() => {
			result.current.handlers.navigateToPokemonDetail('pokemonId');
		});
	});
});