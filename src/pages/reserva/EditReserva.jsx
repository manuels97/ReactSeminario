import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerReservas, editarReserva } from './reservaServices';

const EditReserva = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [propiedad, setPropiedad] = useState('');
    const [inquilino, setInquilino] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [cantidadNoches, setCantidadNoches] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const reservas = await obtenerReservas();
                const reserva = reservas.find(reserva => reserva.id === parseInt(id));
                if (reserva) {
                    setPropiedad(reserva.propiedad_id);
                    setInquilino(reserva.inquilino_id);
                    setFechaDesde(reserva.fecha_desde);
                    setCantidadNoches(reserva.cantidad_noches);
                    setValorTotal(reserva.valor_total);
                } else {
                    throw new Error('Reserva no encontrada');
                }
            } catch (error) {
                console.error('Error al obtener reserva:',error["mensaje: "]);
                setMensaje('Error al obtener reserva.');
            }
        };

        fetchReserva();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await editarReserva(id, propiedad, inquilino, fechaDesde, cantidadNoches, valorTotal);
            if (data.handled) {
                setMensaje("Error al comunicarse con el servidor")
                return;
            }
            alert(data["mensaje: "])
            navigate('/reserva');
        }catch(error){
            console.error('Error al editar reserva: ', error["mensaje: "]);
            alert(error["mensaje: "])
            setMensaje('Error al editar reserva.');
        }
        }

    return (
        <div className="container">
            <h1>Editar Reserva</h1>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}
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
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditReserva;
