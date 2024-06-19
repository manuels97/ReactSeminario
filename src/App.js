import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TipoPropiedadPage from './pages/tipoPropiedad/TipoPropiedadPage';
import NewTipoPropiedadPage from './pages/tipoPropiedad/NewTipoPropiedad';
import EditTipoPropiedad from './pages/tipoPropiedad/EditTipoPropiedad';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<TipoPropiedadPage />} />
                    <Route path="/new" element={<NewTipoPropiedadPage />} />
                    <Route path="/edit/:id" element={<EditTipoPropiedad />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
