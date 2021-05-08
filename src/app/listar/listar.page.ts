import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { Usuario } from '../entities/usuario';
import { ApiUser } from '../entities/apiUser';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  private _users:ApiUser[];
  
  constructor(
    public loadingController:LoadingController,
    public userService:UsuariosService,
    public toastController:ToastController,
    public router:Router
  ) {
   }
   scanearQR(){
     this.router.navigateByUrl('qrcode');
   }

   async loadUsers(page:number) {
    const loading = await this.loadingController.create();
    loading.present();
    this.userService.get(page).subscribe((data)=>{         
      loading.dismiss();               
      this._users = data;      
    });        
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

   get users():ApiUser[]{
     return this._users;
   }

  ngOnInit() {
    this.loadUsers(1);  
  }

  crear()
  {
    this.router.navigateByUrl('dashboard/crear');
  }



}
