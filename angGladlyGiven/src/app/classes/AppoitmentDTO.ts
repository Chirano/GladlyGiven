export interface AppointmentDTO {
    id: number;
    serviceProviderId: number;
    refugeeId: number;
    healthServiceId: number;
    appointmentDate: string;
    address: string;
    status: AppointmentStatus;
    observations: string;
    startDate: string;
    startTime: string;
    endTime: string;
}

export enum AppointmentStatus {
    WAITING_VALIDATION,
    VALIDATED,
    IN_PROGRESS,
    COMPLETED,
    CANCELED
}