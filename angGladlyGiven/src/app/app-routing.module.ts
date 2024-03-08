import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAdminComponent } from './components/view/view-admin/view-admin.component';
import { ViewDonorComponent } from './components/view/view-donor/view-donor.component';
import { ViewRefugeeComponent } from './components/view/view-refugee/view-refugee.component';
import { ViewServiceProviderComponent } from './components/view/view-service-provider/view-service-provider.component';
import { ViewSignInComponent } from './components/view/view-sign-in/view-sign-in.component';
import { ViewSignUpComponent } from './components/view/view-sign-up/view-sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: ViewSignInComponent },
  { path: 'signup', component: ViewSignUpComponent },
  { path: 'admin', component: ViewAdminComponent },                       // canActivate: [AuthGuard]
  { path: 'service-provider', component: ViewServiceProviderComponent },  // canActivate: [AuthGuard]
  { path: 'refugee', component: ViewRefugeeComponent },                   // canActivate: [AuthGuard]
  { path: 'donor', component: ViewDonorComponent },                       // canActivate: [AuthGuard]
  { path: '**', redirectTo: '/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
