using GladlyGiven.Enums;
using GladlyGiven.Models;
using GladlyGiven.Services;
using GladyGivenWebAPI.Data;
using GladyGivenWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GladlyGiven.Controllers
{
    //Author: Sónia Ribeiro

    /// <summary>
    /// Controller for handling donation-related operations.
    /// </summary>

    [ApiController]
    [Route("[Controller]")]
    public class DonationController : ControllerBase
    {
        /// <summary>
        /// This class DonationService is responsible for donation-related operations
        /// </summary>

        private DonationService _donationService;


        /// <summary>
        /// This is a DonationController constructor, that Initializes a new instance of the <see cref="DonationController"/> class. 
        /// </summary>
        /// <param name="donationContext">The application database context</param>

        public DonationController(ApplicationContextDb donationContext)
        {
            _donationService = new DonationService(donationContext);
            
        }


        /// <summary>
        /// Retrieves a donation by its unique identifier
        /// </summary>
        /// <param name="id">The unique identifier of the donation to retrieve</param>
        /// <returns>
        /// If the donation is found, returns an HTTP OK response with the donation in the body.
        /// If the donation is not found, returns an HTTP Not Found response.
        /// </returns>


        [HttpGet("/donation/{id}")]
        public async Task<ActionResult<Donation>> FindDonationById(long id)
        {
            var donation = await _donationService.FindDonationById(id);

            if(donation == null)
            {
                return NotFound();
            }

            return Ok(donation);
        }



        /// <summary>
        /// Retrieves all donations with pagination support.
        /// </summary>
        /// <param name="page">The page number of results to retrieve (default is 1)</param>
        /// <param name="pageSize">The maximum number of donations per page (default is 4)</param>
        /// <returns>
        /// If donations are found, returns an HTTP OK response with a list of donations for the specified page.
        /// If no donations are found, returns an HTTP No Content response.
        /// </returns>


        [HttpGet("/donations")]
        public async Task<ActionResult<IEnumerable<Donation>>> FindAllDonations(int page = 1, int pageSize = 4)
        {
            List<Donation> donationsList = await _donationService.FindAllDonations();

            if (donationsList.Count == 0)
            {
                return NoContent();
            }

            return Ok(donationsList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList());
        }


        /// <summary>
        /// Retrieves all donations of a specific type with pagination support.
        /// </summary>
        /// <param name="type">The type of donations to retrieve.</param>
        /// <param name="page">The page number of results to retrieve (default is 1).</param>
        /// <param name="pageSize">The maximum number of donations per page (default is 4).</param>
        /// <returns>
        /// If donations are found, returns an HTTP OK response with a list of donations for the specified page.
        /// If no donations are found, returns an HTTP No Content response.
        /// </returns>


        [HttpGet("/donations/type")]
        public async Task<ActionResult<IEnumerable<Donation>>> FindAllDonationsByType(DonationType type, int page = 1, int pageSize = 4)
        {
            List<Donation> donationsList = await _donationService.FindDonationsByType(type);

            if (donationsList.Count == 0)
            {
                return NoContent();
            }

            return Ok(donationsList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList());
        }


        /// <summary>
        /// Retrieves all donations with a specific fiscal identity with pagination support.
        /// </summary>
        /// <param name="fiscalIdentity">The fiscal identity of the donations to retrieve.</param>
        /// <param name="page">The page number of results to retrieve (default is 1).</param>
        /// <param name="pageSize">The maximum number of donations per page (default is 4).</param>
        /// <returns>
        /// If donations are found, returns an HTTP OK response with a list of donations for the specified page.
        /// If no donations are found, returns an HTTP No Content response.
        /// </returns>


        [HttpGet("/donations/fiscal-identity")]
        public async Task<ActionResult<IEnumerable<Donation>>> FindAllDonationsByFiscalIdentity(FiscalIdentity fiscalIdentity, int page = 1, int pageSize = 4)
        {
            List<Donation> donationsList = await _donationService.FindDonationsByFiscalIdentity(fiscalIdentity);

            if (donationsList.Count == 0)
            {
                return NoContent();
            }

            return Ok(donationsList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList());
        }



        /// <summary>
        /// Retrieves all donations associated with the id of a donor
        /// </summary>
        /// <param name="donorId">The ID of the donor whose donations are to be retrieved</param>
        /// <param name="page">The page number for pagination (default is 1)</param>
        /// <param name="pageSize">The page size for pagination (default is 4)</param>
        /// <returns>
        /// An HTTP response containing a paginated list of donations.
        /// </returns>

        [HttpGet("/donations/donor/{donorId}")]
        public async Task<ActionResult<IEnumerable<Donation>>> FindAllDonationsByDonor(long donorId, int page = 1, int pageSize = 4)
        {

            List<Donation> donationsList = await _donationService.FindAllDonationsByDonor(donorId);

            if(donationsList.Count == 0)
            {
                return NoContent();
            }

            return Ok(donationsList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList());
        }


        

        /// <summary>
        /// Creates a new donation
        /// </summary>
        /// <param name="donation">The donation object to be created</param>
        /// <returns>
        /// An HTTP response containing the added donation
        /// </returns>


        [HttpPost("/donation")]
        public async Task<ActionResult<Donation>> CreateDonation(Donation donation)
        {
            if(donation == null)
            {
                return BadRequest();
            }

            Donation addedDonation = await _donationService.CreateDonation(donation);

            return Ok(addedDonation);
        }


        /// <summary>
        /// Updates a donation with the specified ID.
        /// </summary>
        /// <param name="id">The ID of the donation to update.</param>
        /// <param name="donation">The updated donation object.</param>
        /// <returns>
        /// If the ID in the route does not match the ID of the donation object, returns a BadRequest response.
        /// If the donation is successfully updated, returns an HTTP OK response with the updated donation in the body.
        /// </returns>


        [HttpPut("/donation/update/{id}")]
        public async Task<ActionResult<Donation>> UpdateDonation(long id, Donation donation)
        {
            if(id != donation.Id)
            {
                return BadRequest();
            }

            var updateDonation = await _donationService.UpdateDonation(id, donation);

            return Ok(updateDonation);
        }


        /// <summary>
        /// Deletes a donation with the specified ID.
        /// </summary>
        /// <param name="id">The ID of the donation to delete.</param>
        /// <returns>
        /// If the donation is successfully deleted, returns an HTTP OK response with the deleted donation in the body.
        /// If the donation does not exist, returns an HTTP Not Found response.
        /// </returns>

        [HttpDelete("/donation/delete/{id}")]
        public async Task<ActionResult<Donation>> DeleteDonation(long id)
        {
            var donation = await _donationService.DeleteDonation(id);

            if(donation == null)
            {
                return NotFound();
            }

            return Ok(donation);
        }
    }

}
