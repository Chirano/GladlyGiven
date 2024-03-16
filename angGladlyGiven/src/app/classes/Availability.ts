
export interface Availability{
    id : number,
    serviceProviderId : number,
    startDate : string, 
    endDate : string,
    startTime: string,
    endTime : string,
    availabilityStatus : AvailabilityStatus
}

export enum AvailabilityStatus {
    Free,
    Used,
}