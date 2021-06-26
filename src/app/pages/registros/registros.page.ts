import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../../services/registros.service';
import { Registro } from '../../entities/registro';
import { UsersService } from '../../services/users.service';
import { User } from '../../entities/user';
import { SysError } from '../../entities/sysError';
import { EmailService } from '../../services/email.service';
import { LoginService } from '../../services/login.service';
import { Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {

  registros:Observable<Registro[]>;
  registrosPendientes:Observable<Registro[]>;

  constructor(
    public registroService: RegistrosService,
    public loginService: LoginService,
    public usersService: UsersService,
    public emailService: EmailService,
    public toastService:ToastService,
    private spinnerService:SpinnerService,
  ) {
    this.registros = this.registroService.registros;    
  }

  ngOnInit() {}

  rechazarRegistro(registro: Registro) {
    this.spinnerService.mostrarSpinner();    
    this.registroService.save(registro, registro.id).then( response =>{      
      this.emailService.sendRegistro( registro, 'Bienvenido a Lo de tito! lamentamos tener que rechazar tu solicitud .');
      console.log(registro.id);
      this.registroService.delete(registro.id);
      this.spinnerService.ocultarSpinner();
      this.toastService.presentSuccess('Se nego el usuario correctamente.');
    });
  }

  aceptarRegistro(registro: Registro) {
    this.spinnerService.mostrarSpinner();
    const user = User.fromRegistro(registro);
    this.loginService
      .registerUser(user, registro.password)
      .then((user) => {
        this.usersService
          .save(user, user.uid)
          .then((response) => {                
            console.log(registro.id)        ;
            this.registroService.delete(registro.id).then( r=> {
              this.emailService.sendEmail( user, 'Bienvenido a Lo de tito! ya tenes tu cuenta de usuario.');            
              this.spinnerService.ocultarSpinner();
              this.toastService.presentSuccess('El usuario se creo correctamente');
            });
            
            
          })
          .catch((error) => {
            throw new SysError('No pudo crearse el usuario en base al registro.');
          });
      })
      .catch((error) => {
        throw new SysError('No pudo autenticarse al nuevo usuario.');
      });
  }
}
