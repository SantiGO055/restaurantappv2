import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoapiService {

  readonly PATH = 'photos';

  constructor() { }
  
  uploadImageFile(file: File) {
    const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('file', file, `avatar.${ext}`);
    formData.append('name', file.name);    
    return new Observable;    
  }
  
  uploadImage(blobData, name, ext) {
    const formData = new FormData();
    formData.append('file', blobData, `myimage.${ext}`);
    formData.append('name', name);
    return new Observable;  
  }
  
}