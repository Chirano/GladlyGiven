import { UserType } from "../userProfiles/UserType";

// removed end of email, because it was too boring to constantly write them on sign in form
export const MockSessionContexts = {
    AuthAdmin: {
        userId: 0,
        name: "admin",
        email: "admin", // @admin.com
        userType: UserType.Admin,
    },

    AuthRefugee: {
        userId: 0,
        name: "refugee",
        email: "refugee", // @refugee.com
        userType: UserType.Refugee,
    },
    
    AuthServiceProvider: {
        userId: 1,
        name: "service",
        email: "service", // @service.com
        userType: UserType.ServiceProvider,
    },

    AuthDonor: {
        userId: 0,
        name: "donor",
        email: "donor", // @donor.com
        userType: UserType.Donor,
    },
}