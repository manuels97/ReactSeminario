import axios from 'axios';

const API_URL = 'http://localhost/reservas'; 

export const obtenerReservas = async () => {
    try {
        const response = await axios.get(API_URL);
        // console.log("Se encontraron las reservas",response.data)
        if (response.data.code !== 200){
            throw response.data.datos
        }
        return response.data.datos
    } catch (error) {
        if(error.response.status===404){ //Si es error de url o sv lo aviso aca
            console.error(error.response); 
            alert("Error al comunicarse con el servidor");
            return { handled: true };
        }
        throw error;
    }
};

//Agregar a la api error de reserva antes de la fecha act
export const crearReserva = async (propiedad, inquilino, fechaDesde, cantidadNoches, valorTotal) => {
    try {       
        const response = await axios.post(API_URL, {
            propiedad_id: propiedad,
            inquilino_id: inquilino,
            fecha_desde: fechaDesde,
            cantidad_noches: cantidadNoches,
            valor_total: valorTotal
        });
        const data= response.data
        if (!(data.code >= 200 && data.code < 300)){       
            throw data.response
        }
        return data
    } catch (error) {
        if(error.code===404){ //Si es error de url o sv lo aviso aca
            console.error(error.response); 
            alert("Error al comunicarse con el servidor");
            return { handled: true };
        }
        console.log("ESTO DEV",error.response.data)
        throw error.response.data;
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
        const data= response.data
        if (!(data.code >= 200 && data.code < 300)){
            throw response.data
        }
        return data
    } catch (error) {
        if(error.code===404){ //Si es error de url o sv lo aviso aca
            console.error(error.response); 
            alert("Error al comunicarse con el servidor");
            return { handled: true };
        }
        throw error.response.data;
    }
};

export const eliminarReserva = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        const data= response.data;
        if (!(data.code >= 200 && data.code < 300)){
            throw response.data
        }
        return data
    } catch (error) {
        if(error.code===404){ //Si es error de url o sv lo aviso aca
            console.error(error.response); 
            alert("Error al comunicarse con el servidor");
            return { handled: true };
        }
        throw error.response.data;
    }
};

