import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register.component';

import { AuthGuard } from './auth.guard';

import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    LoginService
  ]
})
export class AppModule {}
