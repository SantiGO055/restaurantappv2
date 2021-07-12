import { NgModule } from '@angular/core';
import { EstadoPedidoPipe } from '../pipes/estado-pedido.pipe';
import { UserNamePipe } from './user-name.pipe';


@NgModule({
declarations: [UserNamePipe, EstadoPedidoPipe],
imports: [],
exports: [UserNamePipe, EstadoPedidoPipe],
})

export class PipesModule {}