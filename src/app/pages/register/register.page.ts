import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';

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
    private loginService: LoginService,
    public formBuilder: FormBuilder,
    public toastService: ToastService,
    public spinnerService: SpinnerService
  ) {
    this.isSubmitted = false;
  }

  ngOnInit() {
    this.errorMessage = '';
    this.isSubmitted = false;
    this.ionicRegister = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(6), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  resetForm(){
    this.username.setValue('');
    this.password.setValue('');
    this.confirm.setValue('');
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
        //
        this.loginService.register(this.ionicRegister.value).then(
          async (res) => {
            this.spinnerService.ocultarSpinner();
            this.toastService.presentSuccess('El usuario pudo ser creado.');
            this.resetForm();
          },
          async (error) => {
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
