package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Models.Appointment;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.DonorDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.Donor;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.DonorService;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class DonorController {

    @Autowired
    DonorService service;

    @GetMapping(value = "/donors", produces = "application/json")
    public ResponseEntity<Page<Donor>> getAllDonors(@RequestParam Optional<Integer> page,
                                                   @RequestParam Optional<Integer> size)
    {
        int _size = size.orElse(10);
        int _page = page.orElse(0);

        Page<Donor> donors = service.findAllDonors(_page, _size);
        if(donors == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(donors, HttpStatus.OK);
    }

    @GetMapping(value = "donor/{id}", produces = "application/json")
    public ResponseEntity<Donor> getDonorById(@PathVariable("id") long id)
    {
        Donor donor = service.findDonorById(id);
        if(donor == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(donor, HttpStatus.OK);
    }

    @PostMapping(value = "/donor", produces = "application/json")
    public ResponseEntity<Donor> createDonor(@RequestBody DonorDTO donor){
        Donor newDonor = service.createDonor(donor);

        if(newDonor == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(newDonor, HttpStatus.CREATED);
    }

    @PutMapping(value = "/donor/{id}", produces = "application/json")
    public ResponseEntity<Donor> updateDonor(@PathVariable ("id") long id,
                                             @RequestBody Donor donor)
    {
        if(donor.id != id){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Donor updateDonor = service.updateDonor(donor);

        return new ResponseEntity<>(updateDonor, HttpStatus.OK);
    }
}
