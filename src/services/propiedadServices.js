import axios from 'axios';

export async function getData(url, setDatos) {
    const respuesta = await axios.get(url);
    setDatos(respuesta.data.datos);
}

export async function deleteData(url) {
    const respuesta = await axios.delete(url);
    return { respuesta };
}

export async function openModalDetalles(datos, setDatosModalDetalle, setModalIsOpen) {
    setDatosModalDetalle(datos);
    setModalIsOpen(true);
}

export async function closeModalDetalles(setDatosModalDetalle, setModalIsOpen) {
    setModalIsOpen(false);
    setDatosModalDetalle(null);
}

export async function openModalEditar(datos, setPropiedadEditando, setModalEditando) {
    setPropiedadEditando(datos);
    setModalEditando(true);
}

export async function closeModalEditar(setPropiedadEditando, setModalEditando) {
    setModalEditando(false);
    setPropiedadEditando(null);
}

export async function postData(url, datos) {
    try {
        const respuesta = await axios.post(url, JSON.stringify(datos), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return respuesta.data.mensaje;
    } catch (error) {
        console.error('Error al actualizar los datos:', error);
        throw error;
    }
}

export async function setData(url, datos) {
    try {
        const respuesta = await axios.put(url, JSON.stringify(datos), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(datos);
        return respuesta.data.mensaje;
    } catch (error) {
        console.error('Error al actualizar los datos:', error);
        throw error;
    }
}
