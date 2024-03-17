//Author: Lia Araruna and Clarissa Chirano

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GladlyGiven.Models;
using GladlyGiven.Services;
using GladyGivenWebAPI.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


namespace GladlyGiven.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    [EnableCors]
    public class CostSupportController : ControllerBase
    {
        private readonly CostSupportService costSupportService;

        public CostSupportController(ApplicationContextDb context)
        {
            costSupportService = new CostSupportService(context);
        }

        /// <summary>
        /// Retrieves a paginated list of all cost support records.
        /// </summary>
        /// <returns>
        /// Returns an ActionResult<IEnumerable<CostSupportDTO>> representing the HTTP response.
        /// If cost supports are found, it returns a response with HTTP 200 (OK) status code and the list of cost supports.
        /// If no cost supports are found, it returns a response with HTTP 204 (No Content) status code.
        /// </returns>
        [HttpGet("/costsupports")]
        public async Task<ActionResult<IEnumerable<CostSupportDTO>>> GetAllCostSupports()
        {
            List<CostSupportDTO> costSupports = await costSupportService.FindAllCostSupports();

            if (costSupports != null && costSupports.Count > 0)
                return Ok(costSupports);

            return NoContent();
        }

        /// <summary>
        /// Retrieves a paginated list of cost supports associated with a specific user based on their <paramref name="userId"/>.
        /// </summary>
        /// <param name="userId">The unique identifier of the user for whom cost supports are to be retrieved.</param>
        /// <returns>
        /// Returns an ActionResult<IEnumerable<CostSupportDTO>> representing the HTTP response.
        /// If cost supports are found, it returns a response with HTTP 200 (OK) status code and the list of cost supports.
        /// If no cost supports are found, it returns a response with HTTP 204 (No Content) status code.
        /// </returns>
        [HttpGet("mycostsupports/{userId}")]
        public async Task<ActionResult<IEnumerable<CostSupportDTO>>> GetAllCostSupportsByUserId(int userId)
        {
            List<CostSupportDTO> costSupports = await costSupportService.FindAllCostSupportsByUserId(userId);

            if (costSupports != null && costSupports.Count > 0)
                return Ok(costSupports);

            return NoContent();
        }

        /// <summary>
        /// Retrieves a paginated list of cost supports with the specified <paramref name="costSupportStatus"/>.
        /// </summary>
        /// <param name="costSupportStatus">The status of the cost supports to be retrieved.</param>
        /// <returns>
        /// Returns an ActionResult<IEnumerable<CostSupportDTO>> representing the HTTP response.
        /// If cost supports are found, it returns a response with HTTP 200 (OK) status code and the list of cost supports.
        /// If no cost supports are found, it returns a response with HTTP 204 (No Content) status code.
        /// </returns>
        [HttpGet("status/{costSupportStatus}")]
        public async Task<ActionResult<IEnumerable<CostSupportDTO>>> GetAllCostSupportsByStatus(int costSupportStatus)
        {
            List<CostSupportDTO> costSupports = await costSupportService.FindAllCostSupportsByStatus(costSupportStatus);

            if (costSupports != null && costSupports.Count > 0)
                return Ok(costSupports);

            return NoContent();
        }

        /// <summary>
        /// Retrieves the cost support record with the specified <paramref name="id"/>.
        /// </summary>
        /// <param name="id">The unique identifier of the cost support record to be retrieved.</param>
        /// <returns>
        /// Returns an ActionResult<CostSupportDTO> representing the HTTP response.
        /// If the cost support record is found, it returns a response with HTTP 200 (OK) status code and the cost support details.
        /// If the record is not found, it returns a response with HTTP 204 (No Content) status code.
        /// </returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<CostSupport>> GetCostSupport(int id)
        {
            CostSupportDTO costSupport = await costSupportService.FindCostSupport(id);

            if (costSupport != null)
                return Ok(costSupport);

            return NoContent();
        }

        /// <summary>
        /// Creates a new cost support record using the provided <paramref name="cost"/>.
        /// </summary>
        /// <param name="cost">The costsupportDTO containing details for the cost support record.</param>
        /// <returns>
        /// Returns an ActionResult<CostSupportDTO> representing the HTTP response.
        /// If the cost support record is created successfully, it returns a response with HTTP 200 (OK) status code and the created cost support details.
        /// If the creation fails or there is no content to return, it returns a response with HTTP 204 (No Content) status code.
        /// </returns>
        [HttpPost("/costsupport")]
        public async Task<ActionResult<CostSupportDTO>> CreateCostSupport(CostSupportDTO cost)
        {
            CostSupportDTO costSupport = await costSupportService.CreateCostSupport(cost);

            if (costSupport != null)
                return Ok(costSupport);

            return NoContent();
        }

        /// <summary>
        /// Updates the status of the cost support record with the specified <paramref name="id"/>.
        /// </summary>
        /// <param name="id">The unique identifier of the cost support record to be updated.</param>
        /// <param name="cost">The costsupportDTO containing updated details for the cost support record.</param>
        /// <param name="costSupportStatus">The updated status for the cost support record.</param>
        /// <returns>
        /// Returns an ActionResult<CostSupportDTO> representing the HTTP response.
        /// If the cost support record is updated successfully, it returns a response with HTTP 200 (OK) status code.
        /// If the request is invalid, it returns a response with HTTP 400 (Bad Request) status code.
        /// </returns>
        [HttpPut("/costsupport/id")]
        public async Task<ActionResult<CostSupportDTO>> UpdateCostSupport(int id, CostSupportDTO cost, int costSupportStatus)
        {
            if(cost.Id != id)
            {
                return BadRequest();
            }

            if(costSupportStatus == 0) //Status: waiting validation.
            {
                return BadRequest();
            }

            CostSupportDTO updatedCost = await costSupportService.UpdateCostSupport(cost, costSupportStatus);

            return Ok();
        }

        /// <summary>
        /// Adds a payment for a cost support request.
        /// </summary>
        /// <param name="id">The ID of the cost support.</param>
        /// <returns>An action result indicating success or failure of the payment process.</returns>
        [HttpPost("/costsupport/payment/{id}")]
        public async Task<ActionResult<string>> AddCostSupportPayment(int id)
        {
            CostSupportDTO costSupport = await costSupportService.FindCostSupport(id);

            if(costSupport == null)
            {
                return BadRequest("Invalid data");
            }

            string date = DateTime.Now.Date.ToString();

            CostSupportPayment costSupportPayment = costSupportService.createCostSupportPayment(costSupport, date).Result;
            if (costSupportPayment == null) return BadRequest("Cost Support Payment could not be processed");
            string accepted = "Cost Support Accepted";
            return Ok(accepted);
        }

        /// <summary>
        /// Rejects a cost support request.
        /// </summary>
        /// <param name="id">The ID of the cost support to be rejected.</param>
        /// <returns>An action result indicating success or failure of the rejection process.</returns>
        [HttpPut("/costsupport/reject/{id}")]
        public async Task<ActionResult<string>> RejectCostSupport(int id)
        {
            CostSupportDTO costSupportDTO = await costSupportService.FindCostSupport(id);

            if (costSupportDTO == null)
            {
                return BadRequest("Invalid data");
            }

            CostSupport costSupport = costSupportService.RejectCostSupport(id).Result;
            if (costSupport == null) return BadRequest("Operation could not be processed");
            string res = "Cost Support Rejected";
            return Ok(res);
        }
    }
}

