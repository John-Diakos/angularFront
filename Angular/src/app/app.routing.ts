import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { FormComponent } from './user/form/form.component';
import { SubsistentComponent } from './subsistent/subsistent.component';
import { SupervisiorComponent } from './supervisior/supervisior.component';
import { Role } from './_models';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminComponent, //AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'add-user',
        component: AddUserComponent, //AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'edit-user',
        component: EditUserComponent, //AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'user',
        component: FormComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User] }
    },
    {
        path: 'subsistent',
        component: SubsistentComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Subsistent] }
    },
    {
        path: 'supervisior',
        component: SupervisiorComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Supervisior] }
    },


    // // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
