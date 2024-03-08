using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GladlyGiven.Dtos
{
    public class DonorDTO
    {
        [Key]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("firstName")]
        public string? FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string? LastName { get; set; }
    }
}
