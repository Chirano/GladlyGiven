// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
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
    @GetMapping("/{id}")
    public Refugee getRefugee(@PathVariable("id") Long id) {
        return refugeeService.findRefugeeById(id);
    }

    @GetMapping("/{firstname}")
    public Refugee getRefugeeByFirstName(@PathVariable("firstname") String name) {
        return refugeeService.findRefugeeByFirstName(name);
    }

    @GetMapping("/{lastname}")
    public Refugee getRefugeeByLastName(@PathVariable("lastname") String lastName) {
        return refugeeService.findRefugeeByLastName(lastName);
    }

    @GetMapping("/{email}")
    public Refugee getRefugeeByEmail(@PathVariable("email") String email) {
        return refugeeService.findRefugeeByEmail(email);
    }


    // --- create ---
    @PostMapping("/fromParams")
    public Refugee createRefugeeViaRequestParams(@RequestParam String firstName, @RequestParam String lastName, @RequestParam String email, @RequestParam String gender, @RequestParam String password, @RequestParam String protocolId, @RequestParam String snsNumber, @RequestParam String nationality, @RequestParam String country, @RequestParam String language, @RequestParam String phoneNumber) {
        return refugeeService.createRefugee(firstName, lastName, email, gender, password, protocolId, snsNumber, nationality, country, language, phoneNumber);
    }

    @PostMapping(value = "/fromBody", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Refugee createRefugeeViaRequestBody(@RequestBody Refugee refugee) {
        System.out.println("Recieved request!");
        return refugeeService.createRefugee(refugee, false);
    }


    // --- update ---
    @PutMapping
    public Refugee updateRefugee(@RequestBody Refugee refugee) {
        return refugeeService.updateRefugee(refugee);
    }
}
