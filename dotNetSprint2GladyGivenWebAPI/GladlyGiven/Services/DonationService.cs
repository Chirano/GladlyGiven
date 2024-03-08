using GladlyGiven.Exceptions;
using GladlyGiven.Models;
using GladyGivenWebAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace GladlyGiven.Services
{
    public class DonationService
    {
        private readonly ApplicationContextDb _context;

        JavaUserClient _userClient;

        private readonly string url = "http://localhost:8080/api";

        public DonationService(ApplicationContextDb context, JavaUserClient userClient)
        {
            _context = context;
            _userClient = new JavaUserClient(url);
        }

        public async Task<List<Donation>> FindAllDonationsByDonor(long userId)
        {
            var donor = await _userClient.GetDonorById(userId);
            if (donor == null)
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(FindAllDonationsByDonor);
                string error = "The donor is null";

                throw new DonationException(classOrigin, methodOrigin, error);
            }

            List<Donation> donationsList = await _context.Donations.Where(d => d.UserId == userId).ToListAsync();

            if (donationsList == null || !donationsList.Any())
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(FindAllDonationsByDonor);
                string error = donationsList == null ? "The donations list is null" : "There are no donations";

                throw new DonationException(classOrigin, methodOrigin, error);

            }

            return donationsList;

        }

        public async Task<Donation> CreateDonation(Donation donation)
        {
            if (donation == null)
            {
                string classOrigin = nameof(DonationService);
                string methodOrigin = nameof(CreateDonation);
                string error = "The donation is null";

                throw new DonationException(classOrigin, methodOrigin, error);
            }
            _context.Donations.Add(donation);
            await _context.SaveChangesAsync();
            return donation;
        }


    }
}

