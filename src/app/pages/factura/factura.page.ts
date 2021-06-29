import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../entities/pedido';
import { User } from '../../entities/user';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {

  

  usuarioLogueado:User = new User();
  pedido:Pedido = new Pedido();

  constructor(    
    public loginService:LoginService,
    public userService:UsersService,
    public productoSvc:MenuService,
    public router:Router,
  ) {
    
    this.loginService.usuarioLogueado.then(usr=>{
      this.usuarioLogueado = usr;            
      this.productoSvc.getAllPedidos().subscribe(pedidos=>{
        pedidos.forEach(pedido=>{
          if(pedido.uidCliente == this.usuarioLogueado.uid){
            this.productoSvc.getPedidoByUId(pedido.uid).then(pedido => {         
               if(!pedido){
                 this.router.navigateByUrl('dashboard/pagina-espera-elaboracion');
               }else{
                 this.pedido = pedido;
               }
            });       

          }
        })
      })
    });
  }

  ngOnInit() {
  }

}
