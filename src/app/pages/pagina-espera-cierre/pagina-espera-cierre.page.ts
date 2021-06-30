import { Component, OnInit } from '@angular/core';
import { LectorQRMesaService } from '../../services/lectorqrmesa.service';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Estado, Pedido } from 'src/app/entities/pedido';
import { MenuService } from 'src/app/services/menu.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-pagina-espera-cierre',
  templateUrl: './pagina-espera-cierre.page.html',
  styleUrls: ['./pagina-espera-cierre.page.scss'],
})
export class PaginaEsperaCierrePage implements OnInit {

  pedido: Pedido = new Pedido();
  constructor(
    public lectorqrService:LectorQRMesaService,    
    public loginService:LoginService,
    public userService:UsersService,
    public router:Router,
    private pedidoSvc : MenuService,
    private alertSvc: AlertService
  ) {       
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
    //esto si bien tras el resultado de la mesa esta asociado al uid del usuario en la mesa 
    if(mesaId){    
      this.solicitarMenuMesa(mesaId);
    }
  }
  testEscanearQRMesa1(){
    this.solicitarMenuMesa('xkbC3DQSKxibJ9KzAOG2');
  }
  
  protected solicitarMenuMesa(mesaId){
    this.router.navigateByUrl('/dashboard/menu');
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }  

  irAEncuesta(){
    //@todo en la version larga aca hiria a juegos
    this.router.navigateByUrl('/dashboard/encuesta');
  }
  pedirCuenta(){
    //TODO continuar
    this.pedido.estadoPedido = Estado.APAGAR;
    this.pedidoSvc.updatePedido(this.pedido).then(()=>{
      this.alertSvc.showSucess('El mozo confirmara tu pago','Aviso','dashboard/factura');
    });
  }

}
