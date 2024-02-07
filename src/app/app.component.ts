import { Component,OnInit  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{
  shouldShowHeader: boolean = true;
  shouldShowBody: boolean = true;
  shouldShowFooter: boolean = true;
  showLogin:boolean = true;

  title = 'barbercitas';
showregister: boolean= true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Detecta cambios en la ruta para ajustar la visibilidad de los componentes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        this.adjustComponentVisibility(currentRoute);
        this.adjustComponentVisibiliti(currentRoute);
        this.adjustComponentVisibilit(currentRoute);
        this.adjustComponentVisibilitRegister(currentRoute);
      }
    });
  }

  adjustComponentVisibility(route: string) {
    // Define las rutas donde no se debe mostrar el encabezado, cuerpo ni pie de página
    const routesWithoutLayout = ['/registro','/home','/','/login']; // Agrega aquí más rutas si es necesario
     this.shouldShowHeader = !routesWithoutLayout.includes(route);
     this.shouldShowFooter = !routesWithoutLayout.includes(route);
    // this.shouldShowBody = !routesWithoutLayout.includes(route);

  }
  adjustComponentVisibiliti(route: string) {

    // Agrega aquí las rutas donde se debe ocultar el cuerpo
    const routesWithoutBody = ['/registro','/cliente','/listaEmpleado' , '/RegistrarEmpleado' ,'/login' ,"/RegistrarCliente",'/dashboard','/registrarCita'
  ,'/listarCita']; // Rutas donde el cuerpo debe ocultarse
    this.shouldShowBody = !routesWithoutBody.includes(route);
  }

  adjustComponentVisibilit(route: string) {

    // Agrega aquí las rutas donde se debe ocultar el login
    const routesWithoutLogin = ['/registro','/home','/','/listaEmpleado','/cliente' , '/RegistrarEmpleado',"/RegistrarCliente",'/dashboard','/registrarCita'
  ,'/listarCita']; // Rutas donde el cuerpo debe ocultarse
    this.showLogin = !routesWithoutLogin.includes(route);
  }

  adjustComponentVisibilitRegister(route:string){
    const routesWithouregister = ['/home','/','/login','/listaEmpleado','/cliente' , '/RegistrarEmpleado',"/RegistrarCliente",'/dashboard','/registrarCita'
    ,'/listarCita']; // Rutas donde se oculta el registro
      this.showregister= !routesWithouregister.includes(route);
    }
  
  


}
