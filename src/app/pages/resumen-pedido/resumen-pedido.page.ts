import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { Pedido } from '../../entities/pedido';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.page.html',
  styleUrls: ['./resumen-pedido.page.scss'],
})
export class ResumenPedidoPage implements OnInit {


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
       this.productoSvc.getPedidoByUId(this.usuarioLogueado.uid).then(pedido => {         
          if(!pedido){
            this.router.navigateByUrl('dashboard/pagina-espera-elaboracion');
          }else{
            this.pedido = pedido;
          }
       });       
    });
  }

  ngOnInit() {
  }

}
