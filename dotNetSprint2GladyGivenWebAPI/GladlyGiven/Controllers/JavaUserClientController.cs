using GladlyGiven.Dtos;
using GladlyGiven.Services;
using Microsoft.AspNetCore.Mvc;

namespace GladlyGiven.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class JavaUserClientController : ControllerBase
    {
        JavaUserClient javaUserClient;

        private readonly string url = "http://localhost:8080/api";

        public JavaUserClientController()
        {
            javaUserClient = new JavaUserClient(url);
        }

        [HttpGet("/donor/{id}")]
        public ActionResult<DonorDTO> GetDonorById(long id)
        {
            DonorDTO donorDTO = javaUserClient.GetDonorById(id).Result;
            return Ok(donorDTO);
        }

    }
}
