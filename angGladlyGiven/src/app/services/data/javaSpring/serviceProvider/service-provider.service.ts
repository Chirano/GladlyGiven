import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { ServiceProviderDTO } from 'src/app/classes/userProfiles/ServiceProviderDTO';
import { MockServiceProviders } from 'src/app/classes/userProfiles/mockUsers/MockServiceProviders';
import { EventManagerService } from 'src/app/services/events/event-manager.service';
import { Appointment } from 'src/app/classes/Appointment';
import { Availability } from 'src/app/classes/Availability';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { HealthService } from 'src/app/classes/HealthServices';
import { Category } from 'src/app/classes/Category';
import { HealthserviceService } from 'src/app/services/healthservices/healthservice.service';
import { AppointmentDTO } from 'src/app/classes/AppoitmentDTO';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService  {

  // Variables
  // ---------------------------------------------------
  private baseUrl = "http://localhost:8080/api";
  static selectedServiceProvider : ServiceProviderDTO;
  
  healthServices: HealthService[] = [];
  categories: Category[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' }),
  };



  // Constructor & Initialization
  // ---------------------------------------------------
  constructor(
      private http: HttpClient,
      private healthService: HealthserviceService,
    ) {
    EventManagerService.OnSelectedServiceProvider.subscribe(this.OnSelectedServiceProvider.bind(this));
  }



  // Categories & Services
  // ---------------------------------------------------
  cacheCategoriesAndHealthSerrvices() {
    this.cacheCategories();
    this.cacheHealthServices();
  }

  cacheCategories(): Observable<void> {
    return this.healthService.getAllCategories().pipe(
      map(categories => {
        this.categories = categories;
        return; // Return void
      })
    );
  }

  cacheHealthServices(): Observable<HealthService[]> {
    return this.healthService.getAllServices().pipe(
      map(services => {
        this.healthServices = services;
        return services; // Emit the array of health services
      })
    );
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getHealthServices(): HealthService[] {
    return this.healthServices;
  }

  getCategoryById(categoryId: number): Observable<Category | null> {
    if (this.categories.length === 0) {
      // If categories are not cached, fetch them and filter for the matching category
      return this.cacheCategories().pipe(
        map(() => {
          const category = this.categories.find(cat => cat.id === categoryId);
          console.log('Category found:', category); // Log the category to check if it's found
          return category ? category : null;
        })
      );
    } else {
      // If categories are already cached, immediately return the matching category
      const category = this.categories.find(cat => cat.id === categoryId);
      console.log('Category found:', category); // Log the category to check if it's found
      return of(category ? category : null);
    }
  }

  getHealthServicesByIds(serviceIds: number[] | null): Observable<HealthService[]> {
    if (!serviceIds || serviceIds.length === 0) {
      // If service IDs array is empty or null, return an empty array
      return of([]);
    }
  
    if (this.healthServices.length === 0) {
      // If health services are not cached, fetch them and return an Observable
      return this.cacheHealthServices().pipe(
        map(services => services.filter(service => serviceIds.includes(service.id)))
      );
    } else {
      return of(this.healthServices.filter(service => serviceIds.includes(service.id)));
    }
  }

  getHealthServicesStringByIds(serviceIds: number[] | null): Observable<string> {
    return this.getHealthServicesByIds(serviceIds).pipe(
      map((services: HealthService[]) => {
        const descriptions = services.map(service => service.description);
        return descriptions.join(', ');
      })
    );
  }



  // Service Provider
  // ---------------------------------------------------
  
  // PUT /api/serviceProvider
  updateServiceProvider(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/serviceProvider`, data);
  }

  // PUT /api/serviceProvider/{serviceProviderId}/removeservice/{healthServiceId}
  removeServiceFromServiceProvider(serviceProviderId: number, healthServiceId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/serviceProvider/${serviceProviderId}/removeservice/${healthServiceId}`, {});
  }

  // PUT /api/serviceProvider/{serviceProviderId}/addservice/{healthServiceId}
  addServiceToServiceProvider(serviceProviderId: number, healthServiceId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/serviceProvider/${serviceProviderId}/addservice/${healthServiceId}`, {});
  }

  // POST /api/serviceProvider/review/{licensenumber}
  postReviewByLicenseNumber(licenseNumber: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/review/${licenseNumber}`, data);
  }

  // POST /api/serviceProvider/review/{id}
  postReviewById(id: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/review/${id}`, data);
  }

  // POST /api/serviceProvider/params
  postServiceProviderParams(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/params`, data);
  }

  // POST /api/serviceProvider/body
  postServiceProviderBody(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/body`, data);
  }

  // POST /api/serviceProvider/availability/{id}
  postServiceProviderAvailability(id: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/serviceProvider/availability/${id}`, data);
  }

  // GET /api/serviceProvider/{id}
  getServiceProviderById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/${id}`);
  }

  // GET /api/serviceProvider/licensenumber/{licensenumber}
  getServiceProviderByLicenseNumber(licenseNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/licensenumber/${licenseNumber}`);
  }

  // GET /api/serviceProvider/lastname/{name}
  getServiceProviderByLastName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/lastname/${name}`);
  }

  // GET /api/serviceProvider/healthservice/{id}
  getServiceProviderByHealthServiceId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/healthservice/${id}`);
  }

  // GET /api/serviceProvider/firstname/{name}
  getServiceProviderByFirstName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/firstname/${name}`);
  }

  // GET /api/serviceProvider/email/{email}
  getServiceProviderByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/serviceProvider/email/${email}`);
  }


  // Availability
  // ---------------------------------------------
  addAvailability(availability: Availability): Observable<Availability> {
    const newAvailability: Availability = {
      id : availability.id,
      serviceProviderId: AuthService.SessionContext.userId,
      startDate: availability.startDate,
      endDate : availability.endDate,
      startTime: availability.startTime,
      endTime : availability.endTime,
      availabilityStatus: availability.availabilityStatus, 
    };

    return this.http.post<any>(
      this.baseUrl + "/api/serviceProvider/availability", // http://localhost:8080/api/serviceProvider/availability
      newAvailability, this.httpOptions
    );
  }

  getAvailabilitiesByServiceProvider(serviceProvider : ServiceProviderDTO) : Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.baseUrl}/serviceProvider/availabilities/${serviceProvider.id}`);
  }

  getAvailabilitiesByServiceProviderId(serviceProviderId : number) : Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.baseUrl}/serviceProvider/availabilities/${serviceProviderId}`);
  }
  

  // Appointments
  // ---------------------------------------------
  createAppointment(appointment : AppointmentDTO) : Observable<any> {
    var url : string = `${this.baseUrl}/appointment`;
    return this.http.post(url, appointment);
  }

  static MapToServiceProvider(data: any): ServiceProviderDTO | null {
    if (data == null) {
      console.log("Tried to map null Service Provider data...");
      return null;
    }

    return {
      id: data.id || -1,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      gender: data.gender || '',
      photoURL: data.photoURL || '',
      mainLanguage: data.mainLanguage || '',
      secondLanguage: data.secondLanguage || '',
      mainPhoneNumber: data.phone || '',

      nif: data.nif || '',
      paymentInfoId: data.paymentInfoId || '',
      invoiceInfoId: data.invoiceInfoId || '',
      
      licenseNumber: data.licenseNumber || '',
      categoryId: data.categoryId || '',
      servicesIds: data.servicesIds || [],
      healthServices: data.healthServices || [],
      reviewIds: data.reviewIds || [],
      reviewAverage: data.reviewAverage || '',
      streetName: data.streetName || '',
      doorNumber: data.doorNumber || '',
      cityName: data.cityName || '',
      postalCode: data.postalCode || '',
    };
  }

  static GetServiceProviderHealthServicesAsString(serviceProvider: ServiceProviderDTO): string {
    let healthServicesString = '';
    if (serviceProvider && serviceProvider.healthServices) {
        healthServicesString = serviceProvider.healthServices.map(service => service.description).join(', ');
    }
    return healthServicesString;
}

  // chat gtp generated
  static GetRandomServiceProvider(): ServiceProviderDTO {
    // Explicit typing for mock service providers
    const mockServiceProviders: { [key: string]: ServiceProviderDTO } = MockServiceProviders;

    const serviceProviderKeys = Object.keys(mockServiceProviders);
    const randomKey = serviceProviderKeys[Math.floor(Math.random() * serviceProviderKeys.length)];
    return mockServiceProviders[randomKey];
  }

  //GET http://localhost:8080/api/search/service/{serviceDescription}/{cityName}?serviceDescription=Troca%20de%20curativo&cityName=Porto
  searchServiceProvidersByServiceDescriptionAndCityName(serviceDescription : string, cityName : string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/search/service/${serviceDescription}/${cityName}`);
  }

  private OnSelectedServiceProvider(serviceProvider : ServiceProviderDTO) {
    ServiceProviderService.selectedServiceProvider = serviceProvider;
  }
}
