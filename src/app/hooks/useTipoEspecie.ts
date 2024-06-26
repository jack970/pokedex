import { useCallback, useEffect, useState } from "react"
import { IPokemon } from "../interfaces/pokemon.interface"
import PegarEspecieService from "../services/PegarEspecie"
import PegarTipoService from "../services/PegarTipo"
import ITipo, { DoubleDamage } from "../interfaces/tipo.interface"
import IEspecie from "../interfaces/especie.interface"


const useTipoEspecie = (pokemon: IPokemon) => {
    const [especies, setEspecies] = useState<IEspecie>()
    const [weakness, setWeakness] = useState<DoubleDamage[]>()

    const fetchPokemon = useCallback(async (pokemon: IPokemon) => {
        const pegarEspecie = new PegarEspecieService()
        const pegarTipo = new PegarTipoService()

        const especie: IEspecie = await pegarEspecie.executar(pokemon.species.url)
        const tipo: ITipo = await pegarTipo.executar(pokemon.types[0].type.url)

        setEspecies(especie)
        setWeakness(tipo.damage_relations.double_damage_from)
    }, [])

    useEffect(() => {
        fetchPokemon(pokemon)
    }, [pokemon, fetchPokemon])

    return {
        especies,
        weakness
    }
}

export default useTipoEspecie