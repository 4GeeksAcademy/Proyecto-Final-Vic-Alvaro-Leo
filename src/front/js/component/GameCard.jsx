import React from 'react';
import "../../styles/GameCard.css";



const GameCard = ({ image, title, api_id, videogameId }) => {
  const user = localStorage.getItem("userId")
  const addToFavorites = (id) => {
    fetch(process.env.BACKEND_URL + "api/register-games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": user,
        "videogame_id": id
      })
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

  return (
    <div id="CardJuego" className="mb-3">
  <a
    href={process.env.FRONTEND_URL + `game/${api_id}`}
    rel="noopener noreferrer"
    className="text-decoration-none d-block"
  >
    <div className="card-header text-center">{title}</div>
    <div id="Carta" className="card-body d-flex flex-column align-items-center">
      <img src={image} alt={title} className="img-fluid w-100" />
    </div>
  </a>
  <div className="d-flex justify-content-center">
    <button id="FavoritoBoton" className="m-2 btn btn-primary" onClick={() => addToFavorites(videogameId)}>
      <span>Añadir a favoritos</span>
    </button>
  </div>
</div>
  );
};


export default GameCard;
