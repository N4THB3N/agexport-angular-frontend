import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { EmpListComponent } from './components/emp-list/emp-list.component';

export const routes: Routes = [  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmpListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }];
