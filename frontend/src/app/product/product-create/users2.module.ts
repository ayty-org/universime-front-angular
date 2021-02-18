import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing2.module';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { TesteComponent } from './teste.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTreeModule} from '@angular/material/tree';





@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        MatSnackBarModule,
        MatTreeModule

    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        TesteComponent
    ]
})
export class UsersModule { }
