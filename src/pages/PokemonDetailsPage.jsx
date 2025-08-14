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

  const abilities = pokemon.abilities?.map((a, index) => (
    <p key={index}>{firstLetterUpperCase(a.ability.name)}</p>
  ));

  const types = pokemon.types?.map((type, index) => (
    <span key={index}>{firstLetterUpperCase(type.type.name)}</span>
  ));

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="detailsPageContainer">
      <h1 className="detailsPageTitle">
        {pokemon.name && firstLetterUpperCase(pokemon.name)}
      </h1>
      <p>{`Pokémon ID: ${pokemon.id}`}</p>
      <div>
        <h2>Abilities:</h2>
        {abilities}
      </div>
      <div>
        <h2>Types: </h2>
        {types}
      </div>
      <div className="pokemonDetailPictureContainer">
        <img
          src={pokemon.sprites?.front_default}
          alt={`Front view of default ${pokemon.name} sprite`}
        />
        <img
          src={pokemon.sprites?.back_default}
          alt={`Back view of default ${pokemon.name} sprite`}
        />
        <img
          src={pokemon.sprites?.front_shiny}
          alt={`Front view of shiny ${pokemon.name} sprite`}
        />
        <img
          src={pokemon.sprites?.back_shiny}
          alt={`Back view of shiny ${pokemon.name} sprite`}
        />
      </div>
    </div>
  );
};
