import { gql } from "@apollo/client"

export const GET_POKEMON_DETAIL = gql`
	query GetPokemonDetail($id: Int!) {
		pokemon_v2_pokemon_by_pk(id: $id) {
			name
			id
			pokemon_v2_pokemontypes {
				pokemon_v2_type {
					id,
					name
				}
			}
			pokemon_v2_pokemonstats {
				base_stat,
				effort,
				pokemon_v2_stat {
					name
				}
			}
			pokemon_v2_pokemonsprites {
				sprites
			}
		}
	}
`
