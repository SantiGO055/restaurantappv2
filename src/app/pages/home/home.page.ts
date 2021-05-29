import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asapScheduler } from 'rxjs';
import { Usuario } from 'src/app/entities/usuario';
import { EmailService } from 'src/app/services/email.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  public folder: string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    public spinnerService:SpinnerService,
    private emailjs: EmailService
    ) { 
    
  }

  ngOnInit() {
    this.spinnerService.mostrarSpinner();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  enviarMail(){
    let usuario:Usuario= {
      id: 1,
      name: 'Santi Prueba',
      email: 'asd@asd.asd',
      photo: 'asd'
    }
    this.emailjs.sendEmail(usuario,'El usuario ha sido activado');
  }
}

