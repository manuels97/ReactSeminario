import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearReserva } from './reservaServices';

const NewReserva = () => {
    const [propiedad, setPropiedad] = useState('');
    const [inquilino, setInquilino] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [cantidadNoches, setCantidadNoches] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await crearReserva(propiedad, inquilino, fechaDesde, cantidadNoches, valorTotal);
            setMensaje(data.message);
            // Si necesitas hacer algo después de crear la reserva, como redirigir a otra página, aquí lo haces.
            navigate.push('/reserva');
        } catch (error) {
            console.error('Error al crear reserva:', error);
            setMensaje('Error al crear reserva.');
        }
    };

    return (
        <div>
            <h1>Nueva Reserva</h1>
            {mensaje && <div>{mensaje}</div>}
            <form onSubmit={handleSubmit}>
                {/* Inputs para propiedad, inquilino, fechaDesde, cantidadNoches, valorTotal */}
                <button type="submit">Guardar Reserva</button>
            </form>
        </div>
    );
};

export default NewReserva;
