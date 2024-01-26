import { ReactNode } from "react"
import Bug from "../../assets/svg/Bug.svg"
import Dark from "../../assets/svg/Dark.svg"
import Dragon from "../../assets/svg/Dragon.svg"
import Electric from "../../assets/svg/Electric.svg"
import Fairy from "../../assets/svg/Fairy.svg"
import Fight from "../../assets/svg/Fight.svg"
import Fire from "../../assets/svg/Fire.svg"
import Flying from "../../assets/svg/Flying.svg"
import Ghost from "../../assets/svg/Ghost.svg"
import Grass from "../../assets/svg/Grass.svg"
import Ground from "../../assets/svg/Ground.svg"
import Ice from "../../assets/svg/Ice.svg"
import Normal from "../../assets/svg/Normal.svg"
import Poison from "../../assets/svg/Poison.svg"
import Psychic from "../../assets/svg/Psychic.svg"
import Rock from "../../assets/svg/Rock.svg"
import Steel from "../../assets/svg/Steel.svg"
import Water from "../../assets/svg/Water.svg"
import { SvgProps } from "react-native-svg"

type PokemonType =
	| "bug"
	| "dark"
	| "dragon"
	| "electric"
	| "fairy"
	| "fight"
	| "fire"
	| "flying"
	| "ghost"
	| "grass"
	| "ground"
	| "ice"
	| "normal"
	| "poison"
	| "psychic"
	| "rock"
	| "steel"
	| "water"

interface PokemonTypeProps extends SvgProps {
	name: PokemonType
}

export const PokemonType = ({ name }: PokemonTypeProps) => {
	const selectedPokemon = {
		bug: <Bug width="100" height="50" />,
		dark: <Dark width="100" height="50" />,
		dragon: <Dragon width="100" height="50" />,
		electric: <Electric width="100" height="50" />,
		fairy: <Fairy width="100" height="50" />,
		fight: <Fight width="100" height="50" />,
		fire: <Fire width="100" height="50" />,
		flying: <Flying width="100" height="50" />,
		ghost: <Ghost width="100" height="50" />,
		grass: <Grass width="100" height="50" />,
		ground: <Ground width="100" height="50" />,
		ice: <Ice width="100" height="50" />,
		normal: <Normal width="100" height="50" />,
		poison: <Poison width="100" height="50" />,
		psychic: <Psychic width="100" height="50" />,
		rock: <Rock width="100" height="50" />,
		steel: <Steel width="100" height="50" />,
		water: <Water width="100" height="50" />,
	} as Record<PokemonType, ReactNode>

	return <>{selectedPokemon[name]}</>
}
