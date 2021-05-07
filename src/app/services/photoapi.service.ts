import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ApiPhoto } from '../entities/apiPhoto';
import { ApiPhotoList } from '../entities/apiPhotoList';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoapiService {

  readonly PATH = 'photos';

  constructor(
    private httpService: HttpService 
    
  ) { }

  upload(photo:ApiPhoto): Observable<any> {      
    return  this.httpService.post(this.PATH, photo);
  }

  get(page:number): Observable<any> {          
    return  this.httpService.get(this.PATH+'/'+page).pipe(
      map( 
        (list:ApiPhotoList) => {
        return list.list;
      }
    )
    );
  }  
}
