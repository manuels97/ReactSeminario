import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerReservas, eliminarReserva } from './reservaServices';

const ReservaPage = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            const data = await obtenerReservas();
            setReservas(data);
        };

        fetchReservas();
    }, []);

    const handleEliminar = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta reserva?')) {
            const resultado = await eliminarReserva(id);
            if (resultado["code: "]===200) {
                setReservas(reservas.filter(reserva => reserva.id !== id));
                alert("Eliminada correctamente")
            } else {
                console.log("error: ",resultado["mensaje: "]);
                alert(`Error al eliminar tipo de propiedad: ${resultado["mensaje: "]}`);
            }
        }
    };

    return (
        <div>
            <h1>Listado de Reservas</h1>
            <Link to="/reserva/new">Crear Nueva Reserva</Link>
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
        </div>
    );
};

export default ReservaPage;
