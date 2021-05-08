import { Component, OnInit } from '@angular/core';
import { AuthapiService } from '../services/authapi.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isSubmitted: boolean;
  ionicRegister: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthapiService,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.errorMessage = '';
    this.isSubmitted = false;
    this.ionicRegister = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  checkPassSame() {
    let pass = this.ionicRegister.value.password;
    let passConf = this.ionicRegister.value.confirm;
    if (pass == passConf && this.ionicRegister.valid === true) {
      this.errorMessage = "";
      return false;
    } else {
      this.errorMessage = "Password did not match.";
      return true;
    }
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color,
      position: 'top'
    });
    toast.present();
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
    this.isSubmitted = true;
    if (!this.ionicRegister.valid) {
      this.presentToast('Por favor revise los datos ingresados.', 'danger');
      return false;
    } else {
      const loading = await this.loadingController.create();
      await loading.present();
      //
      this.authService.register(this.ionicRegister.value).subscribe(
        async (res) => {
          await loading.dismiss();
          this.presentToast('El usuario pudo ser creado.', 'success');          
        },
        async (res) => {
          await loading.dismiss();
          this.presentToast('El usuario no pudo ser creado.', 'danger');
        }      
      );
    }
  }

}
