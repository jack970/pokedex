import { useEffect, useState } from "react"
import { IPokemon } from "../interfaces/pokemon.interface"
import PokemonRepositorio from "../repositorio/PokemonRepositorio"
import PegarEspecieService from "../services/PegarEspecie"
import PegarTipoService from "../services/PegarTipo"
import ITipo, { DoubleDamage } from "../interfaces/tipo.interface"
import IEspecie from "../interfaces/especie.interface"


const useTipoEspecie = (pokemon: IPokemon) => {
    const [especies, setEspecies] = useState<IEspecie>()
    const [weakness, setWeakness] = useState<DoubleDamage[]>()

    useEffect(() => {
        fetchPokemon(pokemon)
    }, [])

    async function fetchPokemon(pokemon: IPokemon) {
        const repositorio = new PokemonRepositorio()

        const pegarEspecie = new PegarEspecieService(repositorio)
        const pegarTipo = new PegarTipoService(repositorio)

        const especie: IEspecie = await pegarEspecie.executar(pokemon.species.url)
        const tipo: ITipo = await pegarTipo.executar(pokemon.types[0].type.url)

        setEspecies(especie)
        setWeakness(tipo.damage_relations.double_damage_from)
    }

    return {
        especies,
        weakness
    }
}

export default useTipoEspecie