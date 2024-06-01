import { IPokemon, IndexedPokemon } from "./interfaces/pokemon.interface"

export default interface CasoDeUso<E, S> {
    executar(entrada: E): Promise<S>
}

export interface CasoDeUsoPegarTodosPokemons<E, S> {
    executar(entrada: E): Promise<S>,
    pegaPokemonPorId(idName: number | string): Promise<IPokemon>,
    indexedPokemonToList(indexedPokemon: IndexedPokemon): Promise<IPokemon>
}