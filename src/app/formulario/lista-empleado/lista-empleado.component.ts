import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Empleado } from '../../entity/empleado';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoServiceService } from '../../services/empleado-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-empleado',
  templateUrl: './lista-empleado.component.html',
  styleUrl: './lista-empleado.component.css'
})
export class ListaEmpleadoComponent implements OnInit {

  @ViewChild('content') popupview !: ElementRef;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  toasts: any[] = [];
  empleado: Empleado[] = [];
  id :any ;
  Invocehader:any;
  data:any[]=[];
  info : any={};
  dtoptions:DataTables.Settings={};
  dtTrigger: Subject<any>=new Subject<any>();
  pdfurl='';

      //VALIDACIONES O RESTRICCIONES
      get nombreNoValido(){
        return  this.formulario.get('nombre')?.invalid && this.formulario.get('nombre')?.touched;
      }
      get apellidosNoValido(){
        return  this.formulario.get('apellidos')?.invalid && this.formulario.get('apellidos')?.touched;
      }
      get dniNoValido(){
        return  this.formulario.get('dni')?.invalid && this.formulario.get('dni')?.touched;
      }

      get edadNoValido(){
        return  this.formulario.get('edad')?.invalid && this.formulario.get('edad')?.touched;
      }

      get emailNoValido(){
        return  this.formulario.get('correo')?.invalid && this.formulario.get('correo')?.touched;
      }

      get telefonoNoValido(){
        return  this.formulario.get('telefono')?.invalid && this.formulario.get('telefono')?.touched;
      }get direccionNoValido(){
        return  this.formulario.get('direccion')?.invalid && this.formulario.get('direccion')?.touched;
      }
    get FechaCreacionNoValido(){
      return  this.formulario.get('fecha_creacion')?.invalid && this.formulario.get('fecha_creacion')?.touched;
    }

    

formulario:FormGroup =this.fb.group({
  cargo:[Validators.required],
  horario:[Validators.required],
  nombre:[,[Validators.required, Validators.minLength(2)]],
  apellidos:[,[Validators.required]],
  dni:[,[Validators.required]],
  edad:[,[Validators.required]],
  correo:[,[Validators.required, Validators.email]],
  telefono:[,[Validators.required, Validators.minLength(9)]],
  direccion:[,[Validators.required]],
  estado:[,[Validators.required]],
})
constructor(private empleadoservice:EmpleadoServiceService,private http: HttpClient, private fb:FormBuilder, private router: Router
  ,private toastr: ToastrService){
}    


getEstadoStyle(estados: string[]): any {
  if (estados && estados.length > 0) {
    const estado = estados[0]; // Tomar el primer estado en caso de que haya múltiples estados
    if (estado === 'A') {
      return { 'background-color': 'lightblue' };
    } else if (estado === 'I') {
      return { 'background-color': 'lightcoral' };
    } else {
      // Puedes manejar otros estados o dejarlo vacío si no quieres un estilo especial
      return {};
    }
  }
  return {}; // Manejar el caso en que no hay estados
}
ngOnInit(): void {
    
  this.toastr.toastrConfig.positionClass = 'toast-top-right';
  this.toastr.overlayContainer = this.toastContainer;
  this.ObtenerEmpleado();
  this.dtoptions={
    pagingType:'full_numbers',
    searching:true,
    //paging:false
    //lengthChange:false
    language:{
      searchPlaceholder:'',
       url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
      
      
    }
    };
    this.LoadInvoice();
}
LoadInvoice(){
  this.empleadoservice.GetAllInvoice().subscribe(res =>{
    this.Invocehader =res;
    this.dtTrigger.next(null);
  });
}

detallesEmpleado(id : number){
  this.router.navigate(["empleado",id]);
  }
  
  
private ObtenerEmpleado() {
  this.empleadoservice.obtenerListaEmpleado().subscribe(dato => {
    this.empleado = dato;
    console.log(this.empleado);

  })
}


actualizarEmpleado(id: any) {
  if (!this.formulario.valid) {
    this.formulario.markAllAsTouched();      
    this.toastr.error('Por favor, completa el formulario correctamente', 'Error');
    return

}
const client: any={
  id:id,
  cargo:this.formulario.value.cargo,
  horario:this.formulario.value.horario,
  nombre:this.formulario.value.nombre,
  apellidos:this.formulario.value.apellidos,
  dni:this.formulario.value.dni,
  edad:this.formulario.value.edad,
   correo:this.formulario.value.correo,
  telefono:this.formulario.value.telefono,
  direccion:this.formulario.value.direccion ,
  estado:this.formulario.value.estado ,


}

this.empleadoservice.actualizarEmpleado(client).subscribe(
  (resp) => {
    this.ObtenerEmpleado();
    this.toastr.success('Empleado actualizado con éxito', 'Éxito')
  },
  (error) => {
    console.error('Error al actualizar el empleado:', error);
    this.toastr.error('Error al actualizar el empleado', 'Error')
  
});
}
seleccionarEmpleado(id:any){
  this.empleadoservice.seleccionarEmpleado(id)
  .subscribe((resp:any)=>{
    this.info=resp;
    console.log(this.info);
    this.id=id;
    console.log(this.id);
  });
}

eliminarEmpleado(id:any,x:number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás recuperar el dato!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, elimínalo!',
    cancelButtonText: 'Cancelar'
  }).then((result: { isConfirmed: any; }) => {
    if (result.isConfirmed) {
      this.empleadoservice.eliminarEmpleado(id).subscribe(
        () => {
          this.data.splice(x, 1); // Eliminar el dato del arreglo local
          Swal.fire('¡Eliminado!', 'Ha sido eliminado el empleado.', 'success');
        },
        (error) => {
          console.error('Error al eliminar al Empleado:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar al Empleado.', 'error');
        }
      );
    }
  });

}

}
