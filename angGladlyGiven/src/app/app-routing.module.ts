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
import { ViewContactComponent } from './components/views/view-contact/view-contact.component';
import { ViewServiceRequestComponent } from './components/views/view-service-request/view-service-request.component';
import { ViewDonationComponent } from './components/views/view-donation/view-donation.component';
import { ViewAdminListCostsupportComponent } from './components/views/view-admin-list-costsupport/view-admin-list-costsupport.component';
import { ViewListServicerequestComponent } from './components/views/view-list-servicerequest/view-list-servicerequest.component';
import { ViewListDonationsComponent } from './components/views/view-list-donations/view-list-donations.component';
import { ViewReviewComponent } from './components/views/view-review/view-review.component';
import { ViewHomeComponent } from './components/views/view-home/view-home.component';
import { ViewReviewServiceProviderComponent } from './components/views/view-reviews-service-provider/view-review-service-provider/view-review-service-provider.component';
import { ViewServiceProviderServicesComponent } from './components/views/view-service-provider-services/view-service-provider-services/view-service-provider-services.component';
import { ViewAvailabilityComponent } from './components/views/view-availability/view-availability.component';
import { RefugeeHomeComponent } from './components/viewComponents/refugee/refugee-home/refugee-home.component';
import { RefugeeAppointmentsComponent } from './components/viewComponents/refugee/refugee-appointments/refugee-appointments.component';
import { RefugeeHelpRequestComponent } from './components/viewComponents/refugee/refugee-help-request/refugee-help-request.component';
import { RefugeeProfileComponent } from './components/viewComponents/refugee/refugee-profile/refugee-profile.component';
import { RefugeeSearchComponent } from './components/viewComponents/refugee/refugee-search/refugee-search.component';
import { ViewCategoryComponent } from './components/views/view-category/view-category.component';



const routes: Routes = [
  /// remover esse redirecionamento
  { path: RouterPaths.Home, component: ViewHomeComponent },

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
  {
    path: RouterPaths.ViewRefugee, component: ViewRefugeeComponent,
    children: [
      { path: '', redirectTo: RouterPaths.ViewRefugeeHome, pathMatch: 'full' }, // Default child route
      { path: RouterPaths.ViewRefugeeHome, component: RefugeeHomeComponent, outlet: 'view-refugee' },
      { path: RouterPaths.ViewRefugeeSearch, component: RefugeeSearchComponent, outlet: 'view-refugee' },
      { path: RouterPaths.ViewRefugeeAppointments, component: RefugeeAppointmentsComponent, outlet: 'view-refugee' },
      { path: RouterPaths.ViewRefugeeHelpRequest, component: RefugeeHelpRequestComponent, outlet: 'view-refugee' },
      { path: RouterPaths.ViewRefugeeProfile, component: RefugeeProfileComponent, outlet: 'view-refugee' },
    ]
  },
  { path: RouterPaths.ViewServiceProvider, component: ViewServiceProviderComponent },
  { path: RouterPaths.ViewDonor, component: ViewDonorComponent },
  { path: RouterPaths.ViewCostSupport, component: ViewCostsupportServiceProviderComponent},

  //CostSupport
  { path: RouterPaths.ViewCostSupport, component: ViewCostsupportServiceProviderComponent },
  { path: RouterPaths.ViewListCostsupport, component: ViewListCostsupportComponent },
  { path : RouterPaths.ViewAdminListCostsupport, component: ViewAdminListCostsupportComponent },
  //FAQ
  { path: RouterPaths.ViewFaq, component: ViewFaqComponent, canActivate: [RefreshSignUpGuard] },

  //Contact
  { path: RouterPaths.ViewContact, component: ViewContactComponent, canActivate: [RefreshSignUpGuard] },

  { path: RouterPaths.ViewServiceRequest, component: ViewServiceRequestComponent, canActivate: [RefreshSignUpGuard] },

  //Donation
  { path: RouterPaths.ViewDonation, component: ViewDonationComponent, canActivate: [RefreshSignUpGuard] },
  { path: RouterPaths.ViewListDonations, component: ViewListDonationsComponent, canActivate: [RefreshSignUpGuard] },

  //Review
  { path: RouterPaths.ViewReview, component: ViewReviewComponent, canActivate: [RefreshSignUpGuard] },
  { path: RouterPaths.ViewReviewServiceProvider, component: ViewReviewServiceProviderComponent, canActivate: [RefreshSignUpGuard]},

  //HealthServices
  { path: RouterPaths.ViewHealthServicesServiceProvider, component: ViewServiceProviderServicesComponent, canActivate: [RefreshSignUpGuard] },
 
  //Availability
  { path: RouterPaths.ViewAvailability, component: ViewAvailabilityComponent },

  //Service Request
  { path: RouterPaths.ViewListServiceRequest, component: ViewListServicerequestComponent, canActivate: [RefreshSignUpGuard] },

  //Category
  { path: RouterPaths.ViewCategory, component: ViewCategoryComponent, canActivate: [RefreshSignUpGuard] },


  //{ path: '**', redirectTo: RouterPaths.Home },
  //{ path: '', redirectTo: RouterPaths.Home, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
