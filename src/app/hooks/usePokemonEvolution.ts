import { useCallback, useEffect, useState } from "react";
import { IPokemon } from "../interfaces/pokemon.interface";
import PokemonRepositorio from "../repositorio/PokemonRepositorio";
import PegarEspecieService from "../services/PegarEspecie";
import PegarEvolutionChain from "../services/PegarEvolutionChain";
import { EvolvesToList, PokemonEvolvsProps } from "../interfaces/evolution.interface";
import PegarPokemonService from "../services/PegarPokemon";
import IEspecie from "../interfaces/especie.interface";

const usePokemonEvolution = (pokemon: IPokemon) => {
    const [especie, setEspecie] = useState<IEspecie>()
    const [evolution, setEvolution] = useState<PokemonEvolvsProps[]>()

    useEffect(() => {
        fetchPokemon(pokemon)
    }, [])

    const handleNameSpecies = useCallback(
        ({
            species,
            evolves_to,
            evolution_details,
        }: EvolvesToList) => {
            let namesPokemons: PokemonEvolvsProps[] = [
                {
                    name: species.name,
                    level: 0,
                },
            ];

            if (evolution_details.length)
                namesPokemons[0].level = evolution_details[0].min_level;

            evolves_to.forEach((evolves: EvolvesToList) => {
                namesPokemons = namesPokemons.concat(handleNameSpecies(evolves));
            });

            return namesPokemons;
        }, []
    )

    async function fetchPokemonId(handleName: PokemonEvolvsProps[], servico: PegarPokemonService) {
        return await Promise.all(handleName.map(async (pokemonEvols: PokemonEvolvsProps): Promise<PokemonEvolvsProps> => {
            const result = await servico.executar(pokemonEvols.name)
            const { id, sprites } = result
            return {
                ...pokemonEvols,
                image: sprites.other["official-artwork"].front_default,
                number: `#${'000'.substr(id.toString().length)}${id}`,
            }
        }
        ))
    }

    async function fetchPokemon(pokemon: IPokemon) {
        const repositorio = new PokemonRepositorio();

        const speciesService = new PegarEspecieService(repositorio)
        const evolutionService = new PegarEvolutionChain(repositorio)
        const pegarPokemonService = new PegarPokemonService(repositorio)

        const resultSpecies = await speciesService.executar(pokemon.species.url)
        const resultEvolution = await evolutionService.executar(resultSpecies.evolution_chain.url)

        const handleName = handleNameSpecies(resultEvolution.chain)
        const pokemonsEvols = await fetchPokemonId(handleName, pegarPokemonService)
        if (pokemonsEvols && resultSpecies) {
            setEspecie(resultSpecies)
            setEvolution(pokemonsEvols)
        }
    }

    return {
        especie,
        evolution
    }
}

export default usePokemonEvolution