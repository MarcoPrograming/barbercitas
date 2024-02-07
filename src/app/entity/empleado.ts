import { Timestamp, TimestampProvider } from "rxjs";
export class Empleado {
    id_empleado!: number;
    cargo!: String[];
    horario!: String;
    nombre!: String;
    apellidos!: String;
    dni!: String;
    edad!: number;
    correo!: String;
    telefono!: String;
    direccion!: String;
    estado: string[] = ['I', 'A'];
    fecha_creacion!: TimestampProvider;
    fecha_actualizacion!: TimestampProvider;
    
}
