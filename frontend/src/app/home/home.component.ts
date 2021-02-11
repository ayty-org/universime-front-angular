import { Component } from '@angular/core';

import { loginResponse } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    login: loginResponse;

    constructor(private accountService: AccountService) {
        this.login = this.accountService.loginValue;
    }
}