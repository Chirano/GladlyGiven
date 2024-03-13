package pt.gladlyGivenApi.GladlyGiven.Models.DTO;

import pt.gladlyGivenApi.GladlyGiven.Enums.AppUserType;

public class SessionContextDTO {
    public long userId;

    public String name;

    public String email;

    public AppUserType userType;

    public SessionContextDTO() {
    }

    public SessionContextDTO(long userId, String name, String email, AppUserType userType) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.userType = userType;
    }
}
