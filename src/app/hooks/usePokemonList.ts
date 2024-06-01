import { useCallback, useEffect, useState } from "react"
import PegarTodosPokemonsService from "../services/PegarTodosPokemons"
import PokemonRepositorio from "../repositorio/PokemonRepositorio"
import { IPokemon } from "../interfaces/pokemon.interface"
import PegarPokemonService from "../services/PegarPokemon"

const usePokemonList = (pokemonSearch: string) => {
    const [pokemons, setPokemons] = useState<IPokemon[]>([])
    const [nextUrl, setNextUrl] = useState<string>("/pokemon?offset=9&limit=9")


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

    const fetchSearchPokemons = useCallback(async () => {
        const pokemonRepositorio = new PokemonRepositorio()
        const pegarPokemonService = new PegarTodosPokemonsService(pokemonRepositorio)

        const { results } = await pokemonRepositorio.pegarTodos(`/pokemon?limit=750`)
        const pokemonsFilteredName = results.filter(
            ({ name }) => name.includes(pokemonSearch.toLowerCase()),
        );

        const listaPokemons = await Promise.all(
            pokemonsFilteredName.map(async (pokemon) => await pegarPokemonService.indexedPokemonToList(pokemon))
        )

        setPokemons(listaPokemons)

    }, [pokemonSearch]);

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