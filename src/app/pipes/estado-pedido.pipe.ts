import { Pipe, PipeTransform } from '@angular/core';
import { Estado } from '../entities/pedido';

@Pipe({
  name: 'estado'
})
export class EstadoPedidoPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }    
    let result = '';
    switch(value){
      case Estado.ENPREPARACION.toString():
        result = 'En preparación';
        break;
      case Estado.PAGOCONFIRMADO.toString():
        result = 'Pago confirmado';
        break;
      case Estado.PENDIENTEPAGO.toString():
        result = 'Pendiente de pago';
        break;
      default:
        result = value[0].toLocaleUpperCase() + value.substring(1).toLocaleLowerCase();
    }

    return result;
  }

}
