import { IPokemon } from "@/app/interfaces/pokemon.interface"
import style from './style.module.css'
import Image from "next/image"
import { MdCatchingPokemon } from "react-icons/md"
import Link from "next/link"
import icons from "../Icons"

interface PokemonListProps {
    pokemons: IPokemon[]
}

interface PokemonCardProps {
    pokemon: IPokemon
}


const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const firstTypePokemon = pokemon.types[0].type.name
    const typeForBg = icons.find(icon => icon.nome === firstTypePokemon)

    return (
        <Link
            key={pokemon.id}
            href={`pokemon/${pokemon.name}`}
            className={style.cardWrapper}
            style={{ backgroundColor: typeForBg?.background }}>
            <div className={style.cardContent}>
                <span className={style.cardId}># {pokemon.id}</span>
                <span className={style.cardTitle}>{pokemon.name}</span>
                <div className={style.cardTypes}>
                    {pokemon.types.map(value => {
                        const { name } = value.type
                        const type = icons.find(icon => icon.nome === name)
                        return (
                            <div key={value.slot} className={style.cardType} style={{ backgroundColor: type?.color }}>
                                {type?.icon}
                                <span >{name}</span>
                            </div>
                        )
                    })}
                </div>
                <MdCatchingPokemon size={170} opacity={.3} color="white" />
            </div>
            <div className={style.cardImage}>
                <Image
                    src={
                        pokemon.sprites.other["official-artwork"].front_default ||
                        pokemon.sprites.front_default
                    }
                    objectFit="cover"
                    alt="Pokemon"
                    fill
                    priority
                />
            </div>
        </Link>
    )
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
    return (
        <div className={style.wrapper}>
            {pokemons.map(pokemon => {
                return (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                )
            })}
        </div>
    )
}

export default PokemonList