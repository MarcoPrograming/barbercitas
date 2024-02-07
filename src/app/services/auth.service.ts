import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router : Router,
    private ngZone : NgZone
  ){
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.isLoggedIn$.next(true);
      } else {
        localStorage.setItem('user', 'null');
        this.isLoggedIn$.next(false);
      }
    })
  }

  //para ingresar email y contraseña
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        //if (this.userData.emailVerified) { // verifica si el correo electrónico del usuario está verificado
          this.observeUserState()
      //  } else {
        //  alert('Por favor, verifica tu correo electrónico.');
          //this.logOut();
       // }
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
  }
  
  //ingreso con google
  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observeUserState())
      .catch((error: Error) => {
        alert(error.message);
      })
  }

  // sign-up with email and password
  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']))
    })
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

   // logOut o salir
   logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }




}
