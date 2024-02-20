import React, { useRef, useState, useEffect } from "react";
import { setTrainerName } from "../store/slices/trainerName.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textInput = useRef();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTrainerName(textInput.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <div className="container">
      <h1>
        <a href={window.location.pathname} className="homepage-icon-left">
          <img src="https://i.imgur.com/YbaajMX.png" alt="Icono Izquierdo" />
        </a>
      </h1>

      <h1>¡Hola Entrenador!</h1>
      <h2>Para poder empezar, ingresa tu nombre</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={textInput} />
        <button>Comenzar</button>
      </form>

      <img
        src="https://i.imgur.com/LZqbyDj.png"
        alt="Icono Derecho"
        className="homepage-icon-right"
      />
      <div className="homepage-top-red"></div>
      <div className="homepage-top-black"></div>
    </div>
  );
};

export default HomePage;
