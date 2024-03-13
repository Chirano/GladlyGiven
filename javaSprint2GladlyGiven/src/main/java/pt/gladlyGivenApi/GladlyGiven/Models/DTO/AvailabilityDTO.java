package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import pt.gladlyGivenApi.GladlyGiven.Enums.AvailabilityStatus;

public class AvailabilityDTO {
    public long id;

    public long serviceProviderId;

    public String startDate;

    public String startTime;

    public String endDate;

    public String endTime;
}
