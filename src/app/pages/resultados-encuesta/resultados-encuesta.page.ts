import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados-encuesta',
  templateUrl: './resultados-encuesta.page.html',
  styleUrls: ['./resultados-encuesta.page.scss'],
})
export class ResultadosEncuestaPage implements OnInit {

  constructor(
    public router:Router
  ) { }

  ngOnInit() {
  }

  volverAPaginaPrevia(){
    this.router.navigateByUrl('/clientes/pagina-ingreso');
  }

}
