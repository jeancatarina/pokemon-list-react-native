import {
	ApolloClient,
} from "@apollo/client";
import { cache } from "./Cache";

export const client = new ApolloClient({
	uri: process.env.EXPO_PUBLIC_POKEMON_URL,
	cache: cache,
})
