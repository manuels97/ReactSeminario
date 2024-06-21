import axios from 'axios';

const API_URL = "http://localhost/tipos_propiedad";

export async function obtenerTiposPropiedad() {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;
        // console.log("Respuesta de la API:", data);
        if (data && data.status === 'success' && Array.isArray(data.datos)) {
            return data.datos;
        } else {
            console.error("La respuesta no contiene un arreglo en la propiedad `datos`:", data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener tipos de propiedad:", error);
        return [];
    }
}

export async function agregarTipoPropiedad(nombre) {
    try {
        const response = await axios.post(API_URL, { nombre });
        const data = response.data;
        console.log("Respuesta al agregar tipo de propiedad:", data);
        return data;
    } catch (error) {
        console.error("Error al agregar tipo de propiedad:", error);
        return { success: false, message: 'Error al agregar tipo de propiedad.' };
    }
}

export async function eliminarTipoPropiedad(id) {
    try {
        console.log("ID a eliminar en el servicio:", id);
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar tipo de propiedad:", error);
        return null;
    }
}

export async function editarTipoPropiedad(id, nombre) {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { nombre });
        // console.log("quehay",response["data"]); //Esto es la resp de la api
        console.log(response.status)
        if (response.status !== 200) {
            throw new Error("Error en la peticion de axios");
        }
        console.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error al editar tipo de propiedad:", error.response.data);
            throw new Error(error.response.data.message || 'Error al editar tipo de propiedad');
        } else {
            console.error("Error al editar tipo de propiedad:", error);
            throw new Error('Error al editar tipo de propiedad');
        }
    }
}