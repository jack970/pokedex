import { AxiosError, AxiosInstance } from "axios";
import apiClient from "./api";
import { PokemonListResponse, IPokemon } from "../interfaces/pokemon.interface";
import ITipo from "../interfaces/tipo.interface";
import IEspecie from "../interfaces/especie.interface";
import { IEvolutionChain } from "../interfaces/evolution.interface";

interface IPokemonRepositorio {
    pegarPorId(idName: number | string): Promise<IPokemon>;
    pegarTodos(url: string): Promise<PokemonListResponse>;
    pegarTipo(idName: number | string): Promise<ITipo>;
    pegarEspecie(idName: number | string): Promise<IEspecie>;
    pegarEvolutionChain(idEvolution: string | number): Promise<IEvolutionChain>;
}

export default class PokemonRepositorio implements IPokemonRepositorio {
    private readonly api: AxiosInstance
    constructor() {
        this.api = apiClient
    }

    async pegarPorId(idName: number | string): Promise<IPokemon> {
        try {
            const { data } = await this.api.get(`/pokemon/${idName}`)
            return data

        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                throw new Error('Pokemon not found');
            } else {
                throw error;
            }
        }
    }

    async pegarTodos(url: string): Promise<PokemonListResponse> {
        try {
            const { data } = await this.api.get(url)
            return data
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                throw new Error('Pokemon List not found');
            } else {
                throw error;
            }
        }
    }

    async pegarTipo(idType: string | number): Promise<ITipo> {
        const { data } = await this.api.get(`/type/${idType}`)
        return data
    }

    async pegarEspecie(idSpecie: string | number): Promise<IEspecie> {
        const { data } = await this.api.get(`/pokemon-species/${idSpecie}`)
        return data
    }

    async pegarEvolutionChain(idEvolution: string | number): Promise<IEvolutionChain> {
        const { data } = await this.api.get(`/evolution-chain/${idEvolution}`)
        return data
    }
} 