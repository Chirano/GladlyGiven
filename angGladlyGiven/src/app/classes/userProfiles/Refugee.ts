// Author: Tiago Barracha ti.barracha@gmail.com

import { AppUser } from "./baseUsers/AppUser";

export interface Refugee extends AppUser {
    protocolId      : string,
    sns             : string,
    nationality     : string,
    country         : string,
}