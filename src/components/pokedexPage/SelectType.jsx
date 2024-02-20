import React, { useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { setPokemonName } from "../../store/slices/pokemonName.slice";
import { useDispatch } from "react-redux";

const SelectType = ({ setSelectValue }) => {
  const [types, getTypes] = useFetch();
  const textSelect = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/type";
    getTypes(url);
  }, []);

  const spanishTranslations = {
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

  const handleChange = () => {
    setSelectValue(textSelect.current.value);
    dispatch(setPokemonName(""));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <select
        style={{
          width: "260px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          color: "black",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          cursor: "pointer",
        }}
        onChange={handleChange}
        ref={textSelect}
      >
        <option value="allPokemons">Todos los pokemones</option>
        {types?.results.map((type) => (
          <option key={type.url} value={type.url}>
            {spanishTranslations[type.name] || type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectType;
