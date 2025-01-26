import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";

const FavGenreComponent = () => {
  const { store } = useContext(Context);
  const [genres, setGenres] = useState([]);
  const API_URL = process.env.BACKEND_URL + "/api/genres";

  const userId = store.userId;

  const fetchGenres = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Agregar `isFavorite` como false inicialmente
      const genresWithFavorites = data.message.map((genre) => ({
        ...genre,
        isFavorite: false,
      }));

      setGenres(genresWithFavorites);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleAddToFavorites = async (id) => {
    const url = process.env.BACKEND_URL + "/api/register-genres";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          genre_id: id,
        }),
      });

      if (response.ok) {
        console.log("Género añadido a favoritos");
        
        // Alternar el estado de isFavorite en el género correspondiente
        setGenres((prevGenres) =>
          prevGenres.map((genre) =>
            genre.id === id ? { ...genre, isFavorite: !genre.isFavorite } : genre
          )
        );
      } else {
        console.error("Error al añadir a favoritos:", response.statusText);
      }
    } catch (error) {
      alert("Error en la solicitud", error);
    }
  };

  return (
    <div className="container">
      <div className="row g-4">
        {genres.map((genre) => (
          <div
            className={`col-md-3 ${genre.isFavorite ? "favorite-card" : ""}`} // Agregar clase condicional
            key={genre.id}
          >
            <div
              className="card card-border"
              onClick={() => handleAddToFavorites(genre.id)}
            >
              <img
                src={`${genre.image}`}
                className="card-img-top"
                alt={`imagen de ${genre.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{genre.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavGenreComponent;