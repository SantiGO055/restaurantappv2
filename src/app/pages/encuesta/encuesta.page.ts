import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvatarPage } from '../avatar/avatar.page';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { PhotoapiService } from 'src/app/services/photoapi.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { first, last, switchMap } from 'rxjs/operators';
import { VibrationService } from 'src/app/services/vibration.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { Encuesta } from 'src/app/entities/encuesta';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/entities/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {
  avatarUrl1: string;
  task: AngularFireUploadTask;
  urlAux: string;
  progress: any;  // Observable 0 to 100
  photoBase64:string;
  filePath:string 
  mostrarFoto = false;
  countFotos:number = 0;
  arrayPhotos = [];
  range: number = 1;
  calidadComida: boolean;
  usabilidadApp: boolean;
  ubicacionMesa: boolean;
  limpiezaLugar: boolean;
  atencionMozos: boolean;
  radioSi: boolean;
  radioNo: boolean;
  input: string = '';
  usuarioLogueado: User = new User();
  constructor(
    public modalController: ModalController,
    public storage: AngularFireStorage   ,
    public photoService:PhotoapiService ,     
    public spinnerService:SpinnerService,    
    public router: Router,
    private alert: AlertService,
    private vibrate: VibrationService,
    private encuestaSvc: EncuestaService,
    private loginSvc: LoginService,
    private userSvc : UsersService,
  ) {
    this.avatarUrl1 = null;
   }

  ngOnInit() {
    this.spinnerService.mostrarSpinner();
    this.loginSvc.usuarioLogueado.then(usr=>{
      this.usuarioLogueado = usr;
      console.log(this.usuarioLogueado);      
      this.encuestaSvc.getEncuestas().pipe(first())
      .toPromise()
      .then(encuestas=>{
        encuestas.forEach(enc => {
          if(enc.uidCliente == this.usuarioLogueado.uid){
            this.spinnerService.ocultarSpinner();
            this.alert.showDanger('Usted ya posee una encuesta cargada','Error!')
            this.router.navigate(['dashboard/dashboard/pagina-espera-elaboracion'])
          }
          else{
            this.spinnerService.ocultarSpinner();
          }
        });
        
      })
    });

  }

  captureImage() {
    return  Camera.getPhoto({      
      source: CameraSource.Camera, 
      allowEditing:true,      
      resultType: CameraResultType.Base64 ,
      promptLabelCancel	:'Cancelar'	,
      promptLabelPhoto:'Foto',
      promptLabelPicture:'Tomar una foto',
      promptLabelHeader:'Foto',
      quality: 100,
      height:300,            
      width:300,
      direction:CameraDirection.Front
    });    
  }

  async createUploadTask(filePath:string){             
    this.spinnerService.mostrarSpinner()
    const ref = this.storage.ref(filePath);  
    this.task = ref.putString(this.photoBase64, 'data_url');   
    this.progress = this.task.percentageChanges();           
    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => ref.getDownloadURL())
    ).subscribe(
      url =>{
        this.spinnerService.ocultarSpinner();
        this.urlAux = url; 
        this.arrayPhotos.push(this.urlAux);   
      }
    );         
  }

  async tomarFoto() {
    if(this.countFotos < 3){   
      const photo =  this.captureImage()
      .then(photo => {
        console.info(photo) ;
        this.filePath = `img_${ new Date().getTime() }.`+photo.format;
        this.photoBase64 = 'data:image/'+photo.format+';base64,' + photo.base64String;
        
      })
      .catch(error => {
        console.error(error);
        if(!this.photoBase64){
          this.router.navigateByUrl('dashboard');
          }
      }).then(()=>{
        this.mostrarFoto = true;
        this.countFotos = this.countFotos + 1;
        this.createUploadTask(this.filePath);

      }); 
    }
    else{
      this.vibrate.on();
      this.alert.showDanger('Alcanzaste el limite de subida de fotos','Error');
    }
  }
  changeRange(e){
    this.range = e.detail.value;
    console.log(this.range);
  }
  publicar(){         
    this.createUploadTask(this.filePath);
  }
  enviarEncuesta(){
    console.log(this.calidadComida)
    console.log(this.usabilidadApp)
    console.log(this.ubicacionMesa)
    console.log("radio SI "+this.radioSi)
    console.log("radio NO "+this.radioNo)
    let auxCalidad: string = '';
    let auxUsabilidad: string = '';
    let auxUbicacion: string = '';
    let auxLimpieza: string = '';
    let auxAtencion: string = '';
    
    let encuestaAux: Encuesta = {
      range: this.range,
      radioSi: this.radioSi,
      radioNo: this.radioNo,
      input: this.input,
      fotos: this.arrayPhotos,
      calidad: this.calidadComida,
      usabilidad: this.usabilidadApp,
      ubicacion: this.ubicacionMesa,
      limpieza: this.limpiezaLugar,
      atencion: this.atencionMozos,
      uidCliente: this.usuarioLogueado.uid
    //   radioSi: boolean;
    // radioNo: boolean;
    // input: string;
    // fotos: string[];
    // calidad: boolean;
    // usabilidad: boolean;
    // ubicacion: boolean;
    // limpieza: boolean;
    // atencion: boolean;


    }
    console.log(encuestaAux);
    try {
      this.encuestaSvc.addEncuesta(encuestaAux).then(ok=>{
        this.userSvc.marcarEncuestaRealizada(this.usuarioLogueado).then(
          r => {
            console.log(ok)
            this.alert.showSucess('Encuesta enviada correctamente','Aviso','dashboard/pagina-espera-elaboracion');
          }
        );        
      });
      
    } catch (error) {
      
    }
  }


}
