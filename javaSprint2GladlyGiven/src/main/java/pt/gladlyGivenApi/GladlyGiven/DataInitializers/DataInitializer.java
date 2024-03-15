package pt.gladlyGivenApi.GladlyGiven.DataInitializers;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
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

import java.util.*;

@Component
public class DataInitializer {

    // User Details Repositories
    // ---------------------------------------------------------------------
    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private PhoneNumberRepository phoneNumberRepository;



    // Service Provider Repositories
    // ---------------------------------------------------------------------
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    HealthServiceRepository serviceRepository;

    @Autowired
    AvailabilityRepository availabilityRepository;

    @Autowired
    ServiceProviderRepository serviceProviderRepository;


    // Refugee Repositories
    // ---------------------------------------------------------------------
    @Autowired
    RefugeeRepository refugeeRepository;

    @Autowired
    DonorRepository donorRepository;



    @PostConstruct
    @Transactional
    public void initData() {
        // initialize services
        initializeCategories();
        initializeServices();

        // service provider
        initializeServiceProviders();
        initializeAvailabilities();

        // donors
        initializeDonors();

        // refugees
        initializeRefugees();
    }

    public <T extends AppUser> T createAppUserDependantEntities(T user) {
        if (user == null)
            return null;

        user.email = findOrCreateEmail(user.email.email);
        user.mainLanguage = findOrCreateLanguage(user.mainLanguage.language);
        user.secondLanguage = findOrCreateLanguage(user.secondLanguage.language);
        user.mainPhoneNumber = findOrCreatePhoneNumber(user.mainPhoneNumber.number);

        if (user instanceof Refugee refugee)
            refugee.country = findOrCreateCountry(refugee.country.country);

        return user;
    }



    // Service Providers
    // ---------------------------------------------------------------------
    @Transactional
    private void initializeCategories() {
        List<Category> categories = Arrays.asList(
                new Category("Medicine"),
                new Category("Nurse"),
                new Category("Dentist"),
                new Category("Psychology")
        );

        categoryRepository.saveAll(categories);
    }

    @Transactional
    private void initializeServices() {
        List<Category> categories = categoryRepository.findAll();
        for (Category category : categories) {
            switch (category.description) {
                case "Medicine" -> serviceRepository.saveAll(Arrays.asList(
                        new HealthService("General Check-up", category),
                        new HealthService("Pediatric Care", category),
                        new HealthService("Dermatology Consultation", category),
                        new HealthService("Ophthalmology Exam", category),
                        new HealthService("Internal Medicine Consultation", category)
                ));
                case "Nurse" -> serviceRepository.saveAll(Arrays.asList(
                        new HealthService("Vaccination Service", category),
                        new HealthService("Wound Care", category),
                        new HealthService("Health Education", category),
                        new HealthService("Blood Pressure Monitoring", category),
                        new HealthService("Home Care Assistance", category)
                ));
                case "Dentist" -> serviceRepository.saveAll(Arrays.asList(
                        new HealthService("Teeth Cleaning", category),
                        new HealthService("Dental Check-up", category),
                        new HealthService("Root Canal Treatment", category),
                        new HealthService("Tooth Extraction", category),
                        new HealthService("Orthodontic Consultation", category)
                ));
                default -> System.out.println("Unknown category: " + category.description);
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

        for (ServiceProvider user : serviceProviders) {
            user = createAppUserDependantEntities(user);
        }
        serviceProviderRepository.saveAll(serviceProviders);
    }

    @Transactional
    private void initializeAvailabilities() {
        List<ServiceProvider> serviceProviders = serviceProviderRepository.findAll();

        for (ServiceProvider serviceProvider : serviceProviders) {
            Availability availability = new Availability(
                    serviceProvider.id,
                    AvailabilityStatus.Free,
                    "2024-03-15",
                    "09:00",
                    "2024-03-15",
                    "18:00"
            );

            availabilityRepository.save(availability);
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

        for (Donor user : donors) {
            user = createAppUserDependantEntities(user);
        }
        donorRepository.saveAll(donors);
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

        for (Refugee user : refugees) {
            user = createAppUserDependantEntities(user);
        }
        refugeeRepository.saveAll(refugees);
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

    private void printCreatingNew(String classType) {
        System.out.printf("%s, was not found. Creating one%n", classType);
    }

    // Email
    // ---------------------------------------------------------------------
    public Email findEmailByEmail(String email) {
        return emailRepository.findById(email).orElse(null);
    }

    public Email findOrCreateEmail(String email) {
        try {
            Email mail = findEmailByEmail(email);
            if (mail == null) {
                printCreatingNew("Email");
                mail = new Email(email);
                mail = emailRepository.save(mail);
            }

            return mail;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new Email();
        }
    }



    // Country
    // ---------------------------------------------------------------------
    public Country findCountryById(Long id) {
        return countryRepository.findById(id).orElse(null);
    }

    public Country findCountryByString(String country) {
        return countryRepository.findByCountryIgnoreCase(country).orElse(null);
    }

    public Country findOrCreateCountry(String country) {
        try {
            Country existing = findCountryByString(country);

            if (existing == null) {
                printCreatingNew("Country");
                existing = new Country(country);
                existing = countryRepository.save(existing);
            }

            return existing;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new Country();
        }
    }


    // Language
    // ---------------------------------------------------------------------
    public Language findLanguageById(Long id) {
        return languageRepository.findById(id).orElse(null);
    }

    public Language findLanguageByLanguage(String language) {
        return languageRepository.findByLanguageIgnoreCase(language).orElse(null);
    }

    public Language findOrCreateLanguage(String language) {
        try {
            Language lang = findLanguageByLanguage(language);
            if (lang == null) {
                printCreatingNew("Language");
                lang = new Language(language);
                lang = languageRepository.save(lang);
            }

            return lang;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new Language();
        }
    }



    // Phone Number
    // ---------------------------------------------------------------------
    public PhoneNumber findPhoneNumberByNumber(String number) {
        return phoneNumberRepository.findByNumber(number).orElse(null);
    }

    public PhoneNumber findOrCreatePhoneNumber(String number) {
        try {
            PhoneNumber phoneNumber = findPhoneNumberByNumber(number);

            if (phoneNumber == null) {
                printCreatingNew("Phone Number");
                phoneNumber = new PhoneNumber(number);
                phoneNumber = phoneNumberRepository.save(phoneNumber);

            }

            return phoneNumber;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new PhoneNumber();
        }
    }
}
