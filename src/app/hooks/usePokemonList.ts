import { useCallback, useEffect, useState } from "react"
import PegarTodosPokemonsService from "../services/PegarTodosPokemons"
import PokemonRepositorio from "../repositorio/PokemonRepositorio"
import { IPokemon, IndexedPokemon } from "../interfaces/pokemon.interface"

const usePokemonList = () => {
    const [pokemons, setPokemons] = useState<IPokemon[]>([])
    const [nextUrl, setNextUrl] = useState<string>("/pokemon?offset=9&limit=9")
    const [search, setSearch] = useState<string>(() => {
        if (typeof window === 'undefined') {
            return "";
        }
        try {
            const value = window.localStorage.getItem("search") || ""
            return value
        } catch (error) {
            return ""
        }
    })


    async function mainFetch(url: string) {
        const pegarPokemonsLista = new PegarTodosPokemonsService()
        const { listaPokemons, next } = await pegarPokemonsLista.executar(url)
        return { listaPokemons, next }
    }

    const fetchPokemonsDefault = useCallback(async () => {
        const { listaPokemons } = await mainFetch("/pokemon?limit=9")

        setPokemons(listaPokemons)
    }, [])


    const saveListPokemonLocalStorage = async () => {
        const dataStorage = localStorage.getItem("pokemons")
        if (!dataStorage) {
            const pokemonRepositorio = new PokemonRepositorio()

            const { results } = await pokemonRepositorio.pegarTodos(`/pokemon?limit=1302`)
            localStorage.setItem("pokemons", JSON.stringify(results))
        }
    }

    const getListPokemonLocalStorage = useCallback(async (): Promise<IndexedPokemon[]> => {
        await saveListPokemonLocalStorage()
        const getPokemons = localStorage.getItem("pokemons")
        return getPokemons ? JSON.parse(getPokemons) : []
    }, [])

    const fetchSearchPokemons = useCallback(async () => {
        const dataStorage = await getListPokemonLocalStorage()

        const pokemonsFilteredName = dataStorage.filter(
            ({ name }) => {
                const searchFormatted = search.toLowerCase().trim()
                return name.replaceAll("-", " ").includes(searchFormatted)
            },
        ).slice(0, 9);

        const pegarPokemonService = new PegarTodosPokemonsService()
        const listaPokemons = await Promise.all(
            pokemonsFilteredName.map(async (pokemon) =>
                await pegarPokemonService.indexedPokemonToList(pokemon))
        )

        setPokemons(listaPokemons)

    }, [search, getListPokemonLocalStorage]);

    const handlePagination = useCallback(async () => {
        const { listaPokemons, next } = await mainFetch(nextUrl)

        if (next) {
            setNextUrl(next)
            setPokemons([...pokemons, ...listaPokemons])
        }

    }, [pokemons, nextUrl])


    useEffect(() => {
        localStorage.setItem("search", search)
        const isSearch = search.length >= 2
        if (isSearch) {
            fetchSearchPokemons()
        }
        else {
            fetchPokemonsDefault()
        }
    }, [search, fetchSearchPokemons, fetchPokemonsDefault])


    return {
        pokemons,
        fetchNextPage: handlePagination,
        hasMorePokemon: !!nextUrl,
        search,
        setSearch
    }
}

export default usePokemonList