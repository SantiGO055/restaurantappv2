import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvatarPage } from '../avatar/avatar.page';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {
  avatarUrl1: string;
  
  constructor(
    public modalController: ModalController
  ) {
    this.avatarUrl1 = null;
   }

  ngOnInit() {
  }

  async presentModal() {
    console.log("presento modal")
    const modal = await this.modalController.create({
      component: AvatarPage,
      cssClass: 'upload-image',
    });
    modal.onDidDismiss().then((data) => {
      this.avatarUrl1 = data['data']['avatarUrl'];
      console.log(this.avatarUrl1);
    });
    return await modal.present();
  }

}
