import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Estado, Pedido } from 'src/app/entities/pedido';
import { User } from 'src/app/entities/user';
import { Rol } from 'src/app/enums/rol';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';
import { MesasService } from 'src/app/services/mesas.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-listadopedido',
  templateUrl: './listadopedido.page.html',
  styleUrls: ['./listadopedido.page.scss'],
})
export class ListadopedidoPage implements OnInit {
  usuarioLogueado: User = new User();
  mesa
  constructor(
    private pedidosSvc: MenuService,
    private loginSvc: LoginService,
    private userSvc: UsersService,
    private mesaSvc: MesasService,
    private push: NotificationService,
    private spinner: SpinnerService,
    private alert: AlertService
  ) { }
  public get Estado(): typeof Estado {
    return Estado; 
  }
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
     pedido.estadoPedido = Estado.ENPREPARACION;
    this.pedidosSvc.updatePedido(pedido).then(()=>{
      this.pedidos.forEach(producto=>{
        producto.producto.forEach(prod => {
          console.log("Producto " + prod.nombre)
          this.push.push('Pedido pendiente','El pedido ' + prod.nombre + ' esta pendiende de preparacion',prod.empleadoPrepara.rol)
        });
      });

    });
   }
   entregarPedido(pedido: Pedido){
    this.spinner.mostrarSpinner();
    pedido.estadoPedido = Estado.ENTREGADO;
    this.pedidosSvc.updatePedido(pedido).then(()=>{
      this.spinner.ocultarSpinner();
      this.alert.showSucess('Pedido entregado al cliente','Aviso','dashboard/home')

    })
   }
   confirmarPago(pedido: Pedido){
     this.userSvc.getOne(pedido.uidCliente).then(usr=>{
       this.alert.showAlertYesNoHTML('Confirmar pago','<div><p>El pedido de la mesa '+ pedido.nombreMesa+'</p><p>Precio: $'+ pedido.precioFinal +'</p><p>Cliente: '+ usr.displayName + '</p></div>').then(ok=>{
        console.log(ok)
        if(ok){
          this.spinner.mostrarSpinner();
          pedido.estadoPedido = Estado.PENDIENTEPAGO;
          this.pedidosSvc.updatePedido(pedido).then(()=>{
            this.spinner.ocultarSpinner();
            this.alert.showSucess('El cliente ya puede realizar el pago','Aviso','dashboard/home')

          })
        }
        else{

        }
       })
        
      
      
    })
    
    
    
   }
  

}
