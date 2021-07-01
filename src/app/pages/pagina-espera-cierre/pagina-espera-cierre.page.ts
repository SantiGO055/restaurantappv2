import { Component, OnInit } from '@angular/core';
import { LectorQRMesaService } from '../../services/lectorqrmesa.service';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Estado, Pedido } from 'src/app/entities/pedido';
import { MenuService } from 'src/app/services/menu.service';
import { AlertService } from 'src/app/services/alert.service';
import { MesasService } from 'src/app/services/mesas.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-pagina-espera-cierre',
  templateUrl: './pagina-espera-cierre.page.html',
  styleUrls: ['./pagina-espera-cierre.page.scss'],
})
export class PaginaEsperaCierrePage implements OnInit {
  mostrarEncuesta:boolean;
  pedido: Pedido = new Pedido();
  constructor(
    public lectorqrService:LectorQRMesaService,    
    public loginService:LoginService,
    public userService:UsersService,
    public router:Router,
    private pedidoSvc : MenuService,
    private alertSvc: AlertService,
    private mesaSvc: MesasService,
    private toast: ToastService
  ) {       
    this.mostrarEncuesta = false;
  }
  public get Estado(): typeof Estado {
    return Estado; 
  }


  //en esta pagina se ve los botones de encuesta o de scanear eq



  ngOnInit() {  
    this.loginService.usuarioLogueado.then(usr=>{
      this.pedidoSvc.pedidos.subscribe(pedidos=>{
        console.log(pedidos)
        for(let pedido of pedidos){
          if(pedido.uidCliente == usr.uid){
            console.log(pedido.uidCliente)
            console.log(usr.uid)
            this.pedido = pedido;
            this.mostrarEncuesta = !usr.completoEncuesta;
          }
          break;
        }
      })
      
    });
  }

  protected redireccionarResumenPedido(){
    this.router.navigateByUrl('/dashboard/resumen-pedido');
  }

  ngAfterViewInit() {
    this.lectorqrService.preapare();    
  }    

  async escanearQr()
  {
    const mesaId = await this.lectorqrService.escanear();
    this.redireccionarAFactura();
  }
  testEscanearQRMesa1(){
    this.redireccionarResumenPedido();
  }
  testEscanearQRMesa2(){
    this.redireccionarResumenPedido();
  }
  testEscanearQRMesa3(){
    this.redireccionarResumenPedido();
  }

  redireccionarAFactura(){
    this.router.navigateByUrl('/dashboard/factura');
  }
  
  
  deternerScaner(){
    this.lectorqrService.stopScan();
  }  

  irAEncuesta(){
    //@todo en la version larga aca hiria a juegos
    this.router.navigateByUrl('/dashboard/encuesta');
  }
  irAResultadosEncuesta(){
    //@todo en la version larga aca hiria a juegos
    this.router.navigateByUrl('/dashboard/resultado-encuesta');
  }

  

  pedirCuenta(){
    
    this.pedido.estadoPedido = Estado.APAGAR;
    this.pedidoSvc.updatePedido(this.pedido).then(()=>{
      this.alertSvc.showSucess('El mozo confirmara tu pago','Aviso','dashboard/factura');
    });
  }

}
