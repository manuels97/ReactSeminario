import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getData } from '../../services/propiedadServices' 
const FormCriterios = ({ onSubmit }) => {
    // Estado para almacenar las localidades obtenidas de la API
    const [localidades, setLocalidades] = useState([]);

    useEffect(() => {
        // Obtener las localidades al cargar el componente
        getData("http://localhost/localidades", setLocalidades);
    }, []);

    const { register,  handleSubmit } = useForm();

    

    return (
        <div>
            <h3>FILTRAR</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                 <label>
                    Cantidad de huespuedes  
                    <input
                    type='number'
                    name="cantidad_huespedes"
                    placeholder='Ingrese número de huéspedes'
                    {...register('cantidad_huespedes')}
                    ></input>
                    
                </label> 
                <label>
                    Disponible
                    <input
                        type='checkbox'
                        name='disponible'
                        {...register('disponible')}
                    />
                </label>
                <label>
                    Fecha
                    <input
                        type='date'
                        name='fecha_inicio_disponibilidad'
                        {...register('fecha_inicio_disponibilidad')}
                    />
                </label>
                <select name='localidad_id' 
                 {...register('localidad_id')}
                >
                    <option value='' >Seleccionar Localidad</option>
                    {localidades.map(localidad => (
                        <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
                    ))}
                </select>
                
                <button type='submit'>Buscar</button>
            </form>
        </div>
    );
};

export default FormCriterios;
