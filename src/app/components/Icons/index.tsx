import { ReactElement } from "react"
import { GiFairy, GiFluffyWing, GiGrass, GiGroundSprout, GiHighGrass, GiMetalBar, GiMoon, GiPoison, GiPunchBlast, GiSpikedDragonHead, GiStoneStack } from "react-icons/gi"
import { FaBug, FaFire, FaGhost, FaLeaf, FaWater } from "react-icons/fa"
import { IoIosWater } from "react-icons/io";
import { TfiControlRecord } from "react-icons/tfi";
import { SlEnergy } from "react-icons/sl";
import { BsHypnotize } from "react-icons/bs";
import { GrHost } from "react-icons/gr";

interface CardTypeIcon {
    nome: string;
    color: string;
    background: string;
    icon: ReactElement
}


const icons: CardTypeIcon[] = [
    {
        nome: 'fire',
        icon: <FaFire />,
        color: '#ff0000',
        background: '#ff000090'
    },
    {
        nome: 'poison',
        icon: <GiPoison />,
        color: '#9141CB',
        background: '#9141CB90'
    },
    {
        nome: 'grass',
        icon: <FaLeaf />,
        color: '#3FA129',
        background: '#3FA12990'
    },
    {
        nome: 'water',
        icon: <IoIosWater />,
        color: '#2980EF',
        background: '#2980EF90'
    }, {
        nome: 'flying',
        icon: <GiFluffyWing />,
        color: '#81B9EF',
        background: '#81B9EF90'
    },
    {
        nome: 'normal',
        icon: <TfiControlRecord />,
        color: '#9DA0AA',
        background: '#B5B9C4'
    },
    {
        nome: 'bug',
        icon: <FaBug />,
        color: '#91A119',
        background: '#91A11990'
    },
    {
        nome: 'ground',
        icon: <GiGroundSprout />,
        color: '#915121',
        background: '#91512190'
    },
    {
        nome: 'electric',
        icon: <SlEnergy />,
        color: '#FAC000',
        background: '#F2CB55'
    },
    {
        nome: 'fairy',
        icon: <GiFairy />,
        color: '#EF70EF',
        background: '#EBA8C3'
    },
    {
        nome: 'psychic',
        icon: <BsHypnotize />,
        color: '#EF4179',
        background: '#EF417990'
    },
    {
        nome: 'fighting',
        icon: <GiPunchBlast />,
        color: '#FF8000',
        background: '#FF800090'
    }, {
        nome: 'steel',
        icon: <GiMetalBar />,
        color: '#60A1B8',
        background: '#60A1B890'
    }, {
        nome: 'rock',
        icon: <GiStoneStack />,
        color: '#AAA57F',
        background: '#AAA57F90'
    },
    {
        nome: 'dark',
        icon: <GiMoon />,
        color: '#58575F',
        background: '#6F6E78'
    },
    {
        nome: 'ghost',
        icon: <FaGhost />,
        color: '#556AAE',
        background: '#8571BE'
    },
    {
        nome: 'dragon',
        icon: <GiSpikedDragonHead />,
        color: '#0F6AC0',
        background: '#8571BE'
    },
]

export default icons