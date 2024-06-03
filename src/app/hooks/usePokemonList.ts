import { useCallback, useEffect, useState } from "react"
import PegarTodosPokemonsService from "../services/PegarTodosPokemons"
import PokemonRepositorio from "../repositorio/PokemonRepositorio"
import { IPokemon, IndexedPokemon } from "../interfaces/pokemon.interface"

const usePokemonList = (pokemonSearch: string) => {
    const [pokemons, setPokemons] = useState<IPokemon[]>([])
    const [nextUrl, setNextUrl] = useState<string>("/pokemon?offset=9&limit=9")


    async function mainFetch(url: string) {
        const pegarPokemonsLista = new PegarTodosPokemonsService()
        const { listaPokemons, next } = await pegarPokemonsLista.executar(url)
        return { listaPokemons, next }
    }

    const fetchPokemonsDefault = useCallback(async () => {
        const { listaPokemons } = await mainFetch("/pokemon?limit=9")

        setPokemons(listaPokemons)
    }, [])


    const saveLocalStorage = async () => {
        const dataStorage = localStorage.getItem("pokemons")
        if (!dataStorage) {
            const pokemonRepositorio = new PokemonRepositorio()

            const { results } = await pokemonRepositorio.pegarTodos(`/pokemon?limit=1302`)
            localStorage.setItem("pokemons", JSON.stringify(results))
        }
    }

    const getLocalStorage = useCallback(async (): Promise<IndexedPokemon[]> => {
        await saveLocalStorage()
        const getPokemons = localStorage.getItem("pokemons")
        return getPokemons ? JSON.parse(getPokemons) : []
    }, [])

    const fetchSearchPokemons = useCallback(async () => {
        const dataStorage = await getLocalStorage()

        const pokemonsFilteredName = dataStorage.filter(
            ({ name }) => name.includes(pokemonSearch.toLowerCase()),
        ).slice(0, 9);

        const pegarPokemonService = new PegarTodosPokemonsService()
        const listaPokemons = await Promise.all(
            pokemonsFilteredName.map(async (pokemon) =>
                await pegarPokemonService.indexedPokemonToList(pokemon))
        )

        setPokemons(listaPokemons)

    }, [pokemonSearch, getLocalStorage]);

    const handlePagination = useCallback(async () => {
        const { listaPokemons, next } = await mainFetch(nextUrl)

        if (next) {
            setNextUrl(next)
            setPokemons([...pokemons, ...listaPokemons])
        }

    }, [pokemons, nextUrl])


    useEffect(() => {
        const isSearch = pokemonSearch.length >= 2

        if (isSearch) {
            fetchSearchPokemons()
        }
        else {
            fetchPokemonsDefault()
        }
    }, [pokemonSearch, fetchSearchPokemons, fetchPokemonsDefault])


    return {
        pokemons,
        fetchNextPage: handlePagination,
        hasMorePokemon: !!nextUrl
    }
}

export default usePokemonList