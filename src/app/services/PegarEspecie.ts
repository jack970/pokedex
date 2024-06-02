import CasoDeUso from "../CasoDeUso";
import IEspecie from "../interfaces/especie.interface";
import PokemonRepositorio from "../repositorio/PokemonRepositorio";

export default class PegarEspecieService implements CasoDeUso<string, IEspecie> {
    constructor(
        private readonly repositorio: PokemonRepositorio = new PokemonRepositorio()
    ) { }
    async executar(entrada: string): Promise<IEspecie> {
        const [url] = entrada.split("/").slice(-2)
        const pokemon = await this.repositorio.pegarEspecie(url)
        return pokemon
    }
}