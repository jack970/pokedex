import CasoDeUso from "../CasoDeUso";
import { IPokemon } from "../interfaces/pokemon.interface";
import PokemonRepositorio from "../repositorio/PokemonRepositorio";

export default class PegarPokemonService implements CasoDeUso<string | number, IPokemon> {
    constructor(
        private readonly repositorio: PokemonRepositorio
    ) { }
    async executar(entrada: string | number): Promise<IPokemon> {
        const pokemon = await this.repositorio.pegarPorId(entrada)
        return pokemon
    }
}