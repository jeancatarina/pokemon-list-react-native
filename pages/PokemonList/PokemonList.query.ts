import { gql } from "@apollo/client"

export const GET_POKEMONS = gql`
	query GetPokemons($offset: Int, $limit: Int) {
	pokemon_v2_pokemon(offset: $offset, limit: $limit) {
	  name
	  id
	  height
	  base_experience
	  weight
	  order
	}
  }
`
