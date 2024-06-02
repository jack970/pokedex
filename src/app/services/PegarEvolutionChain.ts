import CasoDeUso from "../CasoDeUso";
import { IEvolutionChain } from "../interfaces/evolution.interface";
import PokemonRepositorio from "../repositorio/PokemonRepositorio";

export default class PegarEvolutionChain implements CasoDeUso<string, IEvolutionChain> {
    constructor(
        private readonly repositorio: PokemonRepositorio = new PokemonRepositorio()
    ) { }
    async executar(entrada: string): Promise<IEvolutionChain> {
        const [url] = entrada.split("/").slice(-2)
        const pokemon = await this.repositorio.pegarEvolutionChain(url)
        return pokemon
    }
}