
import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/entities/user';
import { Mensaje } from 'src/app/entities/mensaje';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
declare var $:any;
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { EmailService } from 'src/app/services/email.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UsersService } from 'src/app/services/users.service';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mensajeObj: Mensaje = new Mensaje();
  user: User;
  userAux: User;
  mensaje: string = '';
  listadoMensajes?: any[];
  currentIndex = -1;
  title = '';
  isOwnMessage!: boolean;
  ownEmail!: string;
  mostrarChat:boolean;
  localStorageUsername!: string;
  sala4a: string;
  sala4b: string;
  // $:any;
  uid:string = null;

  @ViewChild('scroller') private divMensaje!: ElementRef;
  items:Array<string>=[];



  constructor(private chatSvc: ChatService,
    public loginSvc: LoginService,
    private userSvc: UsersService,
    public viewCtrl: ModalController,
    private spinner: SpinnerService
    
    ) {
      this.cargarMensajes();
      // this.uid = localStorage.getItem('uidLogueado');
     }
  dismiss() {
  this.viewCtrl.dismiss();
  }
  ngAfterViewInit(){
    
      
  }
  ngOnInit(): void {
    
    

    // $(document).ready(function(){
    //   $('[data-toggle="tooltip"]').tooltip();
    // });
    // this.cargarMensajes();
    
    this.loginSvc.isLoggedIn().then(logueado=>{
    console.log(logueado);
    if(logueado != null){
      
      let prom = this.userSvc.getUser(logueado.uid);
      prom.then(usr=>{
        console.log(usr)
        localStorage.setItem('uidLogueado',logueado.uid);
        this.uid = logueado.uid;
        this.user = usr;
        if(this.user.email != null)
        this.ownEmail = this.user.email;
        console.log(this.ownEmail);
        this.isOwnMessage = this.ownEmail === this.user.email;
      });
    }
  })

  this.chatSvc.getAllMensajes().snapshotChanges().subscribe(mensajes=>{
    console.log(mensajes);
  });
    
    
  }
  escondoChat(){
    this.mostrarChat = false;
  }
  muestroChat(event: any){
    
    this.mostrarChat = event;
  }
  scrollToBottom(): void {
    if(this.divMensaje.nativeElement != undefined){

      this.divMensaje.nativeElement.scrollTop = this.divMensaje.nativeElement.scrollHeight;
      console.log(this.divMensaje)

    }
  }
  ngAfterViewChecked() {
    // console.log("afterviewchecked");
    // console.log(this.divMensaje.nativeElement.value);
    this.scrollToBottom();
  }
  // ngAfterViewInit() {
  //   console.log("afterinit");
  //   setTimeout(() => {
  //     this.scrollToBottom();
  //     console.log(this.divMensaje.nativeElement.innerText);
  //   }, 3000);
  // }

  cargarMensajes(): void {
    this.spinner.mostrarSpinner();
      this.chatSvc.getAllMensajes().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val()})
          )
        )
      ).subscribe(data => {
        this.listadoMensajes = data;
        console.log(data)
        this.spinner.ocultarSpinner();
        
      });
    }
  
  // enviarConEnter(e:any){
  //   console.log(e);
  //   if (e.keyCode === 13) {
  //     e.preventDefault();
  //     this.enviarMensaje();
  //   }
  // }
  enviarMensaje(){
    
    
      console.info(this.user);
      if(this.mensaje != ''){
        console.info(this.mensaje);
        this.mensajeObj.mensaje = this.mensaje;
        this.mensajeObj.usuario = this.user;
        this.mensajeObj.hora = this.obtenerFechaHora();
        console.log("envio");
        this.chatSvc.enviarMensaje(this.mensajeObj);

        console.log(this.mensaje);
        // console.log(this.isOwnMessage);
      }
    this.mensaje = '';
  }
  mostrarChatFunc(){
    this.mostrarChat = !this.mostrarChat;
  }
  enviarMensajeConEnter(e:any){
    this.enviarMensaje();
  }
  obtenerFechaHora(){
    var fecha:Date = new Date();
    var segString: string = '';
    var minString : string = '';
    if(fecha.getSeconds().toString().length >= 2){
        segString = fecha.getSeconds().toString();
      }
    else{
        segString = "0"+ fecha.getSeconds().toString();
    }
    if(fecha.getMinutes().toString().length >=2){
        minString = fecha.getSeconds().toString();
    }
    else{
        minString = "0"+fecha.getMinutes().toString();
    }
    var fechaCompleta = (fecha.getMonth()+1)+ "/"+  fecha.getDate()  +  "/" + fecha.getFullYear();
    // console.log(fechaCompleta + "-" + fecha.getHours() + ":" + fecha.getMinutes()+ ":" +  segString);
    return fechaCompleta + "-" + fecha.getHours() + ":" + fecha.getMinutes()+ ":" +  segString;
  }
}
