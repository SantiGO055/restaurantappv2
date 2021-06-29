import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Estado, Pedido } from 'src/app/entities/pedido';
import { EstadoProducto, Producto } from 'src/app/entities/producto';
import { User } from 'src/app/entities/user';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';
import { MesasService } from 'src/app/services/mesas.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-listado-pedido-cocinero',
  templateUrl: './listado-pedido-cocinero.page.html',
  styleUrls: ['./listado-pedido-cocinero.page.scss'],
})
export class ListadoPedidoCocineroPage implements OnInit {

  usuarioLogueado: User = new User();
  pedidoListo = false;
  mesa
  pedidosListos: string[] = [];
  constructor(
    private loginSvc: LoginService,
    private userSvc: UsersService,
    private mesaSvc: MesasService,
    private push: NotificationService,
    private spinner: SpinnerService,
    private alert: AlertService,
    private pedidosSvc: MenuService
  ) {
    
   }
  
  productos: Producto[] = [];
  pedidos: Pedido[] = [];

  public get EstadoProducto(): typeof EstadoProducto {
    return EstadoProducto; 
  }
  public get EstadoPedido(): typeof Estado {
    return Estado; 
  }

  ngOnInit() {
    
    // this.pedidosSvc.getAllPedidos().subscribe(pedidos=>{
    //   var count = 0;
    //   console.log(pedidos);
    //   pedidos.forEach(pedido => {
    //     pedido.producto.forEach(prod=>{
    //       if(prod.estadoProducto == EstadoProducto.LISTO){
    //         count++;
    //       }
    //     })
    //     console.log(pedido.producto.length);
    //       console.log(count)
    //     if(pedido.producto.length == count){
    //       console.log("todo ok")
    //       // pedido.todoListo = true;
    //       // this.pedidosSvc.updatePedido(pedido);
    //       this.pedidosListos.push(pedido.uid)
    //       this.pedidoListo = true;
    //     }
    //   });
    // })
    this.loginSvc.usuarioLogueado.then(usr=>{
      this.usuarioLogueado = usr;
    });
    this.pedidosSvc.getAllPedidos().pipe(first())
    .toPromise()
    .then(pedidos=>{
      this.pedidos = pedidos;
      pedidos.forEach(pedido=>{
        pedido.producto.forEach(prod=>{
          if(prod.empleadoPrepara.uid == this.usuarioLogueado.uid){
            this.productos.push(prod);
          }

        })
      })
      
      
    })
    
    
    
   }
   prepararProducto(producto: Producto){
    
    producto.estadoProducto = EstadoProducto.LISTO;
    console.log(producto)
    this.pedidos.forEach(pedido => {
      var count = 0;
      pedido.producto.forEach(prod => {
        if(prod.uid == producto.uid){
          this.pedidosSvc.updatePedido(pedido).then(()=>{
            
            
          })

        }
        if(prod.estadoProducto == EstadoProducto.LISTO){
          count++;
        }
        console.log(pedido.producto.length);
          console.log(count)
        if(pedido.producto.length == count){
          console.log("todo ok")
          pedido.todoListo = true;
          this.pedidosSvc.updatePedido(pedido);
          return;
          
        }
        
      });
    });
    

   }
   entregarPedido(pedido: Pedido){
     this.pedidoListo = false;
     pedido.estadoPedido = Estado.PREPARADO;
     console.log(pedido.estadoPedido)
     this.spinner.mostrarSpinner();
     this.pedidosSvc.updatePedido(pedido).then(()=>{
      this.spinner.ocultarSpinner();
      this.alert.showSucess('El pedido se encuentra listo','Aviso','dashboard/home');
       this.push.push('Aviso de pedido','El pedido se encuentra listo para entregar','mozo');

     });
       

     
   }

}
