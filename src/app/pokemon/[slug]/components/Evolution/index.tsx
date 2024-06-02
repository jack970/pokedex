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
            <p>(Level {evolution.level || 'null'})</p>
        </div>
    )
}

export default function Evolution({ pokemon }: EvolutionProps) {
    const { evolution } = usePokemonEvolution(pokemon)

    return (
        <div className={style.wrapper}>
            {evolution ?
                evolution.map((evol, index) => {
                    return (
                        <React.Fragment key={evol.level}>
                            {index !== 0 && (
                                <ArrowRight evolution={evol} />
                            )}
                            <EvolutionCard evolution={evol} />
                        </React.Fragment>
                    )
                }) : <h1>Carregando...</h1>}
        </div>
    )
}