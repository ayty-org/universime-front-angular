import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/template/login/login.component';
import { CadastroCrudComponent } from './views/cadastro-crud/cadastro-crud.component';

import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {
  path: "",
  component: HomeComponent
},
{
  path:"cadastro",
  component: CadastroCrudComponent
},
{
  path:"login",
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
