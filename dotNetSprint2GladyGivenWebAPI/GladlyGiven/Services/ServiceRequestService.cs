// Author: Hugo Lopes

using GladlyGiven.Models;
using GladyGivenWebAPI.Data;
using GladyGivenWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GladyGivenWebAPI.Services
{
    public class ServiceRequestService
    {
        public readonly ApplicationContextDb context;

        public ServiceRequestService(ApplicationContextDb context)
        {
            this.context = context;
        }

        public async Task<List<ServiceRequestDTO>> FindAllServiceRequest()
        {
            List<ServiceRequest> serviceRequests = await context.ServiceRequest.ToListAsync();

            if (serviceRequests == null)
            {
                return null;
            }

            List<ServiceRequestDTO> serviceRequestDTOs = new List<ServiceRequestDTO>();

            foreach (ServiceRequest serviceRequest in serviceRequests)
            {
                ServiceRequestDTO serviceRequestDTO = new ServiceRequestDTO(serviceRequest);
                serviceRequestDTOs.Add(serviceRequestDTO);
            }

            return serviceRequestDTOs;
        }

        public async Task<ServiceRequestDTO> FindServiceRequest(int id)
        {
            var serviceRequest = await context.ServiceRequest.FirstOrDefaultAsync(x => x.Id == id);
            if (serviceRequest == null)
            {
                throw new NotImplementedException();
            }

            ServiceRequestDTO serviceRequestDTO = new ServiceRequestDTO(serviceRequest);

            return serviceRequestDTO;
        }

        public async Task<ServiceRequestDTO> CreateServiceRequest(ServiceRequestDTO serv)
        {
            var serviceRequest = await context.ServiceRequest.FirstOrDefaultAsync(s => s.Id == serv.Id);

            if (serviceRequest == null)
            {
                serviceRequest = new ServiceRequest
                {
                    DateRequest = serv.DateRequest,
                    IdServices = serv.IdServices,
                    Description = serv.Description,
                    Status = serv.Status
                };
                context.ServiceRequest.Add(serviceRequest);
                context.SaveChanges();
            }

            ServiceRequestDTO servDTO = new ServiceRequestDTO(serviceRequest);

            return servDTO;
        }
    }
}