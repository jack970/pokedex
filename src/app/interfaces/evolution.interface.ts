export interface EvolvesToList {
    species: {
        name: string;
        url: string;
    };
    evolution_details: [{ min_level: number }];
    evolves_to: EvolvesToList[];
}

export interface IEvolutionChain {
    chain: EvolvesToList
}

export interface PokemonEvolvsProps {
    name: string;
    level: number;
    image?: string;
    number?: string;
}