import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Producto } from 'src/app/entities/producto';
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
  constructor(
    private productoSvc:MenuService,
    public chatSvc:ChatService

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
  asd={
    descripcion: "Doble carne 180g, queso cheddar",
    foto: "https://hamburguesa.net/wp-content/uploads/carne_rellena_con_queso_cheddar-1024x768.jpg",
    nombre: "Hamburguesa",
    precio: 450.6,
    tiempoPromedioElaboracion: 30,
    tipo: "COMIDA",
    uid: "fRFCuzHGDOSpIQeQURd8",
    empleadoPrepara:{
      displayName:"Cocinero 1",
      email: "avillucas+cocinero1@gmail.com",
      emailVerified: false,
      photoUrl: "https://firebasestorage.googleapis.com/v0/b/restauranteapp-bffc6.appspot.com/o/img_1623015816557.png?alt=media&token=db8be8af-acac-416d-94aa-1a40ae87d7de",
      rol: "cocinero",
      uid: "Y73PxpMoEEUJqdaSEsA7xEdASqz2",

    }
  }
  agregarProductoLista(producto: Producto){
    this.disableBotonQuitar = false;
    this.productos.forEach(prod => {
      if(Object.is(prod,producto)){
        prod.cantidad +=1;
      }
    });
    this.productoAgregado.push(producto);
    this.total += producto.precio;
    console.log(this.productoAgregado)
  }
quitarProductoLista(producto: Producto){
  this.productos.forEach(prod => {
    if(Object.is(prod,producto)){
      if(prod.cantidad> 0){
        prod.cantidad -=1;

      }
      if(prod.cantidad == 0)
        this.disableBotonQuitar = true;
      
    }
  });

  this.productoAgregado.forEach(productoAux => {
    if(Object.is(productoAux,producto)){
      var index = this.productoAgregado.indexOf(producto);
      if (index > -1) {
        this.productoAgregado.splice(index, 1);
        this.total -= producto.precio;
        return
      }

    }
  });
  console.log(this.productoAgregado);
}


}
