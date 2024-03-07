//Author: Hugo Lopes
//hugoleo74@gmail.com

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace GladyGivenWebAPI.Models
{
    public class ServiceRequest
    {

        [Key]

        [JsonPropertyName("id")]
        public long Id { get; set; }

        [JsonPropertyName("date_request")]
        public DateTime DateRequest { get; set; }

        [JsonPropertyName("id_services")]
        public long IdServices { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }

    }
}
