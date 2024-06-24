import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearReserva } from '../../services/reservaServices';

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
            if (data.handled) {
                setMensaje("Error al comunicarse con el servidor")
                return;
            }
            alert(data.mensaje)
            navigate('/reserva');
        } catch (error) {
            console.error('Error al crear reserva:', error);
            alert(error.mensaje);
            setMensaje(error.mensaje);
        }
    };
    

    return (
        <div>
            <h1>Nueva Reserva</h1>
            {mensaje && <div>{mensaje}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="propiedad">Propiedad:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="propiedad"
                        value={propiedad}
                        onChange={(e) => setPropiedad(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inquilino">Inquilino:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inquilino"
                        value={inquilino}
                        onChange={(e) => setInquilino(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaDesde">Fecha Desde:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fechaDesde"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cantidadNoches">Cantidad Noches:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cantidadNoches"
                        value={cantidadNoches}
                        onChange={(e) => setCantidadNoches(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="valorTotal">Valor Total:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="valorTotal"
                        value={valorTotal}
                        onChange={(e) => setValorTotal(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Reserva</button>
            </form>
        </div>
    );
};

export default NewReserva;
