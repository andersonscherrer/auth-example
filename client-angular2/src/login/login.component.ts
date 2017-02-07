import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  templateUrl: 'src/login/login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private loginService: LoginService) { }

    ngOnInit() {
        // reset login status
        this.loginService.logout();
    }

    login() {
        this.loading = true;
        this.loginService.login(this.model.email, this.model.password)
            .subscribe(
              result => {
                this.router.navigate(['/']);
              },
              error => {
                this.error = 'Email or password is incorrect';
                this.loading = false;
              },
              () => {
                this.error = 'Connection refused to api/endpoint'
                this.loading = false;
              });
    }
}
