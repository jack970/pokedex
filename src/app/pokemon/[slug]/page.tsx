'use client'

import { IPokemon } from "@/app/interfaces/pokemon.interface";
import { useMemo, useState } from "react";
import style from './style.module.css'
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import About from "./components/About";
import Stats from "./components/Stats";
import icons from "@/app/components/Icons";
import usePokemonPage from "@/app/hooks/usePokemonPage";
import Evolution from "./components/Evolution";
import NotFound from "@/app/[not_found]/page";

interface PokemonPageProps {
    params: {
        slug: string;
    }
}

interface PokemonDetailsProps {
    pokemon: IPokemon;
    color: string
}

const PokemonDetails = ({ pokemon, color }: PokemonDetailsProps) => {
    const options = ["about", "evolution", "stats"]
    const [currentOption, setCurrentOption] = useState<string>("about")
    const onChangeOption = (option: string) => {
        setCurrentOption(option)
    }

    const optionSelected = useMemo(() => {
        switch (currentOption) {
            case 'about':
                return <About pokemon={pokemon} />
            case 'stats':
                return <Stats stats={pokemon.stats} color={color} />
            case 'evolution':
                return <Evolution pokemon={pokemon} />
        }
    }, [currentOption, pokemon, color])

    return (
        <div className={style.wrapperDetails}>
            <div className={style.cardSubDetail}>
                <div className={style.cardImage}>
                    <Image
                        src={
                            pokemon.sprites?.other["official-artwork"].front_default ??
                            pokemon.sprites?.front_default ??
                            "/default.png"
                        }
                        alt="Pokemon"
                        objectFit="cover"
                        fill
                        priority
                    />
                </div>
                <div className={style.cardInfo}>
                    <span className={style.cardId}># {`${pokemon.id}`.padStart(3, "0")}</span>
                    <span className={style.cardTitle}>{pokemon.name.replaceAll("-", " ")}</span>
                    <div className={style.cardTypes}>
                        {pokemon.types.map(value => {
                            const { name } = value.type
                            const type = icons.find(icon => icon.nome === name)
                            return (
                                <div
                                    key={value.slot}
                                    className={style.cardType}
                                    style={{ backgroundColor: type?.color }}
                                >
                                    {type?.icon}
                                    <span >{name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={style.options}>
                {options.map(option =>
                    <div
                        key={option}
                        onClick={() => onChangeOption(option)}
                    >{option}</div>
                )}
            </div>
            <div className={style.info}>
                {optionSelected}
            </div>
        </div>
    )
}

export default function PokemonPage({ params }: PokemonPageProps) {
    const { pokemon, background, color, error } = usePokemonPage(params.slug)

    return (
        <>
            {pokemon && (
                <div className={style.wrapperPage} style={{ backgroundColor: background }}>
                    <Link href="/">
                        <FaChevronLeft size={70} color="white" />
                    </Link>
                    <div className={style.titlePage}>
                        <h1 style={{ color: background }}>{pokemon.name.replaceAll("-", " ")}</h1>
                    </div>
                    <PokemonDetails pokemon={pokemon} color={color} />
                </div>
            )}
            {error && (
                <NotFound />
            )}
        </>
    )
}