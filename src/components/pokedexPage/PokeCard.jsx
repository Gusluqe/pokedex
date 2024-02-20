import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./styles/pokeCard.css";

const PokeCard = ({ url }) => {
  const [pokemon, getPokemon] = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    getPokemon(url);
  }, []);

  const spanishTypeTranslations = {
    normal: "Normal",
    fighting: "Lucha",
    flying: "Volador",
    poison: "Veneno",
    ground: "Tierra",
    rock: "Roca",
    bug: "Bicho",
    ghost: "Fantasma",
    steel: "Acero",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ice: "Hielo",
    dragon: "Dragón",
    dark: "Siniestro",
    fairy: "Hada",
    unknown: "Desconocido",
    shadow: "Sombra",
  };

  const spanishStatTranslations = {
    hp: "hp",
    attack: "Ataque",
    defense: "Defensa",
    speed: "Velocidad",
  };

  const handleClick = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };

  return (
    <article
      onClick={handleClick}
      className={`poke__card ${pokemon?.types[0].type.name}`}
    >
      <figure>
        <img
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt="foto de Pokémon"
        />
      </figure>
      <h3 className="poke__name">{pokemon?.name}</h3>
      <ul className="poke__type">
        <li>
          {pokemon?.types.map((type) => (
            <span key={type.type.url} className="poke__type-name">
              {spanishTypeTranslations[type.type.name] || type.type.name}
              {pokemon.types.length > 1 &&
                type !== pokemon.types[pokemon.types.length - 1] &&
                " / "}
            </span>
          ))}
        </li>
      </ul>
      <p className="poke__type-label">tipo</p>
      <hr />
      <ul className="poke__stats">
        {pokemon?.stats.map(
          (stat) =>
            !stat.stat.name.includes("special") && (
              <li key={stat.stat.url} className="poke__stat">
                {spanishStatTranslations[stat.stat.name] || stat.stat.name}
                <span>{stat.base_stat}</span>
              </li>
            )
        )}
      </ul>
    </article>
  );
};

export default PokeCard;
