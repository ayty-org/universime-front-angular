import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { User, userDTO } from '@app/_models';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            login: ['', Validators.required],
            password:  ['', [Validators.required, Validators.minLength(6)]],
            email:  ['', Validators.required],
            fullname: ['', Validators.required],
            profile:     ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const user  = new User(this.f.login.value,this.f.password.value,this.f.email.value,this.f.fullname.value,this.f.profile.value);
        console.log(user)
        this.accountService.register(user)
            .pipe(first())
            .subscribe(
                
                user => {
                    console.log(user);
                    this.alertService.success(`${user.login} Registrado com sucesso`, { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });

                },
                error => {
                    console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
