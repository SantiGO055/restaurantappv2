import { Component, OnInit } from '@angular/core';
import { LectorQRMesaService } from '../../services/lectorqrmesa.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { Mesa } from '../../entities/mesa';
import { Cliente } from '../../entities/cliente';

@Component({
  selector: 'app-asignacion-mesa',
  templateUrl: './asignacion-mesa.page.html',
  styleUrls: ['./asignacion-mesa.page.scss'],
})
export class AsignacionMesaPage implements OnInit {

 
  public mostrarQrMesa:boolean;  

  constructor(
    public lectorqrService:LectorQRMesaService,    
    public loginService:LoginService,
    public router:Router,
  ) {   
    this.mostrarQrMesa = true;
  }

  //en esta pagina se ve los botones de encuesta o de scanear eq

  ngOnInit() {
    this.loginService.loguedUser.subscribe(user=>{
      if(User.puedeAccederMenu(user)){
        // ya lo aceptaron
        this.router.navigateByUrl('/cliente/menu');
      }else{
        //debe esperar 
        this.mostrarQrMesa = User.puedeAccederAsignarMesa(user);      
      }
    })
  }

  ngAfterViewInit() {
    this.lectorqrService.preapare();    
  }    

  async escanearQr()
  {
    this.lectorqrService.escanear().then(
      mesaId => {
         //@todo revisar esto , pero entiendo que pasaria el cliente 
         this.loginService.loguedUser.subscribe(user => {
            const cliente  =  Cliente.fromUser(user);
            //@todo asignar el cliente a la mesa 
             this.mostrarQrMesa = false;  
            // this.router.navigateByUrl('/clientes/asignacion-mesa')      ;                    
          });
      }
    );                       
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }  


}
