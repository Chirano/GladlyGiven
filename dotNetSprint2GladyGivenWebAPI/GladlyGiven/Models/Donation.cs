using GladlyGiven.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GladlyGiven.Models
{
    //Author: Sónia Ribeiro

    /// <summary>
    /// This class represents a donation made by a donor.
    /// </summary>

    public class Donation
    {

        /// <summary>
        /// The unique identifier for the donation.
        /// </summary>

        [Key]
        public long Id { get; set; }

        /// <summary>
        /// The ID of the donor who made the donation.
        /// </summary>

        public long DonorId { get; set; }

        /// <summary>
        /// The amount of the donation.
        /// </summary>

        public double Amount { get; set; }


        /// <summary>
        /// The type of donation (e.g., singular, monthly, yearly).
        /// </summary>


        [EnumDataType(typeof(DonationType))]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public DonationType DonationType { get; set; }


        /// <summary>
        /// The fiscal identity of the donor (e.g., individual, company).
        /// </summary>


        [EnumDataType(typeof(FiscalIdentity))]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public FiscalIdentity FiscalIdentity { get; set; }


        /// <summary>
        /// The date when the donation was made.
        /// </summary>

        public string? Date { get; set; }
        
    }
}
