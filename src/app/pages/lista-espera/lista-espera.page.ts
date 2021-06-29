import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../entities/turno';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { EmailService } from '../../services/email.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { SysError } from '../../entities/sysError';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  turnos:Turno[];

  constructor(
    public turnosService: TurnosService,
    public loginService: LoginService,
    public usersService: UsersService,
    public emailService: EmailService,
    public toastService:ToastService,
    private spinnerService:SpinnerService,    
    public router:Router,
    public acRouter:ActivatedRoute,
  ) { 
    this.turnosService.turnos.subscribe( turnos=> {
      this.turnos =  turnos.filter( (turnos:Turno)=> { return turnos.aceptado == null  || turnos.aceptado == undefined});      
    });        
  }

  ngOnInit() {
  }

  asignarMesa(turno:Turno){        
    const id = turno.id;    
    this.router.navigate(['dashboard/seleccionar-mesa/',id]);
  }

  eliminarCliente(turno: Turno) {
    this.spinnerService.mostrarSpinner();
    this.turnosService.sacarCliente(turno).then( response => {                              
        this.spinnerService.ocultarSpinner();        
        this.toastService.presentSuccess('El usuario fue eliminado de la lista de espera.');
    }).catch((error) => {
      throw new SysError('No pudo autenticarse al nuevo usuario.');
    });    
  }

}
