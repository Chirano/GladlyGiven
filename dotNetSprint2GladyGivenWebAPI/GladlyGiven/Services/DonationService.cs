using GladlyGiven.DTOs;
using GladlyGiven.Enums;
using GladlyGiven.Exceptions;
using GladlyGiven.Models;
using GladyGivenWebAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace GladlyGiven.Services
{
    //Author: Sónia Ribeiro

    /// <summary>
    /// Service class for managing donation-related operations.
    /// </summary>

    public class DonationService
    {

        /// <summary>
        /// Database context for accessing donation data
        /// </summary>

        private readonly ApplicationContextDb _context;

        /// <summary>
        /// This class is responsible for interacting with the Java Spring Boot API
        /// </summary>

        private readonly JavaUserClient _javaUserClient;

        readonly string url = "http://localhost:8080/api";

        /// <summary>
        /// DonationService constructor that initializes a new instance of this class
        /// </summary>
        /// <param name="context">The database context</param>
        /// <param name="userClient">The Java user client</param>

        public DonationService(ApplicationContextDb context)
        {
            _context = context;
            _javaUserClient = new JavaUserClient(url);
        }


        /// <summary>
        /// Finds a donation by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the donation to find</param>
        /// <returns>The found donation, if it exists</returns>
        /// <exception cref="DonationException"></exception>


        public async Task<Donation> FindDonationById(long id)
        {

            var donation = await _context.Donations.FirstOrDefaultAsync(d => d.Id == id);

            if (donation == null)
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(FindDonationById);
                string error = "The donation is null";

                throw new DonationException(classOrigin, methodOrigin, error);
            }

            return donation;
        }



        /// <summary>
        /// Finds all donations 
        /// </summary>
        /// <returns>A list of all donations</returns>
        /// <exception cref="DonationException"></exception>


        public async Task<List<Donation>> FindAllDonations()
        {
            List<Donation> donationsList = await _context.Donations.ToListAsync();

            if (donationsList == null || !donationsList.Any())
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(FindAllDonations);
                string error = "No donations found!";

                throw new DonationException(classOrigin, methodOrigin, error);
            }

            return donationsList;
        }


        /// <summary>
        /// Finds donations by their type
        /// </summary>
        /// <param name="type">The type of donations to find</param>
        /// <returns>A list of donations of the specified type</returns>
        /// <exception cref="DonationException"></exception>

        public async Task<List<Donation>> FindDonationsByType(DonationType type)
        {
            List<Donation> donationsList = await _context.Donations.Where(d => d.DonationType == type).ToListAsync();

            if(donationsList == null || !donationsList.Any())
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(FindDonationsByType);
                string error = "No donations found for the given type";

                throw new DonationException(classOrigin, methodOrigin, error);
            }

            return donationsList;
        }



        /// <summary>
        /// Finds donations by their fiscal identity
        /// </summary>
        /// <param name="fiscalIdentity">The fiscal identity of the donations to find</param>
        /// <returns>A list of donations with the specified fiscal identity</returns>
        /// <exception cref="DonationException"></exception>


        public async Task<List<Donation>> FindDonationsByFiscalIdentity(FiscalIdentity fiscalIdentity)
        {
            List<Donation> donationsList = await _context.Donations.Where(d => d.FiscalIdentity == fiscalIdentity).ToListAsync();

            if (donationsList == null || !donationsList.Any())
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(FindDonationsByFiscalIdentity);
                string error = "No donations found for the given type";

                throw new DonationException(classOrigin, methodOrigin, error);
            }

            return donationsList;
        }



        /// <summary>
        /// Retrieves all donations made by a specific donor.
        /// </summary>
        /// <param name="donorId">The ID of the donor</param>
        /// <returns>A list of donations made by the specified donor</returns>
        /// <exception cref="DonationException"></exception>

        public async Task<List<Donation>> FindAllDonationsByDonor(long donorId)
        {

            // Retrieve donor information 

            var donor = await _context.Donations.FirstOrDefaultAsync(d => d.DonorId == donorId);

            // If donor information is null, throw an exception

            if (donor == null)
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(FindAllDonationsByDonor);
                string error = "The donor is null";

                throw new DonationException(classOrigin, methodOrigin, error);
            }

            // Retrieve donations associated with the donor from the database

            List<Donation> donationsList = await _context.Donations.Where(d => d.DonorId == donorId).ToListAsync();

            // If the donations list is null or empty, throw an exception

            if (donationsList == null || !donationsList.Any())
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(FindAllDonationsByDonor);
                string error = donationsList == null ? "The donations list is null" : "There are no donations";

                throw new DonationException(classOrigin, methodOrigin, error);

            }

            return donationsList;

        }


        /// <summary>
        /// Creates a new donation record
        /// </summary>
        /// <param name="donation">The donation to be created</param>
        /// <returns>The created donation</returns>
        /// <exception cref="DonationException"></exception>

        public async Task<Donation> CreateDonation(Donation donation)
        {

            // If the donation object is null, throw an exception

            if (donation == null)
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(CreateDonation);
                string error = "The donation is null";

                throw new DonationException(classOrigin, methodOrigin, error);
            }

            // Check if a donation with the same ID already exists in the database
            var existingDonation = _context.Donations.FirstOrDefault(d => d.Id == donation.Id);

            // If a donation with the same ID exists, throw an exception
            if (existingDonation != null)
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(CreateDonation);
                string error = "A donation with the same ID already exists";

                throw new DonationException(classOrigin, methodOrigin, error);
            }


            // Add the donation to the database and save changes

            _context.Donations.Add(donation);
            await _context.SaveChangesAsync();
            return donation;
        }

        public async Task<Donation> UpdateDonation(long id, Donation donation)
        {
            var existingDonation = await _context.Donations.FindAsync(id);

            if(existingDonation == null)
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(UpdateDonation);
                string error = "The donation is null";

                throw new DonationException(classOrigin, methodOrigin, error);
            }

            _context.Entry(existingDonation).CurrentValues.SetValues(donation); 
            _context.SaveChanges();

            return donation;

        }

        public async Task<Donation> DeleteDonation(long id)
        {
            var donation = _context.Donations.FirstOrDefault(don => don.Id == id);

            if(donation == null)
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(DeleteDonation);
                string error = "The donation is null";

                throw new DonationException(classOrigin, methodOrigin, error);
            }

            _context.Donations.Remove(donation);
            await _context.SaveChangesAsync();
            return donation;
        }

        public async Task<decimal> DonationsAmount()
        {
            var donationsAmount = await _context.Donations.SumAsync(don => don.Amount);
            return (decimal)donationsAmount;
        }

        public async Task<long> DonorsCount()
        {
            var donors = await _context.Donations.Select(d => d.DonorId).Distinct().CountAsync();
            return (long)donors;
        }

        public async Task<long> AppointmentsCount()
        {
            long appointments = await _javaUserClient.GetTotalAppointments();
            return appointments;
        }

    }
}

