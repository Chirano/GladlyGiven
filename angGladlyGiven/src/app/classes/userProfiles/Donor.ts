// Author: Tiago Barracha ti.barracha@gmail.com

import { MonetaryUser } from "./baseUsers/MonetaryUser";

export interface Donor extends MonetaryUser {
    fiscalIdentity : number,
    donationIds : number[] | null,
}