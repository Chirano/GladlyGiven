package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pt.gladlyGivenApi.GladlyGiven.Enums.AppUserType;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.*;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.*;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.DonorService;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.RefugeeService;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.ServiceProviderService;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.SessionContextService;

@CrossOrigin
@RestController
@RequestMapping("api/auth")
public class AuthController {

    // Services
    // -----------------------------------------------------
    @Autowired
    SessionContextService sessionContextService;

    @Autowired
    RefugeeService refugeeService;

    @Autowired
    ServiceProviderService serviceProviderService;

    @Autowired
    DonorService donorService;


    // Sign In
    // -----------------------------------------------------
    @PostMapping("/signin/{email}")
    public SessionContextDTO signIn(@PathVariable("email") String email) {
        SessionContext sessionContext = sessionContextService.findSessionContextByEmail(email);

        if (sessionContext != null) {
            return sessionContext.toDTO();
        } else {
            System.out.println("\nFailed to find SessionContext for user: " + email);
            return new SessionContextDTO();
        }
    }



    // Sign Up
    // -----------------------------------------------------
    private SessionContext createSessionContextForUser(AppUser user, String password, AppUserType userType) {
        if (user != null) {
            return new SessionContext(user, password, userType);
        } else {
            System.out.println("Tried to create sessions context for null user");
            return null;
        }
    }



    @PostMapping("/signup/refugee")
    public SessionContextDTO signUp(@RequestBody SignUpRequestRefugee signUpRequest) {
        System.out.printf("Sign Up Request:\n%s\n", signUpRequest.toString());

        Refugee user = Refugee.fromDTO(signUpRequest.refugeeDTO);
        user.password = signUpRequest.signUpDetails.password;

        user = refugeeService.createRefugee(user);
        SessionContext context = createSessionContextForUser(user, user.password, AppUserType.Refugee);
        context = sessionContextService.createUserContext(context);
        user.userContext = context;
        refugeeService.updateRefugee(user);

        return context.toDTO();
    }

    @PostMapping("/signup/serviceprovider")
    public SessionContextDTO signUp(@RequestBody SignUpRequestServiceProvider signUpRequest) {
        ServiceProvider user = ServiceProvider.fromDTO(signUpRequest.serviceProviderDTO);
        user.password = signUpRequest.signUpDetails.password;

        user = serviceProviderService.createServiceProvider(user);
        SessionContext context = createSessionContextForUser(user, user.password, AppUserType.ServiceProvider);
        context = sessionContextService.createUserContext(context);
        user.userContext = context;
        serviceProviderService.updateServiceProvider(user);

        return context.toDTO();
    }

    @PostMapping("/signup/donor")
    public SessionContextDTO signUp(@RequestBody SignUpRequestDonor signUpRequest) {
        Donor user = Donor.fromDTO(signUpRequest.donorDTO);
        user.password = signUpRequest.signUpDetails.password;

        user = donorService.createDonor(user);
        SessionContext context = createSessionContextForUser(user, user.password, AppUserType.Donor);
        context = sessionContextService.createUserContext(context);
        user.userContext = context;
        donorService.updateDonor(user);

        return context.toDTO();
    }
}
