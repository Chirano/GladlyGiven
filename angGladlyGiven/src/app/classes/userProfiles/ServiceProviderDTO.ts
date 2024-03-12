// Author: Tiago Barracha ti.barracha@gmail.com

export interface ServiceProviderDTO {
    // app user
    id:                 number;
    firstName:          string;
    lastName:           string;
    email:              string;
    gender:             string;
    photoURL:           string;
    mainLanguage:       string;
    mainPhoneNumber:    string;

    // monetary user
    nif:                string,
    paymentInfoId:      string,
    invoiceInfoId:      string,

    // service provider
    licenseNumber:      string,
    categoryId:         number,
    servicesIds:        number[] | null,
    reviewIds:          number[] | null,
    reviewAverage:      number,
}
