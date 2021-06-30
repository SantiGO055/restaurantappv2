import { Producto, ProductoTipo } from "./producto";
import { User } from "./user";

export class Pedido {
    uid?: string;
    uidCliente: string;
    producto: Producto[];
    tiempoElaboracionFinal: number;
    estadoPedido: Estado;
    precioFinal:number;
    uidMesa?:string;
    nombreMesa?:string;
    todoListo?: boolean;
    propina?: number;
}

export enum Estado{
    ENPREPARACION = 'ENPREPARACION',
    LISTO = "LISTO",
    PENDIENTE = "PENDIENTE",
    CONFIRMADO = "CONFIRMADO",
    PREPARADO = 'PREPARADO',
    PAGADO = 'PAGADO',
    ENTREGADO = 'ENTREGADO',
    APAGAR = 'APAGAR',
    PENDIENTEPAGO = 'PENDIENTEPAGO',
    PAGOCONFIRMADO = 'PAGOCONFIRMADO'
}