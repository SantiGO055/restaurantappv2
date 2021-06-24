import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvatarPage } from '../avatar/avatar.page';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { PhotoapiService } from 'src/app/services/photoapi.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { last, switchMap } from 'rxjs/operators';

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
  constructor(
    public modalController: ModalController,
    public storage: AngularFireStorage   ,
    public photoService:PhotoapiService ,     
    public spinnerService:SpinnerService,    
    public alertService: AlertService,
    public router: Router,
    private alert: AlertService
  ) {
    this.avatarUrl1 = null;
   }

  ngOnInit() {
  }

  
  async presentModal() {
    console.log("presento modal")
    const modal = await this.modalController.create({
      component: AvatarPage,
      cssClass: 'upload-image',
    });
    modal.onDidDismiss().then((data) => {
      this.avatarUrl1 = data['data']['avatarUrl'];
      console.log(this.avatarUrl1);
    });
    return await modal.present();
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
    console.log(this.countFotos)
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
        console.log("asd")

      }); 
    }
    else{
      this.alert.showDanger('Alcanzaste el limite de subida de fotos','Error')
    }
  }

  publicar(){         
    this.createUploadTask(this.filePath);
  }

}
