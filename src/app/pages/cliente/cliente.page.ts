import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  constructor(
    public loginService: LoginService,
    public router:Router,
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.loginService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
