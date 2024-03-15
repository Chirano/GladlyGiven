package pt.gladlyGivenApi.GladlyGiven.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import pt.gladlyGivenApi.GladlyGiven.Enums.AppointmentStatus;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long serviceProviderId;
    private long refugeeId;
    private long healthServiceId;
    private String appointmentDate;
    private String address;
    private AppointmentStatus status;
    private String observations;

    private String startDate;

    private String startTime;

    private String endTime;


    public Appointment(long serviceProviderId, long refugeeId, long healthServiceId, String appointmentDate, String address, String observations, String startDate, String startTime, String endTime) {
        this.serviceProviderId = serviceProviderId;
        this.refugeeId = refugeeId;
        this.healthServiceId = healthServiceId;
        this.appointmentDate = appointmentDate;
        this.address = address;
        this.observations = observations;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Appointment(long serviceProviderId, long refugeeId, long healthServiceId, String appointmentDate, String address, AppointmentStatus status, String observations, String startDate, String startTime, String endTime) {
        this.serviceProviderId = serviceProviderId;
        this.refugeeId = refugeeId;
        this.healthServiceId = healthServiceId;
        this.appointmentDate = appointmentDate;
        this.address = address;
        this.status = status;
        this.observations = observations;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Appointment() { }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getServiceProviderId() {
        return serviceProviderId;
    }

    public void setServiceProviderId(long serviceProviderId) {
        this.serviceProviderId = serviceProviderId;
    }

    public long getRefugeeId() {
        return refugeeId;
    }

    public void setRefugeeId(long refugeeId) {
        this.refugeeId = refugeeId;
    }

    public long getHealthServiceId() {
        return healthServiceId;
    }

    public void setHealthServiceId(long healthServiceId) {
        this.healthServiceId = healthServiceId;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
