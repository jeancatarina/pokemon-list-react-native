import { createBox, createText, createTheme } from "@shopify/restyle"

export const palette = {
	green: "#AFC8AD",
	darkGreen: "#618264",
	white: "#FFF",
	black: "#000000",
	darkGray: "#333",
	lightGray: "#EEE",
}

export const theme = createTheme({
	spacing: {
		s: 8,
		m: 16,
		g: 22,
	},
	colors: {
		mainBackground: palette.lightGray,
		mainForeground: palette.black,
		primaryCardBackground: palette.green,
		secondaryCardBackground: palette.white,
		primaryCardText: palette.black,
		secondaryCardText: palette.black,
	},
	textVariants: {
		defaults: {},
		body: {
			fontSize: 16,
			lineHeight: 24,
			color: "mainForeground",
		},
	},
	cardVariants: {
		defaults: {},
		primary: {
			backgroundColor: "primaryCardBackground",
			shadowOpacity: 0.3,
		},
		secondary: {
			backgroundColor: "secondaryCardBackground",
			shadowOpacity: 0.1,
		},
	},
})

export const darkTheme: Theme = {
	...theme,
	colors: {
		...theme.colors,
		mainBackground: palette.black,
		mainForeground: palette.white,
		primaryCardBackground: palette.darkGreen,
		secondaryCardBackground: palette.darkGray,
		primaryCardText: palette.white,
		secondaryCardText: palette.white,
	},
}

export type Theme = typeof theme
export default theme

export const Box = createBox<Theme>()
export const Text = createText<Theme>()
