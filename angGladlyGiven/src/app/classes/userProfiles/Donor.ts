// Author: Tiago Barracha ti.barracha@gmail.com

import { MonetaryUser } from "./MonetaryUser";

export interface Donor extends MonetaryUser {
    fiscalIdentity : number,
    donationIds : number[],
}