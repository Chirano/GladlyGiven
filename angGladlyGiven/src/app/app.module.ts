import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/main/header/header.component';
import { BodyComponent } from './components/main/body/body.component';
import { FooterComponent } from './components/main/footer/footer.component';

import { ViewSignUpComponent } from './components/view/view-sign-up/view-sign-up.component';
import { ViewSignInComponent } from './components/view/view-sign-in/view-sign-in.component';

import { ViewAdminComponent } from './components/view/view-admin/view-admin.component';
import { ViewServiceProviderComponent } from './components/view/view-service-provider/view-service-provider.component';
import { ViewRefugeeComponent } from './components/view/view-refugee/view-refugee.component';
import { ViewDonorComponent } from './components/view/view-donor/view-donor.component';
import { ServiceInitializerComponent } from './components/utils/service-initializer/service-initializer.component';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    BodyComponent,
    FooterComponent,
    
    ViewSignUpComponent,
    ViewSignInComponent,
    
    ViewAdminComponent,
    ViewServiceProviderComponent,
    ViewRefugeeComponent,
    ViewDonorComponent,
    ServiceInitializerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
