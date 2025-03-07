import React, { useContext } from "react";
import "../../styles/CartaFavoritos.css"
import { Context } from "../store/appContext";


const CartaFavoritosJuegos = ({ title, id }) => {
  const { actions } = useContext(Context);
  const user = localStorage.getItem("userId");
  const eliminarJuego = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + `api/remove-games`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user,
          videogame_id: id,
        }),
      });

      if (response.ok) {
        // Si la eliminación es exitosa, actualiza los juegos en el store
        actions.toggleEstado(); // Esto debe forzar el re-renderizado con la lista actualizada
      } else {
        console.error("Error al eliminar el juego");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div id="CardJuego" className="card text-center justify-content-center">
      <div id="TituloGame" className="card-header"><h4>{title}</h4></div>
      <div>
        <div className="button mb-5">
          <button onClick={() => { eliminarJuego() }}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default CartaFavoritosJuegos;
