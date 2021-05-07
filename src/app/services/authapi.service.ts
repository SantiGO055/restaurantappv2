import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { AuthConstants } from '../config/auth-constants';
import {map, tap, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { ApiUser } from '../entities/apiUser';
import { ResolveStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  isAuthenticated : BehaviorSubject<boolean>= new BehaviorSubject<boolean>(null);
  token = '';  

  constructor(
    private httpService: HttpService    ,
    private storageService:StorageService
  ) {
    this.loadToken();
  }

  async loadToken(){     
    const token = await this.storageService.get(AuthConstants.AUTH);    
    if (token ) {      
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(postData : { username:string , password:string } ): Observable<any> {  
    return  this.httpService.post(AuthConstants.LOGIN_PATH, postData).pipe(
      map( (data:any) =>  data.token),
      switchMap(
        token=>{ 
          return from(
            this.storageService.set(AuthConstants.AUTH, token)            
          );                     
        }
      ),
      tap( () => {
          this.isAuthenticated.next(true);
      })
    );    
  }

  register(postData: {username:string, password:string,}): Observable<any> { 
    //@todo agregar al registro
      const user = {username:postData.username, password:postData.password,name:'name',surname:'surname',sexo:'F',role:'admin',dni:'123123123123' } as ApiUser;
      return  this.httpService.post(AuthConstants.REGISTER_PATH, user);    
  }

  logout() {
    this.isAuthenticated.next(false);
    return this.storageService.remove(AuthConstants.AUTH);
  }

}