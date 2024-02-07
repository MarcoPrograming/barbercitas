import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, NgModel, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ToastContainerDirective, ToastrService} from 'ngx-toastr';
import { Cliente } from '../../entity/cliente';
import { ClienteServiceService } from '../../services/cliente-service.service';

// import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  @ViewChild('content') popupview !: ElementRef;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  toasts: any[] = [];
  cliente : Cliente[] = [];
  id :any ;
  Invocehader:any;
  data:any[]=[];
  info : any={};
  dtoptions:DataTables.Settings={};
  dtTrigger: Subject<any>=new Subject<any>();
  pdfurl='';

      //VALIDACIONES O RESTRICCIONES
      get nombreNoValido(){
        return  this.formulario.get('nombres')?.invalid && this.formulario.get('nombres')?.touched;
      }
      get apellidosNoValido(){
        return  this.formulario.get('apellidos')?.invalid && this.formulario.get('apellidos')?.touched;
      }
      get edadNoValido(){
        return  this.formulario.get('edad')?.invalid && this.formulario.get('edad')?.touched;
      }
      get emailNoValido(){
        return  this.formulario.get('email')?.invalid && this.formulario.get('email')?.touched;
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
        nombres:[,[Validators.required, Validators.minLength(2)]],
        apellidos:[,[Validators.required]],
        edad:[,[Validators.required]],
        email:[,[Validators.required, Validators.email]],
        telefono:[,[Validators.required, Validators.minLength(9)]],
        direccion:[,[Validators.required]],
        estado:[,[Validators.required]],
      })

      constructor(private clienteService:ClienteServiceService,private http: HttpClient, private fb:FormBuilder, private router: Router
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

    this.ObtenerCliente();
    this.dtoptions={
      pagingType:'full_numbers',
      searching:true,
      language:{
        searchPlaceholder:'',
         url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
        
        
      }
      };
      this.LoadInvoice();
  }

  private ObtenerCliente() {
    this.clienteService.obtenerListaDelCliente().subscribe(dato => {
      this.cliente = dato;
      console.log(this.cliente);

    })
  }


  actualizarCliente(id: any) {
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();      
      this.toastr.error('Por favor, completa el formulario correctamente', 'Error');
      return
  
  }
  const client: any={
    id_cliente:id,
    nombres:this.formulario.value.nombres,
    apellidos:this.formulario.value.apellidos,
    edad:this.formulario.value.edad,
    email:this.formulario.value.email,
    telefono:this.formulario.value.telefono,
    direccion:this.formulario.value.direccion ,
    estado:this.formulario.value.estado ,

  
  }
  
  this.clienteService.actualizarCliente(client).subscribe(
    (resp) => {
      this.ObtenerCliente();
      this.toastr.success('Cliente actualizado con éxito', 'Éxito')
    },
    (error) => {
      console.error('Error al actualizar el cliente:', error);
      this.toastr.error('Error al actualizar el cliente', 'Error')
    
});
  }

  seleccionarCliente(id:any){
    this.clienteService.seleccionarCliente(id)
    .subscribe((resp:any)=>{
      this.info=resp;
      console.log(this.info);
      this.id=id;
      console.log(this.id);
    });
  }

  eliminarCliente(id:any,x:number) {
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
        this.clienteService.eliminarCliente(id).subscribe(
          () => {
            this.data.splice(x, 1); // Eliminar el dato del arreglo local
            Swal.fire('¡Eliminado!', 'Ha sido eliminado el Cliente.', 'success');
          },
          (error) => {
            console.error('Error al eliminar al cliente:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar al Cliente.', 'error');
          }
        );
      }
    });

}

//Generacion de pdf
vizualizarPdf(id: any){
  this.id=id;
  this.clienteService.generarPDF(id).subscribe(res=>{
        let blob: Blob= res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        this.pdfurl =url;
  });

}

descargarPDF(id:any) {
  this.clienteService.descargarPDF(id).subscribe(
    (pdfBlob: Blob) => {
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      window.open(blobUrl, '_blank'); // Abre el PDF en una nueva ventana
    },
    error => {
      alert('error');
      console.error('Error al descargar el PDF', error);
    }
  );
  }

detallesCliente(id : number){
this.router.navigate(["cliente",id]);
}

LoadInvoice(){
  this.clienteService.GetAllInvoice().subscribe(res =>{
    this.Invocehader =res;
    this.dtTrigger.next(null);
  });
}


}

