import { DonationType } from "./DonationType";
import { FiscalIdentity } from "./FiscalIdentity";

export interface Donation{
    id: number;
    donorId: number;
    amount: number;
    donationType: DonationType;
    fiscalIdentity: FiscalIdentity;
    date: string;
}
