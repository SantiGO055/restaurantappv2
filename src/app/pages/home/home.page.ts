import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asapScheduler } from 'rxjs';
import { SysError } from 'src/app/entities/sysError';
import { Usuario } from 'src/app/entities/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { EmailService } from 'src/app/services/email.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  public folder: string;
  pruebaError: SysError = new SysError('Ha ocurrido un error');
  constructor(
    private activatedRoute: ActivatedRoute,
    public spinnerService:SpinnerService,
    private emailjs: EmailService,
    public alert: AlertService
    ) { 
    
  }

  ngOnInit() {
    

    this.spinnerService.mostrarSpinner();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  pruebaEnviarMail(){
    let usuario:Usuario= {
      id: 1,
      name: 'Santi Prueba',
      email: 'santigonzalez05@gmail.com',
      photo: 'asd'
    }
    /** Mando por parametro el usuario de donde va a tomar el mail y el nombre, y el mensaje que contendra el mail */
    this.emailjs.sendEmail(usuario,'El usuario ha sido activado');
  }
}

