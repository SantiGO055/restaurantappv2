import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { ModalController } from '@ionic/angular';
import { AvatarPage } from '../avatar/avatar.page';
import { RegistrosService } from '../../services/registros.service';
import { Registro } from '../../entities/registro';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { LectorQrListaEsperaService } from '../../services/lectorqrlistaespera.service';
import { LectorQrDniService } from '../../services/lectorqrdni.service';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { last, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isSubmitted: boolean;
  ionicRegister: FormGroup;
  errorMessage: string;
  avatarUrl: string;
  filePath:string 
  photoBase64:string;
  task: AngularFireUploadTask;
  mostrarFoto = false;
  progress: any;  // Observable 0 to 100
  urlAux: string;


  constructor(
    private registrosService: RegistrosService,
    public formBuilder: FormBuilder,
    public toastService: ToastService,
    public spinnerService: SpinnerService,
    public modalController: ModalController,    
    private notification: NotificationService,
    public lectorqrService:LectorQrDniService,
    public router: Router,
    public storage: AngularFireStorage   ,

  ) {
    this.isSubmitted = false;
    this.avatarUrl = null;
  }

  ngOnInit() {
    this.errorMessage = '';
    this.isSubmitted = false;
    this.ionicRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      username: ['',[Validators.required, Validators.minLength(6), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  ngAfterViewInit() {
    this.lectorqrService.preapare();    
  }    

  async escanearQr()
  {
    const resultado = await this.lectorqrService.escanear();                       
    this.name.setValue(resultado.apellido+' '+resultado.nombre);    
    this.dni.setValue(resultado.numero);    
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }  


  checkPassSame() {
    let pass = this.ionicRegister.value.password;
    let passConf = this.ionicRegister.value.confirm;
    if (pass == passConf && this.ionicRegister.valid === true) {
      this.errorMessage = '';
      return false;
    } else {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return true;
    }
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AvatarPage,
      cssClass: 'upload-image',
    });
    modal.onDidDismiss().then((data) => {
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
  resetForm() {
    this.name.setValue('');
    this.username.setValue('');
    this.password.setValue('');
    this.dni.setValue('');
    this.avatarUrl = null;
  }
  
  get dni() {
    return this.ionicRegister.get('dni');
  }

  get name() {
    return this.ionicRegister.get('name');
  }

  get username() {
    return this.ionicRegister.get('username');
  }

  get password() {
    return this.ionicRegister.get('password');
  }

  get confirm() {
    return this.ionicRegister.get('confirm');
  }

  async register() {
    try {
      this.isSubmitted = true;
      if (!this.ionicRegister.valid) {
        this.toastService.presentDanger(
          'Por favor revise los datos ingresados.'
        );
      } else {
        this.spinnerService.mostrarSpinner();
        const formData = this.ionicRegister.value;
        const email = formData.username;        
        const registro = {
          email,
          dni:formData.dni,
          displayName: formData.name,
          emailVerified: false,
          photoURL: this.avatarUrl,
          password: formData.password, 
          aprobado:null
        } as Registro;        
        this.registrosService.save(registro, null).then(
          async (res) => {
            this.spinnerService.ocultarSpinner();
            this.toastService.presentSuccess(
              'Su registro fue creado con exito. Un supervisor se comunicara con usted por email.'
            );
            this.notification.push('Registro nuevo','Registro nuevo pendiende de aprobacion','duenio');
            this.ionicRegister.reset();
            this.avatarUrl = null;
          },
          async (error) => {
            this.spinnerService.ocultarSpinner();
            this.toastService.presentDanger(
              'Ocurrio un error al generar su registro'
            );
          }
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
