import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonName } from "../store/slices/pokemonName.slice";
import useFetch from "../hooks/useFetch";
import PokeCard from "../components/pokedexPage/PokeCard";
import SelectType from "../components/pokedexPage/SelectType";
import "./styles/PokedexPage.css";

const PokedexPage = () => {
  const [selectValue, setSelectValue] = useState("allPokemons");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const pokemonsPerPage = 16;
  const maxPagesToShow = 7;

  const trainerName = useSelector((store) => store.trainerName);
  const pokemonName = useSelector((store) => store.pokemonName);
  const dispatch = useDispatch();
  const [pokemons, getPokemons, getPerType] = useFetch();

  useEffect(() => {
    setCurrentPage(1);
    if (selectValue === "allPokemons") {
      const url = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
      getPokemons(url);
    } else {
      getPerType(selectValue);
    }
  }, [selectValue]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchedPokemon = textInput.current.value.trim().toLowerCase();

    const pokemonExists = pokemons?.results.some((pokemon) =>
      pokemon.name.includes(searchedPokemon)
    );
    if (!pokemonExists) {
      setError(`El Pokémon "${searchedPokemon}" no existe`);
    } else {
      dispatch(setPokemonName(searchedPokemon));
      textInput.current.value = "";
      setError(null);
    }
  };

  const loadAllPokemons = () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
    getPokemons(url);
    setError(null);
  };

  const cbFilter = () => {
    if (pokemonName && pokemons?.results) {
      return pokemons.results.filter((element) =>
        element.name.includes(pokemonName)
      );
    } else if (pokemons?.results) {
      return pokemons.results;
    }
    return [];
  };

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons =
    cbFilter()?.slice(indexOfFirstPokemon, indexOfLastPokemon) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(cbFilter()?.length / pokemonsPerPage);

  const generatePageNumbers = () => {
    const totalPagesToShow = Math.min(maxPagesToShow, totalPages);
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    let pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    if (currentPage + Math.floor(maxPagesToShow / 2) < totalPages) {
      pages.push("next");
    }

    return pages;
  };

  const isActivePage = (pageNumber) => {
    return pageNumber === currentPage ? "active-page" : "";
  };

  return (
    <div className="pokedex">
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
      <section className="poke__header">
        <h3>
          <span>Bienvenido {trainerName}, </span>Aquí podrás encontrar tu
          Pokémon favorito
        </h3>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" ref={textInput} />
            <button>Buscar</button>
          </form>
          <SelectType setSelectValue={setSelectValue} />
        </div>
      </section>
      <section className="poke__content">
        {error && (
          <div className="error-message" onClick={loadAllPokemons}>
            {error}
          </div>
        )}
        {!error && (
          <div className="poke__container">
            <div className="grid-container">
              {currentPokemons.map((poke) => (
                <PokeCard key={poke.url} url={poke.url} />
              ))}
            </div>
          </div>
        )}
        {!error && (
          <div className="pagination">
            {generatePageNumbers().map((page, index) => (
              <button
                key={index}
                className={`${isActivePage(page)} ${
                  page === "next" ? "next-page" : ""
                }`}
                onClick={() => {
                  if (page === "next") {
                    paginate(currentPage + Math.floor(maxPagesToShow / 2));
                  } else {
                    paginate(page);
                  }
                }}
              >
                {page === "next" ? ">>" : page}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PokedexPage;
