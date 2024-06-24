import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearLocalidad } from '../../services/localidadServices';

const NewLocalidad = () => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await crearLocalidad(nombre);
            alert(data.mensaje);
            navigate('/localidad');
        } catch (error) {
            console.error('Error al crear localidad:', error);
            alert(error.mensaje);
            setMensaje(error.mensaje);
        }
    };

    return (
        <div>
            <h1>Nueva Localidad</h1>
            {mensaje && <div>{mensaje}</div>}
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
                <button type="submit" className="btn btn-primary">Guardar Localidad</button>
            </form>
        </div>
    );
};

export default NewLocalidad;
