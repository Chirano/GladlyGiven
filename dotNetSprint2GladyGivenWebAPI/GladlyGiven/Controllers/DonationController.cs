using GladlyGiven.Models;
using GladlyGiven.Services;
using GladyGivenWebAPI.Data;
using GladyGivenWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GladlyGiven.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class DonationController : ControllerBase
    {
        private DonationService _donationService;
        

        public DonationController(ApplicationContextDb donationContext)
        {
            _donationService = new DonationService(donationContext);
        }

        [HttpGet("/donations/userId")]
        public async Task<ActionResult<List<Donation>>> FindAllDonationsByDonor(long userId, int page = 1, int pageSize = 4)
        {


            List<Donation> donationsList = await _donationService.FindAllDonationsByDonor(userId);

            return Ok(donationsList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList());
        }

        [HttpPost("/donation")]
        public async Task<ActionResult<Donation>> CreateDonation(Donation donation)
        {
            Donation addedDonation = await _donationService.CreateDonation(donation);

            return Ok(addedDonation);
        }
    }

}
