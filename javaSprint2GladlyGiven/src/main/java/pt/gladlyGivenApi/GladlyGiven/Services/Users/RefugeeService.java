// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven.Services.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.RefugeeDTO;
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
    public Refugee saveRefugee(Refugee refugee) {
        return saveUserToRepository(refugee, refugeeRepository);
    }

    public Refugee setRefugeePassword(Refugee refugee, String password) {
        return setUserPassword(refugee, password, refugeeRepository);
    }

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
                System.out.println("Recieved Refugee DTO is null!");
                return null;
            }

            System.out.println("\nTrying to create Refugee:");
            Refugee refugee = null;

            // if didn't come from service, try to find if it already exists
            if (!isServiceOriginated) {
                try {
                    refugee = findRefugeeByEmail(refugeeDTO.email);
                } catch (Exception e) {
                    System.out.println("Didn't Find refugee. Creating");
                    System.out.println(e.getMessage());
                }
            }

            if (refugee == null) {
                System.out.println("New Refugee. Adding to Database!");

                refugee = Refugee.fromDTO(refugeeDTO);

                // find or create AppUser class variables
                refugee = createAppUserDependantEntities(refugee);

                // find or create Refugee class Variables
                refugee.country = findOrCreateCountry(refugeeDTO.country);

                refugee = addCreationDateToUser(refugee);
                refugee = saveRefugee(refugee);

                System.out.println("New Refugee:\n" + refugee.toString());
            } else {
                refugee = updateRefugee(refugee);
            }

            return refugee;
        } catch (Exception e) {
            System.out.println("\nSomething went wrong, returning Empty Refugee. Error message:");
            System.out.println(e.getMessage());
            return null;
        }
    }

    public Refugee createRefugee(Refugee refugee) {
        if (refugee == null) {
            System.out.println("Tried to create null refugee");
            return null;
        }

        Refugee existing = findRefugeeByEmail(refugee.email.email);

        if (existing == null) {
            refugee.country = findOrCreateCountry(refugee.country.country);
            existing = createAppUserDependantEntities(refugee);
            existing = addCreationDateToUser(existing);
            existing = saveRefugee(existing);
        }

        return existing;
    }

    // create refugee with language & phone number
    public Refugee createRefugee(String firstName, String lastName, String emailAddress, String gender, String password, String protocolId, String snsNumber, String nationality, String country, String mainLanguage, String secondLanguage, String phoneNumber) {
        RefugeeDTO refugeeDTO = new RefugeeDTO(firstName, lastName, emailAddress, gender, protocolId, snsNumber, nationality, country, mainLanguage, secondLanguage, phoneNumber);
        return createRefugee(refugeeDTO, false);
    }



    // update ---
    public Refugee updateRefugee(Refugee refugee) {
        if (refugee == null)
            return null;

        Refugee existing = updateUser(refugee, refugeeRepository);

        if (existing != null) {
            if (refugee.protocolId != null && !existing.protocolId.equalsIgnoreCase(refugee.protocolId))
                existing.protocolId = refugee.protocolId;

            if (refugee.snsNumber != null && !existing.snsNumber.equalsIgnoreCase(refugee.snsNumber))
                existing.snsNumber = refugee.snsNumber;

            if (refugee.nationality != null && !existing.nationality.equalsIgnoreCase(refugee.nationality))
                existing.nationality = refugee.nationality;

            if (refugee.country != null && refugee.country.country != null && !existing.country.country.equalsIgnoreCase(refugee.country.country))
                existing.country = refugee.country;
        }

        return existing;
    }

}
