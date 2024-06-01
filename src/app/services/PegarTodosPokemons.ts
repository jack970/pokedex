import { CasoDeUsoPegarTodosPokemons } from "../CasoDeUso";
import { IndexedPokemon, IPokemon } from "../interfaces/pokemon.interface";
import PokemonRepositorio from "../repositorio/PokemonRepositorio";

interface IPegarTodosPokemons {
    listaPokemons: IPokemon[],
    next: string | null
}

export default class PegarTodosPokemonsService implements CasoDeUsoPegarTodosPokemons<string, IPegarTodosPokemons> {
    constructor(private readonly repositorio: PokemonRepositorio) { }

    async pegaPokemonPorId(idName: number | string): Promise<IPokemon> {
        const pokemon = await this.repositorio.pegarPorId(idName)
        return pokemon
    }

    async indexedPokemonToList(indexedPokemon: IndexedPokemon): Promise<IPokemon> {
        const [id] = indexedPokemon.url.split('/').slice(-2).map(Number)

        const retornaPokemonId = await this.pegaPokemonPorId(id)

        const listPokemon: IPokemon = {
            ...indexedPokemon,
            ...retornaPokemonId,
            id: id
        }

        return listPokemon
    }

    async executar(url: string): Promise<IPegarTodosPokemons> {
        const response = await this.repositorio.pegarTodos(url)

        const { next, results } = response

        const listaPokemons = await Promise.all(
            results.map(async (pokemon) => await this.indexedPokemonToList(pokemon))
        )

        return { listaPokemons, next }
    }
}