import { useCallback, useEffect, useState } from "react"
import icons from "../components/Icons"
import { IPokemon } from "../interfaces/pokemon.interface"
import PegarPokemonService from "../services/PegarPokemon"

const usePokemonPage = (slugPokemon: string) => {
    const [pokemon, setPokemon] = useState<IPokemon | null>()
    const [background, setBackground] = useState<string>("")
    const [color, setColor] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const fetchPokemon = useCallback(async (name: string) => {
        try {
            const pegaPokemon = new PegarPokemonService()
            const responsePokemon = await pegaPokemon.executar(name);
            const { weight, height } = responsePokemon
            setPokemon({
                ...responsePokemon,
                weight: weight / 10,
                height: height / 10

            })
            pegaColor(responsePokemon)

        } catch (error) {
            if (error instanceof Error && error.message === 'Pokemon not found') {
                setError('404: Pokemon not found');
            } else {
                setError('An unexpected error occurred');
            }
            setPokemon(null);
        }

    }, [])

    useEffect(() => {
        fetchPokemon(slugPokemon)
    }, [fetchPokemon, slugPokemon])

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
        color,
        error
    }
}

export default usePokemonPage