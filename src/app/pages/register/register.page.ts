import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { ModalController } from '@ionic/angular';
import { AvatarPage } from '../avatar/avatar.page';
import { RegistrosService } from '../../services/registros.service';
import { Registro } from '../../entities/registro';
import { Router } from '@angular/router';

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

  constructor(
    private registrosService: RegistrosService,
    public formBuilder: FormBuilder,
    public toastService: ToastService,
    public spinnerService: SpinnerService,
    public modalController: ModalController,
    private router: Router
  ) {
    this.isSubmitted = false;
    this.avatarUrl = null;
  }

  ngOnInit() {
    this.errorMessage = '';
    this.isSubmitted = false;
    this.ionicRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      username: [
        '',
        [Validators.required, Validators.minLength(6), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
    });
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

  resetForm() {
    this.name.setValue('');
    this.username.setValue('');
    this.password.setValue('');
    this.avatarUrl = null;
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
          displayName: formData.name,
          emailVerified: false,
          photoURL: this.avatarUrl,
          password: formData.password          
        } as Registro;        
        this.registrosService.save(registro, null).then(
          async (res) => {
            this.spinnerService.ocultarSpinner();
            this.toastService.presentSuccess(
              'Su registro fue creado con exito. Un supervisor se comunicara con usted'
            );
            this.ionicRegister.reset();
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
