import React,{useEffect,useState} from 'react'
import { useForm } from 'react-hook-form'
import {getData} from '../../services/propiedadServices'
import '../../assets/styles/propiedadStyles.css'
import {postData} from '../../services/propiedadServices'
import HeaderComponent from '../../components/HeaderComponent';


const NewPropiedad = () => {
    const [localidades, setLocalidades] = useState([]);
    const [tipoPropiedades, setTipoPropiedades] = useState([]);
    useEffect(() => {
        // Obtener las localidades al cargar el componente
        getData("http://localhost/localidades", setLocalidades);
        getData("http://localhost/tipos_propiedad", setTipoPropiedades);
    }, []);


   const {register, handleSubmit, formState:{errors}} = useForm();

   const onSubmit = async (data) => {
      console.log(data);
      const url = "http://localhost/propiedad";
      const respuesta = await postData(url,data) 
      alert (respuesta);
   }
   
  return (
    <div>
        <div className='formNewPropiedad'>
            <h1>AGREGAR NUEVA PROPIEDAD</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='contentLabel'> 
                    <label>
                        Domicilio :
                        <input type="text"
                        name='domicilio'
                        {...register('domicilio' , {
                            required: true
                        })} />
                        
                    </label>
                    {errors.domicilio  && <span> El domicilio es requerido </span>}
                    <label>
                        Localidad :
                        <select name='localidad_id'
                        {...register('localidad_id') } >
                        <option value='' disabled selected key={localidades.id} >Seleccionar Localidad</option>
                            {localidades.map(localidad => (
                                <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
                            ))}
                        </select> 
                    </label>
                    <label>
                        Cantidad de habitaciones :
                        <input type="number"
                        name='cantidad_habitaciones'
                        {...register('cantidad_habitaciones')} />
                    </label>
                    <label>
                        Cantidad de baños :
                        <input type="number"
                        name='cantidad_banios'
                        {...register('cantidad_banios')} />
                    </label>
                    <label>
                        Cochera :
                        <input type="checkbox"
                        name='cochera'
                        {...register('cochera')} />
                    </label>
                    <label>
                        Cantidad de huespuedes :
                        <input type="number"
                        name='cantidad_huespedes'
                        {...register('cantidad_huespedes')} />
                    </label>
                    <label>
                        Fecha de inicio de disponibilidad :
                        <input type="text"
                        name='fecha_inicio_disponibilidad'
                        {...register('fecha_inicio_disponibilidad')} />
                    </label>
                    <label>
                        Cantidad de dias :
                        <input type="number"
                        name='cantidad_dias'
                        {...register('cantidad_dias')} />
                    </label>
                    <label>
                        Disponible :
                        <input type="checkbox"
                        name='disponible'
                        {...register('disponible')} />
                    </label>
                    <label>
                        Valor por noche $:
                        <input type="number"
                        name='valor_noche'
                        {...register('valor_noche')} />
                    </label>
                    <label>
                        Tipo Propiedad
                        <select name='tipo_propiedad_id'
                        {...register('tipo_propiedad_id')} key={tipoPropiedades.id}>
                        <option value=''>Selecionar tipo de propiedad</option>
                            {tipoPropiedades.map(tipoPropiedades => (
                                <option key={tipoPropiedades.id} value={tipoPropiedades.id}>{tipoPropiedades.nombre}</option>
                            ))}
                        </select> 
                    </label>
                    <label>
                        Imagen :
                        <input type="text"
                        name='imagen'
                        {...register('imagen')} />
                    </label>
                    <button type='submit'>Crear Propiedad</button>
                </div>
            </form>
        </div>
        




    </div>
  )
}

export default NewPropiedad