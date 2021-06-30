import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Estado, Pedido } from 'src/app/entities/pedido';
import { EstadoProducto, Producto } from 'src/app/entities/producto';
import { User } from 'src/app/entities/user';
import { clienteEstado } from 'src/app/enums/clienteEstados';
import { AlertService } from 'src/app/services/alert.service';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';
import { MesasService } from 'src/app/services/mesas.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  productos:Producto[] = [];
  total:number = 0;
  productoAgregado: Producto[] = [];
  disableBotonQuitar:boolean = true;
  slideOptsOne: any;
  pedido: Pedido  = new Pedido();
  tiempoElaboracion: number = 0;
  mesaUid:string = '';
  nombreMesa:string = '';
  usuarioLogueado:User = new User();
  constructor(
    private productoSvc:MenuService,
    public chatSvc:ChatService,
    public alerta: AlertService,
    private loginSvc: LoginService,
    private userSvc: UsersService,
    private push: NotificationService,
    private mesaSvc: MesasService,
    private spinner: SpinnerService
  ) {
    this.loginSvc.usuarioLogueado.then(usr=>{
      this.usuarioLogueado = usr;
      console.log(this.usuarioLogueado);
    });


    this.productoSvc.getAllProductos().pipe(first())
    .toPromise()
    .then(producto=>{
      this.mesaSvc.mesas.subscribe(mesas=>{
        mesas.forEach(mesa=>{
          if(this.usuarioLogueado.uid == mesa.uid){
            this.mesaUid = mesa.id;
            this.nombreMesa = mesa.nombre;
            console.log(mesa.nombre)
            console.log(this.mesaUid)
          }
        })
      })
      this.productos = producto;
    })
    this.slideOptsOne = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay: true
    };
    // this.productos = this.productoSvc.productos;
   }

  ngOnInit() {
    
  }
  
  
  agregarProductoLista(producto: Producto){
    
    this.disableBotonQuitar = false;
    producto.estadoProducto = EstadoProducto.PENDIENTE;
    this.productos.forEach(prod => {
      if(Object.is(prod,producto)){
        producto.cantidad +=1;
        
      }
    });
    for(let productoAgreg of this.productoAgregado){
      if(Object.is(productoAgreg,producto)){
        
        var index = this.productoAgregado.indexOf(producto);
        if (index > -1) {
          this.productoAgregado.splice(index, 1);
          
          break;
        }
      }
    }
    if(this.tiempoElaboracion <= producto.tiempoPromedioElaboracion){
      this.tiempoElaboracion = producto.tiempoPromedioElaboracion;

    }
    this.productoAgregado.push(producto);
    this.total += producto.precio;
    
    console.log(this.total)
    console.log(this.productoAgregado)
    console.log(this.tiempoElaboracion)

    
  }
  quitarProductoLista(producto: Producto){
    // this.productos.forEach(prod => {
    //   if(Object.is(prod,producto)){
    //     if(prod.cantidad> 0){
    //       prod.cantidad -=1;
          
    //     }
    //     if(prod.cantidad == 0)
    //       this.disableBotonQuitar = true;
        
    //   }
    // });

    this.productoAgregado.forEach(productoAux => {
      if(Object.is(productoAux,producto)){
        if(productoAux.cantidad >= 0){
          
          var index = this.productoAgregado.indexOf(productoAux);
          productoAux.cantidad -=1;
          if (index > -1) {
            if(productoAux.cantidad == 0)
            this.productoAgregado.splice(index, 1);
            this.total -= productoAux.precio;
            
            return
          }

        }
        else{
          this.tiempoElaboracion = producto.tiempoPromedioElaboracion;
        }
        

      }
    });
    if(this.total == 0){

        this.tiempoElaboracion = 0;
      
    }

    console.log(this.tiempoElaboracion)
    console.log(this.productoAgregado);
  }

  enviarPedido(){
    this.spinner.mostrarSpinner();
    this.pedido = {
      estadoPedido: Estado.PENDIENTE,
      producto: this.productoAgregado,
      tiempoElaboracionFinal: this.tiempoElaboracion,
      precioFinal: this.total,
      uid:this.usuarioLogueado.uid,
      uidCliente: this.usuarioLogueado.uid,
      uidMesa: this.mesaUid,
      nombreMesa: this.nombreMesa
    }
    this.usuarioLogueado.estado = clienteEstado.ESPERANDO_PEDIDO;
    this.userSvc.update(this.usuarioLogueado);
    this.productoSvc.addPedido(this.pedido).then( r => {
      this.spinner.ocultarSpinner();
      this.push.push('Cocina','Pedidos pendientes de elaboración','cocinero')
      this.alerta.showSucess('El mozo confirmara tu pedido','Aviso!','dashboard/pagina-espera-elaboracion')
    });
  }



}
