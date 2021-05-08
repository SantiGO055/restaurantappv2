import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController,  ModalController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  
  avatar:string;
  ionicForm: FormGroup;
  isSubmitted: boolean;
  errorMessage: string;

  constructor(
    private usuariosService: UsuariosService,    
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private loadingController: LoadingController,  
    public modalController: ModalController ,
  ) { 
    this.isSubmitted = false;
    this.errorMessage = "";
  }  
/*
  async presentModal() {
    const modal = await this.modalController.create({
      component: AvatarPage,
      cssClass: 'upload-image'
    });
    modal.onDidDismiss()
    .then((data) => {
      this.avatar = data['data']['avatarUrl']; 
      console.log(this.avatar);
  });
    return await modal.present();
  }*/

  async presentToast(message:string,color) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {
    this.errorMessage = '';
    this.isSubmitted = false;
    this.ionicForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellidos: ['', [Validators.required, Validators.minLength(4)]],
      dni: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  checkPassSame() {
    //@todo revisar
    let pass = this.ionicForm.value.password;
    let passConf = this.ionicForm.value.confirm;
    console.info(pass,passConf);
    if (pass == passConf && this.ionicForm.valid === true) {
      this.errorMessage = "";
      return false;
    } else {      
      this.errorMessage = "La confirmación y la contraseña no coinciden.";      
      return true;
    }
  }

  get nombre() {
    return this.ionicForm.get('nombre');
  }

  get apellidos() {
    return this.ionicForm.get('apellidos');
  }

  get dni() {
    return this.ionicForm.get('dni');
  }

  get username() {
    return this.ionicForm.get('username');
  }

  get password() {
    return this.ionicForm.get('password');
  }

  get confirm() {
    return this.ionicForm.get('confirm');
  } 

  async crear() {
    this.isSubmitted = true;
    //    
    if (!this.ionicForm.valid) {
      this.presentToast('Por favor revise los datos ingresados.','danger');
      return false;
    } else {
      const loading = await this.loadingController.create();
      await loading.present();    
      let data =  { nombre: this.ionicForm.value.nombre , apellidos : this.ionicForm.value.apellidos, dni:this.ionicForm.value.dni , username : this.ionicForm.value.username , password: this.ionicForm.value.password, avatar:this.avatar};
      this.usuariosService.crear(data).subscribe(
        async (res) => {
          await loading.dismiss();          
          await this.presentToast('El usuario fue creado correctamente.','success');
        },
        async (error) => {
          await loading.dismiss();
          await this.presentToast('Ocurrio un error en los datos ingresados.','danger');
        }
      );
    }
  }




  

}
