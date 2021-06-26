import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as HighCharts from 'highcharts';

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
    this.barChartPopulation();
    this.pieChartBrowser();
  }


  barChartPopulation() {
    HighCharts.chart('barChart', {
      chart: {
        type: 'column',        
        width:'340'
      }, 
      title:{
        text:null
      },
      xAxis: {        
        categories: ['Mala', 'Regular', 'Buena', 'Excelente'],
      },   
      yAxis: {
        min: 0,
        title: {
            text: 'Votos'
        }
    },         
      series: [{
        type: undefined,
        name: '2021',
        data: [2,30, 203, 635 ]
      }]
    });
  }

  pieChartBrowser() {
    HighCharts.chart('pieChart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        width:'340'
      },
      title: {
        text: null
      },            
      series: [{
        name: 'Limpieza',
        colorByPoint: true,
        type: undefined,
        data: [
          {
          name: 'Mala',
          y: 10,                   
        }, {
          name: 'Aceptable',
          y: 10
        }, {
          name: 'Buena',
          y: 60,
          selected: true
        }, {
          name: 'Excelente',
          y: 20
        },
      ]
      }]
    });
  }
  
  volverAPaginaPrevia(){
    this.router.navigateByUrl('/dashboard/pagina-ingreso');
  }

}
