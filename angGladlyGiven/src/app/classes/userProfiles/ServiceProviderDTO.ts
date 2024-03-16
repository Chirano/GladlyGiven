// Author: Tiago Barracha ti.barracha@gmail.com

import { HealthService } from "../HealthServices";

export interface ServiceProviderDTO {
    // app user
    id:                 number;
    firstName:          string;
    lastName:           string;
    email:              string;
    gender:             string;
    photoURL:           string;
    mainLanguage:       string;
    secondLanguage:     string;
    mainPhoneNumber:    string;

    // monetary user
    nif:                string,
    paymentInfoId:      string,
    invoiceInfoId:      string,

    // service provider
    licenseNumber:      string,
    categoryId:         number,
    servicesIds:        number[] | null,
    healthServices:     HealthService[],
    reviewIds:          number[] | null,
    reviewAverage:      number,
    streetName:         string,
    doorNumber:         string,
    cityName:           string,
    postalCode:         string
}
