// Author: Hugo Lopes

using GladlyGiven.Exceptions;
using GladlyGiven.Models;
using GladyGivenWebAPI.Data;
using GladyGivenWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;

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
                    IdCategory = serv.IdCategory,
                    Description = serv.Description,
                    Status = serv.Status
                };
                context.ServiceRequest.Add(serviceRequest);
                context.SaveChanges();
            }

            ServiceRequestDTO servDTO = new ServiceRequestDTO(serviceRequest);

            return servDTO;
        }

        public async Task<ServiceRequest> UpdateServiceRequest(ServiceRequest serviceRequest)
        {
            if (!context.ServiceRequest.Any(m => m.Id == serviceRequest.Id))
            {
                throw new Exception("Customer does not exist");
            }

            context.ServiceRequest.Entry(serviceRequest).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return serviceRequest;
        }


        public async Task<ServiceRequest> DeleteServiceRequest(long id)
        {
            var serviceRequest = await context.ServiceRequest.SingleOrDefaultAsync(x => x.Id == id);

            if (serviceRequest == null)
            {
                throw new Exception($"Service with id {id} does not exist");
            }

            context.ServiceRequest.Remove(serviceRequest);
            context.SaveChanges();
            return serviceRequest;
        }

        public async Task<List<ServiceRequestDTO>> FindServiceRequestProfessionalDescription(string description)
        {
            var serviceRequests = await context.ServiceRequest
                                               .Where(sr => sr.Description == description)
                                               .ToListAsync();

            if (serviceRequests == null || !serviceRequests.Any())
            {
                throw new Exception($"No service requests found with Description {description}");
            }

            List<ServiceRequestDTO> serviceRequestDTOs = serviceRequests
                .Select(sr => new ServiceRequestDTO(sr))
                .ToList();

            return serviceRequestDTOs;
        }

        public async Task<ServiceRequestDTO> UpdateCostSupport(ServiceRequestDTO cost, int ServiceRequestStatus)
        {
            var serviceRequest = await context.ServiceRequest.FirstOrDefaultAsync(cs => cs.Id == cost.Id);

            if (serviceRequest == null)
            {
                throw new EntityDoesntExistException("CostSupport was not found", "CostSupport", "UpdateCostSupport()");
            }

            if (ServiceRequestStatus == 1)
            {
                serviceRequest.Status = GladlyGiven.Enums.ServiceRequestStatus.APPROVED;
                context.ServiceRequest.Entry(serviceRequest).State = EntityState.Modified;
            }

            if (ServiceRequestStatus == 2)
            {
                serviceRequest.Status = GladlyGiven.Enums.ServiceRequestStatus.REJECTED;
                context.ServiceRequest.Entry(serviceRequest).State = EntityState.Modified;
            }

            await context.SaveChangesAsync();

            ServiceRequestDTO dTO = new ServiceRequestDTO(serviceRequest);

            return dTO;
        }


    }
}