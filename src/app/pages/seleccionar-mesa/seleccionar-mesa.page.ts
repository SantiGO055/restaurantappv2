import { Component, OnInit } from '@angular/core';
import { Turno } from '../../entities/turno';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { ToastService } from '../../services/toast.service';
import { EmailService } from '../../services/email.service';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';
import { TurnosService } from '../../services/turnos.service';
import { SysError } from '../../entities/sysError';
import { Mesa } from '../../entities/mesa';
import { Observable } from 'rxjs';
import { MesasService } from '../../services/mesas.service';

@Component({
  selector: 'app-seleccionar-mesa',
  templateUrl: './seleccionar-mesa.page.html',
  styleUrls: ['./seleccionar-mesa.page.scss'],
})
export class SeleccionarMesaPage implements OnInit {

  turno:Turno;
  mesas:Observable<Mesa[]>; 

  constructor(
    public turnosService: TurnosService,
    public loginService: LoginService,
    public usersService: UsersService,
    public emailService: EmailService,
    public toastService:ToastService,
    private spinnerService:SpinnerService,     
    private routeAct: ActivatedRoute,
    private route: Router,
    private mesasService:MesasService,
  ) { 
    this.turno = null;    
     this.routeAct.params.subscribe(params => {
      const id = params['id']; 
      this.cargarTurno(id);
    });
    //
    this.mesas = this.mesasService.mesas;
  }

  async cargarTurno(turnoId:string){
    this.turno = await this.turnosService.getOneById(turnoId);
  }
  ngOnInit() {
  }
  
  volverALista(){
    this.route.navigateByUrl('/dashboard/lista-espera');
  }

  async asignarMesa(mesa:Mesa){        
    try{
      this.spinnerService.mostrarSpinner();      
      await this.usersService.moverATomandoMesa(this.turno.uid);     
      await this.mesasService.asignarMesaPorTurno(mesa,this.turno);
      await this.turnosService.aceptarCliente(mesa,this.turno)
      this.spinnerService.ocultarSpinner();        
      this.toastService.presentSuccess('El usuario puede pasar a su mesa.');
    }catch(error){
      this.toastService.presentDanger(error);
    }
  }


}
