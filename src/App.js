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


const App = () => {
    return (
        <Router>
            <div>
                <HeaderComponent/>
                <Routes>
                    <Route path="/tipo_propiedad" element={<TipoPropiedadPage />} />
                    <Route path="/tipo_propiedad/new" element={<NewTipoPropiedadPage />} />
                    <Route path="/tipo_propiedad/edit/:id" element={<EditTipoPropiedad />} />
                    <Route path="/reserva" element={<ReservaPage />} />
                    <Route path="/reserva/new" element={<NewReservaPage />} />
                    <Route path="/reserva/edit/:id" element={<EditReserva />} />
                </Routes>
                <FooterComponent/>
            </div>
        </Router>
    );
};

export default App;
