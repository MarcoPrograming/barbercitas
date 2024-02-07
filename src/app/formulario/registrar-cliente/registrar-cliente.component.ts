import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../entity/cliente';
import { ClienteServiceService } from '../../services/cliente-service.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css',]
  
})
export class RegistrarClienteComponent implements OnInit{
  cliente : Cliente =new Cliente();
  estado!: string;

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
get estadoNoValido(){
  return  this.formulario.get('estado')?.invalid && this.formulario.get('estado')?.touched;
}




  formulario:FormGroup =this.fb.group({
    nombres:[,[Validators.required, Validators.minLength(2)]],
    apellidos:[,[Validators.required]],
    edad:[,[Validators.required]],
    email:[,[Validators.required, Validators.email]],
    telefono:[,[Validators.required, Validators.minLength(9)]],
    direccion:[,[Validators.required]],
    estado:[,[Validators.required, Validators.minLength(1)]],


  })
  constructor(private clienteService:ClienteServiceService, private fb:FormBuilder, private router: Router){

  }

  ngOnInit(): void {
  }
   
  // guardarCliente(){
  //   this.clienteService.registrarCliente(this.cliente).subscribe(dato=>{
  //     console.log(dato);
  //     this.IrAlaListaCliente();
      
  //     },error=>console.error(error) );
  // }
  

  guardarCliente() {
    this.clienteService.registrarCliente(this.cliente).subscribe(
      (response: any) => {
        // Si la respuesta es un JSON válido, usa el mensaje. De lo contrario, muestra un mensaje predeterminado.
        const mensaje = response?.message || 'Cliente guardado correctamente';
  
        // Muestra un mensaje de éxito con SweetAlert
        Swal.fire('Éxito', mensaje, 'success');
  
        // Redirige a la lista de clientes u otra acción que necesites
        this.IrAlaListaCliente();
      },
      (error) => {
        console.error(error);
  
        if (error.status === 400 && error.error === 'Error: Cliente duplicado') {
          // Si el error indica que el cliente ya existe, muestra un mensaje de SweetAlert
          Swal.fire('Info', 'El cliente ya existe', 'info');
        } else {
          // Si es otro tipo de error, muestra un mensaje de error genérico
          Swal.fire('Error', 'Hubo un error al registrar el cliente', 'error');
        }
      }
    );
  }
        
IrAlaListaCliente(){
    this.router.navigate(['/cliente'])
  }

  onSubmit(){
    this.guardarCliente();
  }

}
