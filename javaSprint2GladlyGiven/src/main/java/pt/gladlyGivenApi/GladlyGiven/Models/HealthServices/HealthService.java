package pt.gladlyGivenApi.GladlyGiven.Models.HealthServices;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;

import java.util.ArrayList;
import java.util.List;



@AllArgsConstructor
@NoArgsConstructor
@Entity
public class HealthService {
    @Id
    @GeneratedValue
    public Long id;

    @Column(unique = true)
    public String description;

    @ManyToMany(mappedBy = "healthServices")
    List<ServiceProvider> serviceProviders = new ArrayList<>();

    @ManyToOne
    public Category category;

    public HealthService(String description, Category category){
        this.description = description;
        this.category = category;
    }
}
