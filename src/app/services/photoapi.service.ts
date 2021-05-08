import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoapiService {

  readonly PATH = 'photos';

  constructor(
    private httpService: HttpService 
    
  ) { }

  //@todo subir a storage subir a s
  uploadImageFile(file: File) {
    const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('file', file, `avatar.${ext}`);
    formData.append('name', file.name);
    //@todo cargar la imagen en storage
    return new Observable;
    //return this.http.post(`${this.url}/image`, formData);
  }
  
  uploadImage(blobData, name, ext) {
    const formData = new FormData();
    formData.append('file', blobData, `myimage.${ext}`);
    formData.append('name', name);
    return new Observable;
  //  return this.http.post(`${this.url}/image`, formData);
  }
  /*
  upload(photo:any): Observable<any> {      
    return  this.httpService.post(this.PATH, photo);
  }*/
}
