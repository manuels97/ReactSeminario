import React from 'react';
import Modal from 'react-modal';
import '../../assets/styles/propiedadStyles.css'

const DetailPropiedad = ({ isOpen, onRequestClose, datosModalDetalle }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Detalles de la Propiedad"
            className="Modal"
            overlayClassName="Overlay"
        >
            {datosModalDetalle && (
                    <div>
                        <h2>Detalles de la Propiedad</h2>
                        <p>Domicilio: {datosModalDetalle.domicilio}</p>
                        <p>Fecha Inicio Disponibilidad: {datosModalDetalle.fecha_inicio_disponibilidad}</p>
                        <p>Cantidad de Huéspedes: {datosModalDetalle.cantidad_huespedes}</p>
                        <img src="https://imgs.search.brave.com/h5NSD01_0qfNL5zdmSEvFwWpBoOShwpFlGt8mqvyZS0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGV1c3RvZm9ybWFj/aW9uLmNvbS9zaXRl/cy9kZXVzdG9mb3Jt/YWNpb24vZmlsZXMv/aW1hZ2VuZXNfYmxv/Z18xL3RpYy8yMDE1/LzAzL3BpeGVscG91/ci5qcGc" alt="Imagen de la propiedad" />
                        <button onClick={onRequestClose}>Cerrar</button>
                    </div>
                )}
        </Modal>
    )

}
export default DetailPropiedad;