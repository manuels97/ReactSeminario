import React from 'react'
import deleteData from '../../services/deleteData';


const DeletePropiedad = (id) => {
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta propiedad?');
        if (confirmDelete) {
            const respuesta= deleteData( `http://localhost/propiedad/${id}`);
            return alert(respuesta.data);
        }
    }
}

export default DeletePropiedad