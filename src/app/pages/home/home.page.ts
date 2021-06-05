import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asapScheduler } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { User } from 'src/app/entities/user';
import { Usuario } from 'src/app/entities/usuario';
import { EmailService } from 'src/app/services/email.service';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from '../../services/spinner.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  public folder: string;
  users : User[];
  tokenDuenio: string[] = [];
  tokenCocinero: string[] = [];
  userLogueado:User;
  constructor(
    private activatedRoute: ActivatedRoute,
    public spinnerService:SpinnerService,
    private emailjs: EmailService,
    public notification: NotificationService,
    private loginSvc: LoginService,
    private userSvc: UserService
    ) { 
    
  }

  ngOnInit() {
    this.spinnerService.mostrarSpinner();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.userSvc.getAllUsers().subscribe((users : User[])=>{
      this.users = users;
      console.log(users);
      this.users.forEach(userCollection => {
        this.loginSvc.user$.subscribe(user=>{
          if(user.uid == userCollection.uid){
            this.userLogueado = user;
          }
        });

        if(userCollection.email == 'avillucas+cocinero1@gmail.com'){
          this.tokenCocinero.push(userCollection.tokenNotification.value);
        }
      });
    })

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
  pruebaPushCocinero(){
    this.tokenCocinero.forEach(token => {
      let asd = this.notification.push('Prueba','Mensaje de prueba de notificacion',token);
      console.log(asd);
      
    });
  }
}

