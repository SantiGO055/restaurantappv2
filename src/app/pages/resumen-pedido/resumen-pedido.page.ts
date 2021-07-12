import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { Estado, Pedido } from '../../entities/pedido';
import { EstadoProducto } from 'src/app/entities/producto';
import { AlertService } from 'src/app/services/alert.service';
import { MesasService } from 'src/app/services/mesas.service';
import { clienteEstado } from 'src/app/enums/clienteEstados';

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
    private pedidoSvc: MenuService,
    private alert: AlertService,
  ) {        
    this.loginService.usuarioLogueado.then(usr=>{
      this.usuarioLogueado = usr;                  
      this.productoSvc.getAllPedidos().subscribe(pedidos=>{
        pedidos.forEach(pedido=>{          
          if(pedido.uidCliente == this.usuarioLogueado.uid){         
            this.productoSvc.getPedidoByUId(pedido.uid).then(pedido => {                                     
               if(!pedido){                 
                 console.log('reenviar a pagina-espera');
                 this.router.navigateByUrl('/dashboard/pagina-espera-elaboracion');
               }else{
                 this.pedido = pedido;
               }
            });       
          }
        })
      })
    });
  }
  
  public get Estado(): typeof Estado {
    return Estado; 
  }

  ngOnInit() {
  }

  confirmarPedido(){
    this.pedido.estadoPedido = Estado.CONFIRMADO;
    this.usuarioLogueado.estado = clienteEstado.CONSUMIENDO;
    this.pedidoSvc.updatePedido(this.pedido).then(()=>{
      this.userService.update(this.usuarioLogueado);
      this.alert.showSucess('','Disfruta de tu pedido','/dashboard/pagina-espera-cierre');
    })
    
  }



  irAEncuesta(){    
    this.router.navigateByUrl('/dashboard/encuesta');
  }

  irAResultadosEncuesta(){    
    this.router.navigateByUrl('/dashboard/resultados-encuesta');
  }


  volverAEspera(){
    this.router.navigateByUrl('/dashboard/pagina-espera-elaboracion');
  }

  volverAEsperaCierre(){
    this.router.navigateByUrl('/dashboard/pagina-espera-cierre');
  }
  
}
