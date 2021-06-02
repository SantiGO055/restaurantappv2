import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.page.html',
  styleUrls: ['./avatar.page.scss'],
})
export class AvatarPage implements OnInit {

  constructor(
    public modalController: ModalController      
  ) { }
  

  addAvatarUrl(url:string){    
    this.modalController.dismiss({
      avatarUrl: url
    });
  }

  ngOnInit() {
  }
}