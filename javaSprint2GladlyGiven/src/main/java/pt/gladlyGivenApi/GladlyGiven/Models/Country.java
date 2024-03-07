// Author: Tiago Barrach
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Models;

import jakarta.persistence.*;

@Entity
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(unique = true)
    public String country;

    public Country() {

    }

    public Country(String country) {
        this.country = country;
    }
}
