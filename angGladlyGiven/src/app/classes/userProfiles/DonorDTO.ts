// Author: Tiago Barracha ti.barracha@gmail.com

export interface DonorDTO {
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

    // donor
    fiscalIdentity:     number,
    donationIds:        number[] | null,
}