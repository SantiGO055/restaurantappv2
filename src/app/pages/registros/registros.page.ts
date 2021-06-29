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

  registros:Registro[] = [];    

  constructor(
    public registroService: RegistrosService,
    public loginService: LoginService,
    public usersService: UsersService,
    public emailService: EmailService,
    public toastService:ToastService,
    private spinnerService:SpinnerService,
  ) {        
 


  }

  ngOnInit() {
    this.spinnerService.mostrarSpinner();    
    this.registroService.registros.subscribe( registros=> {
      this.registros =  registros;  
      console.log(this.registros)    
      this.spinnerService.ocultarSpinner();
    });   
  }

  rechazarRegistro(registro: Registro) {
  
    registro.aprobado = false;
    this.registroService.save(registro, registro.id).then( response =>{      
      this.emailService.sendRegistro( registro, 'Lo de tito! Lamentamos tener que rechazar tu solicitud .');            
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
