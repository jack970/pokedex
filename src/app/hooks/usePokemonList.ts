import { useCallback, useEffect, useState } from "react"
import PegarTodosPokemonsService from "../services/PegarTodosPokemons"
import PokemonRepositorio from "../repositorio/PokemonRepositorio"
import { IPokemon } from "../interfaces/pokemon.interface"

const usePokemonList = (pokemonSearch: string) => {
    const [pokemons, setPokemons] = useState<IPokemon[]>([])
    const [nextUrl, setNextUrl] = useState<string>("/pokemon")


    async function mainFetch(url: string) {
        const pokemonRepositorio = new PokemonRepositorio()
        const pegarPokemonsLista = new PegarTodosPokemonsService(pokemonRepositorio)
        const { listaPokemons, next } = await pegarPokemonsLista.executar(url)
        return { listaPokemons, next }
    }

    const fetchPokemonsDefault = useCallback(async () => {
        const { listaPokemons } = await mainFetch("/pokemon?limit=9")

        setPokemons(listaPokemons)
    }, [])

    const handleSearchPokemons = useCallback(async () => {
        const { listaPokemons } = await mainFetch(`/pokemon?limit=750`)

        const pokemonsSearch = listaPokemons.filter(
            ({ name }: IPokemon) => name.includes(pokemonSearch.toLowerCase()),
        );

        setPokemons(pokemonsSearch);
    }, [pokemonSearch]);

    useEffect(() => {
        const isSearch = pokemonSearch.length > 2

        if (isSearch) {
            handleSearchPokemons()
        }
        else {
            fetchPokemonsDefault()
        }
    }, [pokemonSearch, handleSearchPokemons, fetchPokemonsDefault])


    const handlePagination = useCallback(async () => {
        const { listaPokemons, next } = await mainFetch(nextUrl)

        if (next) {
            setNextUrl(next)
            setPokemons([...pokemons, ...listaPokemons])
        }

    }, [pokemons, nextUrl])

    return {
        pokemons,
        fetchNextPage: handlePagination,
        hasMorePokemon: !!nextUrl
    }
}

export default usePokemonList