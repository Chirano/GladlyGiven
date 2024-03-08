// Author: Tiago Barracha ti.barracha@gmail.com

import { AppUser } from "./AppUser";

export interface Refugee extends AppUser {
    protocolId : string,
    snsNumber : string,
    nationality : string,
    country : string,
}