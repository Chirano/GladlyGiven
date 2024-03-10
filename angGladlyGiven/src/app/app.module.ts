import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { ViewAdminComponent } from './components/views/view-admin/view-admin.component';
import { ViewServiceProviderComponent } from './components/views/view-service-provider/view-service-provider.component';
import { ViewRefugeeComponent } from './components/views/view-refugee/view-refugee.component';
import { ViewDonorComponent } from './components/views/view-donor/view-donor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackButtonComponent } from './components/buttons/back-button/back-button.component';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    BodyComponent,
    FooterComponent,
    
    ViewSignUpComponent,
    ViewSignInComponent,
    ViewSignUpFilterHelpIntentionComponent,
    ViewSignUpFilterHelpTypeComponent,

    ViewSignUpRefugeeComponent,
    ViewSignUpServiceProviderComponent,
    ViewSignUpDonorComponent,
    
    ViewAdminComponent,
    ViewServiceProviderComponent,
    ViewRefugeeComponent,
    ViewDonorComponent,
    BackButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
