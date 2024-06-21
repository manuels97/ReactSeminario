import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import '../assets/styles/componentsStyles/HeaderComponent.css';
import logo from '../assets/images/logo.jpeg';
import NavBarComponent from './NavBarComponent';

const HeaderComponent = () => {
  return (
    <header className="header">
      <Link to="/" className="logo-link"> {/* Enlace al inicio */}
        <img
          src={logo}
          alt="Logo"
          className="logo"
        />
      </Link>
      <h1 className="title">Inmobiliaria G16</h1>
      <NavBarComponent className="nav" />
    </header>
  );
};

export default HeaderComponent;
