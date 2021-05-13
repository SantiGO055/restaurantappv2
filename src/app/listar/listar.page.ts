import { Component, OnInit } from '@angular/core';
import { User } from '../entities/user';
import { Usuario } from '../entities/usuario';
import { ApiUser } from '../entities/apiUser';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  private _users:ApiUser[];
  isAdmin:boolean;
  
  constructor(
    public loadingController:LoadingController,
    public userService:UsuariosService,
    public toastController:ToastController,
    public router:Router,
    public storageService:StorageService
  ) {
    this.loadUsers(1);      
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
    },(error)=>{
      loading.dismiss();               
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

  async ngOnInit() {
    this.loadUsers(1);  
    this.isAdmin = await this.storageService.isAdmin();
  }

  crear()
  {
    this.router.navigateByUrl('dashboard/crear');
  }



}
