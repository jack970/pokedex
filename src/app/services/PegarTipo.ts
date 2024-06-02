import CasoDeUso from "../CasoDeUso";
import ITipo from "../interfaces/tipo.interface";
import PokemonRepositorio from "../repositorio/PokemonRepositorio";

export default class PegarTipoService implements CasoDeUso<string, ITipo> {
    constructor(
        private readonly repositorio: PokemonRepositorio = new PokemonRepositorio()
    ) { }
    async executar(entrada: string): Promise<ITipo> {
        const [url] = entrada.split("/").slice(-2)
        const pokemon = await this.repositorio.pegarTipo(url)
        return pokemon
    }
}