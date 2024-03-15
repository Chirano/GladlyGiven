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

        [HttpGet("/servicerequest/{id}")]
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

        [HttpPut("/servicerequest/{id}")]
        public async Task<ActionResult<Service>> UpdateServiceRequest(long id, ServiceRequest serviceRequest)
        {
            if (serviceRequest.Id != id)
            {
                return BadRequest();
            }

            ServiceRequest updatedServiceRequest;

            try
            {
                updatedServiceRequest = await serviceRequestServ.UpdateServiceRequest(serviceRequest);
            }
            catch (Exception e)
            {
                return NotFound($"Service if id {id} not found");
            }

            return Ok(updatedServiceRequest);
        }

        [HttpDelete("/servicerequest/{id}")]
        public async Task<IActionResult> DeleteServiceRequest(int id)
        {
            var serviceRequest = await serviceRequestServ.FindServiceRequest(id);

            if (serviceRequest == null)
            {
                return BadRequest();
            }

            await serviceRequestServ.DeleteServiceRequest(id);
            return Ok(serviceRequest);

        }

        [HttpGet("/servicerequest/category/{Category}")]
        public async Task<ActionResult<List<ServiceRequestDTO>>> FindServiceRequestCategory(long IdCategory)
        {
            List<ServiceRequestDTO> serviceRequests = await serviceRequestServ.FindServiceRequestCategory(IdCategory);

            if (serviceRequests != null && serviceRequests.Any())
                return Ok(serviceRequests);

            return NoContent();
        }

        [HttpGet("/servicerequest/status/{Status}")]
        public async Task<ActionResult<List<ServiceRequestDTO>>> FindServiceRequestStatus(long Status)
        {
            List<ServiceRequestDTO> serviceRequests = await serviceRequestServ.FindServiceRequestStatus(Status);

            if (serviceRequests != null && serviceRequests.Any())
                return Ok(serviceRequests);

            return NoContent();
        }
    }
}
