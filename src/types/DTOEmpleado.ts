export enum Rol {
    ADMINISTRADOR = 'Administrador',
    Cajero = 'Cajero',
    Delivery = 'Delivery',
    Elija= 'Defina'
}

export interface DtoEmpleado {
    id: number;
    id_Empleado: string;
    nombre_Empleado: string;
    apellido_Empleado: string;
    username_Empleado: string;
    rol_Empleado: Rol;
    email_Empleado: string;
    telefono_Empleado: number;
    localidad_Empleado: string;
    calle_Empleado: string;
    nro_direccion_Empleado: number;
    contraseña_Empleado: string;
    contraseña_Empleado2: string;

}

