import { Component } from '@angular/core';

import { tokenUser } from '@app/_models';
import { AccountService } from '@app/_services';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: tokenUser;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}