import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/styles/componentsStyles/NavBarComponent.css';

const NavBarComponent = () => {
    return (
      <Navbar className="custom-navbar" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/"><p>Inicio</p></Nav.Link>
              <Nav.Link as={Link} to="/tipo_propiedad"><p>Tipo Propiedad</p></Nav.Link>
              <Nav.Link as={Link} to="/reserva"><p>Reservas</p></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    );
  };
  

export default NavBarComponent;
