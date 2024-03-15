// add router path names here:
// this will be: http://www.domain.com/sign-in or http://www.domain.com/view-admin, you get the idea

export const RouterPaths = {
    Home: "home",
    SignIn: "sign-in",
    SignUp: "sign-up",

    SignUpHelpIntention: "sign-up-help-intention",
    SignUpHelpType: "sign-up-help-type",

    SignUpRefugee: "sign-up-refugee",
    SignUpServiceProvider: "sign-up-service-provider",
    SignUpDonor: "sign-up-donor",

    ViewAdmin: "view-admin",
    
    // Refugee child views
    ViewRefugeeHome: "refugee/home",
    ViewRefugeeSearch: "refugee/search",
    ViewRefugeeAppointments: "refugee/appointments",
    ViewRefugeeHelpRequest: "refugee/help",
    ViewRefugeeProfile: "refugee/profile",
    
    ViewServiceProvider: "view-service-provider",
    
    ViewDonor: "view-donor",

    ViewFaq: "view-faq",
    
    //Request a new cost support
    ViewCostSupport : "view-service-provider/costsupport",
    //View a list of cost supports requested by serviceProviderId 
    ViewListCostsupport : "view-service-provider/costsupportlist",

    ViewContact: "view-contact",

    ViewServiceRequest: "view-service-request",

    ViewDonation: "view-donation",
    ViewAdminListCostsupport : "view-admin/costsupportlist",

    ViewListServiceRequest: "view-list-servicerequest",
    ViewListDonations: "view-list-donations",
    
    ViewReview: "view-review",
    ViewReviewServiceProvider: "view-review-service-provider",

    ViewHealthServicesServiceProvider: "view-healthservice-service-provider",

    ViewAvailability: "view-availability",

    ViewCategory: "view-category",
    
}
