import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  async canLoad(): Promise<boolean> {
    const user = await this.loginService.isLoggedIn();    
    if (user) {
      this.router.navigateByUrl('/dashboard/home', { replaceUrl: true });      
    }
    return true;
  }
}
