import { Component, OnInit } from '@angular/core';
import { AuthapiService } from '../services/authapi.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  ionicForm: FormGroup;
  constructor(
    private usuariosService: UsuariosService,    
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private loadingController: LoadingController
  ) { }



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
    this.ionicForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellidos: ['', [Validators.required, Validators.minLength(4)]],
      dni: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
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

  async crear() {
    //    
    if (!this.ionicForm.valid) {
      this.presentToast('Por favor revise los datos ingresados.','danger');
      return false;
    } else {
      const loading = await this.loadingController.create();
      await loading.present();
      //
      this.usuariosService.crear(this.ionicForm.value).subscribe(
        async (res) => {
          await loading.dismiss();          
          await this.presentToast('El usuario fue creado correctamente.','success');
        },
        async (error) => {
          await loading.dismiss();
          await this.presentToast('Ocurrion un error en los datos ingresados.','danger');
        }
      );
    }
  }

}
