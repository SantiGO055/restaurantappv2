
/** plugins usados:
 * import { Chart } from 'angular-highcharts';
 * import { Axis, ChartOptions, PointOptionsType, SeriesOptionsType } from 'highcharts';
 * import { Point } from 'angular-highcharts/lib/chart';
 */
 agregarChartTurnosPorDia(){
    if(this.usuarioLogueado.admin){
      this.chartCantPorDia = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Cantidad de turnos por dia'
        },
        credits: {
          enabled: false
        },
        
      });
  
      this.fireSvc.getAllTurnos().subscribe(turnos=>{
        this.turnos = turnos;
        
        
        let arrayOcurrencias = this.getOcurrencia(this.turnos,'fecha');
        // console.log(arrayOcurrencias);
        arrayOcurrencias.sort(function(a, b) {
          return a.occurrence - b.occurrence;
        });
        
  
        
      arrayOcurrencias.forEach(ocurr=>{
        let data:SeriesOptionsType = {
          type: "column",
          colorByPoint: true,
          name: ocurr.fecha,
          data: [{y: ocurr.occurrence, name: ocurr.fecha, drilldown: ocurr.fecha}],
        }
        this.chartCantPorDia.addSeries(data,true,true)
      }); 
    });
      
    }
  
  }
  getOcurrencia(array:any[], key: string){
    let arr2 = [];
    
    array.forEach((x)=>{
       
    // Checking if there is any object in arr2
    // which contains the key value
     if(arr2.some((val)=>{ return val[key] == x[key] })){
         
       // If yes! then increase the occurrence by 1
       arr2.forEach((k)=>{
         if(k[key] === x[key]){ 
           k["occurrence"]++
         }
      })
         
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a[key] = x[key]
       a["occurrence"] = 1
       arr2.push(a);
     }
  })
    
  return arr2
  }
  agregarChartEspPorTurnos(){
    // console.log(this.usuarioLogueado)
    if(this.usuarioLogueado.admin){
      let data= [];
    
    let x = 0
      let count = 0;
      
      
      // this.chartEspPorTurno.ref.xAxis.forEach((cat)=>{
      //   cat.setCategories([]);
      // })
      
      this.fireSvc.getEspecialidades().pipe(first())
      .toPromise()
      .then(esp=>{
        

        this.especialidades = esp;
        this.especialidades.forEach(especialidad => {
          count = 0;
          for (let i = 0; i < this.turnos.length; i++) {
            if(this.turnos[i].especialidad == especialidad.nombre){
              count++;
            }
            
            
          }

          data.push({y: count, name: especialidad.nombre});
        });
        this.chartEspPorTurno = new Chart({
          chart: {
            type: 'pie'
          },
          title: {
            text: 'Cantidad de especialidad por turnos'
          },
          credits: {
            // enabled: false
          },
          plotOptions: {
            pie:{
              allowPointSelect: true
            }
          },
          series: [{
            type: 'pie',
            name: 'Cantidad',
            data: data
          }]
          
        });


      });


    }
  }
  getOcurrenciaEstado(array : EstadoTurno[],key:any){
    let arr2 = [];
    
    array.forEach((turno)=>{
       
    // Checking if there is any object in arr2
    // which contains the key value
     if(arr2.some((val)=>{ return val[key] == turno[key] })){
         
       // If yes! then increase the occurrence by 1
       arr2.forEach((k)=>{
         if(k[key] === turno[key]){ 
           k["occurrence"]++
         }
      })
         
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a[key] = turno[key]
       a["occurrence"] = 1
       arr2.push(a);
     }
  })
    
  return arr2
  }