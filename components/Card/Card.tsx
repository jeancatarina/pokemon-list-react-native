import { FC } from "react";
import {
	TouchableOpacity,
	TouchableOpacityProps
} from "react-native";
import Animated, { Easing, FadeIn, FlipInYLeft, FadeOut, FadeOutRight } from 'react-native-reanimated';
import { Box } from "theme/theme";

interface CardProps extends TouchableOpacityProps {
	children: React.ReactNode
}

export const Card: FC<CardProps> = ({ children, onPress }) => {
	FlipInYLeft.delay(500).duration(3500);

	return (
		<Animated.View entering={FlipInYLeft} exiting={FadeOutRight} ><TouchableOpacity onPress={onPress}>
			<Box
				padding="m"
				backgroundColor="primaryCardBackground"
				flexGrow={1}
				borderRadius={10}
				borderWidth={1}
				marginBottom="s"
			>
				{children}
			</Box></TouchableOpacity></Animated.View>
	)
}