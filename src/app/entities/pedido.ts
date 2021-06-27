import { Producto, ProductoTipo } from "./producto";
import { User } from "./user";

export class Pedido {
    uid?: string;
    uidCliente: string;
    producto: Producto[];
    tiempoElaboracionFinal: number;
    estadoPedido: Estado;
    precioFinal:number;
}

export enum Estado{
    ENPREPARACION = 'EN PREPARACION',
    LISTO = "LISTO",
    PENDIENTE = "PENDIENTE",
    CONFIRMADO = "CONFIRMADO"
}