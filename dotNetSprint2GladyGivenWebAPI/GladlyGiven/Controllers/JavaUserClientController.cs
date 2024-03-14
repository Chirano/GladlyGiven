using GladlyGiven.DTOs;
using GladlyGiven.Services;
using Microsoft.AspNetCore.Mvc;

namespace GladlyGiven.Controllers
{
    //Author: Sónia Ribeiro

    /// <summary>
    /// Controller for handling the connections with the springboot api
    /// </summary>
    [ApiController]
    [Route("[Controller]")]
    public class JavaUserClientController : ControllerBase
    {
        /// <summary>
        /// The JavaUserClient is responsible for operations that connect the entity framework with springboot
        /// </summary>
        JavaUserClient javaUserClient;

        /// <summary>
        /// The url of the java spring boot api
        /// </summary>

        private readonly string url = "http://localhost:8080/api";

        /// <summary>
        /// Initializes a new instance of the <see cref="JavaUserClientController"/> class.
        /// </summary>

        public JavaUserClientController()
        {
            javaUserClient = new JavaUserClient(url);
        }

        /// <summary>
        /// Retrieves a donor by their ID.
        /// </summary>
        /// <param name="id">The ID of the donor to retrieve.</param>
        /// <returns>An <see cref="ActionResult{TValue}"/> containing the donor's data.</returns>

        [HttpGet("/donor/{id}")]
        public ActionResult<DonorDTO> GetDonorById(long id)
        {
            DonorDTO donorDTO = javaUserClient.GetDonorById(id).Result;
            return Ok(donorDTO);
        }

    }
}
