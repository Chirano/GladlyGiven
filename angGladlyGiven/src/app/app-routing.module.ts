import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPaths } from './classes/routing/RoutePaths';
import { ViewSignInComponent } from './components/views/view-sign-in/view-sign-in.component';
import { ViewSignUpComponent } from './components/views/view-sign-up/view-sign-up.component';
import { ViewSignUpFilterHelpIntentionComponent } from './components/views/view-sign-up-filter-help-intention/view-sign-up-filter-help-intention.component';
import { ViewSignUpFilterHelpTypeComponent } from './components/views/view-sign-up-filter-help-type/view-sign-up-filter-help-type.component';
import { ViewSignUpRefugeeComponent } from './components/views/view-sign-up-refugee/view-sign-up-refugee.component';
import { ViewSignUpServiceProviderComponent } from './components/views/view-sign-up-service-provider/view-sign-up-service-provider.component';
import { ViewSignUpDonorComponent } from './components/views/view-sign-up-donor/view-sign-up-donor.component';
import { ViewAdminComponent } from './components/views/view-admin/view-admin.component';
import { ViewRefugeeComponent } from './components/views/view-refugee/view-refugee.component';
import { ViewServiceProviderComponent } from './components/views/view-service-provider/view-service-provider.component';
import { ViewDonorComponent } from './components/views/view-donor/view-donor.component';
import { RefreshSignUpGuard as RefreshSignUpGuard } from './guards/refresh/refreshSignUp.guard';
import { ViewFaqComponent } from './components/views/view-faq/view-faq.component';
import { ViewCostsupportServiceProviderComponent } from './components/views/view-costsupport-service-provider/view-costsupport-service-provider.component';
import { ViewListCostsupportComponent } from './components/views/view-list-costsupport/view-list-costsupport.component';



const routes: Routes = [
  { path: '', redirectTo: RouterPaths.SignIn, pathMatch: 'full' },
  
  { path: RouterPaths.SignIn, component: ViewSignInComponent },
  { path: RouterPaths.SignUp, component: ViewSignUpComponent },

  // when refreshed, these pages should route back Home - maybe these components should be a child of the SignUp component?
  // refresh start
  { path: RouterPaths.SignUpHelpIntention, component: ViewSignUpFilterHelpIntentionComponent, canActivate: [RefreshSignUpGuard] },
  { path: RouterPaths.SignUpHelpType, component: ViewSignUpFilterHelpTypeComponent, canActivate: [RefreshSignUpGuard] },

  { path: RouterPaths.SignUpRefugee, component: ViewSignUpRefugeeComponent, canActivate: [RefreshSignUpGuard] },
  { path: RouterPaths.SignUpServiceProvider, component: ViewSignUpServiceProviderComponent, canActivate: [RefreshSignUpGuard] },
  { path: RouterPaths.SignUpDonor, component: ViewSignUpDonorComponent, canActivate: [RefreshSignUpGuard] },
  // refresh end

  { path: RouterPaths.ViewAdmin, component: ViewAdminComponent },
  { path: RouterPaths.ViewRefugee, component: ViewRefugeeComponent },
  { path: RouterPaths.ViewServiceProvider, component: ViewServiceProviderComponent },
  { path: RouterPaths.ViewDonor, component: ViewDonorComponent },
  { path: RouterPaths.ViewCostSupport, component: ViewCostsupportServiceProviderComponent },
  { path: RouterPaths.ViewListCostsupport, component: ViewListCostsupportComponent },

  // FAQ
  { path: RouterPaths.ViewFaq, component: ViewFaqComponent, canActivate: [RefreshSignUpGuard] },

  { path: '**', redirectTo: RouterPaths.SignIn }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
