//Author: Hugo Lopes
//hugoleo74@gmail.com

using GladlyGiven.Enums;

namespace GladyGivenWebAPI.Models
{
    public class ServiceRequestDTO
    {
        public long Id { get; set; }
        public string DateRequest { get; set; }
        public long IdCategory { get; set; }
        public string Description { get; set; }
        public ServiceRequestStatus Status { get; set; }

        public ServiceRequestDTO()
        {
        }

        public ServiceRequestDTO(ServiceRequest serviceRequest)
        {
            this.Id = serviceRequest.Id;
            this.DateRequest = serviceRequest.DateRequest;
            this.IdCategory = serviceRequest.IdCategory;
            this.Description = serviceRequest.Description;
            this.Status = serviceRequest.Status;
        }

    }

}
