import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { gmail } from 'googleapis/build/src/apis/gmail';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('content') popupview !: ElementRef;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;
  loginForm!: FormGroup;

  toasts: any[] = [];
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
    this.toastr.overlayContainer = this.toastContainer;
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logIn() {
    return   this.authService.logInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
    .then((userCredential) => {
      this.toastr.success('Inicio de sesion corectamente' , 'Exito');
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        console.log('Usuario no encontrado. Por favor, regístrate.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
      } else {
        alert(error.message);
      }
    });

    this.authService.logInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
    
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider()
  }



  handleError(error: Error) {
    this.toastr.error(error.message);
  }

  

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.toastr.success('Inicio de sesion corectamente' , 'Exito');
      this.logIn();

    } else {
      this.toastr.error('Por favor, complete todos los campos requeridos.', 'Error');
    }
  }
}