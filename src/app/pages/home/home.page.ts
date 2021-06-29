import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { asapScheduler } from 'rxjs';
import { User } from 'src/app/entities/user';
import { Usuario } from 'src/app/entities/usuario';
import { EmailService } from 'src/app/services/email.service';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from '../../services/spinner.service';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { ChatService } from 'src/app/services/chat.service';
import { AlertService } from 'src/app/services/alert.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  public folder: string;
  mostrarChat: boolean = true;
  usuarioLogueado: User = new User();
  constructor(
    private activatedRoute: ActivatedRoute,
    public spinnerService:SpinnerService,
    private emailjs: EmailService,
    public notification: NotificationService,
    private loginSvc: LoginService,
    private modal: ModalController,
    public chatSvc:ChatService,
    public alerta: AlertService,
    private userSvc: UsersService,
    public router: Router
    
    ) { 
    
  }
  ngOnInit() {
    this.loginSvc.usuarioLogueado.then(usr=>{
      this.usuarioLogueado = usr;
      console.log(this.usuarioLogueado)
    });
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');    
    
  }
  enviarMail(){
    let usuario:User= {
      uid: '1',
      displayName: 'Santi Prueba',
      email: 'santigonzalez05@gmail.com',
      photoURL: 'asd',
      dni:'12345678',
      emailVerified: true
    }
    this.emailjs.sendEmail(usuario,'El usuario ha sido activado');
  }
  pruebaPush(rol:string){
    let asd = this.notification.push('Prueba','Prueba de notificacion dueño',rol)
      // 'Prueba','Mensaje de prueba de notificacion','f-qKC5rVQ-KeBkNLqvSUq_:APA91bEd9wqRsArjRtyNu1vfSsbT2Da41etS3JbBHuYRmj3znBneUTyCBEraFMJ-udE2v0WGZ8sLY2Ez0VVzdlyb5tnuCclYkILRIsxsO_X2ETZTYNi1G7wvJ5dUKb5wSyYBN1fH0zcT'
    console.log(asd);
  }
}

