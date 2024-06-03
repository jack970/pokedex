import usePokemonEvolution from '@/app/hooks/usePokemonEvolution'
import style from './style.module.css'
import { IPokemon } from '@/app/interfaces/pokemon.interface'
import { PokemonEvolvsProps } from '@/app/interfaces/evolution.interface'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import { FaLongArrowAltRight } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface EvolutionProps {
    pokemon: IPokemon
}

interface EvolutionCardProps {
    evolution: PokemonEvolvsProps
}

function EvolutionCard({ evolution }: EvolutionCardProps) {
    return (
        <div className={style.cardWrapper}>
            <Link href={`/pokemon/${evolution.name}`}>
                <MdOutlineCatchingPokemon opacity={.1} />
                {evolution.image &&
                    <Image
                        src={evolution.image}
                        alt={`Pokemon ${evolution.name}`}
                        width={150}
                        height={150}
                        priority
                    />
                }
            </Link>
            <p>{evolution.number}</p>
            <h4>{evolution.name}</h4>
        </div>
    )
}

function ArrowRight({ evolution }: EvolutionCardProps) {
    return (
        <div>
            <FaLongArrowAltRight size={80} opacity={.1} />
            <p>(Level {evolution.level || 'Vazio'})</p>
        </div>
    )
}

interface EvolutionMapProps {
    evolution: PokemonEvolvsProps[] | undefined;
    error: string | null
}

function EvolutionMap({ evolution, error }: EvolutionMapProps) {
    if (!evolution) {
        return <h1>Carregando...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className={style.wrapper}>
            {evolution.map((evol, index) => {
                return (
                    <React.Fragment key={evol.level}>
                        {index !== 0 && (
                            <ArrowRight evolution={evol} />
                        )}
                        <EvolutionCard evolution={evol} />
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default function Evolution({ pokemon }: EvolutionProps) {
    const { evolution, error } = usePokemonEvolution(pokemon)

    return (
        <div className={style.wrapper}>
            <EvolutionMap evolution={evolution} error={error} />
        </div>
    )
}