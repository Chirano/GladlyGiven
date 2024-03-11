import { Component } from '@angular/core';
import { ServiceProvider } from 'src/app/classes/userProfiles/ServiceProvider';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-up-service-provider',
  templateUrl: './view-sign-up-service-provider.component.html',
  styleUrls: ['./view-sign-up-service-provider.component.scss']
})
export class ViewSignUpServiceProviderComponent {

  private serviceProvider: ServiceProvider | null = null;

  registerNewServiceProvider(form: any) {
  
    if (form.valid) {
      this.serviceProvider = {
        // app user:
        id : -1,
        firstName         : form.value.firstName,
        lastName          : form.value.lastName,
        email             : form.value.email,
        gender            : form.value.gender,
        phone             : form.value.phone,
        photoURL          : "",
        mainLanguage      : form.value.mainLanguage,
        secondLanguage    : form.value.secondLanguage,
  
        // monetary user:
        nif               : form.value.mainLanguage,
        paymentInfoId     : form.value.mainLanguage,
        invoiceInfoId     : form.value.mainLanguage,

        // service provider:
        licenseNumber     : form.value.phoneNumber,
        categoryId        : form.value.phoneNumber,
        servicesIds       : [],
        reviewIds         : [],
        reviewAverage     : form.value.phoneNumber,
      };
      
      // console.log(this.refugee);
      EventManagerService.OnSignUpServiceProviderEvent.emit(this.serviceProvider);
    } else {
      console.log("Form is invalid");
    }
  }
}
