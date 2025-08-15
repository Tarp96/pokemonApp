import { useState, useEffect } from "react";
import { fetchPokemonDetails } from "../utils/pokeApi";
import { useParams } from "react-router-dom";
import { firstLetterUpperCase } from "./../utils/helperFunctions";

export const PokemonDetailsPage = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonDetails(name);
        setPokemon(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonDetails();
  }, [name]);

  const abilities = pokemon.abilities?.map((a) => (
    <p key={a.ability.name}>{firstLetterUpperCase(a.ability.name)}</p>
  ));

  const types = pokemon.types?.map((type) => (
    <span key={type.type.name}>{firstLetterUpperCase(type.type.name)}</span>
  ));

  const stats = pokemon.stats?.map((stat) => (
    <p>{`${firstLetterUpperCase(stat.stat.name)} : ${stat.base_stat}`}</p>
  ));

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="detailsPageContainer">
      <div className="detailsPageHeader">
        <h1 className="detailsPageTitle">
          {pokemon.name && firstLetterUpperCase(pokemon.name)} #{pokemon.id}
        </h1>
      </div>
      <div className="detailsTopSection">
        <div className="mainImageContainer">
          {pokemon.sprites?.other["official-artwork"]?.front_default && (
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt="Official artwork"
              className="mainDetailImage"
            />
          )}
        </div>
        <div className="statsContainer">{stats}</div>
      </div>

      <div className="detailsMiddleSection">
        <div className="abilitiesContainer">
          <h2>Abilities</h2>
          {abilities}
        </div>
        <div className="typesContainer">
          <h2>Types</h2>
          {types}
        </div>
      </div>
      <div className="spritesSection">
        {pokemon.sprites?.front_default && (
          <img src={pokemon.sprites.front_default} alt="Front default sprite" />
        )}
        {pokemon.sprites?.back_default && (
          <img src={pokemon.sprites.back_default} alt="Back default sprite" />
        )}
        {pokemon.sprites?.front_shiny && (
          <img src={pokemon.sprites.front_shiny} alt="Front shiny sprite" />
        )}
        {pokemon.sprites?.back_shiny && (
          <img src={pokemon.sprites.back_shiny} alt="Back shiny sprite" />
        )}
      </div>
    </div>
  );
};
