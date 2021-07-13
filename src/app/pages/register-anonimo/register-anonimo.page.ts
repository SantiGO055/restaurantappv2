import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';
import {  ModalController } from '@ionic/angular';
import { AvatarPage } from '../avatar/avatar.page';
import { LectorQrDniService } from '../../services/lectorqrdni.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { last, switchMap } from 'rxjs/operators';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-register-anonimo',
  templateUrl: './register-anonimo.page.html',
  styleUrls: ['./register-anonimo.page.scss'],
})
export class RegisterAnonimoPage implements OnInit {
 
  isSubmitted: boolean;
  ionicRegister: FormGroup;
  errorMessage: string;
  avatarUrl:string;
  filePath:string 
  photoBase64:string;
  task: AngularFireUploadTask;
  mostrarFoto = false;
  progress: any;  // Observable 0 to 100
  urlAux: string;

  constructor(
    private loginService: LoginService,
    public formBuilder: FormBuilder,
    public toastService: ToastService,
    public spinnerService: SpinnerService,
    public router: Router,
    public modalController: ModalController ,
    public lectorqrService:LectorQrDniService,   
    public storage: AngularFireStorage   ,

  ) {
    this.isSubmitted = false;
    this.avatarUrl = null;
  }
 


  ngOnInit() {
    this.errorMessage = '';
    this.isSubmitted = false;
    this.ionicRegister = this.formBuilder.group({
      dni: ['',[Validators.required, Validators.minLength(8)]],
      nombre: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  
  ngAfterViewInit() {
    this.lectorqrService.preapare();    
  }    

  async escanearQr()
  {
    const resultado = await this.lectorqrService.escanear();                       
    this.nombre.setValue(resultado.apellido+' '+resultado.nombre);    
    this.dni.setValue(resultado.numero);
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }  

  async presentModal() {
    const modal = await this.modalController.create({
      component: AvatarPage,
      cssClass: 'upload-image'
    });
    modal.onDidDismiss()
    .then((data) => {
      this.avatarUrl = data['data']['avatarUrl']; 
      console.log(this.avatarUrl);
  });
    return await modal.present();
  }
  async tomarFoto(){
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
        this.createUploadTask(this.filePath);

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
        this.avatarUrl = this.urlAux;   
      }
    );         
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

  resetForm(){
    this.nombre.setValue('');
  }

  get nombre() {
    return this.ionicRegister.get('nombre');
  }

  get dni() {
    return this.ionicRegister.get('dni');
  }
  

  async register() {
    try {
      this.isSubmitted = true;
      if (!this.ionicRegister.valid) {
        this.toastService.presentDanger('Por favor revise los datos ingresados.');        
      } else {
        this.spinnerService.mostrarSpinner();                
        const name =this.ionicRegister.get('nombre').value;
        const dni = this.ionicRegister.get('dni').value;
        this.loginService.loginAnonimo(name, dni, this.avatarUrl).then(
          async (res) => {
            this.spinnerService.ocultarSpinner();            
            this.resetForm();
            this.router.navigateByUrl('/dashboard/pagina-ingreso');
          },
          async (error) => {
            console.log(error);
            this.spinnerService.ocultarSpinner();
            this.toastService.presentDanger('El usuario no pudo ser creado.');
          }
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

