import { ReactElement } from "react"
import { GiFairy, GiFluffyWing, GiGrass, GiGroundSprout, GiHighGrass, GiMetalBar, GiMoon, GiPoison, GiPunchBlast, GiSpikedDragonHead, GiStoneStack } from "react-icons/gi"
import { FaBug, FaFire, FaGhost, FaLeaf, FaRegSnowflake, FaWater } from "react-icons/fa"
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
        color: '#FD7D24',
        background: '#FFA756'
    },
    {
        nome: 'poison',
        icon: <GiPoison />,
        color: '#9141CB',
        background: '#a05fcf'
    },
    {
        nome: 'grass',
        icon: <FaLeaf />,
        color: '#5aa749',
        background: '#83d881'
    },
    {
        nome: 'water',
        icon: <IoIosWater />,
        color: '#2980EF',
        background: '#58ABF6'
    }, {
        nome: 'flying',
        icon: <GiFluffyWing />,
        color: '#81B9EF',
        background: '#81B9EF'
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
        background: '#b9c465'
    },
    {
        nome: 'ground',
        icon: <GiGroundSprout />,
        color: '#915121',
        background: '#ac7953'
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
        background: '#e96e95'
    },
    {
        nome: 'fighting',
        icon: <GiPunchBlast />,
        color: '#FF8000',
        background: '#f5a04b'
    }, {
        nome: 'steel',
        icon: <GiMetalBar />,
        color: '#60A1B8',
        background: '#8dabb6'
    }, {
        nome: 'rock',
        icon: <GiStoneStack />,
        color: '#9e933e',
        background: '#AAA57F'
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
        background: '#6e7cac'
    },
    {
        nome: 'dragon',
        icon: <GiSpikedDragonHead />,
        color: '#0F6AC0',
        background: '#8571BE'
    },
    {
        nome: 'ice',
        icon: <FaRegSnowflake />,
        color: '#527da5',
        background: '#327099'
    },
]

export default icons