import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SysError } from '../../entities/sysError';

@Component({
  selector: 'app-olivido',
  templateUrl: './olvido.page.html',
  styleUrls: ['./olvido.page.scss'],
})
export class OlividoPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(
    private toastService: ToastService,
    public loginService: LoginService,
    private router: Router,
    public formBuilder: FormBuilder,
    public SpinnerService: SpinnerService
  ) {}

 ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.minLength(4), Validators.email],
      ]
    });
  }

  get username() {
    return this.ionicForm.get('username');
  }

  resetForm(){
    this.username.setValue('');
  }
  
  async recuperar() {
    try {            
      if (!this.ionicForm.valid) {
        this.toastService.presentSuccess('Por favor ingrese su correo.');
        
      } else {
        this.SpinnerService.mostrarSpinner();
        this.loginService.resetPassword(this.ionicForm.value).then(
          async (res) => {
            this.resetForm();
            this.SpinnerService.ocultarSpinner();
            this.toastService.presentSuccess('Le Hemos enviado un correo electronico. Por favor revise su carpeta de spam. Lo redirigiremos a la pagina de login.')
            setTimeout(()=>{
              this.router.navigateByUrl('/login', { replaceUrl: true });
            },3000)
            
          },
          async (error) => {
            this.toastService.presentDanger('El correo es incorrecto.');            
          }
        );
      }
    } catch (error) {
      throw error;
    }
  }

}
