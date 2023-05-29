import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DashboardComponent
} from '@pages/components';

import { 
  AuthGuard,
  SignupGuard
} from '@app/shared/guards/guards'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    title: 'Login', 
    canActivate: [SignupGuard],
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)
  }, 
  { 
    path: 'create-account', 
    title: 'Create account', 
    canActivate: [SignupGuard],
    loadChildren: () => import('./pages/auth/create-account/create-account.module').then(m => m.CreateAccountModule)
  },
  { 
    path: 'dashboard', 
    title: 'Dashboard', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { path: '**', redirectTo: '/dashboard' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
