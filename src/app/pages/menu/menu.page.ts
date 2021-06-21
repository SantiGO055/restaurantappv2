import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Estado, Pedido } from 'src/app/entities/pedido';
import { Producto } from 'src/app/entities/producto';
import { AlertService } from 'src/app/services/alert.service';
import { ChatService } from 'src/app/services/chat.service';
import { MenuService } from 'src/app/services/menu.service';

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
  constructor(
    private productoSvc:MenuService,
    public chatSvc:ChatService,
    public alerta: AlertService

  ) {
    this.productoSvc.getAllProductos().pipe(first())
    .toPromise()
    .then(producto=>{
      
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

    this.pedido = {
      estadoPedido: Estado.PENDIENTE,
      producto: this.productoAgregado,
      tiempoElaboracionFinal: this.tiempoElaboracion,
      precioFinal: this.total
    }
    console.log(this.productoAgregado);
    this.alerta.showSucess('Tu pedido esta pendiente','Aviso!','dashboard/listadopedido')
      this.productoSvc.addPedido(this.pedido);
      
  }



}
