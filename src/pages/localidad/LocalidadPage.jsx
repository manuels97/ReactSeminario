import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerLocalidades, eliminarLocalidad } from '../../services/localidadServices';
import '../../assets/styles/localidadStyles/LocalidadPage.css';
import AlertComponent from '../../components/AlertComponent';

const LocalidadPage = () => {
    const [localidades, setLocalidades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [localidadIdToDelete, setLocalidadIdToDelete] = useState(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const data = await obtenerLocalidades();
                setLocalidades(data);
            } catch (error) {
                console.error('Error al obtener localidades:', error);
                setMensaje(error.message);
            }
        };

        fetchLocalidades();
    }, []);

    const handleEliminar = (id) => {
        setLocalidadIdToDelete(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        setShowModal(false);
        try {
            const data = await eliminarLocalidad(localidadIdToDelete);
            if (data.handled) {
                setMensaje("Error al comunicarse con el servidor")
                return;
            }
                setLocalidades(localidades.filter(localidad => localidad.id !== localidadIdToDelete));
                console.log(data)
                alert(data.mensaje);
        } catch (error) {
            console.error('Error al eliminar la localidad:', error.mensaje);
            alert(error.mensaje);
            setMensaje("Error al eliminar la localidad");
        }
    };
    

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>Listado de Localidades</h1>
            <Link className="link" to="/localidad/new">Crear Nueva Localidad</Link>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {localidades.map(localidad => (
                        <tr key={localidad.id}>
                            <td>{localidad.id}</td>
                            <td>{localidad.nombre}</td>
                            <td>
                                <Link to={`/localidad/edit/${localidad.id}`}>Editar</Link>
                                <button onClick={() => handleEliminar(localidad.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AlertComponent
                show={showModal}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmDelete}
                title="Confirmar Eliminación"
                message="¿Está seguro de eliminar esta localidad?"
            />
        </div>
    );
};

export default LocalidadPage;
