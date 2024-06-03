'use client'

import Header from "./components/Header";
import usePokemonList from "./hooks/usePokemonList";
import PokemonList from "@/components/PokemonList";
import style from './page.module.css'
import { useState } from "react";
import { MdCatchingPokemon } from "react-icons/md";

export default function Home() {
  const [search, setSearch] = useState<string>("")
  const { pokemons, hasMorePokemon, fetchNextPage } = usePokemonList(search)

  return (
    <>
      <Header value={search} handleChange={setSearch} />
      <div className={style.main}>
        <MdCatchingPokemon color="#F7F7F7" />
        <h1>Home</h1>
        <PokemonList pokemons={pokemons} />
        {hasMorePokemon ? (
          <button onClick={fetchNextPage}>Carregar Pokemon</button>
        ) : null}
      </div>
    </>
  );
}
