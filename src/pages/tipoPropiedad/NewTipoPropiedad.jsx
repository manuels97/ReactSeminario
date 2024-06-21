import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agregarTipoPropiedad } from './TipoPropiedadPageServices';
import '../../assets/styles/tipoPropiedadStyles/NewTipoPropiedad.css';

const NewTipoPropiedadPage = () => {
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre.trim() === '') {
            alert('El nombre no puede estar vacío.');
            return;
        }

        try {
            const response = await agregarTipoPropiedad(nombre);
            console.log("Respuesta del servidor:", response);
            if (response && response["code: "] === 200) {
                navigate('/');
                alert('Tipo de propiedad agregado correctamente.');
            } else {
                alert(`Error al agregar tipo de propiedad: ${response["mensaje: "]}`);
            }
        } catch (error) {
            console.error("Error al agregar tipo de propiedad:", error);
            alert('Error al comunicarse con el servidor. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    return (
        <div className="container">
            <h1>Crear Nuevo Tipo de Propiedad</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
};

export default NewTipoPropiedadPage;
