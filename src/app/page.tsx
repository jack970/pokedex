'use client'

import Header from "./components/Header";
import usePokemonList from "./hooks/usePokemonList";
import PokemonList from "@/components/PokemonList";
import style from './page.module.css'

export default function Home() {
  const {
    pokemons,
    fetchNextPage,
    hasMorePokemon,
    search,
    setSearch } = usePokemonList()

  return (
    <>
      <Header value={search} handleChange={setSearch} />
      <div className={style.main}>
        <PokemonList pokemons={pokemons} />
        {hasMorePokemon ? (
          <button onClick={fetchNextPage}>Carregar Pokemon</button>
        ) : null}
      </div>
    </>
  );
}
