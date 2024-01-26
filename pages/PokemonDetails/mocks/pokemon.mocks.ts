export const POKEMON_V2_POKEMONSPRITES = [
	{
		__typename: "pokemon_v2_pokemonsprites",
		sprites: {
			front_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
		},
	},
]

export const POKEMON_V2_POKEMONSTATS = [
	{
		__typename: "pokemon_v2_pokemonstat",
		base_stat: 45,
		effort: 0,
		pokemon_v2_stat: {
			__typename: "pokemon_v2_stat",
			name: "hp",
		},
	},
	{
		__typename: "pokemon_v2_pokemonstat",
		base_stat: 49,
		effort: 0,
		pokemon_v2_stat: {
			__typename: "pokemon_v2_stat",
			name: "attack",
		},
	},
]

export const POKEMON_V2_POKEMONTYPES = [
	{
		__typename: "pokemon_v2_pokemontype",
		pokemon_v2_type: {
			__typename: "pokemon_v2_type",
			id: 12,
			name: "grass",
		},
	},
	{
		__typename: "pokemon_v2_pokemontype",
		pokemon_v2_type: {
			__typename: "pokemon_v2_type",
			id: 4,
			name: "poison",
		},
	},
]

export const POKEMON_V2_POKEMON_BY_PK = {
	id: 1,
	name: "Pikachu",
	pokemon_v2_pokemontypes: POKEMON_V2_POKEMONTYPES,
	pokemon_v2_pokemonstats: POKEMON_V2_POKEMONSTATS,
	pokemon_v2_pokemonsprites: POKEMON_V2_POKEMONSPRITES,
}
