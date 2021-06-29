import { User } from "./user"

export interface Producto {
    uid: string;
    nombre: string;
    descripcion: string;
    tiempoPromedioElaboracion: number;
    precio: number;
    fotos: string[]
    tipo: ProductoTipo;
    empleadoPrepara: User;
    cantidad?:number;
    estadoProducto: EstadoProducto;
}

export enum ProductoTipo{
    COMIDA = 'COMIDA',
    BEBIDA = "BEBIDA"
}
export enum EstadoProducto{
    PENDIENTE = 'PENDIENTE',
    LISTO = 'LISTO'
}