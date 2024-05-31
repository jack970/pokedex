'use client'

import Header from "./components/Header";
import usePokemonList from "./hooks/usePokemonList";
import PokemonList from "@/components/PokemonList";
import style from './page.module.css'
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>("")
  const { pokemons, hasMorePokemon, fetchNextPage } = usePokemonList(search)

  return (
    <>
      <Header value={search} handleChange={setSearch} />
      <div className={style.main}>
        <h1>Home</h1>
        <PokemonList pokemons={pokemons} />
        {hasMorePokemon ? (
          <button onClick={fetchNextPage}>Carregar Pokemon</button>
        ) : null}
      </div>
    </>
  );
}
