import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { connectToDevTools } from "react-devtools-core";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"]
	color: string
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
	const colorScheme = useColorScheme()

	// if (__DEV__) {
	// 	connectToDevTools({
	// 		host: "localhost",
	// 		port: 8081,
	// 	});
	// }

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Pokemons",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="dog" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="configuration"
				options={{
					title: "Configurações",
					tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
				}}
			/>
		</Tabs>
	)
}
