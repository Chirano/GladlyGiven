import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/main/header/header.component';
import { BodyComponent } from './components/main/body/body.component';
import { FooterComponent } from './components/main/footer/footer.component';

import { ViewSignInComponent } from './components/views/view-sign-in/view-sign-in.component';
import { ViewSignUpComponent } from './components/views/view-sign-up/view-sign-up.component';
import { ViewSignUpFilterHelpIntentionComponent } from './components/views/view-sign-up-filter-help-intention/view-sign-up-filter-help-intention.component';
import { ViewSignUpFilterHelpTypeComponent } from './components/views/view-sign-up-filter-help-type/view-sign-up-filter-help-type.component';

import { ViewSignUpRefugeeComponent } from './components/views/view-sign-up-refugee/view-sign-up-refugee.component';
import { ViewSignUpServiceProviderComponent } from './components/views/view-sign-up-service-provider/view-sign-up-service-provider.component';
import { ViewSignUpDonorComponent } from './components/views/view-sign-up-donor/view-sign-up-donor.component';

import { ViewCostsupportServiceProviderComponent } from './components/views/view-costsupport-service-provider/view-costsupport-service-provider.component';
import { ViewAdminComponent } from './components/views/view-admin/view-admin.component';
import { ViewServiceProviderComponent } from './components/views/view-service-provider/view-service-provider.component';
import { ViewDonorComponent } from './components/views/view-donor/view-donor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackButtonComponent } from './components/buttons/back-button/back-button.component';
import { ViewFaqComponent } from './components/views/view-faq/view-faq.component';
import { ViewListCostsupportComponent } from './components/views/view-list-costsupport/view-list-costsupport.component';
import { ViewAdminListCostsupportComponent } from './components/views/view-admin-list-costsupport/view-admin-list-costsupport.component';
import { ViewContactComponent } from './components/views/view-contact/view-contact.component';
import { ViewServiceRequestComponent } from './components/views/view-service-request/view-service-request.component';
import { ViewDonationComponent } from './components/views/view-donation/view-donation.component';
import { ViewListServicerequestComponent } from './components/views/view-list-servicerequest/view-list-servicerequest.component';
import { ViewListDonationsComponent } from './components/views/view-list-donations/view-list-donations.component';
import { ViewReviewComponent } from './components/views/view-review/view-review.component';
import { DevHeaderComponent } from './components/dev/dev-header/dev-header.component';
import { ViewHomeComponent } from './components/views/view-home/view-home.component';
import { ViewReviewServiceProviderComponent } from './components/views/view-reviews-service-provider/view-review-service-provider/view-review-service-provider.component';
import { ViewServiceProviderServicesComponent } from './components/views/view-service-provider-services/view-service-provider-services/view-service-provider-services.component';
import { ViewAvailabilityComponent } from './components/views/view-availability/view-availability.component';
import { RefugeeHeaderComponent } from './components/viewComponents/refugee/refugee-header/refugee-header.component';
import { RefugeeSearchbarComponent } from './components/viewComponents/refugee/refugee-searchbar/refugee-searchbar.component';
import { RefugeeHomeComponent } from './components/viewComponents/refugee/refugee-home/refugee-home.component';
import { RefugeeSearchComponent } from './components/viewComponents/refugee/refugee-search/refugee-search.component';
import { RefugeeAppointmentsComponent } from './components/viewComponents/refugee/refugee-appointments/refugee-appointments.component';
import { RefugeeProfileComponent } from './components/viewComponents/refugee/refugee-profile/refugee-profile.component';
import { AppointmentComponent } from './components/viewComponents/appointment/appointment.component';
import { AvailabilityComponent } from './components/viewComponents/availability/availability.component';
import { ViewCategoryComponent } from './components/views/view-category/view-category.component';
import { RefugeeRequestAppointmentComponent } from './components/viewComponents/refugee/refugee-request-appointment/refugee-request-appointment.component';
import { ButtonAppointmentRequestComponent } from './components/viewComponents/button-appointment-request/button-appointment-request.component';
import { AvailabilityInputComponent } from './components/viewComponents/availability-input/availability-input.component';
import { ServiceProviderDetailsComponent } from './components/viewComponents/serviceProviderComponents/service-provider-details/service-provider-details.component';
import { ServiceProviderDetailsSimpleComponent } from './components/viewComponents/serviceProviderComponents/service-provider-details-simple/service-provider-details-simple.component';
import { GlobalDetailsComponent } from './components/viewComponents/global-details/global-details.component';
import { ViewListServicerequestAllComponent } from './components/views/view-list-servicerequest-all/view-list-servicerequest-all.component';
import { ViewPagenotfoundComponent } from './components/views/view-pagenotfound/view-pagenotfound.component';
import { AppointmentRequestComponent } from './components/viewComponents/appointment-request/appointment-request.component';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    BodyComponent,
    FooterComponent,

    ViewHomeComponent,
    ViewSignUpComponent,
    ViewSignInComponent,
    ViewSignUpFilterHelpIntentionComponent,
    ViewSignUpFilterHelpTypeComponent,

    ViewSignUpRefugeeComponent,
    ViewSignUpServiceProviderComponent,
    ViewSignUpDonorComponent,

    ViewCostsupportServiceProviderComponent,
    ViewListCostsupportComponent,
    ViewAdminListCostsupportComponent,

    ViewAdminComponent,
    ViewServiceProviderComponent,
    ViewDonorComponent,
    BackButtonComponent,

    ViewFaqComponent,
    ViewContactComponent,
    ViewServiceRequestComponent,
    ViewDonationComponent,
    ViewListServicerequestComponent,
    ViewListDonationsComponent,
    ViewReviewComponent,
    DevHeaderComponent,
    ViewReviewServiceProviderComponent,
    ViewServiceProviderServicesComponent,
    ViewAvailabilityComponent,
    RefugeeHeaderComponent,
    RefugeeSearchbarComponent,
    RefugeeHomeComponent,
    RefugeeSearchComponent,
    RefugeeAppointmentsComponent,
    RefugeeRequestAppointmentComponent,
    RefugeeProfileComponent,
    AppointmentComponent,
    AvailabilityComponent,
    ViewCategoryComponent,
    ButtonAppointmentRequestComponent,
    AvailabilityInputComponent,
    ServiceProviderDetailsComponent,
    ServiceProviderDetailsSimpleComponent,
    GlobalDetailsComponent,
    ViewListServicerequestAllComponent,
    ViewPagenotfoundComponent,
    AppointmentRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
