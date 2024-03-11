// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Services.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Models.Country;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.RefugeeDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.Language;
import pt.gladlyGivenApi.GladlyGiven.Models.PhoneNumber;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.Refugee;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.*;

@Service
public class RefugeeService extends AppUserService {

    // Repositories
    // ---------------------------------------------------------------------
    @Autowired
    private RefugeeRepository refugeeRepository;



    // Refugee
    // ---------------------------------------------------------------------
    // find ---
    public Refugee findRefugeeById(Long id) {
        return findUserById(id, refugeeRepository);
    }

    public Refugee findRefugeeByEmail(String email) {
        return findUserByEmail(email, refugeeRepository);
    }

    public Refugee findRefugeeByFirstName(String name) {
        return findUserByFirstName(name, refugeeRepository);
    }

    public Refugee findRefugeeByLastName(String lastName) {
        return findUserByLastName(lastName, refugeeRepository);
    }

    private Refugee findRefugeeViaDTO(RefugeeDTO refugee) {
        try {
            Refugee ref = null;

            if (!refugee.firstName.isEmpty())
                ref = findRefugeeByFirstName(refugee.firstName);

            if (ref == null && !refugee.lastName.isEmpty())
                ref = findRefugeeByLastName(refugee.lastName);

            return ref;
        }
        catch (Exception e) {
            return null;
        }
    }


    // create ---
    // does the refugee come from this service?
    public Refugee createRefugee(RefugeeDTO refugeeDTO, boolean isServiceOriginated) {
        try {
            if (refugeeDTO == null) {
                System.out.println("\n\nRefugee DTO is null!");
                return null;
            }

            System.out.println("\n\nTrying to create Refugee:\n");
            Refugee refugee = null;

            // if didn't come from service, try to find if it already exists
            if (!isServiceOriginated) {
                refugee = findRefugeeByEmail(refugeeDTO.email);
            }

            if (refugee == null) {
                refugee = Refugee.fromDTO(refugeeDTO);
                refugee = addCreationDateToUser(refugee);
                refugee = refugeeRepository.save(refugee);
            }

            return refugee;
        } catch (Exception e) {
            return null;
        }
    }

    // create refugee with language & phone number
    public Refugee createRefugee(String firstName, String lastName, String emailAddress, String gender, String password, String protocolId, String snsNumber, String nationality, String country, String language, String phoneNumber) {
        RefugeeDTO refugeeDTO = new RefugeeDTO(firstName, lastName, emailAddress, gender, protocolId, snsNumber, nationality, country, language, phoneNumber);
        return createRefugee(refugeeDTO, false);
    }



    // update ---
    public Refugee updateRefugee(Refugee refugee) {
        if (refugee == null)
            return null;

        Refugee existing = updateUser(refugee, refugeeRepository);

        if (existing != null) {
            if (!existing.protocolId.equalsIgnoreCase(refugee.protocolId))
                existing.protocolId = refugee.protocolId;

            if (!existing.snsNumber.equalsIgnoreCase(refugee.snsNumber))
                existing.snsNumber = refugee.snsNumber;

            if (!existing.nationality.equalsIgnoreCase(refugee.nationality))
                existing.nationality = refugee.nationality;

            if (!existing.country.country.equalsIgnoreCase(refugee.country.country))
                existing.country = refugee.country;
        }

        return existing;
    }
}
