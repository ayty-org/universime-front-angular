import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { deleteComponent } from './delete.component';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { TesteComponent } from './teste.component';
import { updateComponent } from './update.component';
import { projetosComponent} from './projects/projetos.component'


const routes: Routes = [
    {
        path: "", component: LayoutComponent,
        children: [
            { path: "", component: ListComponent },
            { path: "create", component: TesteComponent},
            { path: "update/:id", component: updateComponent},
            { path: "delete/:id", component: deleteComponent},
            { path: "atividades/:id",  component: projetosComponent},



        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
