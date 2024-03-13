package pt.gladlyGivenApi.GladlyGiven.Services.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.SessionContextDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.AppUser;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.SessionContext;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.*;

import java.util.Objects;

@Service
public class SessionContextService extends AppUserService {
    @Autowired
    SessionContextRepository sessionContextRepository;

    @Autowired
    RefugeeRepository refugeeRepository;

    @Autowired
    ServiceProviderRepository serviceProviderRepository;

    @Autowired
    DonorRepository donorRepository;


    private SessionContext userContextNotFoundException(Exception e) {
        System.out.println("Failed to find user context. Returning empty");
        return new SessionContext();
    }



    // Find
    // ---------------------------------------------------------------

    // UserContext

    public SessionContext findSessionContextByUserId(Long userId) {
        try {
            return sessionContextRepository.findByUserId(userId).orElse(null);
        } catch (Exception e) {
            return userContextNotFoundException(e);
        }
    }

    public SessionContext findSessionContextByEmail(String email) {
        try {
            return sessionContextRepository.findByEmail(email).orElse(null);
        } catch (Exception e) {
            return userContextNotFoundException(e);
        }
    }

    public AppUser findAppUserBySessionContext(SessionContext userContext) {
        if (userContext == null) {
            System.out.println("Tried to find a user from empty UserContext");
            return null;
        }

        AppUserRepository repository = null;

        switch (userContext.userType) {

            case Refugee -> {
                repository = refugeeRepository;
            }

            case ServiceProvider -> {
                repository = serviceProviderRepository;
            }

            case Donor -> {
                repository = donorRepository;
            }
        }

        return findUserByEmail(userContext.email, repository);
    }



    // Create
    // ---------------------------------------------------------------
    public SessionContext createUserContext(SessionContext body) {
        if (body == null) {
            System.out.println("Tried to create empty UserContext!");
            return null;
        }

        SessionContext userContext = sessionContextRepository.save(body);
        return userContext;
    }

    public SessionContext createUserContext(SessionContext body, Long userId) {
        if (body == null) {
            System.out.println("Tried to create empty UserContext!");
            return null;
        }

        if (!Objects.equals(body.userId, userId))
            body.userId = userId;

        SessionContext userContext = sessionContextRepository.save(body);
        return userContext;
    }

    public SessionContext createUserContext(SessionContextDTO bodyDTO) {
        if (bodyDTO == null) {
            System.out.println("Tried to create empty UserContextDTO!");
            return null;
        }

        SessionContext userContext = sessionContextRepository.save(new SessionContext(bodyDTO));
        return userContext;
    }



    // Update
    // ---------------------------------------------------------------
    public SessionContext updateSessionContext(SessionContextDTO sessionContextDTO) {
        SessionContext sessionContext = findSessionContextByEmail(sessionContextDTO.email);

        if (sessionContext != null) {
            sessionContext.userId = sessionContextDTO.userId;
            sessionContext.email = sessionContextDTO.email;
            sessionContext.name = sessionContextDTO.name;
            sessionContext.userType = sessionContextDTO.userType;

            return sessionContextRepository.save(sessionContext);
        }

        return sessionContext;
    }
}
