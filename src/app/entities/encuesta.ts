export interface Encuesta {
    id?: string;
    range:number;
    // check: string;
    radioSi: boolean;
    radioNo: boolean;
    input: string;
    fotos: string[];
    calidad: boolean;
    usabilidad: boolean;
    ubicacion: boolean;
    limpieza: boolean;
    atencion: boolean;
    uidCliente: string;
}
