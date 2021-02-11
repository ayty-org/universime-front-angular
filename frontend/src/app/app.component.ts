import { Component } from '@angular/core';

import { AccountService } from './_services';
import { loginResponse } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    login: loginResponse;

    constructor(private accountService: AccountService) {
       this.accountService.loginRes.subscribe(x => this.login = x);
    }

    logout() {
        this.accountService.logout();
    }
}