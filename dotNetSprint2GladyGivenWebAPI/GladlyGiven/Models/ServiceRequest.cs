//Author: Hugo Lopes
//hugoleo74@gmail.com

using GladlyGiven.Enums;
using System.ComponentModel.DataAnnotations;


namespace GladyGivenWebAPI.Models
{
    public class ServiceRequest
    {
        [Key]
        public long Id { get; set; }
        public string DateRequest { get; set; }
        public long IdCategory { get; set; }
        public string Description { get; set; }
        public long Status { get; set; }

    }
}
