import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asapScheduler } from 'rxjs';
import { Usuario } from 'src/app/entities/usuario';
import { EmailService } from 'src/app/services/email.service';
import { NotificationService } from 'src/app/services/notification.service';
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
    private emailjs: EmailService,
    public notification: NotificationService
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
      email: 'santigonzalez05@gmail.com',
      photo: 'asd'
    }
    this.emailjs.sendEmail(usuario,'El usuario ha sido activado');
  }
  pruebaPush(){
    let asd = this.notification.push('Prueba','Mensaje de prueba de notificacion','f-qKC5rVQ-KeBkNLqvSUq_:APA91bEd9wqRsArjRtyNu1vfSsbT2Da41etS3JbBHuYRmj3znBneUTyCBEraFMJ-udE2v0WGZ8sLY2Ez0VVzdlyb5tnuCclYkILRIsxsO_X2ETZTYNi1G7wvJ5dUKb5wSyYBN1fH0zcT')
    console.log(asd);
  }
}

