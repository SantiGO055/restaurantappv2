import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  constructor(
    private router:Router,
    private loginService:LoginService
  ) { }

  async logout() {
    await this.loginService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
