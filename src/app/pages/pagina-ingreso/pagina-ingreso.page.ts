import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { LoginService } from '../../services/login.service';
import { Cliente } from '../../entities/cliente';
import { Turno } from '../../entities/turno';
import { User } from '../../entities/user';
import {  LectorQrListaEsperaService } from '../../services/lectorqrlistaespera.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { SysError } from '../../entities/sysError';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { AlertService } from '../../services/alert.service';
import { takeUntil } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { MesasService } from '../../services/mesas.service';
import { NotificationService } from 'src/app/services/notification.service';
import { clienteEstado } from '../../enums/clienteEstados';

@Component({
  selector: 'app-pagina-ingreso',
  templateUrl: './pagina-ingreso.page.html',
  styleUrls: ['./pagina-ingreso.page.scss'],
})
export class PaginaIngresoPage implements OnInit {
  
  enListaEspera:boolean;
  turno:Observable<Turno>;
  usuarioLogueado:User = new User();

  constructor(
    public lectorqrService:LectorQrListaEsperaService,
    public turnosService:TurnosService,
    public loginService:LoginService,
    public userService:UsersService,
    public mesasService:MesasService,
    public router:Router,    
    public alerta: AlertService,
    private push: NotificationService
  ) {       
    this.enListaEspera = false;        
    this.loginService.usuarioLogueado.then(usr=>{
      this.usuarioLogueado = usr;
    });
  }

  //en esta pagina se ve los botones de encuesta o de scanear eq

  ngOnInit() {   
  }

  ngAfterViewInit() {
    this.lectorqrService.preapare();    
  }    

  async escanearQr()
  {
    const resultado = await this.lectorqrService.escanear();                       
    this.procesarLecturaQR();
  }

protected procesarLecturaQR(){  
  if(this.usuarioLogueado.estado == clienteEstado.VISITO_HOY ){
      this.router.navigateByUrl('/dashboard/resultados-encuesta');
  }else{
    this.agregarAListaEspera();      
  }      
}

  async testQRValido(){
    this.procesarLecturaQR();
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }  

  irAResultadosEncuestas(){
    this.router.navigateByUrl('/dashboard/resultados-encuesta');
  }

  async agregarAListaEspera(){        
    this.enListaEspera = true;    
    const user = await this.loginService.actualUser(); 
    const cliente = Cliente.fromUser(user);
    this.userService.moverAListaEspera(cliente.uid);
    const turno = Turno.fromUser(cliente);   
    const turnoId = this.turnosService.getNewId();
    this.turnosService.save(turno,turnoId).then(
      r => {
          this.push.push('Lista de espera','El cliente ' + user.displayName + ' se encuentra en lista de espera','maitre')
          const a = this.turnosService.valueChange(turnoId).subscribe(
            async (turno:Turno) => {
              if(turno.aceptado === true){
                  this.enListaEspera = false;                    
                  a.unsubscribe();
                  const mesa = await this.mesasService.getOneById(turno.mesa);
                  this.alerta.showSucess(`Le han asignado la mesa ${mesa.nombre} por favor escane su QR`,'Ya podes pasar','/dashboard/asignacion-mesa')                    
              }
            }
          )
        }
      );        
  }

}
