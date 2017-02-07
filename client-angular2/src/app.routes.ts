// - Routes instead of RouteConfig
// - RouterModule instead of provideRoutes
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    name: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    name: 'Login',
    component: LoginComponent,
  },
  {
    path: 'register',
    name: 'Register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

// - Updated Export
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
