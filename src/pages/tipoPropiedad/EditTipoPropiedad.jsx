import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { obtenerTiposPropiedad, editarTipoPropiedad} from './TipoPropiedadPageServices';



const EditTipoPropiedadPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tiposPropiedad, setTiposPropiedad] = useState([]);
    const [nombreActual, setNombreActual] = useState('');
    const [nombreNuevo, setNombreNuevo] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tipos = await obtenerTiposPropiedad();
                const tipoPropiedad = tipos.find(tipo => tipo.id === parseInt(id));
                if (tipoPropiedad) {
                    setNombreActual(tipoPropiedad.nombre);
                } else {
                    throw new Error('Tipo de propiedad no encontrado');
                }
            } catch (error) {
                console.error("Error al obtener tipo de propiedad:", error);
                setMensaje('Error al obtener los datos del tipo de propiedad.');
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response =await editarTipoPropiedad(id, nombreNuevo);
            setMensaje('Tipo de propiedad actualizado correctamente.');
            navigate('/');
            alert(response["Status: "])
            
        } catch (error) {
            console.error("Error al editar tipo de propiedad:", error);
            setMensaje('Error al editar el tipo de propiedad. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    return (
        <div className="container">
            <h1>Editar Tipo de Propiedad</h1>
            {mensaje && <div className="alert alert-info">{mensaje}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombreActual}
                        onChange={(e) => setNombreNuevo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
};

export default EditTipoPropiedadPage;