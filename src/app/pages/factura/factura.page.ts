import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../entities/pedido';
import { User } from '../../entities/user';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { LectorQrPropinaService } from '../../services/lectorqrpropina.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
 
  usuarioLogueado:User = new User();
  pedido:Pedido = new Pedido();
  subtotal:number;  
  propina:number;
  total:number;
  propinaAsignada:boolean;

  
  constructor(    
    public loginService:LoginService,
    public userService:UsersService,
    public productoSvc:MenuService,
    public router:Router,
    public lectorqrService:LectorQrPropinaService,    
  ) {
    this.propina = 0;
    this.subtotal = 0;
    this.total = 0;
    this.propinaAsignada = false;
  }

  ngAfterViewInit() {
    this.lectorqrService.preapare();    
  }    

  async escanearQr()
  {
    try{
      const propina = await this.lectorqrService.escanear();                       
      this.asignarPropina(propina);
    }catch(error){
      throw error;
    }    
  }

  asignarPropina(propina:number){
    console.log(propina);
    this.propina = this.pedido.precioFinal*(propina/100)
    this.total = this.subtotal+this.propina;
    this.propinaAsignada= true;
  }

  ngOnInit() {    
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
                 this.subtotal = this.pedido.precioFinal;
                 this.propina = 0;                 
                 this.total = this.subtotal+this.propina;
               }
            });       
          }
        })
      })
    });
  }
  testEscanearQRMalo(){
    this.asignarPropina(0);
  }
  testEscanearQRRegular(){
    this.asignarPropina(5);
  }
  testEscanearQRBueno(){
    this.asignarPropina(10);
  }
  testEscanearQRMuyBueno(){
    this.asignarPropina(15);
  }
  testEscanearQRExcelente(){
    this.asignarPropina(20);
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }  

/**
 * solicitar la cuenta 
 */
  pedirCuenta(){    
    this.productoSvc.marcarAPagar(this.pedido);    
    this.userService.moverEsperandoFactura(this.usuarioLogueado);
    this.router.navigateByUrl('/dashboard/espera-cierre');
  }
}
