import { FC, ReactNode } from "react"
import { Box } from "theme/theme"

type ContainerProps = {
	children: ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => {
	return (
		<Box
			backgroundColor="mainBackground"
			flex={1}
			flexGrow={1}
			alignItems="center"
			justifyContent="center"
			paddingLeft="g"
			paddingRight="g"
			paddingTop="m"
		>
			<Box flexGrow={1} width={"100%"} backgroundColor="mainBackground">
				{children}
			</Box>
		</Box>
	)
}