import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign',
    pathMatch: 'full'
  },
  {
    path: 'sign',
    loadChildren: () => import('src/app/sign/sign.module').then(m => m.SignModule)
  },
  {
    path: 'dashboard/:uid',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
