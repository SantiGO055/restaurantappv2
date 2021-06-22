import { LoginService } from './../../services/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SysError } from '../../entities/sysError';
import { User } from '../../entities/user';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public tester: string;
  public ionicForm: FormGroup;

  constructor(
    private registroService: RegistrosService,
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
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get username() {
    return this.ionicForm.get('username');
  }

  get password() {
    return this.ionicForm.get('password');
  }

  async login() {
    try {      
      this.SpinnerService.mostrarSpinner();
      if (!this.ionicForm.valid) {
        this.toastService.presentSuccess('Por favor revise los datos ingresados.');        
      } else {
        //revisar si existe desaprobado en registros         
        this.loginService.login(this.ionicForm.value).then(
          async (usuario:User) => {
            this.SpinnerService.ocultarSpinner();            
            const route = this.definirRutaAcceso(usuario);            
            this.router.navigateByUrl(route, { replaceUrl: true });
          },
          async (error) => {            
            this.SpinnerService.ocultarSpinner();                                                
            const registro = await this.registroService.getRegistroByEmail(this.username.value);            
            if( !registro ){
              this.toastService.presentDanger('Usuario o password incorrecto.');            
            }else if(!registro.aprobado){
              this.toastService.presentDanger('Su registro aun no fue aceptado.');            
            }
          }
        );
      }
    } catch (error) {      
      throw new SysError(error);
    }
  }
  
  protected definirRutaAcceso(usuario:User):string{
    //Si es cliente 
    let route = '/dashboard/pagina-ingreso';            
    if(User.perteneceAEmpresa(usuario)){
      //si pertenece a la empresa
      route = '/dashboard/home';
    }else if(User.puedeAccederAsignarMesa(usuario)){
      //si es cliente  que ya paso la lista de espera
      let route = '/dashboard/asignacion-mesa';            
    }
    return route;
  }

  defineTester(selectedUserId: string) {
    const loginData = this.loginService.getUsuarioTest(selectedUserId);
    this.ionicForm.get('username').setValue(loginData.username);
    this.ionicForm.get('password').setValue(loginData.password);
  }
}
