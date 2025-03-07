import React, { useContext, useEffect, useState } from "react";
import "../../styles/muro.css";
import { Context } from "../store/appContext";


const ModalPost = () => {
    const { actions } = useContext(Context);
    const [image, setImage] = useState("")
    const [text, setText] = useState("")
    const user = localStorage.getItem("userId")
    const handleImage = (event) => {
        setImage(event.target.files)
    }
    const handleText = (event) => {
        setText(event.target.value);
    }

    // Crear un objeto FormData
    const formData = new FormData();

    // Agregar los datos al FormData
    formData.append('user_id', user);
    formData.append('text', text);
    formData.append('image', image[0] ? image[0] : ""); // Enviar solo el primer archivo, si es que hay varios

    // Realizar la solicitud POST con FormData
    const publicar = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + "api/create-posts", {
                method: "POST",
                body: formData, // No necesitas establecer el 'Content-Type' cuando usas FormData
            });

            if (response.ok) {
                const data = await response.json();
                // Si la publicación es exitosa, actualiza los datos en la pantalla
                console.log("Post publicado:", data);

                // Si estás usando un estado para almacenar los posts, puedes actualizarlos aquí
                // actions.addPost(data); // Asumiendo que tienes una función para agregar el post
                actions.toggleEstado(); // Actualiza el estado para forzar el re-render
            } else {
                console.error("Error al publicar el post");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };
    

    return (
        <div className="d-flex justify-content-end mt-3">
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div id="PostModal" className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Nueva publicación</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">
                                        ¿Listo para jugar?:
                                    </label>
                                    <textarea className="form-control" id="TextoPost" name="text" onChange={handleText}></textarea>
                                    <label className="mt-4" htmlFor="fileInput">Selecciona una imagen para subir:</label>
                                    <input type="file" id="fileInput" name="image" accept="image/*" onChange={handleImage}></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="Cerrar"
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                            <button id="Publicar" type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{publicar(), actions.toggleEstado()}}>
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModalPost;