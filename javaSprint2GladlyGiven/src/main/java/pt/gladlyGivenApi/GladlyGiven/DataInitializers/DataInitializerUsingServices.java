package pt.gladlyGivenApi.GladlyGiven.DataInitializers;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pt.gladlyGivenApi.GladlyGiven.Controllers.GeographicController;
import pt.gladlyGivenApi.GladlyGiven.Enums.AvailabilityStatus;
import pt.gladlyGivenApi.GladlyGiven.Enums.FiscalIdentity;
import pt.gladlyGivenApi.GladlyGiven.Models.*;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.Category;
import pt.gladlyGivenApi.GladlyGiven.Models.HealthServices.HealthService;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.AppUser;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.Donor;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.Refugee;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.ServiceProvider;
import pt.gladlyGivenApi.GladlyGiven.Repositories.*;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.DonorRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.RefugeeRepository;
import pt.gladlyGivenApi.GladlyGiven.Repositories.Users.ServiceProviderRepository;
import pt.gladlyGivenApi.GladlyGiven.Services.HealthServiceService;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.DonorService;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.RefugeeService;
import pt.gladlyGivenApi.GladlyGiven.Services.Users.ServiceProviderService;

import java.util.*;

@Component
public class DataInitializerUsingServices {

    // Services
    // ---------------------------------------------------------------------
    @Autowired
    GeographicController geographicController;

    @Autowired
    HealthServiceService healthServiceService;

    @Autowired
    ServiceProviderService serviceProviderService;

    @Autowired
    RefugeeService refugeeService;

    @Autowired
    DonorService donorService;



    // Initialize Data
    // ---------------------------------------------------------------------
    @PostConstruct
    @Transactional
    public void initData() {
        // initialize services
        initializeCategories();
        initializeServices();

        // service provider
        initializeServiceProviders();
        assignServicesToServiceProviders();
        initializeAvailabilities();

        // donors
        initializeDonors();

        // refugees
        initializeRefugees();
    }



    // Service Providers
    // ---------------------------------------------------------------------
    @Transactional
    private void initializeCategories() {
        List<Category> existing = healthServiceService.findAllCategories();

        List<Category> categories = Arrays.asList(
                new Category("Medicine"),
                new Category("Nurse"),
                new Category("Dentist"),
                new Category("Psychology")
        );

        for (Category c : categories) {
            if (existing.stream().noneMatch(existingCategory -> existingCategory.description.equalsIgnoreCase(c.description))) {
                healthServiceService.createCategory(c);
            }
        }
    }

    @Transactional
    private void initializeServices() {
        List<Category> categories = healthServiceService.findAllCategories();
        List<HealthService> services = new ArrayList<>();

        for (Category category : categories) {
            switch (category.description) {
                case "Medicine" -> services.addAll(Arrays.asList(
                        new HealthService("General Check-up", category),
                        new HealthService("Pediatric Care", category),
                        new HealthService("Dermatology Consultation", category),
                        new HealthService("Ophthalmology Exam", category),
                        new HealthService("Internal Medicine Consultation", category)
                ));
                case "Nurse" -> services.addAll(Arrays.asList(
                        new HealthService("Vaccination Service", category),
                        new HealthService("Wound Care", category),
                        new HealthService("Health Education", category),
                        new HealthService("Blood Pressure Monitoring", category),
                        new HealthService("Home Care Assistance", category)
                ));
                case "Dentist" -> services.addAll(Arrays.asList(
                        new HealthService("Teeth Cleaning", category),
                        new HealthService("Dental Check-up", category),
                        new HealthService("Root Canal Treatment", category),
                        new HealthService("Tooth Extraction", category),
                        new HealthService("Orthodontic Consultation", category)
                ));
                default -> System.out.println("Unknown category: " + category.description);
            }
        }

        // only add those that don't exist
        List<HealthService> existing = healthServiceService.findAllHealthServices();
        for (HealthService s : services) {
            if (existing.stream().noneMatch(healthService -> healthService.description.equalsIgnoreCase(s.description))) {
                healthServiceService.createHealthService(s.description, s.category.description);
            }
        }
    }

    @Transactional
    private void initializeServiceProviders() {
        List<ServiceProvider> serviceProviders = new ArrayList<>();

        serviceProviders.add(
                new ServiceProvider(
                        "Tiago",
                        "Barracha",
                        new Email("tiago@example.com"),
                        "Male",
                        "password",
                        new Language("English"),
                        new Language("Portuguese"), // Adding second language
                        new PhoneNumber("123456789"),
                        "123456789", // Unique NIF
                        "LICENSE111", // Unique licenseID
                        1L, // category ID
                        Collections.emptyList(), // review IDs
                        "Rua Augusta",
                        "15",
                        "Lisbon",
                        "1000-000"
                )
        );

        serviceProviders.add(
                new ServiceProvider(
                        "Clarissa",
                        "Chirano",
                        new Email("clarissa@example.com"),
                        "Female",
                        "password",
                        new Language("English"),
                        new Language("Portuguese"), // Adding second language
                        new PhoneNumber("987654321"), // Unique PhoneNumber
                        "987654321", // Unique NIF
                        "LICENSE222", // Unique licenseID
                        2L, // category ID
                        Collections.emptyList(), // review IDs
                        "Avenida da Liberdade",
                        "25",
                        "Porto",
                        "4000-000"
                )
        );

        serviceProviders.add(
                new ServiceProvider(
                        "Lia",
                        "Araruna",
                        new Email("lia@example.com"),
                        "Female",
                        "password",
                        new Language("English"),
                        new Language("Portuguese"), // Adding second language
                        new PhoneNumber("111222333"), // Unique PhoneNumber
                        "111222333", // Unique NIF
                        "LICENSE789", // Unique licenseID
                        3L, // category ID
                        Collections.emptyList(), // review IDs
                        "Praça do Comércio",
                        "10",
                        "Coimbra",
                        "3000-000"
                )
        );

        serviceProviders.add(
                new ServiceProvider(
                        "Hugo",
                        "Lopes",
                        new Email("hugo@example.com"),
                        "Male",
                        "password",
                        new Language("English"),
                        new Language("Portuguese"), // Adding second language
                        new PhoneNumber("555666777"), // Unique PhoneNumber
                        "555666777", // Unique NIF
                        "LICENSE333", // Unique licenseID
                        4L, // category ID
                        Collections.emptyList(), // review IDs
                        "Avenida dos Aliados",
                        "20",
                        "Braga",
                        "4700-000"
                )
        );

        serviceProviders.add(
                new ServiceProvider(
                        "Sónia",
                        "Ribeiro",
                        new Email("sonia@example.com"),
                        "Female",
                        "password",
                        new Language("English"),
                        new Language("Portuguese"), // Adding second language
                        new PhoneNumber("999888777"), // Unique PhoneNumber
                        "999888777", // Unique NIF
                        "LICENSE444", // Unique licenseID
                        2L, // category ID
                        Collections.emptyList(), // review IDs
                        "Rua de Santa Catarina",
                        "30",
                        "Funchal",
                        "9000-000"
                )
        );

        List<ServiceProvider> existing = serviceProviderService.findAllServiceProviders();
        for (ServiceProvider s : serviceProviders) {
            serviceProviderService.createServiceProvider(s);
        }
    }

    @Transactional
    private void assignServicesToServiceProviders() {
        List<ServiceProvider> serviceProviders = serviceProviderService.findAllServiceProviders();
        List<HealthService> healthServices = healthServiceService.findAllHealthServices();

        for (ServiceProvider sp : serviceProviders) {
            sp.healthServices = healthServices;
            serviceProviderService.addServicesToServiceProvider(sp, healthServices);
        }
    }

    @Transactional
    private void initializeAvailabilities() {
        List<ServiceProvider> serviceProviders = serviceProviderService.findAllServiceProviders();

        for (ServiceProvider serviceProvider : serviceProviders) {
            Availability availability = new Availability(
                    serviceProvider.id,
                    AvailabilityStatus.Free,
                    "2024-03-15",
                    "09:00",
                    "2024-03-15",
                    "18:00"
            );

            serviceProviderService.createServiceProviderAvailability(serviceProvider, availability);
        }
    }



    // Donors
    // ---------------------------------------------------------------------
    @Transactional
    private void initializeDonors() {
        List<Donor> donors = new ArrayList<>();

        donors.add(
                new Donor(
                        "John",
                        "Doe",
                        new Email("john@example.com"),
                        "Male",
                        "password",
                        new Language("English"),
                        new Language("Spanish"),
                        new PhoneNumber("123456789"),
                        "123456789",
                        "PAYMENT123",
                        "INVOICE123",
                        FiscalIdentity.Individual,
                        Arrays.asList("DONATION1", "DONATION2", "DONATION3")
                )
        );

        donors.add(
                new Donor(
                        "Jane",
                        "Smith",
                        new Email("jane@example.com"),
                        "Female",
                        "password",
                        new Language("English"),
                        new Language("French"),
                        new PhoneNumber("987654321"),
                        "987654321",
                        "PAYMENT456",
                        "INVOICE456",
                        FiscalIdentity.Company,
                        Arrays.asList("DONATION4", "DONATION5")
                )
        );

        donors.add(
                new Donor(
                        "Alice",
                        "Johnson",
                        new Email("alice@example.com"),
                        "Female",
                        "password",
                        new Language("English"),
                        new Language("German"),
                        new PhoneNumber("111222333"),
                        "111222333",
                        "PAYMENT789",
                        "INVOICE789",
                        FiscalIdentity.Individual,
                        Collections.singletonList("DONATION6")
                )
        );

        for (Donor donor : donors) {
            donor = donorService.createDonor(donor);
        }
    }



    // Refugees
    // ---------------------------------------------------------------------
    @Transactional
    private void initializeRefugees() {
        List<Refugee> refugees = new ArrayList<>();
        int emailCounter = 1;

        // Creating refugees from Syria
        refugees.add(new Refugee(
                "Ahmed",
                "Al-Masri",
                new Email("refugee" + (emailCounter++) + "@example.com"),
                "Male",
                "password",
                generateUniqueNumberString(), // Unique NIF
                generateUniqueNumberString(), // Unique licenseID
                "Syrian",
                new Country("Syria"), // Assuming the country is available in the database
                new Language("Arabic"),
                new Language("English"), // Adding second language
                new PhoneNumber(generateUniqueNumberString()) // Unique snsNumber
        ));

        // Creating refugees from India
        refugees.add(new Refugee(
                "Raj",
                "Kumar",
                new Email("refugee" + (emailCounter++) + "@example.com"),
                "Male",
                "password",
                generateUniqueNumberString(), // Unique NIF
                generateUniqueNumberString(), // Unique licenseID
                "Indian",
                new Country("India"), // Assuming the country is available in the database
                new Language("Hindi"),
                new Language("English"), // Adding second language
                new PhoneNumber(generateUniqueNumberString()) // Unique snsNumber
        ));

        // Creating refugees from Pakistan
        refugees.add(new Refugee(
                "Fatima",
                "Akhtar",
                new Email("refugee" + (emailCounter++) + "@example.com"),
                "Female",
                "password",
                generateUniqueNumberString(), // Unique NIF
                generateUniqueNumberString(), // Unique licenseID
                "Pakistani",
                new Country("Pakistan"), // Assuming the country is available in the database
                new Language("Urdu"),
                new Language("English"), // Adding second language
                new PhoneNumber(generateUniqueNumberString()) // Unique snsNumber
        ));

        for (Refugee refugee : refugees) {
            refugee = refugeeService.createRefugee(refugee);
        }
    }



    // Helper Methods
    // ---------------------------------------------------------------------

    private String generateUniqueNumberString() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 13; i++) {
            sb.append(random.nextInt(9) + 1); // Generates numbers from 1 to 9
        }
        return sb.toString();
    }
}
