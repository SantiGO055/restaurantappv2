import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';
import { LectorQRMesaService } from '../../services/lectorqrmesa.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { Estado, Pedido } from '../../entities/pedido';
import { MenuService } from '../../services/menu.service';
import { environment } from '../../../environments/environment.prod';
import { clienteEstado } from 'src/app/enums/clienteEstados';

@Component({
  selector: 'app-pagina-espera-elaboracion',
  templateUrl: './pagina-espera-elaboracion.page.html',
  styleUrls: ['./pagina-espera-elaboracion.page.scss'],
})
export class PaginaEsperaElaboracionPage implements OnInit {

  usuarioLogueado:User = new User();  

  constructor(
    public lectorqrService:LectorQRMesaService,    
    public loginService:LoginService,
    public userService:UsersService,    
    public router:Router,
  ) {
    this.loginService.usuarioLogueado.then(usr=>{
      this.usuarioLogueado = usr;            
    });
  }

  //en esta pagina se ve los botones de encuesta o de scanear eq

  ngOnInit() {    
    if(this.usuarioLogueado.estado = clienteEstado.CONSUMIENDO){
      this.router.navigate(['/dashboard/pagina-espera-cierre']);
    }
    
  }

  ngAfterViewInit() {
    this.lectorqrService.preapare();    
  }    

  async escanearQr()
  {
    const mesaId = await this.lectorqrService.escanear();                   
    //esto si bien tras el resultado de la mesa esta asociado al uid del usuario en la mesa 
    if(mesaId){          
      this.irAResumenPedido();
    }
  }

  testEscanearQRMesa1(){
    this.irAResumenPedido();
  }
    
  deternerScaner(){
    this.lectorqrService.stopScan();
  }  

  irAResumenPedido(){        
    this.router.navigate(['/dashboard/resumen-pedido']);
  }

  get showTestButton():boolean{
    return environment.testButtons;
  }

}
