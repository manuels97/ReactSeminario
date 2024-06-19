// src/components/TipoPropiedadPage.jsx
import React, { useState, useEffect } from 'react';
import { obtenerTiposPropiedad, eliminarTipoPropiedad } from './TipoPropiedadPageServices';
import { Link } from 'react-router-dom';
import '../../assets/styles/tipoPropiedadStyles/TipoPropiedadPage.css'

const TipoPropiedadPage = () => {
    const [tiposPropiedad, setTiposPropiedad] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const tipos = await obtenerTiposPropiedad();
                setTiposPropiedad(tipos);
            } catch (error) {
                console.error("Error al establecer tipos de propiedad:", error);
                setTiposPropiedad([]);
            }
        }
        fetchData();
    }, []);

    const handleEliminar = async (id) => {
        console.log("ID a eliminar:", id); // Verifica el ID aquí
        if (window.confirm("¿Está seguro de eliminar este tipo de propiedad?")) {
            const resultado = await eliminarTipoPropiedad(id);
            console.log("acaaaaa",resultado);
            if (resultado &&  resultado["Status: "] === 'Success') {
                // Actualiza el estado de tiposPropiedad
                setTiposPropiedad(prevTiposPropiedad => prevTiposPropiedad.filter(tipo => tipo.id !== id));
            
                }else {
                console.error("Error al eliminar tipo de propiedad:", resultado);
                alert(`Error al eliminar tipo de propiedad: ${resultado.mensaje}`);
            }
        }
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const tipos = await obtenerTiposPropiedad();
                console.log("Tipos de Propiedad:", tipos); // Verifica los IDs aquí
                setTiposPropiedad(tipos);
            } catch (error) {
                console.error("Error al establecer tipos de propiedad:", error);
                setTiposPropiedad([]);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Tipos de Propiedad</h1>
            <Link to="/new" className="btn btn-primary">Crear Nuevo Tipo de Propiedad</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                            {tiposPropiedad.map(tipo => (
                <tr key={tipo.id}>
                    <td>{tipo.nombre}</td>
                    <td>
                        <Link to={`/edit/${tipo.id}`} className="btn btn-warning">Editar</Link>
                        <button onClick={() => handleEliminar(tipo.id)} className="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TipoPropiedadPage;