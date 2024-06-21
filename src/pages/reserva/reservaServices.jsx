import axios from 'axios';

const API_URL = 'http://localhost/reservas'; 

export const obtenerReservas = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Se encontraron las reservas",response.data.datos)
        return response.data.datos;
    } catch (error) {
        throw new Error('Error al obtener las reservas');
    }
};

export const crearReserva = async (propiedad, inquilino, fechaDesde, cantidadNoches, valorTotal) => {
    try {
        const response = await axios.post(API_URL, { propiedad, inquilino, fechaDesde, cantidadNoches, valorTotal });
        return response.data;
    } catch (error) {
        throw new Error('Error al crear la reserva');
    }
};


export const editarReserva = async (id, propiedad, inquilino, fechaDesde, cantidadNoches, valorTotal) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, {
            propiedad_id: propiedad,
            inquilino_id: inquilino,
            fecha_desde: fechaDesde,
            cantidad_noches: cantidadNoches,
            valor_total: valorTotal
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};

export async function eliminarReserva(id) {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data
        } else {
            throw new Error('Error al eliminar la reserva');
        }
    }
};
