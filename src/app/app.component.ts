import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'articulos';

  constructor(private router: Router){

  }

  pruebaRuta(){
    this.router.navigate(['clientes']);
  }
}
