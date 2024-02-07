import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router){}

  navegar(){
    setTimeout(() => {   
      this.router.navigate(['/']); 
    }, 1000); 
   }

  logout() {
    setTimeout(() => {   
      this.router.navigate(['/']); 
    }, 1000); 
  }
 
 
}
