package pt.gladlyGivenApi.GladlyGiven.Models.HealthServices;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class HealthService {
    @Id
    @GeneratedValue
    public Long id;

    public String description;

    @ManyToOne
    public Category category;

}
