// Author: Tiago Barracha ti.barracha@gmail.com

export interface RefugeeDTO {
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

    // refugee
    protocolId:         string;
    snsNumber:          string;
    nationality:        string;
    country:            string;
}
