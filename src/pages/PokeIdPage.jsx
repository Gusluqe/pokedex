import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./styles/PokeIdPage.css";

const PokeIdPage = () => {
  const [pokeData, getPokeData] = useFetch();
  const param = useParams();
  const [pokemonNumber, setPokemonNumber] = useState(null);

  const statTranslations = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defensa",
    speed: "Velocidad",
  };

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`;
    getPokeData(url);
  }, [param.id]);

  useEffect(() => {
    if (pokeData) {
      setPokemonNumber(pokeData.id);
    }
  }, [pokeData]);

  const getTypeClass = () => {
    if (pokeData) {
      return pokeData.types[0].type.name;
    }
    return "";
  };

  return (
    <div>
      <div className="top-bar">
        <div className="red-section">
          <a href="URL_DEL_ENLACE_IZQUIERDO">
            <img src="https://imgur.com/U09EvhW.png" alt="Icono Izquierdo" />
          </a>
        </div>
        <div className="black-section">
          <a href="URL_DEL_ENLACE_DERECHO">
            <img src="https://imgur.com/LZqbyDj.png" alt="Icono Derecho" />
          </a>
        </div>
      </div>

      <article className="article-container">
        {pokeData && (
          <div className="container">
            <div className={`info-container ${getTypeClass()}`}>
              <img
                src={pokeData.sprites.other["official-artwork"].front_default}
                alt={pokeData.name}
              />
              <div className="info">
                <h1>#{pokemonNumber}</h1>
                <br />
                <h2 className="name">{pokeData.name}</h2>
                <div className="stats">
                  <p>
                    Peso: <br /> {pokeData.weight}
                  </p>
                  <p>
                    Altura: <br /> {pokeData.height}
                  </p>
                </div>
                <div className="types-abilities">
                  <h3>Tipo:</h3>
                  <ul>
                    {pokeData.types.map((type, index) => (
                      <li key={index}>{type.type.name}</li>
                    ))}
                  </ul>
                  <h3>Habilidades:</h3>
                  <ul>
                    {pokeData.abilities.map((ability, index) => (
                      <li key={index}>{ability.ability.name}</li>
                    ))}
                  </ul>
                </div>
                <h3>Estadísticas:</h3>
                <ul>
                  {pokeData.stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {statTranslations[stat.stat.name]}:{" "}
                      {Math.min(stat.base_stat, 150)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="moves-container">
              <h3>Movimientos:</h3>
              <ul>
                {pokeData.moves.map((move, index) => (
                  <li key={index}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default PokeIdPage;
