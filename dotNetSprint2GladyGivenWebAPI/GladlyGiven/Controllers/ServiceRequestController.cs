// Author: Tiago Barracha
// ti.barracha@gmail.com


using GladyGivenWebAPI.Data;
using GladyGivenWebAPI.Models;
using GladyGivenWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GladyGivenWebAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ServiceRequestController : ControllerBase
    {
        private readonly ServiceRequestService serviceRequestServ;

        public ServiceRequestController(ApplicationContextDb context)
        {
            serviceRequestServ = new ServiceRequestService(context);
        }

        [HttpGet("~/api/health")] // landing
        public ActionResult<string> Health()
        {
            return Ok("Entity API is working fine!");
        }

        [HttpGet("/servicerequests")]
        public async Task<ActionResult<List<ServiceRequestDTO>>> GetAllServiceRequest()
        {
            List<ServiceRequestDTO> serviceRequests = await serviceRequestServ.FindAllServiceRequest();

            if (serviceRequests != null && serviceRequests.Count > 0)
                return Ok(serviceRequests);

            return NoContent();


        }

        [HttpGet("/servicerequest/id")]
        public async Task<ActionResult<ServiceRequestDTO>> FindServiceRequest(int id)
        {
            ServiceRequestDTO serviceRequest = await serviceRequestServ.FindServiceRequest(id);

            if (serviceRequest != null)
                return Ok(serviceRequest);

            return NoContent();

        }

        [HttpPost("/servicerequest")]
        public async Task<ActionResult<ServiceRequestDTO>> CreateServiceRequest(ServiceRequestDTO serv)
        {
            ServiceRequestDTO serviceRequest = await serviceRequestServ.CreateServiceRequest(serv);

            if (serviceRequest != null)
                return Ok(serviceRequest);

            return NoContent();

        }
    }
}
