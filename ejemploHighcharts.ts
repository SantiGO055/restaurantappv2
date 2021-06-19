
/** plugins usados:
 * import { Chart } from 'angular-highcharts';
 * import Canvg from 'canvg';
 * import * as CanvasJS from './../../canvasjs.min';
 * import * as html2canvas from 'html2canvas';
 */
descargarCantTurnosPorDiaAPdf(){
    let v = null;
    
    var doc = new jsPDF();
    
    let svg = window.document.getElementById("chart1").children[0].innerHTML;
  
    if (svg)
    svg = svg.replace(/\r?\n|\r/g, '').trim();
    var canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    v = Canvg.from(ctx, svg).then(v=>{
      v.start()
      var imgData = canvas.toDataURL('image/png');
      // Generate PDF
      var doc = new jsPDF('l', 'mm', 'a4');
      doc.addImage(imgData, 'PNG', 40, 40, 250, 150);
      doc.save('cantidadTurnosPorDia.pdf');
    });

    console.log(svg)
  }
  
  descargarCantEspPorTurno(){
    let v = null;
    
    var doc = new jsPDF();
    
    let svg = window.document.getElementById("chart2").children[0].innerHTML;
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    if (svg)
    svg = svg.replace(/\r?\n|\r/g, '').trim();
    var canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    v = Canvg.from(ctx, svg).then(v=>{
      v.start()
      var imgData = canvas.toDataURL('image/png');
      // Generate PDF
      var doc = new jsPDF('l', 'mm', 'a4');
      doc.addImage(imgData, 'PNG', 40, 40, 250, 80);
      doc.save('cantidadEspecialidadPorTurno.pdf');
    });
  }
  descargarCantTurnosSolicitados(){
    let v = null;
    
    var doc = new jsPDF();
    
    let svg = window.document.getElementById("chart3").children[0].innerHTML;
  
    if (svg)
    svg = svg.replace(/\r?\n|\r/g, '').trim();
    var canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    v = Canvg.from(ctx, svg).then(v=>{
      v.start()
      var imgData = canvas.toDataURL('image/png');
      // Generate PDF
      var doc = new jsPDF('l', 'mm', 'a4');
      doc.addImage(imgData, 'PNG', 40, 40, 250, 150);
      doc.save('cantidadTurnosSolicitadosFecha.pdf');
    });
  }

  descargarCantTurnosFinalizados(){
    let v = null;
    
    var doc = new jsPDF();
    
    let svg = window.document.getElementById("chart4").children[0].innerHTML;
  
    if (svg)
    svg = svg.replace(/\r?\n|\r/g, '').trim();
    var canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    v = Canvg.from(ctx, svg).then(v=>{
      v.start()
      var imgData = canvas.toDataURL('image/png');
      // Generate PDF
      var doc = new jsPDF('l', 'mm', 'a4');
      doc.addImage(imgData, 'PNG', 40, 40, 250, 150);
      doc.save('cantidadTurnosFinalizadosFecha.pdf');
    });
  }