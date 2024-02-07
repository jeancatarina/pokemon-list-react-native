import { Slot, Stack, useLocalSearchParams } from 'expo-router';

export default function PokemonLayout() {
	const params = useLocalSearchParams();

	return (
		<>
			<Stack.Screen
				options={{
					title: `Pokemon: ${params.id as string}`,
				}}
			/>
			<Slot />
		</>
	);
}