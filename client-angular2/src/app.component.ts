import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      Hello world!
      <a [routerLink]="['home']">Home</a>
      <a [routerLink]="['login']">Login</a>
      <a [routerLink]="['register']">Register</a>
      <!-- Routed views go here -->
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES] ,
})
export class AppComponent {}
