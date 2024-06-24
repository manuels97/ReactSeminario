import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agregarTipoPropiedad } from '../../services/TipoPropiedadPageServices';
import '../../assets/styles/tipoPropiedadStyles/NewTipoPropiedad.css';

const NewTipoPropiedadPage = () => {
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombre.trim() === '') {
            alert('El nombre no puede estar vacío.');
            return;
        }

        try {
                const data=await agregarTipoPropiedad(nombre);
                if (data.handled) {
                    setMensaje("Error al comunicarse con el servidor")
                    return;
                }
                navigate('/tipo_propiedad');
                alert('Tipo de propiedad agregado correctamente.');
        } catch (error) {

            console.error("Error al agregar tipo de propiedad:", error.mensaje);
            alert(error.mensaje);
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
                {mensaje && <div className="alert alert-info">{mensaje}</div>}

            </form>
        </div>
    );
};

export default NewTipoPropiedadPage;
