import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerLocalidades, editarLocalidad } from '../../services/localidadServices';
import '../../assets/styles/localidadStyles/EditLocalidad.css';

const EditLocalidad = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchLocalidad = async () => {
            try {
                const localidades = await obtenerLocalidades();
                const localidad = localidades.find(localidad => localidad.id === parseInt(id));
                if (localidad) {
                    setNombre(localidad.nombre);
                } else {
                    throw new Error('Localidad no encontrada');
                }
            } catch (error) {
                console.error('Error al obtener localidad:', error.message);
                setMensaje('Error al obtener localidad.');
            }
        };

        fetchLocalidad();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await editarLocalidad(id, nombre);
            if (data.handled) {
                setMensaje("Error al comunicarse con el servidor");
                return;
            }
            alert(data.mensaje);
            navigate('/localidad');
        } catch (error) {
            console.error('Error al editar localidad:', error.mensaje);
            alert(error.mensaje);
            setMensaje('Error al editar localidad.');
        }
    };

    return (
        <div className="container">
            <h1>Editar Localidad</h1>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}
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
                
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditLocalidad;
