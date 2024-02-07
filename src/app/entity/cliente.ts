import { Timestamp, TimestampProvider } from "rxjs";

export class Cliente {
    id_cliente!: number;
    nombres!: string;
    apellidos!: string;
    edad!: number;
    email!: string;
    telefono!: string;
    direccion!: string;
    estado: string[] = ['I', 'A'];
    fecha_creacion!: TimestampProvider;
    fecha_actualizacion!: TimestampProvider;

}
