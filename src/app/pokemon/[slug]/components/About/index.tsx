'use client'

import { IPokemon } from '@/app/interfaces/pokemon.interface'
import style from './style.module.css'
import useTipoEspecie from '@/app/hooks/useTipoEspecie';
import { DoubleDamage } from '@/app/interfaces/tipo.interface';
import icons from '@/app/components/Icons';

interface AboutProps {
    pokemon: IPokemon;
}

interface WeaknessProps {
    weakness: DoubleDamage;
}

function Weaknesses({ weakness }: WeaknessProps) {
    const icon = icons.find(icone => icone.nome === weakness.name)
    return (
        <p className={style.weakness} style={{ backgroundColor: icon?.color }}>
            {icon?.icon}
        </p>
    )
}

export default function About({ pokemon }: AboutProps) {
    const { weakness, especies } = useTipoEspecie(pokemon)

    const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)
    const removeHifen = (value: string) => value.replaceAll("-", " ")

    return (
        <section className={style.wrapper}>
            <div className={style.content}>
                <div className={style.pokedata}>
                    <h3 className={style.title}>Pokédex Data</h3>
                    <ul className={style.wrapperList}>
                        <li className={style.listItem}>
                            <strong>Species</strong>
                            <span>{capitalize(pokemon.species.name)}</span>
                        </li>
                        <li className={style.listItem}>
                            <strong>Height</strong>
                            <span>{pokemon.height} m</span>
                        </li>
                        <li className={style.listItem}>
                            <strong>Weight</strong>
                            <span>{pokemon.weight} Kg</span>
                        </li>
                        <li className={style.listItem}>
                            <strong>Habilities</strong>
                            {pokemon.abilities && pokemon.abilities.map(
                                ({ ability }) => capitalize(removeHifen(ability.name))).join(', ')}
                        </li>
                        <li className={style.listItem}>
                            <strong>Weaknesses</strong>
                            {weakness && weakness.map(weak => <Weaknesses key={weak.name} weakness={weak} />)}
                        </li>
                    </ul>
                </div>
                {
                    especies &&
                    <div className={style.training}>
                        <h3 className={style.title}>Training</h3>
                        <ul className={style.wrapperList}>
                            <li className={style.listItem}>
                                <strong>Catch Rate</strong>
                                <span>{especies.capture_rate}</span>
                            </li>


                            <li className={style.listItem}>
                                <strong>Base Friendship</strong>
                                <span>{especies.base_happiness}</span>
                            </li>

                            <li className={style.listItem}>
                                <strong>Growth Rate</strong>
                                <span>{removeHifen(especies.growth_rate.name)}</span>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </section>
    )
}