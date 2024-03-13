// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import pt.gladlyGivenApi.GladlyGiven.Enums.AvailabilityStatus;

@Entity
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    public long serviceProviderId;

    public AvailabilityStatus availabilityStatus;

    public String startDate;

    public String startTime;

    public String endDate;

    public String endTime;

    public Availability() {

    }

    public Availability(long serviceProviderId, AvailabilityStatus availabilityStatus, String startDate, String startTime, String endDate, String endTime) {
        this.serviceProviderId = serviceProviderId;
        this.availabilityStatus = availabilityStatus;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
    }
}
