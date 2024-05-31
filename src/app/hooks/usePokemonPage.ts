import { useEffect, useState } from "react"
import icons from "../components/Icons"
import { IPokemon } from "../interfaces/pokemon.interface"
import PokemonRepositorio from "../repositorio/PokemonRepositorio"
import PegarPokemonService from "../services/PegarPokemon"

const usePokemonPage = (slugPokemon: string) => {
    const [pokemon, setPokemon] = useState<IPokemon>()
    const [background, setBackground] = useState<string>("")
    const [color, setColor] = useState<string>("")

    useEffect(() => {
        fetchPokemon(slugPokemon)
    }, [])

    const fetchPokemon = async (name: string) => {
        const repositorio = new PokemonRepositorio()
        const pegaPokemon = new PegarPokemonService(repositorio)
        const responsePokemon = await pegaPokemon.executar(name);
        const { weight, height } = responsePokemon
        setPokemon({
            ...responsePokemon,
            weight: weight / 10,
            height: height / 10

        })
        pegaColor(responsePokemon)
    }

    const pegaColor = (pokemon: IPokemon) => {
        const { name } = pokemon.types[0].type
        const type = icons.find(icon => icon.nome === name)
        if (type) {
            const { background, color } = type
            setBackground(background)
            setColor(color)
        }
    }

    return {
        pokemon,
        background,
        color
    }
}

export default usePokemonPage