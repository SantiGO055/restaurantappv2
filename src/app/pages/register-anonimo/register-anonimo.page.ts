import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';
import {  ModalController } from '@ionic/angular';
import { AvatarPage } from '../avatar/avatar.page';
import { LectorQrDniService } from '../../services/lectorqrdni.service';

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

  constructor(
    private loginService: LoginService,
    public formBuilder: FormBuilder,
    public toastService: ToastService,
    public spinnerService: SpinnerService,
    public router: Router,
    public modalController: ModalController ,
    public lectorqrService:LectorQrDniService,        
  ) {
    this.isSubmitted = false;
    this.avatarUrl = null;
  }
 


  ngOnInit() {
    this.errorMessage = '';
    this.isSubmitted = false;
    this.ionicRegister = this.formBuilder.group({
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

  resetForm(){
    this.nombre.setValue('');
  }

  get nombre() {
    return this.ionicRegister.get('nombre');
  }

  async register() {
    try {
      this.isSubmitted = true;
      if (!this.ionicRegister.valid) {
        this.toastService.presentDanger('Por favor revise los datos ingresados.');        
      } else {
        this.spinnerService.mostrarSpinner();                
        const name =this.ionicRegister.get('nombre').value;
        this.loginService.loginAnonimo(name, this.avatarUrl).then(
          async (res) => {
            this.spinnerService.ocultarSpinner();            
            this.resetForm();
            this.router.navigateByUrl('dashboard/home');
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

