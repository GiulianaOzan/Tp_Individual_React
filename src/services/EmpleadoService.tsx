//va a contener todos las funciones y métodos relacionados con la comunicación de la API, aquí vamos a crear 5 métodos para tener un ABM completo
import { DtoEmpleado } from "../types/DTOEmpleado";

const BASE_URL = 'http://localhost:8080/api/v1/usuarios';

export const DtoEmpleadoService = {
	//Aquí adentro vamos a declarar los métodos
    
    getDtoEmpleados: async (): Promise<DtoEmpleado[]> => {
        const response = await fetch(`${BASE_URL}/Empleados`);
        const data = await response.json();
        return data;
    },

    

    createDtoEmpleado: async (dtoEmpleado: DtoEmpleado): Promise<DtoEmpleado> =>{
        const response = await fetch(`${BASE_URL}/Empleados`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dtoEmpleado)
        });
        
        if (!response.ok) {
            console.error('Error al crear el empleado:', response.statusText);
            throw new Error('No se pudo crear el empleado');
        }
        
        const data = await response.json();
        console.log('Empleado creado con éxito:', data);
        return data;
    },

    updateDtoEmpleado: async(id: number, dtoEmpleado: DtoEmpleado): Promise<DtoEmpleado> => {
        const response = await fetch(`${BASE_URL}/Empleados/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dtoEmpleado)
        });
        const data = await response.json();
        return data;
    },

    deleteDtoEmpleado: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/Empleados/${id}`, {
            method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          
        }
      })
      .then(response => {
        if (response.ok) {
          console.log('El empleado se eliminó correctamente');
        } else {
          console.error('No se pudo eliminar el empleado');
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud DELETE', error);
        });
    }
}
