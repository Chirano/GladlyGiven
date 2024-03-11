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
    [Route("api/v1/[controller]")]
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
        /// <param name="page">The page number (one-based) of the result set to retrieve (default is 1).</param>
        /// <param name="pageSize">The number of elements per page (default is 5).</param>
        /// <returns>
        /// Returns an ActionResult<IEnumerable<CostSupportDTO>> representing the HTTP response.
        /// If cost supports are found, it returns a response with HTTP 200 (OK) status code and the paginated list of cost supports.
        /// If no cost supports are found, it returns a response with HTTP 204 (No Content) status code.
        /// </returns>
        [HttpGet("/costsupports")]
        public async Task<ActionResult<IEnumerable<CostSupportDTO>>> GetAllCostSupports(int page = 1, int pageSize = 5)
        {
            List<CostSupportDTO> costSupports = await costSupportService.FindAllCostSupports();

            if (costSupports != null && costSupports.Count > 0)
                return Ok(costSupports.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList());

            return NoContent();
        }

        /// <summary>
        /// Retrieves a paginated list of cost supports associated with a specific user based on their <paramref name="userId"/>.
        /// </summary>
        /// <param name="userId">The unique identifier of the user for whom cost supports are to be retrieved.</param>
        /// <param name="page">The page number (one-based) of the result set to retrieve (default is 1).</param>
        /// <param name="pageSize">The number of elements per page (default is 5).</param>
        /// <returns>
        /// Returns an ActionResult<IEnumerable<CostSupportDTO>> representing the HTTP response.
        /// If cost supports are found, it returns a response with HTTP 200 (OK) status code and the paginated list of cost supports.
        /// If no cost supports are found, it returns a response with HTTP 204 (No Content) status code.
        /// </returns>
        [HttpGet("mycostsupports/{id}")]
        public async Task<ActionResult<IEnumerable<CostSupportDTO>>> GetAllCostSupportsByUserId(int userId, int page = 1, int pageSize = 5)
        {
            List<CostSupportDTO> costSupports = await costSupportService.FindAllCostSupports();

            if (costSupports != null && costSupports.Count > 0)
                return Ok(costSupports.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList());

            return NoContent();
        }

        /// <summary>
        /// Retrieves a paginated list of cost supports with the specified <paramref name="costSupportStatus"/>.
        /// </summary>
        /// <param name="costSupportStatus">The status of the cost supports to be retrieved.</param>
        /// <param name="page">The page number (one-based) of the result set to retrieve (default is 1).</param>
        /// <param name="pageSize">The number of elements per page (default is 5).</param>
        /// <returns>
        /// Returns an ActionResult<IEnumerable<CostSupportDTO>> representing the HTTP response.
        /// If cost supports are found, it returns a response with HTTP 200 (OK) status code and the paginated list of cost supports.
        /// If no cost supports are found, it returns a response with HTTP 204 (No Content) status code.
        /// </returns>
        [HttpGet("status/{costSupportStatus}")]
        public async Task<ActionResult<IEnumerable<CostSupportDTO>>> GetAllCostSupportsByStatus(int costSupportStatus, int page = 1, int pageSize = 5)
        {
            List<CostSupportDTO> costSupports = await costSupportService.FindAllCostSupportsByStatus(costSupportStatus);

            if (costSupports != null && costSupports.Count > 0)
                return Ok(costSupports.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList());

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
    }
}

