import { Pipe, PipeTransform } from '@angular/core';
import { Estado } from './entities/pedido';

@Pipe({
  name: 'estado'
})
export class EstadoPedidoPipe implements PipeTransform {

  transform(value: any): string {
    let result = '';

    switch(value){
      case Estado.ENPREPARACION:
        result = 'En preparación';
        break;
      case Estado.PAGOCONFIRMADO:
        result = 'Pago confirmado';
        break;
      case Estado.PENDIENTEPAGO:
        result = 'Pendiente de pago';
        break;
      default:
        result = value[0].toLocaleUpperCase() + value.substring(1).toLocaleLowerCase();
    }

    return result;
  }

}
