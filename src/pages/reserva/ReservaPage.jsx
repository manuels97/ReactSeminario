import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerReservas, eliminarReserva } from '../../services/reservaServices';
import '../../assets/styles/reservasStyles/ReservasPage.css';
import AlertComponent from '../../components/AlertComponent'; 

const ReservaPage = () => {
    const [reservas, setReservas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [reservaIdToDelete, setReservaIdToDelete] = useState(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const data = await obtenerReservas();
                if (data.handled) {
                    setMensaje("Error al comunicarse con el servidor")
                    return;
                }
                setReservas(data);
            } catch (error) {
                console.error("Error al obtener reservas:", error);
                setMensaje(error.message);
                setReservas([]);
            }
        };

        fetchReservas();
    }, []);


    const handleEliminar = async (id) => {
        setReservaIdToDelete(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        setShowModal(false);
        try {
            const data = await eliminarReserva(reservaIdToDelete);
            if (data.handled) {
                setMensaje("Error al comunicarse con el servidor")
                return;
            }
                setReservas(reservas.filter(reserva => reserva.id !== reservaIdToDelete));
                console.log(data)
                alert(data.mensaje);
        } catch (error) {
            console.error('Error al eliminar la reserva: ', error.mensaje);
            alert(error.mensaje)
        }
    };
    

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>Listado de Reservas</h1>
            <Link className="link" to="/reserva/new">Crear Nueva Reserva</Link>
            <table>
                <thead>
                    <tr>
                        <th>Propiedad</th>
                        <th>Inquilino</th>
                        <th>Fecha Desde</th>
                        <th>Cantidad Noches</th>
                        <th>Valor Total</th>
                        <th>Acciones</th>
                    </tr>
                    {mensaje && <div className="alert alert-info">{mensaje}</div>}

                </thead>
                <tbody>
                    {reservas.map(reserva => (
                        <tr key={reserva.id}>
                            <td>{reserva.propiedad_id}</td>
                            <td>{reserva.inquilino_id}</td>
                            <td>{reserva.fecha_desde}</td>
                            <td>{reserva.cantidad_noches}</td>
                            <td>{reserva.valor_total}</td>
                            <td>
                                <Link to={`/reserva/edit/${reserva.id}`}>Editar</Link>
                                <button onClick={() => handleEliminar(reserva.id)}>Eliminar</button>
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
                message="¿Está seguro de eliminar esta reserva?"
            />
        </div>
    );
};

export default ReservaPage;
