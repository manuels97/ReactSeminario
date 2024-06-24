import axios from 'axios';

const API_URL = 'http://localhost/localidades';

export const obtenerLocalidades = async () => {
    try {
        const response = await axios.get(API_URL);
        if (response.data.code !== 200){
            throw response.data.datos
        }
        return response.data.datos;
    } catch (error) {
        if (error.response.status === 404) {
            console.error(error.response);
            alert("Error al comunicarse con el servidor");
            return { handled: true };
        }
        throw error;
    }
};

export const crearLocalidad = async (nombre, descripcion) => {
    try {
        const response = await axios.post(API_URL, { nombre, descripcion });
        const data = response.data;
        if (!(data.code >= 200 && data.code < 300)){
            throw data.response;
        }
        return data;
    } catch (error) {
        if (error.code === 404) {
            console.error(error.response);
            alert("Error al comunicarse con el servidor");
            return { handled: true };
        }
        throw error.response.data;
    }
};

export const editarLocalidad = async (id, nombre, descripcion) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { nombre, descripcion });
        const data = response.data;
        if (!(data.code >= 200 && data.code < 300)){
            throw response.data;
        }
        return data;
    } catch (error) {
        if (error.code === 404) {
            console.error(error.response);
            alert("Error al comunicarse con el servidor");
            return { handled: true };
        }
        throw error.response.data;
    }
};

export const eliminarLocalidad = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        const data = response.data;
        if (!(data.code >= 200 && data.code < 300)) {
            throw data;
        } 
        return data
        }
        catch (error) {
            if(error.code===404){ //Si es error de url o sv lo aviso aca
                console.error(error.response); 
                alert("Error al comunicarse con el servidor");
                return { handled: true };
            }
        console.log("LLEGA?",error)
        throw error;
    }
};

