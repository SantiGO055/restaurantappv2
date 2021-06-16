import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Estado, Pedido } from 'src/app/entities/pedido';
import { User } from 'src/app/entities/user';
import { Rol } from 'src/app/enums/rol';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-listadopedido',
  templateUrl: './listadopedido.page.html',
  styleUrls: ['./listadopedido.page.scss'],
})
export class ListadopedidoPage implements OnInit {
  usuarioLogueado: User;
  constructor(
    private pedidosSvc: MenuService,
    private loginSvc: LoginService,
    private userSvc: UsersService
  ) { }

  pedidos: Pedido[] = [];
  ngOnInit() {
    this.loginSvc.usuarioLogueado.then(usr=>{
      this.usuarioLogueado = usr;
    });
    this.pedidosSvc.getAllPedidos().pipe(first())
    .toPromise()
    .then(pedidos=>{
      
      this.pedidos = pedidos;
    })
    
   }
   aceptarPedido(pedido: Pedido){
     pedido.estadoPedido = Estado.CONFIRMADO;
    this.pedidosSvc.updatePedido(pedido);
   }
  

}
