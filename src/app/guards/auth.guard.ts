import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  async canLoad(): Promise<boolean> {
    const user = await this.loginService.isLoggedIn();    
    if (user) {
      return true;
    }    
    this.router.navigateByUrl('/login');
    return false;
  }
}
