import { IPokemonStats } from '@/app/interfaces/pokemon.interface'
import style from './style.module.css'

interface StatsProps {
    stats: IPokemonStats[];
    color: string;
}

function Barra(props: { value: number, color: string }) {
    return (
        <div className={style.barraWrapper}>
            <span style={{ width: `${props.value}%`, backgroundColor: props.color }}></span>
        </div>
    )
}

export default function Stats({ stats, color }: StatsProps) {
    return (
        <section className={style.wrapper}>
            {stats.map(value => {
                const { base_stat, effort, stat } = value
                return (
                    <div key={stat.name} className={style.subWrapper}>
                        <strong>{stat.name}</strong>
                        <span>{base_stat}</span>
                        <Barra value={base_stat > 100 ? 100 : base_stat} color={color} />
                        <span>100</span>
                    </div>
                )
            })}
        </section>
    )
}