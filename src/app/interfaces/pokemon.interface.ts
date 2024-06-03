export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IndexedPokemon[];
}

export interface IndexedPokemon {
    name: string;
    url: string;
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    },
    is_hidden: boolean;
    slot: number;
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string
    }
}

export interface PokemonSpecies {
    name: string;
    url: string;
}

export interface IPokemonStats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string
    }
}

export interface IPokemon {
    id: number;
    name: string;
    url: string;
    types: PokemonType[];
    weight: number;
    abilities: PokemonAbility[];
    species: PokemonSpecies;
    height: number;
    stats: IPokemonStats[];
    sprites: {
        front_default: string
        other: {
            "official-artwork": {
                front_default: string | null
            }
        }
    }
}

