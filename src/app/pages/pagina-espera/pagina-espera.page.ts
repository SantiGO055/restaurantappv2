import { Component, OnInit } from '@angular/core';
import { LectorQrListaEsperaService } from '../../services/lectorqrlistaespera.service';
import { TurnosService } from '../../services/turnos.service';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { LectorQRMesaService } from '../../services/lectorqrmesa.service';

@Component({
  selector: 'app-pagina-espera',
  templateUrl: './pagina-espera.page.html',
  styleUrls: ['./pagina-espera.page.scss'],
})
export class PaginaEsperaPage implements OnInit {

 
  constructor(
    public lectorqrService:LectorQRMesaService,    
    public loginService:LoginService,
    public userService:UsersService,
    public router:Router,
  ) {       
  }

  //en esta pagina se ve los botones de encuesta o de scanear eq

  ngOnInit() {    
  }

  protected redireccionAMesa(){
    this.router.navigateByUrl('/dashboard/asignacion-mesa');
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



}
