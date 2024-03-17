//Author: Lia Araruna

using System;
using GladlyGiven.Enums;

namespace GladlyGiven.Models
{
    // Represents a Data Transfer Object (DTO) for Cost Support information
    public class CostSupportDTO
	{
        public long Id { get; set; }

        public double Amount { get; set; }

        public string Description { get; set; }

        public long AppointmentId { get; set; }

        public long ServiceProviderId { get; set; }

        public CostSupportType Type { get; set; }

        public string DateRequest { get; set; }

        // Default constructor for CostSupportDTO
        public CostSupportDTO()
        {
        }

        /// <summary>
        /// Constructor that initializes CostSupportDTO from a CostSupport object
        /// </summary>
        /// <param name="costSupport">CostSupport</param>
        public CostSupportDTO(CostSupport costSupport)
        {
            this.Id = costSupport.Id;
            this.Amount = costSupport.Amount;
            this.Description = costSupport.Description;
            this.AppointmentId = costSupport.AppointmentId;
            this.ServiceProviderId = costSupport.ServiceProviderId;
            this.Type = costSupport.Type;
            this.DateRequest = costSupport.DateRequest;
        }
    }
}

