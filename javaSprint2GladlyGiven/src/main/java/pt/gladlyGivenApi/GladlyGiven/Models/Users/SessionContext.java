package pt.gladlyGivenApi.GladlyGiven.Models.Users;

import jakarta.persistence.*;
import pt.gladlyGivenApi.GladlyGiven.Enums.AppUserType;
import pt.gladlyGivenApi.GladlyGiven.Interfaces.IDTOable;
import pt.gladlyGivenApi.GladlyGiven.Models.DTO.SessionContextDTO;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;

@Entity
public class SessionContext implements IDTOable<SessionContextDTO> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public Long userId;

    public String name;

    public String email;

    public String password;

    public AppUserType userType;

    public SessionContext() {
    }

    public SessionContext(Long userId, String name, String userEmail, String password, AppUserType userType) {
        this.userId = userId;
        this.name = name;
        this.email = userEmail;
        this.password = password;
        this.userType = userType;
    }

    public SessionContext(AppUser user, AppUserType userType) {
        this.userId = user.id;
        this.name = user.firstName;
        this.email = user.email.email;
        this.userType = userType;
    }

    public SessionContext(AppUser user, String password, AppUserType userType) {
        this.userId = user.id;
        this.name = user.firstName;
        this.email = user.email.email;
        this.password = password;
        this.userType = userType;
    }

    public SessionContext(SessionContextDTO userContextDTO) {
        this.userId = userContextDTO.userId;
        this.name = userContextDTO.name;
        this.email = userContextDTO.email;
        this.userType = userContextDTO.userType;
        // password comes empty
    }

    @Override
    public SessionContextDTO toDTO() {
        return new SessionContextDTO(
                this.userId,
                this.name,
                this.email,
                this.userType
        );
    }

    public static SessionContext fromDTO(SessionContextDTO userContextDTO) {
        return new SessionContext(

        );
    }
}
