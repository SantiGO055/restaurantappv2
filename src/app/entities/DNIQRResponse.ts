      //00232638557@MALAGAMBA@MARIA MONICA@F@27462786@B@12/11/1979@02/12/2013
      //00490436790@TRUCCO@CONSTANZA ZO@F@42528721@A@13/04/2000@20/04/2017@234
      //00204605209@DOMINGUEZ@DANTE ROGELIO@M@37898702@C@05/04/1994@15/07/2013            
export class DNIQRResponse{    
    tramite:string    
    apellido:string 
    nombre:string       
    sexo:string
    numero:string
    ejemplar:string
    fechaNacimiento:string
    emision:string    
    
    static fromQR(codigo:string){
        var splitted = codigo.trim().split("@").filter(part => part.length > 0 ); 
        if(splitted[0] == 'A' ||  splitted[0] == 'B'||  splitted[0] == 'C'||  splitted[0] == 'D'){
            //dni libreta
            return {
                tramite:splitted[8],
                apellido:splitted[2],
                nombre:splitted[3],
                sexo:splitted[6],
                numero:'',
                ejemplar:splitted[0],
                fechaNacimiento:splitted[5],
                emision:splitted[7],           
             } as DNIQRResponse;
           }else{
               //dni tarjeta
            return {
                tramite:splitted[0],
                apellido:splitted[1],
                nombre:splitted[2],
                sexo:splitted[3],
                numero:splitted[4],
                ejemplar:splitted[5],
                fechaNacimiento:splitted[6],
                emision:splitted[7],           
             } as DNIQRResponse;
           }


        
    }
}