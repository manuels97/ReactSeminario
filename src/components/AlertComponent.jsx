import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertComponent = ({ show, handleClose, handleConfirm, title, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertComponent;
