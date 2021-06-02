import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { PhotoapiService } from '../services/photoapi.service';
import { last, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { SpinnerService } from '../services/spinner.service';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit { 
  
  @Output() public photoChange = new EventEmitter<string>();  

  task: AngularFireUploadTask;

  progress: any;  // Observable 0 to 100
  photoBase64:string;
  filePath:string 

  constructor(
    public storage: AngularFireStorage   ,
    public photoService:PhotoapiService ,     
    public spinnerService:SpinnerService,    
    public alertService: AlertService,
    public router: Router    
  ) { 
      
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
        console.log(url);
        this.photoChange.emit(url);        
      }
    );         
  }  

  async tomarFoto() {    
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
    });    
  }

  publicar(){         
    this.createUploadTask(this.filePath);           
  }

  ngOnInit() {    
    this.tomarFoto();   
  }

}