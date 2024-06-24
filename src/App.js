import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TipoPropiedadPage from './pages/tipoPropiedad/TipoPropiedadPage';
import NewTipoPropiedadPage from './pages/tipoPropiedad/NewTipoPropiedad';
import EditTipoPropiedad from './pages/tipoPropiedad/EditTipoPropiedad';

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ReservaPage from './pages/reserva/ReservaPage';
import NewReservaPage from './pages/reserva/NewReserva';
import EditReserva from './pages/reserva/EditReserva';
import LocalidadPage from './pages/localidad/LocalidadPage';
import NewLocalidad from './pages/localidad/NewLocalidad';
import EditLocalidad from './pages/localidad/EditLocalidad';
import PropiedadPage from './pages/propiedad/PropiedadPage';
import NewPropiedad from './pages/propiedad/NewPropiedad';



const App = () => {
    return (
        <Router>
            <div>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<PropiedadPage></PropiedadPage>} />
                    <Route path='/NewPropiedad' element={<NewPropiedad></NewPropiedad>}></Route>
                    <Route path="/tipo_propiedad" element={<TipoPropiedadPage />} />
                    <Route path="/tipo_propiedad/new" element={<NewTipoPropiedadPage />} />
                    <Route path="/tipo_propiedad/edit/:id" element={<EditTipoPropiedad />} />
                    <Route path="/reserva" element={<ReservaPage />} />
                    <Route path="/reserva/new" element={<NewReservaPage />} />
                    <Route path="/reserva/edit/:id" element={<EditReserva />} />
                    <Route path="/localidad" element={<LocalidadPage />} />
                    <Route path="/localidad/new" element={<NewLocalidad />} />
                    <Route path="/localidad/edit/:id" element={<EditLocalidad />} />
                </Routes>
                <FooterComponent/>
            </div>
        </Router>
    );
};

export default App;
