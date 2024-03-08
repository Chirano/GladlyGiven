import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPaths } from './classes/routing/RoutePaths';
import { ViewSignInComponent } from './components/view/view-sign-in/view-sign-in.component';
import { ViewSignUpComponent } from './components/view/view-sign-up/view-sign-up.component';
import { ViewSignUpFilterHelpIntentionComponent } from './components/view/view-sign-up-filter-help-intention/view-sign-up-filter-help-intention.component';
import { ViewSignUpFilterHelpTypeComponent } from './components/view/view-sign-up-filter-help-type/view-sign-up-filter-help-type.component';
import { ViewSignUpRefugeeComponent } from './components/view/view-sign-up-refugee/view-sign-up-refugee.component';
import { ViewSignUpServiceProviderComponent } from './components/view/view-sign-up-service-provider/view-sign-up-service-provider.component';
import { ViewSignUpDonorComponent } from './components/view/view-sign-up-donor/view-sign-up-donor.component';
import { ViewAdminComponent } from './components/view/view-admin/view-admin.component';
import { ViewRefugeeComponent } from './components/view/view-refugee/view-refugee.component';
import { ViewServiceProviderComponent } from './components/view/view-service-provider/view-service-provider.component';
import { ViewDonorComponent } from './components/view/view-donor/view-donor.component';



const routes: Routes = [
  { path: '', redirectTo: RouterPaths.SignIn, pathMatch: 'full' },
  
  { path: RouterPaths.SignIn, component: ViewSignInComponent },
  { path: RouterPaths.SignUp, component: ViewSignUpComponent },

  { path: RouterPaths.SignUpHelpIntention, component: ViewSignUpFilterHelpIntentionComponent },
  { path: RouterPaths.SignUpHelpType, component: ViewSignUpFilterHelpTypeComponent },

  { path: RouterPaths.SignUpRefugee, component: ViewSignUpRefugeeComponent },
  { path: RouterPaths.SignUpServiceProvider, component: ViewSignUpServiceProviderComponent },
  { path: RouterPaths.SignUpDonor, component: ViewSignUpDonorComponent },

  { path: RouterPaths.ViewAdmin, component: ViewAdminComponent },
  { path: RouterPaths.ViewRefugee, component: ViewRefugeeComponent },
  { path: RouterPaths.ViewServiceProvider, component: ViewServiceProviderComponent },
  { path: RouterPaths.ViewDonor, component: ViewDonorComponent },

  { path: '**', redirectTo: RouterPaths.SignIn }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
