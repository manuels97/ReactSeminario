import axios from 'axios';

const API_URL = "http://localhost/tipos_propiedad";

export async function obtenerTiposPropiedad() {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;
        if (data.code !== 200){
            throw data.datos
        }
        return data.datos
    } catch (error) {
        if(error.response.status===404){ //Si es error de url o sv lo aviso aca
            console.error(error.response); 
            alert("Error al comunicarse con el servidor");
        }
        throw error;
    }
}

export async function agregarTipoPropiedad(nombre) {
    try {
        const response = await axios.post(API_URL, { nombre });
        const data = response.data;        
        if (data.code !== 200){
            throw data
        }
        return data
    } catch (error) {
        console.log(error)
        if(error.code===404||error.code===405){ //Si es error de url o sv lo aviso aca
            console.error(error); 
            alert("Error al comunicarse con el servidor");
            return { handled: true };//para que no se propague el error
        }
        else{
        throw error
        }
    }
}

export async function eliminarTipoPropiedad(id) {
    try {
        console.log("ID a eliminar en el servicio:", id);
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.data.code !== 200){
            throw response.data
        }
        return response.data;
    } catch (error) {
        if(error.code===404||error.code===405){ //Si es error de url o sv lo aviso aca
            console.error(error.response); 
            alert("Error al comunicarse con el servidor");
            return { handled: true };//para que no se propague el error
        }
        else{
        throw error
        }
    }
}

export async function editarTipoPropiedad(id, nombre) {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { nombre });
        if (response.data.code !== 200) {
            throw response.data
        }
        return response.data;
    } catch (error) {
        if(error.code===404||error.code===405){ //Si es error de url o sv lo aviso aca
            console.error(error.response); 
            alert("Error al comunicarse con el servidor");
            return { handled: true };//para que no se propague el error
        }
        else{
        throw error
        }
    }
}