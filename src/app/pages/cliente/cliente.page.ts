import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  public ocultarTabs:boolean;
  constructor(
    public loginService: LoginService,
    public router:Router,
  ) { 
    this.ocultarTabs = false;
  }
  

  ngOnInit() {
  }

  async logout() {
    await this.loginService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
