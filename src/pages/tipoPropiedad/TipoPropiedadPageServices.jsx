

const API_URL = "http://localhost/tipos_propiedad"; 



export async function obtenerTiposPropiedad() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Respuesta de la API:", data);
        if (data && data.status === 'success' && Array.isArray(data.datos)) {
            return data.datos;
        } else {
            console.error("La respuesta no contiene un arreglo en la propiedad `datos`:", data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener tipos de propiedad:", error);
        return [];
    }
}

export async function agregarTipoPropiedad(nombre) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre }),
        });
        const data = await response.json();
        console.log("Respuesta al agregar tipo de propiedad:", data);
        return data;
    } catch (error) {
        console.error("Error al agregar tipo de propiedad:", error);
        return { success: false, message: 'Error al agregar tipo de propiedad.' };
    }
}

export async function eliminarTipoPropiedad(id) {
    try {
        console.log("ID a eliminar en el servicio:", id); // 
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log("Respuesta del servidor al eliminar:", data);
        return data;
    } catch (error) {
        console.error("Error al eliminar tipo de propiedad:", error);
        return null;
    }

}
export async function editarTipoPropiedad(id, nombre) {
    try {
        // Realizar la solicitud PUT al backend para editar el tipo de propiedad
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        });

        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Error al editar tipo de propiedad');
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // Capturar y relanzar cualquier error ocurrido durante la solicitud
        throw new Error('Error al editar tipo de propiedad');
    }
}

//  export async function obtenerTipoPropiedadPorId(id) {
//      try {
//          const response = await fetch(`API_URL/${id}`);
        
//          if (!response.ok) {
//              throw new Error('Error al obtener tipo de propiedad por 2222ID');
//          }
        
//          const data = await response.json();
//          return data;
//      } catch (error) {
//         throw new Error('Error al obtener tipo de propiedad por ID en Serviciossss');
//     }
//  }