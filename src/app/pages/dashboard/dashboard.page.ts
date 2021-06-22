import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../entities/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  public accesosDuenio :boolean;
  public accesosMaitre :boolean;
  public accesosCocinero :boolean;
  public accesosBartender :boolean;
  public accesosCliente :boolean;
  public accesosAsociados :boolean;
  public accesosMozo :boolean;

  constructor(
    private router:Router,
    private loginService:LoginService
  ) { 

    this.accesosDuenio = false;
    this.accesosBartender = false;
    this.accesosCocinero = false;
    this.accesosMaitre= false;
    this.loginService.loguedUser.subscribe(user=>{          
      this.accesosDuenio = User.esDuenio(user);
      this.accesosMaitre= User.esMaitre(user);
      this.accesosCocinero= User.esCocinero(user);
      this.accesosBartender= User.esBartender(user);
      this.accesosCliente = User.esCliente(user);
      this.accesosMozo = User.esMozo(user);
      this.accesosAsociados = User.perteneceAEmpresa(user);
    });
  }

  async logout() {
    await this.loginService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
