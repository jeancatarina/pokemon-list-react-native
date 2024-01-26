import { InMemoryCache } from "@apollo/client"

export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				pokemon_v2_pokemon: {
					keyArgs: false, // Disable caching based on arguments
					merge(existing, incoming, { args: { offset = 0 } }) {
						const merged = existing ? existing.slice(0) : []
						for (let i = 0; i < incoming.length; ++i) {
							merged[offset + i] = incoming[i]
						}
						return merged
					},
				},
			},
		},
	},
})
