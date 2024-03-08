// Author: Tiago Barracha ti.barracha@gmail.com

import { AppUser } from "./AppUser";

export interface MonetaryUser extends AppUser {
    nif : string,
    paymentInfoId : string,
    invoiceInfoId : string,
}