import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/tipoPropiedadStyles/TipoPropiedadPage.css';
import AlertComponent from '../../components/AlertComponent';
import { obtenerTiposPropiedad, eliminarTipoPropiedad } from './TipoPropiedadPageServices';

const TipoPropiedadPage = () => {
    const [tiposPropiedad, setTiposPropiedad] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tipos = await obtenerTiposPropiedad();
                setTiposPropiedad(tipos);
            } catch (error) {
                console.error("Error al establecer tipos de propiedad:", error);
                setTiposPropiedad([]);
            }
        };
        fetchData();
    }, []);

    const handleEliminar = async (id) => {
        setDeleteId(id);
        setShowAlert(true);
    };

    const handleConfirmEliminar = async () => {
        if (deleteId) {
            try {
                const resultado = await eliminarTipoPropiedad(deleteId);
                if (resultado && resultado["code: "] === 200) { 
                    setTiposPropiedad(prevTiposPropiedad => prevTiposPropiedad.filter(tipo => tipo.id !== deleteId));
                    alert(resultado["mensaje: "]); 
                    setShowAlert(false);
                } else {
                    console.error("Error al eliminar tipo de propiedad:", resultado);
                    alert(`Error al eliminar tipo de propiedad: ${resultado["mensaje: "]}`); 
                    setShowAlert(false);
                }
            } catch (error) {
                console.error("Error al eliminar tipo de propiedad:", error);
                alert("Error al eliminar tipo de propiedad");
                setShowAlert(false);
            }
        }
    };
    

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className="container">
            <h1>Tipos de Propiedad</h1>
            <Link to="/tipo_propiedad/new" className="btn btn-primary">Crear Nuevo Tipo de Propiedad</Link>
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
                                <Link to={`/tipo_propiedad/edit/${tipo.id}`} className="btn btn-warning">Editar</Link>
                                <button onClick={() => handleEliminar(tipo.id)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AlertComponent
                show={showAlert}
                handleClose={handleCloseAlert}
                handleConfirm={handleConfirmEliminar}
                title="Eliminar Tipo de Propiedad"
                message="¿Estás seguro de eliminar este tipo de propiedad?"
            />
        </div>
    );
};

export default TipoPropiedadPage;
