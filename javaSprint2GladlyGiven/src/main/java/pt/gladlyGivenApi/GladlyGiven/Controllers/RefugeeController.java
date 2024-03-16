// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.RefugeeDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.Refugee;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.RefugeeService;

@CrossOrigin
@RestController
@RequestMapping("/api/refugee")
public class RefugeeController {

    // Services
    // --------------------------------------------------------------------------------------
    @Autowired
    private RefugeeService refugeeService;



    // Refugee
    // --------------------------------------------------------------------------------------
    // --- get ---
    @GetMapping("/id/{id}")
    public Refugee getRefugee(@PathVariable("id") Long id) {
        return refugeeService.findRefugeeById(id);
    }

    @GetMapping("/firstname/{firstname}")
    public Refugee getRefugeeByFirstName(@PathVariable("firstname") String name) {
        return refugeeService.findRefugeeByFirstName(name);
    }

    @GetMapping("/lastname/{lastname}")
    public Refugee getRefugeeByLastName(@PathVariable("lastname") String lastName) {
        return refugeeService.findRefugeeByLastName(lastName);
    }

    @GetMapping("/email/{email}")
    public Refugee getRefugeeByEmail(@PathVariable("email") String email) {
        return refugeeService.findRefugeeByEmail(email);
    }


    // --- create ---
    @PostMapping("/fromParams")
    public RefugeeDTO createRefugeeViaRequestParams(@RequestParam String firstName, @RequestParam String lastName, @RequestParam String email, @RequestParam String gender, @RequestParam String password, @RequestParam String protocolId, @RequestParam String snsNumber, @RequestParam String nationality, @RequestParam String country, @RequestParam String mainLanguage, @RequestParam String secondLanguage, @RequestParam String phoneNumber) {
        Refugee refugee = refugeeService.createRefugee(firstName, lastName, email, gender, password, protocolId, snsNumber, nationality, country, mainLanguage, secondLanguage, phoneNumber);
        return refugee.toDTO();
    }

    @PostMapping(value = "/fromBody")
    public RefugeeDTO createRefugeeViaRequestBody(@RequestBody RefugeeDTO refugee) {
        System.out.println("\nRefugee From Angular Forms:\n" + refugee.toString());

        Refugee ref = refugeeService.createRefugee(refugee, false);

        if (ref != null) {
            System.out.println("Created Refugee successfully!");
            return ref.toDTO();
        } else {
            System.out.println("Resulting Refugee object is null!...");
            return new RefugeeDTO();
        }
    }


    // --- update ---
    @PutMapping
    public Refugee updateRefugee(@RequestBody Refugee refugee) {
        return refugeeService.updateRefugee(refugee);
    }
}
