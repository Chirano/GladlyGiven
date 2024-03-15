import { Component } from '@angular/core';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { ServiceProviderService } from 'src/app/services/data/javaSpring/serviceProvider/service-provider.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-sign-up-service-provider',
  templateUrl: './view-sign-up-service-provider.component.html',
  styleUrls: ['./view-sign-up-service-provider.component.scss']
})
export class ViewSignUpServiceProviderComponent {

  registerNewServiceProvider(form: any) {
    var serviceProvider: ServiceProviderDTO | null = null;

    if (form.valid) {
      serviceProvider = {
        // app user
        id: -1,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        gender: form.value.gender,
        photoURL: "",
        mainLanguage: form.value.mainLanguage,
        secondLanguage: form.value.secondLanguage,
        mainPhoneNumber: form.value.phone,

        // monetary user
        nif: form.value.nif,
        paymentInfoId: form.value.paymentInfoId,
        invoiceInfoId: form.value.invoiceInfoId,

        // service provider
        licenseNumber: form.value.licenseNumber,
        categoryId: form.value.categoryId,
        servicesIds: [],
        reviewIds: [],
        reviewAverage: form.value.reviewAverage,
        streetName: form.value.streetName,
        doorNumber: form.value.doorNumber,
        cityName: form.value.cityName,
        postalCode: form.value.postalCode,
      };
    } else {
      do {
        serviceProvider = ServiceProviderService.GetRandomServiceProvider();
      } while(serviceProvider == null);
      
      console.log("Form is invalid, creating mock user: ", serviceProvider);    
    }

    if (serviceProvider) {
      EventManagerService.OnSignUpServiceProviderEvent.emit(serviceProvider);
    }
  }
}
