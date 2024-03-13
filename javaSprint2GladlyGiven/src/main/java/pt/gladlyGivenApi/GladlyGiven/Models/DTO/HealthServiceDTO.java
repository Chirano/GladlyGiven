package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;

public class HealthServiceDTO {

    public Long id;

    public String description;

    public HealthServiceDTO(Long id, String description){
        this.id = id;
        this.description = description;
    }

    public HealthServiceDTO(HealthService healthService){
        this.id = healthService.id;
        this.description = healthService.description;
    }

}
