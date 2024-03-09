// Author: Tiago Barracha ti.barracha@gmail.com

import { MonetaryUser } from "./baseUsers/MonetaryUser";

export interface ServiceProvider extends MonetaryUser {
    licenseNumber   : string,
    categoryId      : number,
    servicesIds     : number[],
    reviewAverage   : number,
}