using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GladlyGiven.DTOs
{   
    //Author: Sónia Ribeiro

    /// <summary>
    /// Data transfer object class DonorDTO representing a donor
    /// </summary>
    public class DonorDTO
    {
        /// <summary>
        /// The unique identifier for the donor.
        /// </summary>

        [Key]
        [JsonPropertyName("id")]
        public int Id { get; set; }


        /// <summary>
        /// The first name of the donor.
        /// </summary>

        [JsonPropertyName("firstName")]
        public string? FirstName { get; set; }


        /// <summary>
        /// The last name of the donor.
        /// </summary>

        [JsonPropertyName("lastName")]
        public string? LastName { get; set; }
    }
}
