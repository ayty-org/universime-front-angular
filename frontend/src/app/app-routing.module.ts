import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';

import { AuthGuard } from './_helpers';

const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const cadastroModule = () => import('./product/product-create/users2.module').then(x => x.UsersModule);



const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'cadastrar', loadChildren: cadastroModule, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
