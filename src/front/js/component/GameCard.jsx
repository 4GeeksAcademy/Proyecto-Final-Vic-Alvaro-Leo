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
        className="text-decoration-none"
      >
        <div className="card-header text-center">{title}</div>
        <div id="Carta" className="card-body justify-content-end">
          <img src={image} alt={title} className="img-fluid" />
        </div>
      </a>
      <div>
        <button id="FavoritoBoton" className="m-2" onClick={() => addToFavorites(videogameId)}><span>Añadir a favoritos</span></button>
      </div>
    </div>
  );
};


export default GameCard;
